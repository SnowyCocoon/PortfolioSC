import { Activity, ArrowRight, CheckCircle2, House, XCircle } from "lucide-react";
import { Panel, PanelHeader, PanelTitle, PanelContent } from "./panel";
import { fetchRunningActivities } from "../lib/garmin";
import {
  DISTANCE_TARGETS,
  computeBests,
  buildMonthlySummaries,
  formatDuration,
  withBaseline,
  type DistanceTarget,
} from "../lib/running-stats";
import { MonthTabs } from "./garmin-month-tabs";

// Personal bests look back to the start of 2024. The monthly breakdown below
// only shows June 2026 onward — a new training chapter — but the all-time
// records at the top aren't scoped to that cutoff.
const ALL_TIME_START = "2024-01-01";
const CHAPTER_START = "2026-06-01";

function todayISODate(): string {
  return new Date().toISOString().slice(0, 10);
}

export async function GarminRunning() {
  const activities = await fetchRunningActivities(ALL_TIME_START, todayISODate());
  const outdoorBests = withBaseline(computeBests(activities.filter((a) => !a.isTreadmill)));
  const treadmillBests = computeBests(activities.filter((a) => a.isTreadmill));
  const months = buildMonthlySummaries(activities.filter((a) => a.startTimeLocal >= CHAPTER_START));

  return (
    <Panel>
      <PanelHeader>
        <div className="flex items-center gap-2">
          <Activity className="size-4 text-[#b5392b]" />
          <PanelTitle>Running</PanelTitle>
        </div>
      </PanelHeader>

      <PanelContent>
        {activities.length === 0 ? (
          <p className="font-mono text-xs text-muted-foreground">
            Garmin data unavailable — stats will refresh once the connection is restored.
          </p>
        ) : (
          <>
            <h3 className="mb-2 font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Personal Bests
            </h3>
            <div className="mb-5 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
              {DISTANCE_TARGETS.map((target) => (
                <DistanceCard
                  key={target.key}
                  target={target}
                  bestSeconds={outdoorBests[target.key]}
                  treadmillSeconds={treadmillBests[target.key]}
                />
              ))}
            </div>

            {months.length > 0 && <MonthTabs months={months} distances={DISTANCE_TARGETS} />}
          </>
        )}
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
        {bestSeconds != null ? formatDuration(bestSeconds) : "—"}
      </div>
      {treadmillIsFaster && (
        <div className="mt-0.5 flex items-center gap-1 font-mono text-[10px] text-muted-foreground">
          <House className="size-2.5 shrink-0" />({formatDuration(treadmillSeconds!)} on treadmill)
        </div>
      )}
      {hasGoal && (
        <div className="flex items-center gap-1 font-mono text-[10px] text-muted-foreground">
          Goal <ArrowRight className="size-2.5" /> {formatDuration(target.goalSeconds!)}
        </div>
      )}
    </div>
  );
}
