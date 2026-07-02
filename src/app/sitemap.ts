import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.redbridgeadvisory.com";

  const practices = [
    "strategy-transformation",
    "ai-digital-data",
    "experience-service-design",
    "investment-economic-infrastructure",
    "entrepreneurship-innovation-startup",
    "programme-management-monitoring"
  ];

  const practiceUrls = practices.map((slug) => ({
    url: `${baseUrl}/practices/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...practiceUrls,
  ];
}
