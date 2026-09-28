import type { RunActivity, RunLap } from "./garmin";

export interface DistanceTarget {
  key: string;
  label: string;
  meters: number;
  goalSeconds: number | null;
}

// Long-distance goals are paced off a 1:45:00 half marathon (~4:59/km),
// rounded to clean splits: 15k 1:15:00, 10mi 1:20:00, 20k 1:40:00.
export const DISTANCE_TARGETS: DistanceTarget[] = [
  { key: "100m", label: "100 m", meters: 100, goalSeconds: 15 },
  { key: "400m", label: "400 m", meters: 400, goalSeconds: 60 },
  { key: "half-mile", label: "1/2 Mile", meters: 804.672, goalSeconds: 150 },
  { key: "1k", label: "1 km", meters: 1000, goalSeconds: 210 },
  { key: "mile", label: "1 Mile", meters: 1609.344, goalSeconds: 360 },
  { key: "2mile", label: "2 Miles", meters: 3218.688, goalSeconds: 750 },
  { key: "5k", label: "5 km", meters: 5000, goalSeconds: 1350 },
  { key: "10k", label: "10 km", meters: 10000, goalSeconds: 3000 },
  { key: "15k", label: "15 km", meters: 15000, goalSeconds: 4500 },
  { key: "10mile", label: "10 Miles", meters: 16093.44, goalSeconds: 4800 },
  { key: "20k", label: "20 km", meters: 20000, goalSeconds: 6000 },
  { key: "half-marathon", label: "Half Marathon", meters: 21097.5, goalSeconds: 6300 },
];

// Confirmed lifetime PBs (verified by hand against Garmin's own Best Efforts
// widget). Our activity-stream approximation doesn't always land exactly on
// these, so we use them as a floor and only let a freshly computed time win
// if it's genuinely faster — meaning a new PB was actually run.
export const BASELINE_BESTS: Record<string, number> = {
  "400m": 78, // 1:18 — Poznań, 2 Sep 2026
  "half-mile": 180, // 3:00
  "1k": 228, // 3:48
  mile: 449, // 7:29
  "2mile": 929, // 15:29
  "5k": 1465, // 24:25
  "10k": 3206, // 53:26
  "15k": 4895, // 1:21:35
  "10mile": 5263, // 1:27:43
  "20k": 6641, // 1:50:41
  "half-marathon": 7045, // 1:57:25
};

export function withBaseline(computed: Record<string, number | null>): Record<string, number | null> {
  const merged: Record<string, number | null> = { ...computed };
  for (const key of Object.keys(BASELINE_BESTS)) {
    const baseline = BASELINE_BESTS[key];
    const current = merged[key];
    merged[key] = current != null && current < baseline ? current : baseline;
  }
  return merged;
}

export function formatDuration(totalSeconds: number): string {
  const s = Math.round(totalSeconds);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  return `${m}:${String(sec).padStart(2, "0")}`;
}

// Sprint distances are shown as seconds.milliseconds (e.g. 14.382s) — minute
// formatting would hide the difference between attempts.
export function formatTargetTime(target: DistanceTarget, totalSeconds: number): string {
  if (target.meters < 400) return `${totalSeconds.toFixed(3)}s`;
  return formatDuration(totalSeconds);
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
