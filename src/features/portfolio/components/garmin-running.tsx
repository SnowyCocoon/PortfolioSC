import { Activity, ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import { Panel, PanelHeader, PanelTitle, PanelContent } from "./panel";
import { fetchRunningActivities } from "../lib/garmin";
import {
  DISTANCE_TARGETS,
  computeBests,
  buildMonthlySummaries,
  formatDuration,
  type DistanceTarget,
} from "../lib/running-stats";
import { MonthTabs } from "./garmin-month-tabs";

const KCAL_PER_PIZZA_SLICE = 285;

export async function GarminRunning() {
  const activities = await fetchRunningActivities();
  const allTimeBests = computeBests(activities);
  const months = buildMonthlySummaries(activities);
  const pizzaSlices = Math.round(
    activities.reduce((sum, a) => sum + a.calories, 0) / KCAL_PER_PIZZA_SLICE,
  );

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
            <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
              {DISTANCE_TARGETS.map((target) => (
                <DistanceCard key={target.key} target={target} bestSeconds={allTimeBests[target.key]} />
              ))}
            </div>

            {pizzaSlices > 0 && (
              <p className="mb-5 font-mono text-xs text-muted-foreground">
                🍕 Lifetime calories burned running ≈ {pizzaSlices.toLocaleString()} slices of pizza.
              </p>
            )}

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
}: {
  target: DistanceTarget;
  bestSeconds: number | null;
}) {
  const hasGoal = target.goalSeconds != null;
  const passed = hasGoal && bestSeconds != null && bestSeconds <= target.goalSeconds!;

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
      {hasGoal && (
        <div className="flex items-center gap-1 font-mono text-[10px] text-muted-foreground">
          Goal <ArrowRight className="size-2.5" /> {formatDuration(target.goalSeconds!)}
        </div>
      )}
    </div>
  );
}
