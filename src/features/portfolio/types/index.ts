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
}

export interface TechStackItem {
  key: string;
  title: string;
  href?: string;
  iconSlug?: string;
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

export const TAG_COLORS: Record<string, string> = {
  DataScience: "bg-blue-500/10 text-blue-500",
  AI: "bg-purple-500/10 text-purple-500",
  GameDev: "bg-green-500/10 text-green-500",
  TechnicalArt: "bg-orange-500/10 text-orange-500",
  Art: "bg-pink-500/10 text-pink-500",
  Web: "bg-cyan-500/10 text-cyan-500",
};
