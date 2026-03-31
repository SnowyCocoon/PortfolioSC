import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelTitleSup,
} from "@/features/portfolio/components/panel";
import { BLOG_POSTS } from "@/features/portfolio/data/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles on game development, shaders, technical art, AI/ML, and agentic engineering by Dominik Strzalko.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-3xl py-4">
      <Panel>
        <PanelHeader>
          <PanelTitle>
            Blog
            <PanelTitleSup>{BLOG_POSTS.length}</PanelTitleSup>
          </PanelTitle>
        </PanelHeader>
        <div>
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex gap-4 border-b border-line px-4 py-4 transition-colors hover:bg-accent last:border-b-0"
            >
              {/* Cover thumbnail */}
              {post.coverImage && (
                <div className="relative hidden h-24 w-36 shrink-0 overflow-hidden rounded-md border border-line sm:block">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="144px"
                    unoptimized
                  />
                </div>
              )}

              <div className="min-w-0 flex-1">
                <p className="font-mono text-sm font-bold group-hover:underline">
                  {post.title}
                </p>
                <p className="mt-1 line-clamp-2 font-mono text-xs text-muted-foreground">
                  {post.description}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-3">
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
                  <div className="flex gap-1">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded bg-accent px-1.5 py-0.5 font-mono text-xs text-accent-foreground"
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
    </div>
  );
}
