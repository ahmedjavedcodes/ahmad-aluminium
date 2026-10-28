"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { Reveal } from "@/lib/motion";
import { content } from "@/data/content";
import { cn } from "@/lib/utils";

function Counter({
  value,
  suffix,
  accent,
}: {
  value: number;
  suffix?: string;
  accent: "gold" | "teal";
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();
  // Starts at 0 on server and client alike (the preference is only known in
  // the browser); the effect below jumps straight to the value when motion
  // is reduced.
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (reduceMotion) {
      setDisplay(value);
      return;
    }
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, reduceMotion]);

  return (
    <span
      ref={ref}
      className="font-display text-5xl font-bold leading-none tracking-[-0.03em] text-ink tabular-nums sm:text-6xl"
    >
      {display}
      <span className={accent === "gold" ? "text-accent" : "text-teal"}>{suffix}</span>
    </span>
  );
}

/**
 * Four figures set like a readout panel: hairline-divided cells, a mono index
 * and a copper tick that marks each reading.
 */
export function StatsStrip({ className }: { className?: string }) {
  return (
    <dl
      className={cn(
        "panel grid grid-cols-2 overflow-hidden rounded-xl lg:grid-cols-4",
        className
      )}
    >
      {content.stats.map((s, i) => (
        <Reveal
          key={s.label}
          index={i}
          variant="fade"
          className={cn(
            "relative px-5 py-7 sm:px-7 sm:py-9",
            i % 2 === 1 && "border-l border-border",
            i >= 2 && "border-t border-border lg:border-t-0",
            i === 2 && "lg:border-l"
          )}
        >
          <span aria-hidden className="absolute left-0 top-7 h-6 w-[2px] bg-accent sm:top-9" />
          <dt className="sr-only">{s.label}</dt>
          <dd>
            <span aria-hidden className="mb-4 block font-mono text-[11px] text-ink-subtle">
              {String(i + 1).padStart(2, "0")}
            </span>
            <Counter value={s.value} suffix={s.suffix} accent={s.accent} />
            <p aria-hidden className="mt-3 max-w-[16ch] text-xs leading-snug text-ink-muted sm:text-sm">
              {s.label}
            </p>
          </dd>
        </Reveal>
      ))}
    </dl>
  );
}
