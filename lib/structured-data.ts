import { site, serviceAreas, extendedAreas, cityName } from "@/data/site";
import { services, type Service, type ServiceFaq } from "@/data/services";
import { googleRating, testimonials } from "@/data/testimonials";

/**
 * schema.org graph builders.
 *
 * Structured data is the single highest-leverage thing on a local trade site:
 * it is what lets Google place the business in local results, and what lets an
 * AI assistant answer "who does aluminium work in Lahore" with a named entity
 * rather than a vague summary. Everything here is derived from `data/site.ts`,
 * so the NAP stays identical across every page — inconsistent NAP is the most
 * common reason local entity matching fails.
 */

const BUSINESS_ID = `${site.url}/#business`;
const WEBSITE_ID = `${site.url}/#website`;

export function absoluteUrl(path = "/"): string {
  return new URL(path, site.url).toString();
}

const areaServed = [
  { "@type": "City", name: cityName, containedInPlace: { "@type": "Country", name: site.address.country } },
  ...serviceAreas.map((a) => ({ "@type": "Place", name: `${a}, ${cityName}` })),
  ...extendedAreas.map((a) => ({ "@type": "City", name: a })),
];

export function localBusinessSchema() {
  return {
    "@type": ["HomeAndConstructionBusiness", "GeneralContractor"],
    "@id": BUSINESS_ID,
    // `name` matches the Google Business Profile verbatim so the two
    // entities resolve to one another; the trading name is the alternate.
    name: site.legalName,
    alternateName: site.name,
    legalName: site.legalName,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    priceRange: site.priceRange,
    description: `Fabrication and installation workshop in ${cityName}, Pakistan, covering aluminium and glass, woodwork, iron and steel fabrication, glass film, interior finishing, and AC and refrigerator services for homes, businesses and industry.`,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    areaServed,
    openingHoursSpecification: site.openingHours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    ...(site.social.length ? { sameAs: site.social } : {}),
    // Rating and reviews mirrored from the Google Business Profile. Emitting
    // these lets a rich result — and an AI assistant comparing local firms —
    // cite the real score rather than inferring nothing.
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: googleRating.value,
      reviewCount: googleRating.count,
      bestRating: 5,
      worstRating: 1,
    },
    review: testimonials.map((t) => ({
      "@type": "Review",
      author: { "@type": "Person", name: t.name },
      datePublished: t.date,
      reviewBody: t.text,
      reviewRating: {
        "@type": "Rating",
        ratingValue: t.rating,
        bestRating: 5,
        worstRating: 1,
      },
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Services in ${cityName}`,
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.heading,
          description: s.answer,
          url: absoluteUrl(`/services/${s.slug}`),
        },
      })),
    },
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: site.url,
    name: site.name,
    inLanguage: "en-PK",
    publisher: { "@id": BUSINESS_ID },
  };
}

export function serviceSchema(service: Service) {
  return {
    "@type": "Service",
    "@id": absoluteUrl(`/services/${service.slug}#service`),
    name: service.heading,
    serviceType: service.title,
    description: service.answer,
    url: absoluteUrl(`/services/${service.slug}`),
    provider: { "@id": BUSINESS_ID },
    areaServed,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.title} options`,
      itemListElement: service.items.map((item) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: item },
      })),
    },
  };
}

export function faqSchema(faqs: readonly ServiceFaq[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(crumbs: { href: string; label: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: absoluteUrl(c.href),
    })),
  };
}

/** Wraps any set of nodes into a single @graph document. */
export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
