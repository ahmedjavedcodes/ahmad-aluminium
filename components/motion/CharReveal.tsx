"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Character-level reveal: each letter rises out of a mask in a quick
 * cascade. Words stay whole (no mid-word line breaks) and spaces are real
 * text nodes between them, so wrapping, copy-paste and screen readers all see
 * ordinary text. `trigger="mount"` for above-the-fold headlines, `inView`
 * otherwise. Reduced motion: the `.split-mask` rules in globals.css pin every
 * letter in place.
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
  const words = text.split(" ").filter(Boolean);
  let n = 0;
  const go = { y: "0%", opacity: 1 };
  const animateProps =
    trigger === "mount"
      ? { animate: go }
      : { whileInView: go, viewport: { once: true, margin: "-60px" } as const };

  return (
    <span className={className}>
      {words.map((word, w) => (
        <Fragment key={`${word}-${w}`}>
          <span className="inline-block whitespace-nowrap">
            {Array.from(word).map((ch, c) => {
              const i = n++;
              return (
                <span key={c} className="split-mask">
                  <motion.span
                    className={cn("inline-block will-change-transform", charClassName)}
                    initial={{ y: "110%", opacity: 0 }}
                    {...animateProps}
                    transition={{ duration: 0.7, delay: delay + i * stagger, ease: EASE }}
                  >
                    {ch}
                  </motion.span>
                </span>
              );
            })}
          </span>
          {w < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}
