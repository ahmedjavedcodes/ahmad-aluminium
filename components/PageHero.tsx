"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { SplitText } from "@/components/motion/SplitText";
import { Reveal } from "@/lib/motion";

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
    <section className="relative overflow-hidden pb-16 pt-36 sm:pb-20 sm:pt-44">
      <div className="absolute inset-0 -z-20">
        {image && (
          <Image
            src={image}
            alt=""
            aria-hidden
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
        {/* Same split treatment as the home hero: a solid ground under the
            copy column, clearing to the right so the photograph is actually
            visible instead of being scrimmed down to a flat block. */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-transparent to-bg" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg from-[52%] via-bg/60 via-[72%] to-transparent to-[92%]" />
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-mesh-accent" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid opacity-30" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-ink-muted"
          >
            {crumbs.map((c, i) => (
              <span key={c.href} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight size={12} className="text-ink-muted/50" aria-hidden />}
                {i === crumbs.length - 1 ? (
                  <span aria-current="page" className="font-medium text-accent-deep">
                    {c.label}
                  </span>
                ) : (
                  <Link href={c.href} className="focus-ring rounded transition-colors hover:text-ink">
                    {c.label}
                  </Link>
                )}
              </span>
            ))}
          </nav>
        </Reveal>

        <Reveal index={1}>
          <p className="glass-panel mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-accent-deep">
            {eyebrow}
          </p>
        </Reveal>

        {/* Split across two SplitText runs so the trailing words can take the
            accent colour without nesting spans inside a single animated run. */}
        <h1 className="max-w-4xl font-display text-[2.2rem] font-semibold leading-[1.14] tracking-[-0.02em] text-ink sm:text-5xl md:text-[3.4rem]">
          {leadText && (
            <SplitText as="span" text={leadText} className="inline" trigger="mount" />
          )}
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
            <p className="mt-6 max-w-prose text-base leading-relaxed text-ink-muted sm:text-lg">
              {description}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
