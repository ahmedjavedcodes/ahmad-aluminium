"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, Check, Clock, MapPin } from "lucide-react";
import { heroImage, services } from "@/data/services";
import { content } from "@/data/content";
import { site, cityName, telHref, whatsappHref } from "@/data/site";
import { googleRating, testimonials } from "@/data/testimonials";
import { SplitText } from "@/components/motion/SplitText";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Marquee } from "@/components/motion/Marquee";
import { Parallax } from "@/components/motion/Parallax";
import { Logo } from "@/components/Logo";
import { Stars } from "@/components/Testimonials";
import { Button, RollText, ArrowSwap } from "@/components/ui/button";
import { QUOTE_HREF } from "@/lib/quote";

const EASE = [0.16, 1, 0.3, 1] as const;

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: EASE },
});

/**
 * Statement hero.
 *
 * A full-width headline sets the scale, the pitch and both calls to action
 * sit directly under it, and a bento of three tiles carries the proof: the
 * facade photograph (parallax inside a fixed frame), the Google rating, and
 * the workshop's figures. Every tile has a fixed height, so nothing shifts
 * as images and fonts arrive.
 */
export default function Hero() {
  const reviewerInitials = testimonials.slice(0, 4).map((t) => t.name.trim().charAt(0).toUpperCase());
  const [trades, , areas] = content.stats;

  return (
    <section id="top" className="relative isolate overflow-hidden pt-28 sm:pt-32">
      {/* Background depth: the blueprint drifts slower than the page. */}
      <Parallax speed={-80} className="absolute inset-0 -z-10">
        <div aria-hidden className="blueprint h-full w-full" />
      </Parallax>
      <div aria-hidden className="absolute -right-40 top-0 -z-10 h-[640px] w-[640px] rounded-full bg-accent/[0.12] blur-[130px]" />
      <div aria-hidden className="absolute -left-40 top-80 -z-10 h-[520px] w-[520px] rounded-full bg-teal/[0.07] blur-[130px]" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Identity row: the complete registered name, then the trades. */}
        <motion.div {...rise(0)} className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <Logo variant="full" markClassName="h-10 w-10 text-accent" textClassName="text-[13px] sm:text-sm" />
          <p className="inline-flex max-w-full items-start gap-2.5 self-start rounded-full border border-border bg-bg-elevated/80 px-4 py-2 text-[11px] font-semibold uppercase leading-relaxed tracking-[0.14em] text-accent-deep shadow-card backdrop-blur sm:items-center sm:self-auto">
            <span aria-hidden className="status-dot mt-[0.4em] h-2 w-2 shrink-0 rounded-full bg-accent sm:mt-0" />
            <span>{content.hero.eyebrow}</span>
          </p>
        </motion.div>

        {/* `trigger="mount"`: above the fold, so the headline animates on
            load rather than waiting for an in-view event. */}
        <h1 className="mt-10 font-display text-[2.7rem] font-extrabold leading-[0.98] tracking-[-0.045em] text-ink sm:mt-14 sm:text-7xl lg:text-[6.4rem]">
          <SplitText as="span" text={content.hero.titleLine1} className="block" trigger="mount" />
          {/* Explicit space so text extraction doesn't run the lines together. */}{" "}
          <SplitText
            as="span"
            text={content.hero.titleLine2}
            delay={0.3}
            className="block"
            wordClassName="text-accent"
            trigger="mount"
          />
        </h1>

        <div className="mt-10 grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
          <motion.p {...rise(0.5)} className="max-w-xl text-[15px] leading-[1.75] text-ink-muted sm:text-[17px] lg:col-span-6">
            {content.hero.paragraph}
          </motion.p>

          <motion.div {...rise(0.6)} className="flex flex-col gap-3 sm:flex-row sm:items-center lg:col-span-6 lg:justify-end">
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
            <MagneticButton strength={0.2} className="w-full sm:w-auto">
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                <a href={telHref}>
                  <Phone size={16} className="text-accent" aria-hidden />
                  <RollText>{content.hero.ctaSecondary}</RollText>
                </a>
              </Button>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Bento */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-12 lg:grid-rows-[260px_260px]">
          {/* Photograph */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.35, ease: EASE }}
            className="group relative h-[340px] overflow-hidden rounded-[2rem] bg-bg-sunken shadow-deep sm:col-span-2 sm:h-[420px] lg:col-span-8 lg:row-span-2 lg:h-auto"
          >
            <Parallax speed={50} scale={[1.18, 1.04]} className="absolute inset-0">
              <Image
                src={heroImage}
                alt={`Aluminium and glass building facade fabricated in ${cityName}`}
                fill
                priority
                sizes="(min-width: 1024px) 66vw, 100vw"
                className="object-cover transition-transform duration-[1600ms] ease-out-expo group-hover:scale-[1.03]"
              />
            </Parallax>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />

            <span className="absolute left-5 top-5 rounded-full bg-black/40 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md">
              {content.gallery.heroLabel}
            </span>

            {/* Quote funnel on the photo itself. */}
            <Link
              href={QUOTE_HREF}
              className="focus-ring glass-panel glass-solid group/q absolute inset-x-4 bottom-4 flex items-center gap-4 rounded-2xl p-4 transition-transform duration-500 ease-out-expo hover:-translate-y-1 sm:inset-x-auto sm:bottom-5 sm:left-5 sm:max-w-sm"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-on-accent">
                <Check size={18} strokeWidth={3} aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-bold text-ink">{content.hero.trust[0]}</span>
                <span className="block text-xs text-ink-muted">{content.hero.trust[1]}</span>
              </span>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border-strong text-ink transition-colors duration-300 group-hover/q:border-accent group-hover/q:bg-accent group-hover/q:text-on-accent">
                <ArrowSwap size={15} />
              </span>
            </Link>
          </motion.div>

          {/* Rating */}
          <motion.a
            href={googleRating.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: EASE }}
            className="focus-ring panel hover-rim group relative flex h-[240px] flex-col justify-between overflow-hidden rounded-[2rem] p-7 transition-[transform,box-shadow] duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-deep lg:col-span-4 lg:h-auto"
          >
            <span className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-subtle">Google rating</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border-strong text-ink transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent">
                <ArrowSwap diagonal size={15} />
              </span>
            </span>
            <span className="flex items-end gap-4">
              <span className="font-display text-7xl font-extrabold leading-none tracking-[-0.05em] text-ink">
                {googleRating.value.toFixed(1)}
              </span>
              <span className="pb-1.5">
                <Stars rating={5} size={16} />
                <span className="mt-1.5 block text-sm text-ink-muted">{googleRating.count} Google reviews</span>
              </span>
            </span>
            <span className="flex items-center">
              {reviewerInitials.map((initial, i) => (
                <span
                  key={i}
                  aria-hidden
                  className="-ml-2 flex h-9 w-9 items-center justify-center rounded-full border-2 border-bg-elevated bg-accent-tint text-xs font-bold text-accent-deep first:ml-0"
                >
                  {initial}
                </span>
              ))}
              <span className="ml-3 text-xs font-medium text-ink-muted">Verified customers in {cityName}</span>
            </span>
          </motion.a>

          {/* Figures */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.62, ease: EASE }}
            className="theme-inverse relative flex h-[240px] flex-col justify-between overflow-hidden rounded-[2rem] p-7 lg:col-span-4 lg:h-auto"
          >
            <div aria-hidden className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/25 blur-[70px]" />
            <div className="relative grid grid-cols-2 gap-4">
              {[trades, areas].map((s) => (
                <div key={s.label}>
                  <p className="font-display text-5xl font-extrabold leading-none tracking-[-0.04em] text-ink">
                    {s.value}
                    <span className="text-accent">{s.suffix}</span>
                  </p>
                  <p className="mt-2 text-xs leading-snug text-ink-muted">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="relative flex flex-col gap-1.5 border-t border-border pt-4 text-xs text-ink-muted">
              <span className="flex items-center gap-2">
                <Clock size={13} className="text-accent" aria-hidden />
                {site.hours}
              </span>
              <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="focus-ring flex items-center gap-2 rounded transition-colors hover:text-ink">
                <MapPin size={13} className="text-accent" aria-hidden />
                {site.address.street}, {cityName}
              </a>
            </div>
          </motion.div>
        </div>

        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-sm text-ink-muted"
        >
          {content.hero.trust.map((t) => (
            <li key={t} className="flex items-center gap-2.5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-tint text-accent">
                <Check size={12} strokeWidth={3} aria-hidden />
              </span>
              {t}
            </li>
          ))}
        </motion.ul>
      </div>

      <div className="brushed relative mt-16 border-y border-border py-5">
        <Marquee duration={44}>
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              tabIndex={-1}
              className="flex items-center gap-10 font-display text-xl font-bold tracking-[-0.02em] text-ink/80 transition-colors hover:text-accent"
            >
              {s.title}
              <span aria-hidden className="h-2 w-2 rotate-45 bg-accent" />
            </Link>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
