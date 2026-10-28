"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

/**
 * Counts up from zero when scrolled into view (or straight away if already
 * visible on load). `decimals` keeps values like 5.0 formatted throughout.
 *
 * Starts at 0 on server and client alike — the reduced-motion preference is
 * only known in the browser — and jumps straight to the value when motion is
 * reduced. Digits are tabular and the final width is reserved up front, so
 * nothing around the number moves while it counts.
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
    // Reserve the final value's width from the first frame (tabular digits
    // are 1ch each), so "0" → "20" never pushes a following "+" sideways.
    <span
      ref={ref}
      className={className}
      style={{
        fontVariantNumeric: "tabular-nums",
        display: "inline-block",
        minWidth: `${value.toFixed(decimals).length}ch`,
      }}
    >
      {display.toFixed(decimals)}
    </span>
  );
}
