import type { Education } from "../types";

export const EDUCATION: Education[] = [
  {
    id: "cdv-postgrad",
    institution: "Collegium Da Vinci",
    degree: "Postgraduate Studies",
    field: "Product and Brand Management",
    startYear: "2022",
    endYear: "2023",
    grade: "5.0",
    skills: ["Brand Management", "E-Commerce", "Project Management", "Marketing"],
  },
  {
    id: "amu-master",
    institution: "Adam Mickiewicz University in Poznan",
    degree: "Master of Engineering",
    field: "Computer Science",
    specialization: "Artificial Intelligence",
    startYear: "2021",
    endYear: "2022",
    grade: "5.0",
    thesis:
      "Speech controlled Games - Process of implementing speech recognition and control in games",
    skills: ["Computer Vision", "Speech Recognition", "Unity", "AI"],
  },
  {
    id: "amu-bachelor",
    institution: "Adam Mickiewicz University in Poznan",
    degree: "Bachelor of Engineering",
    field: "Computer Science",
    startYear: "2017",
    endYear: "2021",
    grade: "4.5",
    thesis:
      'Engineering Thesis: "Computer Game Hordeum" - Differences in game development in Unity and Godot engines',
    skills: ["Computer Vision", "Speech Recognition", "Algorithms", "C#", "Unity"],
  },
];
