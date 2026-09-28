const CONNECT_API = "https://connectapi.garmin.com";
const USER_AGENT = "com.garmin.android.apps.connectmobile";

const REFRESH_TOKEN = process.env.GARMIN_DI_REFRESH_TOKEN;
const CLIENT_ID = process.env.GARMIN_DI_CLIENT_ID;

export interface RunLap {
  distanceMeters: number;
  durationSeconds: number;
}

export interface RunActivity {
  id: number;
  name: string;
  startTimeLocal: string;
  distanceMeters: number;
  durationSeconds: number;
  calories: number;
  isTreadmill: boolean;
  /** Fine-grained distance/time deltas (from Garmin's per-second stream where available); used to derive best-effort times within a longer run. */
  laps: RunLap[];
}

// Garmin's DI auth issues a new refresh token on every use, but the old one
// stays valid — so we can keep reusing the same one from env indefinitely
// instead of persisting rotated tokens across serverless invocations.
async function getAccessToken(): Promise<string | null> {
  if (!REFRESH_TOKEN || !CLIENT_ID) return null;
  try {
    const res = await fetch("https://diauth.garmin.com/di-oauth2-service/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded", "User-Agent": USER_AGENT },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: REFRESH_TOKEN,
        client_id: CLIENT_ID,
      }),
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return (data.access_token as string) ?? null;
  } catch {
    return null;
  }
}

const MAX_PLAUSIBLE_SPEED = 10; // m/s

interface MetricDescriptor {
  metricsIndex: number;
  key: string;
}

// Garmin's activity "details" endpoint returns a per-record time series
// (roughly 1 point/sec, downsampled to maxChartSize) with cumulative distance
// and absolute timestamp. Converting consecutive points into distance/time
// deltas gives much finer resolution than 1km auto-laps for short efforts
// like 100m/400m, without needing to parse the full FIT binary.
async function fetchActivityStream(activityId: number, token: string): Promise<RunLap[]> {
  try {
    const res = await fetch(
      `${CONNECT_API}/activity-service/activity/${activityId}/details?maxChartSize=2000&maxPolylineSize=1`,
      { headers: { Authorization: `Bearer ${token}`, "User-Agent": USER_AGENT }, next: { revalidate: 86400 } },
    );
    if (!res.ok) return [];
    const data = await res.json();

    const descriptors: MetricDescriptor[] = Array.isArray(data.metricDescriptors) ? data.metricDescriptors : [];
    const distIdx = descriptors.find((d) => d.key === "sumDistance")?.metricsIndex;
    const timeIdx = descriptors.find((d) => d.key === "directTimestamp")?.metricsIndex;
    const rows: { metrics: (number | null)[] }[] = Array.isArray(data.activityDetailMetrics)
      ? data.activityDetailMetrics
      : [];
    if (distIdx === undefined || timeIdx === undefined || rows.length < 2) return [];

    const points: { t: number; d: number }[] = [];
    for (const row of rows) {
      const dist = row.metrics[distIdx];
      const ts = row.metrics[timeIdx];
      if (typeof dist === "number" && typeof ts === "number") points.push({ t: ts / 1000, d: dist });
    }
    if (points.length < 2) return [];

    const laps: RunLap[] = [];
    for (let i = 1; i < points.length; i++) {
      const dd = points[i].d - points[i - 1].d;
      const dt = points[i].t - points[i - 1].t;
      // Drop GPS spikes: anything faster than 10 m/s (sub-10s 100m) isn't a real stride.
      if (dd >= 0 && dt > 0 && dd / dt <= MAX_PLAUSIBLE_SPEED) laps.push({ distanceMeters: dd, durationSeconds: dt });
    }
    return laps;
  } catch {
    return [];
  }
}

async function fetchActivitySplits(activityId: number, token: string): Promise<RunLap[]> {
  try {
    const res = await fetch(`${CONNECT_API}/activity-service/activity/${activityId}/splits`, {
      headers: { Authorization: `Bearer ${token}`, "User-Agent": USER_AGENT },
      next: { revalidate: 86400 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    const laps = Array.isArray(data.lapDTOs) ? data.lapDTOs : [];
    return laps
      .filter((l: { distance?: number; duration?: number }) =>
        typeof l.distance === "number" && typeof l.duration === "number" && l.distance > 0 && l.duration > 0,
      )
      .map((l: { distance: number; duration: number }) => ({
        distanceMeters: l.distance,
        durationSeconds: l.duration,
      }));
  } catch {
    return [];
  }
}

async function fetchActivityLaps(activityId: number, token: string): Promise<RunLap[]> {
  const stream = await fetchActivityStream(activityId, token);
  if (stream.length > 0) return stream;
  return fetchActivitySplits(activityId, token);
}

async function mapWithConcurrency<T, R>(items: T[], limit: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let next = 0;
  async function worker() {
    while (next < items.length) {
      const i = next++;
      results[i] = await fn(items[i]);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

interface RawActivity {
  activityId: number;
  activityName?: string;
  startTimeLocal: string;
  distance?: number;
  duration?: number;
  calories?: number;
  activityType?: { typeKey?: string };
}

// Garmin caps a single search page, so walk pages until a short one comes back.
async function fetchActivityList(token: string, startDate: string, endDate: string, activityType?: string): Promise<RawActivity[]> {
  const PAGE = 100;
  const all: RawActivity[] = [];
  for (let start = 0; start < 2000; start += PAGE) {
    const typeParam = activityType ? `&activityType=${activityType}` : "";
    try {
      const res = await fetch(
        `${CONNECT_API}/activitylist-service/activities/search/activities?startDate=${startDate}&endDate=${endDate}${typeParam}&limit=${PAGE}&start=${start}`,
        {
          headers: { Authorization: `Bearer ${token}`, "User-Agent": USER_AGENT },
          next: { revalidate: 86400 },
        },
      );
      if (!res.ok) break;
      const page = await res.json();
      if (!Array.isArray(page)) break;
      all.push(...page);
      if (page.length < PAGE) break;
    } catch {
      break;
    }
  }
  return all;
}

/** startDate/endDate as "YYYY-MM-DD". */
export async function fetchRunningActivities(startDate: string, endDate: string): Promise<RunActivity[]> {
  const token = await getAccessToken();
  if (!token) return [];

  const raw = await fetchActivityList(token, startDate, endDate, "running");
  const lapsByActivity = await mapWithConcurrency(raw, 8, (a) => fetchActivityLaps(a.activityId, token));

  return raw.map((a, i) => ({
    id: a.activityId,
    name: a.activityName ?? "Run",
    startTimeLocal: a.startTimeLocal,
    distanceMeters: a.distance ?? 0,
    durationSeconds: a.duration ?? 0,
    calories: a.calories ?? 0,
    isTreadmill: a.activityType?.typeKey === "treadmill_running",
    laps: lapsByActivity[i],
  }));
}

export interface TrainingActivity {
  id: number;
  startTimeLocal: string;
  typeKey: string;
  distanceMeters: number;
  durationSeconds: number;
}

/** Every activity type (runs, rides, hikes, gym...) — summary fields only, no per-second streams. */
export async function fetchAllActivities(startDate: string, endDate: string): Promise<TrainingActivity[]> {
  const token = await getAccessToken();
  if (!token) return [];

  const raw = await fetchActivityList(token, startDate, endDate);
  return raw.map((a) => ({
    id: a.activityId,
    startTimeLocal: a.startTimeLocal,
    typeKey: a.activityType?.typeKey ?? "other",
    distanceMeters: a.distance ?? 0,
    durationSeconds: a.duration ?? 0,
  }));
}
