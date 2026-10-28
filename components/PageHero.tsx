"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { SplitText } from "@/components/motion/SplitText";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/lib/motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Inner-page header: centred breadcrumb, label, headline and summary, then a
 * full-width panoramic photograph that drifts inside its frame. The frame has
 * a fixed aspect ratio, so the page below never shifts as it loads.
 */
export function PageHero({
  eyebrow,
  title,
  /** Word count from the end of `title` to render in the accent colour. */
  accentWords = 0,
  description,
  crumbs,
  image,
}: {
  eyebrow: string;
  title: string;
  accentWords?: number;
  description?: string;
  crumbs: { href: string; label: string }[];
  image?: string;
}) {
  const words = title.split(" ");
  const splitAt = accentWords > 0 ? Math.max(0, words.length - accentWords) : words.length;
  const leadText = words.slice(0, splitAt).join(" ");
  const accentText = words.slice(splitAt).join(" ");

  return (
    <section className="relative isolate overflow-hidden pb-10 pt-32 sm:pt-40">
      <Parallax speed={-60} className="absolute inset-0 -z-10">
        <div aria-hidden className="blueprint h-full w-full" />
      </Parallax>
      <div aria-hidden className="absolute left-1/2 top-0 -z-10 h-[460px] w-[760px] -translate-x-1/2 rounded-full bg-accent/[0.1] blur-[130px]" />

      <div className="mx-auto max-w-5xl px-5 text-center sm:px-8">
        <Reveal>
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[12px] font-medium text-ink-subtle"
          >
            {crumbs.map((c, i) => (
              <span key={c.href} className="flex items-center gap-2">
                {i > 0 && <ChevronRight size={12} className="text-ink-subtle/60" aria-hidden />}
                {i === crumbs.length - 1 ? (
                  <span aria-current="page" className="font-semibold text-accent-deep">
                    {c.label}
                  </span>
                ) : (
                  <Link href={c.href} className="focus-ring link-underline rounded transition-colors hover:text-ink">
                    {c.label}
                  </Link>
                )}
              </span>
            ))}
          </nav>
        </Reveal>

        <Reveal index={1}>
          <p className="mx-auto mb-7 inline-flex items-center gap-2.5 rounded-full border border-border bg-bg-elevated/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-deep shadow-card">
            <span aria-hidden className="status-dot h-2 w-2 rounded-full bg-accent" />
            {eyebrow}
          </p>
        </Reveal>

        {/* Two SplitText runs so the trailing words take the accent colour
            without nesting spans inside a single animated run. */}
        <h1 className="font-display text-[2.5rem] font-extrabold leading-[1] tracking-[-0.045em] text-ink sm:text-6xl lg:text-[5rem]">
          {leadText && <SplitText as="span" text={leadText} className="inline" trigger="mount" />}
          {leadText && accentText ? " " : null}
          {accentText && (
            <SplitText
              as="span"
              text={accentText}
              className="inline"
              wordClassName="text-accent"
              delay={leadText ? 0.12 : 0}
              trigger="mount"
            />
          )}
        </h1>

        {description && (
          <Reveal index={3}>
            <p className="mx-auto mt-7 max-w-2xl text-base leading-[1.75] text-ink-muted sm:text-lg">{description}</p>
          </Reveal>
        )}
      </div>

      {image && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.3, ease: EASE }}
          className="mx-auto mt-14 max-w-7xl px-5 sm:mt-16 sm:px-8"
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-bg-sunken shadow-deep sm:aspect-[21/9]">
            <Parallax speed={50} scale={[1.2, 1.05]} className="absolute inset-0">
              <Image src={image} alt="" aria-hidden fill priority sizes="(min-width: 1280px) 1216px, 100vw" className="object-cover" />
            </Parallax>
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </div>
        </motion.div>
      )}
    </section>
  );
}
