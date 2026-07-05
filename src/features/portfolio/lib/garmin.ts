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
  /** Per-auto-lap splits (~1km each); used to derive best-effort times within a longer run. */
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

async function fetchActivityLaps(activityId: number, token: string): Promise<RunLap[]> {
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

/** startDate/endDate as "YYYY-MM-DD". */
export async function fetchRunningActivities(startDate: string, endDate: string): Promise<RunActivity[]> {
  const token = await getAccessToken();
  if (!token) return [];

  let raw: unknown;
  try {
    const res = await fetch(
      `${CONNECT_API}/activitylist-service/activities/search/activities?startDate=${startDate}&endDate=${endDate}&activityType=running&limit=200&start=0`,
      {
        headers: { Authorization: `Bearer ${token}`, "User-Agent": USER_AGENT },
        next: { revalidate: 86400 },
      },
    );
    if (!res.ok) return [];
    raw = await res.json();
  } catch {
    return [];
  }
  if (!Array.isArray(raw)) return [];

  const activities: RunActivity[] = [];
  for (const a of raw) {
    const laps = await fetchActivityLaps(a.activityId, token);
    activities.push({
      id: a.activityId,
      name: a.activityName ?? "Run",
      startTimeLocal: a.startTimeLocal,
      distanceMeters: a.distance ?? 0,
      durationSeconds: a.duration ?? 0,
      calories: a.calories ?? 0,
      laps,
    });
  }
  return activities;
}
