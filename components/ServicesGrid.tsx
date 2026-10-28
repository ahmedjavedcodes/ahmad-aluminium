"use client";

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
              alt={`${service.title} — ${service.tagline}`}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-[1200ms] ease-out-expo group-hover:scale-[1.07]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60 transition-opacity duration-700 group-hover:opacity-100" />
            <span className="absolute left-3 top-3 rounded-full bg-white/85 px-2.5 py-1 font-mono text-[11px] font-medium tracking-[0.12em] text-ink backdrop-blur">
              {number}
            </span>
            <span className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/85 text-accent backdrop-blur transition-[transform,background-color,color] duration-500 ease-out-expo group-hover:rotate-[-8deg] group-hover:scale-110 group-hover:bg-accent group-hover:text-on-accent">
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
 * Bento placement for the six services (lg, 12 columns × 270px rows):
 *
 *   ┌───────────────┬──────────┐
 *   │               │    1     │
 *   │       0       ├──────────┤
 *   │               │    2     │
 *   ├──────┬────────┴─┬────────┤
 *   │  3   │    4     │   5    │
 *   └──────┴──────────┴────────┘
 *
 * On tablets the feature spans both columns and the rest pair up; on phones
 * every tile stacks at one height.
 */
const BENTO = [
  "sm:col-span-2 lg:col-span-7 lg:row-span-2",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
];

function BentoTile({ service, index }: { service: Service; index: number }) {
  const Icon = iconMap[service.icon];
  const feature = index === 0;
  const number = String(services.indexOf(service) + 1).padStart(2, "0");

  return (
    <Reveal index={index} variant="rise" className={cn("h-full", BENTO[index] ?? "lg:col-span-4")}>
      <Link
        href={`/services/${service.slug}`}
        className="focus-ring group relative block h-full overflow-hidden rounded-[2rem] bg-bg-sunken shadow-card transition-[box-shadow,transform] duration-700 ease-out-expo hover:-translate-y-1 hover:shadow-deep"
      >
        <Image
          src={service.image}
          alt={`${service.title} — ${service.tagline}`}
          fill
          sizes={feature ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 34vw, (min-width: 640px) 50vw, 100vw"}
          className="object-cover transition-transform duration-[1400ms] ease-out-expo group-hover:scale-[1.08]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/0 transition-opacity duration-700 group-hover:opacity-90" />

        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
          <span className="rounded-full bg-white/90 px-3 py-1 font-mono text-[11px] font-medium tracking-[0.12em] text-ink backdrop-blur">
            {number}
          </span>
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-accent backdrop-blur transition-[transform,background-color,color] duration-500 ease-out-expo group-hover:rotate-[-10deg] group-hover:scale-110 group-hover:bg-accent group-hover:text-on-accent">
            <Icon size={19} aria-hidden />
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
          <div className="flex items-end justify-between gap-4">
            <div className="min-w-0">
              <h3
                className={cn(
                  "font-display font-extrabold leading-[1.05] tracking-[-0.035em] text-white",
                  feature ? "text-3xl sm:text-[2.6rem]" : "text-2xl"
                )}
              >
                {service.title}
              </h3>
              <p className={cn("mt-2 font-medium text-white/80", feature ? "text-base" : "text-sm")}>
                {service.tagline}
              </p>
            </div>
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-ink transition-[background-color,color,transform] duration-500 ease-out-expo group-hover:scale-110 group-hover:bg-accent group-hover:text-on-accent">
              <ArrowSwap diagonal size={18} />
            </span>
          </div>

          {/* Scope list: always open on the large desktop feature tile, slides
              open on hover elsewhere. The full list is on each service page. */}
          <ul
            className={cn(
              "flex flex-wrap gap-1.5 overflow-hidden transition-[max-height,opacity,margin] duration-700 ease-out-expo",
              "mt-0 max-h-0 opacity-0 group-hover:mt-4 group-hover:max-h-32 group-hover:opacity-100 group-focus-visible:mt-4 group-focus-visible:max-h-32 group-focus-visible:opacity-100",
              // The feature tile is tall enough on desktop to keep it open.
              feature && "lg:mt-5 lg:max-h-40 lg:opacity-100"
            )}
          >
            {service.items.slice(0, feature ? 5 : 3).map((item) => (
              <li
                key={item}
                className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-md"
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
}: {
  exclude?: string;
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
    <div className="grid auto-rows-[340px] grid-cols-1 gap-4 sm:grid-cols-2 sm:auto-rows-[320px] lg:grid-cols-12 lg:auto-rows-[270px]">
      {list.map((service, i) => (
        <BentoTile key={service.slug} service={service} index={i} />
      ))}
    </div>
  );
}
