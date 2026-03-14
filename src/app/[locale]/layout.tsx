import type { Metadata, Viewport } from "next";
import { Syne, Dosis, Barlow_Condensed } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import MotionProvider from "@/components/MotionProvider";
import "../globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const dosis = Dosis({
  variable: "--font-dosis",
  subsets: ["latin"],
  weight: ["800"],
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
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
    metadataBase: new URL("https://yuisei.dev"),
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
      url: locale === "ja" ? "https://yuisei.dev" : "https://yuisei.dev/en",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("twitterDescription"),
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
  url: "https://yuisei.dev",
  sameAs: ["https://github.com/y-metro", "https://instagram.com/y_and_and"],
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
      </head>
      <body
        className={`${syne.variable} ${geistMono.variable} ${dosis.variable} ${barlowCondensed.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <MotionProvider>
            {children}
          </MotionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
