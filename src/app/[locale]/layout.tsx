import type { Metadata, Viewport } from "next";
import { Syne, Dosis } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import MotionProvider from "@/components/MotionProvider";
import "../globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700"],
  display: "optional",
});

const dosis = Dosis({
  variable: "--font-dosis",
  subsets: ["latin"],
  weight: ["800"],
  display: "optional",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "optional",
});

export const viewport: Viewport = {
  themeColor: "#09090B",
  width: "device-width",
  initialScale: 1,
};

export const generateStaticParams = () => {
  return routing.locales.map((locale) => ({ locale }));
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    metadataBase: new URL("https://yuisei-maruyama.vercel.app"),
    alternates: {
      canonical: locale === "ja" ? "/" : `/${locale}`,
      languages: {
        ja: "/",
        en: "/en",
      },
    },
    title: t("title"),
    description: t("description"),
    keywords: [
      "Frontend Engineer",
      "React",
      "Next.js",
      "TypeScript",
      "フロントエンドエンジニア",
      "丸山唯成",
      "Yuisei Maruyama",
    ],
    authors: [{ name: "Yuisei Maruyama" }],
    creator: "Yuisei Maruyama",
    openGraph: {
      title: t("title"),
      description: t("ogDescription"),
      type: "website",
      locale: locale === "ja" ? "ja_JP" : "en_US",
      siteName: "Yuisei Maruyama Portfolio",
      url: locale === "ja" ? "https://yuisei-maruyama.vercel.app" : "https://yuisei-maruyama.vercel.app/en",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("twitterDescription"),
    },
    icons: {
      shortcut: "/favicon.ico",
      icon: [
        { url: "/icons/favicon-16x16.png", sizes: "16x16",  type: "image/png" },
        { url: "/icons/favicon-32x32.png", sizes: "32x32",  type: "image/png" },
        { url: "/icons/icon-96x96.png",    sizes: "96x96",  type: "image/png" },
        { url: "/icons/icon-192x192.png",  sizes: "192x192",type: "image/png" },
        { url: "/icons/icon-512x512.png",  sizes: "512x512",type: "image/png" },
      ],
      apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  };
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Yuisei Maruyama",
  jobTitle: "Frontend Engineer",
  description: "React, Next.js, TypeScriptを中心としたフロントエンド開発を行うエンジニア",
  url: "https://yuisei-maruyama.vercel.app",
  sameAs: ["https://github.com/Yuisei-Maruyama", "https://www.instagram.com/y_metro/", "https://x.com/y_metro1234"],
  knowsAbout: ["React", "Next.js", "TypeScript", "Vue.js", "Shopify", "Frontend Development"],
  worksFor: {
    "@type": "Organization",
    name: "CyberAgent, Inc.",
  },
};

const RootLayout = async ({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) => {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* スカイパララックス背景画像をブラウザアイドル時に先取りキャッシュ。
            requestIdleCallback より早く開始されるため、スクロール到達時に即表示 */}
        <link rel="prefetch" href="/images/window_01.webp" as="image" type="image/webp" />
        <link rel="prefetch" href="/images/window_02.webp" as="image" type="image/webp" />
        <link rel="prefetch" href="/images/window_03.webp" as="image" type="image/webp" />
      </head>
      <body
        className={`${syne.variable} ${geistMono.variable} ${dosis.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <MotionProvider>
            {children}
            {process.env.VERCEL && <SpeedInsights />}
            {process.env.VERCEL && <Analytics />}
          </MotionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
