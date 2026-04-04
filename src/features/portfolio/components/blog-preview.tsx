import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import {
  Panel,
  PanelHeader,
  PanelTitle,
} from "./panel";
import { BLOG_POSTS } from "../data/blog";

export function BlogPreview() {
  const recent = BLOG_POSTS.slice(0, 3);

  return (
    <Panel>
      <PanelHeader>
        <PanelTitle>Blog</PanelTitle>
      </PanelHeader>
      <div>
        {recent.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex gap-4 border-b border-line px-4 py-4 transition-colors hover:bg-accent last:border-b-0"
          >
            {/* Cover image thumbnail */}
            <div className="relative hidden h-20 w-28 shrink-0 overflow-hidden rounded-md border border-line sm:block">
              {post.coverImage ? (
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="112px"
                  unoptimized
                />
              ) : (
                <div
                  aria-hidden="true"
                  className="h-full w-full bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] [--pattern-foreground:var(--color-line)]/56"
                />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="font-mono text-sm font-bold group-hover:underline">
                {post.title}
              </p>
              <p className="mt-0.5 line-clamp-2 font-mono text-xs text-muted-foreground">
                {post.description}
              </p>
              <div className="mt-2 flex items-center gap-3">
                <span className="font-mono text-xs text-muted-foreground">
                  {new Date(post.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  {post.readingTime}
                </span>
                <span className={`rounded px-1.5 py-0.5 font-mono text-[10px] ${
                  post.category === "personal"
                    ? "bg-[#AEDBF0]/30 text-[#1a4d6e] dark:bg-[#AEDBF0]/15 dark:text-[#AEDBF0]"
                    : "bg-[#b5392b]/10 text-[#b5392b] dark:bg-[#b5392b]/15 dark:text-[#f87171]"
                }`}>
                  {post.category === "personal" ? "Personal" : "Technical"}
                </span>
                <div className="flex gap-1">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="rounded bg-accent px-1.5 py-0.5 font-mono text-[10px] text-accent-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <ArrowUpRight className="size-4 shrink-0 self-start text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>
        ))}
      </div>
    </Panel>
  );
}
