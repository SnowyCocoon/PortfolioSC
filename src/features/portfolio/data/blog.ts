export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  category: "technical" | "personal";
  tags: string[];
  readingTime: string;
  coverImage?: string;
  content: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "behavior-trees-unity-fighting-game",
    title: "Building Behavior Trees in Unity for a Fighting Game",
    date: "2026-03-01",
    description:
      "How I implemented modular, data-driven behavior trees for AI enemies and players in Punch Lunch: Foodtruck Fighter — and what I learned along the way.",
    category: "technical",
    tags: ["Unity", "Game AI", "C#", "GameDev"],
    readingTime: "6 min read",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&q=80",
    content: `<p><em>This post is a placeholder — full write-up coming soon.</em></p>`,
  },
  {
    slug: "aoto-station-japan",
    title: "Aoto Station & the Streets Around It",
    date: "2026-04-05",
    description:
      "A quiet afternoon wandering the neighbourhood around Aoto Station in Tokyo — vending machines, shotengai shopping streets, and the particular calm of an area that tourists never find.",
    category: "personal",
    tags: ["Japan", "Travel", "Tokyo"],
    readingTime: "3 min read",
    content: `<p><em>This post is a placeholder — full write-up coming soon.</em></p>`,
  },
];
