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
  tags: ProjectTag[];
  date: string;
}

export interface ProjectTag {
  label: string;
  category: "DataScience" | "AI" | "GameDev" | "TechnicalArt" | "Art" | "Web";
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  href?: string;
  iconSlug?: string;
}

export interface Bookmark {
  id: string;
  title: string;
  description?: string;
  href: string;
  date: string;
  iconSlug?: string;
}

// Ice/snow palette (#CBF1FA #AEDBF0 #6BA7CC) + SnowyCocoon brand red (#b5392b / #530708)
export const TAG_COLORS: Record<string, string> = {
  DataScience:  "bg-[#CBF1FA] text-[#1a5c7a] dark:bg-[#CBF1FA]/15 dark:text-[#CBF1FA]",
  AI:           "bg-[#AEDBF0] text-[#1a4d6e] dark:bg-[#AEDBF0]/15 dark:text-[#AEDBF0]",
  GameDev:      "bg-[#b5392b]/15 text-[#b5392b] dark:bg-[#b5392b]/20 dark:text-[#f87171]",
  TechnicalArt: "bg-[#6BA7CC]/25 text-[#1a4d6e] dark:bg-[#6BA7CC]/20 dark:text-[#6BA7CC]",
  Art:          "bg-[#530708]/10 text-[#b5392b] dark:bg-[#b5392b]/15 dark:text-[#fca5a5]",
  Web:          "bg-[#CBF1FA]/70 text-[#1a5c7a] dark:bg-[#CBF1FA]/10 dark:text-[#CBF1FA]",
};
