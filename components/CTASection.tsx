import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { content } from "@/data/content";
import { heroImage } from "@/data/services";
import { site, cityName, telHref, whatsappHref } from "@/data/site";
import { Reveal } from "@/lib/motion";
import { QUOTE_HREF } from "@/lib/quote";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Parallax } from "@/components/motion/Parallax";
import { Button, RollText, ArrowSwap } from "@/components/ui/button";

/**
 * Closing call to action: a wide photographic panel with the facade drifting
 * behind a dark glaze, a large centred headline, and all three routes to a
 * quote side by side.
 */
export default function CTASection() {
  return (
    <section className="cv-block relative px-3 py-12 sm:px-5 sm:py-16">
      <Reveal variant="rise">
        <div className="theme-inverse relative isolate mx-auto max-w-[96rem] overflow-hidden rounded-[2.5rem] px-6 py-24 text-center shadow-deep sm:px-14 sm:py-32">
          <Parallax speed={70} scale={[1.2, 1.05]} className="absolute inset-0 -z-20">
            <Image src={heroImage} alt="" aria-hidden fill sizes="(min-width: 640px) 100vw, 70vw" className="object-cover opacity-45" />
          </Parallax>
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-bg/80 via-bg/70 to-bg/95" />
          <div aria-hidden className="absolute left-1/2 top-0 -z-10 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-accent/25 blur-[120px]" />

          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-deep">
            {content.nav.quote} · {cityName}
          </p>
          <h2 className="mx-auto mt-6 max-w-4xl font-display text-[2.4rem] font-extrabold leading-[1] tracking-[-0.045em] text-ink sm:text-6xl lg:text-[5rem]">
            {content.cta.heading.lead} <span className="text-accent">{content.cta.heading.accent}</span>
            {content.cta.heading.tail}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">{content.cta.paragraph}</p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <MagneticButton strength={0.2} className="w-full sm:w-auto">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <a
                  href={whatsappHref(`Hi ${site.name}, I'd like a free quotation. My area in ${cityName} is: `)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <RollText>{content.hero.ctaPrimary}</RollText>
                  <ArrowSwap size={17} />
                </a>
              </Button>
            </MagneticButton>
            <Button asChild size="lg" variant="glass" className="w-full sm:w-auto">
              <a href={telHref}>
                <Phone size={16} className="text-accent" aria-hidden />
                <span className="font-mono text-[14px]">{site.phoneLocal}</span>
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full bg-transparent sm:w-auto">
              <Link href={QUOTE_HREF}>
                <RollText>Build a quote</RollText>
              </Link>
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
