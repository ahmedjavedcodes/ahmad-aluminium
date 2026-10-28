import { Fragment, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * Types its text out letter by letter, the copper caret riding on the newest
 * letter, then blinking a few times at the end and fading.
 *
 * Pure CSS (".type-char" / ".type-caret" in globals.css). The letters are in
 * the server HTML from the start and the animation starts with the first
 * paint, so a headline never waits for JavaScript to show up. Each word's
 * letters sit together with no break points between them, so the text wraps
 * like ordinary text. Reduced motion shows the whole text at once.
 */
export function Typewriter({
  text,
  className,
  delay = 0.5,
  speed = 55,
  suffix,
}: {
  text: string;
  className?: string;
  /** Seconds before typing starts. */
  delay?: number;
  /** Milliseconds per character. */
  speed?: number;
  /** Punctuation typed last, in the parent's colour, glued to the last word. */
  suffix?: string;
}) {
  const start = Math.round(delay * 1000);
  const words = text.split(" ");
  // Index of each word's first letter in the whole text (spaces count too,
  // so the gap between words takes one beat, as typing would).
  const starts = words.map((_, w) => words.slice(0, w).join(" ").length + (w > 0 ? 1 : 0));

  return (
    <span
      className={cn("[text-wrap:wrap]", className)}
      style={
        {
          "--type-delay": `${start}ms`,
          "--type-speed": `${speed}ms`,
          "--type-end": `${start + (text.length + (suffix?.length ?? 0)) * speed}ms`,
        } as CSSProperties
      }
    >
      {words.map((word, w) => (
        <Fragment key={w}>
          <span className="whitespace-nowrap">
            {Array.from(word).map((ch, c) => (
              <span key={c} className="type-char" style={{ "--i": starts[w] + c } as CSSProperties}>
                {ch}
              </span>
            ))}
            {w === words.length - 1 && suffix && (
              <span className="type-char text-ink" style={{ "--i": text.length } as CSSProperties}>
                {suffix}
              </span>
            )}
            {w === words.length - 1 && (
              // Zero-width anchor, so the end caret can never wrap onto a
              // line of its own.
              <span aria-hidden className="relative inline-block h-[0.82em] w-0 align-baseline">
                <span className="type-caret absolute left-[0.05em] top-[0.08em] h-full w-[0.06em] rounded-full bg-accent" />
              </span>
            )}
          </span>
          {w < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}
