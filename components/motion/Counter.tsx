"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { animateValue, prefersReducedMotion, useInView } from "@/lib/motion-hooks";

/**
 * Counts up from zero when scrolled into view. `decimals` keeps values like
 * 5.0 formatted throughout.
 *
 * The server HTML carries the final value, so the number is right before any
 * JavaScript runs and a slow phone never shows a placeholder "0". After
 * hydration, a counter that is still below the fold drops to 0 (unseen) and
 * counts up when it scrolls in; one already on screen stays put. (First-screen
 * figures that should count on load use CssCount, which needs no JavaScript.)
 * The final width is reserved up front, so nothing around the number moves
 * while it counts.
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
  const [display, setDisplay] = useState(value);
  const armed = useRef(false);

  // Before the first paint after hydration: arm only counters the visitor
  // has not seen yet.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    if (el.getBoundingClientRect().top > window.innerHeight) {
      armed.current = true;
      setDisplay(0);
    }
    // Mount only: whether the number has been seen is decided once.
  }, []);

  useEffect(() => {
    if (!inView || !armed.current) return;
    return animateValue(0, value, {
      duration,
      onUpdate: setDisplay,
      onComplete: () => {
        armed.current = false;
      },
    });
  }, [inView, value, duration]);

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
