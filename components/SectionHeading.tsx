"use client";

import type { SplitHeading } from "@/data/content";
import { Reveal } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Standard section header: eyebrow → heading → optional intro.
 *
 * The eyebrow is set like a label on a shop drawing — monospace, tracked out,
 * with an optional section number — and the heading in condensed Archivo. The
 * accent word is a solid copper rather than clipped gradient text: it keeps its
 * colour when a heading wraps and can actually be contrast-tested (7.1:1).
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
            "mb-4 flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-accent-deep",
            centered && "justify-center"
          )}
        >
          {index !== undefined && (
            <span className="text-ink-subtle">{String(index).padStart(2, "0")} /</span>
          )}
          {eyebrow}
          <span aria-hidden className="h-px w-10 bg-gradient-to-r from-accent/60 to-transparent" />
        </p>
      )}

      <Tag className="font-display text-[2rem] font-bold leading-[1.05] tracking-[-0.025em] text-ink sm:text-[2.6rem] md:text-[3.2rem]">
        {heading.lead} <span className="text-accent">{heading.accent}</span>
        {heading.tail}
      </Tag>

      {intro && (
        <p
          className={cn(
            "mt-5 max-w-prose text-[15px] leading-relaxed text-ink-muted sm:text-base",
            centered && "mx-auto"
          )}
        >
          {intro}
        </p>
      )}
    </Reveal>
  );
}
