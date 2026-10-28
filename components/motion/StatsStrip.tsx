import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/lib/motion";
import { content } from "@/data/content";
import { cn } from "@/lib/utils";

/**
 * Four figures set like a readout panel: hairline-divided cells, a mono index
 * and a copper tick that marks each reading.
 */
export function StatsStrip({ className }: { className?: string }) {
  return (
    <dl
      className={cn(
        "grid grid-cols-2 gap-4 lg:grid-cols-4",
        className
      )}
    >
      {content.stats.map((s, i) => (
        <Reveal
          key={s.label}
          index={i}
          variant="fade"
          className={cn(
            "relative overflow-hidden rounded-[1.75rem] px-6 py-8 sm:px-8 sm:py-10",
            i === 0 ? "theme-inverse" : "panel"
          )}
        >

          <dt className="sr-only">{s.label}</dt>
          <dd>
            <span aria-hidden className="mb-4 block font-mono text-[11px] text-ink-subtle">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="font-display text-5xl font-extrabold leading-none tracking-[-0.05em] text-ink sm:text-6xl">
              <Counter value={s.value} />
              <span className={s.accent === "gold" ? "text-accent" : "text-teal"}>{s.suffix}</span>
            </span>
            <p aria-hidden className="mt-3 max-w-[16ch] text-xs leading-snug text-ink-muted sm:text-sm">
              {s.label}
            </p>
          </dd>
        </Reveal>
      ))}
    </dl>
  );
}
