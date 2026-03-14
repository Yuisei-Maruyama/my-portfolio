"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { NAV_ITEMS } from "@/lib/constants";
import LanguageSwitcher from "./LanguageSwitcher";
import Text from "./Typography";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("header");

  const closeMenu = useCallback(() => setIsOpen(false), []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg-primary/90 backdrop-blur-md border-b border-silver-100">
      <nav aria-label="Main navigation" className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-14">
          <a
            href="#"
            aria-label={t("backToTop")}
            className="font-[family-name:var(--font-heading)] text-silver font-bold text-base tracking-widest hover:text-silver-light transition-colors"
          >
            Y.MARUYAMA<span className="cursor-blink text-silver-dim ml-0.5" aria-hidden="true">_</span>
          </a>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-6">
            <ul className="flex items-center gap-6">
              {NAV_ITEMS.map((item, i) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm lg:text-md tracking-[0.15em] text-text-secondary hover:text-silver transition-colors duration-300 relative group uppercase"
                  >
                    <Text variant="overline" className="mr-1 inline" aria-hidden="true">
                      0{i + 1}
                    </Text>
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-silver group-hover:w-full transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
            <LanguageSwitcher />
          </div>

          {/* Mobile toggle + lang */}
          <div className="flex md:hidden items-center gap-2">
            <LanguageSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-silver p-2 relative w-8 h-8 flex items-center justify-center"
              aria-label="Menu"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <span
                className={`absolute h-px w-5 bg-silver transition-all duration-300 ${
                  isOpen ? "rotate-45" : "-translate-y-1.5"
                }`}
              />
              <span
                className={`absolute h-px w-5 bg-silver transition-all duration-300 ${
                  isOpen ? "opacity-0 scale-0" : ""
                }`}
              />
              <span
                className={`absolute h-px w-5 bg-silver transition-all duration-300 ${
                  isOpen ? "-rotate-45" : "translate-y-1.5"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-menu"
              role="menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              onKeyDown={(e) => {
                if (e.key === "Escape") closeMenu();
              }}
              className="md:hidden overflow-hidden border-t border-silver-100"
            >
              <ul className="py-3">
                {NAV_ITEMS.map((item, i) => (
                  <li key={item.href} role="none">
                    <a
                      href={item.href}
                      role="menuitem"
                      onClick={closeMenu}
                      className="block py-3.5 px-3 text-xs tracking-[0.15em] text-text-secondary hover:text-silver transition-colors uppercase"
                    >
                      <Text variant="overline" className="mr-2 inline" aria-hidden="true">
                        0{i + 1}
                      </Text>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;
