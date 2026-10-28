"use client";

import { useId, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { services } from "@/data/services";
import { content } from "@/data/content";
import { site, cityName, telHref, whatsappHref } from "@/data/site";
import { buildQuoteMessage } from "@/lib/quote";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/lib/motion";
import { Button, RollText, ArrowSwap } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
 */
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
  const ids = useId();
  const [selected, setSelected] = useState<string[]>(defaultService ? [defaultService] : []);
  const [area, setArea] = useState("");
  const [details, setDetails] = useState("");

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

  const stepLabel = "font-mono text-[11px] uppercase tracking-[0.18em] text-ink-subtle";

  return (
    <section id="quote" className={cn("relative isolate scroll-mt-24 py-24 sm:py-28", className)}>
      <div aria-hidden className="blueprint absolute inset-0 -z-10 opacity-50" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index={index}
          eyebrow="Free quotation"
          heading={{ lead: "Tell us about", accent: "the job", tail: "." }}
          intro={`Pick the work and your area in ${cityName}. We'll open WhatsApp with your request written out — check it, press send, and the workshop replies with next steps.`}
          className="max-w-2xl"
        />

        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* Builder */}
          <Reveal index={1} className="lg:col-span-7">
            <div className="panel h-full rounded-[1.5rem] p-5 sm:p-8">
              <fieldset>
                <legend className="flex w-full items-baseline justify-between gap-3">
                  <span className="font-display text-xl font-semibold text-ink">
                    What do you need?
                  </span>
                  <span className={stepLabel}>Step 01</span>
                </legend>
                <p className="mt-1 text-sm text-ink-muted">Choose one or more trades.</p>
                <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {services.map((s) => {
                    const on = selected.includes(s.slug);
                    return (
                      <button
                        key={s.slug}
                        type="button"
                        aria-pressed={on}
                        onClick={() => toggle(s.slug)}
                        className={cn(
                          "focus-ring group flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border px-3.5 py-3 text-left text-sm transition-[border-color,background-color,color,transform,box-shadow] duration-300 hover:-translate-y-0.5 active:scale-[0.98]",
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

              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor={`${ids}-area`} className="flex items-baseline justify-between gap-3">
                    <span className="font-display text-xl font-semibold text-ink">Where is the site?</span>
                    <span className={stepLabel}>02</span>
                  </label>
                  <div className="relative mt-3">
                    <select
                      id={`${ids}-area`}
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      className="focus-ring h-12 w-full cursor-pointer appearance-none rounded-xl border border-border-strong bg-bg-elevated px-3.5 pr-10 text-[15px] text-ink transition-colors hover:border-accent/50 focus:border-accent focus:outline-none"
                    >
                      <option value="">Select your area</option>
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

                <div>
                  <label htmlFor={`${ids}-details`} className="flex items-baseline justify-between gap-3">
                    <span className="font-display text-xl font-semibold text-ink">
                      Details <span className="text-sm font-normal text-ink-subtle">(optional)</span>
                    </span>
                    <span className={stepLabel}>03</span>
                  </label>
                  <textarea
                    id={`${ids}-details`}
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    maxLength={500}
                    rows={3}
                    placeholder="Sizes, quantities, finish, timeline…"
                    className="focus-ring mt-3 block w-full resize-none rounded-xl border border-border-strong bg-bg-elevated px-3.5 py-3 text-[15px] text-ink placeholder:text-ink-subtle transition-colors hover:border-accent/50 focus:border-accent focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </Reveal>

          {/* Live preview + send */}
          <Reveal index={2} className="lg:col-span-5">
            <div className="theme-inverse crop-marks relative flex h-full flex-col overflow-hidden rounded-[1.5rem] shadow-deep">
              <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/25 blur-[90px]" />
              <div className="relative flex items-center justify-between border-b border-border px-5 py-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-subtle">
                  Your message
                </span>
                <span className="flex items-center gap-1.5 font-mono text-[11px] text-ink-subtle">
                  <MessageCircle size={12} className="text-accent" aria-hidden />
                  {site.phoneLocal}
                </span>
              </div>

              <div className="relative flex-1 px-5 py-5" aria-live="polite">
                <div className="rounded-2xl rounded-tr-sm border border-accent/25 bg-accent-tint p-4">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.p
                      key={message}
                      initial={{ opacity: 0.4 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.25 }}
                      className="whitespace-pre-wrap break-words font-mono text-[13px] leading-relaxed text-ink"
                    >
                      {message}
                    </motion.p>
                  </AnimatePresence>
                </div>
                <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-ink-muted">
                  <ShieldCheck size={14} className="mt-px shrink-0 text-teal" aria-hidden />
                  Nothing is sent until you press send in WhatsApp. You can edit the message there too.
                </p>
              </div>

              <div className="relative flex flex-col gap-2.5 border-t border-border p-4">
                <Button asChild size="lg" className="w-full">
                  <a href={whatsappHref(message)} target="_blank" rel="noopener noreferrer">
                    <MessageCircle size={17} aria-hidden />
                    <RollText>{content.hero.ctaPrimary}</RollText>
                    <ArrowSwap size={16} />
                  </a>
                </Button>
                <Button asChild variant="ghost" className="w-full">
                  <a href={telHref}>
                    <Phone size={15} className="text-accent" aria-hidden />
                    Prefer to talk? Call {site.phoneLocal}
                  </a>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
