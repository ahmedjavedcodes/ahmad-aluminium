"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Route transition: the outgoing page lifts away, the incoming one settles
 * in, and a copper bar sweeps across the top edge to mark the change.
 *
 * Opacity and transform only, so it runs on the compositor at 60fps. The
 * markup is the same for every visitor; under reduced motion the CSS in
 * globals.css (`[data-reveal]`, `[data-parallax]`) pins everything in place.
 *
 * First load: only the page wrapper skips its entrance (so the server HTML is
 * visible immediately). It must NOT be done with `<AnimatePresence
 * initial={false}>` — that flag is inherited by every motion element inside,
 * which silently disabled all text and section reveals on load and reload.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const firstPage = useRef(true);
  useEffect(() => {
    firstPage.current = false;
  }, []);

  return (
    <>
      <AnimatePresence initial={false}>
        <motion.div
          key={`bar-${pathname}`}
          aria-hidden
          data-parallax=""
          className="pointer-events-none fixed inset-x-0 top-0 z-[61] h-[3px] origin-left bg-gradient-to-r from-accent via-accent to-teal motion-reduce:hidden"
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: [0, 1, 1], opacity: [1, 1, 0] }}
          transition={{ duration: 0.9, times: [0, 0.6, 1], ease: EASE }}
        />
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.main
          id="main"
          key={pathname}
          data-reveal=""
          initial={firstPage.current ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } }}
          exit={{ opacity: 0, y: -10, transition: { duration: 0.22, ease: [0.7, 0, 0.84, 0] } }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
    </>
  );
}
