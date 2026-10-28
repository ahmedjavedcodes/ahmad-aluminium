"use client";

import { MessageCircle, Phone, MapPin, Clock, ArrowUpRight } from "lucide-react";
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
import { MagneticButton } from "@/components/motion/MagneticButton";
import { RatingBadge } from "@/components/Testimonials";

/**
 * Three ways to make contact — WhatsApp, phone, or visiting the workshop.
 *
 * This replaces the enquiry form deliberately. A form on a local trade site
 * adds a step, needs a delivery backend to avoid silently dropping leads, and
 * competes with the two channels customers in Lahore actually use. WhatsApp
 * and tel: links open the app directly, on the device the visitor is already
 * holding, with the enquiry pre-written.
 */
export function ContactMethods() {
  const waMessage = `Hi ${site.name}, I'd like a free quotation. My area in ${cityName} is: `;

  return (
    <section id="contact" className="relative py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {/* WhatsApp — primary channel */}
          <Reveal className="h-full">
            <div className="glass-panel flex h-full flex-col rounded-3xl border-accent/25 p-8">
              <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-tint text-accent">
                <MessageCircle size={22} aria-hidden />
              </span>
              <h2 className="font-display text-xl font-semibold text-ink">
                {content.contactMethods.whatsapp.title}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
                {content.contactMethods.whatsapp.body}
              </p>
              <p className="mt-4 font-display text-lg font-semibold text-ink">
                {site.phoneLocal}
              </p>
              <MagneticButton className="mt-5 block w-full" strength={0.15}>
                <a
                  href={whatsappHref(waMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  className="focus-ring group flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-on-accent transition-shadow duration-300 hover:shadow-glow-accent"
                >
                  {content.contactMethods.whatsapp.cta}
                  <ArrowUpRight
                    size={16}
                    aria-hidden
                    className="transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </MagneticButton>
            </div>
          </Reveal>

          {/* Call */}
          <Reveal index={1} className="h-full">
            <div className="glass-panel flex h-full flex-col rounded-3xl p-8">
              <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-tint text-teal">
                <Phone size={22} aria-hidden />
              </span>
              <h2 className="font-display text-xl font-semibold text-ink">
                {content.contactMethods.call.title}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
                {content.contactMethods.call.body}
              </p>
              <p className="mt-4 font-display text-lg font-semibold text-ink">
                {site.phoneLocal}
              </p>
              <MagneticButton className="mt-5 block w-full" strength={0.15}>
                <a
                  href={telHref}
                  data-cursor="hover"
                  className="focus-ring flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-border bg-bg-elevated px-6 py-3.5 text-sm font-semibold text-ink transition-colors duration-300 hover:border-accent/40 hover:text-accent"
                >
                  <Phone size={15} aria-hidden />
                  {content.contactMethods.call.cta}
                </a>
              </MagneticButton>
            </div>
          </Reveal>

          {/* Visit */}
          <Reveal index={2} className="h-full">
            <div className="glass-panel flex h-full flex-col rounded-3xl p-8">
              <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-tint text-accent">
                <MapPin size={22} aria-hidden />
              </span>
              <h2 className="font-display text-xl font-semibold text-ink">
                {content.contactMethods.visit.title}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
                {content.contactMethods.visit.body}
              </p>
              <address className="mt-4 not-italic">
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
              <MagneticButton className="mt-5 block w-full" strength={0.15}>
                <a
                  href={directionsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  className="focus-ring group flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-border bg-bg-elevated px-6 py-3.5 text-sm font-semibold text-ink transition-colors duration-300 hover:border-accent/40 hover:text-accent"
                >
                  {content.contactMethods.visit.cta}
                  <ArrowUpRight
                    size={16}
                    aria-hidden
                    className="transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </MagneticButton>
            </div>
          </Reveal>
        </div>

        {/*
          Map of the workshop.

          Loaded lazily and only as an iframe embed — no Maps JS API key, no
          third-party script on the page, and nothing that blocks first paint.
          The overlaid link opens the business's own Google listing so a
          visitor can read the reviews and get directions from there too.
        */}
        <Reveal index={3} className="mt-5">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-bg-elevated">
            <iframe
              src={mapEmbedSrc}
              title={`Map showing ${site.name} in ${site.address.street}, ${cityName}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="block h-[320px] w-full border-0 sm:h-[380px]"
            />
            <div className="flex flex-col gap-3 border-t border-border p-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-ink-muted">
                <span className="font-medium text-ink">{site.address.street}</span>
                {" — "}
                {cityName} {site.address.postalCode}, {site.address.country}
              </p>
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring group inline-flex w-fit items-center gap-1.5 rounded-lg text-sm font-medium text-accent"
              >
                Open in Google Maps
                <ArrowUpRight
                  size={15}
                  aria-hidden
                  className="transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </div>
          </div>
        </Reveal>

        {/* Email kept as a secondary line rather than a fourth card: WhatsApp,
            phone and visiting are the routes customers here actually use, and
            a fourth tile would dilute them. */}
        <Reveal index={4} className="mt-8 flex flex-col items-center gap-4">
          <p className="text-sm text-ink-muted">
            Prefer email?{" "}
            <a
              href={`mailto:${site.email}?subject=${encodeURIComponent(
                `Quotation request — ${cityName}`
              )}`}
              className="focus-ring link-underline font-medium text-accent"
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
