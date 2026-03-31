import type { Metadata } from "next";
import { ArtPortfolioSection } from "@/features/portfolio/components/art-portfolio-section";

export const metadata: Metadata = {
  title: "Art Portfolio",
  description: "Technical art portfolio by Dominik Strzalko — shaders, VFX, environment art, Substance Designer material packs, and 3D modeling work in Unity, Godot, and Unreal Engine.",
  alternates: { canonical: "/art-portfolio" },
};

export default function ArtPortfolioPage() {
  return (
    <div className="mx-auto max-w-3xl py-4">
      <ArtPortfolioSection />
    </div>
  );
}
