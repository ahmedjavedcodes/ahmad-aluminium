"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { Reveal } from "@/lib/motion";
import { SectionHeading } from "@/components/SectionHeading";
import { content } from "@/data/content";
import type { SplitHeading } from "@/data/content";

export interface FaqItem {
  q: string;
  a: string;
}

/**
 * Accordion FAQ. Answers stay in the DOM (height-animated, not conditionally
 * unmounted at the text level) so crawlers and AI assistants can read every
 * answer whether or not the panel happens to be open.
 */
export function FAQ({
  items = content.faq.items as readonly FaqItem[],
  eyebrow = content.faq.eyebrow,
  heading = content.faq.heading,
  headingText,
  narrow = true,
}: {
  items?: readonly FaqItem[];
  eyebrow?: string;
  heading?: SplitHeading;
  /** Plain-string heading, used by service pages instead of a split heading. */
  headingText?: string;
  narrow?: boolean;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className={headingText ? "relative" : "relative py-24 sm:py-28"}>
      <div className={`mx-auto px-5 sm:px-8 ${narrow ? "max-w-3xl" : "max-w-7xl px-0 sm:px-0"}`}>
        {headingText ? (
          <Reveal>
            <h2 className="font-display text-2xl font-semibold tracking-[-0.015em] text-ink sm:text-3xl">
              {headingText}
            </h2>
          </Reveal>
        ) : (
          <SectionHeading eyebrow={eyebrow} heading={heading} align="center" />
        )}

        <div className={`flex flex-col gap-3 ${headingText ? "mt-6" : "mt-12"}`}>
          {items.map((item, i) => {
            const isOpen = open === i;
            const panelId = `faq-panel-${i}`;
            const buttonId = `faq-button-${i}`;
            return (
              <Reveal
                key={item.q}
                index={i}
                className="overflow-hidden rounded-2xl border border-border bg-bg-elevated transition-colors duration-300 hover:border-accent/25"
              >
                <h3>
                  <button
                    id={buttonId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    data-cursor="hover"
                    className="focus-ring flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-medium text-ink">{item.q}</span>
                    <motion.span
                      aria-hidden
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                        isOpen ? "bg-accent text-on-accent" : "bg-accent-tint text-accent"
                      }`}
                    >
                      <Plus size={15} />
                    </motion.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-sm leading-relaxed text-ink-muted">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
