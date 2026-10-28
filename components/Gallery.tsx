"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { heroImage, services } from "@/data/services";
import { content } from "@/data/content";
import { cityName } from "@/data/site";
import { Reveal } from "@/lib/motion";
import { SectionHeading } from "@/components/SectionHeading";
import { cn } from "@/lib/utils";

/**
 * Bento tiling for the work grid.
 *
 * The counts are chosen so the grid fills completely rather than leaving
 * orphan cells at the end:
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

export default function Gallery({ index }: { index?: number }) {
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
          index={index}
          eyebrow={content.gallery.eyebrow}
          heading={content.gallery.heading}
          className="max-w-2xl"
        />

        <ul className="mt-14 grid grid-flow-dense grid-cols-2 gap-3 [grid-auto-rows:150px] sm:grid-cols-4 sm:gap-4 sm:[grid-auto-rows:190px] lg:[grid-auto-rows:220px]">
          {items.map((item, i) => {
            const isFeature = i === 0;
            return (
              <Reveal
                key={item.href + i}
                index={i % 4}
                variant="clip"
                as="li"
                className={cn(
                  "group relative overflow-hidden rounded-2xl bg-bg-sunken shadow-card transition-shadow duration-700 ease-out-expo hover:shadow-deep",
                  tileClass(i)
                )}
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
                    className="object-cover transition-transform duration-[1400ms] ease-out-expo group-hover:scale-[1.08]"
                  />
                  {/* Fixed-height caption scrim, so the label keeps the same
                      contrast on every tile size and over bright photos. */}
                  <div
                    className={cn(
                      "absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/55 to-transparent",
                      isFeature ? "h-40" : "h-28"
                    )}
                  />

                  <span className="absolute left-3 top-3 rounded bg-black/55 px-1.5 py-0.5 font-mono text-[10px] tracking-[0.14em] text-white/85 backdrop-blur-sm">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Copper hairline that draws in along the bottom edge. */}
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-accent transition-transform duration-700 ease-out-expo group-hover:scale-x-100"
                  />
                  <span className="absolute inset-x-4 bottom-3.5 flex translate-y-0 items-end justify-between gap-2 transition-transform duration-500 ease-out-expo group-hover:-translate-y-1">
                    <span
                      className={cn(
                        "font-display font-bold tracking-[-0.01em] text-white",
                        isFeature ? "text-xl sm:text-3xl" : "text-sm sm:text-base"
                      )}
                    >
                      {item.label}
                    </span>
                    <span className="flex h-9 w-9 shrink-0 translate-y-2 items-center justify-center rounded-full bg-accent text-on-accent opacity-0 transition-[transform,opacity] duration-500 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                      <ArrowUpRight size={16} aria-hidden />
                    </span>
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
