"use client";

import {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelContent,
} from "./panel";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { TechStackItem } from "../types";

interface TechStackProps {
  title: string;
  items: TechStackItem[];
}

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
          // Fallback to text if iconUrl fails to load
          const el = e.currentTarget as HTMLImageElement;
          el.style.display = "none";
          const parent = el.parentElement;
          if (parent) {
            parent.innerHTML = `<span class="text-center font-mono text-[8px] font-bold leading-tight text-zinc-400">${item.title.slice(0, 3)}</span>`;
          }
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

export function TechStack({ title, items }: TechStackProps) {
  return (
    <Panel>
      <PanelHeader>
        <PanelTitle>{title}</PanelTitle>
      </PanelHeader>
      <PanelContent>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8">
          {items.map((item) => (
            <Tooltip key={item.key}>
              <TooltipTrigger
                className="flex flex-col items-center gap-1.5 rounded-lg border border-line p-2 transition-all hover:border-[#b5392b]/40 hover:bg-accent"
                onClick={() => {
                  if (item.href) window.open(item.href, "_blank", "noopener,noreferrer");
                }}
                style={{ cursor: item.href ? "pointer" : "default" }}
              >
                {/* White bg container keeps brand colors visible in any theme */}
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
      </PanelContent>
    </Panel>
  );
}
