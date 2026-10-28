"use client";

import { useEffect, useState, useSyncExternalStore, type RefObject } from "react";

/**
 * The few motion primitives the site needs, written against the platform
 * (IntersectionObserver, matchMedia, requestAnimationFrame). They replace
 * framer-motion, which was the largest library on the page after React
 * itself (~64 KB gzipped) and the bulk of the phone's start-up script work.
 */

/** True while (or, with `once`, after) the element is within the viewport. */
export function useInView(
  ref: RefObject<Element | null>,
  { once = false, margin = "0px" }: { once?: boolean; margin?: string } = {}
) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin: margin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, once, margin]);
  return inView;
}

const REDUCE = "(prefers-reduced-motion: reduce)";

function subscribeReduced(onChange: () => void) {
  const mq = window.matchMedia(REDUCE);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/** The visitor's reduced-motion preference (false on the server). */
export function useReducedMotion() {
  return useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(REDUCE).matches,
    () => false
  );
}

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia(REDUCE).matches;
}

/** Ease-out-expo: fast start, long soft landing (the site's reveal curve). */
const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

/** Tweens a number with requestAnimationFrame. Returns a stop function. */
export function animateValue(
  from: number,
  to: number,
  {
    duration,
    onUpdate,
    onComplete,
  }: { duration: number; onUpdate: (v: number) => void; onComplete?: () => void }
) {
  let raf = 0;
  const start = performance.now();
  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / (duration * 1000));
    onUpdate(from + (to - from) * easeOutExpo(t));
    if (t < 1) raf = requestAnimationFrame(tick);
    else onComplete?.();
  };
  raf = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(raf);
}

/*
 * Scroll-linked effects share one passive scroll/resize listener and one
 * animation frame per scroll step. Each subscriber reads its own geometry and
 * writes a style directly, so scrolling never re-renders React.
 */
const frameSubscribers = new Set<() => void>();
let frameQueued = false;

function runFrame() {
  frameQueued = false;
  frameSubscribers.forEach((fn) => fn());
}

function queueFrame() {
  if (frameQueued) return;
  frameQueued = true;
  requestAnimationFrame(runFrame);
}

export function onScrollFrame(fn: () => void) {
  if (frameSubscribers.size === 0) {
    window.addEventListener("scroll", queueFrame, { passive: true });
    window.addEventListener("resize", queueFrame, { passive: true });
  }
  frameSubscribers.add(fn);
  fn();
  return () => {
    frameSubscribers.delete(fn);
    if (frameSubscribers.size === 0) {
      window.removeEventListener("scroll", queueFrame);
      window.removeEventListener("resize", queueFrame);
    }
  };
}

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
