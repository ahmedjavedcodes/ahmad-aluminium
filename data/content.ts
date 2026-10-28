import { cityName, site, serviceAreas, extendedAreas } from "@/data/site";

/**
 * All site copy in one place. Headings are split into `lead` + `accent` so the
 * accent word can take the solid brand colour (no gradient text) while the
 * heading stays a single, readable sentence for crawlers and screen readers.
 */
export interface SplitHeading {
  lead: string;
  accent: string;
  /** Trailing punctuation rendered after the accent word. */
  tail?: string;
}

export const content = {
  meta: {
    title: `Aluminium, Glass & Woodwork in ${cityName} | ${site.name}`,
    description: `${site.name} is a multi-trade fabrication and installation workshop in ${cityName} — aluminium and glass, woodwork, iron work, glass film, interior finishing and AC services for homes, offices, shops and industrial units. Free site survey and itemised quotation.`,
  },

  nav: {
    home: "Home",
    services: "Services",
    about: "About",
    contact: "Contact",
    quote: "Get Free Quote",
  },

  hero: {
    eyebrow: `Aluminium & Glass · Woodwork · Iron · Interiors · AC — ${cityName}`,
    titleLine1: "Aluminium, glass, wood and steel",
    titleLine2: `fabricated in ${cityName}`,
    paragraph: `${site.legalName} is a multi-trade workshop in ${cityName}, trading as ${site.name}. We fabricate and install aluminium and glass systems, custom woodwork, iron and steel work, glass film, complete interior finishing, and AC and refrigerator services — for homes, offices, shops and industrial units across the city.`,
    ctaPrimary: "Get Free Quote on WhatsApp",
    ctaSecondary: "Call Now",
    trust: [
      `Free site survey across ${cityName}`,
      "Itemised, no-hidden-cost quotes",
      "Fabricated and fitted in-house",
      "Residential, commercial & industrial",
    ],
  },

  stats: [
    { value: 6, suffix: "", label: "Trades under one roof", accent: "gold" },
    { value: 4, suffix: "", label: "Step process, survey to handover", accent: "teal" },
    { value: 20, suffix: "+", label: `${cityName} areas covered`, accent: "gold" },
    { value: 100, suffix: "%", label: "Free survey and quotation", accent: "teal" },
  ] as { value: number; suffix: string; label: string; accent: "gold" | "teal" }[],

  home: {
    servicesEyebrow: "What we do",
    servicesHeading: { lead: "Six trades.", accent: "One team", tail: "." } as SplitHeading,
    servicesIntro: `Each service below is fabricated and installed by our own people — not subcontracted out — anywhere in ${cityName}.`,
    viewAllServices: "View all services",
  },

  /** Location block — the on-page text that anchors the site to Lahore. */
  areas: {
    eyebrow: "Where we work",
    heading: { lead: "Covering", accent: `all of ${cityName}`, tail: "." } as SplitHeading,
    paragraph: `We survey, fabricate and install across ${cityName} and its housing societies. If your area is not listed, call us — we almost certainly cover it.`,
    list: serviceAreas,
    extendedLabel: "Larger commercial and industrial contracts also taken in:",
    extended: extendedAreas,
  },

  whyUs: {
    eyebrow: "Why choose us",
    heading: { lead: "Built properly,", accent: "delivered on time", tail: "." } as SplitHeading,
    values: [
      {
        title: "One team, six trades",
        description:
          "Aluminium, glass, wood, iron, film and cooling handled by one workshop — so no trade sits waiting on another and no one passes blame across a gap.",
      },
      {
        title: "Measured on site, every time",
        description: `Nothing is built to a guessed dimension. We survey your site in ${cityName} first, then fabricate to what we measured.`,
      },
      {
        title: "Itemised quotations",
        description:
          "Material, fabrication, hardware and installation priced separately — so you can see what drives the cost and adjust the scope before committing.",
      },
      {
        title: "Fitted by our own craftsmen",
        description:
          "Fabrication, welding, glazing and installation are done by our own team. The people who build it are the people who fit it.",
      },
      {
        title: "Specified for the climate",
        description: `Finishes, boards and coatings are chosen for ${cityName}'s heat, dust and humidity — not just for how they look on the day.`,
      },
      {
        title: "Reachable after handover",
        description:
          "We stay contactable once the job is done. Adjustments after installation are part of the work, not a new job.",
      },
    ],
  },

  process: {
    eyebrow: "How it works",
    heading: { lead: "From free survey to", accent: "final handover", tail: "." } as SplitHeading,
  },

  gallery: {
    eyebrow: "Our work",
    heading: { lead: "Craftsmanship you can", accent: "see", tail: "." } as SplitHeading,
    heroLabel: "Modern facades",
  },

  cta: {
    heading: { lead: "Ready to start your", accent: "project", tail: "?" } as SplitHeading,
    paragraph: `Book a free site survey anywhere in ${cityName}. We measure, advise, and send an itemised quotation — with no obligation to proceed.`,
  },

  footer: {
    tagline: `Multi-trade fabrication and installation in ${cityName} — aluminium and glass, woodwork, iron work, glass film, interior finishing and AC services.`,
    servicesHeading: "Services",
    companyHeading: "Company",
    contactHeading: "Contact",
    areasHeading: "Areas we cover",
    aboutUs: "About Us",
    allServices: "All Services",
    galleryLink: "Our Work",
    contactLink: "Contact",
    callWhatsapp: "Call / WhatsApp",
    email: "Email",
    serviceArea: "Address",
    workingHours: "Working Hours",
    copyright: (year: number) => `© ${year} ${site.legalName}. All rights reserved.`,
    servicesLine: `Aluminium & Glass · Woodwork · Iron Work · Glass Film · Interiors · AC — ${cityName}, Pakistan`,
  },

  faq: {
    eyebrow: "Common questions",
    heading: { lead: "Frequently asked", accent: "questions" } as SplitHeading,
    items: [
      {
        q: `Which areas of ${cityName} do you cover?`,
        a: `All of ${cityName} — DHA, Bahria Town, Johar Town, Model Town, Gulberg, Wapda Town, Valencia, Faisal Town, Garden Town, Iqbal Town, Cantt, Askari, Lake City, Paragon City and the surrounding societies. We also take larger commercial and industrial contracts in Kasur, Sheikhupura and Muridke.`,
      },
      {
        q: "Is the site survey and quotation really free?",
        a: "Yes. We visit, measure and assess at no cost, and the quotation that follows is itemised and carries no obligation to proceed.",
      },
      {
        q: "Can you handle a project that needs several trades at once?",
        a: "That is what the workshop is built for. Aluminium and glass, woodwork, iron work, film and blinds are coordinated by one team on one schedule, so you deal with a single point of contact instead of five contractors.",
      },
      {
        q: "How long does a typical project take?",
        a: "It depends on scope and material availability, so we do not guess. After the free survey you get a written schedule as part of the quotation, and that is the schedule we work to.",
      },
      {
        q: "Do you work on commercial and industrial projects, or only homes?",
        a: `Both. Homes, offices, shops, showrooms and industrial units across ${cityName} — from a single window replacement to a full office fit-out.`,
      },
      {
        q: "Do you offer support after installation?",
        a: "Yes. We stay reachable after handover, and adjustments to work we installed are handled as part of the job rather than billed as a new one.",
      },
      {
        q: "How do I get a quote?",
        a: `Call or WhatsApp ${site.phone}, or send the enquiry form on this site with your area and what you need. We normally respond the same working day and book the survey at a time that suits you.`,
      },
    ],
  },

  reviews: {
    eyebrow: "What clients say",
    heading: { lead: "Rated", accent: "5.0 on Google", tail: "." } as SplitHeading,
    intro: `Every review below is reproduced exactly as it was left on our Google Business Profile by customers in ${cityName}.`,
  },

  contactMethods: {
    whatsapp: {
      title: "WhatsApp us",
      body: "The fastest way to reach us. Send photos of the space and rough measurements and we can advise before we even visit.",
      cta: "Open WhatsApp",
    },
    call: {
      title: "Call us",
      body: `Speak to us directly about your project. We answer during working hours, six days a week.`,
      cta: "Call now",
    },
    visit: {
      title: "Visit the workshop",
      body: `Come and see the work in person, discuss your project and get a quotation on the spot.`,
      cta: "Get directions",
    },
  },

  servicesPage: {
    eyebrow: "What we do",
    title: `Our Services in ${cityName}`,
    heading: { lead: "Six trades,", accent: "one workshop", tail: "." } as SplitHeading,
    description: `Aluminium and glass, woodwork, iron work, glass film, interior finishing and AC services — fabricated and installed by one team across ${cityName}. Every service starts with a free site survey and an itemised quotation.`,
    crumbHome: "Home",
    crumbServices: "Services",
  },

  serviceDetail: {
    atAGlance: "At a glance",
    whatsIncluded: "What's included",
    whyChooseUs: (title: string) => `Why clients choose us for ${title.toLowerCase()}`,
    faqHeading: (title: string) => `${title} in ${cityName} — common questions`,
    areasHeading: (title: string) => `${title} across ${cityName}`,
    getFreeQuote: (title: string) => `Free quote for ${title.toLowerCase()}`,
    quoteBody: `Send us your area in ${cityName} and a photo of the space on WhatsApp. We book a free survey and follow up with an itemised quotation.`,
    requestQuotation: "Ask on WhatsApp",
    otherServices: "Other services you may need",
  },

  about: {
    eyebrow: "About us",
    title: `About ${site.name}`,
    metaTitle: `About ${site.name} | Workshop in ${cityName}`,
    heading: { lead: "A multi-trade workshop in", accent: cityName, tail: "." } as SplitHeading,
    description: `${site.name} is a fabrication and installation workshop in ${cityName} covering aluminium and glass, woodwork, iron and steel, glass film, interior finishing and cooling — so a project needing several trades does not need several contractors.`,
    crumb: "About",
    storyEyebrow: "Our story",
    storyHeading: { lead: "One workshop, built around", accent: "one standard", tail: "." } as SplitHeading,
    storyP1: `${site.legalName} began as an aluminium and glass fabrication workshop in ${cityName} and grew into a complete finishing partner — adding woodwork, iron fabrication, glass film and AC services as clients kept asking us to take on more of their project under one contract.`,
    storyP2: `Today that means a homeowner refitting a kitchen in Johar Town, a shop rebuilding its front in Gulberg, or a contractor finishing an office in DHA can come to one team for the fabrication, installation and finishing — with the same standard of material, workmanship and follow-through on every trade.`,
    valuesEyebrow: "What we stand for",
    valuesHeading: { lead: "The standard behind", accent: "every project", tail: "." } as SplitHeading,
    values: [
      {
        title: "One team, six trades",
        description:
          "Aluminium and glass, woodwork, iron, film, interiors and cooling — coordinated by one workshop instead of juggling a separate contractor for each trade.",
      },
      {
        title: "Built to last",
        description:
          "Materials and techniques are chosen for durability first, so what we install keeps performing long after the project is handed over.",
      },
      {
        title: "Transparent quotations",
        description:
          "Every project starts with a free, itemised quotation. No surprise costs appear once the work is underway.",
      },
      {
        title: "Hands-on craftsmanship",
        description:
          "Fabrication, welding, glazing, finishing and installation are handled by our own skilled team, not outsourced piecemeal.",
      },
    ],
  },

  contact: {
    eyebrow: "Get in touch",
    title: `Contact ${site.name} in ${cityName}`,
    metaTitle: `Contact Us in ${cityName} | ${site.name}`,
    description: `Message us on WhatsApp, call us, or visit the workshop in ${site.address.street}, ${cityName}. Free site survey and itemised quotation, with no obligation.`,
    crumb: "Contact",
  },
} as const;

export type Content = typeof content;
