"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { processSteps } from "@/data/services";
import { content } from "@/data/content";
import { Reveal } from "@/lib/motion";
import { QUOTE_HREF } from "@/lib/quote";
import { SectionHeading } from "@/components/SectionHeading";
import { Parallax } from "@/components/motion/Parallax";
import { Button, RollText, ArrowSwap } from "@/components/ui/button";

/**
 * Survey → handover as a scroll-driven timeline. The heading and quote button
 * stay pinned on the left while the steps scroll past on the right, and a
 * copper rail fills in step with the reader's progress through them.
 */
export default function Process({ index }: { index?: number }) {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 55%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  return (
    <section id="process" className="relative isolate overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="brushed absolute inset-0 -z-20" />
      <Parallax speed={-60} className="absolute inset-0 -z-10">
        <div aria-hidden className="blueprint h-full w-full opacity-80" />
      </Parallax>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading index={index} eyebrow={content.process.eyebrow} heading={content.process.heading} />
            <Reveal index={2} className="mt-8">
              <Button asChild>
                <Link href={QUOTE_HREF}>
                  <RollText>{content.nav.quote}</RollText>
                  <ArrowSwap size={16} />
                </Link>
              </Button>
            </Reveal>
          </div>
        </div>

        <ol ref={listRef} className="relative flex flex-col gap-5 lg:col-span-7">
          {/* Rail: a hairline track with a copper fill driven by scroll. */}
          <div aria-hidden className="absolute bottom-8 left-[27px] top-8 w-[2px] rounded-full bg-border-strong sm:left-[35px]">
            <motion.div
              data-parallax=""
              style={{ scaleY: fill }}
              className="h-full w-full origin-top rounded-full bg-gradient-to-b from-accent to-accent-deep"
            />
          </div>

          {processSteps.map((step, i) => (
            <Reveal key={step.title} index={i} variant="rise" as="li" className="relative pl-16 sm:pl-24">
              <span className="absolute left-0 top-6 flex h-14 w-14 items-center justify-center rounded-full border-4 border-bg-sunken bg-accent font-display text-lg font-extrabold text-on-accent shadow-copper-glow sm:left-2 sm:h-[4.5rem] sm:w-[4.5rem] sm:text-xl">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="panel hover-rim rounded-[1.75rem] p-7 transition-[transform,box-shadow] duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-deep sm:p-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-deep">
                  Step {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-display text-2xl font-extrabold tracking-[-0.03em] text-ink">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-muted">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
