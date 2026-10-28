import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ContactMethods } from "@/components/ContactMethods";
import { FAQ } from "@/components/FAQ";
import { ServiceAreas } from "@/components/ServiceAreas";
import { JsonLd } from "@/components/JsonLd";
import { heroImage } from "@/data/services";
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

      <PageHero
        eyebrow={content.contact.eyebrow}
        title={content.contact.title}
        accentWords={1}
        description={content.contact.description}
        crumbs={crumbs}
        image={heroImage}
      />

      <ContactMethods />
      <ServiceAreas />
      <FAQ />
    </>
  );
}
