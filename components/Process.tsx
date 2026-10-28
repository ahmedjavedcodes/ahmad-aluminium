"use client";

import { motion } from "framer-motion";
import { processSteps } from "@/data/services";
import { content } from "@/data/content";
import { Reveal } from "@/lib/motion";
import { SectionHeading } from "@/components/SectionHeading";

/**
 * Survey → handover as a production line: numbered stations joined by a rail
 * that fills with copper as the section scrolls into view.
 */
export default function Process({ index }: { index?: number }) {
  return (
    <section id="process" className="relative isolate overflow-hidden py-24 sm:py-28">
      <div aria-hidden className="brushed absolute inset-0 -z-10" />
      <div aria-hidden className="blueprint absolute inset-0 -z-10 opacity-70" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index={index}
          eyebrow={content.process.eyebrow}
          heading={content.process.heading}
          className="max-w-2xl"
        />

        <ol className="relative mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Rail: horizontal on desktop, vertical on phones. */}
          <div aria-hidden className="absolute left-7 top-0 h-full w-px bg-border sm:hidden" />
          <div aria-hidden className="absolute inset-x-0 top-7 hidden h-px bg-border lg:block">
            <motion.div
              className="h-full origin-left bg-gradient-to-r from-accent via-accent to-accent/0"
              data-parallax=""
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            />
          </div>

          {processSteps.map((step, i) => (
            <Reveal key={step.title} index={i} as="li" className="relative pl-20 sm:pl-0">
              <span className="absolute left-0 top-0 flex h-14 w-14 items-center justify-center rounded-2xl border border-accent/30 bg-bg-elevated font-display text-xl font-bold text-accent shadow-[0_0_0_6px_rgb(var(--color-bg-sunken)),0_10px_24px_-12px_rgb(var(--color-accent)/0.5)] transition-transform duration-500 ease-out-expo hover:-translate-y-1 hover:rotate-[-4deg] sm:relative">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-0 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-subtle sm:mt-6">
                Step {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 font-display text-xl font-bold tracking-[-0.015em] text-ink">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.description}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
