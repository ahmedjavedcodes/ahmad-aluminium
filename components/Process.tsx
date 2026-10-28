"use client";

import { processSteps } from "@/data/services";
import { content } from "@/data/content";
import { Reveal } from "@/lib/motion";
import { SectionHeading } from "@/components/SectionHeading";

export default function Process() {
  return (
    <section id="process" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={content.process.eyebrow}
          heading={content.process.heading}
          className="max-w-2xl"
        />

        <ol className="relative mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div
            aria-hidden
            className="absolute inset-x-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-border-strong to-transparent lg:block"
          />
          {processSteps.map((step, i) => (
            <Reveal key={step.title} index={i} as="li" className="relative">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-bg-elevated font-display text-xl font-semibold text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.description}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
