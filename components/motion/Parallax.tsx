"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Scroll-linked depth. The child drifts `speed` pixels against the scroll
 * while its box passes through the viewport (positive = moves up, slower than
 * the page; negative = moves down, faster). Optional `scale` adds a slow
 * zoom-out, used on photographs.
 *
 * Transform only — compositor work, no layout — and the layout box itself
 * never moves, so it cannot cause layout shift. The markup is identical for
 * every visitor; under reduced motion the `[data-parallax]` rule in
 * globals.css pins it in place.
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
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  const s = useTransform(scrollYProgress, [0, 1], scale ?? [1, 1]);

  return (
    <div ref={ref} className={className}>
      <motion.div data-parallax="" style={{ y, scale: s }} className={cn("relative h-full w-full will-change-transform", innerClassName)}>
        {children}
      </motion.div>
    </div>
  );
}
