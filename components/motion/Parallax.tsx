"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { clamp01, onScrollFrame } from "@/lib/motion-hooks";
import { cn } from "@/lib/utils";

/**
 * Scroll-linked depth. The child drifts `speed` pixels against the scroll
 * while its box passes through the viewport (positive = moves up, slower than
 * the page; negative = moves down, faster). Optional `scale` adds a slow
 * zoom-out, used on photographs.
 *
 * Transform only — compositor work, no layout — and the layout box itself
 * never moves, so it cannot cause layout shift. The transform is written
 * straight to the element from a shared scroll frame (lib/motion-hooks), and
 * only while the box is near the viewport. The first position eases in, so
 * the photo never jumps when the script starts. Under reduced motion the
 * `[data-parallax]` rule in globals.css pins it in place.
 */
export function Parallax({
  children,
  speed = 60,
  scale,
  className,
  innerClassName,
}: {
  children: ReactNode;
  speed?: number;
  /** [from, to] scale over the pass, e.g. [1.15, 1]. */
  scale?: [number, number];
  className?: string;
  innerClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [s0, s1] = scale ?? [1, 1];

  useEffect(() => {
    const box = ref.current;
    const el = inner.current;
    if (!box || !el) return;

    let near = true;
    const io = new IntersectionObserver(([e]) => (near = e.isIntersecting), { rootMargin: "200px 0px" });
    io.observe(box);

    const update = () => {
      if (!near) return;
      const r = box.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 as the top edge enters at the bottom, 1 as the bottom edge leaves.
      const p = clamp01((vh - r.top) / (vh + r.height));
      el.style.transform = `translate3d(0, ${(speed - 2 * speed * p).toFixed(1)}px, 0) scale(${(s0 + (s1 - s0) * p).toFixed(4)})`;
    };

    el.style.transition = "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)";

    // Touch screens: no scroll-linked movement. On iOS a transform written
    // from a scroll handler trails the native scroll and judders; the photo
    // just eases once to its mid-pass framing and stays there.
    if (window.matchMedia("(pointer: coarse)").matches) {
      el.style.transform = `translate3d(0, 0, 0) scale(${((s0 + s1) / 2).toFixed(4)})`;
      io.disconnect();
      return;
    }

    const off = onScrollFrame(update);
    const settle = setTimeout(() => (el.style.transition = ""), 800);
    return () => {
      off();
      io.disconnect();
      clearTimeout(settle);
    };
  }, [speed, s0, s1]);

  return (
    <div ref={ref} className={className}>
      <div
        ref={inner}
        data-parallax=""
        style={{ transform: `translate3d(0, ${speed}px, 0) scale(${s0})` }}
        className={cn("relative h-full w-full will-change-transform", innerClassName)}
      >
        {children}
      </div>
    </div>
  );
}
