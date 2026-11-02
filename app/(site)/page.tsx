import Link from "next/link";
import Hero from "@/components/Hero";
import { ServicesGrid } from "@/components/ServicesGrid";
import { ServiceAreas } from "@/components/ServiceAreas";
import WhyUs from "@/components/WhyUs";
import { Testimonials } from "@/components/Testimonials";
import Process from "@/components/Process";
import Gallery from "@/components/Gallery";
import { AboutLeader } from "@/components/AboutLeader";
import CTASection from "@/components/CTASection";
import { FAQ } from "@/components/FAQ";
import { QuoteBuilder } from "@/components/QuoteBuilder";
import { SectionHeading } from "@/components/SectionHeading";
import { Screen } from "@/components/Screen";
import { JsonLd } from "@/components/JsonLd";
import { Button, RollText, ArrowSwap } from "@/components/ui/button";
import { Reveal } from "@/lib/motion";
import { content } from "@/data/content";
import { graph, faqSchema, breadcrumbSchema } from "@/lib/structured-data";

/**
 * Home, as a run of one-screen chapters ordered like a sales conversation:
 * who we are → the work itself → who leads it → what we do → why trust us → what customers
 * say → how a job runs → build a quote. Coverage, FAQs and the closing call
 * to action follow as ordinary flowing sections.
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
      <Gallery index={1} />
      <AboutLeader index={2} showLinks />

      <Screen id="services" labelledBy="services-heading">
        <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
          <SectionHeading
            id="services-heading"
            index={3}
            eyebrow={content.home.servicesEyebrow}
            heading={content.home.servicesHeading}
            intro={content.home.servicesIntro}
            className="max-w-2xl"
          />
          <Reveal index={1} className="hidden sm:block">
            <Button asChild variant="outline">
              <Link href="/services">
                <RollText>{content.home.viewAllServices}</RollText>
                <ArrowSwap size={16} />
              </Link>
            </Button>
          </Reveal>
        </div>
        <ServicesGrid className="mt-[clamp(1.25rem,4svh,2.5rem)] min-h-[20rem] flex-1" />
      </Screen>

      <WhyUs index={4} />
      <Testimonials index={5} />
      <Process index={6} />
      <QuoteBuilder index={7} />
      <ServiceAreas index={8} />
      <FAQ index={9} />
      <CTASection />
    </>
  );
}
