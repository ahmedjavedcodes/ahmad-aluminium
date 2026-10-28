"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Phone, Check, MapPin, Clock, ArrowUpRight } from "lucide-react";
import { heroImage, services } from "@/data/services";
import { content } from "@/data/content";
import { site, cityName, telHref, whatsappHref } from "@/data/site";
import { googleRating } from "@/data/testimonials";
import { SplitText } from "@/components/motion/SplitText";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Marquee } from "@/components/motion/Marquee";
import { Logo } from "@/components/Logo";
import { Stars } from "@/components/Testimonials";
import { Button } from "@/components/ui/button";
import { QUOTE_HREF } from "@/lib/quote";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.18]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative isolate flex min-h-dvh flex-col overflow-hidden pt-28 sm:pt-32"
    >
      {/*
        The facade is a night photograph, which on the old cream ground had to
        be scrimmed down to near-invisibility. On the dark ground it can show
        in full: the scrim only darkens the copy column for legibility and
        fades the bottom edge into the page.
      */}
      <div className="absolute inset-0 -z-20">
        <motion.div
          style={reduceMotion ? undefined : { y: imageY, scale: imageScale }}
          className="absolute inset-0"
        >
          <Image
            src={heroImage}
            alt={`Aluminium and glass building facade fabricated in ${cityName}`}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[70%_center]"
          />
        </motion.div>
        <div className="absolute inset-0 bg-bg/70 lg:bg-transparent" />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-bg from-[28%] via-bg/75 via-[55%] to-bg/10 lg:block" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-bg/90 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-bg to-transparent" />
      </div>

      <div aria-hidden className="blueprint absolute inset-0 -z-10 opacity-60" />
      <div
        aria-hidden
        className="absolute -left-40 top-1/4 -z-10 h-[520px] w-[520px] rounded-full bg-accent/10 blur-[120px]"
      />

      <motion.div
        style={reduceMotion ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative flex flex-1 items-center pb-14"
      >
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {/* The complete registered name — this is where a first-time
                visitor learns who the business is. */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="mb-6"
            >
              <Logo
                variant="full"
                markClassName="h-11 w-11 text-accent"
                textClassName="text-[15px] sm:text-lg"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
              className="mb-7 inline-flex max-w-full items-start gap-2.5 rounded-md border border-accent/30 bg-accent-tint px-3 py-1.5 font-mono text-[10.5px] font-medium uppercase leading-relaxed tracking-[0.14em] text-accent-deep sm:items-center sm:text-[11px] sm:tracking-[0.16em]"
            >
              <span aria-hidden className="status-dot mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent sm:mt-0" />
              <span>{content.hero.eyebrow}</span>
            </motion.p>

            {/* `trigger="mount"`: the hero is above the fold, and an in-view
                trigger that never fires would leave the H1 invisible. */}
            <h1 className="font-display text-[2.6rem] font-bold leading-[1] tracking-[-0.035em] text-ink sm:text-6xl lg:text-[4.6rem]">
              <SplitText as="span" text={content.hero.titleLine1} className="block" trigger="mount" />
              {/* Explicit space so text extraction doesn't run the two lines
                  together ("steelfabricated"). */}
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
              transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
              className="mt-7 max-w-xl text-[15px] leading-relaxed text-ink-muted sm:text-lg"
            >
              {content.hero.paragraph}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.62, ease: EASE }}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <MagneticButton strength={0.2} className="w-full sm:w-auto">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <a
                    href={whatsappHref(
                      `Hi ${site.name}, I'd like a free quotation. My area in ${cityName} is: `
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {content.hero.ctaPrimary}
                    <ArrowRight
                      size={17}
                      aria-hidden
                      className="transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
                    />
                  </a>
                </Button>
              </MagneticButton>
              <MagneticButton strength={0.2} className="w-full sm:w-auto">
                <Button asChild size="lg" variant="glass" className="w-full sm:w-auto">
                  <a href={telHref}>
                    <Phone size={16} className="text-accent" aria-hidden />
                    {content.hero.ctaSecondary}
                    <span className="font-mono text-[13px] font-normal text-ink-muted">
                      {site.phoneLocal}
                    </span>
                  </a>
                </Button>
              </MagneticButton>
            </motion.div>
          </div>

          {/* Workshop card: the trust signals a buyer checks before calling —
              rating, guarantees, hours, location — gathered in one panel. */}
          <motion.aside
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
            aria-label="Why customers choose us"
            className="lg:col-span-5 lg:pl-6"
          >
            <div className="glass-panel glass-sweep crop-marks rounded-xl">
              <div className="flex items-center justify-between border-b border-border px-5 py-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-subtle">
                  Workshop · {cityName}
                </span>
                <span aria-hidden className="flex gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-border-strong" />
                  <span className="h-2 w-2 rounded-full bg-border-strong" />
                  <span className="h-2 w-2 rounded-full bg-accent" />
                </span>
              </div>

              <a
                href={googleRating.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring group flex items-center gap-4 border-b border-border px-5 py-5 transition-colors hover:bg-surface"
              >
                <span className="font-display text-5xl font-bold leading-none text-ink">
                  {googleRating.value.toFixed(1)}
                </span>
                <span className="flex-1">
                  <Stars rating={5} size={15} />
                  <span className="mt-1.5 block text-xs text-ink-muted">
                    {googleRating.count} Google reviews
                  </span>
                </span>
                <ArrowUpRight
                  size={18}
                  aria-hidden
                  className="text-ink-subtle transition-[transform,color] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                />
              </a>

              <ul className="flex flex-col gap-3 px-5 py-5">
                {content.hero.trust.map((t, i) => (
                  <motion.li
                    key={t}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.85 + i * 0.08, ease: EASE }}
                    className="flex items-start gap-3 text-sm text-ink"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded bg-accent-tint text-accent">
                      <Check size={13} strokeWidth={3} aria-hidden />
                    </span>
                    {t}
                  </motion.li>
                ))}
              </ul>

              <div className="grid grid-cols-1 gap-2 border-t border-border px-5 py-4 text-xs text-ink-muted sm:grid-cols-2">
                <span className="flex items-center gap-2">
                  <Clock size={13} className="shrink-0 text-teal" aria-hidden />
                  {site.hours}
                </span>
                <a
                  href={site.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring flex items-center gap-2 rounded transition-colors hover:text-ink"
                >
                  <MapPin size={13} className="shrink-0 text-teal" aria-hidden />
                  {site.address.street}
                </a>
              </div>

              <div className="border-t border-border p-3">
                <Button asChild variant="outline" className="w-full">
                  <Link href={QUOTE_HREF}>
                    Build your quote request
                    <ArrowRight
                      size={15}
                      aria-hidden
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.aside>
        </div>
      </motion.div>

      <div className="relative border-y border-border bg-bg-sunken/60 py-4 backdrop-blur">
        <Marquee duration={38}>
          {services.map((s, i) => (
            <span
              key={s.slug}
              className="flex items-center gap-10 font-mono text-[12px] uppercase tracking-[0.2em] text-ink-muted"
            >
              <span>
                <span className="mr-3 text-accent-deep">{String(i + 1).padStart(2, "0")}</span>
                {s.title}
              </span>
              <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-accent/70" />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
