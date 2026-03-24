import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function QuickJump() {
  return (
    <div className="screen-line-top screen-line-bottom grid grid-cols-2 border-x border-line">
      <Link
        href="/projects"
        className="group flex items-center justify-between border-r border-line px-4 py-6 transition-colors hover:bg-accent"
      >
        <span className="font-mono text-sm font-medium">Project Portfolio</span>
        <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
      </Link>
      <Link
        href="/art-portfolio"
        className="group flex items-center justify-between px-4 py-6 transition-colors hover:bg-accent"
      >
        <span className="font-mono text-sm font-medium">Art Portfolio</span>
        <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
}
