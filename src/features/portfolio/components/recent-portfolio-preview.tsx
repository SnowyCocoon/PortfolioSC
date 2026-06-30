import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight, X, ArrowRight, FolderOpen,
  Gamepad2, Brain, BarChart3, Paintbrush2, Palette, Globe2,
  Trophy, Glasses, Sparkles, Zap, Trees, LayoutGrid, Layers, Box,
  Network, Eye, Calculator, Bot, Wand2, Database, GitBranch, MessageSquare,
  FileCode, Wrench, Braces,
  type LucideIcon,
} from "lucide-react";
import { Panel, PanelHeader, PanelTitle } from "./panel";
import { PROJECTS } from "../data/projects";
import { TAG_COLORS, type Project } from "../types";

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  GameDev: Gamepad2, Gamejam: Trophy, Unity: Gamepad2, Godot: Gamepad2,
  UnrealEngine: Gamepad2, VR: Glasses,
  TechnicalArt: Paintbrush2, Shaders: Sparkles, VFX: Zap,
  EnvironmentalArt: Trees, UI: LayoutGrid, SubstancePack: Layers,
  Art: Palette, Blender: Box, Modeling3D: Box,
  AI: Brain, ML: Brain, NeuralNetworks: Network, ComputerVision: Eye,
  Math: Calculator, DataScience: BarChart3, AgenticEngineering: Bot,
  VibeCoding: Wand2, Web: Globe2, NLP: MessageSquare,
  Database: Database, CICD: GitBranch,
  Python: FileCode, Tool: Wrench, CSharp: Braces,
};

const CATEGORY_BG: Record<string, string> = {
  GameDev: "bg-[#b5392b]/10 text-[#b5392b] dark:bg-[#b5392b]/20 dark:text-[#f87171]",
  Gamejam: "bg-[#b5392b]/10 text-[#b5392b] dark:bg-[#b5392b]/20 dark:text-[#f87171]",
  Unity: "bg-[#b5392b]/10 text-[#b5392b] dark:bg-[#b5392b]/20 dark:text-[#f87171]",
  Godot: "bg-[#b5392b]/10 text-[#b5392b] dark:bg-[#b5392b]/20 dark:text-[#f87171]",
  UnrealEngine: "bg-[#b5392b]/10 text-[#b5392b] dark:bg-[#b5392b]/20 dark:text-[#f87171]",
  VR: "bg-[#b5392b]/10 text-[#b5392b] dark:bg-[#b5392b]/20 dark:text-[#f87171]",
  TechnicalArt: "bg-[#9b2226]/10 text-[#9b2226] dark:bg-[#9b2226]/20 dark:text-[#fca5a5]",
  Shaders: "bg-[#9b2226]/10 text-[#9b2226] dark:bg-[#9b2226]/20 dark:text-[#fca5a5]",
  VFX: "bg-[#9b2226]/10 text-[#9b2226] dark:bg-[#9b2226]/20 dark:text-[#fca5a5]",
  EnvironmentalArt: "bg-[#9b2226]/10 text-[#9b2226] dark:bg-[#9b2226]/20 dark:text-[#fca5a5]",
  UI: "bg-[#9b2226]/10 text-[#9b2226] dark:bg-[#9b2226]/20 dark:text-[#fca5a5]",
  SubstancePack: "bg-[#9b2226]/10 text-[#9b2226] dark:bg-[#9b2226]/20 dark:text-[#fca5a5]",
  Art: "bg-[#7d1128]/10 text-[#7d1128] dark:bg-[#7d1128]/20 dark:text-[#fca5a5]",
  Blender: "bg-[#7d1128]/10 text-[#7d1128] dark:bg-[#7d1128]/20 dark:text-[#fca5a5]",
  Modeling3D: "bg-[#7d1128]/10 text-[#7d1128] dark:bg-[#7d1128]/20 dark:text-[#fca5a5]",
  AI: "bg-[#AEDBF0]/50 text-[#1a4d6e] dark:bg-[#AEDBF0]/15 dark:text-[#AEDBF0]",
  ML: "bg-[#AEDBF0]/50 text-[#1a4d6e] dark:bg-[#AEDBF0]/15 dark:text-[#AEDBF0]",
  NeuralNetworks: "bg-[#AEDBF0]/50 text-[#1a4d6e] dark:bg-[#AEDBF0]/15 dark:text-[#AEDBF0]",
  ComputerVision: "bg-[#AEDBF0]/50 text-[#1a4d6e] dark:bg-[#AEDBF0]/15 dark:text-[#AEDBF0]",
  Math: "bg-[#AEDBF0]/50 text-[#1a4d6e] dark:bg-[#AEDBF0]/15 dark:text-[#AEDBF0]",
  DataScience: "bg-[#CBF1FA]/60 text-[#1a5c7a] dark:bg-[#CBF1FA]/15 dark:text-[#CBF1FA]",
  AgenticEngineering: "bg-[#CBF1FA]/60 text-[#1a5c7a] dark:bg-[#CBF1FA]/15 dark:text-[#CBF1FA]",
  VibeCoding: "bg-[#CBF1FA]/60 text-[#1a5c7a] dark:bg-[#CBF1FA]/15 dark:text-[#CBF1FA]",
  Web: "bg-[#CBF1FA]/50 text-[#1a5c7a] dark:bg-[#CBF1FA]/10 dark:text-[#CBF1FA]",
  NLP: "bg-[#6BA7CC]/20 text-[#1a4d6e] dark:bg-[#6BA7CC]/20 dark:text-[#6BA7CC]",
  Database: "bg-[#6BA7CC]/20 text-[#1a4d6e] dark:bg-[#6BA7CC]/20 dark:text-[#6BA7CC]",
  CICD: "bg-[#6BA7CC]/20 text-[#1a4d6e] dark:bg-[#6BA7CC]/20 dark:text-[#6BA7CC]",
  Python: "bg-[#CBF1FA]/60 text-[#1a5c7a] dark:bg-[#CBF1FA]/15 dark:text-[#CBF1FA]",
  Tool:   "bg-[#6BA7CC]/20 text-[#1a4d6e] dark:bg-[#6BA7CC]/20 dark:text-[#6BA7CC]",
  CSharp: "bg-[#b5392b]/10 text-[#b5392b] dark:bg-[#b5392b]/15 dark:text-[#f87171]",
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

const RECENT = PROJECTS.slice(0, 5);

export function RecentPortfolioPreview() {
  return (
    <Panel>
      <PanelHeader>
        <PanelTitle>Portfolio</PanelTitle>
      </PanelHeader>

      <div>
        {RECENT.map((project) => (
          <PortfolioPreviewItem key={project.id} project={project} />
        ))}
      </div>

      <div className="grid grid-cols-2 border-t border-line">
        <Link
          href="/tech-portfolio"
          className="group flex items-center justify-between border-r border-line px-4 py-5 transition-colors hover:bg-accent"
        >
          <div className="flex items-center gap-2">
            <Gamepad2 className="size-4 text-muted-foreground" />
            <span className="font-mono text-sm font-medium">Tech Portfolio</span>
          </div>
          <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
        </Link>
        <Link
          href="/art-portfolio"
          className="group flex items-center justify-between px-4 py-5 transition-colors hover:bg-accent"
        >
          <div className="flex items-center gap-2">
            <Palette className="size-4 text-muted-foreground" />
            <span className="font-mono text-sm font-medium">Art Portfolio</span>
          </div>
          <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </Panel>
  );
}

function PortfolioPreviewItem({ project }: { project: Project }) {
  const primaryCategory = project.tags[0]?.category;
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
          <div className="absolute bottom-1.5 left-1.5 z-20 rounded bg-black/70 p-1">
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
