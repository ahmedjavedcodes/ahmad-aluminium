"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import { content } from "@/data/content";
import { site, cityName, whatsappHref } from "@/data/site";
import { googleRating } from "@/data/testimonials";
import { Reveal } from "@/lib/motion";
import { workItems, WORK_HREF } from "@/lib/work";
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
 * portfolio wall filling the rest of the viewport. Every frame opens a
 * project viewer (Radix dialog, arrow-key navigation); /work#<project> opens
 * it directly, which is how the home page's frames land here. Below, each
 * project gets a full row with its scope and a quote button.
 */
export function WorkShowcase({ crumbs }: { crumbs: { href: string; label: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const [trades, , areas] = content.stats;
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

  const step = useCallback(
    (d: number) => setOpen((cur) => {
      if (cur === null) return cur;
      const next = (cur + d + workItems.length) % workItems.length;
      window.history.replaceState(null, "", `${WORK_HREF}#${workItems[next].id}`);
      return next;
    }),
    []
  );

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
              <Typewriter text={accent} className="text-accent" delay={0.9} speed={110} />
              {tail}
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
      <section aria-label="Projects in detail" className="relative py-[clamp(4rem,10svh,7rem)]">
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
                      sizes="(min-width: 1024px) 58vw, 100vw"
                      className="object-cover transition-transform duration-[1400ms] ease-out-expo group-hover:scale-[1.06]"
                    />
                  <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 font-mono text-[11px] font-medium tracking-[0.12em] text-ink">
                    {String(i + 1).padStart(2, "0")} / {String(workItems.length).padStart(2, "0")}
                  </span>
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

      {/* Viewer */}
      <Dialog open={open !== null} onOpenChange={(o) => !o && show(null)}>
        <DialogContent
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") step(1);
            if (e.key === "ArrowLeft") step(-1);
          }}
        >
          {current && (
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="relative aspect-[4/3] bg-bg-sunken lg:col-span-7 lg:aspect-auto lg:min-h-[32rem]">
                <Image key={current.id} src={current.image} alt={current.alt} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
                <div className="absolute inset-x-3 bottom-3 flex justify-between">
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label="Previous project"
                    className="focus-ring flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/90 text-ink shadow-card transition-colors hover:bg-accent hover:text-on-accent"
                  >
                    <ChevronLeft size={20} aria-hidden />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label="Next project"
                    className="focus-ring flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/90 text-ink shadow-card transition-colors hover:bg-accent hover:text-on-accent"
                  >
                    <ChevronRight size={20} aria-hidden />
                  </button>
                </div>
              </div>
              <div className="flex flex-col p-6 sm:p-8 lg:col-span-5">
                <p className="font-mono text-[11px] tracking-[0.14em] text-ink-subtle">
                  {String((open ?? 0) + 1).padStart(2, "0")} / {String(workItems.length).padStart(2, "0")} ·{" "}
                  {[current.client, current.location ?? cityName, current.year].filter(Boolean).join(" · ")}
                </p>
                <DialogTitle className="mt-3 font-display text-3xl font-extrabold leading-tight tracking-[-0.035em] text-ink">
                  {current.title}
                </DialogTitle>
                <DialogDescription className="mt-2 text-base text-ink-muted">
                  {current.tagline ?? content.gallery.heading.lead + " " + content.gallery.heading.accent + "."}
                </DialogDescription>
                {current.items.length > 0 && (
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {current.items.map((it) => (
                      <li key={it} className="rounded-full border border-border px-3 py-1 text-sm text-ink">
                        {it}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-auto flex flex-col gap-2.5 pt-8">
                  <Button asChild size="lg">
                    <a href={quoteFor(current.title)} target="_blank" rel="noopener noreferrer">
                      <MessageCircle size={17} aria-hidden />
                      <RollText>Get a quote like this</RollText>
                    </a>
                  </Button>
                  {current.serviceHref && (
                    <Button asChild variant="outline" size="lg">
                      <Link href={current.serviceHref} onClick={() => setOpen(null)}>
                        <RollText>{current.tagline ? `About ${current.title.toLowerCase()}` : content.home.viewAllServices}</RollText>
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
