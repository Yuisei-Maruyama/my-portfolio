"use client";

import { m } from "framer-motion";
import { useTranslations } from "next-intl";
import { worksData } from "@/data/works";
import { FADE_IN } from "@/lib/constants";
import Text from "./Typography";

const Works = () => {
  const t = useTranslations("works");

  return (
    <section id="works" className="content-auto py-28 px-5 sm:px-8 max-w-6xl mx-auto">
      <m.div {...FADE_IN} className="flex items-center gap-4 mb-16">
        <Text variant="overline" className="border border-silver-100 px-3 py-1.5" aria-hidden="true">
          04
        </Text>
        <div className="h-px flex-1 bg-gradient-to-r from-silver-200 to-transparent max-w-24" aria-hidden="true" />
        <h2 className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl font-bold tracking-wide">
          WORKS
        </h2>
      </m.div>

      <div className="grid md:grid-cols-2 gap-5">
        {worksData.map((work, i) => {
          const highlights = t.raw(`items.${work.id}.highlights`) as string[];
          return (
            <m.div
              key={work.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <div className="mirror-card rounded-sm h-full flex flex-col">
                {/* Card header — file browser style */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-silver-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-silver/30" aria-hidden="true" />
                    <Text variant="overline" className="tracking-nav uppercase">
                      project_{String(i).padStart(2, "0")}
                    </Text>
                  </div>
                  {work.link && (
                    <a
                      href={work.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm lg:text-md tracking-btn text-silver/40 hover:text-silver transition-colors uppercase p-2 -m-2"
                      aria-label={`View ${t(`items.${work.id}.title`)} (opens in new tab)`}
                    >
                      open →
                    </a>
                  )}
                </div>

                {/* Card body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col">
                  <h3 className="font-[family-name:var(--font-heading)] text-base font-bold text-primary mb-1">
                    {t(`items.${work.id}.title`)}
                  </h3>
                  <Text variant="caption" as="p" className="tracking-btn mb-3">
                    {t(`items.${work.id}.role`)}
                  </Text>

                  <Text variant="body" as="p" className="text-xs mb-4 flex-1">
                    {t(`items.${work.id}.description`)}
                  </Text>

                  <ul className="space-y-1.5 mb-4">
                    {highlights.map((h, hi) => (
                      <li
                        key={hi}
                        className="text-secondary text-xs leading-relaxed flex items-start gap-2"
                      >
                        <span className="text-silver/40 mt-0.5 shrink-0 text-[8px]" aria-hidden="true">
                          ▸
                        </span>
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-silver-100/50">
                    {work.technologies.map((tech) => (
                      <span key={tech} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </m.div>
          );
        })}
      </div>
    </section>
  );
};

export default Works;
