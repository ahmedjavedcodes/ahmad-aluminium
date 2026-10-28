"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { content } from "@/data/content";
import { heroImage } from "@/data/services";
import { site, cityName, telHref, whatsappHref } from "@/data/site";
import { Reveal } from "@/lib/motion";
import { QUOTE_HREF } from "@/lib/quote";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Button, RollText, ArrowSwap } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="relative py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal variant="scale">
          <div className="theme-inverse crop-marks relative isolate overflow-hidden rounded-[2rem] px-6 py-16 shadow-deep sm:px-14 sm:py-20">
            <Image
              src={heroImage}
              alt=""
              aria-hidden
              fill
              sizes="(min-width: 1280px) 1280px, 100vw"
              className="-z-20 object-cover opacity-40"
            />
            <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-bg via-bg/90 to-bg/60" />
            <div aria-hidden className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-accent/20 blur-[100px]" />
            <div aria-hidden className="blueprint absolute inset-0 -z-10 opacity-50" />

            <div className="relative grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-accent-deep">
                  {content.nav.quote} · {cityName}
                </p>
                <h2 className="font-display text-[2.1rem] font-bold leading-[1.02] tracking-[-0.03em] text-ink sm:text-5xl md:text-[3.5rem]">
                  {content.cta.heading.lead}{" "}
                  <span className="text-accent">{content.cta.heading.accent}</span>
                  {content.cta.heading.tail}
                </h2>
                <p className="mt-5 max-w-xl leading-relaxed text-ink-muted">{content.cta.paragraph}</p>
              </div>

              <div className="flex flex-col gap-3 lg:col-span-5 lg:items-end">
                <MagneticButton strength={0.2} className="w-full lg:w-auto">
                  <Button asChild size="lg" className="w-full lg:w-auto">
                    <a
                      href={whatsappHref(
                        `Hi ${site.name}, I'd like a free quotation. My area in ${cityName} is: `
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <RollText>{content.hero.ctaPrimary}</RollText>
                      <ArrowSwap size={17} />
                    </a>
                  </Button>
                </MagneticButton>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:w-auto">
                  <Button asChild size="lg" variant="glass">
                    <a href={telHref}>
                      <Phone size={16} className="text-accent" aria-hidden />
                      <span className="font-mono text-[14px]">{site.phoneLocal}</span>
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href={QUOTE_HREF}>
                      <RollText>Build a quote</RollText>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
