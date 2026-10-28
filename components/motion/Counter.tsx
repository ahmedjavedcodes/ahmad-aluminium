"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

/**
 * Counts up from zero when scrolled into view (or straight away if already
 * visible on load). `decimals` keeps values like 5.0 formatted throughout.
 *
 * Starts at 0 on server and client alike — the reduced-motion preference is
 * only known in the browser — and jumps straight to the value when motion is
 * reduced. The final width is reserved up front, so nothing around the
 * number moves while it counts.
 */
export function Counter({
  value,
  decimals = 0,
  duration = 1.6,
  className,
}: {
  value: number;
  decimals?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (reduceMotion) {
      setDisplay(value);
      return;
    }
    if (!inView) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: setDisplay,
    });
    return () => controls.stop();
  }, [inView, value, duration, reduceMotion]);

  return (
    // The final value sits invisibly in the same grid cell, reserving its
    // exact width from the first frame, so "0" → "20" never pushes a
    // following "+" sideways (and leaves no gap once it lands).
    <span
      ref={ref}
      className={className}
      style={{ fontVariantNumeric: "tabular-nums", display: "inline-grid", justifyItems: "end" }}
    >
      <span aria-hidden style={{ gridArea: "1 / 1", visibility: "hidden" }}>
        {value.toFixed(decimals)}
      </span>
      <span style={{ gridArea: "1 / 1" }}>{display.toFixed(decimals)}</span>
    </span>
  );
}
