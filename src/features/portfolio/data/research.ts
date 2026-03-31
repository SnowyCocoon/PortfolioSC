export interface ResearchItem {
  id: string;
  title: string;
  description: string;
  venue: string;
  bonusInfo?: string;
  href: string;
}

export const RESEARCH_ITEMS: ResearchItem[] = [
  {
    id: "levelup-2025",
    title: "Godot - Why do we need it? (2025 version) (In Polish)",
    description: "Presentation on godot engine, its advantages and disadvantages, how popular it is and how to get started with it",
    venue: "CDV/LevelUp 2025",
    bonusInfo: "First presentation created for university students",
    href: "https://docs.google.com/presentation/d/14-Szg9uVcMZhW4_s6f0fIS7mZu0ec4YwUFMpIpQ8onY",
  },
  {
    id: "voice-controlled-games",
    title: "Voice Controlled Games",
    description:
      "The approach and challenges of implementing speech recognition and voice control in games",
    venue: "FedCSIS 2021",
    bonusInfo: "Best Paper Award (Young Researcher Workshop)",
    href: "https://annals-csis.org/Volume_26/index.html",
  },
  
];
