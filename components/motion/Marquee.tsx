"use client";

import type { ReactNode } from "react";

export function Marquee({
  children,
  duration = 28,
  className,
  reverse = false,
}: {
  children: ReactNode;
  duration?: number;
  className?: string;
  reverse?: boolean;
}) {
  // One tree for everyone: under reduced motion the CSS in globals.css stops
  // the animation, which avoids a server/client markup mismatch.
  return (
    <div className={`group overflow-hidden ${className ?? ""}`}>
      <div
        className={`flex w-max gap-10 ${reverse ? "animate-marquee-reverse" : "animate-marquee"} group-hover:[animation-play-state:paused]`}
        style={{ animationDuration: `${duration}s` }}
      >
        <div className="flex shrink-0 gap-10">{children}</div>
        <div className="flex shrink-0 gap-10" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
