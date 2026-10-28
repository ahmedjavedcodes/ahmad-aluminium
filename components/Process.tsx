"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { processSteps } from "@/data/services";
import { content } from "@/data/content";
import { Reveal } from "@/lib/motion";
import { QUOTE_HREF } from "@/lib/quote";
import { SectionHeading } from "@/components/SectionHeading";
import { Screen, SwipeGrid } from "@/components/Screen";
import { Button, RollText, ArrowSwap } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Survey → handover as a one-screen production line: four full-height
 * stations joined by a rail that fills with copper as the section scrolls
 * into place. A swipe rail of stations on phones.
 */
export default function Process({ index }: { index?: number }) {
  const gridRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: gridRef, offset: ["start 90%", "end 75%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 110, damping: 26, restDelta: 0.001 });

  return (
    <Screen
      id="process"
      labelledBy="process-heading"
      background={
        <>
          <div aria-hidden className="brushed absolute inset-0 -z-20" />
          <div aria-hidden className="blueprint absolute inset-0 -z-10 opacity-80" />
        </>
      }
    >
      <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
        <SectionHeading
          id="process-heading"
          index={index}
          eyebrow={content.process.eyebrow}
          heading={content.process.heading}
          className="max-w-2xl"
        />
        <Reveal index={1}>
          <Button asChild>
            <Link href={QUOTE_HREF}>
              <RollText>{content.nav.quote}</RollText>
              <ArrowSwap size={16} />
            </Link>
          </Button>
        </Reveal>
      </div>

      <div ref={gridRef} className="relative mt-[clamp(1.5rem,5svh,3rem)] flex min-h-[14rem] flex-1 flex-col">
        {/* Rail across the station markers (desktop). */}
        <div aria-hidden className="absolute left-0 right-0 top-[clamp(1.75rem,4svh,2.25rem)] hidden h-[2px] rounded-full bg-border-strong lg:block">
          <motion.div
            data-parallax=""
            style={{ scaleX: fill }}
            className="h-full w-full origin-left rounded-full bg-gradient-to-r from-accent via-accent to-accent-deep"
          />
        </div>

        <SwipeGrid label="How it works. Swipe through the steps." className="relative flex-1 lg:grid-cols-4 lg:gap-5">
          {processSteps.map((step, i) => (
            <Reveal
              key={step.title}
              index={i}
              variant="rise"
              className="flex w-[80%] shrink-0 snap-start flex-col sm:w-[44%] lg:w-auto"
            >
              <span
                className={cn(
                  "relative z-10 flex h-[clamp(3.5rem,8svh,4.5rem)] w-[clamp(3.5rem,8svh,4.5rem)] shrink-0 items-center justify-center rounded-full border-4 border-bg-sunken bg-accent font-display text-xl font-extrabold text-on-accent shadow-copper-glow"
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="panel hover-rim group relative mt-4 flex flex-1 flex-col justify-end overflow-hidden rounded-[clamp(1.25rem,3svh,2rem)] p-[clamp(1.25rem,3svh,2rem)] transition-[transform,box-shadow] duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-deep">
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-2 -top-4 select-none font-display text-[length:clamp(4rem,14svh,8.5rem)] font-extrabold leading-none tracking-[-0.06em] text-transparent transition-[transform,-webkit-text-stroke-color] duration-700 ease-out-expo [-webkit-text-stroke:1.5px_rgb(var(--color-ink)/0.1)] group-hover:-translate-y-1 group-hover:[-webkit-text-stroke:1.5px_rgb(var(--color-accent)/0.45)]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-deep">
                  Step {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-display text-[length:clamp(1.2rem,3svh,1.6rem)] font-extrabold leading-tight tracking-[-0.03em] text-ink">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-[length:clamp(0.85rem,1.9svh,0.975rem)] leading-relaxed text-ink-muted">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </SwipeGrid>
      </div>
    </Screen>
  );
}
