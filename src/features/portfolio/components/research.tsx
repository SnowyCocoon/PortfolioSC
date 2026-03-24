import { ArrowUpRight } from "lucide-react";
import {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelContent,
} from "./panel";

export function Research() {
  return (
    <Panel>
      <PanelHeader>
        <PanelTitle>Research &amp; Presentations</PanelTitle>
      </PanelHeader>
      <PanelContent>
        {/* Published paper */}
        <div className="mb-4 border-b border-line pb-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-mono text-xs font-bold">
                Voice Controlled Games
              </h3>
              <p className="mt-0.5 font-mono text-[10px] text-muted-foreground">
                The approach and challenges of implementing speech recognition
                and voice control in games
              </p>
              <p className="mt-1 font-mono text-[10px] text-muted-foreground">
                FedCSIS 2021 &bull; Best Paper Award (Young Researcher Workshop)
              </p>
            </div>
            <a
              href="https://annals-csis.org/Volume_26/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowUpRight className="size-3" />
            </a>
          </div>
        </div>

        {/* Coming soon */}
        <p className="font-mono text-sm text-muted-foreground">
          Something new is in preparation... Stay tuned!
        </p>
      </PanelContent>
    </Panel>
  );
}
