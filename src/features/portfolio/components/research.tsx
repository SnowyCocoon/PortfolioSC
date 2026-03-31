import { ArrowUpRight, FileText } from "lucide-react";
import {
  Panel,
  PanelHeader,
  PanelTitle,
} from "./panel";
import { RESEARCH_ITEMS } from "../data/research";

export function Research() {
  return (
    <Panel>
      <PanelHeader>
        <PanelTitle>Research &amp; Presentations</PanelTitle>
      </PanelHeader>

      <div>
        {RESEARCH_ITEMS.map((item) => (
          <a
            key={item.id}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex gap-4 border-b border-line px-4 py-3 last:border-b-0 transition-colors hover:bg-accent/60"
          >
            {/* Icon */}
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-line bg-[#b5392b]/10 text-[#b5392b] dark:bg-[#b5392b]/20 dark:text-[#f87171]">
              <FileText className="size-4" />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="font-mono text-xs font-bold">{item.title}</h3>
              <p className="mt-0.5 font-mono text-[10px] text-muted-foreground">
                {item.description}
              </p>
              <p className="mt-1 font-mono text-[10px] text-muted-foreground">
                {item.venue}
                {item.bonusInfo && (
                  <>
                    {" "}&bull;{" "}
                    <span className="text-[#b5392b] dark:text-[#f87171]">{item.bonusInfo}</span>
                  </>
                )}
              </p>
            </div>

            <ArrowUpRight className="size-4 shrink-0 self-center text-muted-foreground transition-colors group-hover:text-foreground" />
          </a>
        ))}

        <div className="px-4 py-3 font-mono text-xs text-muted-foreground/60">
          Something new is in preparation… Stay tuned!
        </div>
      </div>
    </Panel>
  );
}
