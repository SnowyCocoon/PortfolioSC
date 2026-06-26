"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowUpRight, X, ChevronDown, FolderOpen,
  Paintbrush2, Sparkles, Zap, Trees, Layers, Palette, Box,
  Gamepad2, Glasses,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  Panel, PanelHeader, PanelTitle, PanelTitleSup,
} from "./panel";
import { Button } from "@/components/ui/button";
import { ART_PROJECTS } from "../data/projects";
import { TAG_COLORS, type Project, type ProjectTagCategory } from "../types";

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  TechnicalArt: Paintbrush2, Shaders: Sparkles, VFX: Zap,
  EnvironmentalArt: Trees, SubstancePack: Layers,
  Art: Palette, Blender: Box, Modeling3D: Box,
  Unity: Gamepad2, Godot: Gamepad2, UnrealEngine: Gamepad2, VR: Glasses,
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

function platformBadge(href?: string): { src: string; alt: string } | null {
  if (!href) return null;
  if (href.includes("steampowered.com")) return { src: "/images/bonus_images/steam_logo.png", alt: "On Steam" };
  if (href.includes("itch.io"))          return { src: "/images/bonus_images/itch_logo.png", alt: "On itch.io" };
  if (href.includes("artstation.com"))   return { src: "/images/bonus_images/artstation_logo.png", alt: "On ArtStation" };
  if (href.includes("github.com"))       return { src: "/images/bonus_images/GitHub Colored.png", alt: "On GitHub" };
  if (href.includes("hikari.pl"))        return { src: "/images/companies/hikari_logo.jpg", alt: "Hikari Convention" };
  return null;
}

const TAG_OPTIONS: { category: ProjectTagCategory; label: string }[] = Array.from(
  new Map(ART_PROJECTS.flatMap((p) => p.tags).map((t) => [t.category, t.label])).entries()
).map(([category, label]) => ({ category: category as ProjectTagCategory, label }));

const ART_CATS = new Set([
  "TechnicalArt", "Shaders", "VFX", "EnvironmentalArt",
  "SubstancePack", "Art", "Blender", "Modeling3D",
]);

export function ArtPortfolioSection() {
  const [filter, setFilter] = useState<string>("all");
  const filtered =
    filter === "all"
      ? ART_PROJECTS
      : ART_PROJECTS.filter((p) => p.tags.some((t) => t.category === filter));

  return (
    <Panel>
      <PanelHeader>
        <div className="flex items-center justify-between gap-3">
          <PanelTitle>
            Art Portfolio
            <PanelTitleSup>{filtered.length}</PanelTitleSup>
          </PanelTitle>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-md border border-line bg-background px-2 py-1 font-mono text-xs text-muted-foreground cursor-pointer transition-colors hover:border-[#9b2226]/50 focus:outline-none focus:border-[#9b2226]/70"
          >
            <option value="all">All Tags</option>
            {TAG_OPTIONS.map(({ category, label }) => (
              <option key={category} value={category}>{label}</option>
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
            filtered.map((p) => <ArtProjectItem key={p.id} project={p} />)
          )}
        </div>
      )}
    </Panel>
  );
}

function FilterableList({ items }: { items: Project[] }) {
  const [expanded, setExpanded] = useState(true);
  const visible = expanded ? items : items.slice(0, 5);
  return (
    <div>
      {visible.map((p) => <ArtProjectItem key={p.id} project={p} />)}
      {items.length > 5 && (
        <div className="flex justify-center border-t border-line py-2">
          <Button variant="ghost" size="sm" onClick={() => setExpanded(!expanded)} className="font-mono text-xs">
            {expanded ? "Show Less" : `Show More (${items.length - 5} more)`}
            <ChevronDown className={`ml-1 size-3 transition-transform ${expanded ? "rotate-180" : ""}`} />
          </Button>
        </div>
      )}
    </div>
  );
}

function ArtProjectItem({ project }: { project: Project }) {
  const primaryTag = project.tags.find((t) => ART_CATS.has(t.category)) ?? project.tags[0];
  const primaryCategory = primaryTag?.category;
  const IconComponent: LucideIcon = CATEGORY_ICONS[primaryCategory] ?? FolderOpen;
  const bgCls = CATEGORY_BG[primaryCategory] ?? "bg-muted text-muted-foreground";

  const inner = (
    <>
      {/* Desktop: large thumbnail */}
      <div className="relative hidden h-24 w-36 shrink-0 overflow-hidden rounded-md border border-line sm:block">
        {project.coverImage ? (
          <Image src={project.coverImage} alt={project.title} fill sizes="144px" className="object-cover" unoptimized />
        ) : (
          <div className={`relative flex h-full w-full items-center justify-center ${bgCls}`}>
            <div className="absolute inset-0 bg-[repeating-linear-gradient(315deg,var(--color-line)_0,var(--color-line)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] opacity-30" />
            <IconComponent className="relative z-10 size-7" />
          </div>
        )}
        {platformBadge(project.href) && (
          <div className="absolute bottom-1.5 right-1.5 z-20 rounded bg-black/70 p-1">
            <Image src={platformBadge(project.href)!.src} alt={platformBadge(project.href)!.alt} width={14} height={14} className="opacity-90" unoptimized />
          </div>
        )}
      </div>
      {/* Mobile: small icon */}
      <div className={`flex size-9 shrink-0 items-center justify-center rounded-lg border border-line sm:hidden ${bgCls}`}>
        <IconComponent className="size-4" />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="font-mono text-sm font-bold">{project.title}</h3>
        <p className="mt-0.5 line-clamp-2 font-mono text-xs text-muted-foreground">{project.description}</p>
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          <span className="font-mono text-xs text-muted-foreground">{project.date}</span>
          {project.tags.slice(0, 5).map((tag) => (
            <span key={tag.label} className={`rounded px-1.5 py-0.5 font-mono text-[10px] ${TAG_COLORS[tag.category] ?? "bg-muted text-muted-foreground"}`}>
              {tag.label}
            </span>
          ))}
        </div>
      </div>

      {project.href ? (
        <ArrowUpRight className="size-4 shrink-0 self-center text-muted-foreground transition-colors group-hover:text-foreground" />
      ) : (
        <X className="size-4 shrink-0 self-center text-muted-foreground/25" />
      )}
    </>
  );

  const cls = "group flex gap-4 border-b border-line px-4 py-3 last:border-b-0 transition-colors hover:bg-accent/60";
  if (project.href) {
    return <a href={project.href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>;
  }
  return <div className={cls}>{inner}</div>;
}
