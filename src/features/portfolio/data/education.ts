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
    thesis:
      "Ending Project: Designing whole brand strategy for a new product (Expense Tracker), including market analysis, target audience identification, and marketing plan development",
    skills: ["Brand Management", "E-Commerce", "Project Management", "Marketing", "Product Management", "SEO"],
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
    info: "I was one of the top-performing students in my cohort and was awarded the Rector's Scholarship for academic excellence. I was also selected to represent my university at several international conferences, including:  US-Poland Science and Technology Symposium in San Francisco, PyCon Italia in Florence, and World AI Cannes Festival in Cannes. Additionally, I received the Best Paper Award in the Young Researcher Workshop category at FedCSIS 2021.",
    thesis:
      "Master's Thesis: Speech controlled Games - Process of implementing speech recognition and control in games",
    skills: ["Computer Vision", "Speech Recognition", "Unity", "AI", "Data Science", "NLP", "Deep Learning", "Neural Networks"],
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
    skills: ["C#", "Unity", "Python", "Haskell", "Algorithms", "Data Structures"],
  },
];
