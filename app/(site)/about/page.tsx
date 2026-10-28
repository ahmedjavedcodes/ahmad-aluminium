import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { AboutStory, AboutValues } from "@/components/AboutContent";
import { StatsStrip } from "@/components/motion/StatsStrip";
import Process from "@/components/Process";
import { ServiceAreas } from "@/components/ServiceAreas";
import Gallery from "@/components/Gallery";
import { Testimonials } from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { services } from "@/data/services";
import { content } from "@/data/content";
import { site } from "@/data/site";
import { absoluteUrl, breadcrumbSchema, graph } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: { absolute: content.about.metaTitle },
  description: content.about.description,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `${content.about.title} | ${site.name}`,
    description: content.about.description,
    url: absoluteUrl("/about"),
  },
};

const crumbs = [
  { href: "/", label: content.servicesPage.crumbHome },
  { href: "/about", label: content.about.crumb },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(crumbs))} />

      <PageHero
        eyebrow={content.about.eyebrow}
        title={content.about.title}
        accentWords={2}
        description={content.about.description}
        crumbs={crumbs}
        image={services[4].image}
      />

      <section className="relative pt-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <StatsStrip />
        </div>
      </section>

      <AboutStory index={1} />
      <AboutValues index={2} />
      <Testimonials index={3} />
      <Process index={4} />
      <ServiceAreas index={5} />
      <Gallery index={6} />
      <CTASection />
    </>
  );
}
