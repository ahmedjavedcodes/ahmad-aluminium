"use client";

import { Fragment, createElement, type CSSProperties } from "react";
import { useReveal } from "@/lib/reveal";
import { cn } from "@/lib/utils";

/**
 * Word-by-word masked reveal.
 *
 * Two bugs previously made headings unreadable, both fixed here:
 *
 * 1. The inter-word space was rendered *inside* each word's `overflow: hidden`
 *    inline-block. A trailing space inside an inline-block is collapsed away by
 *    normal white-space processing, so words ran together ("SixtradesOneteam").
 *    The space is now a real text node emitted *between* the masks, which also
 *    keeps natural line wrapping and correct screen-reader/crawler output.
 *
 * 2. `overflow: hidden` clipped the glyph box to the line box. With tight
 *    display leading that cut every descender (g, y, p, j, q) and the serif
 *    overhang clean off, which read as missing or half-visible words. The mask
 *    is now a `clip-path` that can extend *past* the box edge — open below the
 *    baseline and at the sides, while still hiding the word in its start
 *    position a full line below.
 */
/**
 * The motion is CSS (".split-word" in app/globals.css): each word rises a short
 * way out of its mask while fading up, with a per-word delay — a transition on
 * transform/opacity that runs on the compositor, so it stays smooth even while
 * the page is scrolling. The words carry their index as `--w`.
 */
export function SplitText({
  text,
  className,
  wordClassName,
  as = "span",
  delay = 0,
  stagger = 0.045,
  /**
   * `mount` reveals on load (above-the-fold headings). `inView` waits until
   * the text scrolls into view. `parent` waits for the nearest enclosing
   * `.reveal-group` to be revealed, so a whole heading block (label, words,
   * intro) runs as one sequence off a single observer — see SectionHeading.
   */
  trigger = "inView",
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  as?: "span" | "h1" | "h2" | "h3" | "p";
  /** Seconds before the first word. */
  delay?: number;
  /** Seconds between words. */
  stagger?: number;
  trigger?: "mount" | "inView" | "parent";
}) {
  const ref = useReveal<HTMLElement>(trigger === "mount" ? "mount" : "inView");
  const words = text.split(" ").filter(Boolean);

  // Identical markup with motion suppressed — the reduced-motion CSS pins
  // every word in place — so server and client always agree.
  return createElement(
    as,
    {
      ref: trigger === "parent" ? undefined : ref,
      className: cn("split-text", className),
      "data-split": trigger,
      style: {
        "--split-delay": `${Math.round(delay * 1000)}ms`,
        "--split-stagger": `${Math.round(stagger * 1000)}ms`,
      } as CSSProperties,
    },
    words.map((w, i) => (
      <Fragment key={`${w}-${i}`}>
        <span className="split-mask">
          <span className={cn("split-word", wordClassName)} style={{ "--w": i } as CSSProperties}>
            {w}
          </span>
        </span>
        {/* Real space between masks — must live outside the clip. */}
        {i < words.length - 1 ? " " : null}
      </Fragment>
    ))
  );
}
