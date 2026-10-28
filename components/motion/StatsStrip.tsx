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
      className="font-display text-5xl font-extrabold leading-none tracking-[-0.05em] text-ink tabular-nums sm:text-6xl"
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
        "grid grid-cols-2 gap-4 lg:grid-cols-4",
        className
      )}
    >
      {content.stats.map((s, i) => (
        <Reveal
          key={s.label}
          index={i}
          variant="fade"
          className={cn(
            "relative overflow-hidden rounded-[1.75rem] px-6 py-8 sm:px-8 sm:py-10",
            i === 0 ? "theme-inverse" : "panel"
          )}
        >

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
