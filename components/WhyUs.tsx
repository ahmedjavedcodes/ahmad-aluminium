import {
  Layers,
  Ruler,
  Receipt,
  HardHat,
  ThermometerSun,
  LifeBuoy,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/lib/motion";
import { Spotlight } from "@/components/motion/Spotlight";
import { SectionHeading } from "@/components/SectionHeading";
import { Screen, SwipeGrid } from "@/components/Screen";
import { content } from "@/data/content";
import { cn } from "@/lib/utils";

const icons: LucideIcon[] = [Layers, Ruler, Receipt, HardHat, ThermometerSun, LifeBuoy];

/**
 * Six values on a 3 × 2 grid that shares the screen's height (lg), the first
 * set dark as the lead point. A swipe rail below lg.
 */
export default function WhyUs({ index }: { index?: number }) {
  return (
    <Screen id="why-us" labelledBy="why-heading">
      <SectionHeading
        id="why-heading"
        index={index}
        eyebrow={content.whyUs.eyebrow}
        heading={content.whyUs.heading}
        className="max-w-3xl"
      />

      <SwipeGrid
        label="Why choose us. Swipe for more."
        className="mt-[clamp(1.25rem,4svh,2.5rem)] min-h-[15rem] flex-1 lg:grid-cols-3 lg:grid-rows-2 lg:gap-4"
      >
        {content.whyUs.values.map((v, i) => {
          const Icon = icons[i];
          const dark = i === 0;
          return (
            <Reveal
              key={v.title}
              index={i}
              variant="rise"
              className="w-[80%] shrink-0 snap-start sm:w-[44%] lg:w-auto"
            >
              <Spotlight className="h-full rounded-[clamp(1.25rem,3svh,2rem)]">
                <div
                  className={cn(
                    "hover-rim group relative flex h-full flex-col justify-between overflow-hidden rounded-[clamp(1.25rem,3svh,2rem)] p-[clamp(1rem,2.6svh,1.75rem)] transition-[transform,box-shadow] duration-700 ease-out-expo hover:-translate-y-1",
                    dark ? "theme-inverse hover:shadow-copper-rim" : "panel hover:shadow-deep"
                  )}
                >
                  {dark && (
                    <div aria-hidden className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-accent/25 blur-[90px]" />
                  )}
                  {/* Outlined numeral: fills the tall phone card on purpose
                      and stays a quiet corner mark on the desktop grid. */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-2 top-[18%] select-none font-display text-[length:clamp(7rem,24svh,11rem)] font-extrabold leading-none tracking-[-0.06em] text-transparent transition-[transform,-webkit-text-stroke-color] duration-700 ease-out-expo [-webkit-text-stroke:1.5px_rgb(var(--color-ink)/0.09)] group-hover:-translate-y-1 group-hover:[-webkit-text-stroke:1.5px_rgb(var(--color-accent)/0.45)] lg:-top-4 lg:text-[length:clamp(4rem,12svh,7rem)]"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="relative flex items-start justify-between">
                    <span
                      className={cn(
                        "flex h-[clamp(2.5rem,5.5svh,3rem)] w-[clamp(2.5rem,5.5svh,3rem)] shrink-0 items-center justify-center rounded-xl transition-transform duration-700 ease-out-expo group-hover:-translate-y-0.5 group-hover:rotate-[-6deg]",
                        dark ? "bg-accent text-on-accent" : "bg-accent-tint text-accent"
                      )}
                    >
                      <Icon size={20} aria-hidden />
                    </span>
                    <span className="font-mono text-[11px] font-medium tracking-[0.14em] text-ink-subtle lg:hidden">
                      {String(i + 1).padStart(2, "0")} / {String(content.whyUs.values.length).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="relative mt-6 lg:mt-3">
                    <h3 className="font-display text-[length:clamp(1.3rem,3.2svh,1.6rem)] font-extrabold leading-tight tracking-[-0.03em] text-ink lg:text-[length:clamp(1.05rem,2.5svh,1.35rem)]">
                      {v.title}
                    </h3>
                    <p className="mt-2.5 text-[length:clamp(0.875rem,2svh,1rem)] leading-relaxed text-ink-muted lg:text-[length:clamp(0.8rem,1.75svh,0.9375rem)]">
                      {v.description}
                    </p>
                  </div>
                </div>
              </Spotlight>
            </Reveal>
          );
        })}
      </SwipeGrid>
    </Screen>
  );
}
