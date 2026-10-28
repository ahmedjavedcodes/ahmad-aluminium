"use client";

import type { SplitHeading } from "@/data/content";
import { Reveal } from "@/lib/motion";
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
}: {
  eyebrow?: string;
  heading: SplitHeading;
  intro?: string;
  /** Section number shown before the eyebrow, e.g. 2 → "02". */
  index?: number;
  align?: "start" | "center";
  level?: "h1" | "h2";
  className?: string;
}) {
  const Tag = level;
  const centered = align === "center";

  return (
    <Reveal className={cn(centered && "mx-auto text-center", className)}>
      {eyebrow && (
        <p
          className={cn(
            "mb-5 flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.2em] text-accent-deep",
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

      <Tag className="font-display text-[2.25rem] font-extrabold leading-[1.02] tracking-[-0.045em] text-ink sm:text-5xl md:text-[3.6rem]">
        {heading.lead} <span className="text-accent">{heading.accent}</span>
        {heading.tail}
      </Tag>

      {intro && (
        <p
          className={cn(
            "mt-5 max-w-prose text-[15px] leading-[1.75] text-ink-muted sm:text-[17px]",
            centered && "mx-auto"
          )}
        >
          {intro}
        </p>
      )}
    </Reveal>
  );
}
