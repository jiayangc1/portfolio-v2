import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { getCanonicalUrl } from "@/lib/seo";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "/",
    ...site.nav.map((item) => item.href),
    ...projects.map((project) => `/projects/${project.slug}`),
  ];

  return pages.map((path) => ({
    url: getCanonicalUrl(path),
    lastModified: new Date(),
    changeFrequency: path === "/" ? ("weekly" as const) : ("monthly" as const),
    priority: path === "/" ? 1 : 0.8,
    ...(path === "/" ? { images: [getCanonicalUrl(site.assets.figure)] } : {}),
  }));
}
