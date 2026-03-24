import { ArrowUpRight } from "lucide-react";
import { SOCIAL_LINKS } from "../data/social-links";

export function SocialLinks() {
  return (
    <div className="screen-line-top screen-line-bottom grid grid-cols-2 border-x border-line sm:grid-cols-3">
      {SOCIAL_LINKS.map((link) => (
        <a
          key={link.title}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 border-b border-r border-line px-4 py-3 transition-colors hover:bg-accent"
        >
          <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-white p-1">
            <img
              src={`https://cdn.simpleicons.org/${link.icon}`}
              alt={link.title}
              className="size-full object-contain"
              loading="lazy"
            />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-mono text-xs font-medium">{link.title}</p>
            <p className="truncate font-mono text-[10px] text-muted-foreground">
              {link.subtitle}
            </p>
          </div>
          <ArrowUpRight className="size-3 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
        </a>
      ))}
    </div>
  );
}
