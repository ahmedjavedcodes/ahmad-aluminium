import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Phone, Check, Clock, MapPin, MessageCircle } from "lucide-react";
import { heroImage, services } from "@/data/services";
import { content } from "@/data/content";
import { site, cityName, telHref, whatsappHref } from "@/data/site";
import { googleRating, testimonials } from "@/data/testimonials";
import { SplitText } from "@/components/motion/SplitText";
import { Typewriter } from "@/components/motion/Typewriter";
import { CssCount } from "@/components/motion/CssCount";
import { WordRotator } from "@/components/motion/WordRotator";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Marquee } from "@/components/motion/Marquee";
import { Parallax } from "@/components/motion/Parallax";
import { Stars } from "@/components/Testimonials";
import { Button, RollText, ArrowSwap } from "@/components/ui/button";
import { QUOTE_HREF } from "@/lib/quote";

/**
 * One-screen hero.
 *
 * Copy on the left, proof on the right, and the services rail along the
 * bottom edge — all inside `100svh`. Type is sized against viewport height as
 * well as width, and the photograph tile is the flexible element: it takes
 * whatever height the copy leaves, so the hero fits above the fold on a
 * tablet or a laptop. Phones (under 640px) show everything instead: the full
 * paragraph and a 4:3 photograph, with the hero simply running longer than
 * one screen. (The paragraph names the registered company, so the full
 * legal-name lockup now lives in the footer.)
 */
export default function Hero() {
  const reviewerInitials = testimonials.slice(0, 4).map((t) => t.name.trim().charAt(0).toUpperCase());
  const [trades, , areas] = content.stats;

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-[clamp(5.25rem,11svh,7rem)]"
    >
      <div aria-hidden className="blueprint absolute inset-0 -z-10" />
      <div aria-hidden className="absolute -right-40 top-0 -z-10 hidden h-[640px] w-[640px] rounded-full bg-accent/[0.12] blur-[130px] md:block" />
      <div aria-hidden className="absolute -left-40 bottom-0 -z-10 hidden h-[520px] w-[520px] rounded-full bg-teal/[0.07] blur-[130px] md:block" />

      <div className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 grid-rows-[auto_1fr] gap-[clamp(1rem,3svh,2rem)] px-5 pb-[clamp(1rem,3.5svh,2.5rem)] sm:px-8 lg:grid-cols-12 lg:grid-rows-1 lg:gap-12">
        {/* Copy */}
        <div className="flex flex-col justify-center lg:col-span-6">
          <p
            className="enter inline-flex max-w-full items-center gap-2.5 self-start rounded-full border border-border bg-bg-elevated/80 px-3.5 py-1.5 text-[10px] font-semibold uppercase leading-relaxed tracking-[0.1em] sm:px-4 sm:text-[11px] sm:tracking-[0.12em] text-accent-deep shadow-card"
          >
            <span aria-hidden className="status-dot h-2 w-2 shrink-0 rounded-full bg-accent" />
            {/* The six trades take turns in one slot; the full list is still
                read out once for screen readers and crawlers. */}
            <span>{cityName}</span>
            <span aria-hidden>·</span>
            <WordRotator words={services.map((sv) => sv.title)} />
          </p>

          {/* Line one rises in word by word; line two is typed out after it.
              Both run on load (`mount`) — the hero is always above the fold. */}
          <h1 className="mt-[clamp(0.9rem,3svh,1.75rem)] font-display text-[length:clamp(1.85rem,min(6.2vw,6.6svh),5.25rem)] font-extrabold leading-[0.98] tracking-[-0.045em] text-ink">
            <SplitText as="span" text={content.hero.titleLine1} className="block" trigger="mount" />
            {/* Explicit space so text extraction doesn't run the lines together. */}{" "}
            <span className="block">
              <Typewriter text={content.hero.titleLine2} className="text-accent" delay={0.75} speed={48} />
            </span>
          </h1>

          <p
            style={{ "--enter-delay": "450ms" } as CSSProperties}
            className="enter mt-[clamp(0.9rem,2.6svh,1.5rem)] max-w-xl text-[length:clamp(0.8125rem,min(1.25vw,2.05svh),1.0625rem)] leading-[1.6] text-ink-muted max-sm:text-[0.875rem] sm:leading-[1.65]"
          >
            {content.hero.paragraph}
          </p>

          <div style={{ "--enter-delay": "550ms" } as CSSProperties} className="enter mt-[clamp(1rem,3svh,2rem)] flex items-center gap-3">
            <MagneticButton strength={0.2} className="min-w-0 flex-1 sm:flex-none">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <a
                  href={whatsappHref(`Hi ${site.name}, I'd like a free quotation. My area in ${cityName} is: `)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={content.hero.ctaPrimary}
                >
                  {/* Phones get the short label; the full one is the
                      accessible name everywhere. */}
                  <MessageCircle size={17} aria-hidden className="sm:hidden" />
                  <span className="sm:hidden">WhatsApp</span>
                  <span className="hidden sm:inline-flex">
                    <RollText>{content.hero.ctaPrimary}</RollText>
                  </span>
                  <ArrowSwap size={17} className="hidden sm:inline-flex" />
                </a>
              </Button>
            </MagneticButton>
            <MagneticButton strength={0.2}>
              <Button asChild size="lg" variant="outline" className="w-14 px-0 sm:w-auto sm:px-7">
                <a href={telHref} aria-label={`${content.hero.ctaSecondary} ${site.phoneLocal}`}>
                  <Phone size={17} className="text-accent" aria-hidden />
                  <span className="hidden sm:inline-flex">
                    <RollText>{content.hero.ctaSecondary}</RollText>
                  </span>
                </a>
              </Button>
            </MagneticButton>
          </div>

          {/* Trust points: shown when the window is tall enough to spare the room. */}
          <ul
            style={{ "--enter-delay": "800ms" } as CSSProperties}
            className="enter mt-7 hidden flex-wrap gap-x-6 gap-y-2.5 text-sm text-ink-muted [@media(min-height:860px)]:lg:flex"
          >
            {content.hero.trust.map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-tint text-accent">
                  <Check size={12} strokeWidth={3} aria-hidden />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Proof bento: the photograph flexes, the two tiles hold their height. */}
        <div className="flex min-h-[110px] flex-col gap-3 sm:gap-4 lg:col-span-6 lg:min-h-0">
          {/* Movement only, no fade: the photograph is the page's largest
              paint, and an opacity-0 start would delay it until hydration. */}
          <div
            style={{ "--enter-delay": "300ms" } as CSSProperties}
            className="enter-move group relative min-h-[110px] flex-1 overflow-hidden max-sm:aspect-[4/3] max-sm:flex-none rounded-[clamp(1.25rem,3svh,2rem)] bg-bg-sunken shadow-deep"
          >
            <Parallax speed={40} scale={[1.18, 1.05]} className="absolute inset-0">
              <Image
                src={heroImage}
                alt={`Aluminium and glass building facade fabricated in ${cityName}`}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, (min-width: 640px) 100vw, 70vw"
                className="object-cover transition-transform duration-[1600ms] ease-out-expo group-hover:scale-[1.03]"
              />
            </Parallax>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
            <span className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
              {content.gallery.heroLabel}
            </span>

            {/* Quote funnel on the photograph. */}
            <Link
              href={QUOTE_HREF}
              className="focus-ring glass-panel glass-solid group/q absolute inset-x-3 bottom-3 hidden items-center gap-3 rounded-2xl p-3 transition-transform duration-500 ease-out-expo hover:-translate-y-1 min-[400px]:flex sm:inset-x-auto sm:bottom-4 sm:left-4 sm:max-w-sm sm:p-4"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-on-accent">
                <Check size={17} strokeWidth={3} aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-bold text-ink">{content.hero.trust[0]}</span>
                <span className="block truncate text-xs text-ink-muted">{content.hero.trust[1]}</span>
              </span>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border-strong text-ink transition-colors duration-300 group-hover/q:border-accent group-hover/q:bg-accent group-hover/q:text-on-accent">
                <ArrowSwap size={15} />
              </span>
            </Link>
          </div>

          <div className="grid shrink-0 grid-cols-2 gap-3 sm:gap-4 lg:h-[clamp(8.5rem,21svh,12.5rem)]">
            {/* Rating */}
            <a
              href={googleRating.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ "--enter-delay": "500ms", "--enter-y": "36px" } as CSSProperties}
              className="enter focus-ring panel hover-rim group relative flex flex-col justify-between overflow-hidden gap-3 rounded-[clamp(1.25rem,3svh,2rem)] p-3.5 transition-[transform,box-shadow] duration-500 sm:p-[clamp(1rem,2.6svh,1.75rem)] ease-out-expo hover:-translate-y-1 hover:shadow-deep"
            >
              <span className="flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-subtle sm:text-[11px] sm:tracking-[0.16em]">Google rating</span>
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border-strong sm:h-8 sm:w-8 text-ink transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent">
                  <ArrowSwap diagonal size={14} />
                </span>
              </span>
              <span className="flex items-end gap-2 sm:gap-3">
                <span className="font-display text-[length:clamp(1.75rem,min(8.5vw,4.6svh),2.25rem)] sm:text-[length:clamp(2rem,4.5svh,3rem)] lg:text-[length:clamp(2.5rem,6svh,4rem)] font-extrabold leading-none tracking-[-0.05em] text-ink">
                  {googleRating.value.toFixed(1)}
                </span>
                <span className="pb-0.5 sm:pb-1">
                  <Stars rating={5} size={12} />
                  <span className="mt-1 block text-[11px] leading-tight text-ink-muted sm:text-xs">{googleRating.count} Google reviews</span>
                </span>
              </span>
              <span className="hidden items-center [@media(min-height:780px)]:lg:flex">
                {reviewerInitials.map((initial, i) => (
                  <span
                    key={i}
                    aria-hidden
                    className="-ml-2 flex h-7 w-7 items-center justify-center rounded-full border-2 border-bg-elevated bg-accent-tint text-[10px] font-bold text-accent-deep first:ml-0"
                  >
                    {initial}
                  </span>
                ))}
                <span className="ml-2.5 text-[11px] font-medium text-ink-muted">Customers in {cityName}</span>
              </span>
            </a>

            {/* Figures. Built to mirror the rating tile beside it: label and
                round button on top, the numbers on the bottom edge, and the
                hours/address as an extra line only when there is room. */}
            <div
              style={{ "--enter-delay": "620ms", "--enter-y": "36px" } as CSSProperties}
              className="enter theme-inverse relative flex flex-col justify-between gap-3 overflow-hidden rounded-[clamp(1.25rem,3svh,2rem)] p-3.5 sm:p-[clamp(1rem,2.6svh,1.75rem)]"
            >
              <div aria-hidden className="absolute -right-14 -top-14 h-48 w-48 rounded-full bg-accent/25 blur-[60px]" />
              <span className="relative flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-subtle sm:text-[11px] sm:tracking-[0.16em]">The workshop</span>
                <a
                  href={site.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Find the workshop on Google Maps: ${site.address.street}, ${cityName}`}
                  className="focus-ring group flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border-strong sm:h-8 sm:w-8 text-ink transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-on-accent"
                >
                  <MapPin size={14} aria-hidden />
                </a>
              </span>
              <div className="relative grid grid-cols-1 gap-1.5 sm:grid-cols-2 sm:gap-3">
                {[trades, areas].map((s) => (
                  <div key={s.label} className="flex items-center gap-2 sm:block">
                    <p className="w-[1.85em] shrink-0 font-display text-[length:clamp(1.5rem,min(6.4vw,4svh),2rem)] font-extrabold leading-none tracking-[-0.05em] text-ink sm:w-auto sm:text-[length:clamp(2rem,4.5svh,3rem)] lg:text-[length:clamp(2.5rem,6svh,4rem)]">
                      <CssCount value={s.value} delay={0.7} />
                      <span className="text-accent">{s.suffix}</span>
                    </p>
                    <p className="text-[11px] leading-tight text-ink-muted sm:mt-1.5 sm:text-xs sm:leading-snug">{s.label}</p>
                  </div>
                ))}
              </div>
              <span className="relative hidden items-center gap-2 text-[11px] text-ink-muted [@media(min-height:780px)]:lg:flex">
                <Clock size={12} className="shrink-0 text-accent" aria-hidden />
                {site.hours}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="brushed relative shrink-0 border-y border-border py-[clamp(0.7rem,1.8svh,1.1rem)]">
        <Marquee duration={44}>
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              tabIndex={-1}
              className="flex items-center gap-10 font-display text-[length:clamp(1rem,2.2svh,1.25rem)] font-bold tracking-[-0.02em] text-ink/80 transition-colors hover:text-accent"
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
