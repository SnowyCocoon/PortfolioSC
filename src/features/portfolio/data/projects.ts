import type { Project } from "../types";

// ── Helper: parse the last (end) year from a date string ──────────────────────
// "2021"         → 2021
// "2021-2024"    → 2024
// "2025-Present" → 2026  (treat Present as current year)
function parseEndYear(date: string): number {
  const normalized = date.replace(/present/i, "2026");
  const parts = normalized.split(/[-–]/);
  return parseInt(parts[parts.length - 1].trim(), 10) || 0;
}

const RAW_PROJECTS: Project[] = [
  // ── 2026 ──────────────────────────────────────────────────────────────────
  {
    id: "hikari-unannounced",
    title: "Hikari Convention New Unannounced Game",
    description: "New game in development for the Hikari anime convention. More info soon!",
    href: "https://hikari.pl/",
    tags: [{ label: "Game Dev", category: "GameDev" }, { label: "Unity", category: "Unity" }],
    date: "2026-Present",
  },
  {
    id: "portfolio-website",
    title: "Portfolio Website",
    description: "This website! Built with Next.js 16, Tailwind CSS v4, and shadcn/ui.",
    href: "https://www.snowycocoon.com/",
    tags: [{ label: "Web", category: "Web" }, { label: "Agentic Eng.", category: "AgenticEngineering" }],
    date: "2026",
  },
  {
    id: "punch-lunch",
    title: "Punch Lunch: Foodtruck Fighter",
    description:
      "Fighting game at 3R Games — behavior trees, combat systems, environmental mechanics, and gameplay design in Unity.",
    href: "https://store.steampowered.com/app/3976200/Punch_Lunch_Foodtruck_Fighter",
    tags: [{ label: "Game Dev", category: "GameDev" }, { label: "Unity", category: "Unity" }],
    date: "2025-Present",
  },
  {
    id: "intermission-games",
    title: "Intermission Games",
    description:
      "Interactive games for Twitch chat audiences — advergame engineering for live streaming platforms.",
    href: "https://sidestream.games/",
    tags: [{ label: "Game Dev", category: "GameDev" }, { label: "Godot", category: "Godot" }],
    date: "2024-2026",
  },
  {
    id: "hikari-data-analysis",
    title: "Hikari Convention Data Analysis",
    description:
      "Analysing ticket sales, social media data, questionnaires, and competitor research to improve the Hikari convention.",
    href: "https://hikari.pl/",
    tags: [{ label: "Data Science", category: "DataScience" }],
    date: "2023-Present",
  },

  // ── 2025 ──────────────────────────────────────────────────────────────────
  {
    id: "psx-nature-texture-pack",
    title: "PSX Nature Texture Pack",
    description:
      "Low-res retro nature textures mimicking PSX-era aesthetics — optimised for indie game developers.",
    href: "https://www.artstation.com/artwork/K3WQyo",
    tags: [
      { label: "Technical Art", category: "TechnicalArt" },
      { label: "Substance Pack", category: "SubstancePack" },
    ],
    date: "2025",
  },
  {
    id: "psx-nature-pack",
    title: "PSX Nature Pack — Free Foliage",
    description:
      "Free PSX-style foliage pack with trees, bushes, and grass for retro-aesthetic game projects.",
    href: "https://www.artstation.com/artwork/K3WQyo",
    tags: [{ label: "Art", category: "Art" }, { label: "3D Modeling", category: "Modeling3D" }],
    date: "2025",
  },
  {
    id: "bloody-cellar-psx",
    title: "Bloody Cellar PSX Pack",
    description:
      "PSX-style horror cellar texture and prop pack targeting retro low-poly aesthetics.",
    href: "https://www.artstation.com/artwork/L4QvKR",
    tags: [
      { label: "Technical Art", category: "TechnicalArt" },
      { label: "Art", category: "Art" },
      { label: "Substance Pack", category: "SubstancePack" },
    ],
    date: "2025",
  },
  {
    id: "camouflage-pack-2",
    title: "Camouflage Pattern Pack 2",
    description:
      "Second volume of procedural camouflage PBR textures — multiple variants built in Substance Designer.",
    href: "https://snowycocoon.itch.io/camouflage-texture-pack-2",
    tags: [
      { label: "Technical Art", category: "TechnicalArt" },
      { label: "Substance Pack", category: "SubstancePack" },
    ],
    date: "2025",
  },
  {
    id: "substance-plugin",
    title: "Substance Designer Plugin — Mass Exporter",
    description:
      "Python plugin for Substance Designer that batch-exports graphs, speeding up material pipeline workflows.",
    href: "https://www.artstation.com/artwork/Gv3eOW",
    tags: [
      { label: "Technical Art", category: "TechnicalArt" },
      { label: "Substance Pack", category: "SubstancePack" },
    ],
    date: "2025",
  },
  {
    id: "buttons-pbr",
    title: "Buttons PBR Material",
    description:
      "Procedural button PBR material made in Substance Designer with configurable shape and wear parameters.",
    href: "https://www.artstation.com/artwork/dy9EQW",
    tags: [
      { label: "Technical Art", category: "TechnicalArt" },
      { label: "Substance Pack", category: "SubstancePack" },
    ],
    date: "2025",
  },
  {
    id: "camouflage-pack-1",
    title: "Camouflage Pattern Pack 1",
    description:
      "Procedural camouflage PBR textures in Substance Designer — military and woodland variants.",
    href: "https://snowycocoon.itch.io/camouflage-texture-pack-1",
    tags: [
      { label: "Technical Art", category: "TechnicalArt" },
      { label: "Substance Pack", category: "SubstancePack" },
    ],
    date: "2025",
  },
  {
    id: "cotton-ripstop-fabric",
    title: "Cotton Ripstop Fabric Pack",
    description:
      "Procedural PBR fabric material pack created in Substance Designer — game-ready tileable textures.",
    href: "https://www.artstation.com/artwork/6LRJdV",
    tags: [
      { label: "Technical Art", category: "TechnicalArt" },
      { label: "Substance Pack", category: "SubstancePack" },
    ],
    date: "2025",
  },
  {
    id: "hearts-pattern-pbr",
    title: "Hearts Pattern PBR Pack",
    description:
      "Stylised hearts pattern PBR material made procedurally in Substance Designer for game engines.",
    href: "https://snowycocoon.itch.io/hearts-pattern-pbr-fabric-material",
    tags: [
      { label: "Technical Art", category: "TechnicalArt" },
      { label: "Substance Pack", category: "SubstancePack" },
    ],
    date: "2025",
  },
  {
    id: "unannounced-mpdg",
    title: "Unannounced Game from MPDG",
    description: "Game in development at Manic Pixel Dream Games. More info soon!",
    href: "https://manicpixeldream.games/",
    tags: [{ label: "Game Dev", category: "GameDev" }],
    date: "2025",
  },

  // ── 2023–2025 ─────────────────────────────────────────────────────────────
  {
    id: "hikari-games",
    title: "Hikari Marketing Games",
    description:
      "Panda Platformer, Pandagotchi, Hikari Picker, Hikari JRPG — advergames for the Hikari anime convention.",
    href: "https://hikari.pl/",
    tags: [{ label: "Data Science", category: "DataScience" }],
    date: "2023-2025",
  },

  // ── 2024 ──────────────────────────────────────────────────────────────────
  {
    id: "unity-tool-creation",
    title: "Unity Tool Creation",
    description:
      "Custom Unity editor tools for artists — streamlining level design, asset placement, and iteration workflows.",
    href: "https://www.artstation.com/artwork/L4ava0",
    tags: [{ label: "Technical Art", category: "TechnicalArt" }, { label: "Unity", category: "Unity" }],
    date: "2024",
  },
  {
    id: "unity-shaders",
    title: "Unity Shaders",
    description:
      "Collection of custom shaders for Unity — stylised effects, surface shaders, and post-processing experiments.",
    href: "https://www.artstation.com/artwork/x336e1",
    tags: [
      { label: "Technical Art", category: "TechnicalArt" },
      { label: "Shaders", category: "Shaders" },
      { label: "Unity", category: "Unity" },
    ],
    date: "2024",
  },
  {
    id: "iris-portal-vfx",
    title: "Iris Portal — VFX",
    description:
      "Real-time VFX portal effect in Unity using particle systems, shaders, and distortion to create a magical iris gate.",
    href: "https://www.artstation.com/artwork/8Bb2zx",
    tags: [
      { label: "VFX", category: "VFX" },
      { label: "Technical Art", category: "TechnicalArt" },
      { label: "Unity", category: "Unity" },
    ],
    date: "2024",
  },
  {
    id: "potato-collector",
    title: "Potato Collector",
    description:
      "Created in 1H during the 0h Game Jam on a tram — collect potatoes and dodge beer in this 3D Godot action game.",
    href: "https://snowycocoon.itch.io/potato-collector",
    tags: [{ label: "Game Dev", category: "GameDev" }, { label: "Gamejam", category: "Gamejam" }, { label: "Godot", category: "Godot" }],
    date: "2024",
  },
  {
    id: "dress-up-your-knight",
    title: "Dress Up Your Knight",
    description:
      "VR adventure for XR Game Jam 2024 — play as a loyal squire dressing up a knight in a low-poly world.",
    href: "https://snowycocoon.itch.io/dress-up-your-knight",
    tags: [
      { label: "VR", category: "VR" },
      { label: "Game Dev", category: "GameDev" },
      { label: "Gamejam", category: "Gamejam" },
      { label: "Unity", category: "Unity" },
    ],
    date: "2024",
  },
  {
    id: "cheetos-instreamly",
    title: "Cheetos × Instreamly",
    description:
      "Advergame for Cheetos and PepsiCo — take care of a cat in this Twitch-integrated browser game.",
    href: "https://sidestream.games/",
    tags: [{ label: "Game Dev", category: "GameDev" }, { label: "Godot", category: "Godot" }],
    date: "2024",
  },
  {
    id: "night-alley",
    title: "Night Alley",
    description:
      "Atmospheric urban environment scene crafted in Unreal Engine 5 with advanced lighting and handcrafted details.",
    href: "https://www.artstation.com/artwork/Gey01d",
    tags: [
      { label: "Technical Art", category: "TechnicalArt" },
      { label: "Environmental Art", category: "EnvironmentalArt" },
      { label: "Unreal Engine", category: "UnrealEngine" },
    ],
    date: "2024",
  },
  {
    id: "spring-hills",
    title: "Spring Hills",
    description:
      "Lush UE5 landscape environment with procedural foliage placement, terrain sculpting, and Nanite assets.",
    href: "https://www.artstation.com/artwork/WBWOov",
    tags: [
      { label: "Technical Art", category: "TechnicalArt" },
      { label: "Environmental Art", category: "EnvironmentalArt" },
      { label: "Unreal Engine", category: "UnrealEngine" },
    ],
    date: "2024",
  },

  // ── 2021–2024 ─────────────────────────────────────────────────────────────
  {
    id: "knoocker-box",
    title: "Knoocker Box Games",
    description:
      "Multiple games for the Knoocker Box platform — voice recognition, AI game suggestion system, skeletal animations.",
    href: "https://github.com/SnowyCocoon/Game_Development_Portfolio/blob/main/Knowla.md",
    tags: [{ label: "Game Dev", category: "GameDev" }, { label: "Unity", category: "Unity" }],
    date: "2021-2024",
  },

  // ── 2023 ──────────────────────────────────────────────────────────────────
  {
    id: "foodie-finds-love",
    title: "Foodie Finds Love",
    description:
      "Agentic Engineering before it was cool — AI-driven dating sim at a food festival with LLMs and generative art.",
    href: "https://adriannowak97.itch.io/foodie-finds-love",
    tags: [
      { label: "Agentic Eng.", category: "AgenticEngineering" },
      { label: "AI", category: "AI" },
      { label: "Game Dev", category: "GameDev" },
    ],
    date: "2023",
  },
  {
    id: "perfume-recommender",
    title: "Perfume Recommender",
    description:
      "Trying to suggest perfumes based on user prompts — ML recommender using collaborative filtering and NLP.",
    href: "https://github.com/SnowyCocoon/Data_Science_Portfolio",
    tags: [{ label: "Data Science", category: "DataScience" }, { label: "AI", category: "AI" }],
    date: "2023",
  },
  {
    id: "visual-simulation",
    title: "Visual Simulation",
    description:
      "Computer vision detecting trees from real-world images based on a neural network trained on Unity (SpeedTree) renders.",
    href: "https://github.com/SnowyCocoon/Data_Science_Portfolio/tree/master/Computer%20Vision/1.%20Visual%20Simulation",
    tags: [{ label: "Computer Vision", category: "ComputerVision" }, { label: "Unity", category: "Unity" }],
    date: "2023",
  },

  // ── 2022 ──────────────────────────────────────────────────────────────────
  {
    id: "tactical-ghosts",
    title: "Tactical Ghosts: The Impification",
    description:
      "Ludum Dare 50 entry — blend of chess and fantasy; delay the imp invasion with strategy and quick reflexes.",
    href: "https://snowycocoon.itch.io/tactical-ghosts-the-impification",
    tags: [{ label: "Game Dev", category: "GameDev" }, { label: "Gamejam", category: "Gamejam" }, { label: "Unity", category: "Unity" }],
    date: "2022",
  },
  {
    id: "card-planes",
    title: "Card Planes",
    description:
      "First place winner at Godot Gamejam #4. Developed in a team of two in one week using Godot.",
    href: "https://adnovac.itch.io/card-planes",
    tags: [{ label: "Game Dev", category: "GameDev" }, { label: "Gamejam", category: "Gamejam" }, { label: "Godot", category: "Godot" }],
    date: "2022",
  },
  {
    id: "pagan-runner",
    title: "Pagan Runner",
    description:
      "Gamejam endless runner with Slavic pagan mythology — dodge obstacles and collect offerings.",
    href: "https://gamejolt.com/games/pagan_runner/732468",
    tags: [{ label: "Game Dev", category: "GameDev" }, { label: "Gamejam", category: "Gamejam" }, { label: "Godot", category: "Godot" }],
    date: "2022",
  },
  {
    id: "great-barrier-reef",
    title: "Kaggle — Great Barrier Reef CV",
    description:
      "Kaggle competition: TensorFlow object-detection model identifying crown-of-thorns starfish in underwater footage.",
    href: "https://www.kaggle.com/code/dominikstrzalko/rhea-team-yolov5-infer",
    tags: [{ label: "Data Science", category: "DataScience" }, { label: "Computer Vision", category: "ComputerVision" }],
    date: "2022",
  },

  // ── 2021 ──────────────────────────────────────────────────────────────────
  {
    id: "seeder",
    title: "Seeder",
    description:
      "Tower defence set in 2147 — restore Earth as an awakened Slavic druid planting trees against mutated garbage monsters.",
    href: "https://snowycocoon.itch.io/seeder",
    tags: [{ label: "Game Dev", category: "GameDev" }, { label: "Gamejam", category: "Gamejam" }, { label: "Unity", category: "Unity" }],
    date: "2021",
  },
  {
    id: "voice-controlled-games",
    title: "Voice Controlled Games",
    description:
      "Research paper on speech recognition and voice control in games. Best Paper Award at FedCSIS 2021.",
    href: "https://annals-csis.org/proceedings/2021/pliks/143.pdf",
    tags: [
      { label: "Unity", category: "Unity" },
      { label: "Godot", category: "Godot" },
      { label: "NLP", category: "NLP" },
    ],
    date: "2021",
  },
  {
    id: "chatbot-janet",
    title: "Chatbot Janet",
    description:
      "NLP-powered conversational chatbot — rule-based and neural hybrid approach for hospital reception simulation.",
    href: "https://github.com/SnowyCocoon/Data_Science_Portfolio/tree/master/NLP/7.%20Hospital%20ChatBot",
    tags: [{ label: "AI", category: "AI" }, { label: "ML", category: "ML" }],
    date: "2021",
  },
  {
    id: "math-finance-stats",
    title: "Math, Finance and Statistics",
    description:
      "University DS projects covering bootstrap T-testing, MCMC simulations, financial modelling, and statistical analysis.",
    href: "https://github.com/SnowyCocoon/Data_Science_Portfolio/tree/master/Math%2CFinance%20and%20Statistics",
    tags: [{ label: "Data Science", category: "DataScience" }, { label: "Math", category: "Math" }],
    date: "2021",
  },
  {
    id: "peanut-butter-invasion",
    title: "Peanut Butter Invasion",
    description:
      "Godot arcade bullet-hell: defend Earth from peanut butter — endless mode, 4 power-ups, online leaderboard.",
    href: "https://snowycocoon.itch.io/peanut-butter-invasion",
    tags: [{ label: "Game Dev", category: "GameDev" }, { label: "Godot", category: "Godot" }],
    date: "2021",
  },

  // ── 2020 ──────────────────────────────────────────────────────────────────
  {
    id: "twin-turbo-papamobile",
    title: "Twin-Turbo Supercharged Nitro-Fueled Papamobile",
    description:
      "Gamejam racing game on Steam — chaotic top-down driving with absurd physics, released commercially via Godot.",
    href: "https://store.steampowered.com/app/1344800/TwinTurbo_Supercharged_NitroFueled_Papamobile/",
    tags: [{ label: "Game Dev", category: "GameDev" }, { label: "Gamejam", category: "Gamejam" }, { label: "Godot", category: "Godot" }],
    date: "2020",
  },

  // ── 2019 ──────────────────────────────────────────────────────────────────
  {
    id: "onryou-pit",
    title: "Onryō Pit",
    description:
      "My first real project on itch.io — help Maya escape Yomi (the Land of Darkness) across 15 levels with 45 collectible hearts.",
    href: "https://snowycocoon.itch.io/onryou-pit",
    tags: [{ label: "Game Dev", category: "GameDev" }, { label: "Unity", category: "Unity" }, { label: "Art", category: "Art" }],
    date: "2019",
  },
];

// Sort by end year descending (latest project first)
export const PROJECTS: Project[] = RAW_PROJECTS.slice().sort(
  (a, b) => parseEndYear(b.date) - parseEndYear(a.date)
);

// ── Art portfolio subset ───────────────────────────────────────────────────────
// Projects that have at least one art-discipline tag
const ART_CATEGORIES = new Set([
  "TechnicalArt", "Shaders", "VFX", "EnvironmentalArt",
  "SubstancePack", "Art", "Blender", "Modeling3D",
]);

export const ART_PROJECTS: Project[] = PROJECTS.filter((p) =>
  p.tags.some((t) => ART_CATEGORIES.has(t.category))
);
