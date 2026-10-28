"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "@/lib/motion-hooks";
import { cn } from "@/lib/utils";

/**
 * Cycles through a list of words in one slot: the current word slides up and
 * out while the next rises in.
 *
 * Every word sits in the same grid cell, so the slot is always as wide as the
 * longest one and nothing around it moves (no layout shift). The visual words
 * are aria-hidden; screen readers and crawlers get the whole list once, as
 * plain text. Pauses off screen and stays on the first word under reduced
 * motion.
 */
export function WordRotator({
  words,
  interval = 2200,
  className,
}: {
  words: string[];
  interval?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const onScreen = useInView(ref);
  const reduceMotion = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduceMotion || !onScreen || words.length < 2) return;
    const t = setInterval(() => setI((v) => (v + 1) % words.length), interval);
    return () => clearInterval(t);
  }, [reduceMotion, onScreen, words.length, interval]);

  return (
    <span ref={ref} className={cn("relative inline-grid overflow-hidden align-bottom", className)}>
      {words.map((w, k) => {
        const prev = (i - 1 + words.length) % words.length;
        const state = k === i ? "now" : k === prev ? "out" : "next";
        return (
          <span
            key={w}
            aria-hidden
            className="col-start-1 row-start-1 whitespace-nowrap transition-[transform,opacity] duration-500 ease-out-expo"
            style={{
              transform: state === "now" ? "translateY(0)" : state === "out" ? "translateY(-110%)" : "translateY(110%)",
              opacity: state === "now" ? 1 : 0,
            }}
          >
            {w}
          </span>
        );
      })}
      <span className="sr-only">{words.join(", ")}</span>
    </span>
  );
}
