"use client";

import { m } from "framer-motion";
import { useTranslations } from "next-intl";
import { careerData } from "@/data/career";
import { FADE_IN } from "@/lib/constants";
import Text from "./Typography";

const Career = () => {
  const t = useTranslations("career");

  return (
    <section id="career" className="content-auto py-28 px-5 sm:px-8 max-w-6xl mx-auto">
      <m.div {...FADE_IN} className="flex items-center gap-4 mb-16">
        <Text variant="overline" className="border border-silver-100 px-3 py-1.5" aria-hidden="true">
          03
        </Text>
        <div className="h-px flex-1 bg-gradient-to-r from-silver-200 to-transparent max-w-24" aria-hidden="true" />
        <h2 className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl font-bold tracking-wide">
          CAREER
        </h2>
      </m.div>

      <div className="relative">
        {/* Timeline spine */}
        <div className="absolute left-[7px] md:left-[11px] top-0 bottom-0 w-px bg-gradient-to-b from-silver-300 via-silver-100 to-transparent" aria-hidden="true" />

        <div className="space-y-14">
          {careerData.map((career, ci) => (
            <m.div
              key={career.id}
              {...FADE_IN}
              transition={{ duration: 0.7, delay: ci * 0.1 }}
              className="relative pl-10 md:pl-14"
            >
              {/* Timeline dot */}
              <div className="absolute left-0 md:left-1 top-2 w-[15px] h-[15px] rounded-full border-2 border-silver bg-bg-primary pulse-dot" aria-hidden="true" />

              {/* Company card */}
              <div className="mirror-card rounded-sm p-6 sm:p-8">
                {/* Company header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-1">
                  <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-text-primary">
                    {t(`companies.${career.id}.company`)}
                  </h3>
                  <Text variant="caption" className="tracking-nav shrink-0">
                    {career.period}
                  </Text>
                </div>
                <Text variant="caption" as="p" className="tracking-nav mb-6">
                  {t(`companies.${career.id}.role`)}
                </Text>

                {/* Projects */}
                <div className="space-y-6">
                  {career.projects.map((project, pi) => {
                    const highlights = t.raw(`companies.${career.id}.projects.${project.id}.highlights`) as string[];
                    return (
                      <m.div
                        key={project.id}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.15 + pi * 0.08 }}
                        className="border-l border-silver-100 pl-4"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                          <h4 className="text-sm font-semibold text-text-primary">
                            {t(`companies.${career.id}.projects.${project.id}.title`)}
                          </h4>
                          <Text variant="caption">
                            {project.period}
                          </Text>
                        </div>
                        <Text variant="body" as="p" className="text-xs mb-2">
                          {t(`companies.${career.id}.projects.${project.id}.description`)}
                        </Text>

                        {/* Team composition & position */}
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm lg:text-md text-text-secondary mb-3">
                          <Text variant="label" className="inline mb-0">
                            {project.teamSize}{t("teamSuffix")}
                          </Text>
                          <span className="text-silver/30" aria-hidden="true">/</span>
                          <span className="text-silver-light">
                            {project.team.map((member) => `${member.role}:${member.count}`).join(" / ")}
                          </span>
                          <span className="text-silver/30" aria-hidden="true">|</span>
                          <span className="font-semibold text-text-primary">
                            {t("position")}: {project.position}
                          </span>
                        </div>

                        {highlights.length > 0 && (
                          <ul className="space-y-1.5 mb-3">
                            {highlights.map((h, hi) => (
                              <li
                                key={hi}
                                className="text-text-secondary text-xs leading-relaxed flex items-start gap-2"
                              >
                                <span className="text-silver/50 mt-0.5 shrink-0 text-[8px]" aria-hidden="true">
                                  ▸
                                </span>
                                {h}
                              </li>
                            ))}
                          </ul>
                        )}

                        <div className="flex flex-wrap gap-1.5">
                          {project.technologies.map((tech) => (
                            <span key={tech} className="tech-tag">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </m.div>
                    );
                  })}
                </div>
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Career;
