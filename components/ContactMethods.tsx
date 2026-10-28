"use client";

import { MessageCircle, Phone, MapPin, Clock, ArrowUpRight, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { content } from "@/data/content";
import {
  site,
  nap,
  telHref,
  whatsappHref,
  directionsHref,
  mapEmbedSrc,
  cityName,
} from "@/data/site";
import { Reveal } from "@/lib/motion";
import { Spotlight } from "@/components/motion/Spotlight";
import { RatingBadge } from "@/components/Testimonials";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function Channel({
  icon: Icon,
  number,
  title,
  body,
  detail,
  action,
  primary = false,
}: {
  icon: LucideIcon;
  number: string;
  title: string;
  body: string;
  detail: ReactNode;
  action: ReactNode;
  primary?: boolean;
}) {
  return (
    <Spotlight className="h-full rounded-[1.5rem]">
      <div
        className={cn(
          "hover-rim flex h-full flex-col rounded-[1.5rem] p-7 transition-[box-shadow,transform] duration-700 ease-out-expo hover:-translate-y-1 hover:shadow-deep",
          primary ? "theme-inverse" : "panel"
        )}
      >
        <div className="mb-6 flex items-center justify-between">
          <span
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-full",
              primary ? "bg-accent text-on-accent" : "border border-border bg-bg text-accent"
            )}
          >
            <Icon size={22} aria-hidden />
          </span>
          <span className="font-mono text-[11px] text-ink-subtle">{number}</span>
        </div>
        <h3 className="font-display text-2xl font-bold tracking-[-0.02em] text-ink">{title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">{body}</p>
        <div className="mt-5">{detail}</div>
        <div className="mt-6">{action}</div>
      </div>
    </Spotlight>
  );
}

/**
 * Three ways to make contact — WhatsApp, phone, or visiting the workshop —
 * followed by the map. On the contact page this sits under the quote builder,
 * for visitors who would rather just call or drop in.
 */
export function ContactMethods({ index }: { index?: number }) {
  const waMessage = `Hi ${site.name}, I'd like a free quotation. My area in ${cityName} is: `;

  return (
    <section id="contact" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index={index}
          eyebrow={content.contact.eyebrow}
          heading={{ lead: "Call, message or", accent: "visit the workshop", tail: "." }}
          className="max-w-2xl"
        />

        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3">
          <Reveal className="h-full">
            <Channel
              primary
              icon={MessageCircle}
              number="01"
              title={content.contactMethods.whatsapp.title}
              body={content.contactMethods.whatsapp.body}
              detail={<p className="font-mono text-lg text-ink">{site.phoneLocal}</p>}
              action={
                <Button asChild className="w-full">
                  <a href={whatsappHref(waMessage)} target="_blank" rel="noopener noreferrer">
                    {content.contactMethods.whatsapp.cta}
                    <ArrowUpRight
                      size={16}
                      aria-hidden
                      className="transition-transform duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </a>
                </Button>
              }
            />
          </Reveal>

          <Reveal index={1} className="h-full">
            <Channel
              icon={Phone}
              number="02"
              title={content.contactMethods.call.title}
              body={content.contactMethods.call.body}
              detail={<p className="font-mono text-lg text-ink">{site.phoneLocal}</p>}
              action={
                <Button asChild variant="outline" className="w-full">
                  <a href={telHref}>
                    <Phone size={15} aria-hidden />
                    {content.contactMethods.call.cta}
                  </a>
                </Button>
              }
            />
          </Reveal>

          <Reveal index={2} className="h-full">
            <Channel
              icon={MapPin}
              number="03"
              title={content.contactMethods.visit.title}
              body={content.contactMethods.visit.body}
              detail={
                <>
                  <address className="not-italic">
                    <span className="block font-display text-lg font-semibold leading-snug text-ink">
                      {site.address.street}
                    </span>
                    <span className="block text-sm text-ink-muted">
                      {site.address.city} {site.address.postalCode}, {site.address.country}
                    </span>
                  </address>
                  <p className="mt-3 flex items-center gap-2 text-sm text-ink-muted">
                    <Clock size={14} className="shrink-0 text-teal" aria-hidden />
                    {site.hours}
                  </p>
                </>
              }
              action={
                <Button asChild variant="outline" className="w-full">
                  <a href={directionsHref} target="_blank" rel="noopener noreferrer">
                    {content.contactMethods.visit.cta}
                    <ArrowUpRight size={16} aria-hidden />
                  </a>
                </Button>
              }
            />
          </Reveal>
        </div>

        {/* Map of the workshop: a lazy iframe embed — no Maps JS, no key, and
            nothing that blocks first paint. A light desaturation keeps the
            tiles in the site's steel palette. */}
        <Reveal index={3} className="mt-5">
          <div className="panel relative overflow-hidden rounded-[1.5rem]">
            <iframe
              src={mapEmbedSrc}
              title={`Map showing ${site.name} in ${site.address.street}, ${cityName}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="block h-[320px] w-full border-0 [filter:grayscale(0.35)_contrast(1.02)] sm:h-[400px]"
            />
            <div className="flex flex-col gap-3 border-t border-border p-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-ink-muted">
                <MapPin size={14} className="mr-2 inline text-accent" aria-hidden />
                <span className="font-medium text-ink">{nap.short}</span>
                {" — "}
                {site.address.postalCode}, {site.address.country}
              </p>
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring group inline-flex w-fit items-center gap-1.5 rounded-lg text-sm font-medium text-accent-deep"
              >
                Open in Google Maps
                <ArrowUpRight
                  size={15}
                  aria-hidden
                  className="transition-transform duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </div>
          </div>
        </Reveal>

        {/* Email as a secondary line rather than a fourth card: WhatsApp,
            phone and visiting are the routes customers here actually use. */}
        <Reveal index={4} className="mt-8 flex flex-col items-center gap-4">
          <p className="text-sm text-ink-muted">
            Prefer email?{" "}
            <a
              href={`mailto:${site.email}?subject=${encodeURIComponent(
                `Quotation request — ${cityName}`
              )}`}
              className="focus-ring link-underline font-medium text-accent-deep"
            >
              {site.email}
            </a>
          </p>
          <RatingBadge />
        </Reveal>
      </div>
    </section>
  );
}
