import clsx from "clsx";
import { LogoMark } from "@/components/Logo";

/**
 * Route-level loading state rendered by the loading.tsx files: the brand mark
 * with its four panes glazing in turn, clockwise, while the page streams in.
 *
 * Pure CSS (`.loading-screen` and `.loading-mark` in globals.css), so it comes
 * straight from the server with no JavaScript. It fades in after a short delay,
 * so a navigation that resolves within that window never flashes a loader.
 */
export function LoadingScreen({ className }: { className?: string }) {
  return (
    <div
      role="status"
      className={clsx("loading-screen flex flex-col items-center justify-center gap-4", className)}
    >
      <LogoMark className="loading-mark h-14 w-14 text-accent" />
      <span className="text-sm font-medium text-ink-muted">Loading…</span>
    </div>
  );
}
