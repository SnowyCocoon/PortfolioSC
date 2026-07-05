"use client";

import { useState } from "react";
import { formatDuration, type DistanceTarget, type MonthSummary } from "../lib/running-stats";

export function MonthTabs({
  months,
  distances,
}: {
  months: MonthSummary[];
  distances: DistanceTarget[];
}) {
  const [active, setActive] = useState(0);
  const month = months[active];

  return (
    <div>
      <div className="flex flex-wrap gap-1 border-b border-line pb-3">
        {months.map((m, i) => (
          <button
            key={m.key}
            onClick={() => setActive(i)}
            className={`rounded px-2.5 py-1 font-mono text-xs transition-colors ${
              i === active
                ? "bg-[#b5392b] text-white"
                : "border border-line text-muted-foreground hover:bg-accent"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="mt-4">
        <div className="mb-4 grid grid-cols-3 gap-2">
          <MiniStat label="Runs" value={String(month.runCount)} />
          <MiniStat label="Volume" value={`${month.totalDistanceKm.toFixed(1)} km`} />
          <MiniStat label="Time" value={formatDuration(month.totalDurationSeconds)} />
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
          {distances.map((d) => (
            <div key={d.key} className="rounded-md border border-line px-3 py-2">
              <span className="font-mono text-[11px] text-muted-foreground">{d.label}</span>
              <div className="mt-1 font-mono text-sm font-bold tabular-nums">
                {month.bests[d.key] != null ? formatDuration(month.bests[d.key]!) : "—"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-line px-3 py-2 text-center">
      <div className="font-mono text-[10px] text-muted-foreground">{label}</div>
      <div className="font-mono text-base font-bold tabular-nums">{value}</div>
    </div>
  );
}
