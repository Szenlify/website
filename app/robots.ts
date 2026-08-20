import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://lectoro.com/sitemap.xml",
    host: "https://lectoro.com",
  };
}
