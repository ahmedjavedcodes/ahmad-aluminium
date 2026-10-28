"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { SplitText } from "@/components/motion/SplitText";
import { Reveal } from "@/lib/motion";

const EASE = [0.16, 1, 0.3, 1] as const;

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
    <section className="relative isolate overflow-hidden pb-16 pt-32 sm:pb-20 sm:pt-40">
      <div aria-hidden className="blueprint absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="absolute -right-40 -top-20 -z-10 h-[520px] w-[520px] rounded-full bg-accent/[0.12] blur-[120px]"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-12">
        <div className={image ? "lg:col-span-7" : "lg:col-span-10"}>
          <Reveal>
            <nav
              aria-label="Breadcrumb"
              className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-subtle"
            >
              {crumbs.map((c, i) => (
                <span key={c.href} className="flex items-center gap-2">
                  {i > 0 && <ChevronRight size={12} className="text-ink-subtle/60" aria-hidden />}
                  {i === crumbs.length - 1 ? (
                    <span aria-current="page" className="text-accent-deep">
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
            <p className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-accent/25 bg-bg-elevated/80 py-1.5 pl-2.5 pr-4 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-accent-deep shadow-card">
              <span aria-hidden className="status-dot h-2 w-2 rounded-full bg-accent" />
              {eyebrow}
            </p>
          </Reveal>

          {/* Two SplitText runs so the trailing words take the accent colour
              without nesting spans inside a single animated run. */}
          <h1 className="font-display text-[2.5rem] font-bold leading-[1] tracking-[-0.045em] text-ink sm:text-6xl md:text-[4.25rem]">
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
              <p className="mt-7 max-w-prose text-base leading-[1.75] text-ink-muted sm:text-lg">
                {description}
              </p>
            </Reveal>
          )}
        </div>

        {image && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: EASE }}
            data-parallax=""
            className="crop-marks hidden lg:col-span-5 lg:block"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-white bg-bg-sunken shadow-deep">
              <Image src={image} alt="" aria-hidden fill priority sizes="40vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
