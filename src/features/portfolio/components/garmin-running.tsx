import { Activity, ArrowRight, CheckCircle2, House, XCircle } from "lucide-react";
import { Panel, PanelHeader, PanelTitle, PanelContent } from "./panel";
import { DataCheckpointNotice } from "./data-checkpoint-notice";
import { lastGood } from "../lib/last-good";
import { fetchAllActivities, fetchRunningActivities, getGarminAccessToken } from "../lib/garmin";
import { GARMIN_SNAPSHOT, type GarminStats } from "../data/garmin-snapshot";
import { buildMonthlyVolume } from "../lib/training-volume";
import {
  DISTANCE_TARGETS,
  computeBests,
  formatTargetTime,
  withBaseline,
  type DistanceTarget,
} from "../lib/running-stats";
import { MonthTabs } from "./garmin-month-tabs";

// Personal bests look back to the start of 2024. The monthly training volume
// below (all sports, not just running) only covers June 2026 onward — a new
// training chapter — but the all-time records aren't scoped to that cutoff.
const ALL_TIME_START = "2024-01-01";
const CHAPTER_START = "2026-06-01";

function todayISODate(): string {
  return new Date().toISOString().slice(0, 10);
}

// Pulling every run's per-second stream from Garmin takes ~20s, so the whole
// computation is cached once a day (like the OSRS hiscores). Only the small
// derived result is stored — the raw streams are too big for the data cache.
// If Garmin can't be reached, the last good pull keeps being shown.
const getGarminStats = lastGood<GarminStats>(
  "garmin-hobby-stats-v3",
  async () => {
    const token = await getGarminAccessToken();
    const [activities, training] = await Promise.all([
      fetchRunningActivities(token, ALL_TIME_START, todayISODate()),
      fetchAllActivities(token, CHAPTER_START, todayISODate()),
    ]);
    if (activities.length === 0) throw new Error("Garmin returned no running activities");
    return {
      outdoorBests: withBaseline(computeBests(activities.filter((a) => !a.isTreadmill))),
      treadmillBests: computeBests(activities.filter((a) => a.isTreadmill)),
      months: buildMonthlyVolume(training),
    };
  },
  GARMIN_SNAPSHOT,
);

export async function GarminRunning() {
  const { data, fetchedAt, unavailable } = await getGarminStats();
  const { outdoorBests, treadmillBests, months } = data;

  return (
    <Panel>
      <PanelHeader>
        <div className="flex items-center gap-2">
          <Activity className="size-4 text-[#b5392b]" />
          <PanelTitle>Running &amp; Training</PanelTitle>
        </div>
      </PanelHeader>

      <PanelContent>
        <h3 className="mb-2 font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground">
          All-Time Personal Bests
        </h3>
        <div className="mb-5 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {DISTANCE_TARGETS.map((target) => (
            <DistanceCard
              key={target.key}
              target={target}
              bestSeconds={outdoorBests[target.key]}
              treadmillSeconds={treadmillBests[target.key]}
            />
          ))}
        </div>

        {months.length > 0 && (
          <>
            <h3 className="mb-2 font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Monthly Training Volume
            </h3>
            <MonthTabs months={months} />
          </>
        )}

        <DataCheckpointNotice source="Garmin" fetchedAt={fetchedAt} unavailable={unavailable} className="mt-3" />
      </PanelContent>
    </Panel>
  );
}

function DistanceCard({
  target,
  bestSeconds,
  treadmillSeconds,
}: {
  target: DistanceTarget;
  bestSeconds: number | null;
  treadmillSeconds: number | null;
}) {
  const hasGoal = target.goalSeconds != null;
  const passed = hasGoal && bestSeconds != null && bestSeconds <= target.goalSeconds!;
  const treadmillIsFaster =
    treadmillSeconds != null && (bestSeconds == null || treadmillSeconds < bestSeconds);

  return (
    <div className="rounded-md border border-line px-3 py-2">
      <div className="flex items-center justify-between gap-1">
        <span className="font-mono text-[11px] text-muted-foreground">{target.label}</span>
        {hasGoal &&
          (passed ? (
            <CheckCircle2 className="size-3.5 shrink-0 text-emerald-500" />
          ) : (
            <XCircle className="size-3.5 shrink-0 text-red-500" />
          ))}
      </div>
      <div className="mt-1 font-mono text-lg font-bold tabular-nums">
        {bestSeconds != null ? formatTargetTime(target, bestSeconds) : "—"}
      </div>
      {treadmillIsFaster && (
        <div className="mt-0.5 flex items-center gap-1 font-mono text-[10px] text-muted-foreground">
          <House className="size-2.5 shrink-0" />({formatTargetTime(target, treadmillSeconds!)} on treadmill)
        </div>
      )}
      {hasGoal && (
        <div className="flex items-center gap-1 font-mono text-[10px] text-muted-foreground">
          Goal <ArrowRight className="size-2.5" /> {formatTargetTime(target, target.goalSeconds!)}
        </div>
      )}
    </div>
  );
}
