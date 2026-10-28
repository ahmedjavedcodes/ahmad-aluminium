"use client";

import { Star, Quote } from "lucide-react";
import { testimonials, googleRating, type Testimonial } from "@/data/testimonials";
import { Reveal } from "@/lib/motion";
import { SectionHeading } from "@/components/SectionHeading";
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
    <figure className="panel hover-rim group flex h-full w-[300px] shrink-0 flex-col rounded-[1.5rem] p-6 transition-[transform,box-shadow] duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-deep sm:w-[340px]">
      <div className="flex items-center justify-between">
        <Quote size={20} className="text-accent/60" aria-hidden />
        <Stars rating={t.rating} size={13} />
      </div>
      <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink">{t.text}</blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-4">
        <span
          aria-hidden
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-tint font-display text-sm font-bold text-accent-deep"
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
 * Reviews: the longest review set as a large pull quote, then the rest on
 * two slow counter-scrolling rails (paused on hover; static under reduced
 * motion). The rails duplicate their cards for a seamless loop — the copy is
 * aria-hidden, so every review is announced once.
 */
export function Testimonials({ index }: { index?: number }) {
  const ordered = [...testimonials].sort((a, b) => b.text.length - a.text.length);
  const [featured, ...rest] = ordered;
  const half = Math.ceil(rest.length / 2);
  const rails = [rest.slice(0, half), rest.slice(half)].filter((r) => r.length);

  return (
    <section id="reviews" className="relative overflow-hidden py-24 sm:py-32">
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
            <RatingBadge />
          </Reveal>
        </div>

        {featured && (
          <Reveal variant="rise" className="mt-14">
            <figure className="theme-inverse relative overflow-hidden rounded-[2rem] px-7 py-12 sm:px-14 sm:py-16">
              <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-accent/25 blur-[100px]" />
              <Quote
                aria-hidden
                className="pointer-events-none absolute -left-4 -top-6 h-40 w-40 text-white/[0.04] sm:h-56 sm:w-56"
              />
              <div className="relative grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
                <blockquote className="font-display text-[1.75rem] font-bold leading-[1.2] tracking-[-0.03em] text-ink sm:text-4xl lg:col-span-8 lg:text-[2.75rem]">
                  <span className="text-accent">&ldquo;</span>
                  {featured.text}
                  <span className="text-accent">&rdquo;</span>
                </blockquote>
                <figcaption className="flex flex-col gap-4 lg:col-span-4 lg:items-end lg:text-right">
                  <Stars rating={featured.rating} size={18} />
                  <span>
                    <span className="block text-lg font-semibold text-ink">{featured.name}</span>
                    <time dateTime={featured.date} className="block text-sm text-ink-muted">
                      {dateFmt.format(new Date(featured.date))} · Google review
                    </time>
                  </span>
                  <a
                    href={googleRating.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring group inline-flex items-center gap-2 rounded-full text-sm font-semibold text-accent-deep"
                  >
                    <RollText>{`Read all ${googleRating.count} reviews on Google`}</RollText>
                    <ArrowSwap diagonal size={15} />
                  </a>
                </figcaption>
              </div>
            </figure>
          </Reveal>
        )}
      </div>

      {/* Rails run edge to edge, faded at both ends. */}
      <div className="mt-6 flex flex-col gap-5 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        {rails.map((rail, r) => (
          <Marquee key={r} duration={48 + r * 8} reverse={r === 1} gap={20} className="py-3">
            {rail.map((t) => (
              <ReviewCard key={t.name + t.date} t={t} />
            ))}
          </Marquee>
        ))}
      </div>
    </section>
  );
}
