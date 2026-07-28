import type { MetadataRoute } from "next";

const SITE = "https://aloalopuapoke.it";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/privacy"],
    },
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
