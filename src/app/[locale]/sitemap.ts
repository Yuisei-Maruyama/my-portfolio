import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => {
  return [
    {
      url: "https://yuisei-maruyama.vercel.app",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          ja: "https://yuisei-maruyama.vercel.app",
          en: "https://yuisei-maruyama.vercel.app/en",
        },
      },
    },
  ];
};

export default sitemap;
