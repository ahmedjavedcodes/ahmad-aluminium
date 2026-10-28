"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Types its text out character by character behind a blinking copper caret.
 *
 * The real text is always present at full size but transparent, which
 * reserves the exact space it will occupy (no layout shift as it types), keeps
 * it in the accessibility tree, and leaves crawlers one clean copy in the
 * server-rendered HTML. The typed copy on top is aria-hidden decoration.
 * Under reduced motion the whole text appears at once.
 */
export function Typewriter({
  text,
  className,
  delay = 0.5,
  speed = 55,
  trigger = "mount",
}: {
  text: string;
  className?: string;
  /** Seconds before typing starts. */
  delay?: number;
  /** Milliseconds per character. */
  speed?: number;
  trigger?: "mount" | "inView";
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduceMotion = useReducedMotion();
  const [count, setCount] = useState(0);
  const start = trigger === "mount" || inView;

  useEffect(() => {
    if (reduceMotion) {
      setCount(text.length);
      return;
    }
    if (!start) return;
    let i = 0;
    let timer: ReturnType<typeof setInterval> | undefined;
    const wait = setTimeout(() => {
      timer = setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= text.length && timer) clearInterval(timer);
      }, speed);
    }, delay * 1000);
    return () => {
      clearTimeout(wait);
      if (timer) clearInterval(timer);
    };
  }, [start, reduceMotion, text, speed, delay]);

  const done = count >= text.length;

  return (
    // Plain wrapping, not the headings' `text-wrap: balance`: balancing would
    // re-flow the typed copy on every keystroke and nudge it sideways.
    <span ref={ref} className={cn("relative inline-block [text-wrap:wrap]", className)}>
      <span className="opacity-0">{text}</span>
      <span aria-hidden className="pointer-events-none absolute inset-0 select-none">
        {text.slice(0, count)}
        {/* Zero-width anchor: the caret never adds width, so it can't wrap
            onto a line of its own at the end of the text. */}
        <span className="relative inline-block h-[0.82em] w-0 align-baseline">
          <span
            className={cn(
              "typewriter-caret absolute left-[0.05em] top-[0.08em] h-full w-[0.06em] rounded-full bg-accent",
              done && "typewriter-caret-done"
            )}
          />
        </span>
      </span>
    </span>
  );
}
