import type { RunActivity, RunLap } from "./garmin";

export interface DistanceTarget {
  key: string;
  label: string;
  meters: number;
  goalSeconds: number | null;
}

export const DISTANCE_TARGETS: DistanceTarget[] = [
  { key: "400m", label: "400 m", meters: 400, goalSeconds: 60 },
  { key: "half-mile", label: "1/2 Mile", meters: 804.672, goalSeconds: 150 },
  { key: "1k", label: "1 km", meters: 1000, goalSeconds: 210 },
  { key: "mile", label: "1 Mile", meters: 1609.344, goalSeconds: 360 },
  { key: "2mile", label: "2 Miles", meters: 3218.688, goalSeconds: 750 },
  { key: "5k", label: "5 km", meters: 5000, goalSeconds: 1320 },
  { key: "10k", label: "10 km", meters: 10000, goalSeconds: 2940 },
  { key: "15k", label: "15 km", meters: 15000, goalSeconds: null },
  { key: "10mile", label: "10 Miles", meters: 16093.44, goalSeconds: null },
  { key: "20k", label: "20 km", meters: 20000, goalSeconds: null },
  { key: "half-marathon", label: "Half Marathon", meters: 21097.5, goalSeconds: null },
];

export type Trend = "up" | "down" | "same" | null;

export interface MonthSummary {
  key: string;
  label: string;
  runCount: number;
  totalDistanceKm: number;
  totalDurationSeconds: number;
  bests: Record<string, number | null>;
  /** vs the previous month in the list — "down" means faster/improved */
  trend: Record<string, Trend>;
}

export function formatDuration(totalSeconds: number): string {
  const s = Math.round(totalSeconds);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  return `${m}:${String(sec).padStart(2, "0")}`;
}

// Finds the fastest time to cover `targetMeters` using any contiguous window of
// laps within a single activity. Laps have constant average pace internally, so
// the optimal window always starts at a lap boundary — this two-pointer sweep
// with linear interpolation at the tail lap is exact under that model.
export function bestEffortFromLaps(laps: RunLap[], targetMeters: number): number | null {
  if (laps.length === 0) return null;

  const cumDist = [0];
  const cumTime = [0];
  for (const lap of laps) {
    cumDist.push(cumDist[cumDist.length - 1] + lap.distanceMeters);
    cumTime.push(cumTime[cumTime.length - 1] + lap.durationSeconds);
  }
  const n = laps.length;
  const totalDist = cumDist[n];

  let best: number | null = null;
  for (let i = 0; i <= n; i++) {
    const neededDist = cumDist[i] + targetMeters;
    if (neededDist > totalDist + 1e-6) break;

    let j = i + 1;
    while (j < n && cumDist[j] < neededDist) j++;

    const lap = laps[j - 1];
    const remaining = neededDist - cumDist[j - 1];
    const fraction = lap.distanceMeters > 0 ? remaining / lap.distanceMeters : 0;
    const time = cumTime[j - 1] + fraction * lap.durationSeconds;

    const duration = time - cumTime[i];
    if (best === null || duration < best) best = duration;
  }

  return best;
}

export function computeBests(activities: RunActivity[]): Record<string, number | null> {
  const bests: Record<string, number | null> = {};
  for (const target of DISTANCE_TARGETS) {
    let best: number | null = null;
    for (const a of activities) {
      const laps = a.laps.length > 0 ? a.laps : [{ distanceMeters: a.distanceMeters, durationSeconds: a.durationSeconds }];
      const effort = bestEffortFromLaps(laps, target.meters);
      if (effort !== null && (best === null || effort < best)) best = effort;
    }
    bests[target.key] = best;
  }
  return bests;
}

export function buildMonthlySummaries(activities: RunActivity[]): MonthSummary[] {
  const byMonth = new Map<string, RunActivity[]>();
  for (const a of activities) {
    const key = a.startTimeLocal.slice(0, 7); // "2026-06"
    if (!byMonth.has(key)) byMonth.set(key, []);
    byMonth.get(key)!.push(a);
  }

  const sortedKeys = Array.from(byMonth.keys()).sort(); // ascending chronological

  const summaries: MonthSummary[] = [];
  let prevBests: Record<string, number | null> | null = null;

  for (const key of sortedKeys) {
    const monthActivities = byMonth.get(key)!;
    const [year, month] = key.split("-").map(Number);
    const label = new Date(year, month - 1, 1).toLocaleString("en-US", { month: "long", year: "numeric" });
    const bests = computeBests(monthActivities);

    const trend: Record<string, Trend> = {};
    for (const target of DISTANCE_TARGETS) {
      const cur = bests[target.key];
      const prev = prevBests ? prevBests[target.key] : null;
      if (cur == null || prev == null) trend[target.key] = null;
      else if (cur < prev) trend[target.key] = "down";
      else if (cur > prev) trend[target.key] = "up";
      else trend[target.key] = "same";
    }

    summaries.push({
      key,
      label,
      runCount: monthActivities.length,
      totalDistanceKm: monthActivities.reduce((sum, a) => sum + a.distanceMeters, 0) / 1000,
      totalDurationSeconds: monthActivities.reduce((sum, a) => sum + a.durationSeconds, 0),
      bests,
      trend,
    });

    prevBests = bests;
  }

  return summaries;
}
