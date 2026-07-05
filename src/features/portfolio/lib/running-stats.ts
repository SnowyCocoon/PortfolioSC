import type { RunActivity } from "./garmin";

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
  { key: "20k", label: "20 km", meters: 20000, goalSeconds: null },
  { key: "half-marathon", label: "Half Marathon", meters: 21097.5, goalSeconds: null },
];

export interface MonthSummary {
  key: string;
  label: string;
  runCount: number;
  totalDistanceKm: number;
  totalDurationSeconds: number;
  bests: Record<string, number | null>;
}

export function formatDuration(totalSeconds: number): string {
  const s = Math.round(totalSeconds);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  return `${m}:${String(sec).padStart(2, "0")}`;
}

// Real GPS-recorded distance rarely matches the nominal race distance exactly,
// so a run only counts toward a category if it lands within this band.
function tolerance(meters: number): number {
  return Math.max(meters * 0.04, 30);
}

function bestTimeForDistance(activities: RunActivity[], meters: number): number | null {
  const tol = tolerance(meters);
  let best: number | null = null;
  for (const a of activities) {
    if (Math.abs(a.distanceMeters - meters) <= tol && (best === null || a.durationSeconds < best)) {
      best = a.durationSeconds;
    }
  }
  return best;
}

export function computeBests(activities: RunActivity[]): Record<string, number | null> {
  const bests: Record<string, number | null> = {};
  for (const target of DISTANCE_TARGETS) {
    bests[target.key] = bestTimeForDistance(activities, target.meters);
  }
  return bests;
}

export function buildMonthlySummaries(activities: RunActivity[]): MonthSummary[] {
  const now = new Date();
  const currentMonthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

  const byMonth = new Map<string, RunActivity[]>();
  for (const a of activities) {
    const key = a.startTimeLocal.slice(0, 7); // "2026-06"
    if (key >= currentMonthKey) continue; // skip the in-progress month
    if (!byMonth.has(key)) byMonth.set(key, []);
    byMonth.get(key)!.push(a);
  }

  return Array.from(byMonth.entries())
    .sort(([a], [b]) => (a < b ? 1 : -1))
    .map(([key, monthActivities]) => {
      const [year, month] = key.split("-").map(Number);
      const label = new Date(year, month - 1, 1).toLocaleString("en-US", {
        month: "long",
        year: "numeric",
      });
      return {
        key,
        label,
        runCount: monthActivities.length,
        totalDistanceKm: monthActivities.reduce((sum, a) => sum + a.distanceMeters, 0) / 1000,
        totalDurationSeconds: monthActivities.reduce((sum, a) => sum + a.durationSeconds, 0),
        bests: computeBests(monthActivities),
      };
    });
}
