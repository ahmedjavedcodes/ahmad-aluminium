"use client";

import type { SplitHeading } from "@/data/content";
import { Reveal } from "@/lib/motion";
import { SplitText } from "@/components/motion/SplitText";
import { cn } from "@/lib/utils";

/**
 * Standard section header: eyebrow → heading → optional intro.
 *
 * The eyebrow is a tracked-out copper label with an optional numbered badge,
 * and the heading is set large in Plus Jakarta Sans. The accent word is a
 * solid copper rather than clipped gradient text: it keeps its colour when a
 * heading wraps and can actually be contrast-tested (4.6:1 at display size).
 */
export function SectionHeading({
  eyebrow,
  heading,
  intro,
  index,
  align = "start",
  level = "h2",
  className,
  id,
  introClassName,
}: {
  eyebrow?: string;
  heading: SplitHeading;
  intro?: string;
  /** Section number shown before the eyebrow, e.g. 2 → "02". */
  index?: number;
  align?: "start" | "center";
  level?: "h1" | "h2";
  className?: string;
  /** id for the heading, so a section can point aria-labelledby at it. */
  id?: string;
  /** Extra classes for the intro, e.g. hiding it where space is tightest. */
  introClassName?: string;
}) {
  const Tag = level;
  const centered = align === "center";

  return (
    <Reveal className={cn(centered && "mx-auto text-center", className)}>
      {eyebrow && (
        <p
          className={cn(
            "mb-[clamp(0.75rem,2svh,1.25rem)] flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.2em] text-accent-deep",
            centered && "justify-center"
          )}
        >
          {index !== undefined && (
            <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-accent px-2 text-[11px] font-bold tracking-normal text-on-accent">
              {String(index).padStart(2, "0")}
            </span>
          )}
          {eyebrow}
        </p>
      )}

      {/* Sized against both width and height, so a heading never pushes its
          one-screen section past the fold on a short window. */}
      <Tag
        id={id}
        className="font-display text-[length:clamp(1.85rem,min(4.4vw,6.2svh),3.5rem)] font-extrabold leading-[1.03] tracking-[-0.045em] text-ink"
      >
        <SplitText as="span" text={heading.lead} className="inline" />{" "}
        <SplitText as="span" text={heading.accent} className="inline" wordClassName="text-accent" delay={0.12} />
        {heading.tail}
      </Tag>

      {intro && (
        <p
          className={cn(
            "mt-[clamp(0.75rem,2svh,1.25rem)] max-w-prose text-[length:clamp(0.9rem,min(1.3vw,2.1svh),1.0625rem)] leading-[1.7] text-ink-muted",
            centered && "mx-auto",
            introClassName
          )}
        >
          {intro}
        </p>
      )}
    </Reveal>
  );
}
