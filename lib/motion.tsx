"use client";

import {
  motion,
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

/** Rises with a slight scale — for cards entering a grid. */
const riseVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.85, delay: i * 0.09, ease: EASE },
  }),
};

/** Wipes in from the bottom edge — for photographs. */
const clipVariants: Variants = {
  hidden: { opacity: 0, clipPath: "inset(18% 0% 0% 0% round 1rem)", scale: 1.04 },
  visible: (i: number = 0) => ({
    opacity: 1,
    clipPath: "inset(0% 0% 0% 0% round 1rem)",
    scale: 1,
    transition: { duration: 1.05, delay: i * 0.08, ease: EASE },
  }),
};

const variantMap = {
  up: upVariants,
  scale: scaleVariants,
  fade: fadeVariants,
  rise: riseVariants,
  clip: clipVariants,
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
  const Comp = motion[as];

  // Same markup for every visitor: the reduced-motion preference is only
  // known in the browser, so a branch here would fail hydration. The
  // `data-reveal` hook lets the reduced-motion CSS in globals.css force the
  // element straight to its visible state instead.
  return (
    <Comp
      id={id}
      data-reveal=""
      className={className}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px" }}
      variants={variantMap[variant]}
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
