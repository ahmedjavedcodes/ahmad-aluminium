import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ServicesGrid } from "@/components/ServicesGrid";
import { ServiceAreas } from "@/components/ServiceAreas";
import CTASection from "@/components/CTASection";
import Process from "@/components/Process";
import { QuoteBuilder } from "@/components/QuoteBuilder";
import { JsonLd } from "@/components/JsonLd";
import { heroImage, services } from "@/data/services";
import { content } from "@/data/content";
import { cityName, site } from "@/data/site";
import { absoluteUrl, breadcrumbSchema, graph } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: content.servicesPage.title,
  description: content.servicesPage.description,
  alternates: { canonical: "/services" },
  openGraph: {
    title: `${content.servicesPage.title} | ${site.name}`,
    description: content.servicesPage.description,
    url: absoluteUrl("/services"),
  },
};

const crumbs = [
  { href: "/", label: content.servicesPage.crumbHome },
  { href: "/services", label: content.servicesPage.crumbServices },
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={graph(breadcrumbSchema(crumbs), {
          "@type": "ItemList",
          name: `Services in ${cityName}`,
          itemListElement: services.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: s.heading,
            url: absoluteUrl(`/services/${s.slug}`),
          })),
        })}
      />

      <PageHero
        eyebrow={content.servicesPage.eyebrow}
        title={content.servicesPage.title}
        accentWords={1}
        description={content.servicesPage.description}
        crumbs={crumbs}
        image={heroImage}
      />

      <section className="relative py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <ServicesGrid className="h-[clamp(26rem,82svh,52rem)]" />
        </div>
      </section>

      <Process index={1} />
      <QuoteBuilder index={2} />
      <ServiceAreas index={3} />
      <CTASection />
    </>
  );
}
