"use client";

import { useEffect, useRef } from "react";
import { onScrollFrame } from "@/lib/motion-hooks";

/** Thin copper reading-progress bar along the top edge. */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return onScrollFrame(() => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      el.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
    });
  }, []);

  // Always rendered so server and client markup match; hidden by CSS when the
  // visitor prefers reduced motion.
  return (
    <div
      ref={ref}
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-accent transition-transform duration-150 ease-out motion-reduce:hidden"
      style={{ transform: "scaleX(0)" }}
    />
  );
}
