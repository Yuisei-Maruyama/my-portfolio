import { getTranslations } from "next-intl/server";
import {
  businessContactEmail,
  businessInfoKeys,
  businessServiceIds,
} from "@/data/business";
import { FADE_IN } from "@/lib/constants";
import Text from "./Typography";
import { MotionDiv } from "./Motion";

const Business = async () => {
  const t = await getTranslations("business");
  const scopeSteps = t.raw("scope.steps") as string[];
  const clientItems = t.raw("clients.items") as string[];

  return (
    <section
      id="business"
      className="content-auto py-28 px-5 sm:px-8 max-w-6xl mx-auto"
    >
      {/* Section header */}
      <MotionDiv {...FADE_IN} className="flex items-center gap-4 mb-16">
        <Text
          variant="overline"
          className="border border-silver-100 px-3 py-1.5"
          aria-hidden="true"
        >
          06
        </Text>
        <div
          className="h-px flex-1 bg-gradient-to-r from-silver-200 to-transparent max-w-24"
          aria-hidden="true"
        />
        <h2 className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl font-bold tracking-wide">
          {t("heading")}
        </h2>
      </MotionDiv>

      {/* Lead description */}
      <MotionDiv
        {...FADE_IN}
        transition={{ duration: 0.7, delay: 0.05 }}
        className="mb-10"
      >
        <Text
          variant="body"
          as="p"
          className="text-primary text-base leading-[1.8] max-w-3xl"
        >
          {t("lead")}
        </Text>
      </MotionDiv>

      {/* Business info card (definition list) */}
      <MotionDiv {...FADE_IN} transition={{ duration: 0.7, delay: 0.1 }}>
        <div className="mirror-card rounded-sm corner-frame">
          <div className="flex items-center justify-between px-5 sm:px-6 py-3 border-b border-silver-100">
            <Text
              variant="overline"
              as="p"
              className="tracking-label uppercase text-silver-bright drop-shadow-[0_0_8px_rgba(192,192,200,0.85)]"
              aria-hidden="true"
            >
              &gt; cat business.info
            </Text>
          </div>
          <dl className="divide-y divide-silver-100/50">
            {businessInfoKeys.map((key) => {
              const label = t(`info.${key}.label`);
              const value = t(`info.${key}.value`);
              const isContact = key === "contact";

              return (
                <div
                  key={key}
                  className="grid grid-cols-1 sm:grid-cols-[12rem_1fr] gap-1 sm:gap-6 px-5 sm:px-6 py-4"
                >
                  <dt>
                    <Text variant="label" as="span" className="tracking-label">
                      {label}
                    </Text>
                  </dt>
                  <dd className="text-primary text-sm sm:text-base leading-relaxed">
                    {isContact ? (
                      <a
                        href={`mailto:${businessContactEmail}`}
                        className="text-silver-bright underline-offset-4 hover:underline focus-visible:underline drop-shadow-[0_0_8px_rgba(192,192,200,0.6)]"
                        aria-label={`Email ${businessContactEmail}`}
                      >
                        {value}
                      </a>
                    ) : (
                      value
                    )}
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </MotionDiv>

      {/* Services grid */}
      <MotionDiv
        {...FADE_IN}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="mt-12"
      >
        <h3 className="font-[family-name:var(--font-heading)] text-lg sm:text-xl font-bold text-primary mb-5 tracking-wide">
          {t("services.heading")}
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {businessServiceIds.map((serviceId, i) => (
            <MotionDiv
              key={serviceId}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.05 + i * 0.08 }}
              className="mirror-card rounded-sm p-5 sm:p-6 h-full"
            >
              <Text
                variant="overline"
                as="p"
                className="tracking-nav uppercase text-silver-bright mb-3 drop-shadow-[0_0_8px_rgba(192,192,200,0.85)]"
                aria-hidden="true"
              >
                service_{String(i + 1).padStart(2, "0")}
              </Text>
              <h4 className="font-[family-name:var(--font-heading)] text-base font-bold text-primary mb-2 leading-snug">
                {t(`services.items.${serviceId}.title`)}
              </h4>
              <Text
                variant="body"
                as="p"
                className="text-xs leading-relaxed"
              >
                {t(`services.items.${serviceId}.description`)}
              </Text>
            </MotionDiv>
          ))}
        </div>
      </MotionDiv>

      {/* Scope flow + Target clients (two-column on desktop) */}
      <MotionDiv
        {...FADE_IN}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mt-12 grid lg:grid-cols-2 gap-5"
      >
        {/* Scope flow */}
        <div className="mirror-card rounded-sm p-5 sm:p-6">
          <h3 className="font-[family-name:var(--font-heading)] text-base sm:text-lg font-bold text-primary mb-4 tracking-wide">
            {t("scope.heading")}
          </h3>
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-2">
            {scopeSteps.map((step, i) => (
              <li
                key={step}
                className="flex items-center gap-2 text-sm text-primary"
              >
                <span
                  className="font-[family-name:var(--font-mono)] text-xs text-silver-dim"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{step}</span>
                {i < scopeSteps.length - 1 && (
                  <span
                    className="text-silver/40 ml-1 select-none"
                    aria-hidden="true"
                  >
                    →
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>

        {/* Target clients */}
        <div className="mirror-card rounded-sm p-5 sm:p-6">
          <h3 className="font-[family-name:var(--font-heading)] text-base sm:text-lg font-bold text-primary mb-4 tracking-wide">
            {t("clients.heading")}
          </h3>
          <ul className="space-y-2">
            {clientItems.map((item) => (
              <li
                key={item}
                className="text-secondary text-sm leading-relaxed flex items-start gap-2"
              >
                <span
                  className="text-silver/50 mt-1 shrink-0 text-[8px]"
                  aria-hidden="true"
                >
                  ▸
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </MotionDiv>
    </section>
  );
};

export default Business;
