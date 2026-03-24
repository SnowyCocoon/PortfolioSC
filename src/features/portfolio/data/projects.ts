import type { Project } from "../types";

export const PROJECTS: Project[] = [
  {
    id: "punch-lunch",
    title: "Punch Lunch: Foodtruck Fighter",
    description:
      "A fighting game developed at 3R Games with behavior trees, combat systems, and gameplay design.",
    href: "https://store.steampowered.com",
    tags: [{ label: "GameDev", category: "GameDev" }],
    date: "2025",
  },
  {
    id: "knoocker-box",
    title: "Knoocker Box Games",
    description:
      "Multiple games created for the Knoocker Box platform with voice recognition, AI game suggestion system, and skeletal animations.",
    href: "https://www.knoocker.com/knoocker-box/",
    tags: [
      { label: "GameDev", category: "GameDev" },
      { label: "AI", category: "AI" },
    ],
    date: "2021-2024",
  },
  {
    id: "voice-controlled-games",
    title: "Voice Controlled Games",
    description:
      "Research paper on implementing speech recognition and voice control in games. Best Paper Award at FedCSIS 2021.",
    href: "https://annals-csis.org/Volume_26/index.html",
    tags: [
      { label: "AI", category: "AI" },
      { label: "DataScience", category: "DataScience" },
    ],
    date: "2021",
  },
  {
    id: "card-planes",
    title: "Card Planes",
    description:
      "First place winner at Godot Gamejam #4. A game developed in a team of two in one week using Godot.",
    href: "https://adnovac.itch.io/card-planes",
    tags: [{ label: "GameDev", category: "GameDev" }],
    date: "2022",
  },
  {
    id: "hikari-games",
    title: "Hikari Marketing Games",
    description:
      "Panda Platformer, Hikari Picker, Hikari JRPG - marketing games created for the Hikari convention.",
    tags: [{ label: "GameDev", category: "GameDev" }],
    date: "2023-2025",
  },
  {
    id: "data-science-portfolio",
    title: "Data Science Portfolio",
    description:
      "Collection of AI/ML projects including NLP, Computer Vision, and Deep Learning experiments.",
    href: "https://github.com/SnowyCocoon/Data_Science_Portfolio",
    tags: [
      { label: "DataScience", category: "DataScience" },
      { label: "AI", category: "AI" },
    ],
    date: "2021-2022",
  },
  {
    id: "game-dev-portfolio",
    title: "Game Development Portfolio",
    description:
      "Comprehensive showcase of game development projects across Unity and Godot engines.",
    href: "https://github.com/SnowyCocoon/Game_Development_Portfolio",
    tags: [{ label: "GameDev", category: "GameDev" }],
    date: "2020-2024",
  },
  {
    id: "tech-art-portfolio",
    title: "Technical Art Portfolio",
    description:
      "VFX in Niagara, Environmental Art, Scene renders, Plugins for artists, procedural animations.",
    href: "https://www.artstation.com/snowycocoon",
    tags: [
      { label: "TechnicalArt", category: "TechnicalArt" },
      { label: "Art", category: "Art" },
    ],
    date: "2023-2025",
  },
  {
    id: "portfolio-website",
    title: "Portfolio Website",
    description:
      "This website! Built with Next.js 16, Tailwind CSS v4, and shadcn/ui.",
    href: "https://snowycocoon.com",
    tags: [{ label: "Web", category: "Web" }],
    date: "2026",
  },
];
