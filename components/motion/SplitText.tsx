"use client";

import { Fragment } from "react";
import { motion, useReducedMotion, type Transition } from "framer-motion";

const EASE: Transition["ease"] = [0.16, 1, 0.3, 1];

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
export function SplitText({
  text,
  className,
  wordClassName,
  as = "span",
  delay = 0,
  stagger = 0.055,
  duration = 0.9,
  /**
   * `mount` animates immediately — correct for above-the-fold headings, which
   * can otherwise sit permanently hidden if the in-view observer never fires.
   * `inView` defers until scrolled to.
   */
  trigger = "inView",
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  as?: "span" | "h1" | "h2" | "h3" | "p";
  delay?: number;
  stagger?: number;
  duration?: number;
  trigger?: "mount" | "inView";
}) {
  const reduceMotion = useReducedMotion();
  const words = text.split(" ").filter(Boolean);
  const Comp = motion[as];

  // With motion suppressed, render the plain string — no masks, no transforms,
  // nothing that could leave the heading invisible.
  if (reduceMotion) {
    const Static = as;
    return (
      <Static className={className}>
        {wordClassName ? <span className={wordClassName}>{text}</span> : text}
      </Static>
    );
  }

  const animateProps =
    trigger === "mount"
      ? { animate: { y: "0%" } }
      : {
          whileInView: { y: "0%" },
          viewport: { once: true, margin: "-80px" } as const,
        };

  return (
    <Comp className={className}>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span className="split-mask">
            <motion.span
              className={`inline-block will-change-transform ${wordClassName ?? ""}`}
              initial={{ y: "115%" }}
              {...animateProps}
              transition={{
                duration,
                delay: delay + i * stagger,
                ease: EASE,
              }}
            >
              {word}
            </motion.span>
          </span>
          {/* Real space between masks — must live outside the clip. */}
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Comp>
  );
}
