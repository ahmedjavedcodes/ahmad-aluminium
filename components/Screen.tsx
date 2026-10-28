"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useReveal } from "@/lib/reveal";

/**
 * One-screen section shell.
 *
 * Fills exactly the visible viewport (`100svh`, the small viewport height, so
 * mobile browser chrome never pushes content below the fold) and lays its
 * content out as a flex column: headings take their natural height and the
 * section's main block (a bento, rail or form) takes `flex-1`, absorbing
 * whatever space is left. Combined with type sized against viewport height
 * (see SectionHeading), each core section fits one screen on phones, tablets
 * and desktops.
 *
 * It is a *minimum* height: on an unusually short window (or with large text
 * zoom) the section grows instead of clipping, which WCAG 1.4.10 (reflow)
 * requires.
 */
export function Screen({
  id,
  className,
  containerClassName,
  background,
  children,
  labelledBy,
  reserveActionBar = true,
}: {
  id?: string;
  className?: string;
  containerClassName?: string;
  /** Absolutely positioned decoration rendered behind the content. */
  background?: ReactNode;
  children: ReactNode;
  labelledBy?: string;
  /** Keep the bottom clear for the phone action bar (false where it hides). */
  reserveActionBar?: boolean;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        // Below md the fixed Call/WhatsApp bar (MobileActionBar) covers the
        // bottom ~4.5rem of the screen, so that space is kept clear.
        "cv-screen relative isolate flex min-h-[100svh] scroll-mt-0 flex-col overflow-hidden pb-[clamp(1.25rem,5svh,4rem)] pt-[clamp(5rem,12svh,8rem)]",
        reserveActionBar && "max-md:pb-[calc(clamp(1.25rem,5svh,4rem)+4.25rem)]",
        className
      )}
    >
      {background}
      <div className={cn("mx-auto flex w-full max-w-7xl flex-1 flex-col px-5 sm:px-8", containerClassName)}>
        {children}
      </div>
    </section>
  );
}

/**
 * Horizontal swipe rail below `lg`, a CSS grid from `lg` up. Each child
 * should carry its own rail width (`w-[82%] sm:w-[46%] lg:w-auto`) and grid
 * placement, but no height: rail items and grid items both stretch to the
 * track, and a percentage height would collapse to zero inside the rail. Scroll-snap keeps cards aligned; the region is keyboard
 * scrollable and labelled for assistive tech.
 *
 * On the rail the cards reveal together when the rail scrolls into view
 * (`.swipe-rail` in globals.css). Watched one by one, the cards still off to
 * the right would only start fading in as they were swiped onto screen.
 */
export function SwipeGrid({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: ReactNode;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      role="region"
      aria-label={label}
      tabIndex={0}
      className={cn(
        "swipe-rail focus-ring no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:snap-none lg:overflow-visible lg:px-0",
        className
      )}
    >
      {children}
    </div>
  );
}
