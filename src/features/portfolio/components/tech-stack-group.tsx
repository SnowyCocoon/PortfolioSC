"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { TechStackItem } from "../types";

/* ─── Icon renderer (shared with original tech-stack) ─── */
function TechIcon({ item }: { item: TechStackItem }) {
  if (item.iconSlug) {
    return (
      <img
        src={`https://cdn.simpleicons.org/${item.iconSlug}`}
        alt={item.title}
        className="size-full object-contain"
        loading="lazy"
      />
    );
  }
  if (item.iconUrl) {
    return (
      <img
        src={item.iconUrl}
        alt={item.title}
        className="size-full object-contain"
        loading="lazy"
        onError={(e) => {
          const el = e.currentTarget as HTMLImageElement;
          el.style.display = "none";
          const p = el.parentElement;
          if (p) p.innerHTML = `<span class="text-center font-mono text-[8px] font-bold leading-tight text-zinc-400">${item.title.slice(0, 3)}</span>`;
        }}
      />
    );
  }
  return (
    <span className="text-center font-mono text-[8px] font-bold leading-tight text-zinc-400">
      {item.title.slice(0, 3)}
    </span>
  );
}

/* ─── Single cell: title + 4-col icon grid ─── */
function TechStackCell({ title, items }: { title: string; items: TechStackItem[] }) {
  return (
    <div className="h-full">
      {/* Cell header — simple border (no screen-bleed inside a grid cell) */}
      <div className="border-b border-line px-4 py-2">
        <h2 className="font-mono text-lg font-bold">{title}</h2>
      </div>
      <div className="px-4 py-4">
        {/* 4 columns — 8 items = 2 rows, looks clean inside a half-width panel */}
        <div className="grid grid-cols-4 gap-2">
          {items.map((item) => (
            <Tooltip key={item.key}>
              <TooltipTrigger
                className="flex flex-col items-center gap-1.5 rounded-lg border border-line p-2 transition-all hover:border-[#b5392b]/40 hover:bg-accent"
                onClick={() => {
                  if (item.href) window.open(item.href, "_blank", "noopener,noreferrer");
                }}
                style={{ cursor: item.href ? "pointer" : "default" }}
              >
                <div className="flex size-8 items-center justify-center rounded-md bg-white p-1 shadow-sm">
                  <TechIcon item={item} />
                </div>
                <span className="w-full truncate text-center font-mono text-[9px] leading-tight text-muted-foreground">
                  {item.title}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                {item.href ? `${item.title} ↗` : item.title}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── 2×2 grid wrapper ─── */
export interface TechStackGroupItem {
  title: string;
  items: TechStackItem[];
}

export function TechStackGroup({ stacks }: { stacks: [TechStackGroupItem, TechStackGroupItem, TechStackGroupItem, TechStackGroupItem] }) {
  const [tl, tr, bl, br] = stacks;
  return (
    <section className="screen-line-top screen-line-bottom border-x border-line">
      <div className="grid grid-cols-1 sm:grid-cols-2">
        {/* Row 1 — left */}
        <div className="border-b border-line sm:border-r sm:border-line">
          <TechStackCell title={tl.title} items={tl.items} />
        </div>
        {/* Row 1 — right */}
        <div className="border-b border-line">
          <TechStackCell title={tr.title} items={tr.items} />
        </div>
        {/* Row 2 — left */}
        <div className="border-b border-line sm:border-b-0 sm:border-r sm:border-line">
          <TechStackCell title={bl.title} items={bl.items} />
        </div>
        {/* Row 2 — right (no border — outer section handles bottom) */}
        <div>
          <TechStackCell title={br.title} items={br.items} />
        </div>
      </div>
    </section>
  );
}
