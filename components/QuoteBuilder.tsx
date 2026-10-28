"use client";

import { useId, useMemo, useState } from "react";
import { Check, ChevronDown, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { services } from "@/data/services";
import { content } from "@/data/content";
import { site, cityName, telHref, whatsappHref } from "@/data/site";
import { buildQuoteMessage } from "@/lib/quote";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/lib/motion";
import { Button, RollText, ArrowSwap } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Screen } from "@/components/Screen";

const OTHER_AREA = "__other";

/**
 * Three-step quote request that ends in WhatsApp.
 *
 * This deliberately is not a form that posts anywhere. As the contact page
 * notes, a submitted form needs a delivery backend or leads get silently
 * dropped, and customers here already use WhatsApp. So the builder only
 * *composes* the enquiry — trades, area, a few details — shows exactly what
 * will be sent, and opens WhatsApp with it pre-written. One tap to send, and
 * the workshop receives a structured request instead of a bare "hi".
 *
 * QuoteForm is the builder itself — trades, area and details on the left, the
 * live message and send button on the right — used by the quote section below
 * and as the first thing on the contact page.
 */
export function QuoteForm({
  defaultService,
  className,
}: {
  /** Slug of a service to pre-select (used on service pages). */
  defaultService?: string;
  className?: string;
}) {
  const ids = useId();
  const [selected, setSelected] = useState<string[]>(defaultService ? [defaultService] : []);
  const [area, setArea] = useState("");
  const [details, setDetails] = useState("");
  const [sent, setSent] = useState(false);

  const titles = useMemo(
    () => services.filter((s) => selected.includes(s.slug)).map((s) => s.title),
    [selected]
  );
  const message = buildQuoteMessage({
    services: titles,
    area: area === OTHER_AREA ? "" : area,
    details,
  });

  const toggle = (slug: string) =>
    setSelected((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));

  const stepLabel = "text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-subtle";

  return (
        <div className={cn("grid grid-cols-1 gap-3 md:grid-cols-12 md:gap-5", className)}>
          {/* Builder */}
          <Reveal index={1} className="md:col-span-7">
            <div className="panel flex h-full flex-col rounded-[clamp(1.25rem,3svh,2rem)] p-[clamp(1rem,3svh,2rem)]">
              <fieldset>
                <legend className="flex w-full items-baseline justify-between gap-3">
                  <span className="font-display text-[length:clamp(1.05rem,2.6svh,1.3rem)] font-bold text-ink">
                    What do you need?
                  </span>
                  <span className={stepLabel}>Step 01</span>
                </legend>
                <p className="mt-1 hidden text-sm text-ink-muted sm:block">Choose one or more trades.</p>
                <div className="mt-[clamp(0.75rem,2svh,1.25rem)] grid grid-cols-2 gap-2 sm:gap-2.5 xl:grid-cols-3">
                  {services.map((s) => {
                    const on = selected.includes(s.slug);
                    return (
                      <button
                        key={s.slug}
                        type="button"
                        aria-pressed={on}
                        onClick={() => toggle(s.slug)}
                        className={cn(
                          "focus-ring group flex min-h-11 cursor-pointer items-center gap-2.5 rounded-xl border px-3 py-2 text-left text-[13px] sm:text-sm transition-[border-color,background-color,color,transform,box-shadow] duration-300 hover:-translate-y-0.5 active:scale-[0.98]",
                          on
                            ? "border-accent/70 bg-accent-tint text-ink shadow-[0_8px_20px_-12px_rgb(var(--color-accent)/0.6)]"
                            : "border-border bg-surface text-ink-muted hover:border-border-strong hover:text-ink"
                        )}
                      >
                        <span
                          aria-hidden
                          className={cn(
                            "flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors duration-300",
                            on ? "border-accent bg-accent text-on-accent" : "border-border-strong"
                          )}
                        >
                          {on && <Check size={13} strokeWidth={3} />}
                        </span>
                        <span className="font-medium">{s.title}</span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <div className="mt-[clamp(1rem,3svh,2rem)] grid flex-1 grid-cols-2 gap-[clamp(0.6rem,2.5svh,1.5rem)]">
                <div>
                  <label htmlFor={`${ids}-area`} className="flex items-baseline justify-between gap-3">
                    <span className="font-display text-[length:clamp(1.05rem,2.6svh,1.3rem)] font-bold text-ink">Where is the site?</span>
                    <span className={stepLabel}>02</span>
                  </label>
                  <div className="relative mt-2.5">
                    <select
                      id={`${ids}-area`}
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      className="focus-ring h-12 w-full cursor-pointer appearance-none rounded-xl border border-border-strong bg-bg-elevated px-3 pr-9 text-sm sm:px-3.5 sm:pr-10 sm:text-[15px] text-ink transition-colors hover:border-accent/50 focus:border-accent focus:outline-none"
                    >
                      <option value="">Choose area</option>
                      {content.areas.list.map((a) => (
                        <option key={a} value={a}>
                          {a}
                        </option>
                      ))}
                      <option value={OTHER_AREA}>Somewhere else in {cityName}</option>
                    </select>
                    <ChevronDown
                      size={16}
                      aria-hidden
                      className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-subtle"
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label htmlFor={`${ids}-details`} className="flex items-baseline justify-between gap-3">
                    <span className="font-display text-[length:clamp(1.05rem,2.6svh,1.3rem)] font-bold text-ink">
                      Details <span className="text-sm font-normal text-ink-subtle">(optional)</span>
                    </span>
                    <span className={stepLabel}>03</span>
                  </label>
                  <textarea
                    id={`${ids}-details`}
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    maxLength={500}
                    rows={2}
                    placeholder="Sizes, quantities, finish, timeline…"
                    className="focus-ring mt-2.5 block min-h-[4.5rem] w-full flex-1 resize-none rounded-xl border border-border-strong bg-bg-elevated px-3.5 py-3 text-[15px] text-ink placeholder:text-ink-subtle transition-colors hover:border-accent/50 focus:border-accent focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </Reveal>

          {/* Live preview + send */}
          <Reveal index={2} className="md:col-span-5">
            <div className="theme-inverse crop-marks relative flex h-full flex-col overflow-hidden rounded-[1.5rem] shadow-deep">
              <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/25 blur-[90px]" />
              <div className="relative hidden items-center justify-between border-b border-border px-5 py-3 sm:flex">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-subtle">
                  Your message
                </span>
                <span className="flex items-center gap-1.5 font-mono text-[11px] text-ink-subtle">
                  <MessageCircle size={12} className="text-accent" aria-hidden />
                  {site.phoneLocal}
                </span>
              </div>

              <div className="relative hidden flex-1 px-5 py-[clamp(0.75rem,2.5svh,1.25rem)] sm:block" aria-live="polite">
                <div className="rounded-2xl rounded-tr-sm border border-accent/25 bg-accent-tint p-4">
                  <p key={message} className="message-in whitespace-pre-wrap break-words font-mono text-[13px] leading-relaxed text-ink">
                    {message}
                  </p>
                </div>
                <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-ink-muted">
                  <ShieldCheck size={14} className="mt-px shrink-0 text-teal" aria-hidden />
                  Nothing is sent until you press send in WhatsApp. You can edit the message there too.
                </p>
              </div>

              <div className="relative flex flex-col gap-2 p-3 sm:border-t sm:border-border sm:p-4">
                {/* Click → success: the label swaps to a confirmation while
                    WhatsApp opens in a new tab, then resets. Both labels share
                    one grid cell, so the button never changes size. */}
                <Button asChild size="lg" className="w-full">
                  <a
                    href={whatsappHref(message)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      setSent(true);
                      window.setTimeout(() => setSent(false), 2600);
                    }}
                  >
                    <span className="grid">
                      <span
                        className={cn(
                          "col-start-1 row-start-1 flex items-center justify-center gap-2.5 transition-[opacity,transform] duration-300",
                          sent ? "-translate-y-2 opacity-0" : "opacity-100"
                        )}
                      >
                        <MessageCircle size={17} aria-hidden />
                        <RollText>{content.hero.ctaPrimary}</RollText>
                        <ArrowSwap size={16} />
                      </span>
                      <span
                        aria-hidden={!sent}
                        className={cn(
                          "col-start-1 row-start-1 flex items-center justify-center gap-2 transition-[opacity,transform] duration-300",
                          sent ? "opacity-100" : "translate-y-2 opacity-0"
                        )}
                      >
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/25">
                          <Check size={13} strokeWidth={3} aria-hidden />
                        </span>
                        Opening WhatsApp
                      </span>
                    </span>
                  </a>
                </Button>
                <span role="status" className="sr-only">
                  {sent ? "Opening WhatsApp with your message." : ""}
                </span>
                <Button asChild variant="ghost" className="hidden w-full sm:inline-flex">
                  <a href={telHref}>
                    <Phone size={15} className="text-accent" aria-hidden />
                    Prefer to talk? Call {site.phoneLocal}
                  </a>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
  );
}

/** Home and service-page section: heading, then the form, on one screen. */
export function QuoteBuilder({
  defaultService,
  index,
  className,
}: {
  /** Slug of a service to pre-select (used on service pages). */
  defaultService?: string;
  /** Section number for the eyebrow. */
  index?: number;
  className?: string;
}) {
  return (
    <Screen
      id="quote"
      labelledBy="quote-heading"
      reserveActionBar={false}
      className={className}
      background={<div aria-hidden className="blueprint absolute inset-0 -z-10 opacity-50" />}
    >
      <SectionHeading
        id="quote-heading"
        index={index}
        eyebrow="Free quotation"
        heading={{ lead: "Tell us about", accent: "the job", tail: "." }}
        intro={`Choose the work and your area in ${cityName}. We'll open WhatsApp with your request already written. Check it, press send, and we'll reply with next steps.`}
        introClassName="hidden sm:block"
        className="max-w-2xl"
      />
      <QuoteForm defaultService={defaultService} className="mt-[clamp(1.25rem,4svh,2.5rem)] flex-1" />
    </Screen>
  );
}
