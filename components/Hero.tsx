"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Phone, CheckCircle2, MapPin } from "lucide-react";
import { heroImage, services } from "@/data/services";
import { content } from "@/data/content";
import { site, cityName, telHref, whatsappHref } from "@/data/site";
import { SplitText } from "@/components/motion/SplitText";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Marquee } from "@/components/motion/Marquee";
import { Logo } from "@/components/Logo";
import { RatingBadge } from "@/components/Testimonials";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-dvh flex-col overflow-hidden pt-32"
    >
      {/* Background image with parallax */}
      <div className="absolute inset-0 -z-20">
        <motion.div
          style={reduceMotion ? undefined : { y: imageY }}
          className="absolute inset-0 scale-[1.15]"
        >
          <Image
            src={heroImage}
            alt={`Aluminium and glass building facade fabricated in ${cityName}`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>

        {/*
          Split hero rather than a uniform wash.

          The source photograph is a dark night-time facade while the page is a
          light cream ground with near-black type, so the two cannot overlap.
          The previous treatment resolved that by scrimming the image down to
          ~3.5% visibility, which made the hero read as an empty block. Instead
          the copy column keeps a solid cream ground and the scrim clears
          entirely past it, so the building is fully visible on the right.
        */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-transparent to-bg" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg from-[46%] via-bg/55 via-[66%] to-transparent to-[86%]" />
      </div>

      <div aria-hidden className="absolute inset-0 -z-10 bg-mesh-accent" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-mesh-teal" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid opacity-25" />

      {/* The two floating decorative glass panels that used to sit here were
          removed: they were designed against a flat cream hero, and once the
          building photograph became visible they read as stray white boxes
          pasted over the facade rather than as glass. */}

      <motion.div
        style={reduceMotion ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative flex flex-1 items-center pb-16"
      >
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          {/*
            Brand lockup.

            The navigation is a compact pill with no wordmark, so this is where
            a first-time visitor actually learns who the business is. It sits
            above the headline at a size that reads instantly, with the trade
            and city as a supporting line.
          */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4"
          >
            {/* The complete registered name, not the shortened trading name —
                this is where a first-time visitor learns who the business is. */}
            <Logo
              variant="full"
              markClassName="h-11 w-11 text-accent"
              textClassName="text-base sm:text-lg"
            />
          </motion.div>

          {/* Trades chip, directly under the name: it states the full range of
              work in one line before the headline narrows to a single idea. */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="glass-panel mb-7 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-accent-deep"
          >
            <MapPin size={13} aria-hidden />
            {content.hero.eyebrow}
          </motion.p>

          {/*
            `trigger="mount"` matters here: the hero is above the fold, and an
            in-view trigger that never fires would leave the H1 permanently
            translated out of its mask — i.e. an invisible headline.
          */}
          <h1 className="max-w-4xl font-display text-[2.35rem] font-semibold leading-[1.12] tracking-[-0.02em] text-ink sm:text-5xl md:text-[3.75rem]">
            <SplitText as="span" text={content.hero.titleLine1} className="block" trigger="mount" />
            {/* The two lines are separate block spans, so without an explicit
                space between them text extraction concatenates the last word of
                line one onto the first of line two ("steelfabricated"). */}
            {" "}
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg"
          >
            {content.hero.paragraph}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.62, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-col gap-3.5 sm:flex-row sm:items-center"
          >
            <MagneticButton strength={0.25}>
              <a
                href={whatsappHref(
                  `Hi ${site.name}, I'd like a free quotation. My area in ${cityName} is: `
                )}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="focus-ring group inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-accent px-7 py-3.5 text-sm font-semibold text-on-accent transition-shadow duration-300 hover:shadow-glow-accent sm:w-auto"
              >
                {content.hero.ctaPrimary}
                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
                />
              </a>
            </MagneticButton>
            <MagneticButton strength={0.25}>
              <a
                href={telHref}
                data-cursor="hover"
                className="focus-ring glass-panel inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-ink transition-colors duration-300 hover:border-accent/40 sm:w-auto"
              >
                <Phone size={16} className="text-accent" />
                {content.hero.ctaSecondary}
              </a>
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7"
          >
            <RatingBadge />
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.85 }}
            className="mt-11 grid grid-cols-1 gap-x-6 gap-y-2.5 text-sm text-ink-muted sm:grid-cols-2 lg:flex lg:flex-wrap lg:gap-x-7"
          >
            {content.hero.trust.map((t) => (
              <li key={t} className="flex items-center gap-2">
                <CheckCircle2 size={15} className="shrink-0 text-teal" aria-hidden />
                {t}
              </li>
            ))}
          </motion.ul>
        </div>
      </motion.div>

      <div className="relative border-t border-border py-5">
        <Marquee duration={34}>
          {services.map((s) => (
            <span
              key={s.slug}
              className="flex items-center gap-3 text-sm font-medium uppercase tracking-[0.14em] text-ink-muted"
            >
              {s.title}
              <span aria-hidden className="h-1 w-1 rounded-full bg-accent" />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
