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
import { content } from "@/data/content";
import { cn } from "@/lib/utils";

const icons: LucideIcon[] = [Layers, Ruler, Receipt, HardHat, ThermometerSun, LifeBuoy];

/**
 * Bento of the six values (lg, 4 columns):
 *
 *   ┌───────────┬─────┬─────┐
 *   │     0     │  1  │  2  │
 *   │  (dark)   ├─────┼─────┤
 *   │           │  3  │  4  │
 *   ├───────────┴─────┴─────┤
 *   │           5           │
 *   └───────────────────────┘
 */
const BENTO = [
  "sm:col-span-2 lg:col-span-2 lg:row-span-2",
  "",
  "",
  "",
  "",
  "sm:col-span-2 lg:col-span-4",
];

export default function WhyUs({ index }: { index?: number }) {
  return (
    <section id="why-us" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading index={index} eyebrow={content.whyUs.eyebrow} heading={content.whyUs.heading} className="max-w-3xl" />

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {content.whyUs.values.map((v, i) => {
            const Icon = icons[i];
            const feature = i === 0;
            const wide = i === 5;
            return (
              <Reveal key={v.title} index={i} variant="rise" className={cn("h-full", BENTO[i])}>
                <Spotlight className="h-full rounded-[2rem]">
                  <div
                    className={cn(
                      "hover-rim group relative flex h-full flex-col overflow-hidden rounded-[2rem] p-7 transition-[transform,box-shadow] duration-700 ease-out-expo hover:-translate-y-1 sm:p-8",
                      feature ? "theme-inverse justify-between hover:shadow-copper-rim lg:p-10" : "panel hover:shadow-deep",
                      wide && "sm:flex-row sm:items-center sm:gap-8"
                    )}
                  >
                    {feature && (
                      <div aria-hidden className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-accent/25 blur-[90px]" />
                    )}
                    <span
                      className={cn(
                        "relative flex shrink-0 items-center justify-center rounded-2xl transition-transform duration-700 ease-out-expo group-hover:-translate-y-1 group-hover:rotate-[-6deg]",
                        feature ? "h-16 w-16 bg-accent text-on-accent" : "h-12 w-12 bg-accent-tint text-accent"
                      )}
                    >
                      <Icon size={feature ? 28 : 21} aria-hidden />
                    </span>
                    <div className={cn("relative", feature ? "mt-16" : wide ? "mt-6 sm:mt-0" : "mt-8")}>
                      <h3
                        className={cn(
                          "font-display font-extrabold tracking-[-0.03em] text-ink",
                          feature ? "text-3xl leading-tight sm:text-4xl" : "text-xl"
                        )}
                      >
                        {v.title}
                      </h3>
                      <p className={cn("mt-3 leading-relaxed text-ink-muted", feature ? "max-w-md text-base" : "text-sm")}>
                        {v.description}
                      </p>
                    </div>
                  </div>
                </Spotlight>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
