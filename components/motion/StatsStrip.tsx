"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { Reveal } from "@/lib/motion";
import { content } from "@/data/content";

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
  const [display, setDisplay] = useState(reduceMotion ? value : 0);

  useEffect(() => {
    if (reduceMotion) {
      setDisplay(value);
      return;
    }
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, reduceMotion]);

  return (
    <span
      ref={ref}
      className={`font-display text-4xl font-semibold tabular-nums sm:text-5xl ${
        accent === "gold" ? "text-accent" : "text-teal"
      }`}
    >
      {display}
      {suffix}
    </span>
  );
}

export function StatsStrip() {
  return (
    <dl className="grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-6">
      {content.stats.map((s, i) => (
        <Reveal key={s.label} index={i} variant="scale">
          <div className="text-center sm:text-left">
            <dt className="sr-only">{s.label}</dt>
            <dd>
              <Counter value={s.value} suffix={s.suffix} accent={s.accent} />
              <p aria-hidden className="mt-1.5 text-xs text-ink-muted sm:text-sm">
                {s.label}
              </p>
            </dd>
          </div>
        </Reveal>
      ))}
    </dl>
  );
}
