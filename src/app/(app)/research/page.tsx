import type { Metadata } from "next";
import { Research } from "@/features/portfolio/components/research";

export const metadata: Metadata = {
  title: "Research & Presentations",
  description: "Academic research, papers, and presentations.",
};

export default function ResearchPage() {
  return (
    <div className="mx-auto max-w-3xl py-4">
      <Research />
    </div>
  );
}
