"use client";

import { ArrowUpRight } from "lucide-react";
import {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelTitleSup,
} from "./panel";
import { CollapsibleList } from "@/components/collapsible-list";
import { PROJECTS } from "../data/projects";
import { TAG_COLORS, type Project } from "../types";

const CATEGORY_ICONS: Record<string, string> = {
  GameDev: "🎮",
  AI: "🤖",
  DataScience: "📊",
  TechnicalArt: "🎨",
  Art: "🖼️",
  Web: "🌐",
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
  const icon = primaryCategory ? CATEGORY_ICONS[primaryCategory] : "📁";

  return (
    <div className="flex gap-4 border-b border-line px-4 py-3 last:border-b-0">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-line bg-accent text-lg">
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
                  className="text-muted-foreground hover:text-foreground"
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
                className={`rounded px-1.5 py-0.5 font-mono text-[10px] ${TAG_COLORS[tag.category] || "bg-muted text-muted-foreground"}`}
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
