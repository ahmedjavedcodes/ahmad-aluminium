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
import { TiltCard } from "@/components/motion/TiltCard";
import { SectionHeading } from "@/components/SectionHeading";
import { content } from "@/data/content";

const icons: LucideIcon[] = [Layers, Ruler, Receipt, HardHat, ThermometerSun, LifeBuoy];

export default function WhyUs() {
  return (
    <section id="why-us" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={content.whyUs.eyebrow}
          heading={content.whyUs.heading}
          className="max-w-2xl"
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {content.whyUs.values.map((v, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={v.title} index={i} className="group h-full">
                <TiltCard className="h-full" intensity={5}>
                  <div className="glass-panel h-full rounded-2xl p-7 transition-[border-color,box-shadow] duration-500 hover:border-accent/30 hover:shadow-lift">
                    <span
                      className={`mb-5 flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-500 ease-out-expo group-hover:scale-110 ${
                        i % 2 === 0
                          ? "bg-accent-tint text-accent"
                          : "bg-teal-tint text-teal"
                      }`}
                    >
                      <Icon size={20} aria-hidden />
                    </span>
                    <h3 className="font-display text-lg font-semibold text-ink">{v.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">{v.description}</p>
                  </div>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
