# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Dev server with Turbopack on localhost:3000
npm run build    # Production build
npm run lint     # ESLint check
```

No test suite is configured.

## Environment Variables

Create `.env.local` for optional integrations:

```env
NEXT_PUBLIC_POSTHOG_KEY=your_key_here
NEXT_PUBLIC_POSTHOG_HOST=https://eu.i.posthog.com
```

## Architecture

**Next.js 16 App Router** with TypeScript, Tailwind CSS v4, and shadcn/ui (Base UI primitives).

### Route layout

- `src/app/layout.tsx` — root layout: fonts, OG metadata, JSON-LD schema, `<Providers>`
- `src/app/(app)/layout.tsx` — inner shell: `SiteHeader` + `SiteFooter` wrapping `<main>`
- `src/app/(app)/page.tsx` — home page; composes every section component in order
- Additional routes: `/blog`, `/blog/[slug]`, `/projects`, `/art-portfolio`, `/research`, `/hobby`

### Data layer (`src/features/portfolio/data/`)

All content is static TypeScript — no CMS, no API calls. To change displayed content, edit the relevant file:

| File | Content |
|---|---|
| `user.ts` | Name, bio, avatar, flip-sentences, location |
| `projects.ts` | `PROJECTS` array — `Project[]` |
| `experiences.ts` | Work history |
| `education.ts` | Education timeline |
| `certifications.ts` | Certifications |
| `research.ts` | Papers & presentations |
| `tech-stack-*.ts` | Four tech stack groups (gamedev / techart / ai / fullstack) |
| `blog.ts` | Blog post metadata |
| `bookmarks.ts` | Curated links |
| `social-links.ts` | Social profiles |

Site-wide config (URL, nav items, SEO keywords) is in `src/config/site.ts`.

### Types (`src/features/portfolio/types/index.ts`)

Contains all shared interfaces (`User`, `Project`, `Experience`, etc.) and the tag system:

- `ProjectTagCategory` — union of all valid tag keys
- `TAG_COLORS` — Tailwind class map for tag badges; two palettes: bloody reds (Game/Art) and ice blues (AI/ML/Web)
- `getSkillColor(skill)` — deterministic color from a hash, used for experience/education skill badges

**Projects have a max of 5 tags; UI shows first 3 + `(+N)` overflow badge.**

### Components (`src/features/portfolio/components/`)

Section components are rendered directly from `page.tsx`. `Panel` / `PanelHeader` / `PanelTitle` / `PanelTitleSup` (`panel.tsx`) are the shared card primitives wrapping every section.

`ProjectsSection` is a `"use client"` component with tag filter (native `<select>`) and "Show More/Less" collapse. All other section components are server components.

### Shared components (`src/components/`)

- `ScreenLine` — full-bleed diagonal-stripe separator rendered between every section on the home page
- `SiteHeader` / `SiteFooter` — nav and footer
- `Providers` — `ThemeProvider` (next-themes) + `PostHogProvider` + `TooltipProvider`
- `ui/` — shadcn/ui primitives (Button, Card, Separator, Tooltip, Sheet, Collapsible)

### Styling

Tailwind v4 — configuration is in `src/app/globals.css` via `@theme inline { … }` (no `tailwind.config.js`). Custom tokens used heavily: `--color-line`, `--color-pattern-foreground`, `--color-background`. All typography is monospace (`font-mono`).

Icons come from three sources: Lucide React, Simple Icons CDN, and TechIcons CDN (via `iconSlug` / `iconUrl` on data objects).