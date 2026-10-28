import { Reveal } from "@/lib/motion";
import { SectionHeading } from "@/components/SectionHeading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { content } from "@/data/content";
import type { SplitHeading } from "@/data/content";
import { cn } from "@/lib/utils";

export interface FaqItem {
  q: string;
  a: string;
}

/**
 * FAQ on the shadcn Accordion (Radix): keyboard support, ARIA wiring and the
 * height animation come from the primitive. Every answer is also published in
 * the page's FAQPage structured data, which is what crawlers and assistants
 * read.
 *
 * Full sections put the heading in a sticky left column; service pages pass
 * `headingText` and get a single stacked column instead.
 */
export function FAQ({
  items = content.faq.items as readonly FaqItem[],
  eyebrow = content.faq.eyebrow,
  heading = content.faq.heading,
  headingText,
  index,
}: {
  items?: readonly FaqItem[];
  eyebrow?: string;
  heading?: SplitHeading;
  /** Plain-string heading, used by service pages instead of a split heading. */
  headingText?: string;
  index?: number;
  /** Kept for API compatibility; layout now adapts on its own. */
  narrow?: boolean;
}) {
  const list = (
    <Accordion type="single" collapsible defaultValue="item-0" className="flex flex-col gap-3">
      {items.map((item, i) => (
        <Reveal key={item.q} index={i}>
          <AccordionItem value={`item-${i}`}>
            <AccordionTrigger index={i}>{item.q}</AccordionTrigger>
            <AccordionContent className="pl-[3.25rem] sm:pl-[3.5rem]">{item.a}</AccordionContent>
          </AccordionItem>
        </Reveal>
      ))}
    </Accordion>
  );

  if (headingText) {
    return (
      <section className="relative">
        <Reveal>
          <h2 className="font-display text-2xl font-bold tracking-[-0.02em] text-ink sm:text-3xl">
            {headingText}
          </h2>
        </Reveal>
        <div className="mt-6">{list}</div>
      </section>
    );
  }

  return (
    <section className="cv-block relative py-24 sm:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className={cn("lg:sticky lg:top-28")}>
            <SectionHeading index={index} eyebrow={eyebrow} heading={heading} />
          </div>
        </div>
        <div className="lg:col-span-8">{list}</div>
      </div>
    </section>
  );
}
