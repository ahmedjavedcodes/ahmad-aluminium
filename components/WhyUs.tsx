"use client";

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
                  <span className="relative self-end text-xs font-semibold text-ink-subtle">{String(i + 1).padStart(2, "0")}</span>
                  <div className="relative">
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "flex h-[clamp(2.25rem,5svh,3rem)] w-[clamp(2.25rem,5svh,3rem)] shrink-0 items-center justify-center rounded-xl transition-transform duration-700 ease-out-expo group-hover:-translate-y-0.5 group-hover:rotate-[-6deg]",
                          dark ? "bg-accent text-on-accent" : "bg-accent-tint text-accent"
                        )}
                      >
                        <Icon size={20} aria-hidden />
                      </span>
                      <h3 className="font-display text-[length:clamp(1.05rem,2.5svh,1.35rem)] font-extrabold leading-tight tracking-[-0.03em] text-ink">
                        {v.title}
                      </h3>
                    </div>
                    <p className="mt-3 text-[length:clamp(0.8rem,1.75svh,0.9375rem)] leading-relaxed text-ink-muted">
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
