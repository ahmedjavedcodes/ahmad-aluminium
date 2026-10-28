"use client";

import { Star, Quote } from "lucide-react";
import { testimonials, googleRating, type Testimonial } from "@/data/testimonials";
import { Reveal } from "@/lib/motion";
import { SectionHeading } from "@/components/SectionHeading";
import { content } from "@/data/content";

function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
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
      className={`focus-ring group inline-flex items-center gap-2.5 rounded-full border border-border bg-bg-elevated px-3.5 py-1.5 transition-colors duration-300 hover:border-accent/40 ${className ?? ""}`}
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

function Card({ t, isFeature }: { t: Testimonial; isFeature: boolean }) {
  return (
    <figure
      className={`flex h-full flex-col rounded-2xl border p-6 transition-[border-color,box-shadow] duration-500 hover:shadow-lift ${
        isFeature
          ? "border-accent/25 bg-accent-tint hover:border-accent/45 sm:p-8"
          : "glass-panel hover:border-accent/30"
      }`}
    >
      <Quote
        size={isFeature ? 26 : 20}
        className="mb-3 shrink-0 text-accent/35"
        aria-hidden
      />
      <blockquote
        className={`flex-1 text-ink ${
          isFeature
            ? "font-display text-xl font-medium leading-snug sm:text-2xl"
            : "text-[0.95rem] leading-relaxed"
        }`}
      >
        {t.text}
      </blockquote>
      <figcaption className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
        <span className="min-w-0">
          <span className="block truncate text-sm font-medium text-ink">{t.name}</span>
          <time dateTime={t.date} className="block text-xs text-ink-subtle">
            {dateFmt.format(new Date(t.date))} · Google
          </time>
        </span>
        <Stars rating={t.rating} size={13} />
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  // Longest first so the feature tile leads and the short cells pack in behind
  // it; `grid-flow-dense` then backfills any gap the row-span leaves.
  const ordered = [...testimonials].sort((a, b) => b.text.length - a.text.length);

  return (
    <section id="reviews" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
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
              className="focus-ring glass-panel flex items-center gap-4 rounded-2xl px-5 py-4 transition-colors duration-300 hover:border-accent/40"
            >
              <span className="font-display text-4xl font-semibold leading-none text-accent">
                {googleRating.value.toFixed(1)}
              </span>
              <span>
                <Stars rating={5} />
                <span className="mt-1 block text-xs text-ink-muted">
                  {googleRating.count} reviews on Google
                </span>
              </span>
            </a>
          </Reveal>
        </div>

        <ul className="mt-12 grid grid-flow-dense grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[minmax(0,1fr)]">
          {ordered.map((t, i) => (
            <Reveal
              key={t.name + t.date}
              index={i}
              as="li"
              className={`h-full ${tileClass(t.text, i === 0)}`}
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
            className="focus-ring link-underline text-sm font-medium text-accent"
          >
            Read all {googleRating.count} reviews on Google
          </a>
        </Reveal>
      </div>
    </section>
  );
}
