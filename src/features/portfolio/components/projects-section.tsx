"use client";

import { useState } from "react";
import {
  ArrowUpRight, X, ChevronDown,
  Gamepad2, Brain, BarChart3, Paintbrush2, Palette, Globe2, FolderOpen,
  Trophy, Glasses, Sparkles, Zap, Trees, LayoutGrid, Layers, Box,
  Network, Eye, Calculator, Bot, Wand2, Database, GitBranch, MessageSquare,
} from "lucide-react";
import type { ReactNode } from "react";
import {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelTitleSup,
} from "./panel";
import { Button } from "@/components/ui/button";
import { PROJECTS } from "../data/projects";
import { TAG_COLORS, type Project, type ProjectTagCategory } from "../types";

// ── Category icons ────────────────────────────────────────────────────────────
const CATEGORY_ICONS: Record<string, ReactNode> = {
  // Game / Art
  GameDev:         <Gamepad2 className="size-4" />,
  Gamejam:         <Trophy className="size-4" />,
  Unity:           <Gamepad2 className="size-4" />,
  Godot:           <Gamepad2 className="size-4" />,
  UnrealEngine:    <Gamepad2 className="size-4" />,
  VR:              <Glasses className="size-4" />,
  TechnicalArt:    <Paintbrush2 className="size-4" />,
  Shaders:         <Sparkles className="size-4" />,
  VFX:             <Zap className="size-4" />,
  EnvironmentalArt:<Trees className="size-4" />,
  UI:              <LayoutGrid className="size-4" />,
  SubstancePack:   <Layers className="size-4" />,
  Art:             <Palette className="size-4" />,
  Blender:         <Box className="size-4" />,
  Modeling3D:      <Box className="size-4" />,
  // AI / ML / Web
  AI:              <Brain className="size-4" />,
  ML:              <Brain className="size-4" />,
  NeuralNetworks:  <Network className="size-4" />,
  ComputerVision:  <Eye className="size-4" />,
  Math:            <Calculator className="size-4" />,
  DataScience:     <BarChart3 className="size-4" />,
  AgenticEngineering:<Bot className="size-4" />,
  VibeCoding:      <Wand2 className="size-4" />,
  Web:             <Globe2 className="size-4" />,
  NLP:             <MessageSquare className="size-4" />,
  Database:        <Database className="size-4" />,
  CICD:            <GitBranch className="size-4" />,
};

// ── Category background for the icon frame ───────────────────────────────────
const CATEGORY_BG: Record<string, string> = {
  // Brand red (#b5392b)
  GameDev:      "bg-[#b5392b]/10 text-[#b5392b] dark:bg-[#b5392b]/20 dark:text-[#f87171]",
  Gamejam:      "bg-[#b5392b]/10 text-[#b5392b] dark:bg-[#b5392b]/20 dark:text-[#f87171]",
  Unity:        "bg-[#b5392b]/10 text-[#b5392b] dark:bg-[#b5392b]/20 dark:text-[#f87171]",
  Godot:        "bg-[#b5392b]/10 text-[#b5392b] dark:bg-[#b5392b]/20 dark:text-[#f87171]",
  UnrealEngine: "bg-[#b5392b]/10 text-[#b5392b] dark:bg-[#b5392b]/20 dark:text-[#f87171]",
  VR:           "bg-[#b5392b]/10 text-[#b5392b] dark:bg-[#b5392b]/20 dark:text-[#f87171]",
  // Maroon (#9b2226)
  TechnicalArt:     "bg-[#9b2226]/10 text-[#9b2226] dark:bg-[#9b2226]/20 dark:text-[#fca5a5]",
  Shaders:          "bg-[#9b2226]/10 text-[#9b2226] dark:bg-[#9b2226]/20 dark:text-[#fca5a5]",
  VFX:              "bg-[#9b2226]/10 text-[#9b2226] dark:bg-[#9b2226]/20 dark:text-[#fca5a5]",
  EnvironmentalArt: "bg-[#9b2226]/10 text-[#9b2226] dark:bg-[#9b2226]/20 dark:text-[#fca5a5]",
  UI:               "bg-[#9b2226]/10 text-[#9b2226] dark:bg-[#9b2226]/20 dark:text-[#fca5a5]",
  SubstancePack:    "bg-[#9b2226]/10 text-[#9b2226] dark:bg-[#9b2226]/20 dark:text-[#fca5a5]",
  // Deep wine (#7d1128)
  Art:        "bg-[#7d1128]/10 text-[#7d1128] dark:bg-[#7d1128]/20 dark:text-[#fca5a5]",
  Blender:    "bg-[#7d1128]/10 text-[#7d1128] dark:bg-[#7d1128]/20 dark:text-[#fca5a5]",
  Modeling3D: "bg-[#7d1128]/10 text-[#7d1128] dark:bg-[#7d1128]/20 dark:text-[#fca5a5]",
  // Deep ice (#AEDBF0)
  AI:             "bg-[#AEDBF0]/50 text-[#1a4d6e] dark:bg-[#AEDBF0]/15 dark:text-[#AEDBF0]",
  ML:             "bg-[#AEDBF0]/50 text-[#1a4d6e] dark:bg-[#AEDBF0]/15 dark:text-[#AEDBF0]",
  NeuralNetworks: "bg-[#AEDBF0]/50 text-[#1a4d6e] dark:bg-[#AEDBF0]/15 dark:text-[#AEDBF0]",
  ComputerVision: "bg-[#AEDBF0]/50 text-[#1a4d6e] dark:bg-[#AEDBF0]/15 dark:text-[#AEDBF0]",
  Math:           "bg-[#AEDBF0]/50 text-[#1a4d6e] dark:bg-[#AEDBF0]/15 dark:text-[#AEDBF0]",
  // Light ice (#CBF1FA)
  DataScience:        "bg-[#CBF1FA]/60 text-[#1a5c7a] dark:bg-[#CBF1FA]/15 dark:text-[#CBF1FA]",
  AgenticEngineering: "bg-[#CBF1FA]/60 text-[#1a5c7a] dark:bg-[#CBF1FA]/15 dark:text-[#CBF1FA]",
  VibeCoding:         "bg-[#CBF1FA]/60 text-[#1a5c7a] dark:bg-[#CBF1FA]/15 dark:text-[#CBF1FA]",
  Web:                "bg-[#CBF1FA]/50 text-[#1a5c7a] dark:bg-[#CBF1FA]/10 dark:text-[#CBF1FA]",
  // Darker ice (#6BA7CC)
  NLP:      "bg-[#6BA7CC]/20 text-[#1a4d6e] dark:bg-[#6BA7CC]/20 dark:text-[#6BA7CC]",
  Database: "bg-[#6BA7CC]/20 text-[#1a4d6e] dark:bg-[#6BA7CC]/20 dark:text-[#6BA7CC]",
  CICD:     "bg-[#6BA7CC]/20 text-[#1a4d6e] dark:bg-[#6BA7CC]/20 dark:text-[#6BA7CC]",
};

// ── Build filter options from all tags used in PROJECTS (preserves insertion order) ──
const TAG_OPTIONS: { category: ProjectTagCategory; label: string }[] = Array.from(
  new Map(
    PROJECTS.flatMap((p) => p.tags).map((t) => [t.category, t.label])
  ).entries()
).map(([category, label]) => ({ category: category as ProjectTagCategory, label }));

// ── Section ───────────────────────────────────────────────────────────────────
export function ProjectsSection() {
  const [filter, setFilter] = useState<string>("all");

  const filtered =
    filter === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.tags.some((t) => t.category === filter));

  return (
    <Panel>
      <PanelHeader>
        <div className="flex items-center justify-between gap-3">
          <PanelTitle>
            Projects
            <PanelTitleSup>{filtered.length}</PanelTitleSup>
          </PanelTitle>

          {/* Tag filter — native select styled to match the mono design */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-md border border-line bg-background px-2 py-1 font-mono text-xs text-muted-foreground cursor-pointer transition-colors hover:border-[#b5392b]/50 focus:outline-none focus:border-[#b5392b]/70"
          >
            <option value="all">All Tags</option>
            {TAG_OPTIONS.map(({ category, label }) => (
              <option key={category} value={category}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </PanelHeader>

      {filter === "all" ? (
        <FilterableList items={filtered} />
      ) : (
        <div>
          {filtered.length === 0 ? (
            <div className="px-4 py-6 text-center font-mono text-xs text-muted-foreground">
              No projects for this tag yet.
            </div>
          ) : (
            filtered.map((project) => (
              <ProjectItem key={project.id} project={project} />
            ))
          )}
        </div>
      )}
    </Panel>
  );
}

/** Show first 5 with Show More/Less when unfiltered */
function FilterableList({ items }: { items: Project[] }) {
  const [expanded, setExpanded] = useState(false);
  const max = 5;
  const visible = expanded ? items : items.slice(0, max);

  return (
    <div>
      {visible.map((project) => (
        <ProjectItem key={project.id} project={project} />
      ))}
      {items.length > max && (
        <div className="flex justify-center border-t border-line py-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded(!expanded)}
            className="font-mono text-xs"
          >
            {expanded ? "Show Less" : "Show More"}
            <ChevronDown
              className={`ml-1 size-3 transition-transform ${expanded ? "rotate-180" : ""}`}
            />
          </Button>
        </div>
      )}
    </div>
  );
}

// ── Project row ───────────────────────────────────────────────────────────────
function ProjectItem({ project }: { project: Project }) {
  const primaryCategory = project.tags[0]?.category;
  const icon = primaryCategory
    ? (CATEGORY_ICONS[primaryCategory] ?? <FolderOpen className="size-4" />)
    : <FolderOpen className="size-4" />;
  const bgCls = primaryCategory
    ? (CATEGORY_BG[primaryCategory] ?? "bg-muted text-muted-foreground")
    : "bg-muted text-muted-foreground";

  const inner = (
    <>
      {/* Category icon */}
      <div className={`flex size-9 shrink-0 items-center justify-center rounded-lg border border-line ${bgCls}`}>
        {icon}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="font-mono text-xs font-bold">{project.title}</h3>
            <p className="font-mono text-xs text-muted-foreground">{project.date}</p>
            <p className="mt-0.5 font-mono text-xs text-muted-foreground">
              {project.description}
            </p>
          </div>

          {/* Tag badges — max 3 */}
          <div className="flex shrink-0 flex-col items-end gap-1">
            {project.tags.slice(0, 3).map((tag) => (
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

      {/* Link indicator — ↗ when linked, × (muted) when not, for alignment */}
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
