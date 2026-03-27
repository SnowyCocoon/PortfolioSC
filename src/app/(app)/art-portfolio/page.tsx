import type { Metadata } from "next";
import { ArtPortfolioSection } from "@/features/portfolio/components/art-portfolio-section";

export const metadata: Metadata = {
  title: "Art Portfolio",
  description: "Technical art, VFX, environment art, Substance Designer materials, and more.",
};

export default function ArtPortfolioPage() {
  return (
    <div className="mx-auto max-w-3xl py-4">
      <ArtPortfolioSection />
    </div>
  );
}
