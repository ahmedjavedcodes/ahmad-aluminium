import type { Metadata } from "next";
import { WorkShowcase } from "@/components/WorkShowcase";
import CTASection from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { content } from "@/data/content";
import { site, cityName } from "@/data/site";
import { absoluteUrl, breadcrumbSchema, graph } from "@/lib/structured-data";

const title = `Our Work in ${cityName}`;
const description = `Aluminium and glass, woodwork, iron work, glass film, interiors and AC projects by ${site.name} across ${cityName}. Browse the work, then get a free site survey and itemised quotation.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/work" },
  openGraph: {
    title: `${title} | ${site.name}`,
    description,
    url: absoluteUrl("/work"),
  },
};

const crumbs = [
  { href: "/", label: content.servicesPage.crumbHome },
  { href: "/work", label: content.gallery.eyebrow },
];

export default function WorkPage() {
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema(crumbs))} />
      <WorkShowcase crumbs={crumbs} />
      <CTASection />
    </>
  );
}
