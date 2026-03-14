import { type ReactNode, type HTMLAttributes, createElement } from "react";

type Variant = "label" | "value" | "caption" | "body" | "overline" | "tag";

type As = "span" | "p" | "div" | "h2" | "h3" | "h4";

type TypographyProps = {
  variant: Variant;
  as?: As;
  children: ReactNode;
  className?: string;
} & Omit<HTMLAttributes<HTMLElement>, "className">;

const variantConfig: Record<Variant, { defaultTag: As; className: string }> = {
  label: {
    defaultTag: "span",
    className:
      "block font-[family-name:var(--font-mono)] text-sm lg:text-md tracking-[0.2em] text-text-secondary uppercase",
  },
  value: {
    defaultTag: "div",
    className:
      "font-[family-name:var(--font-heading)] text-lg text-text-primary font-semibold",
  },
  caption: {
    defaultTag: "span",
    className: "font-[family-name:var(--font-mono)] text-sm lg:text-md text-silver",
  },
  body: {
    defaultTag: "p",
    className: "text-text-secondary text-sm leading-relaxed",
  },
  overline: {
    defaultTag: "span",
    className:
      "font-[family-name:var(--font-display)] text-sm lg:text-md tracking-[0.3em] text-text-secondary",
  },
  tag: {
    defaultTag: "span",
    className:
      "font-[family-name:var(--font-mono)] text-sm lg:text-md tracking-[0.05em] text-silver",
  },
};

const Text = ({
  variant,
  as,
  children,
  className,
  ...props
}: TypographyProps) => {
  const config = variantConfig[variant];
  const tag = as ?? config.defaultTag;
  const combinedClassName = className
    ? `${config.className} ${className}`
    : config.className;

  return createElement(tag, { className: combinedClassName, ...props }, children);
};

export default Text;
