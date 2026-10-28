"use client";

import Image from "next/image";
import Link from "next/link";
import { heroImage, services } from "@/data/services";
import { content } from "@/data/content";
import { cityName } from "@/data/site";
import { Reveal } from "@/lib/motion";
import { Parallax } from "@/components/motion/Parallax";
import { SectionHeading } from "@/components/SectionHeading";
import { Button, RollText, ArrowSwap } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Varied frame proportions give the columns an editorial, uneven rhythm. */
const SPEEDS = [24, -36, 30, -20, 36, -28, 20];

const ASPECTS = ["aspect-[4/5]", "aspect-[4/3]", "aspect-[3/4]", "aspect-square", "aspect-[4/5]", "aspect-[5/4]", "aspect-[3/4]"];

/**
 * Asymmetric portfolio: a masonry wall of photographs in mixed proportions,
 * each drifting at its own speed as the section scrolls past.
 */
export default function Gallery({ index }: { index?: number }) {
  const items = [
    { image: heroImage, label: content.gallery.heroLabel, href: "/services", alt: `Aluminium and glass facade work in ${cityName}` },
    ...services.map((s) => ({
      image: s.image,
      label: s.title,
      href: `/services/${s.slug}`,
      alt: `${s.title} in ${cityName} — ${s.tagline}`,
    })),
  ].map((item, i) => ({ ...item, n: i }));

  const Tile = ({ item }: { item: (typeof items)[number] }) => (
    <Reveal index={item.n % 3} variant="clip" className="group">
      <Link
        href={item.href}
        className={cn(
          "focus-ring relative block overflow-hidden rounded-[1.75rem] bg-bg-sunken shadow-card transition-shadow duration-700 ease-out-expo hover:shadow-deep",
          ASPECTS[item.n % ASPECTS.length]
        )}
      >
        <Image
          src={item.image}
          alt={item.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1400ms] ease-out-expo group-hover:scale-[1.08]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/0 to-black/0" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
          <div className="transition-transform duration-500 ease-out-expo group-hover:-translate-y-1">
            <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
              {cityName}
            </span>
            <span className="mt-1 block font-display text-xl font-extrabold tracking-[-0.02em] text-white sm:text-2xl">
              {item.label}
            </span>
          </div>
          <span className="flex h-11 w-11 shrink-0 translate-y-3 items-center justify-center rounded-full bg-accent text-on-accent opacity-0 transition-[transform,opacity] duration-500 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
            <ArrowSwap diagonal size={17} />
          </span>
        </div>
      </Link>
    </Reveal>
  );

  return (
    <section id="gallery" className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading index={index} eyebrow={content.gallery.eyebrow} heading={content.gallery.heading} className="max-w-2xl" />
          <Reveal index={1}>
            <Button asChild variant="outline">
              <Link href="/services">
                <RollText>{content.home.viewAllServices}</RollText>
                <ArrowSwap size={16} />
              </Link>
            </Button>
          </Reveal>
        </div>

        {/* Masonry via CSS columns (one, two or three by width). Each tile
            drifts at its own speed — neighbours move against each other —
            so the wall of photographs gains depth without duplicate markup. */}
        <ul className="mt-14 columns-1 gap-5 sm:mt-16 sm:columns-2 lg:columns-3">
          {items.map((item) => (
            <li key={item.href + item.n} className="mb-5 break-inside-avoid">
              <Parallax speed={SPEEDS[item.n % SPEEDS.length]}>
                <Tile item={item} />
              </Parallax>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
