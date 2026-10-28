import Link from "next/link";
import Image from "next/image";
import {
  Hammer,
  DoorOpen,
  Shield,
  Sparkles,
  Building2,
  Snowflake,
  type LucideIcon,
} from "lucide-react";
import { services, type ServiceIcon, type Service } from "@/data/services";
import { Reveal } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { SwipeGrid } from "@/components/Screen";
import { Spotlight } from "@/components/motion/Spotlight";
import { RollText, ArrowSwap } from "@/components/ui/button";

export const iconMap: Record<ServiceIcon, LucideIcon> = {
  hammer: Hammer,
  doorOpen: DoorOpen,
  shield: Shield,
  sparkles: Sparkles,
  building: Building2,
  snowflake: Snowflake,
};

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = iconMap[service.icon];
  const number = String(services.indexOf(service) + 1).padStart(2, "0");

  return (
    <Reveal index={index % 3} variant="rise" className="h-full">
      <Spotlight className="h-full rounded-[1.5rem]">
        <Link
          href={`/services/${service.slug}`}
          className="focus-ring panel hover-rim group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] p-2.5 transition-[box-shadow,transform] duration-700 ease-out-expo hover:-translate-y-1.5 hover:shadow-deep"
        >
          {/* Photo wipes in as the card scrolls into view, then zooms on hover. */}
          <Reveal variant="clip" index={index % 3} className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl bg-bg-sunken">
            <Image
              src={service.image}
              alt={`${service.title}: ${service.tagline}`}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 70vw"
              className="object-cover transition-transform duration-[1200ms] ease-out-expo group-hover:scale-[1.07]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60 transition-opacity duration-700 group-hover:opacity-100" />
            <span className="absolute left-3 top-3 rounded-full bg-white/85 px-2.5 py-1 font-mono text-[11px] font-medium tracking-[0.12em] text-ink">
              {number}
            </span>
            <span className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/85 text-accent transition-[transform,background-color,color] duration-500 ease-out-expo group-hover:rotate-[-8deg] group-hover:scale-110 group-hover:bg-accent group-hover:text-on-accent">
              <Icon size={18} aria-hidden />
            </span>
          </Reveal>

          <div className="relative flex flex-1 flex-col px-4 pb-4 pt-6">
            <h3 className="font-display text-[1.6rem] font-bold leading-tight tracking-[-0.03em] text-ink transition-colors duration-500 group-hover:text-accent-deep">
              {service.title}
            </h3>
            <p className="mt-1.5 text-sm font-semibold text-accent-deep">{service.tagline}</p>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
              {service.items.slice(0, 3).join(" · ")}
              {service.items.length > 3 ? " · and more" : ""}
            </p>
            <span className="mt-6 flex items-center justify-between border-t border-border pt-4 text-sm font-semibold text-ink">
              <RollText>{`Explore ${service.title.toLowerCase()}`}</RollText>
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border-strong transition-[background-color,border-color,color,transform] duration-500 ease-out-expo group-hover:scale-110 group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent">
                <ArrowSwap diagonal size={16} />
              </span>
            </span>
          </div>
        </Link>
      </Spotlight>
    </Reveal>
  );
}

/**
 * Bento placement for the six services (lg: 12 columns × 3 equal rows that
 * share the section's height):
 *
 *   ┌─────────────┬─────────────┐
 *   │             │      1      │
 *   │             ├──────┬──────┤
 *   │      0      │  2   │  3   │
 *   │             ├──────┼──────┤
 *   │             │  4   │  5   │
 *   └─────────────┴──────┴──────┘
 *
 * Below `lg` the tiles become a swipe rail, so the section still fits one
 * screen on a phone.
 */
const BENTO = [
  "lg:col-span-6 lg:row-span-3",
  "lg:col-span-6",
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-3",
];

function BentoTile({ service, index }: { service: Service; index: number }) {
  const Icon = iconMap[service.icon];
  const feature = index === 0;
  const number = String(services.indexOf(service) + 1).padStart(2, "0");

  return (
    <Reveal
      index={index}
      variant="rise"
      className={cn("w-[82%] shrink-0 snap-start sm:w-[46%] lg:w-auto", BENTO[index] ?? "lg:col-span-4")}
    >
      <Link
        href={`/services/${service.slug}`}
        className="focus-ring group relative block h-full overflow-hidden rounded-[clamp(1.25rem,3svh,2rem)] bg-bg-sunken shadow-card transition-[box-shadow,transform] duration-700 ease-out-expo hover:-translate-y-1 hover:shadow-deep"
      >
        <Image
          src={service.image}
          alt={`${service.title}: ${service.tagline}`}
          fill
          sizes={feature ? "(min-width: 1024px) 42vw, (min-width: 640px) 85vw, 60vw" : "(min-width: 1024px) 34vw, (min-width: 640px) 46vw, 60vw"}
          className="object-cover transition-transform duration-[1400ms] ease-out-expo group-hover:scale-[1.08]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/0 transition-opacity duration-700 group-hover:opacity-90" />

        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4 sm:p-5">
          <span
            className={cn(
              "rounded-full bg-white/90 px-3 py-1 font-mono text-[11px] font-medium tracking-[0.12em] text-ink",
              index > 1 && "lg:invisible"
            )}
          >
            {number}
          </span>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-accent transition-[transform,background-color,color] duration-500 ease-out-expo group-hover:rotate-[-10deg] group-hover:scale-110 group-hover:bg-accent group-hover:text-on-accent">
            <Icon size={18} aria-hidden />
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 lg:p-6">
          <div className="flex items-end justify-between gap-4">
            <div className="min-w-0">
              <h3
                className={cn(
                  "font-display font-extrabold leading-[1.05] tracking-[-0.035em] text-white",
                  feature
                    ? "text-[length:clamp(1.6rem,min(2.6vw,4.4svh),2.6rem)]"
                    : index === 1
                      ? "text-[length:clamp(1.3rem,min(1.9vw,3.2svh),1.75rem)]"
                      : "text-[length:clamp(1.15rem,min(1.45vw,2.6svh),1.4rem)]"
                )}
              >
                {service.title}
              </h3>
              <p className={cn("mt-1.5 text-sm font-medium text-white/80", feature ? "line-clamp-2" : "line-clamp-2 lg:line-clamp-1")}>
                {service.tagline}
              </p>
            </div>
            <span
              className={cn(
                "flex shrink-0 items-center justify-center rounded-full bg-white text-ink transition-[background-color,color,transform] duration-500 ease-out-expo group-hover:scale-110 group-hover:bg-accent group-hover:text-on-accent",
                index > 1 ? "h-11 w-11 lg:h-9 lg:w-9" : "h-11 w-11"
              )}
            >
              <ArrowSwap diagonal size={16} />
            </span>
          </div>

          {/* Scope chips slide open on hover; the full list is on each
              service page. Kept open on the tall desktop feature tile. */}
          <ul
            className={cn(
              "flex flex-wrap gap-1.5 overflow-hidden transition-[max-height,opacity,margin] duration-700 ease-out-expo",
              "mt-0 max-h-0 opacity-0 group-hover:mt-3 group-hover:max-h-24 group-hover:opacity-100 group-focus-visible:mt-3 group-focus-visible:max-h-24 group-focus-visible:opacity-100",
              feature && "lg:mt-4 lg:max-h-28 lg:opacity-100"
            )}
          >
            {service.items.slice(0, feature ? 4 : 3).map((item) => (
              <li
                key={item}
                className="rounded-full border border-white/25 bg-black/35 px-3 py-1 text-xs font-medium text-white"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Link>
    </Reveal>
  );
}

export function ServicesGrid({
  exclude,
  layout = "bento",
  className,
}: {
  exclude?: string;
  /** Height for the bento (it fills its container); e.g. "flex-1 min-h-[22rem]". */
  className?: string;
  /** "bento" for the full service list, "cards" for short related lists. */
  layout?: "bento" | "cards";
}) {
  const list = exclude ? services.filter((s) => s.slug !== exclude) : services;

  if (layout === "cards") {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((service, i) => (
          <ServiceCard key={service.slug} service={service} index={i} />
        ))}
      </div>
    );
  }

  return (
    <SwipeGrid
      label="Services. Swipe for more."
      className={cn("lg:grid-cols-12 lg:grid-rows-3 lg:gap-4", className)}
    >
      {list.map((service, i) => (
        <BentoTile key={service.slug} service={service} index={i} />
      ))}
    </SwipeGrid>
  );
}
