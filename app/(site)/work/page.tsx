import type { Metadata } from "next";
import { WorkShowcase } from "@/components/WorkShowcase";
import CTASection from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { content } from "@/data/content";
import { site, cityName } from "@/data/site";
import { absoluteUrl, breadcrumbSchema, graph } from "@/lib/structured-data";

const title = `Our Work in ${cityName}`;
const description = `Recent aluminium and glass, woodwork, iron, glass film, interior and AC projects by ${site.name} across ${cityName}. Free site survey and itemised quote.`;

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
