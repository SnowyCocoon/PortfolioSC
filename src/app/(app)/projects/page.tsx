import type { Metadata } from "next";
import { ProjectsSection } from "@/features/portfolio/components/projects-section";

export const metadata: Metadata = {
  title: "Projects",
  description: "Game development, AI, and technical art projects.",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-3xl py-4">
      <ProjectsSection />
    </div>
  );
}
