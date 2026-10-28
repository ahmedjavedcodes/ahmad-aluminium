"use client";

import { Check, X } from "lucide-react";
import { site } from "@/data/site";
import { Reveal } from "@/lib/motion";
import { SectionHeading } from "@/components/SectionHeading";
import { cn } from "@/lib/utils";

/**
 * "Us vs them": one workshop compared with hiring a separate contractor per
 * trade. Every row restates a commitment made elsewhere on the site (one
 * team, on-site measurement, itemised quotes, adjustments after handover);
 * nothing is claimed about any named competitor.
 *
 * A real <table>, so assistive tech reads it as one. Rows rise in one after
 * another; the copper ticks follow a beat later.
 */
const ROWS: { label: string; us: string; them: string }[] = [
  { label: "Who you call", us: "One contact for every trade", them: "A different contractor for each trade" },
  { label: "Scheduling", us: "One schedule, with trades planned in order", them: "Trades waiting on each other" },
  { label: "Measurements", us: "Taken once, by the team that builds", them: "Each trade measures on its own" },
  { label: "Quotation", us: "One itemised quote with every line priced", them: "Separate quotes to compare and chase" },
  { label: "After handover", us: "Adjustments are part of the original job", them: "Working out whose problem it is" },
];

export function Compare({ index }: { index?: number }) {
  return (
    <section aria-labelledby="compare-heading" className="relative py-[clamp(4rem,10svh,7rem)]">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHeading
          id="compare-heading"
          index={index}
          eyebrow="One workshop or several contractors?"
          heading={{ lead: "One team", accent: "from start to finish", tail: "." }}
          intro="Most jobs need more than one trade. This is what changes when one workshop handles all of them."
          className="max-w-3xl"
        />

        <Reveal variant="rise" className="mt-10 overflow-hidden rounded-[clamp(1.25rem,3svh,2rem)] border border-border bg-bg-elevated shadow-card">
          <table className="w-full border-collapse text-left text-sm">
            <caption className="sr-only">{site.name} compared with hiring separate contractors</caption>
            <thead>
              <tr className="border-b border-border">
                <th scope="col" className="hidden w-[22%] px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-subtle sm:table-cell">
                  <span className="sr-only">Topic</span>
                </th>
                <th scope="col" className="theme-inverse px-4 py-4 font-display text-base font-bold text-ink sm:px-5">
                  {site.name}
                </th>
                <th scope="col" className="px-4 py-4 font-display text-base font-bold text-ink-muted sm:px-5">
                  Separate contractors
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r, i) => (
                <tr key={r.label} className="compare-row border-b border-border last:border-0" style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}>
                  <th scope="row" className="hidden px-5 py-4 align-top font-semibold text-ink sm:table-cell">
                    {r.label}
                  </th>
                  <td className="theme-inverse px-4 py-4 align-top sm:px-5">
                    <span className="sm:hidden mb-1 block text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-subtle">{r.label}</span>
                    <span className="flex items-start gap-2.5 text-ink">
                      <span className={cn("compare-mark mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-on-accent")}>
                        <Check size={12} strokeWidth={3} aria-hidden />
                      </span>
                      {r.us}
                    </span>
                  </td>
                  <td className="px-4 py-4 align-top text-ink-muted sm:px-5">
                    <span className="sm:hidden mb-1 block text-[11px] font-semibold uppercase tracking-[0.14em] text-transparent" aria-hidden>
                      {r.label}
                    </span>
                    <span className="flex items-start gap-2.5">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-surface text-ink-subtle ring-1 ring-border-strong">
                        <X size={12} strokeWidth={3} aria-hidden />
                      </span>
                      {r.them}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  );
}
