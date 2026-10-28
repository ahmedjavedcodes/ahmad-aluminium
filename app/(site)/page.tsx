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
import { QuoteBuilder } from "@/components/QuoteBuilder";
import { StatsStrip } from "@/components/motion/StatsStrip";
import { SectionHeading } from "@/components/SectionHeading";
import { JsonLd } from "@/components/JsonLd";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/lib/motion";
import { content } from "@/data/content";
import { graph, faqSchema, breadcrumbSchema } from "@/lib/structured-data";

/**
 * Home, ordered as a funnel: what we do → why trust us (values, real work,
 * Google reviews) → how a job runs → build a quote → coverage and FAQs for
 * the undecided → final call to action.
 */
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
          <StatsStrip className="mb-24" />

          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              index={1}
              eyebrow={content.home.servicesEyebrow}
              heading={content.home.servicesHeading}
              intro={content.home.servicesIntro}
              className="max-w-2xl"
            />
            <Reveal index={1}>
              <Button asChild variant="outline">
                <Link href="/services">
                  {content.home.viewAllServices}
                  <ArrowRight
                    size={16}
                    aria-hidden
                    className="transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
                  />
                </Link>
              </Button>
            </Reveal>
          </div>

          <div className="mt-12">
            <ServicesGrid />
          </div>
        </div>
      </section>

      <WhyUs index={2} />
      <Gallery index={3} />
      <Testimonials index={4} />
      <Process index={5} />
      <QuoteBuilder index={6} />
      <ServiceAreas index={7} />
      <FAQ index={8} />
      <CTASection />
    </>
  );
}
