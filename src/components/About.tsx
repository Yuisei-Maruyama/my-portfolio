"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { FADE_IN } from "@/lib/constants";
import Text from "./Typography";

const About = () => {
  const t = useTranslations("about");

  return (
    <section id="about" className="py-28 px-5 sm:px-8 max-w-6xl mx-auto">
      {/* Section header */}
      <motion.div {...FADE_IN} className="flex items-center gap-4 mb-16">
        <Text variant="overline" className="border border-silver-100 px-3 py-1.5" aria-hidden="true">
          01
        </Text>
        <div className="h-px flex-1 bg-gradient-to-r from-silver-200 to-transparent max-w-24" aria-hidden="true" />
        <h2 className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl font-bold tracking-wide">
          ABOUT
        </h2>
      </motion.div>

      <motion.div
        {...FADE_IN}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        <div className="mirror-card rounded-sm p-6 sm:p-8 corner-frame max-w-3xl">
          <Text variant="overline" as="p" className="tracking-[0.2em] mb-6 uppercase" aria-hidden="true">
            &gt; cat profile.md
          </Text>
          <div className="space-y-4 text-text-secondary text-sm leading-[1.8]">
            <p>{t("bio1")}</p>
            <p>{t("bio2")}</p>
            <p>{t("bio3")}</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
