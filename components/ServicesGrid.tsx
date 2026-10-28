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
import { TiltCard } from "@/components/motion/TiltCard";

const iconMap: Record<ServiceIcon, LucideIcon> = {
  hammer: Hammer,
  doorOpen: DoorOpen,
  shield: Shield,
  sparkles: Sparkles,
  building: Building2,
  snowflake: Snowflake,
};

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = iconMap[service.icon];

  return (
    <Reveal index={index} className="group h-full">
      <TiltCard className="h-full">
        <Link
          href={`/services/${service.slug}`}
          data-cursor="hover"
          className="focus-ring relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-bg-elevated transition-[border-color,box-shadow,transform] duration-500 ease-out-expo hover:border-accent/30 hover:shadow-lift"
        >
          <div className="relative h-52 w-full overflow-hidden">
            <Image
              src={service.image}
              alt={`${service.title} — ${service.tagline}`}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-[900ms] ease-out-expo group-hover:scale-[1.08]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-elevated via-bg-elevated/10 to-transparent" />
            <span className="glass-panel absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl text-accent transition-transform duration-500 ease-out-expo group-hover:-rotate-6 group-hover:scale-110">
              <Icon size={18} aria-hidden />
            </span>
          </div>

          <div className="flex flex-1 flex-col p-6">
            <h3 className="font-display text-xl font-semibold text-ink">{service.title}</h3>
            <p className="mt-1.5 text-sm font-medium text-accent-deep">{service.tagline}</p>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
              {service.items.slice(0, 3).join(" · ")}
              {service.items.length > 3 ? " · and more" : ""}
            </p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors group-hover:text-accent">
              Explore {service.title.toLowerCase()}
              <ArrowUpRight
                size={16}
                aria-hidden
                className="transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </span>
          </div>
        </Link>
      </TiltCard>
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
