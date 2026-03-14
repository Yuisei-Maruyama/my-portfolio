import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => {
  return [
    {
      url: "https://yuisei.dev",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          ja: "https://yuisei.dev",
          en: "https://yuisei.dev/en",
        },
      },
    },
  ];
};

export default sitemap;
