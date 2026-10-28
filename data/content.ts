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
    description: `Aluminium and glass, woodwork, iron work, glass film, interiors and AC services in ${cityName}, made and fitted by one workshop. Free site survey and itemised quote.`,
  },

  nav: {
    home: "Home",
    services: "Services",
    about: "About",
    contact: "Contact",
    quote: "Get Free Quote",
  },

  hero: {
    eyebrow: `Aluminium & Glass · Woodwork · Iron · Interiors · AC · ${cityName}`,
    titleLine1: "Aluminium, glass, wood and steel",
    titleLine2: `fabricated in ${cityName}`,
    paragraph: `${site.legalName}, trading as ${site.name}, is a workshop in ${cityName}. We make and install aluminium and glass systems, custom woodwork, iron and steel work and glass film, take on complete interior finishing, and repair and service ACs and fridges. We work for homes, offices, shops and industrial units across the city.`,
    ctaPrimary: "Get Free Quote on WhatsApp",
    ctaSecondary: "Call Now",
    trust: [
      `Free site survey anywhere in ${cityName}`,
      "Itemised quotes, no hidden costs",
      "Made and fitted by our own team",
      "Homes, businesses and industry",
    ],
  },

  stats: [
    { value: 6, suffix: "", label: "Trades under one roof", accent: "gold" },
    { value: 4, suffix: "", label: "Steps from survey to handover", accent: "teal" },
    { value: 20, suffix: "+", label: `Areas of ${cityName} covered`, accent: "gold" },
    { value: 100, suffix: "%", label: "Free survey and quotation", accent: "teal" },
  ] as { value: number; suffix: string; label: string; accent: "gold" | "teal" }[],

  home: {
    servicesEyebrow: "What we do",
    servicesHeading: { lead: "Six trades.", accent: "One team", tail: "." } as SplitHeading,
    servicesIntro: `Our own people make and install every service below, anywhere in ${cityName}. None of it is subcontracted.`,
    viewAllServices: "View all services",
  },

  /** Location block: the on-page text that anchors the site to Lahore. */
  areas: {
    eyebrow: "Where we work",
    heading: { lead: "Covering", accent: `all of ${cityName}`, tail: "." } as SplitHeading,
    paragraph: `We survey, make and install across ${cityName} and its housing societies. Don't see your area? Call us. We almost certainly cover it.`,
    list: serviceAreas,
    extendedLabel: "We also take larger commercial and industrial contracts in",
    extended: extendedAreas,
  },

  whyUs: {
    eyebrow: "Why choose us",
    heading: { lead: "Measured, made and fitted", accent: "by one team", tail: "." } as SplitHeading,
    values: [
      {
        title: "One team, six trades",
        description:
          "Aluminium, glass, wood, iron, film and cooling all come from one workshop. No trade sits waiting on another, and nobody can blame a different contractor.",
      },
      {
        title: "Measured on site, every time",
        description: `We never build to a guessed size. We survey your site in ${cityName} first, then make everything to those measurements.`,
      },
      {
        title: "Itemised quotations",
        description:
          "Materials, fabrication, hardware and installation are priced separately. You can see what drives the cost and change the scope before you commit.",
      },
      {
        title: "Fitted by our own craftsmen",
        description:
          "Our own team does the fabrication, welding, glazing and installation. The people who build your job are the people who fit it.",
      },
      {
        title: "Specified for the climate",
        description: `We choose finishes, boards and coatings that stand up to ${cityName}'s heat, dust and humidity, not just ones that look good on the day.`,
      },
      {
        title: "Reachable after handover",
        description:
          "You can still reach us once the job is done. If something we installed needs adjusting, that is part of the original job, not a new one.",
      },
    ],
  },

  process: {
    eyebrow: "How it works",
    heading: { lead: "From free survey to", accent: "final handover", tail: "." } as SplitHeading,
  },

  gallery: {
    eyebrow: "Our work",
    heading: { lead: "Recent projects across", accent: cityName, tail: "." } as SplitHeading,
    heroLabel: "Modern facades",
  },

  cta: {
    heading: { lead: "Planning a job?", accent: "Start with a free survey", tail: "." } as SplitHeading,
    paragraph: `We visit anywhere in ${cityName}, take measurements, give you honest advice and send an itemised quotation. There is no obligation to go ahead.`,
  },

  footer: {
    tagline: `A fabrication and installation workshop in ${cityName} for aluminium and glass, woodwork, iron work, glass film, interior finishing and AC services.`,
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
    servicesLine: `Aluminium & Glass · Woodwork · Iron Work · Glass Film · Interiors · AC · ${cityName}, Pakistan`,
  },

  faq: {
    eyebrow: "Common questions",
    heading: { lead: "Frequently asked", accent: "questions" } as SplitHeading,
    items: [
      {
        q: `Which areas of ${cityName} do you cover?`,
        a: `All of ${cityName}, including DHA, Bahria Town, Johar Town, Model Town, Gulberg, Wapda Town, Valencia, Faisal Town, Garden Town, Iqbal Town, Cantt, Askari, Lake City, Paragon City and the nearby societies. For larger commercial and industrial contracts we also work in Kasur, Sheikhupura and Muridke.`,
      },
      {
        q: "Are the site survey and quotation really free?",
        a: "Yes. We visit, measure and assess the job at no cost. The quotation that follows is itemised, and you are under no obligation to go ahead.",
      },
      {
        q: "Can you handle a project that needs several trades at once?",
        a: "Yes. That is how the workshop is set up. One team plans the aluminium and glass, woodwork, iron work, film and blinds on a single schedule, so you deal with one contact instead of five contractors.",
      },
      {
        q: "How long does a typical project take?",
        a: "It depends on the scope and on material availability, so we won't guess. After the free survey, your quotation includes a written schedule, and we work to it.",
      },
      {
        q: "Do you work on commercial and industrial projects, or only homes?",
        a: `Both. We work in homes, offices, shops, showrooms and industrial units across ${cityName}, from replacing a single window to fitting out a whole office.`,
      },
      {
        q: "Do you offer support after installation?",
        a: "Yes. You can reach us after handover, and adjusting work we installed counts as part of the original job. We don't bill it as a new one.",
      },
      {
        q: "How do I get a quote?",
        a: `Call or WhatsApp ${site.phone}, or use the quote form on this site, which sends your area and what you need to us on WhatsApp. We normally reply the same working day and book the survey at a time that suits you.`,
      },
    ],
  },

  reviews: {
    eyebrow: "What clients say",
    heading: { lead: "Rated", accent: "5.0 on Google", tail: "." } as SplitHeading,
    intro: `Every review here is copied exactly as customers in ${cityName} left it on our Google Business Profile.`,
  },

  contactMethods: {
    whatsapp: {
      title: "WhatsApp us",
      body: "The quickest way to reach us. Send photos of the space and rough measurements, and we can often advise before we visit.",
      cta: "Open WhatsApp",
    },
    call: {
      title: "Call us",
      body: `Talk to us directly about your project. We answer during working hours, six days a week.`,
      cta: "Call now",
    },
    visit: {
      title: "Visit the workshop",
      body: `See our work in person, talk through your project and get a quotation on the spot.`,
      cta: "Get directions",
    },
  },

  servicesPage: {
    eyebrow: "What we do",
    title: `Our Services in ${cityName}`,
    heading: { lead: "Six trades,", accent: "one workshop", tail: "." } as SplitHeading,
    description: `Aluminium and glass, woodwork, iron work, glass film, interiors and AC services, made and installed by one team across ${cityName}. Free survey and itemised quote.`,
    crumbHome: "Home",
    crumbServices: "Services",
  },

  serviceDetail: {
    atAGlance: "At a glance",
    whatsIncluded: "What's included",
    whyChooseUs: (title: string) => `Why clients choose us for ${title.toLowerCase()}`,
    faqHeading: (title: string) => `${title} in ${cityName}: common questions`,
    areasHeading: (title: string) => `${title} across ${cityName}`,
    getFreeQuote: (title: string) => `Free quote for ${title.toLowerCase()}`,
    quoteBody: `Send your area in ${cityName} and a photo of the space on WhatsApp. We'll book a free survey and follow up with an itemised quotation.`,
    requestQuotation: "Ask on WhatsApp",
    otherServices: "Other services you may need",
  },

  about: {
    eyebrow: "About us",
    title: `About ${site.name}`,
    metaTitle: `About ${site.name} | Workshop in ${cityName}`,
    heading: { lead: "A multi-trade workshop in", accent: cityName, tail: "." } as SplitHeading,
    description: `A ${cityName} workshop for aluminium and glass, woodwork, iron, glass film, interiors and AC. One team handles it all, so a multi-trade job needs one contractor.`,
    crumb: "About",
    storyEyebrow: "Our story",
    storyHeading: { lead: "One workshop, built around", accent: "one standard", tail: "." } as SplitHeading,
    storyP1: `${site.legalName} started as an aluminium and glass fabrication workshop in ${cityName}. Clients kept asking us to take on more of their projects under one contract, so we added woodwork, iron fabrication, glass film and AC services.`,
    storyP2: `Today a homeowner refitting a kitchen in Johar Town, a shop rebuilding its front in Gulberg and a contractor finishing an office in DHA can all come to one team for the fabrication, installation and finishing. Every trade is held to the same standard of materials, workmanship and follow-up.`,
    valuesEyebrow: "What we stand for",
    valuesHeading: { lead: "The standard behind", accent: "every project", tail: "." } as SplitHeading,
    values: [
      {
        title: "One team, six trades",
        description:
          "Aluminium and glass, woodwork, iron, film, interiors and cooling are all coordinated by one workshop. You don't have to juggle a separate contractor for each trade.",
      },
      {
        title: "Built to last",
        description:
          "We choose materials and methods for durability first, so the work keeps performing long after handover.",
      },
      {
        title: "Transparent quotations",
        description:
          "Every project starts with a free, itemised quotation, and no surprise costs appear once the work begins.",
      },
      {
        title: "Hands-on craftsmanship",
        description:
          "Our own team handles the fabrication, welding, glazing, finishing and installation. None of it is outsourced.",
      },
    ],
  },

  contact: {
    eyebrow: "Get in touch",
    title: `Contact ${site.name} in ${cityName}`,
    metaTitle: `Contact Us in ${cityName} | ${site.name}`,
    description: `Message us on WhatsApp, call, or visit the workshop in ${site.address.street}, ${cityName}. The site survey and itemised quotation are free, with no obligation.`,
    crumb: "Contact",
  },
} as const;

export type Content = typeof content;
