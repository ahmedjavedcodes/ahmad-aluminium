import { site, cityName } from "@/data/site";

/** Where every "Get Free Quote" link leads: the quote builder on /contact. */
export const QUOTE_HREF = "/contact#quote";

/**
 * The WhatsApp message the quote builder pre-fills. Kept as plain lines so it
 * reads naturally in the chat and the workshop can reply point by point.
 */
export function buildQuoteMessage({
  services,
  area,
  details,
}: {
  services: string[];
  area: string;
  details: string;
}): string {
  const lines = [`Hi ${site.name}, I'd like a free quotation.`];
  if (services.length) lines.push(`Work needed: ${services.join(", ")}`);
  lines.push(`Site area: ${area ? `${area}, ${cityName}` : `(area in ${cityName})`}`);
  if (details.trim()) lines.push(`Details: ${details.trim()}`);
  return lines.join("\n");
}
