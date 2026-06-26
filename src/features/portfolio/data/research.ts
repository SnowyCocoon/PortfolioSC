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
    id: "pyrkon-2026",
    title: "Will AI replace game developers? A few facts about AI in game development (In Polish)",
    description: "How AI is used in game development, what are its advantages and disadvantages, and how it will affect the future of the industry",
    venue: "Pyrkon 2026",
    bonusInfo: "First presentation at a big convention. almost full house, 70+ people in the audience, at 10:00 PM Saturday night. I was pretty nervous but it went well.",
    href: "https://drive.google.com/file/d/1idthTPnB3MaKryNb2j0NtA0gbvXy_UKq/view?usp=drive_link",
  },
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
