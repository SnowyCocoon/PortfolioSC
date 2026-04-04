"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Terminal, User } from "lucide-react";
import {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelTitleSup,
} from "./panel";
import { BLOG_POSTS } from "../data/blog";

type Category = "technical" | "personal" | "all";

export function BlogList() {
  const [category, setCategory] = useState<Category>("all");

  const posts =
    category === "all"
      ? BLOG_POSTS
      : BLOG_POSTS.filter((p) => p.category === category);

  return (
    <Panel>
      <PanelHeader>
        <div className="flex items-center justify-between gap-3">
          <PanelTitle>
            Blog
            <PanelTitleSup>{posts.length}</PanelTitleSup>
          </PanelTitle>

          {/* Category toggle buttons */}
          <div className="flex items-center gap-1.5">
            <CategoryButton
              active={category === "all"}
              onClick={() => setCategory("all")}
              label="All"
              activeClass="bg-accent text-foreground border-line"
            />
            <CategoryButton
              active={category === "technical"}
              onClick={() => setCategory("technical")}
              icon={<Terminal className="size-3" />}
              label="Technical"
              activeClass="bg-[#b5392b]/15 text-[#b5392b] border-[#b5392b]/30 dark:bg-[#b5392b]/20 dark:text-[#f87171] dark:border-[#b5392b]/40"
            />
            <CategoryButton
              active={category === "personal"}
              onClick={() => setCategory("personal")}
              icon={<User className="size-3" />}
              label="Personal"
              activeClass="bg-[#AEDBF0]/30 text-[#1a4d6e] border-[#AEDBF0]/60 dark:bg-[#AEDBF0]/15 dark:text-[#AEDBF0] dark:border-[#AEDBF0]/30"
            />
          </div>
        </div>
      </PanelHeader>

      <div>
        {posts.length === 0 ? (
          <div className="px-4 py-6 text-center font-mono text-xs text-muted-foreground">
            No posts in this category yet.
          </div>
        ) : (
          posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex gap-4 border-b border-line px-4 py-4 transition-colors hover:bg-accent last:border-b-0"
            >
              <div className="relative hidden h-24 w-36 shrink-0 overflow-hidden rounded-md border border-line sm:block">
                {post.coverImage ? (
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="144px"
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
                  {/* Category pill */}
                  <span className={`rounded px-1.5 py-0.5 font-mono text-[10px] ${
                    post.category === "personal"
                      ? "bg-[#AEDBF0]/30 text-[#1a4d6e] dark:bg-[#AEDBF0]/15 dark:text-[#AEDBF0]"
                      : "bg-[#b5392b]/10 text-[#b5392b] dark:bg-[#b5392b]/15 dark:text-[#f87171]"
                  }`}>
                    {post.category === "personal" ? "Personal" : "Technical"}
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
          ))
        )}
      </div>
    </Panel>
  );
}

// ── Category pill button ──────────────────────────────────────────────────────
function CategoryButton({
  active,
  onClick,
  icon,
  label,
  activeClass,
}: {
  active: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  label: string;
  activeClass: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1 rounded-md border px-2 py-1 font-mono text-xs transition-colors cursor-pointer ${
        active
          ? activeClass
          : "border-line bg-background text-muted-foreground hover:border-line/80 hover:text-foreground"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
