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

const icons: LucideIcon[] = [Layers, Ruler, Receipt, HardHat, ThermometerSun, LifeBuoy];

/**
 * Values laid out as a spec sheet: one hairline grid (the 1px gaps show the
 * border colour behind the cells) rather than six floating cards.
 */
export default function WhyUs({ index }: { index?: number }) {
  return (
    <section id="why-us" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index={index}
          eyebrow={content.whyUs.eyebrow}
          heading={content.whyUs.heading}
          className="max-w-2xl"
        />

        <Reveal index={1} className="mt-14">
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {content.whyUs.values.map((v, i) => {
              const Icon = icons[i];
              return (
                <Spotlight key={v.title} className="group h-full bg-bg-elevated">
                  <div className="relative flex h-full flex-col p-7 sm:p-8">
                    <div className="mb-8 flex items-center justify-between">
                      <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-bg text-accent transition-[transform,border-color] duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:border-accent/50">
                        <Icon size={20} aria-hidden />
                      </span>
                      <span className="font-mono text-[11px] text-ink-subtle">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="font-display text-xl font-bold tracking-[-0.015em] text-ink">
                      {v.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">{v.description}</p>
                  </div>
                </Spotlight>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
