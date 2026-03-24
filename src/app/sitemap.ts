import type { MetadataRoute } from "next";
import { SITE_INFO } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/blog",
    "/projects",
    "/art-portfolio",
    "/research",
    "/hobby",
  ];

  return routes.map((route) => ({
    url: `${SITE_INFO.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));
}
