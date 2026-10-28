"use client";

import { createElement, type CSSProperties, type ReactNode } from "react";
import { useReveal } from "@/lib/reveal";
import { cn } from "@/lib/utils";

/**
 * Scroll reveal for blocks: cards, paragraphs, photographs.
 *
 * Purely CSS transitions on opacity and transform (the two properties the
 * compositor animates without repainting), toggled by one shared observer —
 * see lib/reveal.ts. The motion itself lives in app/globals.css ("Reveals"):
 *
 *   up    — short rise (paragraphs, buttons)
 *   rise  — rise with a hint of scale (cards in a grid)
 *   scale — gentle scale-in (panels)
 *   fade  — opacity only
 *   clip  — photographs: rise and settle from a slight zoom
 *
 * `index` staggers siblings by 70ms each. Markup is identical on server and
 * client; reduced motion and no-JS are handled in CSS.
 */
export function Reveal({
  children,
  className,
  index = 0,
  as = "div",
  variant = "up",
  id,
}: {
  children: ReactNode;
  className?: string;
  index?: number;
  as?: "div" | "span" | "li" | "section";
  variant?: "up" | "rise" | "scale" | "fade" | "clip";
  id?: string;
}) {
  const ref = useReveal<HTMLElement>();
  return createElement(
    as,
    {
      ref,
      id,
      "data-reveal": "",
      className: cn("reveal", `reveal--${variant}`, className),
      style: { "--reveal-delay": `${index * 70}ms` } as CSSProperties,
    },
    children
  );
}
