/* ---------------------------------------------------------------------------
 * Single source of truth for business identity, NAP (name / address / phone)
 * and SEO defaults.
 *
 * Values below come from the business's own Google Business Profile, so the
 * site, the sitemap and the LocalBusiness structured data all match the
 * listing exactly — inconsistent NAP across a site and its Google profile is
 * the most common reason local entity matching fails.
 *
 * ⚠️  Two items still need confirming — both marked TODO below: the live
 * domain, and the opening hours. The address, phone, email and map pin are
 * all confirmed from the owner's Google Business Profile and Maps link.
 * ------------------------------------------------------------------------- */

export const site = {
  /** Short trading name — used in the wordmark, page titles and body copy. */
  name: "Ahmad Aluminium & Glass",
  /** Registered name, exactly as it appears on the Google Business Profile.
   *  Used for the schema.org `name` so the NAP matches the listing verbatim. */
  legalName: "AHMAD ALUMINIUM & GLASS FABRICATION ( SMC-PRIVATE ) LIMITED",

  /** TODO: replace with the real production domain once it is registered. */
  url: "https://www.ahmadaluminiumglass.com",

  /** From the Google Business Profile: 0306 4807644. */
  phone: "+92 306 4807644",
  /** Displayed in local format, which is how customers will dial it. */
  phoneLocal: "0306 4807644",
  whatsapp: "+92 306 4807644",
  email: "ahmadaluminium56@gmail.com",

  address: {
    street: "High Court Society",
    city: "Lahore",
    region: "Punjab",
    postalCode: "54000",
    country: "Pakistan",
    countryCode: "PK",
  },

  /**
   * The workshop's actual pin, resolved from the owner's Google Maps link.
   * Reverse-geocodes to Wapda Town / High Court Society, about 13km south-west
   * of Lahore city centre — replacing the earlier city-centre approximation.
   */
  geo: { latitude: 31.4343424, longitude: 74.268672 },

  /** The business's own Google Maps place link. */
  mapsUrl: "https://maps.app.goo.gl/oyUhh8EExVSRz1R69",

  /**
   * TODO: confirm and fix on the Google profile too. The listing currently
   * reads "Closes 7 am", which is almost certainly a 7 AM/7 PM mix-up when the
   * hours were entered — it makes the business look closed all day in search
   * results. The hours below assume 7 PM.
   */
  hours: "Monday – Saturday, 9:00 AM – 7:00 PM",
  openingHours: [
    {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "19:00",
    },
  ],

  /** Public Google Business Profile link — lets visitors verify the reviews. */
  googleProfile: "https://share.google/98JTnq8VPj6YfFfjb",

  /** TODO: add Facebook / Instagram URLs — strong entity signals for AI search. */
  social: [] as string[],

  priceRange: "$$",
} as const;

export const cityName = site.address.city;

/**
 * Neighbourhoods and towns the business covers. These are the phrases people
 * actually type ("aluminium windows in DHA Lahore"), so they are rendered as
 * real on-page text and mirrored into `areaServed` in the structured data.
 */
export const serviceAreas = [
  "High Court Society",
  "DHA Lahore",
  "Bahria Town",
  "Johar Town",
  "Model Town",
  "Gulberg",
  "Wapda Town",
  "Valencia Town",
  "Faisal Town",
  "Garden Town",
  "Allama Iqbal Town",
  "Township",
  "Shadman",
  "Cantt & Askari",
  "EME Society",
  "Lake City",
  "Paragon City",
  "State Life Housing",
  "LDA Avenue",
  "Thokar Niaz Baig",
  "Raiwind Road",
  "Ferozepur Road",
  "Multan Road",
] as const;

/** Nearby cities taken on for larger commercial and industrial contracts. */
export const extendedAreas = ["Kasur", "Sheikhupura", "Muridke", "Raiwind", "Manga Mandi"] as const;

export const nap = {
  full: `${site.address.street}, ${site.address.city}, ${site.address.postalCode}, ${site.address.country}`,
  short: `${site.address.street}, ${site.address.city}`,
} as const;

/** Digits-only number for tel: and wa.me links. */
export const telHref = `tel:${site.phone.replace(/\s+/g, "")}`;
export const whatsappDigits = site.whatsapp.replace(/[^\d]/g, "");

/** WhatsApp deep link, optionally pre-filling the first message. */
export function whatsappHref(message?: string): string {
  const base = `https://wa.me/${whatsappDigits}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/**
 * Directions to the exact pin. Coordinates rather than an address string: a
 * text search for "High Court Society" can resolve to the wrong place, while
 * the lat/long always lands on the workshop.
 */
export const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${site.geo.latitude},${site.geo.longitude}`;

/**
 * Embeddable map centred on the workshop.
 *
 * OpenStreetMap rather than Google. Every keyless Google embed either refuses
 * to be framed (`maps?q=...&output=embed` answers 301 +
 * `X-Frame-Options: SAMEORIGIN`) or renders an empty box, and the Maps Embed
 * API needs a billable key. OSM is keyless, frameable, sets no third-party
 * tracking cookies, and shows a real marker. The card still links out to the
 * business's own Google listing for directions and reviews.
 */
const BOX = 0.008; // ~900m around the pin
export const mapEmbedSrc =
  "https://www.openstreetmap.org/export/embed.html?bbox=" +
  [
    site.geo.longitude - BOX,
    site.geo.latitude - BOX / 2,
    site.geo.longitude + BOX,
    site.geo.latitude + BOX / 2,
  ].join("%2C") +
  `&layer=mapnik&marker=${site.geo.latitude}%2C${site.geo.longitude}`;
