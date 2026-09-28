"use client";

import { useState } from "react";
import { formatHours, type MonthVolume } from "../lib/training-volume";

export function MonthTabs({ months }: { months: MonthVolume[] }) {
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
          <MiniStat label="Trainings" value={String(month.sessions)} />
          <MiniStat label="Time" value={formatHours(month.durationSeconds)} />
          <MiniStat label="Distance" value={`${month.distanceKm.toFixed(1)} km`} />
        </div>

        <div className="overflow-hidden rounded-md border border-line">
          <table className="w-full font-mono text-xs tabular-nums">
            <thead>
              <tr className="border-b border-line text-left text-[10px] uppercase tracking-widest text-muted-foreground">
                <th className="px-3 py-1.5 font-normal">Sport</th>
                <th className="px-3 py-1.5 text-right font-normal">Sessions</th>
                <th className="px-3 py-1.5 text-right font-normal">Time</th>
                <th className="px-3 py-1.5 text-right font-normal">Distance</th>
              </tr>
            </thead>
            <tbody>
              {month.bySport.map((s) => (
                <tr key={s.category} className="border-b border-line last:border-b-0">
                  <td className="px-3 py-1.5">{s.label}</td>
                  <td className="px-3 py-1.5 text-right">{s.sessions}</td>
                  <td className="px-3 py-1.5 text-right">{formatHours(s.durationSeconds)}</td>
                  <td className="px-3 py-1.5 text-right">
                    {s.distanceKm > 0 ? `${s.distanceKm.toFixed(1)} km` : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
