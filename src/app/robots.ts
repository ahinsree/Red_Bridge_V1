import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/"],
      },
      {
        // Explicitly allow AI crawlers to index our insights and services
        userAgent: ["GPTBot", "ClaudeBot", "Google-Extended", "PerplexityBot", "Applebot-Extended"],
        allow: "/",
        disallow: ["/admin", "/api/"],
      }
    ],
    sitemap: "https://www.redbridgeadvisory.com/sitemap.xml",
  };
}
