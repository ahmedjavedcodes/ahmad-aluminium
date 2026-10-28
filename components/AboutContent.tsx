import Image from "next/image";
import { Layers, ShieldCheck, Receipt, Wrench, type LucideIcon } from "lucide-react";
import { Reveal } from "@/lib/motion";
import { Spotlight } from "@/components/motion/Spotlight";
import { SectionHeading } from "@/components/SectionHeading";
import { content } from "@/data/content";
import { services } from "@/data/services";
import { cityName } from "@/data/site";

const icons: LucideIcon[] = [Layers, ShieldCheck, Receipt, Wrench];

export function AboutStory({ index }: { index?: number }) {
  return (
    <section className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading
              index={index}
              eyebrow={content.about.storyEyebrow}
              heading={content.about.storyHeading}
            />
            <Reveal index={1}>
              <p className="mt-6 leading-relaxed text-ink-muted">{content.about.storyP1}</p>
              <p className="mt-4 leading-relaxed text-ink-muted">{content.about.storyP2}</p>
            </Reveal>
          </div>

          <Reveal index={1} variant="scale">
            <div className="crop-marks">
              <div className="relative h-[440px] overflow-hidden rounded-[1.5rem] border border-border">
                <Image
                  src={services[0].image}
                  alt={`Aluminium and glass fabrication workshop in ${cityName}`}
                  fill
                  sizes="(min-width: 1024px) 45vw, (min-width: 640px) 100vw, 70vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 rounded bg-black/60 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-white/90">
                  Workshop · {cityName}
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function AboutValues({ index }: { index?: number }) {
  return (
    <section className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index={index}
          eyebrow={content.about.valuesEyebrow}
          heading={content.about.valuesHeading}
          className="max-w-2xl"
        />

        <Reveal index={1} className="mt-14">
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[1.5rem] border border-border bg-border sm:grid-cols-2">
            {content.about.values.map((v, i) => {
              const Icon = icons[i];
              return (
                <Spotlight key={v.title} className="group h-full bg-bg-elevated">
                  <div className="flex h-full flex-col p-8 sm:p-10">
                    <div className="mb-8 flex items-center justify-between">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-bg text-accent transition-colors duration-500 group-hover:border-accent/50">
                        <Icon size={20} aria-hidden />
                      </span>
                      <span className="font-mono text-[11px] text-ink-subtle">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="font-display text-xl font-bold tracking-[-0.015em] text-ink">{v.title}</h3>
                    <p className="mt-2.5 leading-relaxed text-ink-muted">{v.description}</p>
                  </div>
                </Spotlight>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
