import type { Metadata } from "next";
import { Panel, PanelContent } from "@/features/portfolio/components/panel";

export const metadata: Metadata = {
  title: "Hobby",
  description: "Personal interests and hobbies.",
};

export default function HobbyPage() {
  return (
    <div className="mx-auto max-w-3xl py-4">
      <Panel>
        <PanelContent className="flex items-center justify-center py-20">
          <p className="font-mono text-lg text-muted-foreground">
            See you soon! 👋
          </p>
        </PanelContent>
      </Panel>
    </div>
  );
}
