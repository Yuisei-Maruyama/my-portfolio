export const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Career", href: "#career" },
  { label: "Works", href: "#works" },
  { label: "Contact", href: "#contact" },
] as const;

export const SITE_CONFIG = {
  name: "Yuisei Maruyama",
  title: "Frontend Engineer",
  description:
    "Frontend Engineer specializing in React, Next.js, and TypeScript.",
} as const;

export const FADE_IN = {
  initial: { opacity: 0, y: 25 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7 },
} as const;
