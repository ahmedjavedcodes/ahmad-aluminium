import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services, getService } from "@/data/services";
import { content } from "@/data/content";
import { PageHero } from "@/components/PageHero";
import { ServiceDetail } from "@/components/ServiceDetail";
import CTASection from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";
import {
  absoluteUrl,
  breadcrumbSchema,
  faqSchema,
  graph,
  serviceSchema,
} from "@/lib/structured-data";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  const url = absoluteUrl(`/services/${slug}`);
  return {
    // Absolute: seoTitle already carries the brand-defining phrase and the
    // city, so appending the site template would push it past the ~60 chars
    // a search result actually displays.
    title: { absolute: service.seoTitle },
    description: service.metaDescription,
    keywords: service.keywords,
    alternates: { canonical: `/services/${slug}` },
    openGraph: {
      type: "article",
      title: service.seoTitle,
      description: service.metaDescription,
      url,
      images: [{ url: service.image, alt: service.heading }],
    },
    twitter: {
      card: "summary_large_image",
      title: service.seoTitle,
      description: service.metaDescription,
      images: [service.image],
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = services.filter((s) => s.slug !== slug).slice(0, 3);

  const crumbs = [
    { href: "/", label: content.servicesPage.crumbHome },
    { href: "/services", label: content.servicesPage.crumbServices },
    { href: `/services/${service.slug}`, label: service.title },
  ];

  return (
    <>
      <JsonLd
        data={graph(
          serviceSchema(service),
          faqSchema(service.faqs),
          breadcrumbSchema(crumbs)
        )}
      />

      <PageHero
        eyebrow={service.tagline}
        title={service.heading}
        accentWords={2}
        description={service.metaDescription}
        crumbs={crumbs}
        image={service.image}
      />

      <ServiceDetail service={service} related={related} />
      <CTASection />
    </>
  );
}
