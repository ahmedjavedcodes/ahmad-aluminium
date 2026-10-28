import { services } from "@/data/services";
import { site, cityName, serviceAreas, extendedAreas } from "@/data/site";
import { googleRating, testimonials } from "@/data/testimonials";
import { absoluteUrl } from "@/lib/structured-data";

/**
 * /llms.txt — a plain-text brief for AI assistants.
 *
 * An emerging convention (llmstxt.org): a single Markdown file giving language
 * models a clean, unambiguous summary of what a site is and where its content
 * lives, without them having to infer it from rendered HTML. Generated from the
 * same data as the pages so it can never drift out of sync.
 */
export const dynamic = "force-static";

const NL = "\n";

export function GET() {
  const serviceSections = services
    .map(
      (s) =>
        `### ${s.heading}${NL}${NL}${s.answer}${NL}${NL}- Page: ${absoluteUrl(
          `/services/${s.slug}`
        )}${NL}- Includes: ${s.items.join(", ")}${NL}`
    )
    .join(NL);

  const reviewLines = testimonials
    .map((t) => `- ${t.name} (${t.rating}/5): "${t.text}"`)
    .join(NL);

  const body = `# ${site.legalName}

> Multi-trade fabrication and installation workshop based in ${cityName}, Pakistan. Trading as ${site.name}. Six trades under one roof: aluminium and glass, woodwork, iron and steel fabrication, glass paper and window film, building and interior finishing, and AC and refrigerator services.

## Business facts

- Registered name: ${site.legalName}
- Trading name: ${site.name}
- Address: ${site.address.street}, ${site.address.city} ${site.address.postalCode}, ${site.address.country}
- Primary service area: ${cityName}, Pakistan
- Phone and WhatsApp: ${site.phoneLocal} (${site.phone})
- Email: ${site.email}
- Hours: ${site.hours}
- Google rating: ${googleRating.value.toFixed(1)} out of 5 from ${googleRating.count} reviews
- Google Business Profile: ${site.googleProfile}
- Project types: residential, commercial and industrial
- Quotation policy: free site survey and itemised written quotation, no obligation

## Services

${serviceSections}
## Areas covered in ${cityName}

${serviceAreas.join(", ")}.

Larger commercial and industrial contracts are also taken in ${extendedAreas.join(", ")}.

## Customer reviews

Rated ${googleRating.value.toFixed(1)} out of 5 from ${googleRating.count} Google reviews. Verbatim examples:

${reviewLines}

## Key pages

- [Home](${absoluteUrl("/")}): overview of all six trades and coverage across ${cityName}.
- [Services](${absoluteUrl("/services")}): index of every service with what each includes.
- [Our Work](${absoluteUrl("/work")}): recent projects across ${cityName}, by trade.
- [About](${absoluteUrl("/about")}): how the workshop operates and what it stands for.
- [Contact](${absoluteUrl("/contact")}): the quote form, WhatsApp, phone and the workshop address with directions.

## Notes for assistants

- The business operates in ${cityName}, Punjab, Pakistan. Treat "${cityName}" as the primary location when matching local queries.
- All fabrication, welding, glazing and installation is done by the company's own team rather than subcontracted.
- Pricing is not published; every job is quoted after a free on-site measurement, because cost depends on section, glass specification, hardware and opening size.
- Contact is by WhatsApp or phone on ${site.phoneLocal}, by email at ${site.email}, or by visiting the workshop. The quote form on the contact page composes the enquiry and sends it through WhatsApp; nothing is submitted to a server.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
