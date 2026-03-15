"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { FADE_IN } from "@/lib/constants";
import Text from "./Typography";

const GitHubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const NoteIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M14 3v4a1 1 0 001 1h4" />
    <path d="M17 21H7a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2z" />
    <path d="M9 9h1M9 13h6M9 17h6" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const MailIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
  </svg>
);

const contacts = [
  {
    label: "GitHub",
    href: "https://github.com/y-metro",
    icon: GitHubIcon,
    value: "y-metro",
  },
  {
    label: "note",
    href: "https://note.com/y_metro",
    icon: NoteIcon,
    value: "y_metro",
  },
  {
    label: "Instagram",
    href: "https://instagram.com/y_and_and",
    icon: InstagramIcon,
    value: "@y_and_and",
  },
  {
    label: "Email",
    href: "mailto:yuinari0720@gmail.com",
    icon: MailIcon,
    value: "yuinari0720@gmail.com",
  },
];

const Contact = () => {
  const t = useTranslations("contact");

  return (
    <section id="contact" className="content-auto py-28 px-5 sm:px-8 max-w-6xl mx-auto">
      <motion.div {...FADE_IN} className="flex items-center gap-4 mb-16">
        <Text variant="overline" className="border border-silver-100 px-3 py-1.5" aria-hidden="true">
          05
        </Text>
        <div className="h-px flex-1 bg-gradient-to-r from-silver-200 to-transparent max-w-24" aria-hidden="true" />
        <h2 className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl font-bold tracking-wide">
          CONTACT
        </h2>
      </motion.div>

      <motion.p
        {...FADE_IN}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-text-secondary text-sm mb-12 max-w-md leading-relaxed whitespace-pre-line"
      >
        {t("description")}
      </motion.p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {contacts.map((contact, i) => {
          const Icon = contact.icon;
          return (
            <motion.a
              key={contact.label}
              href={contact.href}
              target={contact.label !== "Email" ? "_blank" : undefined}
              rel={contact.label !== "Email" ? "noopener noreferrer" : undefined}
              aria-label={`${contact.label}: ${contact.value}${contact.label !== "Email" ? " (opens in new tab)" : ""}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
              className="group mirror-card rounded-sm p-6 text-center"
            >
              <Icon className="w-6 h-6 text-silver/50 group-hover:text-silver mx-auto mb-3 transition-colors duration-300" />
              <Text variant="label" as="p" className="tracking-[0.15em] mb-1">
                {contact.label}
              </Text>
              <Text variant="caption" as="p">{contact.value}</Text>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
};

export default Contact;
