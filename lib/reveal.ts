"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll reveals driven by CSS, not by per-frame JavaScript.
 *
 * One IntersectionObserver is shared by every revealing element on the page.
 * When an element crosses the bottom tenth of the viewport it gets a
 * `data-shown` attribute — no React state, no re-render — and a CSS
 * transition on opacity/transform (see "Reveals" in app/globals.css) does the
 * rest on the compositor thread, so reveals stay smooth while the page is
 * scrolling. Elements already on screen at load reveal straight after
 * hydration, which also covers a reload part-way down the page.
 */
let observer: IntersectionObserver | null = null;

function shared(): IntersectionObserver {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.shown = "";
          observer!.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
  }
  return observer;
}

/**
 * Attach to an element to reveal it. `mode="mount"` reveals on load
 * regardless of position (above-the-fold content); `"inView"` waits for the
 * viewport. Returns the ref to put on the element.
 */
export function useReveal<T extends HTMLElement>(mode: "inView" | "mount" = "inView") {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (mode === "mount") {
      // Two frames: let the browser paint the hidden state first, so the
      // transition has a start point to animate from.
      let raf2 = 0;
      const raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => {
          el.dataset.shown = "";
        });
      });
      return () => {
        cancelAnimationFrame(raf1);
        cancelAnimationFrame(raf2);
      };
    }
    const io = shared();
    io.observe(el);
    return () => io.unobserve(el);
  }, [mode]);
  return ref;
}
