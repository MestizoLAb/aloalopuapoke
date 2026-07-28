import type { MetadataRoute } from "next";

const SITE = "https://aloalopuapoke.it";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1.0, freq: "weekly" },
    { path: "/menu", priority: 0.9, freq: "weekly" },
    { path: "/app", priority: 0.7, freq: "monthly" },
    { path: "/contatti", priority: 0.7, freq: "monthly" },
    { path: "/about", priority: 0.5, freq: "monthly" },
  ];
  return pages.map((p) => ({
    url: `${SITE}${p.path}`,
    lastModified: now,
    changeFrequency: p.freq,
    priority: p.priority,
  }));
}
