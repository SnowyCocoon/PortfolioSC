"use client";

import { useState } from "react";
import {
  ArrowUpRight, X, ChevronDown, ExternalLink,
  Paintbrush2, Sparkles, Zap, Trees, Layers, Palette, Box, FolderOpen,
  Gamepad2, Glasses,
} from "lucide-react";
import type { ReactNode } from "react";
import {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelTitleSup,
} from "./panel";
import { Button } from "@/components/ui/button";
import { ART_PROJECTS } from "../data/projects";
import { TAG_COLORS, type Project } from "../types";

// ── Icon / bg map for art categories ─────────────────────────────────────────
const CATEGORY_ICONS: Record<string, ReactNode> = {
  TechnicalArt:     <Paintbrush2 className="size-4" />,
  Shaders:          <Sparkles className="size-4" />,
  VFX:              <Zap className="size-4" />,
  EnvironmentalArt: <Trees className="size-4" />,
  SubstancePack:    <Layers className="size-4" />,
  Art:              <Palette className="size-4" />,
  Blender:          <Box className="size-4" />,
  Modeling3D:       <Box className="size-4" />,
  // engine tags that may be primary on cross-discipline projects
  Unity:            <Gamepad2 className="size-4" />,
  Godot:            <Gamepad2 className="size-4" />,
  UnrealEngine:     <Gamepad2 className="size-4" />,
  VR:               <Glasses className="size-4" />,
};

const CATEGORY_BG: Record<string, string> = {
  TechnicalArt:     "bg-[#9b2226]/10 text-[#9b2226] dark:bg-[#9b2226]/20 dark:text-[#fca5a5]",
  Shaders:          "bg-[#9b2226]/10 text-[#9b2226] dark:bg-[#9b2226]/15 dark:text-[#fca5a5]",
  VFX:              "bg-[#9b2226]/10 text-[#9b2226] dark:bg-[#9b2226]/15 dark:text-[#fca5a5]",
  EnvironmentalArt: "bg-[#9b2226]/10 text-[#9b2226] dark:bg-[#9b2226]/15 dark:text-[#fca5a5]",
  SubstancePack:    "bg-[#9b2226]/10 text-[#9b2226] dark:bg-[#9b2226]/15 dark:text-[#fca5a5]",
  Art:              "bg-[#7d1128]/10 text-[#7d1128] dark:bg-[#7d1128]/20 dark:text-[#fca5a5]",
  Blender:          "bg-[#7d1128]/10 text-[#7d1128] dark:bg-[#7d1128]/15 dark:text-[#fca5a5]",
  Modeling3D:       "bg-[#7d1128]/10 text-[#7d1128] dark:bg-[#7d1128]/15 dark:text-[#fca5a5]",
  Unity:            "bg-[#b5392b]/10 text-[#b5392b] dark:bg-[#b5392b]/20 dark:text-[#f87171]",
  Godot:            "bg-[#b5392b]/10 text-[#b5392b] dark:bg-[#b5392b]/20 dark:text-[#f87171]",
  UnrealEngine:     "bg-[#b5392b]/10 text-[#b5392b] dark:bg-[#b5392b]/20 dark:text-[#f87171]",
  VR:               "bg-[#b5392b]/10 text-[#b5392b] dark:bg-[#b5392b]/20 dark:text-[#f87171]",
};

// ── Section ───────────────────────────────────────────────────────────────────
export function ArtPortfolioSection() {
  const [expanded, setExpanded] = useState(false);
  const max = 5;
  const visible = expanded ? ART_PROJECTS : ART_PROJECTS.slice(0, max);

  return (
    <Panel>
      <PanelHeader>
        <PanelTitle>
          Art Portfolio
          <PanelTitleSup>{ART_PROJECTS.length}</PanelTitleSup>
        </PanelTitle>
      </PanelHeader>

      {/* ArtStation link — pinned at top */}
      <a
        href="https://www.artstation.com/snowycocoon"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-4 border-b border-line px-4 py-3 transition-colors hover:bg-accent/60"
      >
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-line bg-[#13AFF0]/10 text-[#13AFF0] dark:bg-[#13AFF0]/15 dark:text-[#13AFF0]">
          <ExternalLink className="size-4" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-mono text-xs font-bold">ArtStation Portfolio</p>
          <p className="font-mono text-xs text-muted-foreground">artstation.com/snowycocoon</p>
        </div>
        <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
      </a>

      {/* Art project rows */}
      {visible.map((project) => (
        <ArtProjectItem key={project.id} project={project} />
      ))}

      {ART_PROJECTS.length > max && (
        <div className="flex justify-center border-t border-line py-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded(!expanded)}
            className="font-mono text-xs"
          >
            {expanded ? "Show Less" : `Show More (${ART_PROJECTS.length - max} more)`}
            <ChevronDown
              className={`ml-1 size-3 transition-transform ${expanded ? "rotate-180" : ""}`}
            />
          </Button>
        </div>
      )}
    </Panel>
  );
}

// ── Art project row ───────────────────────────────────────────────────────────
// Picks the first art-discipline tag for the icon, falling back to first tag
const ART_CATS = new Set([
  "TechnicalArt", "Shaders", "VFX", "EnvironmentalArt",
  "SubstancePack", "Art", "Blender", "Modeling3D",
]);

function ArtProjectItem({ project }: { project: Project }) {
  const primaryTag =
    project.tags.find((t) => ART_CATS.has(t.category)) ?? project.tags[0];
  const primaryCategory = primaryTag?.category;
  const icon = primaryCategory
    ? (CATEGORY_ICONS[primaryCategory] ?? <FolderOpen className="size-4" />)
    : <FolderOpen className="size-4" />;
  const bgCls = primaryCategory
    ? (CATEGORY_BG[primaryCategory] ?? "bg-muted text-muted-foreground")
    : "bg-muted text-muted-foreground";

  const inner = (
    <>
      <div className={`flex size-9 shrink-0 items-center justify-center rounded-lg border border-line ${bgCls}`}>
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="font-mono text-xs font-bold">{project.title}</h3>
            <p className="font-mono text-xs text-muted-foreground">{project.date}</p>
            <p className="mt-0.5 font-mono text-xs text-muted-foreground">{project.description}</p>
          </div>

          {/* Tags — show first 3 + (+N) overflow */}
          <div className="flex shrink-0 flex-col items-end gap-1">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag.label}
                className={`rounded px-1.5 py-0.5 font-mono text-[10px] ${TAG_COLORS[tag.category] ?? "bg-muted text-muted-foreground"}`}
              >
                {tag.label}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="rounded px-1.5 py-0.5 font-mono text-[10px] bg-muted text-muted-foreground">
                +{project.tags.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>

      {project.href ? (
        <ArrowUpRight className="size-4 shrink-0 self-center text-muted-foreground transition-colors group-hover:text-foreground" />
      ) : (
        <X className="size-4 shrink-0 self-center text-muted-foreground/25" />
      )}
    </>
  );

  if (project.href) {
    return (
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex gap-4 border-b border-line px-4 py-3 last:border-b-0 transition-colors hover:bg-accent/60"
      >
        {inner}
      </a>
    );
  }

  return (
    <div className="flex gap-4 border-b border-line px-4 py-3 last:border-b-0">
      {inner}
    </div>
  );
}
