export type TeamMember = {
  role: string;
  count: number;
};

export type CareerProject = {
  id: string;
  period: string;
  technologies: string[];
  teamSize: number;
  position: string;
  team: TeamMember[];
};

export type CareerItem = {
  id: string;
  period: string;
  projects: CareerProject[];
};

export const careerData: CareerItem[] = [
  {
    id: "cyberagent",
    period: "2023/01 ~ Present",
    projects: [
      {
        id: "ec",
        period: "2023/01 ~ Present",
        teamSize: 10,
        position: "PL (Frontend)",
        team: [
          { role: "PM", count: 1 },
          { role: "Frontend", count: 3 },
          { role: "Backend", count: 4 },
          { role: "Designer", count: 2 },
        ],
        technologies: [
          "Next.js",
          "React",
          "TypeScript",
          "Go",
          "Shopify Storefront API",
          "Shopify Checkout UI Extensions",
          "Shopify Functions",
          "Zustand",
          "react-aria-components",
          "Storybook",
          "Protocol Buffers",
          "Connect RPC",
          "MySQL",
          "Google Cloud Storage",
          "Cloud Run",
          "Load Balancing",
        ],
      },
      {
        id: "admin",
        period: "2023/06 ~ Present",
        teamSize: 8,
        position: "PL",
        team: [
          { role: "PM", count: 1 },
          { role: "Frontend", count: 3 },
          { role: "Backend", count: 4 },
        ],
        technologies: [
          "Next.js",
          "React",
          "TypeScript",
          "Vertex AI Search",
          "Google Cloud Storage",
          "Cloud Run",
        ],
      },
    ],
  },
  {
    id: "gizumo",
    period: "2019/05 ~ 2022",
    projects: [
      {
        id: "cms",
        period: "2022/02 ~ 2022",
        teamSize: 9,
        position: "PG (Frontend)",
        team: [
          { role: "PM", count: 1 },
          { role: "PL", count: 3 },
          { role: "Frontend", count: 3 },
          { role: "Backend", count: 2 },
        ],
        technologies: ["Vue.js", "Nuxt.js", "TypeScript"],
      },
      {
        id: "gov",
        period: "2020/11 ~ 2022/01",
        teamSize: 9,
        position: "PG (Frontend / Backend)",
        team: [
          { role: "PM", count: 2 },
          { role: "PL", count: 2 },
          { role: "Frontend", count: 3 },
          { role: "Backend", count: 2 },
        ],
        technologies: ["Vue.js", "TypeScript", "Node.js", "Microservices", "REST API"],
      },
      {
        id: "comm",
        period: "2020/08 ~ 2020/10",
        teamSize: 9,
        position: "PG (Frontend)",
        team: [
          { role: "PM", count: 1 },
          { role: "PL", count: 2 },
          { role: "Frontend", count: 2 },
          { role: "Backend", count: 4 },
        ],
        technologies: ["Vue.js", "Scrum"],
      },
      {
        id: "edu",
        period: "2020/04 ~ 2020/07",
        teamSize: 8,
        position: "PG (Frontend)",
        team: [
          { role: "PM", count: 1 },
          { role: "PL", count: 2 },
          { role: "Frontend", count: 3 },
          { role: "Backend", count: 2 },
        ],
        technologies: ["Nuxt.js", "Atomic Design", "Jest"],
      },
    ],
  },
];
