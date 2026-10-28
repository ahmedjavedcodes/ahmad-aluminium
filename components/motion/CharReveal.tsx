"use client";

import { Fragment, type CSSProperties } from "react";
import { useReveal } from "@/lib/reveal";
import { cn } from "@/lib/utils";

/**
 * Character-level reveal: each letter rises out of a mask in a quick
 * cascade. Words stay whole (no mid-word line breaks) and spaces are real
 * text nodes between them, so wrapping, copy-paste and screen readers all see
 * ordinary text.
 *
 * Shares SplitText's CSS (".split-word" in globals.css) with one letter per
 * mask: `mount` animates with the first paint, no JavaScript needed; `inView`
 * waits for the shared observer. Reduced motion pins every letter in place.
 */
export function CharReveal({
  text,
  className,
  charClassName,
  delay = 0,
  stagger = 0.022,
  trigger = "inView",
}: {
  text: string;
  className?: string;
  charClassName?: string;
  delay?: number;
  stagger?: number;
  trigger?: "mount" | "inView";
}) {
  const ref = useReveal<HTMLSpanElement>();
  const words = text.split(" ").filter(Boolean);
  const starts = words.map((_, w) => words.slice(0, w).join("").length);

  return (
    <span
      ref={trigger === "inView" ? ref : undefined}
      className={cn("split-text", className)}
      data-split={trigger}
      style={
        {
          "--split-delay": `${Math.round(delay * 1000)}ms`,
          "--split-stagger": `${Math.round(stagger * 1000)}ms`,
        } as CSSProperties
      }
    >
      {words.map((word, w) => (
        <Fragment key={`${word}-${w}`}>
          <span className="inline-block whitespace-nowrap">
            {Array.from(word).map((ch, c) => (
              <span key={c} className="split-mask">
                <span className={cn("split-word", charClassName)} style={{ "--w": starts[w] + c } as CSSProperties}>
                  {ch}
                </span>
              </span>
            ))}
          </span>
          {w < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}
