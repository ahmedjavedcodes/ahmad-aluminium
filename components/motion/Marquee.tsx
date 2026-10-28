"use client";

import type { ReactNode } from "react";

/**
 * Infinite horizontal rail. Two identical copies slide by exactly one copy's
 * width (-50%), so each copy carries its trailing gap as padding — a gap
 * *between* the copies would make the loop jump by half a gap.
 *
 * One tree for everyone: under reduced motion the CSS in globals.css stops
 * the animation, which avoids a server/client markup mismatch.
 */
export function Marquee({
  children,
  duration = 28,
  className,
  reverse = false,
  gap = 40,
}: {
  children: ReactNode;
  duration?: number;
  className?: string;
  reverse?: boolean;
  /** Space between items, in px. */
  gap?: number;
}) {
  const copy = { gap, paddingRight: gap };
  return (
    <div className={`group overflow-hidden ${className ?? ""}`}>
      <div
        className={`flex w-max ${reverse ? "animate-marquee-reverse" : "animate-marquee"} group-hover:[animation-play-state:paused]`}
        style={{ animationDuration: `${duration}s` }}
      >
        <div className="flex shrink-0" style={copy}>
          {children}
        </div>
        <div className="flex shrink-0" style={copy} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
