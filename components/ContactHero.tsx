"use client";

import Link from "next/link";
import { ChevronRight, Phone, MessageCircle } from "lucide-react";
import { content } from "@/data/content";
import { site, telHref, whatsappHref, cityName } from "@/data/site";
import { Reveal } from "@/lib/motion";
import { Screen } from "@/components/Screen";
import { SplitText } from "@/components/motion/SplitText";
import { QuoteForm } from "@/components/QuoteBuilder";

/**
 * Contact page opener: the quote form *is* the first screen.
 *
 * A compact title block (breadcrumb, page H1, one-line direct channels) sits
 * above the form, and the form takes the rest of the viewport — so a visitor
 * can start choosing trades without scrolling, on any device. The section
 * carries `id="quote"`, which every "Get Free Quote" link targets.
 */
export function ContactHero({ crumbs }: { crumbs: { href: string; label: string }[] }) {
  const words = content.contact.title.split(" ");
  const lead = words.slice(0, -1).join(" ");
  const last = words.slice(-1).join(" ");

  return (
    <Screen
      id="quote"
      labelledBy="contact-heading"
      reserveActionBar={false}
      className="pt-[clamp(5.25rem,11svh,7rem)]"
      background={
        <>
          <div aria-hidden className="blueprint absolute inset-0 -z-10" />
          <div aria-hidden className="absolute -right-40 -top-20 -z-10 h-[520px] w-[520px] rounded-full bg-accent/[0.1] blur-[130px]" />
        </>
      }
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Reveal>
            <nav
              aria-label="Breadcrumb"
              className="mb-[clamp(0.5rem,1.6svh,1rem)] hidden flex-wrap items-center gap-x-2 text-[12px] font-medium text-ink-subtle sm:flex"
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
          <h1
            id="contact-heading"
            className="font-display text-[length:clamp(1.8rem,min(4.2vw,5.4svh),3.6rem)] font-extrabold leading-[1.02] tracking-[-0.045em] text-ink"
          >
            {lead && <SplitText as="span" text={lead} className="inline" trigger="mount" />}
            {lead ? " " : null}
            <SplitText as="span" text={last} className="inline" wordClassName="text-accent" delay={0.12} trigger="mount" />
          </h1>
          <Reveal index={2}>
            <p className="mt-[clamp(0.4rem,1.4svh,0.9rem)] line-clamp-2 max-w-2xl text-[length:clamp(0.875rem,1.9svh,1rem)] leading-relaxed text-ink-muted sm:line-clamp-none">
              {content.contact.description}
            </p>
          </Reveal>
        </div>

        {/* Direct channels, for anyone who would rather not fill anything in. */}
        <Reveal index={2} className="hidden shrink-0 gap-2 sm:flex">
          <a
            href={telHref}
            className="focus-ring inline-flex items-center gap-2 rounded-full border border-border-strong bg-bg-elevated px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-accent/60"
          >
            <Phone size={15} className="text-accent" aria-hidden />
            <span className="font-mono">{site.phoneLocal}</span>
          </a>
          <a
            href={whatsappHref(`Hi ${site.name}, I'd like a free quotation. My area in ${cityName} is: `)}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring inline-flex items-center gap-2 rounded-full border border-border-strong bg-bg-elevated px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-accent/60"
          >
            <MessageCircle size={15} className="text-accent" aria-hidden />
            WhatsApp
          </a>
        </Reveal>
      </div>

      <QuoteForm className="mt-[clamp(1rem,3svh,2rem)] flex-1" />
    </Screen>
  );
}
