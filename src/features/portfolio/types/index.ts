export interface User {
  displayName: string;
  username: string;
  jobTitle: string;
  currentJobs: { company: string; title: string }[];
  volunteerRole?: string;
  location: string;
  locationSoon?: string;
  email: string;
  website: string;
  timezone: string;
  languages: { name: string; level: string }[];
  flipSentences: string[];
  about: string[];
  avatar: string;
}

export interface ExperiencePosition {
  title: string;
  employmentType: string;
  startDate: string;
  endDate: string;
  description: string[];
  skills: string[];
}

export interface Experience {
  id: string;
  companyName: string;
  companyWebsite?: string;
  logo?: string;
  positions: ExperiencePosition[];
  location?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  specialization?: string;
  startYear: string;
  endYear: string;
  grade?: string;
  info?: string;
  thesis?: string;
  skills: string[];
}

export interface SocialLink {
  title: string;
  subtitle: string;
  href: string;
  icon: string;
  /** Direct URL to icon image (fallback when icon slug unavailable) */
  iconUrl?: string;
}

export interface TechStackItem {
  key: string;
  title: string;
  href?: string;
  iconSlug?: string;
  /** Direct URL to any icon image (fallback when iconSlug unavailable) */
  iconUrl?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  href?: string;
  /** Max 5 tags per project; UI shows first 3 + (+N) badge */
  tags: ProjectTag[];
  date: string;
}

// ── Tag categories ──────────────────────────────────────────────────────────
// Game / Art group → bloody red spectrum
// AI / ML / Web group → ice blue spectrum

export type ProjectTagCategory =
  // Game / Engines (brand red #b5392b)
  | "GameDev" | "Gamejam" | "Unity" | "Godot" | "UnrealEngine" | "VR"
  // Technical Art / Shaders (maroon #9b2226)
  | "TechnicalArt" | "Shaders" | "VFX" | "EnvironmentalArt" | "UI" | "SubstancePack"
  // Art / 3D (deep wine #7d1128)
  | "Art" | "Blender" | "Modeling3D"
  // AI / ML (deep ice #AEDBF0)
  | "AI" | "ML" | "NeuralNetworks" | "ComputerVision" | "Math"
  // Data / Web (light ice #CBF1FA)
  | "DataScience" | "AgenticEngineering" | "VibeCoding" | "Web"
  // Infrastructure (darker ice #6BA7CC)
  | "NLP" | "Database" | "CICD";

export interface ProjectTag {
  /** Human-readable label shown on the badge */
  label: string;
  category: ProjectTagCategory;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  href?: string;
  certId?: string;
  iconSlug?: string;
  iconUrl?: string;
}

export interface Bookmark {
  id: string;
  title: string;
  description?: string;
  href: string;
  date: string;
  iconSlug?: string;
}

// ── Tag colors ───────────────────────────────────────────────────────────────

export const TAG_COLORS: Record<string, string> = {
  // === Game / Art — bloody reds ===
  // Brand red (#b5392b) — game engines & core game dev
  GameDev:      "bg-[#b5392b]/15 text-[#b5392b] dark:bg-[#b5392b]/20 dark:text-[#f87171]",
  Gamejam:      "bg-[#b5392b]/15 text-[#b5392b] dark:bg-[#b5392b]/20 dark:text-[#f87171]",
  Unity:        "bg-[#b5392b]/10 text-[#b5392b] dark:bg-[#b5392b]/15 dark:text-[#f87171]",
  Godot:        "bg-[#b5392b]/10 text-[#b5392b] dark:bg-[#b5392b]/15 dark:text-[#f87171]",
  UnrealEngine: "bg-[#b5392b]/10 text-[#b5392b] dark:bg-[#b5392b]/15 dark:text-[#f87171]",
  VR:           "bg-[#b5392b]/10 text-[#b5392b] dark:bg-[#b5392b]/15 dark:text-[#f87171]",
  // Maroon (#9b2226) — technical art & shaders
  TechnicalArt:     "bg-[#9b2226]/15 text-[#9b2226] dark:bg-[#9b2226]/20 dark:text-[#fca5a5]",
  Shaders:          "bg-[#9b2226]/10 text-[#9b2226] dark:bg-[#9b2226]/15 dark:text-[#fca5a5]",
  VFX:              "bg-[#9b2226]/10 text-[#9b2226] dark:bg-[#9b2226]/15 dark:text-[#fca5a5]",
  EnvironmentalArt: "bg-[#9b2226]/10 text-[#9b2226] dark:bg-[#9b2226]/15 dark:text-[#fca5a5]",
  UI:               "bg-[#9b2226]/10 text-[#9b2226] dark:bg-[#9b2226]/15 dark:text-[#fca5a5]",
  SubstancePack:    "bg-[#9b2226]/10 text-[#9b2226] dark:bg-[#9b2226]/15 dark:text-[#fca5a5]",
  // Deep wine (#7d1128) — pure art & 3D
  Art:       "bg-[#7d1128]/10 text-[#7d1128] dark:bg-[#7d1128]/20 dark:text-[#fca5a5]",
  Blender:   "bg-[#7d1128]/10 text-[#7d1128] dark:bg-[#7d1128]/15 dark:text-[#fca5a5]",
  Modeling3D:"bg-[#7d1128]/10 text-[#7d1128] dark:bg-[#7d1128]/15 dark:text-[#fca5a5]",
  // === AI / ML / Web — ice blues ===
  // Deep ice (#AEDBF0) — core AI/ML
  AI:             "bg-[#AEDBF0] text-[#1a4d6e] dark:bg-[#AEDBF0]/15 dark:text-[#AEDBF0]",
  ML:             "bg-[#AEDBF0]/80 text-[#1a4d6e] dark:bg-[#AEDBF0]/15 dark:text-[#AEDBF0]",
  NeuralNetworks: "bg-[#AEDBF0]/70 text-[#1a4d6e] dark:bg-[#AEDBF0]/15 dark:text-[#AEDBF0]",
  ComputerVision: "bg-[#AEDBF0]/70 text-[#1a4d6e] dark:bg-[#AEDBF0]/15 dark:text-[#AEDBF0]",
  Math:           "bg-[#AEDBF0]/60 text-[#1a4d6e] dark:bg-[#AEDBF0]/15 dark:text-[#AEDBF0]",
  // Light ice (#CBF1FA) — data & web
  DataScience:        "bg-[#CBF1FA] text-[#1a5c7a] dark:bg-[#CBF1FA]/15 dark:text-[#CBF1FA]",
  AgenticEngineering: "bg-[#CBF1FA]/80 text-[#1a5c7a] dark:bg-[#CBF1FA]/15 dark:text-[#CBF1FA]",
  VibeCoding:         "bg-[#CBF1FA]/70 text-[#1a5c7a] dark:bg-[#CBF1FA]/10 dark:text-[#CBF1FA]",
  Web:                "bg-[#CBF1FA]/70 text-[#1a5c7a] dark:bg-[#CBF1FA]/10 dark:text-[#CBF1FA]",
  // Darker ice (#6BA7CC) — infra & NLP
  NLP:      "bg-[#6BA7CC]/25 text-[#1a4d6e] dark:bg-[#6BA7CC]/20 dark:text-[#6BA7CC]",
  Database: "bg-[#6BA7CC]/25 text-[#1a4d6e] dark:bg-[#6BA7CC]/20 dark:text-[#6BA7CC]",
  CICD:     "bg-[#6BA7CC]/25 text-[#1a4d6e] dark:bg-[#6BA7CC]/20 dark:text-[#6BA7CC]",
};

// ── Skill color utility (experience / education tags) ────────────────────────
// Alternates between red and blue palette for variety, consistent per skill name.
const SKILL_COLOR_LIST = [
  "bg-[#b5392b]/15 text-[#b5392b] dark:bg-[#b5392b]/20 dark:text-[#f87171]",
  "bg-[#CBF1FA] text-[#1a5c7a] dark:bg-[#CBF1FA]/15 dark:text-[#CBF1FA]",
  "bg-[#9b2226]/15 text-[#9b2226] dark:bg-[#9b2226]/20 dark:text-[#fca5a5]",
  "bg-[#AEDBF0] text-[#1a4d6e] dark:bg-[#AEDBF0]/15 dark:text-[#AEDBF0]",
  "bg-[#7d1128]/10 text-[#7d1128] dark:bg-[#7d1128]/20 dark:text-[#fca5a5]",
  "bg-[#6BA7CC]/25 text-[#1a4d6e] dark:bg-[#6BA7CC]/20 dark:text-[#6BA7CC]",
];

export function getSkillColor(skill: string): string {
  let h = 0;
  for (let i = 0; i < skill.length; i++) {
    h = (h * 31 + skill.charCodeAt(i)) & 0xffff;
  }
  return SKILL_COLOR_LIST[h % SKILL_COLOR_LIST.length];
}
