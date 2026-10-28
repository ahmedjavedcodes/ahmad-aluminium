"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";

/**
 * Route transition: the incoming page settles in and a copper bar sweeps
 * across the top edge to mark the change.
 *
 * Both are CSS keyframe animations (".page-enter" / ".route-bar" in
 * globals.css) on elements keyed by the path, so each navigation restarts
 * them. Opacity and transform only, so they run on the compositor.
 *
 * The first page skips both: its server HTML must be visible the moment it
 * arrives, never held back until the script has loaded.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const firstPage = useRef(true);
  useEffect(() => {
    firstPage.current = false;
  }, []);
  const navigated = !firstPage.current;

  return (
    <>
      {navigated && (
        <div
          key={`bar-${pathname}`}
          aria-hidden
          className="route-bar pointer-events-none fixed inset-x-0 top-0 z-[61] h-[3px] origin-left bg-gradient-to-r from-accent via-accent to-teal motion-reduce:hidden"
        />
      )}
      <main id="main" key={pathname} className={navigated ? "page-enter" : undefined}>
        {children}
      </main>
    </>
  );
}
