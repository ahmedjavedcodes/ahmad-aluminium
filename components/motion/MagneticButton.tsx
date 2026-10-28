"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import type { ReactNode, MouseEvent } from "react";

// Created once at module scope. Calling `motion(As)` inside render produces a
// brand-new component type on every render, which unmounts and remounts the
// entire subtree — losing focus and restarting any child animation.
const MotionDiv = motion.div;
const MotionSpan = motion.span;

export function MagneticButton({
  children,
  className,
  strength = 0.35,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: "div" | "span";
}) {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 15, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 180, damping: 15, mass: 0.4 });

  function handleMove(e: MouseEvent<HTMLElement>) {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  const Comp = as === "span" ? MotionSpan : MotionDiv;

  return (
    <Comp
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={reduceMotion ? undefined : { x: springX, y: springY }}
      className={`inline-block will-change-transform ${className ?? ""}`}
    >
      {children}
    </Comp>
  );
}
