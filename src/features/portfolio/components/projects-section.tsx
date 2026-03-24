"use client";

import { ArrowUpRight, Gamepad2, Brain, BarChart3, Paintbrush2, Palette, Globe2, FolderOpen } from "lucide-react";
import type { ReactNode } from "react";
import {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelTitleSup,
} from "./panel";
import { CollapsibleList } from "@/components/collapsible-list";
import { PROJECTS } from "../data/projects";
import { TAG_COLORS, type Project } from "../types";

const CATEGORY_ICONS: Record<string, ReactNode> = {
  GameDev:      <Gamepad2 className="size-4" />,
  AI:           <Brain className="size-4" />,
  DataScience:  <BarChart3 className="size-4" />,
  TechnicalArt: <Paintbrush2 className="size-4" />,
  Art:          <Palette className="size-4" />,
  Web:          <Globe2 className="size-4" />,
};

// Category icon container: ice/snow + SnowyCocoon brand red palette
const CATEGORY_BG: Record<string, string> = {
  GameDev:      "bg-[#b5392b]/10 text-[#b5392b] dark:bg-[#b5392b]/20 dark:text-[#f87171]",
  AI:           "bg-[#AEDBF0]/50 text-[#1a4d6e] dark:bg-[#AEDBF0]/15 dark:text-[#AEDBF0]",
  DataScience:  "bg-[#CBF1FA]/60 text-[#1a5c7a] dark:bg-[#CBF1FA]/15 dark:text-[#CBF1FA]",
  TechnicalArt: "bg-[#6BA7CC]/20 text-[#1a4d6e] dark:bg-[#6BA7CC]/20 dark:text-[#6BA7CC]",
  Art:          "bg-[#530708]/10 text-[#b5392b] dark:bg-[#b5392b]/15 dark:text-[#fca5a5]",
  Web:          "bg-[#CBF1FA]/50 text-[#1a5c7a] dark:bg-[#CBF1FA]/10 dark:text-[#CBF1FA]",
};

export function ProjectsSection() {
  return (
    <Panel>
      <PanelHeader>
        <PanelTitle>
          Projects
          <PanelTitleSup>{PROJECTS.length}</PanelTitleSup>
        </PanelTitle>
      </PanelHeader>
      <CollapsibleList
        items={PROJECTS}
        max={5}
        renderItem={(project) => (
          <ProjectItem key={project.id} project={project} />
        )}
      />
    </Panel>
  );
}

function ProjectItem({ project }: { project: Project }) {
  const primaryCategory = project.tags[0]?.category;
  const icon = primaryCategory ? CATEGORY_ICONS[primaryCategory] : <FolderOpen className="size-4" />;
  const bgCls = primaryCategory ? (CATEGORY_BG[primaryCategory] ?? "bg-muted text-muted-foreground") : "bg-muted text-muted-foreground";

  return (
    <div className="flex gap-4 border-b border-line px-4 py-3 last:border-b-0">
      <div className={`flex size-9 shrink-0 items-center justify-center rounded-lg border border-line ${bgCls}`}>
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-mono text-xs font-bold">{project.title}</h3>
              {project.href && (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-[#b5392b]"
                >
                  <ArrowUpRight className="size-3" />
                </a>
              )}
            </div>
            <p className="font-mono text-xs text-muted-foreground">
              {project.date}
            </p>
            <p className="mt-0.5 font-mono text-xs text-muted-foreground">
              {project.description}
            </p>
          </div>

          <div className="flex shrink-0 flex-col items-end gap-1">
            {project.tags.map((tag) => (
              <span
                key={tag.label}
                className={`rounded px-1.5 py-0.5 font-mono text-[10px] ${TAG_COLORS[tag.category] ?? "bg-muted text-muted-foreground"}`}
              >
                {tag.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
