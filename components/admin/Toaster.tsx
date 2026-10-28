"use client";

import clsx from "clsx";
import { useEffect, useRef, type CSSProperties } from "react";
import { Check, TriangleAlert, X } from "lucide-react";
import { Toaster as Sonner, toast as sonner } from "sonner";

type Tone = "success" | "error";
type Options = { description?: string };

const TONE = {
  success: {
    Icon: Check,
    badge: "bg-emerald-50 text-emerald-700 ring-emerald-700/15",
    timer: "bg-emerald-600/50",
    duration: 4000,
  },
  // Errors stay up longer: they usually say what to do next.
  error: {
    Icon: TriangleAlert,
    badge: "bg-red-50 text-red-700 ring-red-700/15",
    timer: "bg-red-600/50",
    duration: 6000,
  },
} satisfies Record<Tone, unknown>;

/**
 * Shrinks the countdown bar over the toast's lifetime, holding whenever Sonner
 * holds its own timer: while the stack is hovered (the toast's data-expanded)
 * or the page is in a background tab. A CSS animation would keep running in a
 * background tab and come back empty on a toast that is still up.
 */
function useCountdown(duration: number) {
  const bar = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = bar.current;
    const toast = el?.closest<HTMLElement>("[data-sonner-toast]");
    if (!el || !toast) return;
    const run = el.animate([{ transform: "scaleX(1)" }, { transform: "scaleX(0)" }], { duration, fill: "forwards" });
    const sync = () => {
      if (run.playState === "finished") return;
      if (document.hidden || toast.dataset.expanded === "true") run.pause();
      else run.play();
    };
    const watch = new MutationObserver(sync);
    watch.observe(toast, { attributes: true, attributeFilter: ["data-expanded"] });
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => {
      watch.disconnect();
      document.removeEventListener("visibilitychange", sync);
      run.cancel();
    };
  }, [duration]);
  return bar;
}

/* Sonner still stacks, animates and swipes these; the card is ours, so it can
 * carry the brand's surface, a tinted icon badge and a countdown bar. */
function ToastCard({ id, tone, title, description }: { id: string | number; tone: Tone; title: string } & Options) {
  const { Icon, badge, timer, duration } = TONE[tone];
  const bar = useCountdown(duration);
  return (
    <div className="toast-card relative flex h-full w-full items-center gap-3 overflow-hidden rounded-2xl border border-border bg-bg-elevated py-3 pl-3 pr-2 font-body shadow-lift">
      <span className={clsx("grid h-9 w-9 shrink-0 place-items-center rounded-full ring-1 ring-inset", badge)}>
        <Icon size={18} strokeWidth={2.5} aria-hidden />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold leading-5 text-ink">{title}</p>
        {description ? <p className="mt-0.5 text-[13px] leading-5 text-ink-muted">{description}</p> : null}
      </div>
      <button
        type="button"
        aria-label="Dismiss"
        onClick={() => sonner.dismiss(id)}
        className="focus-ring grid h-8 w-8 shrink-0 place-items-center rounded-full text-ink-subtle transition-colors hover:bg-surface hover:text-ink"
      >
        <X size={15} aria-hidden />
      </button>
      <span
        ref={bar}
        aria-hidden
        className={clsx("toast-timer absolute inset-x-0 bottom-0 h-[3px] origin-left", timer)}
      />
    </div>
  );
}

function show(tone: Tone, title: string, options: Options = {}) {
  sonner.custom((id) => <ToastCard id={id} tone={tone} title={title} {...options} />, {
    duration: TONE[tone].duration,
  });
}

/** Confirm an action once it has gone through; failures normally stay inline next to their control. */
export const toast = {
  success: (title: string, options?: Options) => show("success", title, options),
  error: (title: string, options?: Options) => show("error", title, options),
};

/** Top right, just under the sticky header so a toast never covers Sign out. */
export function Toaster() {
  return (
    <Sonner
      position="top-right"
      offset={{ top: 76, right: 16 }}
      mobileOffset={{ top: 72, right: 12, left: 12 }}
      gap={10}
      style={{ "--width": "372px" } as CSSProperties}
    />
  );
}
