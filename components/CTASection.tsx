"use client";

import { ArrowRight, Phone } from "lucide-react";
import { content } from "@/data/content";
import { site, cityName, telHref, whatsappHref } from "@/data/site";
import { Reveal } from "@/lib/motion";
import { MagneticButton } from "@/components/motion/MagneticButton";

export default function CTASection() {
  return (
    <section className="relative py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal variant="scale">
          <div className="relative overflow-hidden rounded-3xl border border-accent/20 bg-bg-elevated px-8 py-16 text-center sm:px-16">
            <div aria-hidden className="absolute inset-0 bg-mesh-accent" />
            <div aria-hidden className="absolute inset-0 bg-mesh-teal" />
            <div aria-hidden className="absolute inset-0 bg-grid opacity-30" />

            <div className="relative">
              <h2 className="mx-auto max-w-2xl font-display text-[1.9rem] font-semibold leading-[1.14] tracking-[-0.015em] text-ink sm:text-4xl md:text-[2.75rem]">
                {content.cta.heading.lead}{" "}
                <span className="text-accent">{content.cta.heading.accent}</span>
                {content.cta.heading.tail}
              </h2>
              <p className="mx-auto mt-4 max-w-xl leading-relaxed text-ink-muted">
                {content.cta.paragraph}
              </p>

              <div className="mt-9 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
                <MagneticButton strength={0.25}>
                  <a
                    href={whatsappHref(
                      `Hi ${site.name}, I'd like a free quotation. My area in ${cityName} is: `
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    className="focus-ring group inline-flex cursor-pointer items-center gap-2 rounded-xl bg-accent px-7 py-3.5 text-sm font-semibold text-on-accent transition-shadow duration-300 hover:shadow-glow-accent"
                  >
                    {content.hero.ctaPrimary}
                    <ArrowRight
                      size={17}
                      aria-hidden
                      className="transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
                    />
                  </a>
                </MagneticButton>
                <MagneticButton strength={0.25}>
                  <a
                    href={telHref}
                    data-cursor="hover"
                    className="focus-ring glass-panel inline-flex cursor-pointer items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-ink transition-colors duration-300 hover:border-accent/40"
                  >
                    <Phone size={16} className="text-accent" aria-hidden />
                    {site.phoneLocal}
                  </a>
                </MagneticButton>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
