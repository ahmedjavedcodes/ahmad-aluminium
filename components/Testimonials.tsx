"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials, googleRating, type Testimonial } from "@/data/testimonials";
import { Reveal } from "@/lib/motion";
import { SectionHeading } from "@/components/SectionHeading";
import { Screen } from "@/components/Screen";
import { Marquee } from "@/components/motion/Marquee";
import { RollText, ArrowSwap } from "@/components/ui/button";
import { content } from "@/data/content";
import { cn } from "@/lib/utils";

export function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span className="flex items-center gap-0.5" aria-hidden>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={size}
          className={i < rating ? "fill-accent text-accent" : "text-border-strong"}
        />
      ))}
    </span>
  );
}

const dateFmt = new Intl.DateTimeFormat("en-GB", { month: "short", year: "numeric" });

/**
 * Compact rating badge — the single strongest trust signal on the page, and
 * the one an AI assistant is most likely to quote when comparing local firms.
 */
export function RatingBadge({ className }: { className?: string }) {
  return (
    <a
      href={googleRating.profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "focus-ring group inline-flex items-center gap-2.5 rounded-full border border-border bg-bg-elevated px-4 py-2 shadow-card transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-accent/40",
        className
      )}
    >
      <Stars rating={5} size={13} />
      <span className="text-xs font-semibold text-ink">{googleRating.value.toFixed(1)}</span>
      <span className="text-xs text-ink-muted">{googleRating.count} Google reviews</span>
    </a>
  );
}

/** Review text is rendered exactly as stored — never trimmed or edited. */
function ReviewCard({ t }: { t: Testimonial }) {
  return (
    <figure className="panel hover-rim flex h-full w-[260px] shrink-0 flex-col rounded-[1.5rem] p-4 sm:w-[320px] sm:p-5 transition-[transform,box-shadow] duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-deep">
      <div className="flex items-center justify-between">
        <Quote size={18} className="text-accent/70" aria-hidden />
        <Stars rating={t.rating} size={13} />
      </div>
      <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-ink">{t.text}</blockquote>
      <figcaption className="mt-4 flex items-center gap-3 border-t border-border pt-3">
        <span
          aria-hidden
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-tint font-display text-sm font-bold text-accent-deep"
        >
          {t.name.trim().charAt(0).toUpperCase()}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold text-ink">{t.name}</span>
          <time dateTime={t.date} className="block text-xs text-ink-subtle">
            {dateFmt.format(new Date(t.date))} · Google
          </time>
        </span>
      </figcaption>
    </figure>
  );
}

/**
 * Featured reviews as a stacked deck: the top card shows one review, the
 * edges of the next cards peek out beneath, and every few seconds the top
 * card slides back and the next one rises into place. Pauses on hover,
 * keyboard focus, off screen and under reduced motion; arrow buttons and dots
 * give manual control. Text is the stored review, untouched.
 */
function ReviewDeck({ deck }: { deck: Testimonial[] }) {
  const [top, setTop] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useInView(ref);
  const reduceMotion = useReducedMotion();
  const n = deck.length;

  useEffect(() => {
    if (n < 2 || paused || !onScreen || reduceMotion) return;
    const t = setInterval(() => setTop((v) => (v + 1) % n), 6500);
    return () => clearInterval(t);
  }, [n, paused, onScreen, reduceMotion]);

  const go = (d: number) => setTop((v) => (v + d + n) % n);

  return (
    <div
      ref={ref}
      role="region"
      aria-roledescription="carousel"
      aria-label={`Featured Google reviews, ${top + 1} of ${n}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="relative flex w-full flex-1 pb-3"
    >
      {/* Deck edges: the next cards peeking out beneath the top one. */}
      {n > 1 && (
        <>
          <div aria-hidden className="absolute inset-x-[4%] bottom-0 top-6 rounded-[clamp(1.5rem,3.5svh,2.5rem)] bg-ink/25" />
          <div aria-hidden className="absolute inset-x-[2%] bottom-1.5 top-3 rounded-[clamp(1.5rem,3.5svh,2.5rem)] bg-ink/50" />
        </>
      )}

      <figure className="theme-inverse relative grid w-full flex-1 overflow-hidden rounded-[clamp(1.5rem,3.5svh,2.5rem)] px-5 py-[clamp(1rem,4svh,3.5rem)] sm:px-12">
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-accent/25 blur-[100px]" />
        <Quote aria-hidden className="pointer-events-none absolute -left-3 -top-5 h-40 w-40 text-white/[0.04] sm:h-52 sm:w-52" />

        {/* All reviews share one grid cell, so the card is as tall as the
            longest and never resizes while it shuffles. */}
        {deck.map((t, k) => {
          const state = k === top ? "now" : k === (top - 1 + n) % n ? "gone" : "next";
          return (
            <div
              key={t.name + t.date}
              aria-hidden={k !== top}
              className="relative col-start-1 row-start-1 grid grid-cols-1 items-end gap-6 self-center transition-[transform,opacity] duration-700 ease-out-expo lg:grid-cols-12 lg:gap-10"
              style={{
                opacity: state === "now" ? 1 : 0,
                transform:
                  state === "now" ? "none" : state === "gone" ? "translate3d(0,-18px,0) scale(0.98)" : "translate3d(0,22px,0)",
                pointerEvents: state === "now" ? undefined : "none",
              }}
            >
              <blockquote className="font-display text-[length:clamp(1.15rem,min(3vw,4.2svh),2.6rem)] font-bold leading-[1.22] tracking-[-0.03em] text-ink lg:col-span-8">
                <span className="text-accent">&ldquo;</span>
                {t.text}
                <span className="text-accent">&rdquo;</span>
              </blockquote>
              <figcaption className="flex flex-wrap items-center justify-between gap-3 lg:col-span-4 lg:flex-col lg:items-end lg:text-right">
                <span>
                  <Stars rating={t.rating} size={16} />
                  <span className="mt-2 block font-semibold text-ink">{t.name}</span>
                  <time dateTime={t.date} className="block text-sm text-ink-muted">
                    {dateFmt.format(new Date(t.date))} · Google review
                  </time>
                </span>
                <a
                  href={googleRating.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={k === top ? undefined : -1}
                  className="focus-ring group hidden items-center gap-2 rounded-full text-sm font-semibold text-accent-deep sm:inline-flex [@media(max-height:700px)]:hidden"
                >
                  <RollText>{`All ${googleRating.count} reviews on Google`}</RollText>
                  <ArrowSwap diagonal size={15} />
                </a>
              </figcaption>
            </div>
          );
        })}

        {n > 1 && (
          <div className="relative col-start-1 row-start-2 mt-[clamp(0.5rem,2.5svh,1.75rem)] flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous review"
              className="focus-ring flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-border-strong text-ink transition-colors hover:border-accent hover:bg-accent hover:text-on-accent sm:h-9 sm:w-9"
            >
              <ChevronLeft size={16} aria-hidden />
            </button>
            {deck.map((t, k) => (
              <button
                key={t.name + t.date}
                type="button"
                onClick={() => setTop(k)}
                aria-label={`Show review ${k + 1} of ${n}`}
                aria-current={k === top ? "true" : undefined}
                className="focus-ring flex h-8 w-5 cursor-pointer items-center justify-center rounded-full sm:h-9"
              >
                <span
                  className={cn(
                    "block h-1.5 rounded-full transition-[width,background-color] duration-500",
                    k === top ? "w-5 bg-accent" : "w-1.5 bg-border-strong"
                  )}
                />
              </button>
            ))}
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next review"
              className="focus-ring flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-border-strong text-ink transition-colors hover:border-accent hover:bg-accent hover:text-on-accent sm:h-9 sm:w-9"
            >
              <ChevronRight size={16} aria-hidden />
            </button>
          </div>
        )}
      </figure>
    </div>
  );
}

/**
 * Reviews, on one screen: heading and rating badge, the written reviews as a
 * shuffling featured deck that takes the spare height, and the short ones on a
 * slow rail along the bottom (paused on hover; static under reduced motion).
 * The rail duplicates its cards for a seamless loop — the copy is
 * aria-hidden, so each review is announced once.
 */
export function Testimonials({ index }: { index?: number }) {
  const ordered = [...testimonials].sort((a, b) => b.text.length - a.text.length);
  // Reviews with a full sentence take turns as the featured quote; the short
  // ones ride the rail below. Every review appears exactly once.
  const deck = ordered.filter((t) => t.text.length > 25).slice(0, 4);
  const rest = ordered.filter((t) => !deck.includes(t));

  return (
    <Screen id="reviews" labelledBy="reviews-heading" containerClassName="max-w-none px-0 sm:px-0">
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-5 lg:flex-row lg:items-end">
          <SectionHeading
            id="reviews-heading"
            index={index}
            eyebrow={content.reviews.eyebrow}
            heading={content.reviews.heading}
            intro={content.reviews.intro}
            introClassName="hidden sm:block"
            className="max-w-2xl"
          />
          <Reveal index={1} className="[@media(max-height:760px)]:hidden lg:block">
            <RatingBadge />
          </Reveal>
        </div>

        {deck.length > 0 && (
          <Reveal variant="rise" className="mt-[clamp(1.25rem,3.5svh,2.25rem)] flex flex-1">
            <ReviewDeck deck={deck} />
          </Reveal>
        )}
      </div>

      {/* Rail runs edge to edge, faded at both ends. */}
      <div className="mt-[clamp(0.75rem,2.5svh,1.5rem)] shrink-0 [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
        <Marquee duration={60} gap={16} className="py-1 sm:py-2">
          {rest.map((t) => (
            <ReviewCard key={t.name + t.date} t={t} />
          ))}
        </Marquee>
      </div>
    </Screen>
  );
}
