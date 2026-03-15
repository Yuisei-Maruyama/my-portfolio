"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";

const LanguageSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: "ja" | "en") => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex items-center gap-1 text-sm lg:text-md tracking-btn">
      <button
        onClick={() => switchLocale("ja")}
        className={`px-1.5 py-0.5 transition-colors duration-300 ${
          locale === "ja"
            ? "text-silver-light font-semibold"
            : "text-text-muted hover:text-text-secondary"
        }`}
        aria-label="日本語に切り替え"
        aria-current={locale === "ja" ? "true" : undefined}
      >
        JA
      </button>
      <span className="text-text-muted" aria-hidden="true">/</span>
      <button
        onClick={() => switchLocale("en")}
        className={`px-1.5 py-0.5 transition-colors duration-300 ${
          locale === "en"
            ? "text-silver-light font-semibold"
            : "text-text-muted hover:text-text-secondary"
        }`}
        aria-label="Switch to English"
        aria-current={locale === "en" ? "true" : undefined}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSwitcher;
