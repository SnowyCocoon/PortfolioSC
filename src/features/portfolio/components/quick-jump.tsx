import Link from "next/link";
import { ArrowRight, Gamepad2, Palette } from "lucide-react";

export function QuickJump() {
  return (
    <div className="screen-line-top screen-line-bottom grid grid-cols-2 border-x border-line">
      <Link
        href="/tech-portfolio"
        className="group flex items-center justify-between border-r border-line px-4 py-6 transition-colors hover:bg-accent"
      >
        <div className="flex items-center gap-2">
          <Gamepad2 className="size-4 text-muted-foreground" />
          <span className="font-mono text-sm font-medium">Tech Portfolio</span>
        </div>
        <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
      </Link>
      <Link
        href="/art-portfolio"
        className="group flex items-center justify-between px-4 py-6 transition-colors hover:bg-accent"
      >
        <div className="flex items-center gap-2">
          <Palette className="size-4 text-muted-foreground" />
          <span className="font-mono text-sm font-medium">Art Portfolio</span>
        </div>
        <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
}
