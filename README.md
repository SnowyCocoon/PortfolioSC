# PortfolioSC — Dominik Strzałko's Portfolio

Personal portfolio website for **Dominik Strzałko** (SnowyCocoon / Kokon) — Game Developer, Technical Artist & AI Engineer from Poznań, Poland.

Live at → **[snowycocoon.com](https://snowycocoon.com)**

---

## Stack

| Layer | Tech |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| Language | TypeScript |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Components | [shadcn/ui](https://ui.shadcn.com/) (Base UI) |
| Theming | [next-themes](https://github.com/pacocoursey/next-themes) |
| Analytics | [PostHog](https://posthog.com/) (optional) |
| Icons | [Lucide](https://lucide.dev/) + [Simple Icons CDN](https://simpleicons.org/) |
| Deployment | [Vercel](https://vercel.com/) |

---

## Design

Inspired by [chanhdai.com](https://chanhdai.com/) — retro terminal / pixel-grid aesthetic with:

- Full-bleed horizontal divider lines extending past the content column to viewport edges
- Diagonal-stripe `ScreenLine` separators between every section
- Dark / light mode toggle with brand-color-preserving icon containers
- Monospace typography throughout

---

## Sections

- **Profile Header** — avatar, name, rotating role flip-sentences
- **Overview** — current job, bio sentences, email, location, time, website
- **Social Links** — LinkedIn, ArtStation, Discord, YouTube, GitHub, itch.io
- **About** — extended bio
- **Quick Jump** — Project Portfolio / Art Portfolio links
- **Tech Stack: Gamedev** — Unity, C#, Godot, UE5, Blender, Substance, and more
- **Tech Stack: AI / ML / Data Science / Web Dev** — Python, PyTorch, TensorFlow, Next.js, React, and more
- **Blog** — dev-log posts with cover images, reading time, tags
- **Experience** — work history with company badges and bullet points
- **Education** — timeline: CDV → AMU MEng → AMU BEng
- **Projects** — categorised by GameDev / AI / Technical Art / Art / Web
- **Research & Presentations** — academic papers and talks
- **Certifications** — with provider icons and dates
- **Bookmarks** — curated external links

---

## Getting Started

```bash
# Install dependencies
npm install

# Run dev server (Turbopack)
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

Create `.env.local` for optional integrations:

```env
# PostHog analytics (optional)
NEXT_PUBLIC_POSTHOG_KEY=your_key_here
NEXT_PUBLIC_POSTHOG_HOST=https://eu.i.posthog.com
```

---

## Project Structure

```
src/
  app/
    (app)/          # Main app routes (page, blog/[slug])
    globals.css     # Tailwind v4 theme + custom utilities
    layout.tsx      # Root layout with providers
  components/
    screen-line.tsx       # Diagonal stripe section separator
    site-header.tsx       # Top nav bar
    site-footer.tsx       # Bottom footer
    theme-toggle.tsx      # Dark/light mode button
    ui/                   # shadcn/ui primitives
  config/
    user.ts         # USER constant — edit this to personalise
  features/
    portfolio/
      components/   # All page section components
      data/         # Static data: blog, experiences, education, projects…
      types/        # TypeScript interfaces
```

---

## Personalisation

Edit `src/config/user.ts` to update your name, avatar, flip-sentences, email, and links. All section data lives in `src/features/portfolio/data/`.

---

## License

MIT — feel free to fork and make it your own.
