import { getTranslations } from "next-intl/server";

const Footer = async () => {
  const t = await getTranslations("footer");

  return (
    <footer className="border-t border-silver-100 py-8 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-[family-name:var(--font-display)] text-sm lg:text-md tracking-[0.15em] text-text-secondary">
          &copy; {new Date().getFullYear()} {t("copyright")}
        </p>
        <p className="font-[family-name:var(--font-display)] text-sm lg:text-md tracking-[0.1em] text-text-secondary">
          Next.js &middot; TailwindCSS &middot; Framer&nbsp;Motion
        </p>
      </div>
    </footer>
  );
};

export default Footer;
