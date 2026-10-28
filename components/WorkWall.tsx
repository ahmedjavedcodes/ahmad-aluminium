"use client";

import Image from "next/image";
import Link from "next/link";
import { Maximize2 } from "lucide-react";
import { cityName } from "@/data/site";
import { Reveal } from "@/lib/motion";
import { workItems, workHref, WORK_PLACEMENT, type WorkItem } from "@/lib/work";
import { Parallax } from "@/components/motion/Parallax";
import { SwipeGrid } from "@/components/Screen";
import { ArrowSwap } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * The portfolio wall: seven frames on an explicit 12 × 3 grid (a swipe rail
 * below lg). Each photograph drifts inside its frame, wipes in on reveal and
 * zooms on hover.
 *
 * On the home page every frame links to /work#<project>; on /work itself the
 * frames are buttons that open the project viewer (`onOpen`).
 */
export function WorkWall({
  onOpen,
  className,
}: {
  /** When set, frames open the viewer instead of linking to /work. */
  onOpen?: (index: number) => void;
  className?: string;
}) {
  return (
    <SwipeGrid
      label="Our work — swipe for more"
      className={cn("lg:grid-cols-12 lg:grid-rows-3 lg:gap-4", className)}
    >
      {workItems.map((item, i) => (
        <Reveal
          key={item.id}
          index={i % 4}
          variant="clip"
          className={cn("group w-[78%] shrink-0 snap-start sm:w-[44%] lg:w-auto", WORK_PLACEMENT[i])}
        >
          <Frame item={item} index={i} onOpen={onOpen} />
        </Reveal>
      ))}
    </SwipeGrid>
  );
}

function Frame({ item, index, onOpen }: { item: WorkItem; index: number; onOpen?: (index: number) => void }) {
  const body = (
    <>
      <Parallax speed={index % 2 ? -22 : 22} scale={[1.16, 1.16]} className="absolute inset-0">
        <Image
          src={item.image}
          alt={item.alt}
          fill
          sizes={index === 0 ? "(min-width: 1024px) 40vw, 80vw" : "(min-width: 1024px) 25vw, (min-width: 640px) 44vw, 80vw"}
          className="object-cover transition-transform duration-[1400ms] ease-out-expo group-hover:scale-[1.08]"
        />
      </Parallax>
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/0 to-black/0" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 text-left sm:p-5">
        <div className="min-w-0 transition-transform duration-500 ease-out-expo group-hover:-translate-y-1">
          <span className="block text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/75">{cityName}</span>
          <span
            className={cn(
              "mt-0.5 block font-display font-extrabold leading-tight tracking-[-0.02em] text-white",
              index === 0 ? "text-[length:clamp(1.4rem,3.6svh,2.1rem)]" : "text-base sm:text-lg"
            )}
          >
            {item.title}
          </span>
        </div>
        <span className="flex h-10 w-10 shrink-0 translate-y-2 items-center justify-center rounded-full bg-accent text-on-accent opacity-0 transition-[transform,opacity] duration-500 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 max-lg:translate-y-0 max-lg:opacity-100">
          {onOpen ? <Maximize2 size={16} aria-hidden /> : <ArrowSwap diagonal size={16} />}
        </span>
      </div>
    </>
  );

  const frameClass =
    "focus-ring relative block h-full w-full cursor-pointer overflow-hidden rounded-[clamp(1.1rem,2.6svh,1.75rem)] bg-bg-sunken shadow-card transition-shadow duration-700 ease-out-expo hover:shadow-deep";

  if (onOpen) {
    return (
      <button
        type="button"
        onClick={() => onOpen(index)}
        aria-label={`View project: ${item.title}`}
        aria-haspopup="dialog"
        className={frameClass}
      >
        {body}
      </button>
    );
  }
  return (
    <Link href={workHref(item.id)} aria-label={`${item.title} — view in Our Work`} className={frameClass}>
      {body}
    </Link>
  );
}
