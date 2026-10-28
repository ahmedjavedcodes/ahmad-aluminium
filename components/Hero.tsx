"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Phone, Check, Clock, MapPin } from "lucide-react";
import { heroImage, services } from "@/data/services";
import { content } from "@/data/content";
import { site, cityName, telHref, whatsappHref } from "@/data/site";
import { googleRating } from "@/data/testimonials";
import { SplitText } from "@/components/motion/SplitText";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Marquee } from "@/components/motion/Marquee";
import { Logo } from "@/components/Logo";
import { Stars } from "@/components/Testimonials";
import { Button, RollText, ArrowSwap } from "@/components/ui/button";
import { QUOTE_HREF } from "@/lib/quote";

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: EASE },
});

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const cardY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative isolate flex min-h-dvh flex-col overflow-hidden pt-28 sm:pt-32"
    >
      {/* Ground: blueprint grid, a warm copper bloom behind the photo and a
          cool steel one behind the copy. */}
      <div aria-hidden className="blueprint absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="absolute -right-32 top-10 -z-10 h-[620px] w-[620px] rounded-full bg-accent/[0.13] blur-[120px]"
      />
      <div
        aria-hidden
        className="absolute -left-40 bottom-0 -z-10 h-[480px] w-[480px] rounded-full bg-teal/[0.08] blur-[120px]"
      />

      <div className="relative mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 items-center gap-14 px-5 pb-16 sm:px-8 lg:grid-cols-12 lg:gap-10">
        {/* Copy */}
        <div className="lg:col-span-6">
          {/* The complete registered name — this is where a first-time
              visitor learns who the business is. */}
          <motion.div {...fadeUp(0)} className="mb-7">
            <Logo variant="full" markClassName="h-11 w-11 text-accent" textClassName="text-[15px] sm:text-base" />
          </motion.div>

          <motion.p
            {...fadeUp(0.08)}
            className="mb-7 inline-flex max-w-full items-start gap-2.5 rounded-full border border-accent/25 bg-bg-elevated/80 py-1.5 pl-2.5 pr-4 font-mono text-[10.5px] font-medium uppercase leading-relaxed tracking-[0.12em] text-accent-deep shadow-card backdrop-blur sm:items-center sm:text-[11px]"
          >
            <span aria-hidden className="status-dot mt-[0.45em] h-2 w-2 shrink-0 rounded-full bg-accent sm:mt-0" />
            <span>{content.hero.eyebrow}</span>
          </motion.p>

          {/* `trigger="mount"`: the hero is above the fold, and an in-view
              trigger that never fires would leave the H1 invisible. */}
          <h1 className="font-display text-[2.75rem] font-bold leading-[0.98] tracking-[-0.045em] text-ink sm:text-6xl lg:text-[4.1rem] xl:text-[4.5rem]">
            <SplitText as="span" text={content.hero.titleLine1} className="block" trigger="mount" />
            {/* Explicit space so text extraction doesn't run the lines together. */}{" "}
            <SplitText
              as="span"
              text={content.hero.titleLine2}
              delay={0.28}
              className="block"
              wordClassName="text-accent"
              trigger="mount"
            />
          </h1>

          <motion.p
            {...fadeUp(0.5)}
            className="mt-7 max-w-xl text-[15px] leading-[1.75] text-ink-muted sm:text-[17px]"
          >
            {content.hero.paragraph}
          </motion.p>

          <motion.div {...fadeUp(0.62)} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <MagneticButton strength={0.18} className="w-full sm:w-auto">
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
            <MagneticButton strength={0.18} className="w-full sm:w-auto">
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                <a href={telHref}>
                  <Phone size={16} className="text-accent" aria-hidden />
                  <RollText>{content.hero.ctaSecondary}</RollText>
                  <span className="font-mono text-[13px] font-medium opacity-70">{site.phoneLocal}</span>
                </a>
              </Button>
            </MagneticButton>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="mt-10 grid grid-cols-1 gap-x-6 gap-y-3 border-t border-border pt-7 text-sm text-ink-muted sm:grid-cols-2"
          >
            {content.hero.trust.map((t) => (
              <li key={t} className="flex items-center gap-2.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-on-accent">
                  <Check size={12} strokeWidth={3} aria-hidden />
                </span>
                {t}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Photograph in a machined frame, with frosted cards floating over
            its edges. Fixed aspect ratio, so nothing shifts as it loads. */}
        <div className="relative lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: EASE }}
            className="crop-marks relative mx-auto max-w-xl lg:ml-auto lg:mr-0"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-white bg-bg-sunken shadow-deep sm:aspect-[5/4] lg:aspect-[4/5]">
              <motion.div data-parallax="" style={{ y: imageY }} className="absolute inset-[-8%_0]">
                <Image
                  src={heroImage}
                  alt={`Aluminium and glass building facade fabricated in ${cityName}`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
              <span className="absolute left-5 top-5 rounded-full bg-black/45 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-white/90 backdrop-blur">
                {content.gallery.heroLabel}
              </span>
            </div>

            {/* Rating card */}
            <motion.div
              data-parallax=""
              style={{ y: cardY }}
              className="absolute -bottom-6 -left-2 sm:-left-8 lg:-left-14"
            >
              {/* The float lives on its own wrapper: a CSS animation would
                  override Framer's inline transform on the same element. */}
              <div className="float-slow">
              <motion.a
                href={googleRating.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.75, ease: EASE }}
                className="focus-ring glass-panel glass-solid group flex items-center gap-4 rounded-2xl px-5 py-4 transition-shadow duration-500 hover:shadow-copper-rim"
              >
                <span className="font-display text-4xl font-bold leading-none tracking-[-0.03em] text-ink">
                  {googleRating.value.toFixed(1)}
                </span>
                <span>
                  <Stars rating={5} size={14} />
                  <span className="mt-1 block text-xs font-medium text-ink-muted">
                    {googleRating.count} Google reviews
                  </span>
                </span>
                <ArrowSwap diagonal size={16} className="text-ink-subtle group-hover:text-accent" />
              </motion.a>
              </div>
            </motion.div>

            {/* Workshop card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
              className="glass-panel glass-solid glass-sweep absolute -top-5 right-3 hidden rounded-2xl px-4 py-3 sm:block lg:-right-6"
            >
              <p className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-subtle">
                <span aria-hidden className="status-dot h-1.5 w-1.5 rounded-full bg-accent" />
                Workshop · {cityName}
              </p>
              <p className="mt-1.5 flex items-center gap-2 text-xs font-medium text-ink">
                <Clock size={13} className="text-accent" aria-hidden />
                {site.hours}
              </p>
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring mt-1 flex items-center gap-2 rounded text-xs text-ink-muted transition-colors hover:text-accent-deep"
              >
                <MapPin size={13} className="text-accent" aria-hidden />
                {site.address.street}
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="mt-14 flex justify-center lg:justify-end"
          >
            <Button asChild variant="ghost" size="sm">
              <Link href={QUOTE_HREF}>
                <RollText>Or build your quote request step by step</RollText>
                <ArrowSwap size={14} />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="brushed relative border-y border-border py-4">
        <Marquee duration={40}>
          {services.map((s, i) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              tabIndex={-1}
              className="flex items-center gap-10 font-mono text-[12px] uppercase tracking-[0.18em] text-ink-muted transition-colors hover:text-accent-deep"
            >
              <span>
                <span className="mr-3 text-accent">{String(i + 1).padStart(2, "0")}</span>
                {s.title}
              </span>
              <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-accent/70" />
            </Link>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
