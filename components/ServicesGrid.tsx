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

export function ServicesGrid({ exclude }: { exclude?: string }) {
  const list = exclude ? services.filter((s) => s.slug !== exclude) : services;
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((service, i) => (
        <ServiceCard key={service.slug} service={service} index={i} />
      ))}
    </div>
  );
}
