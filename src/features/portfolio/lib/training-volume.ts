import type { TrainingActivity } from "./garmin";

export type SportCategory = "running" | "cycling" | "hiking" | "walking" | "swimming" | "strength" | "other";

export const SPORT_LABELS: Record<SportCategory, string> = {
  running: "Running",
  cycling: "Cycling",
  hiking: "Hiking",
  walking: "Walking",
  swimming: "Swimming",
  strength: "Strength",
  other: "Other",
};

// Garmin typeKeys are granular (trail_running, indoor_cycling, lap_swimming...),
// so bucket by substring into a handful of readable categories.
export function categorize(typeKey: string): SportCategory {
  const k = typeKey.toLowerCase();
  if (k.includes("run")) return "running";
  if (k.includes("cycl") || k.includes("bik") || k.includes("ride")) return "cycling";
  if (k.includes("hik")) return "hiking";
  if (k.includes("walk")) return "walking";
  if (k.includes("swim")) return "swimming";
  if (k.includes("strength") || k.includes("fitness_equipment") || k.includes("hiit") || k.includes("cardio")) {
    return "strength";
  }
  return "other";
}

export interface VolumeTotals {
  sessions: number;
  durationSeconds: number;
  distanceKm: number;
}

export interface MonthVolume extends VolumeTotals {
  key: string;
  label: string;
  bySport: ({ category: SportCategory; label: string } & VolumeTotals)[];
}

export function formatHours(totalSeconds: number): string {
  const totalMinutes = Math.round(totalSeconds / 60);
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return h > 0 ? `${h}h ${String(m).padStart(2, "0")}m` : `${m}m`;
}

function sum(activities: TrainingActivity[]): VolumeTotals {
  return {
    sessions: activities.length,
    durationSeconds: activities.reduce((s, a) => s + a.durationSeconds, 0),
    distanceKm: activities.reduce((s, a) => s + a.distanceMeters, 0) / 1000,
  };
}

/** Most recent month first. */
export function buildMonthlyVolume(activities: TrainingActivity[]): MonthVolume[] {
  const byMonth = new Map<string, TrainingActivity[]>();
  for (const a of activities) {
    const key = a.startTimeLocal.slice(0, 7); // "2026-06"
    if (!byMonth.has(key)) byMonth.set(key, []);
    byMonth.get(key)!.push(a);
  }

  return Array.from(byMonth.keys())
    .sort()
    .reverse()
    .map((key) => {
      const monthActivities = byMonth.get(key)!;
      const [year, month] = key.split("-").map(Number);
      const label = new Date(year, month - 1, 1).toLocaleString("en-US", { month: "long", year: "numeric" });

      const bySportMap = new Map<SportCategory, TrainingActivity[]>();
      for (const a of monthActivities) {
        const c = categorize(a.typeKey);
        if (!bySportMap.has(c)) bySportMap.set(c, []);
        bySportMap.get(c)!.push(a);
      }
      const bySport = Array.from(bySportMap.entries())
        .map(([category, list]) => ({ category, label: SPORT_LABELS[category], ...sum(list) }))
        .sort((x, y) => y.durationSeconds - x.durationSeconds);

      return { key, label, ...sum(monthActivities), bySport };
    });
}
