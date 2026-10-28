import type { CSSProperties } from "react";

/**
 * A whole number that counts up on load, for figures on the first screen.
 *
 * Each digit is a 0–9 column rolling up to its value inside a one-digit
 * window (".odo" in globals.css). It is a transform animation, so the
 * compositor runs it from the first paint, with no JavaScript, and it keeps
 * moving even while a phone's main thread is busy. The resting position is the
 * final value, so the server HTML never shows a placeholder "0". Screen
 * readers and crawlers get the plain number.
 */
export function CssCount({
  value,
  delay = 0,
  duration = 1.4,
  className,
}: {
  value: number;
  /** Seconds. */
  delay?: number;
  /** Seconds. */
  duration?: number;
  className?: string;
}) {
  const digits = String(Math.round(value)).split("");
  return (
    <span
      className={className}
      style={
        {
          "--count-delay": `${Math.round(delay * 1000)}ms`,
          "--count-duration": `${duration}s`,
          fontVariantNumeric: "tabular-nums",
        } as CSSProperties
      }
    >
      <span className="sr-only">{value}</span>
      <span aria-hidden className="inline-flex">
        {digits.map((d, i) => (
          <span key={i} className="odo">
            <span className="odo-col" style={{ "--d": Number(d) } as CSSProperties}>
              {Array.from({ length: 10 }, (_, n) => (
                <span key={n} className="block h-[1em]">
                  {n}
                </span>
              ))}
            </span>
          </span>
        ))}
      </span>
    </span>
  );
}
