"use client";

import type { SplitHeading } from "@/data/content";
import { Reveal } from "@/lib/motion";

/**
 * Standard section header: eyebrow → heading → optional intro.
 *
 * The accent word is a solid brand colour rather than clipped gradient text.
 * Gradient-filled type relies on `background-clip: text` with a transparent
 * foreground, which loses all colour if the clip fails, renders inconsistently
 * across wrapped lines, and cannot be contrast-tested — a flat accent at
 * 6.07:1 on the page ground is both more legible and more deliberate.
 */
export function SectionHeading({
  eyebrow,
  heading,
  intro,
  align = "start",
  level = "h2",
  className,
}: {
  eyebrow?: string;
  heading: SplitHeading;
  intro?: string;
  align?: "start" | "center";
  level?: "h1" | "h2";
  className?: string;
}) {
  const Tag = level;
  const centered = align === "center";

  return (
    <Reveal className={`${centered ? "mx-auto text-center" : ""} ${className ?? ""}`}>
      {eyebrow && (
        <p
          className={`mb-3 flex items-center gap-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-accent-deep ${
            centered ? "justify-center" : ""
          }`}
        >
          <span aria-hidden className="h-px w-6 bg-accent/45" />
          {eyebrow}
        </p>
      )}

      <Tag className="font-display text-[1.9rem] font-semibold leading-[1.14] tracking-[-0.015em] text-ink sm:text-4xl md:text-[2.9rem]">
        {heading.lead} <span className="text-accent">{heading.accent}</span>
        {heading.tail}
      </Tag>

      {intro && (
        <p className={`mt-4 max-w-prose text-ink-muted ${centered ? "mx-auto" : ""}`}>
          {intro}
        </p>
      )}
    </Reveal>
  );
}
