import type { MetadataRoute } from "next";
import { getWorks } from "@/lib/projects";

const BASE = "https://taido.design";

export default function sitemap(): MetadataRoute.Sitemap {
  const works: MetadataRoute.Sitemap = getWorks().map((w) => ({
    url: `${BASE}/works/${w.slug}`,
    lastModified: w.publishedAt ? new Date(w.publishedAt) : new Date(),
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  return [
    { url: `${BASE}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/about`, changeFrequency: "yearly", priority: 0.6 },
    ...works,
  ];
}
