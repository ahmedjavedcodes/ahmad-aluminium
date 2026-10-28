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
    <section className="relative isolate overflow-hidden border-b border-border pb-16 pt-36 sm:pb-20 sm:pt-44">
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
        {/* Dark ground under the copy, clearing to the right so the
            photograph still reads on wide screens. */}
        <div className="absolute inset-0 bg-bg/80 lg:bg-transparent" />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-bg from-[40%] via-bg/80 via-[65%] to-bg/25 lg:block" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bg to-transparent" />
      </div>
      <div aria-hidden className="blueprint absolute inset-0 -z-10 opacity-60" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
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
                  <Link href={c.href} className="focus-ring rounded transition-colors hover:text-ink">
                    {c.label}
                  </Link>
                )}
              </span>
            ))}
          </nav>
        </Reveal>

        <Reveal index={1}>
          <p className="mb-6 inline-flex items-center gap-2.5 rounded-md border border-accent/30 bg-accent-tint px-3 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-accent-deep">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
            {eyebrow}
          </p>
        </Reveal>

        {/* Two SplitText runs so the trailing words can take the accent colour
            without nesting spans inside a single animated run. */}
        <h1 className="max-w-4xl font-display text-[2.4rem] font-bold leading-[1.02] tracking-[-0.035em] text-ink sm:text-6xl md:text-[4.2rem]">
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
            <p className="mt-7 max-w-prose text-base leading-relaxed text-ink-muted sm:text-lg">
              {description}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
