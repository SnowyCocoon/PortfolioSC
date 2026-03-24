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
              <TooltipTrigger className="flex flex-col items-center gap-1.5 rounded-lg border border-line p-2 transition-colors hover:bg-accent">
                {/* Icon wrapper: always white bg so brand colors are visible in any theme */}
                <div className="flex size-8 items-center justify-center rounded-md bg-white p-1 shadow-sm">
                  {item.iconSlug ? (
                    <img
                      src={`https://cdn.simpleicons.org/${item.iconSlug}`}
                      alt={item.title}
                      className="size-full object-contain"
                      loading="lazy"
                    />
                  ) : (
                    <span className="text-center font-mono text-[8px] font-bold leading-tight text-zinc-500">
                      {item.title.slice(0, 4)}
                    </span>
                  )}
                </div>
                <span className="w-full truncate text-center font-mono text-[9px] leading-tight text-muted-foreground">
                  {item.title}
                </span>
              </TooltipTrigger>
              <TooltipContent>{item.title}</TooltipContent>
            </Tooltip>
          ))}
        </div>
      </PanelContent>
    </Panel>
  );
}
