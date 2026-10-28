"use client";

import {
  motion,
  useReducedMotion,
  type Variants,
  type Transition,
} from "framer-motion";
import type { ReactNode } from "react";

const EASE: Transition["ease"] = [0.16, 1, 0.3, 1];

/**
 * Reveal variants.
 *
 * The previous variants animated `filter: blur(6px) → blur(0)` on every
 * revealed block, including body text. An animated filter forces the whole
 * subtree onto its own layer and re-rasterises text each frame, which is both
 * the most expensive thing on the page and the reason type shimmered as it
 * settled. Motion is now transform + opacity only — the two properties the
 * compositor can animate without repainting.
 */
const upVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: EASE },
  }),
};

const scaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.75, delay: i * 0.08, ease: EASE },
  }),
};

const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (i: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.6, delay: i * 0.08, ease: EASE },
  }),
};

const variantMap = {
  up: upVariants,
  scale: scaleVariants,
  fade: fadeVariants,
} as const;

export function Reveal({
  children,
  className,
  index = 0,
  as = "div",
  variant = "up",
  once = true,
  id,
}: {
  children: ReactNode;
  className?: string;
  index?: number;
  as?: "div" | "span" | "li" | "section";
  variant?: keyof typeof variantMap;
  once?: boolean;
  id?: string;
}) {
  const reduceMotion = useReducedMotion();
  const Comp = motion[as];
  const variants = variantMap[variant];

  return (
    <Comp
      id={id}
      className={className}
      custom={index}
      initial={reduceMotion ? undefined : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={{ once, margin: "-80px" }}
      variants={reduceMotion ? undefined : variants}
    >
      {children}
    </Comp>
  );
}

/** Parent that staggers its `Reveal`-style children. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

export const staggerItem: Variants = upVariants;

export const EASE_OUT = EASE;
