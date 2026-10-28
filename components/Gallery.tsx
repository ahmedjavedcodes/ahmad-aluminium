"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { heroImage, services } from "@/data/services";
import { content } from "@/data/content";
import { cityName } from "@/data/site";
import { Reveal } from "@/lib/motion";
import { SectionHeading } from "@/components/SectionHeading";

/**
 * Bento tiling for the work grid.
 *
 * The counts are chosen so the grid fills completely rather than leaving
 * orphan cells at the end, which the previous "one feature tile + uniform
 * remainder" layout did:
 *
 *   2 columns (mobile): 1×(2w×2h) + 6×(1×1) = 10 cells = 2 × 5 rows
 *   4 columns (sm+):    1×(2w×2h) + 2×(2w)  + 4×(1×1) = 12 cells = 4 × 3 rows
 *
 * `grid-flow-dense` backfills anything left over if the service list grows,
 * so adding a seventh service degrades gracefully instead of tearing a hole.
 */
function tileClass(index: number): string {
  if (index === 0) return "col-span-2 row-span-2";
  if (index === 1 || index === 2) return "sm:col-span-2";
  return "";
}

export default function Gallery() {
  const items = [
    {
      image: heroImage,
      label: content.gallery.heroLabel,
      href: "/services",
      alt: `Aluminium and glass facade work in ${cityName}`,
    },
    ...services.map((s) => ({
      image: s.image,
      label: s.title,
      href: `/services/${s.slug}`,
      alt: `${s.title} in ${cityName} — ${s.tagline}`,
    })),
  ];

  return (
    <section id="gallery" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={content.gallery.eyebrow}
          heading={content.gallery.heading}
          className="max-w-2xl"
        />

        <ul className="mt-14 grid grid-flow-dense grid-cols-2 gap-4 [grid-auto-rows:140px] sm:grid-cols-4 sm:[grid-auto-rows:180px] lg:[grid-auto-rows:200px]">
          {items.map((item, i) => {
            const isFeature = i === 0;
            return (
              <Reveal
                key={item.href + i}
                index={i}
                as="li"
                className={`group relative overflow-hidden rounded-2xl border border-border transition-[border-color,box-shadow] duration-500 hover:border-accent/35 hover:shadow-lift ${tileClass(i)}`}
              >
                <Link href={item.href} className="focus-ring block h-full w-full">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes={
                      isFeature
                        ? "(min-width: 640px) 50vw, 100vw"
                        : "(min-width: 640px) 25vw, 50vw"
                    }
                    className="object-cover transition-transform duration-[900ms] ease-out-expo group-hover:scale-[1.08]"
                  />
                  {/*
                    Label scrim anchored to the bottom at a fixed height rather
                    than ramped over the whole tile. Percentage stops scale with
                    the tile, so on the short 1×1 cells only the last few pixels
                    ended up dark and white labels washed out over the brighter
                    shots (glass, interiors). A fixed band guarantees the same
                    contrast behind the caption at every tile size.
                  */}
                  <div
                    className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/95 via-ink/60 to-transparent ${
                      isFeature ? "h-36" : "h-24"
                    }`}
                  />
                  <div className="absolute inset-0 bg-ink/10 transition-colors duration-500 group-hover:bg-ink/0" />

                  <span className="absolute inset-x-4 bottom-3 flex items-end justify-between gap-2">
                    <span
                      className={`font-display font-semibold text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.5)] ${
                        isFeature ? "text-lg sm:text-2xl" : "text-sm"
                      }`}
                    >
                      {item.label}
                    </span>
                    <ArrowUpRight
                      size={isFeature ? 20 : 16}
                      aria-hidden
                      className="shrink-0 translate-y-1 text-white/0 transition-all duration-500 ease-out-expo group-hover:translate-y-0 group-hover:text-white"
                    />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
