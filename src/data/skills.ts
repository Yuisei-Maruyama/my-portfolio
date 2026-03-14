import {
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiVuedotjs,
  SiNuxt,
  SiTailwindcss,
  SiShopify,
  SiStorybook,
  SiJest,
  SiMysql,
  SiPython,
  SiGit,
  SiGithub,
  SiDocker,
  SiFigma,
  SiNodedotjs,
  SiGo,
  SiGooglecloud,
  SiFirebase,
} from "react-icons/si";
import { TbBrandFramerMotion, TbCloudCode, TbCalendarTime, TbShieldLock } from "react-icons/tb";
import type { IconType } from "react-icons";

export type Skill = {
  name: string;
  icon: IconType;
  category: "frontend" | "backend" | "tools" | "infra";
};

export const skillsData: Skill[] = [
  // Frontend
  { name: "TypeScript", icon: SiTypescript, category: "frontend" },
  { name: "React", icon: SiReact, category: "frontend" },
  { name: "Next.js", icon: SiNextdotjs, category: "frontend" },
  { name: "Vue.js", icon: SiVuedotjs, category: "frontend" },
  { name: "Nuxt.js", icon: SiNuxt, category: "frontend" },
  { name: "TailwindCSS", icon: SiTailwindcss, category: "frontend" },
  { name: "Framer Motion", icon: TbBrandFramerMotion, category: "frontend" },
  { name: "Shopify", icon: SiShopify, category: "frontend" },
  { name: "Storybook", icon: SiStorybook, category: "frontend" },

  // Backend
  { name: "Node.js", icon: SiNodedotjs, category: "backend" },
  { name: "Go", icon: SiGo, category: "backend" },
  { name: "Python", icon: SiPython, category: "backend" },
  { name: "MySQL", icon: SiMysql, category: "backend" },

  // Tools
  { name: "Git", icon: SiGit, category: "tools" },
  { name: "GitHub", icon: SiGithub, category: "tools" },
  { name: "Docker", icon: SiDocker, category: "tools" },
  { name: "Jest", icon: SiJest, category: "tools" },
  { name: "Figma", icon: SiFigma, category: "tools" },

  // Infra
  { name: "GCP", icon: SiGooglecloud, category: "infra" },
  { name: "Cloud Functions", icon: TbCloudCode, category: "infra" },
  { name: "Cloud Firestore", icon: SiFirebase, category: "infra" },
  { name: "Cloud Scheduler", icon: TbCalendarTime, category: "infra" },
  { name: "Secret Manager", icon: TbShieldLock, category: "infra" },
];
