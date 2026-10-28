"use client";

import type { PointerEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Copper glow that follows the pointer across a card (see `.spotlight` in
 * globals.css). It only writes two CSS custom properties — no React state, no
 * re-render — and ignores touch, where there is no hover to follow.
 */
export function Spotlight({ children, className }: { children: ReactNode; className?: string }) {
  function handleMove(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  return (
    <div onPointerMove={handleMove} className={cn("spotlight", className)}>
      {children}
    </div>
  );
}
