import type { Metadata } from "next";
import { Panel, PanelHeader, PanelTitle, PanelContent } from "@/features/portfolio/components/panel";

export const metadata: Metadata = {
  title: "Art Portfolio",
  description: "Technical art, VFX, environment art, and more.",
};

export default function ArtPortfolioPage() {
  return (
    <div className="mx-auto max-w-3xl py-4">
      <Panel>
        <PanelHeader>
          <PanelTitle>Art Portfolio</PanelTitle>
        </PanelHeader>
        <PanelContent>
          <p className="font-mono text-sm text-muted-foreground">
            Coming soon. In the meantime, check out my{" "}
            <a
              href="https://www.artstation.com/snowycocoon"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground"
            >
              ArtStation profile
            </a>
            .
          </p>
        </PanelContent>
      </Panel>
    </div>
  );
}
