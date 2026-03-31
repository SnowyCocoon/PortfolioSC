import type { MetadataRoute } from "next";
import { SITE_INFO } from "@/config/site";
import { BLOG_POSTS } from "@/features/portfolio/data/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_INFO.url,                          lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_INFO.url}/blog`,                lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_INFO.url}/projects`,            lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_INFO.url}/art-portfolio`,       lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_INFO.url}/research`,            lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_INFO.url}/hobby`,               lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];

  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${SITE_INFO.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...blogRoutes];
}
