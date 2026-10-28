"use client";

import { createElement, type ReactNode, type PointerEvent } from "react";
import { prefersReducedMotion } from "@/lib/motion-hooks";

/**
 * Leans toward a mouse pointer and springs back when it leaves. The movement
 * is a CSS transition on transform; touch and reduced motion stay put.
 */
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
  function handleMove(e: PointerEvent<HTMLElement>) {
    if (e.pointerType !== "mouse" || prefersReducedMotion()) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
  }

  function handleLeave(e: PointerEvent<HTMLElement>) {
    e.currentTarget.style.transform = "";
  }

  return createElement(
    as,
    {
      onPointerMove: handleMove,
      onPointerLeave: handleLeave,
      className: `inline-block transition-transform duration-300 ease-[cubic-bezier(0.22,1.4,0.36,1)] ${className ?? ""}`,
    },
    children
  );
}
