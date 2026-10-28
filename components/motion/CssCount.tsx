import type { CSSProperties } from "react";

/**
 * An integer that counts up from zero, entirely in CSS (".css-count" in
 * globals.css), for figures on the first screen: it starts with the first
 * paint instead of after hydration, and the server HTML never shows a
 * placeholder "0". The real number is kept for screen readers and crawlers;
 * the hidden copy reserves the final width so nothing beside it moves.
 */
export function CssCount({
  value,
  delay = 0,
  duration = 1.6,
  className,
}: {
  value: number;
  /** Seconds. */
  delay?: number;
  /** Seconds. */
  duration?: number;
  className?: string;
}) {
  return (
    <span className={className} style={{ display: "inline-grid", justifyItems: "end", fontVariantNumeric: "tabular-nums" }}>
      <span className="sr-only">{value}</span>
      <span aria-hidden style={{ gridArea: "1 / 1", visibility: "hidden" }}>
        {value}
      </span>
      <span
        aria-hidden
        className="css-count"
        style={
          {
            gridArea: "1 / 1",
            "--to": value,
            "--count-delay": `${Math.round(delay * 1000)}ms`,
            "--count-duration": `${duration}s`,
          } as CSSProperties
        }
      />
    </span>
  );
}
