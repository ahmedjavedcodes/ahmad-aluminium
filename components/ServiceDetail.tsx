"use client";

import Image from "next/image";
import {
  Hammer,
  DoorOpen,
  Shield,
  Sparkles,
  Building2,
  Snowflake,
  Check,
  ArrowRight,
  Phone,
  type LucideIcon,
} from "lucide-react";
import type { Service, ServiceIcon } from "@/data/services";
import { content } from "@/data/content";
import { site, cityName, telHref, whatsappHref } from "@/data/site";
import { Reveal } from "@/lib/motion";
import { TiltCard } from "@/components/motion/TiltCard";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { ServiceCard } from "@/components/ServicesGrid";
import { ServiceAreas } from "@/components/ServiceAreas";
import { FAQ } from "@/components/FAQ";

const iconMap: Record<ServiceIcon, LucideIcon> = {
  hammer: Hammer,
  doorOpen: DoorOpen,
  shield: Shield,
  sparkles: Sparkles,
  building: Building2,
  snowflake: Snowflake,
};

export function ServiceDetail({ service, related }: { service: Service; related: Service[] }) {
  const Icon = iconMap[service.icon];

  return (
    <section className="relative pb-24 sm:pb-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            {/* Direct answer block — deliberately the first prose on the page so
                the trade, the city and the provider are all captured in the
                opening sentence a search snippet or AI assistant will quote. */}
            <Reveal>
              <p className="border-l-2 border-accent pl-5 text-lg leading-relaxed text-ink">
                {service.answer}
              </p>
              <p className="mt-5 leading-relaxed text-ink-muted">{service.description}</p>
            </Reveal>

            <Reveal index={1} className="mt-10">
              <h2 className="font-display text-2xl font-semibold tracking-[-0.015em] text-ink">
                {content.serviceDetail.atAGlance}
              </h2>
              <dl className="mt-5 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-bg-elevated">
                {service.specs.map((spec) => (
                  <div key={spec.label} className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:gap-6">
                    <dt className="w-48 shrink-0 text-sm font-medium text-ink">{spec.label}</dt>
                    <dd className="text-sm text-ink-muted">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal index={2} className="mt-10">
              <h2 className="font-display text-2xl font-semibold tracking-[-0.015em] text-ink">
                {content.serviceDetail.whatsIncluded}
              </h2>
              <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {service.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 rounded-xl border border-border bg-bg-elevated px-4 py-3.5 transition-colors duration-300 hover:border-accent/30"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-tint text-accent">
                      <Check size={15} aria-hidden />
                    </span>
                    <span className="text-sm text-ink">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal index={3} className="mt-10">
              <h2 className="font-display text-2xl font-semibold tracking-[-0.015em] text-ink">
                {content.serviceDetail.whyChooseUs(service.title)}
              </h2>
              <ul className="mt-5 flex flex-wrap gap-3">
                {service.highlights.map((h) => (
                  <li
                    key={h}
                    className="glass-panel flex items-center gap-2 rounded-full px-4 py-2 text-sm text-ink"
                  >
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-teal" />
                    {h}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal index={4} className="mt-12">
              <h2 className="font-display text-2xl font-semibold tracking-[-0.015em] text-ink">
                {content.serviceDetail.areasHeading(service.title)}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                We deliver {service.title.toLowerCase()} across {cityName}, including:
              </p>
              <div className="mt-5">
                <ServiceAreas compact />
              </div>
            </Reveal>
          </div>

          {/* Sticky quote card */}
          <div className="lg:col-span-2">
            <Reveal index={1} variant="scale" className="lg:sticky lg:top-28">
              <TiltCard>
                <div className="glass-panel overflow-hidden rounded-3xl">
                  <div className="relative h-48 w-full">
                    <Image
                      src={service.image}
                      alt={`${service.heading} — ${service.tagline}`}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
                    <span className="glass-panel absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-xl text-accent">
                      <Icon size={20} aria-hidden />
                    </span>
                  </div>
                  <div className="p-7">
                    <h2 className="font-display text-lg font-semibold text-ink">
                      {content.serviceDetail.getFreeQuote(service.title)}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                      {content.serviceDetail.quoteBody}
                    </p>
                    <MagneticButton className="mt-6 block w-full" strength={0.15}>
                      <a
                        href={whatsappHref(
                          `Hi ${site.name}, I'd like a quotation for ${service.title.toLowerCase()}. My area in ${cityName} is: `
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="focus-ring group flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-on-accent transition-shadow duration-300 hover:shadow-glow-accent"
                      >
                        {content.serviceDetail.requestQuotation}
                        <ArrowRight
                          size={16}
                          aria-hidden
                          className="transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
                        />
                      </a>
                    </MagneticButton>
                    <a
                      href={telHref}
                      className="focus-ring mt-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-medium text-ink transition-colors duration-300 hover:border-accent/40"
                    >
                      <Phone size={15} className="text-accent" aria-hidden />
                      {site.phoneLocal}
                    </a>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          </div>
        </div>

        {/* Per-service FAQ — question-shaped content is what AI assistants
            extract when answering "how much / how long / can you…" queries. */}
        <div className="mt-16 max-w-3xl">
          <FAQ items={service.faqs} headingText={content.serviceDetail.faqHeading(service.title)} />
        </div>

        {related.length > 0 && (
          <div className="mt-24 border-t border-border pt-16">
            <Reveal>
              <h2 className="font-display text-2xl font-semibold tracking-[-0.015em] text-ink sm:text-3xl">
                {content.serviceDetail.otherServices}
              </h2>
            </Reveal>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {related.map((s, i) => (
                <ServiceCard key={s.slug} service={s} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
