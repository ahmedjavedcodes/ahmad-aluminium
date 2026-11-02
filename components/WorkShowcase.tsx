"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { content } from "@/data/content";
import { site, cityName, whatsappHref } from "@/data/site";
import { googleRating } from "@/data/testimonials";
import { Reveal } from "@/lib/motion";
import { workItems, WORK_HREF, type WorkItem } from "@/lib/work";
import { Screen } from "@/components/Screen";
import { WorkWall } from "@/components/WorkWall";
import { CharReveal } from "@/components/motion/CharReveal";
import { Typewriter } from "@/components/motion/Typewriter";
import { Counter } from "@/components/motion/Counter";
import { Button, RollText, ArrowSwap } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const quoteFor = (title: string) =>
  whatsappHref(`Hi ${site.name}, I'd like a free quotation for work like your ${title.toLowerCase()} project. My area in ${cityName} is: `);

/**
 * The /work page body.
 *
 * First screen: breadcrumb, the "Craftsmanship you can see." headline
 * (letters cascade in, the accent word is typed), three counters, and the
 * portfolio wall filling the rest of the viewport. Every frame opens that
 * project's photos in a swipeable carousel (Radix dialog, arrow keys move
 * between photos); /work#<project> opens it directly, which is how the home
 * page's frames land here. Below, each project gets a full row with its
 * description, scope and a quote button.
 */
export function WorkShowcase({ crumbs }: { crumbs: { href: string; label: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const [trades] = content.stats;
  const { lead, accent, tail } = content.gallery.heading;

  // Deep link: /work#<id> opens that project.
  useEffect(() => {
    const fromHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      const i = workItems.findIndex((w) => w.id === id);
      if (i >= 0) setOpen(i);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  const show = useCallback((i: number | null) => {
    setOpen(i);
    const hash = i === null ? "" : `#${workItems[i].id}`;
    window.history.replaceState(null, "", `${WORK_HREF}${hash}`);
  }, []);

  const current = open === null ? null : workItems[open];

  return (
    <>
      <Screen
        id="work"
        labelledBy="work-page-heading"
        background={
          <>
            <div aria-hidden className="blueprint absolute inset-0 -z-10" />
            <div aria-hidden className="absolute -right-40 -top-20 -z-10 h-[560px] w-[560px] rounded-full bg-accent/[0.11] blur-[130px]" />
          </>
        }
      >
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <nav aria-label="Breadcrumb" className="mb-[clamp(0.5rem,1.6svh,1rem)] hidden flex-wrap items-center gap-x-2 text-[12px] font-medium text-ink-subtle sm:flex">
                {crumbs.map((c, i) => (
                  <span key={c.href} className="flex items-center gap-2">
                    {i > 0 && <ChevronRight size={12} className="text-ink-subtle/60" aria-hidden />}
                    {i === crumbs.length - 1 ? (
                      <span aria-current="page" className="font-semibold text-accent-deep">{c.label}</span>
                    ) : (
                      <Link href={c.href} className="focus-ring link-underline rounded transition-colors hover:text-ink">{c.label}</Link>
                    )}
                  </span>
                ))}
              </nav>
            </Reveal>
            <h1
              id="work-page-heading"
              className="font-display text-[length:clamp(2rem,min(5.4vw,7svh),4.75rem)] font-extrabold leading-[1] tracking-[-0.045em] text-ink"
            >
              <CharReveal text={lead} trigger="mount" />{" "}
              <Typewriter text={accent} className="text-accent" delay={0.9} speed={110} suffix={tail} />
            </h1>
          </div>

          {/* Counters */}
          <Reveal index={2} className="grid shrink-0 grid-cols-3 gap-2 sm:gap-3">
            {[
              { node: <Counter value={workItems.length} />, label: "Projects shown" },
              { node: <><Counter value={trades.value} />{trades.suffix}</>, label: "Trades" },
              { node: <><Counter value={googleRating.value} decimals={1} /></>, label: "Google rating" },
            ].map((s, i) => (
              <div key={s.label} className={cn("rounded-2xl px-4 py-3 sm:px-5", i === 2 ? "theme-inverse" : "panel")}>
                <p className="font-display text-[length:clamp(1.5rem,4svh,2.25rem)] font-extrabold leading-none tracking-[-0.04em] text-ink">
                  {s.node}
                </p>
                <p className="mt-1 text-[11px] font-medium text-ink-muted">{s.label}</p>
              </div>
            ))}
          </Reveal>
        </div>

        <WorkWall onOpen={(i) => show(i)} className="mt-[clamp(1rem,3.5svh,2rem)] min-h-[20rem] flex-1" />
        <p className="mt-3 text-xs text-ink-subtle lg:hidden">Swipe for more · tap a project to open it</p>
      </Screen>

      {/* Project rows */}
      <section aria-label="Projects in detail" className="relative py-[clamp(4rem,10svh,7rem)] max-sm:py-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-[clamp(3rem,9svh,6rem)] px-5 sm:px-8">
          {workItems.map((item, i) => (
            <article key={item.id} id={`project-${item.id}`} className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-14">
              <Reveal
                variant="clip"
                className={cn("lg:col-span-7", i % 2 === 1 && "lg:order-2")}
              >
                <button
                  type="button"
                  onClick={() => show(i)}
                  aria-label={`View project: ${item.title}`}
                  aria-haspopup="dialog"
                  className="focus-ring group relative block aspect-[16/10] w-full cursor-zoom-in overflow-hidden rounded-[2rem] bg-bg-sunken shadow-deep"
                >
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="(min-width: 1024px) 58vw, (min-width: 640px) 100vw, 70vw"
                      className="object-cover transition-transform duration-[1400ms] ease-out-expo group-hover:scale-[1.06]"
                    />
                  <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 font-mono text-[11px] font-medium tracking-[0.12em] text-ink">
                    {String(i + 1).padStart(2, "0")} / {String(workItems.length).padStart(2, "0")}
                  </span>
                  {item.photos.length > 1 && (
                    <span className="absolute right-5 top-5 rounded-full bg-black/60 px-3 py-1 text-[12px] font-semibold text-white backdrop-blur">
                      {item.photos.length} photos
                    </span>
                  )}
                </button>
              </Reveal>

              <div className={cn("lg:col-span-5", i % 2 === 1 && "lg:order-1")}>
                <Reveal>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-accent-deep">
                    {[item.client, item.location ?? cityName, item.year].filter(Boolean).join(" · ")}
                  </p>
                  <h2 className="mt-3 font-display text-[length:clamp(1.9rem,4vw,3rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-ink">
                    {item.title}
                  </h2>
                  {item.tagline && <p className="mt-3 text-lg font-medium text-ink-muted">{item.tagline}</p>}
                  {item.description && <p className="mt-4 leading-relaxed text-ink-muted">{item.description}</p>}
                </Reveal>
                {item.items.length > 0 && (
                  <Reveal index={1}>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {item.items.slice(0, 6).map((it) => (
                        <li key={it} className="rounded-full border border-border bg-bg-elevated px-3.5 py-1.5 text-sm text-ink shadow-card">
                          {it}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                )}
                <Reveal index={2} className="mt-8 flex flex-wrap gap-3">
                  <Button asChild>
                    <a href={quoteFor(item.title)} target="_blank" rel="noopener noreferrer">
                      <RollText>Get a quote like this</RollText>
                      <ArrowSwap size={16} />
                    </a>
                  </Button>
                  {item.serviceHref && (
                    <Button asChild variant="outline">
                      <Link href={item.serviceHref}>
                        <RollText>{item.tagline ? `About ${item.title.toLowerCase()}` : content.home.viewAllServices}</RollText>
                      </Link>
                    </Button>
                  )}
                </Reveal>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Viewer: the project's photos only, Instagram-style. Swipe (or use
          the arrows / arrow keys) between them; the counter appears from the
          second photo on, since the first is the overall view. */}
      <Dialog open={open !== null} onOpenChange={(o) => !o && show(null)}>
        <DialogContent
          className="flex h-[min(92svh,860px)] max-w-6xl flex-col overflow-hidden bg-black p-0 max-sm:h-[100svh] max-sm:max-h-none max-sm:w-full max-sm:rounded-none"
          onOpenAutoFocus={(e) => {
            e.preventDefault();
            (e.currentTarget as HTMLElement).focus();
          }}
        >
          {current && <PhotoCarousel key={current.id} item={current} />}
        </DialogContent>
      </Dialog>
    </>
  );
}

/**
 * Scroll-snap carousel of one project's photos. Native horizontal scrolling
 * gives phones a real swipe; buttons and arrow keys scroll the same track.
 */
function PhotoCarousel({ item }: { item: WorkItem }) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const total = item.photos.length;

  const go = useCallback(
    (i: number) => {
      const el = track.current;
      if (!el) return;
      const next = Math.max(0, Math.min(total - 1, i));
      el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
      setIndex(next);
    },
    [total]
  );

  // Arrow keys move between photos while the viewer is open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") { e.preventDefault(); go(index + 1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); go(index - 1); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, index]);

  const onScroll = () => {
    const el = track.current;
    if (!el || !el.clientWidth) return;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    if (i !== index) setIndex(i);
  };

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <DialogTitle className="sr-only">{item.title}</DialogTitle>
      <DialogDescription className="sr-only">
        {`Photo ${index + 1} of ${total}. ${item.photos[index]?.alt ?? ""}`}
      </DialogDescription>

      <div
        ref={track}
        onScroll={onScroll}
        className="flex min-h-0 flex-1 snap-x snap-mandatory overflow-x-auto overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-roledescription="carousel"
        aria-label={`${item.title} photos`}
      >
        {item.photos.map((photo, i) => (
          <div
            key={photo.src}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${total}`}
            className="relative h-full w-full shrink-0 snap-center [scroll-snap-stop:always]"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              priority={i === 0}
              sizes="(min-width: 1152px) 1152px, 100vw"
              className="select-none object-contain"
              draggable={false}
            />
          </div>
        ))}
      </div>

      {index > 0 && (
        <span aria-hidden className="absolute left-3 top-3 rounded-full bg-black/65 px-3 py-1.5 font-mono text-[13px] font-semibold text-white backdrop-blur">
          {index + 1}/{total}
        </span>
      )}

      {total > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(index - 1)}
            disabled={index === 0}
            aria-label="Previous photo"
            className="focus-ring absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 text-ink shadow-card transition-[opacity,colors] hover:bg-accent hover:text-on-accent disabled:pointer-events-none disabled:opacity-0 max-sm:hidden"
          >
            <ChevronLeft size={20} aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            disabled={index === total - 1}
            aria-label="Next photo"
            className="focus-ring absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 text-ink shadow-card transition-[opacity,colors] hover:bg-accent hover:text-on-accent disabled:pointer-events-none disabled:opacity-0 max-sm:hidden"
          >
            <ChevronRight size={20} aria-hidden />
          </button>
          <div aria-hidden className="flex shrink-0 justify-center gap-1.5 py-3.5">
            {item.photos.map((p, i) => (
              <span
                key={p.src}
                className={cn(
                  "h-1.5 w-1.5 rounded-full transition-[background-color,transform] duration-300",
                  i === index ? "scale-125 bg-white" : "bg-white/35"
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
