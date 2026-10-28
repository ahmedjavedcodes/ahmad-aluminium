"use client";

import Image from "next/image";
import { Check, Phone, Clock } from "lucide-react";
import type { Service } from "@/data/services";
import { content } from "@/data/content";
import { site, cityName, telHref, whatsappHref } from "@/data/site";
import { Reveal } from "@/lib/motion";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { ServiceCard, iconMap } from "@/components/ServicesGrid";
import { ServiceAreas } from "@/components/ServiceAreas";
import { FAQ } from "@/components/FAQ";
import { QuoteBuilder } from "@/components/QuoteBuilder";
import { RatingBadge } from "@/components/Testimonials";
import { Button, RollText, ArrowSwap } from "@/components/ui/button";

const h2Class = "font-display text-2xl font-bold tracking-[-0.02em] text-ink sm:text-[1.75rem]";

export function ServiceDetail({ service, related }: { service: Service; related: Service[] }) {
  const Icon = iconMap[service.icon];

  return (
    <>
      <section className="relative pb-8 pt-16 sm:pt-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              {/* Direct answer block — deliberately the first prose on the page so
                  the trade, the city and the provider are all captured in the
                  opening sentence a search snippet or AI assistant will quote. */}
              <Reveal>
                <p className="border-l-2 border-accent pl-5 text-lg leading-relaxed text-ink sm:text-xl">
                  {service.answer}
                </p>
                <p className="mt-6 leading-relaxed text-ink-muted">{service.description}</p>
              </Reveal>

              <Reveal index={1} className="mt-14">
                <h2 className={h2Class}>{content.serviceDetail.atAGlance}</h2>
                <dl className="panel mt-6 divide-y divide-border overflow-hidden rounded-[1.5rem]">
                  {service.specs.map((spec) => (
                    <div key={spec.label} className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:gap-6">
                      <dt className="w-48 shrink-0 font-mono text-[12px] uppercase tracking-[0.12em] text-ink-subtle">
                        {spec.label}
                      </dt>
                      <dd className="text-sm text-ink">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>

              <Reveal index={2} className="mt-14">
                <h2 className={h2Class}>{content.serviceDetail.whatsIncluded}</h2>
                <ul className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {service.items.map((item) => (
                    <li
                      key={item}
                      className="panel flex items-center gap-3 rounded-2xl px-4 py-3.5 transition-[transform,box-shadow] duration-500 ease-out-expo hover:-translate-y-0.5 hover:shadow-card"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-on-accent">
                        <Check size={14} strokeWidth={3} aria-hidden />
                      </span>
                      <span className="text-sm text-ink">{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal index={3} className="mt-14">
                <h2 className={h2Class}>{content.serviceDetail.whyChooseUs(service.title)}</h2>
                <ul className="mt-6 flex flex-wrap gap-2.5">
                  {service.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-center gap-2.5 rounded-full border border-border bg-bg-elevated px-4 py-2 text-sm text-ink shadow-card"
                    >
                      <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-accent" />
                      {h}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal index={4} className="mt-14">
                <h2 className={h2Class}>{content.serviceDetail.areasHeading(service.title)}</h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  We deliver {service.title.toLowerCase()} across {cityName}, including:
                </p>
                <div className="mt-5">
                  <ServiceAreas compact />
                </div>
              </Reveal>
            </div>

            {/* Sticky quote card */}
            <div className="lg:col-span-5">
              <Reveal index={1} variant="scale" className="lg:sticky lg:top-28">
                <div className="glass-panel crop-marks overflow-hidden rounded-[1.75rem]">
                  <div className="relative h-52 w-full">
                    <Image
                      src={service.image}
                      alt={`${service.heading}: ${service.tagline}`}
                      fill
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                    <span className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/85 text-accent">
                      <Icon size={20} aria-hidden />
                    </span>
                    <span className="absolute bottom-4 left-4 font-mono text-[11px] uppercase tracking-[0.16em] text-white/90">
                      {service.title} · {cityName}
                    </span>
                  </div>
                  <div className="p-6 sm:p-7">
                    <h2 className="font-display text-xl font-bold tracking-[-0.015em] text-ink">
                      {content.serviceDetail.getFreeQuote(service.title)}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                      {content.serviceDetail.quoteBody}
                    </p>
                    <MagneticButton className="mt-6 block w-full" strength={0.12}>
                      <Button asChild size="lg" className="w-full">
                        <a
                          href={whatsappHref(
                            `Hi ${site.name}, I'd like a quotation for ${service.title.toLowerCase()}. My area in ${cityName} is: `
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <RollText>{content.serviceDetail.requestQuotation}</RollText>
                          <ArrowSwap size={16} />
                        </a>
                      </Button>
                    </MagneticButton>
                    <Button asChild variant="outline" className="mt-2.5 w-full">
                      <a href={telHref}>
                        <Phone size={15} className="text-accent" aria-hidden />
                        <span className="font-mono">{site.phoneLocal}</span>
                      </a>
                    </Button>
                    <div className="mt-5 flex flex-col gap-3 border-t border-border pt-5">
                      <RatingBadge className="w-fit" />
                      <p className="flex items-center gap-2 text-xs text-ink-muted">
                        <Clock size={13} className="shrink-0 text-teal" aria-hidden />
                        {site.hours}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Per-service FAQ — question-shaped content is what AI assistants
              extract when answering "how much / how long / can you…" queries. */}
          <div className="mt-20 max-w-3xl">
            <FAQ items={service.faqs} headingText={content.serviceDetail.faqHeading(service.title)} />
          </div>
        </div>
      </section>

      <QuoteBuilder defaultService={service.slug} />

      {related.length > 0 && (
        <section className="relative pb-16">
          <div className="mx-auto max-w-7xl border-t border-border px-5 pt-16 sm:px-8">
            <Reveal>
              <h2 className="font-display text-2xl font-bold tracking-[-0.02em] text-ink sm:text-3xl">
                {content.serviceDetail.otherServices}
              </h2>
            </Reveal>
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
              {related.map((s, i) => (
                <ServiceCard key={s.slug} service={s} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
