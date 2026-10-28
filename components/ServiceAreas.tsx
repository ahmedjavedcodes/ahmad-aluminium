import { MapPin, Phone } from "lucide-react";
import { content } from "@/data/content";
import { site, telHref } from "@/data/site";
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
export function ServiceAreas({ compact = false, index }: { compact?: boolean; index?: number }) {
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
    <section id="areas" className="cv-block relative py-24 sm:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading
            index={index}
            eyebrow={content.areas.eyebrow}
            heading={content.areas.heading}
            intro={content.areas.paragraph}
          />
          <Reveal index={2} className="mt-8">
            <p className="border-l-2 border-accent/60 pl-4 text-sm text-ink-subtle">
              {content.areas.extendedLabel}{" "}
              <span className="text-ink-muted">{content.areas.extended.join(", ")}.</span>
            </p>
          </Reveal>
        </div>

        <Reveal index={1} className="lg:col-span-7">
          <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-[1.5rem] border border-border bg-border sm:grid-cols-3">
            {content.areas.list.map((area) => (
              <li
                key={area}
                className="group flex items-center gap-2.5 bg-bg-elevated px-4 py-3.5 text-sm text-ink-muted transition-colors duration-300 hover:bg-accent-tint hover:text-ink"
              >
                <MapPin
                  size={13}
                  className="shrink-0 text-ink-subtle transition-colors group-hover:text-accent"
                  aria-hidden
                />
                {area}
              </li>
            ))}
            {/* Closing cell: completes the grid and answers "my area isn't
                listed" with the action the copy above recommends. */}
            <li className="bg-bg-elevated">
              <a
                href={telHref}
                className="focus-ring group flex h-full items-center gap-2.5 px-4 py-3.5 text-sm font-medium text-accent-deep transition-colors duration-300 hover:bg-accent hover:text-on-accent"
              >
                <Phone size={13} className="shrink-0" aria-hidden />
                <span>
                  Not listed? <span className="font-mono">{site.phoneLocal}</span>
                </span>
              </a>
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
