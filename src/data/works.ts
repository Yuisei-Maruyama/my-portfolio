export type Work = {
  id: string;
  technologies: string[];
  link?: string;
};

export const worksData: Work[] = [
  {
    id: "ec",
    technologies: [
      "Next.js",
      "TypeScript",
      "Shopify Storefront API",
      "Checkout UI Extensions",
      "Shopify Functions",
      "Zustand",
      "Protocol Buffers",
      "MySQL",
    ],
  },
  {
    id: "gov",
    technologies: ["Vue.js", "TypeScript", "Microservices", "REST API"],
  },
  {
    id: "cms",
    technologies: ["Vue.js", "Nuxt.js", "TypeScript"],
  },
  {
    id: "portfolio",
    technologies: ["Next.js", "TypeScript", "TailwindCSS", "Framer Motion"],
    link: "https://github.com/Yuisei-Maruyama/my-portfolio",
  },
];
