import { unstable_cache } from "next/cache";

const SITE_URL = "https://yuisei-maruyama.vercel.app";

export type LighthouseScores = {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
};

const CATEGORIES = [
  "PERFORMANCE",
  "ACCESSIBILITY",
  "BEST_PRACTICES",
  "SEO",
] as const;

type CategoryKey = (typeof CATEGORIES)[number];

const CATEGORY_MAP: Record<CategoryKey, keyof LighthouseScores> = {
  PERFORMANCE: "performance",
  ACCESSIBILITY: "accessibility",
  BEST_PRACTICES: "bestPractices",
  SEO: "seo",
};

async function fetchScores(): Promise<LighthouseScores | null> {
  // ビルド時（SSG）はスキップ — タイムアウトによるビルド遅延を防ぐ
  if (process.env.NEXT_PHASE === "phase-production-build") {
    return null;
  }

  const apiKey = process.env.PAGESPEED_API_KEY;

  const params = new URLSearchParams({
    url: SITE_URL,
    strategy: "desktop",
  });
  for (const cat of CATEGORIES) {
    params.append("category", cat);
  }
  if (apiKey) {
    params.set("key", apiKey);
  }

  const endpoint = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${params}`;

  try {
    const res = await fetch(endpoint, {
      signal: AbortSignal.timeout(8_000),
    });

    if (!res.ok) {
      throw new Error(`PageSpeed API returned ${res.status}`);
    }

    const data = await res.json();
    const categories = data?.lighthouseResult?.categories;

    if (!categories) {
      throw new Error("Missing categories in response");
    }

    const scores: LighthouseScores = {
      performance: 0,
      accessibility: 0,
      bestPractices: 0,
      seo: 0,
    };

    for (const cat of CATEGORIES) {
      const key = CATEGORY_MAP[cat];
      const raw = categories[cat.toLowerCase().replace("_", "-")]?.score;
      if (raw == null) {
        throw new Error(`Missing score for ${cat}`);
      }
      scores[key] = Math.round(raw * 100);
    }

    return scores;
  } catch (e) {
    console.error("[Lighthouse] Failed to fetch scores:", e);
    return null;
  }
}

export const getLighthouseScores = unstable_cache(fetchScores, ["lighthouse-scores"], {
  revalidate: 3600,
});
