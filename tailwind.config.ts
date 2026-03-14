import type { Config } from "tailwindcss";

/**
 * Design System: Liquid Mercury / Mirror
 *
 * Primary accent: Silver (#C0C0C8) — metallic shimmer
 * Background: Near-black with subtle warmth
 * Typography: Syne (display/headings) → Geist Mono (body)
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg-primary": "#09090B",
        "bg-surface": "#111114",
        "bg-card": "#18181B",
        "bg-card-hover": "#1F1F23",
        silver: {
          DEFAULT: "#C0C0C8",
          50: "rgba(192, 192, 200, 0.06)",
          100: "rgba(192, 192, 200, 0.12)",
          200: "rgba(192, 192, 200, 0.25)",
          300: "rgba(192, 192, 200, 0.40)",
          400: "rgba(192, 192, 200, 0.60)",
          light: "#E8E8EC",
          bright: "#F5F5F7",
          dim: "#6B6B78",
        },
        "text-primary": "#EDEDF0",
        "text-secondary": "#9898A1",
        "text-muted": "#52525B",
      },
      fontFamily: {
        display: ["var(--font-syne)", "system-ui", "sans-serif"],
        heading: ["var(--font-syne)", "system-ui", "sans-serif"],
        mono: [
          "var(--font-geist-mono)",
          "ui-monospace",
          "'Hiragino Kaku Gothic ProN'",
          "'Noto Sans JP'",
          "monospace",
        ],
        body: [
          "var(--font-geist-mono)",
          "ui-monospace",
          "'Hiragino Kaku Gothic ProN'",
          "'Noto Sans JP'",
          "monospace",
        ],
      },
      fontSize: {
        xs: "12px",
        sm: "14px",
        md: "16px",
        lg: "18px",
      },
      spacing: {
        "bp-sm": "24px",
        "bp-md": "32px",
        "bp-lg": "40px",
      },
      boxShadow: {
        "glow-sm": "0 0 6px rgba(192, 192, 200, 0.3)",
        "glow-md":
          "0 0 10px rgba(192, 192, 200, 0.2), 0 0 20px rgba(192, 192, 200, 0.08)",
        "glow-lg":
          "0 0 10px rgba(192, 192, 200, 0.3), 0 0 30px rgba(192, 192, 200, 0.1), 0 0 60px rgba(192, 192, 200, 0.04)",
      },
      animation: {
        blink: "blink 1s step-end infinite",
        sweep: "sweep 4s ease-in-out infinite",
        "pulse-dot": "pulse-dot 2.5s ease-in-out infinite",
        "mercury-flow": "mercury-flow 6s ease-in-out infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        sweep: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "pulse-dot": {
          "0%, 100%": { boxShadow: "0 0 4px rgba(192, 192, 200, 0.4)" },
          "50%": {
            boxShadow:
              "0 0 12px rgba(192, 192, 200, 0.6), 0 0 24px rgba(192, 192, 200, 0.2)",
          },
        },
        "mercury-flow": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
