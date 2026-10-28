import type { Metadata } from "next";
import { ContactMethods } from "@/components/ContactMethods";
import { ContactHero } from "@/components/ContactHero";
import { FAQ } from "@/components/FAQ";
import { ServiceAreas } from "@/components/ServiceAreas";
import { JsonLd } from "@/components/JsonLd";
import { content } from "@/data/content";
import { absoluteUrl, breadcrumbSchema, faqSchema, graph } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: { absolute: content.contact.metaTitle },
  description: content.contact.description,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: content.contact.metaTitle,
    description: content.contact.description,
    url: absoluteUrl("/contact"),
  },
};

const crumbs = [
  { href: "/", label: content.servicesPage.crumbHome },
  { href: "/contact", label: content.contact.crumb },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={graph(breadcrumbSchema(crumbs), faqSchema(content.faq.items), {
          "@type": "ContactPage",
          url: absoluteUrl("/contact"),
          name: content.contact.title,
          description: content.contact.description,
        })}
      />

      {/* The form is the first screen: no scrolling before starting a quote. */}
      <ContactHero crumbs={crumbs} />
      <ContactMethods index={1} />
      <ServiceAreas index={2} />
      <FAQ index={3} />
    </>
  );
}
