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
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { services, type ServiceIcon, type Service } from "@/data/services";
import { Reveal } from "@/lib/motion";
import { Spotlight } from "@/components/motion/Spotlight";

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
    <Reveal index={index} className="group h-full">
      <Spotlight className="h-full rounded-xl">
        <Link
          href={`/services/${service.slug}`}
          className="focus-ring panel relative flex h-full flex-col overflow-hidden rounded-xl transition-[border-color,box-shadow,transform] duration-500 ease-out-expo hover:-translate-y-1 hover:border-accent/40 hover:shadow-deep"
        >
          <div className="relative aspect-[16/10] w-full overflow-hidden">
            <Image
              src={service.image}
              alt={`${service.title} — ${service.tagline}`}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover brightness-[0.85] saturate-[0.85] transition-[transform,filter] duration-[900ms] ease-out-expo group-hover:scale-[1.06] group-hover:brightness-100 group-hover:saturate-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-elevated via-bg-elevated/20 to-transparent" />
            <span className="absolute left-4 top-4 rounded bg-bg/70 px-2 py-1 font-mono text-[11px] tracking-[0.14em] text-ink backdrop-blur">
              {number}
            </span>
            <span className="glass-panel absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-lg text-accent transition-transform duration-500 ease-out-expo group-hover:-rotate-6 group-hover:scale-110">
              <Icon size={18} aria-hidden />
            </span>
          </div>

          <div className="relative flex flex-1 flex-col px-6 pb-6 pt-2">
            <h3 className="font-display text-2xl font-bold tracking-[-0.02em] text-ink">
              {service.title}
            </h3>
            <p className="mt-1.5 text-sm font-medium text-accent-deep">{service.tagline}</p>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
              {service.items.slice(0, 3).join(" · ")}
              {service.items.length > 3 ? " · and more" : ""}
            </p>
            <span className="mt-6 flex items-center justify-between border-t border-border pt-4 text-sm font-medium text-ink transition-colors group-hover:text-accent-deep">
              Explore {service.title.toLowerCase()}
              <span className="flex h-8 w-8 items-center justify-center rounded-md border border-border transition-[background-color,border-color,color] duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent">
                <ArrowUpRight size={16} aria-hidden />
              </span>
            </span>
          </div>

          {/* Copper edge that draws in along the bottom on hover. */}
          <span
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-accent transition-transform duration-700 ease-out-expo group-hover:scale-x-100"
          />
        </Link>
      </Spotlight>
    </Reveal>
  );
}

export function ServicesGrid({ exclude }: { exclude?: string }) {
  const list = exclude ? services.filter((s) => s.slug !== exclude) : services;
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((service, i) => (
        <ServiceCard key={service.slug} service={service} index={i} />
      ))}
    </div>
  );
}
