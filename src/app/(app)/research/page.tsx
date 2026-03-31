import type { Metadata } from "next";
import { Research } from "@/features/portfolio/components/research";

export const metadata: Metadata = {
  title: "Research & Presentations",
  description: "Academic research and conference presentations by Dominik Strzalko, including a Best Paper Award at FedCSIS 2021 for voice-controlled games and game development talks at CDV/LevelUp.",
  alternates: { canonical: "/research" },
};

export default function ResearchPage() {
  return (
    <div className="mx-auto max-w-3xl py-4">
      <Research />
    </div>
  );
}
