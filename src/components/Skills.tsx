"use client";

import { m } from "framer-motion";
import { useTranslations } from "next-intl";
import { skillsData } from "@/data/skills";
import { FADE_IN } from "@/lib/constants";
import Text from "./Typography";

const categoryKeys = ["frontend", "backend", "tools", "infra"] as const;

const Skills = () => {
  const t = useTranslations("skills");

  return (
    <section id="skills" className="content-auto py-28 px-5 sm:px-8 max-w-6xl mx-auto">
      <m.div {...FADE_IN} className="flex items-center gap-4 mb-16">
        <Text variant="overline" className="border border-silver-100 px-3 py-1.5" aria-hidden="true">
          02
        </Text>
        <div className="h-px flex-1 bg-gradient-to-r from-silver-200 to-transparent max-w-24" aria-hidden="true" />
        <h2 className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl font-bold tracking-wide">
          SKILLS
        </h2>
      </m.div>

      <div className="space-y-14">
        {categoryKeys.map((key) => {
          const skills = skillsData.filter((s) => s.category === key);
          return (
            <m.div key={key} {...FADE_IN}>
              <div className="flex items-center gap-3 mb-6">
                <Text variant="label">
                  {t(`${key}.label`)}
                </Text>
                <Text variant="caption">{t(`${key}.desc`)}</Text>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {skills.map((skill, i) => {
                  const Icon = skill.icon;
                  return (
                    <m.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.04 }}
                      className="group mirror-card rounded-sm p-4 flex items-center gap-3"
                    >
                      <Icon className="text-silver/60 group-hover:text-silver text-xl shrink-0 transition-colors" aria-hidden="true" />
                      <span className="text-xs text-text-primary">
                        {skill.name}
                      </span>
                    </m.div>
                  );
                })}
              </div>
            </m.div>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;
