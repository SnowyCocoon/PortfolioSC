import type { Metadata } from "next";
import { BlogList } from "@/features/portfolio/components/blog-list";

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles on game development, shaders, technical art, AI/ML, and agentic engineering by Dominik Strzalko.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-3xl py-4">
      <BlogList />
    </div>
  );
}
