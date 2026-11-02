import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/lib/motion";
import { SectionHeading } from "@/components/SectionHeading";
import { Button, RollText, ArrowSwap } from "@/components/ui/button";
import { leadership } from "@/data/site";
import { WORK_HREF } from "@/lib/work";

/**
 * Leadership: the CEO's portrait beside the company's name, its three
 * principles and a short introduction. Used on /about and, with `showLinks`,
 * on the home page.
 */
export function AboutLeader({ index, showLinks = false }: { index?: number; showLinks?: boolean }) {
  const { companyName, tagline, ceo } = leadership;

  return (
    <section id="leadership" className="relative py-14 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading
              index={index}
              eyebrow="About us"
              heading={{ lead: "Quality, precision and", accent: "trust", tail: "." }}
            />
            <Reveal index={1}>
              <p className="mt-6 font-display text-lg font-bold tracking-[-0.01em] text-ink">{companyName}</p>
              <ul aria-label="Our principles" className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-semibold uppercase tracking-[0.16em] text-accent-deep">
                {tagline.map((t, i) => (
                  <li key={t} className="flex items-center gap-3">
                    {i > 0 && <span aria-hidden className="h-3.5 w-px bg-current opacity-40" />}
                    {t}
                  </li>
                ))}
              </ul>
              <p className="mt-6 leading-relaxed text-ink-muted">
                Led by {ceo.title.replace(" (CEO)", "")} {ceo.name}, we design, fabricate and install aluminium and
                glass systems for homes, businesses, factories and government buildings: curtain wall façades,
                double-glazed and sliding windows, glass partitions, shower enclosures and aluminium kitchens.
              </p>
              <p className="mt-4 leading-relaxed text-ink-muted">
                Recent work ranges from a coloured glass feature wall at Packages Mall, Lahore, and a factory
                curtain wall in Sialkot to windows and office partitions at the WAPDA grid station in Nowshera, and
                homes across DHA and Eden Society.
              </p>
            </Reveal>
            {showLinks && (
              <Reveal index={2} className="mt-8 flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/about">
                    <RollText>More about us</RollText>
                    <ArrowSwap size={16} />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href={WORK_HREF}>
                    <RollText>View our work</RollText>
                  </Link>
                </Button>
              </Reveal>
            )}
          </div>

          <Reveal index={1} variant="scale" className="lg:col-span-5">
            <figure className="mx-auto w-full max-w-[26rem] overflow-hidden rounded-[1.5rem] border border-border bg-ink shadow-deep">
              <Image
                src={ceo.photo}
                alt={`${ceo.name}, ${ceo.title} of ${companyName}`}
                width={896}
                height={1195}
                sizes="(min-width: 1024px) 26rem, 90vw"
                className="h-auto w-full"
              />
              <figcaption className="border-t-2 border-accent px-5 py-4 text-white">
                <span className="block font-display text-lg font-bold tracking-[-0.01em]">{ceo.name}</span>
                <span className="block text-sm text-white/70">{ceo.title}</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
