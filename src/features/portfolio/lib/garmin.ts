const CONNECT_API = "https://connectapi.garmin.com";
const USER_AGENT = "com.garmin.android.apps.connectmobile";

const REFRESH_TOKEN = process.env.GARMIN_DI_REFRESH_TOKEN;
const CLIENT_ID = process.env.GARMIN_DI_CLIENT_ID;

export interface RunActivity {
  id: number;
  name: string;
  startTimeLocal: string;
  distanceMeters: number;
  durationSeconds: number;
  calories: number;
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

export async function fetchRunningActivities(): Promise<RunActivity[]> {
  const token = await getAccessToken();
  if (!token) return [];

  const activities: RunActivity[] = [];
  const pageSize = 100;
  const maxPages = 10; // safety cap (1000 activities)

  for (let page = 0; page < maxPages; page++) {
    const start = page * pageSize;
    let res: Response;
    try {
      res = await fetch(
        `${CONNECT_API}/activitylist-service/activities/search/activities?limit=${pageSize}&start=${start}&activityType=running`,
        {
          headers: { Authorization: `Bearer ${token}`, "User-Agent": USER_AGENT },
          next: { revalidate: 86400 },
        },
      );
    } catch {
      break;
    }
    if (!res.ok) break;

    const body = await res.json();
    if (!Array.isArray(body) || body.length === 0) break;

    for (const a of body) {
      activities.push({
        id: a.activityId,
        name: a.activityName ?? "Run",
        startTimeLocal: a.startTimeLocal,
        distanceMeters: a.distance ?? 0,
        durationSeconds: a.duration ?? 0,
        calories: a.calories ?? 0,
      });
    }

    if (body.length < pageSize) break;
  }

  return activities;
}
