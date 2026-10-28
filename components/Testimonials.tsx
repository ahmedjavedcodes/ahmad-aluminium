"use client";

import { Star, Quote, ArrowUpRight } from "lucide-react";
import { testimonials, googleRating, type Testimonial } from "@/data/testimonials";
import { Reveal } from "@/lib/motion";
import { SectionHeading } from "@/components/SectionHeading";
import { Spotlight } from "@/components/motion/Spotlight";
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

/**
 * Bento tiling.
 *
 * These reviews range from nine characters to ninety-five, so a uniform grid
 * would either crop the longest or leave the short ones as mostly empty boxes.
 * The span is derived from the text length rather than hard-coded to an index,
 * so the layout still packs correctly when new reviews are added — the longest
 * becomes the feature tile, mid-length ones run double-width, and the terse
 * "Excellent work" type sit in single cells.
 */
function tileClass(text: string, isFeature: boolean): string {
  if (isFeature) return "sm:col-span-2 lg:col-span-2 lg:row-span-2";
  if (text.length > 25) return "sm:col-span-2";
  return "";
}

/** Review text is rendered exactly as stored — never trimmed or edited. */
function Card({ t, isFeature }: { t: Testimonial; isFeature: boolean }) {
  return (
    <Spotlight className="h-full rounded-[1.5rem]">
      <figure
        className={cn(
          "hover-rim flex h-full flex-col rounded-[1.5rem] p-6 transition-[box-shadow,transform] duration-700 ease-out-expo hover:-translate-y-1 sm:p-7",
          isFeature
            ? "theme-inverse relative overflow-hidden hover:shadow-copper-rim sm:p-9"
            : "panel hover:shadow-deep"
        )}
      >
        {isFeature && (
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/25 blur-[80px]"
          />
        )}
        <div className="mb-4 flex items-center justify-between gap-3">
          <Quote
            size={isFeature ? 30 : 20}
            className={cn("shrink-0", isFeature ? "text-accent" : "text-accent/50")}
            aria-hidden
          />
          <Stars rating={t.rating} size={13} />
        </div>
        <blockquote
          className={cn(
            "flex-1 text-ink",
            isFeature
              ? "relative font-display text-2xl font-semibold leading-snug tracking-[-0.02em] sm:text-[2rem]"
              : "text-[0.95rem] leading-relaxed"
          )}
        >
          {t.text}
        </blockquote>
        <figcaption className="mt-6 border-t border-border pt-4">
          <span className="flex min-w-0 items-center gap-3">
            <span
              aria-hidden
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-tint font-display text-sm font-bold text-accent-deep ring-1 ring-accent/20"
            >
              {t.name.trim().charAt(0).toUpperCase()}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-medium text-ink">{t.name}</span>
              <time dateTime={t.date} className="block font-mono text-[11px] text-ink-subtle">
                {dateFmt.format(new Date(t.date))} · Google
              </time>
            </span>
          </span>
        </figcaption>
      </figure>
    </Spotlight>
  );
}

export function Testimonials({ index }: { index?: number }) {
  // Longest first so the feature tile leads and the short cells pack in behind
  // it; `grid-flow-dense` then backfills any gap the row-span leaves.
  const ordered = [...testimonials].sort((a, b) => b.text.length - a.text.length);

  return (
    <section id="reviews" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            index={index}
            eyebrow={content.reviews.eyebrow}
            heading={content.reviews.heading}
            intro={content.reviews.intro}
            className="max-w-2xl"
          />

          <Reveal index={1}>
            <a
              href={googleRating.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring glass-panel hover-rim group flex items-center gap-5 rounded-2xl px-6 py-5 transition-[box-shadow,transform] duration-500 ease-out-expo hover:-translate-y-0.5 hover:shadow-copper-rim"
            >
              <span className="font-display text-6xl font-bold leading-none text-ink">
                {googleRating.value.toFixed(1)}
              </span>
              <span>
                <Stars rating={5} size={16} />
                <span className="mt-1.5 block font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
                  {googleRating.count} reviews on Google
                </span>
              </span>
              <ArrowUpRight
                size={18}
                aria-hidden
                className="text-ink-subtle transition-[transform,color] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
              />
            </a>
          </Reveal>
        </div>

        <ul className="mt-12 grid grid-flow-dense grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[minmax(0,1fr)]">
          {ordered.map((t, i) => (
            <Reveal
              key={t.name + t.date}
              index={i}
              variant="rise"
              as="li"
              className={cn("h-full", tileClass(t.text, i === 0))}
            >
              <Card t={t} isFeature={i === 0} />
            </Reveal>
          ))}
        </ul>

        <Reveal index={2} className="mt-8">
          <a
            href={googleRating.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring link-underline text-sm font-medium text-accent-deep"
          >
            Read all {googleRating.count} reviews on Google
          </a>
        </Reveal>
      </div>
    </section>
  );
}
