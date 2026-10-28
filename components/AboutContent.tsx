"use client";

import Image from "next/image";
import { Layers, ShieldCheck, Receipt, Wrench, type LucideIcon } from "lucide-react";
import { Reveal } from "@/lib/motion";
import { TiltCard } from "@/components/motion/TiltCard";
import { SectionHeading } from "@/components/SectionHeading";
import { content } from "@/data/content";
import { services } from "@/data/services";
import { cityName } from "@/data/site";

const icons: LucideIcon[] = [Layers, ShieldCheck, Receipt, Wrench];

export function AboutStory() {
  return (
    <section className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow={content.about.storyEyebrow}
              heading={content.about.storyHeading}
            />
            <Reveal index={1}>
              <p className="mt-5 leading-relaxed text-ink-muted">{content.about.storyP1}</p>
              <p className="mt-4 leading-relaxed text-ink-muted">{content.about.storyP2}</p>
            </Reveal>
          </div>

          <Reveal index={1} variant="scale">
            <TiltCard className="rounded-3xl">
              <div className="relative h-[420px] overflow-hidden rounded-3xl border border-border">
                <Image
                  src={services[0].image}
                  alt={`Aluminium and glass fabrication workshop in ${cityName}`}
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function AboutValues() {
  return (
    <section className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={content.about.valuesEyebrow}
          heading={content.about.valuesHeading}
          className="max-w-2xl"
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {content.about.values.map((v, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={v.title} index={i} className="h-full">
                <TiltCard className="h-full" intensity={4}>
                  <div className="glass-panel h-full rounded-2xl p-8 transition-[border-color,box-shadow] duration-500 hover:border-accent/30 hover:shadow-lift">
                    <span
                      className={`mb-5 flex h-11 w-11 items-center justify-center rounded-xl ${
                        i % 2 === 0
                          ? "bg-accent-tint text-accent"
                          : "bg-teal-tint text-teal"
                      }`}
                    >
                      <Icon size={20} aria-hidden />
                    </span>
                    <h3 className="font-display text-lg font-semibold text-ink">{v.title}</h3>
                    <p className="mt-2 leading-relaxed text-ink-muted">{v.description}</p>
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
