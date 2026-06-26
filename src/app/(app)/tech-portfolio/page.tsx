import type { Metadata } from "next";
import { ProjectsSection } from "@/features/portfolio/components/projects-section";

export const metadata: Metadata = {
  title: "Tech Portfolio",
  description: "39+ game development, AI/ML, technical art, and fullstack projects by Dominik Strzalko — from Unity & Godot games to shader packs and agentic AI systems.",
  alternates: { canonical: "/tech-portfolio" },
};

export default function TechPortfolioPage() {
  return (
    <div className="mx-auto max-w-3xl py-4">
      <ProjectsSection />
    </div>
  );
}
