import type { User } from "../types";

export const USER: User = {
  displayName: "Dominik Strzalko",
  username: "snowycocoon",
  jobTitle: "Game Developer | Technical Artist | AI Engineer",
  currentJobs: [
    { company: "3R Games", title: "Unity Developer" },
    { company: "Hikari", title: "Event Organizer & Data Analyst" },
  ],
  volunteerRole: "Event Organizer, Data Scientist/Analyst at Hikari",
  location: "Poznan, Poland",
  locationSoon: "Tokyo, Japan",
  email: "snowycocoon@gmail.com",
  website: "snowycocoon.com",
  timezone: "Europe/Warsaw",
  languages: [
    { name: "Polish", level: "Native" },
    { name: "English", level: "B2/C1" },
    { name: "Japanese", level: "N5" },
  ],
  flipSentences: [
    "Game Developer",
    "Technical Artist",
    "AI Engineer",
    "Data Scientist",
  ],
  about: [
    "Game developer since 2020 with a strong passion for the technical side of game development. I enjoy exploring new features, technologies, and game engines.",
    "Currently focusing on creating shaders, materials, and procedural content in my free time, while professionally developing games using Unity and Godot.",
    "Skilled in Unity, Godot, and UE5 with experience in both 2D and 3D games, VFX, procedural generation, and AI/ML integration.",
    "Master's thesis on voice recognition in games earned a Best Paper Award at FedCSIS 2021. Expertise spans Data Science, NLP, Computer Vision, and Deep Learning.",
  ],
  avatar: "/images/avatar.svg",
};
