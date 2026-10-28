"use client";

import Image from "next/image";
import Link from "next/link";
import { heroImage, services } from "@/data/services";
import { content } from "@/data/content";
import { cityName } from "@/data/site";
import { Reveal } from "@/lib/motion";
import { Parallax } from "@/components/motion/Parallax";
import { SectionHeading } from "@/components/SectionHeading";
import { Screen, SwipeGrid } from "@/components/Screen";
import { Button, RollText, ArrowSwap } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Asymmetric placement on a 12 × 3 grid (lg), explicit so the wall always
 * closes cleanly:
 *
 *   ┌──────────┬────────┬──────┐
 *   │          │   1    │      │
 *   │          ├────┬───┤  2   │
 *   │    0     │    │ 4 │      │
 *   │          │ 3  ├───┼──────┤
 *   │          │    │ 5 │  6   │
 *   └──────────┴────┴───┴──────┘
 */
const PLACEMENT = [
  "lg:col-start-1 lg:col-end-6 lg:row-start-1 lg:row-end-4",
  "lg:col-start-6 lg:col-end-10 lg:row-start-1 lg:row-end-2",
  "lg:col-start-10 lg:col-end-13 lg:row-start-1 lg:row-end-3",
  "lg:col-start-6 lg:col-end-8 lg:row-start-2 lg:row-end-4",
  "lg:col-start-8 lg:col-end-10 lg:row-start-2 lg:row-end-3",
  "lg:col-start-8 lg:col-end-10 lg:row-start-3 lg:row-end-4",
  "lg:col-start-10 lg:col-end-13 lg:row-start-3 lg:row-end-4",
];

/**
 * Our Work — a one-screen portfolio wall.
 *
 * Seven frames of mixed size fill the space left under the heading; each
 * photograph drifts inside its frame as the section scrolls (depth without
 * moving the layout), wipes in on reveal and zooms on hover. On phones and
 * tablets the wall becomes a swipe rail at the same height.
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
  ];

  return (
    <Screen id="gallery" labelledBy="work-heading">
      <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
        <SectionHeading
          id="work-heading"
          index={index}
          eyebrow={content.gallery.eyebrow}
          heading={content.gallery.heading}
          className="max-w-2xl"
        />
        <Reveal index={1} className="hidden sm:block">
          <Button asChild variant="outline">
            <Link href="/services">
              <RollText>{content.home.viewAllServices}</RollText>
              <ArrowSwap size={16} />
            </Link>
          </Button>
        </Reveal>
      </div>

      <SwipeGrid
        label="Our work — swipe for more"
        className="mt-[clamp(1.25rem,4svh,2.5rem)] min-h-[20rem] flex-1 lg:grid-cols-12 lg:grid-rows-3 lg:gap-4"
      >
        {items.map((item, i) => (
          <Reveal
            key={item.href + i}
            index={i % 4}
            variant="clip"
            className={cn("group w-[78%] shrink-0 snap-start sm:w-[44%] lg:w-auto", PLACEMENT[i])}
          >
            <Link
              href={item.href}
              className="focus-ring relative block h-full overflow-hidden rounded-[clamp(1.1rem,2.6svh,1.75rem)] bg-bg-sunken shadow-card transition-shadow duration-700 ease-out-expo hover:shadow-deep"
            >
              <Parallax speed={i % 2 ? -22 : 22} scale={[1.16, 1.16]} className="absolute inset-0">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes={i === 0 ? "(min-width: 1024px) 40vw, 80vw" : "(min-width: 1024px) 25vw, (min-width: 640px) 44vw, 80vw"}
                  className="object-cover transition-transform duration-[1400ms] ease-out-expo group-hover:scale-[1.08]"
                />
              </Parallax>
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/0 to-black/0" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
                <div className="min-w-0 transition-transform duration-500 ease-out-expo group-hover:-translate-y-1">
                  <span className="block text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/75">{cityName}</span>
                  <span
                    className={cn(
                      "mt-0.5 block font-display font-extrabold leading-tight tracking-[-0.02em] text-white",
                      i === 0 ? "text-[length:clamp(1.4rem,3.6svh,2.1rem)]" : "text-base sm:text-lg"
                    )}
                  >
                    {item.label}
                  </span>
                </div>
                <span className="flex h-10 w-10 shrink-0 translate-y-2 items-center justify-center rounded-full bg-accent text-on-accent opacity-0 transition-[transform,opacity] duration-500 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  <ArrowSwap diagonal size={16} />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </SwipeGrid>
    </Screen>
  );
}
