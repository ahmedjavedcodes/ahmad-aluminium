import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Hero from "@/components/Hero";
import { ServicesGrid } from "@/components/ServicesGrid";
import { ServiceAreas } from "@/components/ServiceAreas";
import WhyUs from "@/components/WhyUs";
import { Testimonials } from "@/components/Testimonials";
import Process from "@/components/Process";
import Gallery from "@/components/Gallery";
import CTASection from "@/components/CTASection";
import { FAQ } from "@/components/FAQ";
import { StatsStrip } from "@/components/motion/StatsStrip";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { SectionHeading } from "@/components/SectionHeading";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/lib/motion";
import { content } from "@/data/content";
import { graph, faqSchema, breadcrumbSchema } from "@/lib/structured-data";

export default function Home() {
  return (
    <>
      <JsonLd
        data={graph(
          faqSchema(content.faq.items),
          breadcrumbSchema([{ href: "/", label: "Home" }])
        )}
      />

      <Hero />

      <section className="relative py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="glass-panel mb-16 rounded-3xl p-8 sm:p-10">
            <StatsStrip />
          </div>

          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow={content.home.servicesEyebrow}
              heading={content.home.servicesHeading}
              intro={content.home.servicesIntro}
              className="max-w-2xl"
            />
            <Reveal index={1}>
              <MagneticButton strength={0.2}>
                <Link
                  href="/services"
                  data-cursor="hover"
                  className="focus-ring group inline-flex cursor-pointer items-center gap-2 rounded-xl border border-border bg-bg-elevated px-5 py-3 text-sm font-medium text-ink transition-colors duration-300 hover:border-accent/40 hover:text-accent"
                >
                  {content.home.viewAllServices}
                  <ArrowRight
                    size={16}
                    aria-hidden
                    className="transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
                  />
                </Link>
              </MagneticButton>
            </Reveal>
          </div>

          <div className="mt-12">
            <ServicesGrid />
          </div>
        </div>
      </section>

      <WhyUs />
      <Testimonials />
      <Process />
      <ServiceAreas />
      <Gallery />
      <FAQ />
      <CTASection />
    </>
  );
}
