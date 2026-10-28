"use client";

import { MapPin } from "lucide-react";
import { content } from "@/data/content";
import { Reveal } from "@/lib/motion";
import { SectionHeading } from "@/components/SectionHeading";

/**
 * Named-area coverage block.
 *
 * Local intent searches are overwhelmingly phrased as "<trade> in <area>", and
 * both search engines and AI assistants match on the literal area name. Listing
 * the covered neighbourhoods as real, crawlable text — rather than leaving them
 * implicit in a city name — is what makes those queries resolvable to this
 * business. The same list is mirrored into `areaServed` in the JSON-LD.
 */
export function ServiceAreas({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="flex flex-wrap gap-2">
        {content.areas.list.map((area) => (
          <span
            key={area}
            className="rounded-full border border-border bg-bg-elevated px-3 py-1.5 text-xs text-ink-muted"
          >
            {area}
          </span>
        ))}
      </div>
    );
  }

  return (
    <section id="areas" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={content.areas.eyebrow}
          heading={content.areas.heading}
          intro={content.areas.paragraph}
          className="max-w-2xl"
        />

        <Reveal index={1} className="mt-10">
          <ul className="flex flex-wrap gap-2.5">
            {content.areas.list.map((area) => (
              <li
                key={area}
                className="flex items-center gap-1.5 rounded-full border border-border bg-bg-elevated px-3.5 py-2 text-sm text-ink-muted transition-colors duration-300 hover:border-accent/35 hover:text-ink"
              >
                <MapPin size={13} className="text-accent/70" aria-hidden />
                {area}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal index={2} className="mt-8">
          <p className="text-sm text-ink-subtle">
            {content.areas.extendedLabel}{" "}
            <span className="text-ink-muted">{content.areas.extended.join(", ")}.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
