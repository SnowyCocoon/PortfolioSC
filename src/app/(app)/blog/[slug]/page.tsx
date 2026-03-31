import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelContent,
} from "@/features/portfolio/components/panel";
import { BLOG_POSTS } from "@/features/portfolio/data/blog";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      tags: post.tags,
      images: post.coverImage
        ? [{ url: post.coverImage, alt: post.title }]
        : [{ url: "/og_image.png", width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.coverImage ? [post.coverImage] : ["/og_image.png"],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <div className="mx-auto max-w-3xl py-4">
      <Link
        href="/blog"
        className="mb-4 flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3" />
        Back to blog
      </Link>

      <Panel>
        {/* Cover image hero */}
        {post.coverImage && (
          <div className="relative h-52 w-full overflow-hidden border-b border-line sm:h-72">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              priority
              unoptimized
            />
            {/* subtle dark overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
          </div>
        )}

        <PanelHeader>
          <PanelTitle>{post.title}</PanelTitle>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs text-muted-foreground">
              {new Date(post.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span className="font-mono text-xs text-muted-foreground">
              {post.readingTime}
            </span>
            <div className="flex flex-wrap gap-1">
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
        </PanelHeader>

        <PanelContent>
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </PanelContent>
      </Panel>
    </div>
  );
}
