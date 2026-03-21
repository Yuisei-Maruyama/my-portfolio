import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ["framer-motion", "react-icons"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [100, 140, 180],
  },
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        // クリックジャッキング対策（CSP frame-ancestors と併用で旧ブラウザにも対応）
        { key: "X-Frame-Options", value: "DENY" },
        // MIME スニッフィング防止
        { key: "X-Content-Type-Options", value: "nosniff" },
        // リファラー情報の漏洩制限
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        // 不要なブラウザ API へのアクセス禁止
        {
          key: "Permissions-Policy",
          value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
        },
        // HTTPS 強制（2年間）
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
        // クロスオリジンウィンドウの opener 参照を遮断
        {
          key: "Cross-Origin-Opener-Policy",
          value: "same-origin",
        },
        // Content Security Policy
        // ・next/font/google はビルド時にフォントをローカル化するため外部フォントドメイン不要
        // ・Vercel Analytics/SpeedInsights は va.vercel-scripts.com からスクリプトを注入
        // ・JSON-LD と Next.js ハイドレーションのインラインスクリプトに unsafe-inline が必要
        {
          key: "Content-Security-Policy",
          value: [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com",
            "style-src 'self' 'unsafe-inline'",
            "font-src 'self'",
            "img-src 'self' data: blob:",
            "connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com",
            "media-src 'none'",
            "object-src 'none'",
            "frame-src 'none'",
            "frame-ancestors 'none'",
            "base-uri 'self'",
            "form-action 'self'",
            "upgrade-insecure-requests",
          ].join("; "),
        },
      ],
    },
    {
      source: "/:all*(svg|jpg|jpeg|png|webp|avif|ico|woff2)",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
  ],
};

export default withNextIntl(nextConfig);
