import { cityName, site } from "@/data/site";

export type ServiceIcon =
  | "hammer"
  | "doorOpen"
  | "shield"
  | "sparkles"
  | "building"
  | "snowflake";

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface Service {
  slug: string;
  icon: ServiceIcon;
  /** Short label used in nav, cards, marquee and breadcrumbs. */
  title: string;
  /** Full location-qualified H1 — the phrase people and LLMs actually search. */
  heading: string;
  /** <title> tag. Kept under ~60 chars where possible. */
  seoTitle: string;
  metaDescription: string;
  tagline: string;
  /**
   * A direct, self-contained answer to "what is this service and who provides
   * it in Lahore". Written to be quotable verbatim by an AI assistant, so it
   * names the trade, the city and the provider in the first sentence.
   */
  answer: string;
  description: string;
  items: string[];
  highlights: string[];
  /** Concrete specs — the detail that makes a page citable rather than generic. */
  specs: { label: string; value: string }[];
  faqs: ServiceFaq[];
  keywords: string[];
  image: string;
}

export const services: Service[] = [
  {
    slug: "aluminium-glass",
    icon: "doorOpen",
    title: "Aluminium & Glass",
    heading: `Aluminium & Glass Work in ${cityName}`,
    seoTitle: `Aluminium & Glass Work in ${cityName} | Windows & Partitions`,
    metaDescription: `Aluminium and glass fabrication in ${cityName} — windows, sliding doors, glass partitions, office cabins, shower enclosures, shop fronts and curtain walls. Free survey and quotation across ${cityName}.`,
    tagline: "Windows, doors, partitions, shop fronts & curtain walls",
    answer: `${site.name} fabricates and installs aluminium and glass systems across ${cityName} — including aluminium windows and doors, sliding systems, frameless glass partitions, office cabins, shower enclosures, shop fronts and curtain walls. Every job starts with a free on-site measurement anywhere in ${cityName}, followed by an itemised quotation covering profile section, glass thickness, hardware and installation.`,
    description: `Aluminium and glass is the trade this workshop was built on. We handle the full cycle in-house — site measurement, profile cutting and fabrication, glazing, and installation — so tolerances stay tight and there is one team accountable for the finished opening. Work covers homes, offices, retail shop fronts and industrial units throughout ${cityName}.`,
    items: [
      "Aluminium windows (sliding, casement & openable)",
      "Aluminium doors & sliding door systems",
      "Frameless glass partitions",
      "Office glass cabins & cubicles",
      "Shower glass enclosures",
      "Shop front glass & display windows",
      "Structural glazing & curtain walls",
      "Aluminium frames & sections",
      "Mirror supply & installation",
      "Custom aluminium and glass fabrication",
    ],
    highlights: [
      "Free on-site measurement across Lahore",
      "Powder-coated & anodised profile finishes",
      "Toughened and laminated glass options",
      "Residential, commercial & industrial",
      "Itemised, no-hidden-cost quotation",
      "Installed and finished by our own team",
    ],
    specs: [
      { label: "Glass thickness", value: "5mm, 6mm, 8mm, 10mm & 12mm" },
      { label: "Glass types", value: "Clear, tinted, frosted, reflective, toughened, laminated" },
      { label: "Profile finishes", value: "Powder-coated, anodised, wood-grain" },
      { label: "Systems", value: "Sliding, casement, openable, fixed, frameless" },
      { label: "Typical lead time", value: "Confirmed in writing with your quotation" },
    ],
    faqs: [
      {
        q: `Do you install aluminium windows anywhere in ${cityName}?`,
        a: `Yes. We cover all of ${cityName} — including DHA, Bahria Town, Johar Town, Model Town, Gulberg, Wapda Town, Cantt and the surrounding housing societies — and take on larger commercial work in nearby cities such as Kasur and Sheikhupura.`,
      },
      {
        q: "What thickness of glass should I use for a shower enclosure or partition?",
        a: "Shower enclosures and frameless partitions are normally specified in 8mm to 12mm toughened glass, because toughened glass is required for safety in any frameless application. We confirm the correct thickness for your opening during the free site measurement rather than quoting blind.",
      },
      {
        q: "What is the difference between powder-coated and anodised aluminium?",
        a: "Powder coating is a baked colour finish, so it offers a far wider colour range including wood-grain effects. Anodising is an electrochemical finish that becomes part of the metal, so it is harder-wearing on exposed elevations. We will recommend one over the other based on where the frames sit and how much weather they take.",
      },
      {
        q: "Can you replace glass in existing aluminium frames?",
        a: "Yes — reglazing an existing frame is common and much cheaper than replacing the whole unit. Send a photo of the frame and the approximate opening size and we can advise whether the frame is worth keeping before we visit.",
      },
      {
        q: "How much does aluminium and glass work cost in Lahore?",
        a: "Cost depends on the profile section, glass specification, hardware and the size of the opening, so we do not publish a flat rate. The free site survey ends with an itemised quotation that prices each of those separately, so you can see exactly what you are paying for.",
      },
    ],
    keywords: [
      "aluminium window works in Lahore",
      "glass partition Lahore",
      "aluminium door Lahore",
      "shop front glass Lahore",
      "office glass cabin Lahore",
      "shower glass enclosure Lahore",
      "curtain wall Lahore",
    ],
    image:
      "https://res.cloudinary.com/dkkrdong8/image/upload/v1788048155/ahmed-aluminium-glass/service-aluminum-glass.png",
  },
  {
    slug: "woodwork",
    icon: "hammer",
    title: "Woodwork",
    heading: `Woodwork & Custom Furniture in ${cityName}`,
    seoTitle: `Woodwork in ${cityName} | Kitchen Cabinets & Wardrobes`,
    metaDescription: `Custom woodwork in ${cityName} — kitchen cabinets, wardrobes, TV units, bedroom and office furniture, doors and wall panelling. Made to measure, installed by our own carpenters. Free quotation.`,
    tagline: "Kitchen cabinets, wardrobes, TV units & fitted furniture",
    answer: `${site.name} builds made-to-measure woodwork in ${cityName} — kitchen cabinets, wardrobes, TV units, bedroom and office furniture, doors and wall panelling. Everything is measured on site, fabricated to your dimensions and installed by our own carpenters, for homes, offices and shops across ${cityName}.`,
    description: `Fitted joinery only works if it is cut for the room it goes into. We measure on site, build to those dimensions, and install — which is why our cabinets sit flush against walls that are rarely perfectly square. Materials are chosen with you at quotation stage, so the finish and the budget are agreed before anything is cut.`,
    items: [
      "Kitchen cabinets & modular kitchens",
      "Wardrobes & fitted closets",
      "TV units & media walls",
      "Bedroom furniture & beds",
      "Office furniture & workstations",
      "Wooden doors & frames",
      "Wall panelling & cladding",
      "Custom wood designs & carpentry",
    ],
    highlights: [
      "Made to measure for your exact space",
      "Choice of board, laminate & finish",
      "Soft-close and branded hardware options",
      "Fitted by our own carpenters",
      "Homes, offices, shops & showrooms",
      "Free consultation and quotation",
    ],
    specs: [
      { label: "Board options", value: "MDF, laminated board, plywood, solid wood" },
      { label: "Finishes", value: "Laminate, PU, matte, gloss, veneer, wood-grain" },
      { label: "Hardware", value: "Soft-close hinges, channels, handles & lift-ups" },
      { label: "Kitchen layouts", value: "Straight, L-shape, U-shape, island & parallel" },
      { label: "Typical lead time", value: "Confirmed in writing with your quotation" },
    ],
    faqs: [
      {
        q: "Do you make kitchen cabinets to measure?",
        a: "Yes — every kitchen is measured on site and built to those dimensions. That matters most at the ends of runs and around windows, where a standard-size modular unit usually leaves a gap that has to be filled with trim.",
      },
      {
        q: "Which board should I choose for a kitchen in Lahore?",
        a: "For kitchen carcasses in Lahore's humidity, we normally recommend a moisture-resistant board rather than standard MDF, particularly for the base units under the sink. We will walk you through the options and the cost difference at quotation stage.",
      },
      {
        q: "Can you match new furniture to what I already have?",
        a: "In most cases yes. Bring us a photo or let us see the existing piece during the site visit, and we will match the laminate or finish as closely as the available range allows.",
      },
      {
        q: "Do you do office furniture and workstations as well as home furniture?",
        a: "Yes. Office fit-outs are a regular part of the work — workstations, reception counters, storage and cabin furniture — and can be coordinated with the glass partitioning so the whole office is handled by one team.",
      },
    ],
    keywords: [
      "woodwork in Lahore",
      "kitchen cabinets Lahore",
      "wardrobe maker Lahore",
      "custom furniture Lahore",
      "carpenter in Lahore",
      "TV unit design Lahore",
    ],
    image:
      "https://res.cloudinary.com/dkkrdong8/image/upload/v1788048138/ahmed-aluminium-glass/service-woodwork.png",
  },
  {
    slug: "iron-work",
    icon: "shield",
    title: "Iron Work",
    heading: `Iron Work & Steel Fabrication in ${cityName}`,
    seoTitle: `Iron Work in ${cityName} | Gates, Grills & Railings`,
    metaDescription: `Iron and steel fabrication in ${cityName} — gates, safety grills, stair and balcony railings, window grills, fencing, sheds and steel structures. Welded, finished and installed on site.`,
    tagline: "Gates, grills, railings, fencing & steel structures",
    answer: `${site.name} fabricates and installs iron and steel work across ${cityName} — main gates, safety grills, stair and balcony railings, boundary fencing, sheds, canopies and structural steel. Fabrication and welding are done by our own team, with anti-rust treatment and finishing applied before handover.`,
    description: `Iron work is judged on two things: the strength of the weld and how well the finish holds up outdoors. We fabricate to your drawing or ours, prepare and prime every section against rust, and finish on site after installation so scratches from fitting do not turn into rust lines a year later.`,
    items: [
      "Main gates & sliding gates",
      "Safety grills & window grills",
      "Boundary & security fencing",
      "Stair railings & handrails",
      "Balcony & terrace railings",
      "Iron doors",
      "Sheds & canopies",
      "Steel structures & trusses",
      "Stainless steel (SS) fabrication",
      "Custom iron fabrication",
    ],
    highlights: [
      "In-house welding and fabrication",
      "Anti-rust primer & finish coat",
      "Custom designs to your drawing",
      "Mild steel & stainless steel",
      "Residential, commercial & industrial",
      "On-site fitting and finishing",
    ],
    specs: [
      { label: "Materials", value: "Mild steel, MS pipe, box section, stainless steel" },
      { label: "Protection", value: "Rust-preventive primer + enamel or spray finish" },
      { label: "Gate types", value: "Swing, sliding, automatic-ready" },
      { label: "Railing infills", value: "Steel, stainless steel, glass, wood-topped" },
      { label: "Typical lead time", value: "Confirmed in writing with your quotation" },
    ],
    faqs: [
      {
        q: "Can you make a gate to a design I have seen?",
        a: "Yes — bring a photo or a sketch. We fabricate to custom designs as standard, and during the site visit we will tell you honestly if a design needs adjusting to work at your opening width or to carry its own weight.",
      },
      {
        q: "How do you stop iron work rusting in Lahore's weather?",
        a: "Sections are cleaned and primed with a rust-preventive coat before the finish coat goes on, and we touch up on site after installation so the marks made while fitting are sealed rather than left open. For exposed boundary work, stainless steel is worth considering where budget allows.",
      },
      {
        q: "Do you make gates ready for an automatic opener?",
        a: "Yes. Tell us at the design stage that you plan to automate the gate and we will build it with the right clearance, track and mounting points so an operator can be fitted later without rework.",
      },
      {
        q: "Do you take on structural steel and shed work?",
        a: "Yes — sheds, canopies, trusses and light steel structures for commercial and industrial sites in Lahore are part of the regular workload, not just decorative gates and grills.",
      },
    ],
    keywords: [
      "iron work in Lahore",
      "iron gate Lahore",
      "safety grill Lahore",
      "stair railing Lahore",
      "steel fabrication Lahore",
      "welder in Lahore",
    ],
    image:
      "https://res.cloudinary.com/dkkrdong8/image/upload/v1788048175/ahmed-aluminium-glass/service-ironwork.png",
  },
  {
    slug: "glass-paper",
    icon: "sparkles",
    title: "Glass Paper & Film",
    heading: `Glass Paper & Window Film Installation in ${cityName}`,
    seoTitle: `Glass Paper in ${cityName} | Frosted & Privacy Film`,
    metaDescription: `Glass paper and window film installation in ${cityName} — frosted and privacy film, office glass branding, UV and sun control film, reflective and safety film. Bubble-free fitting, same-day on small jobs.`,
    tagline: "Frosted, privacy, sun control & branded glass film",
    answer: `${site.name} supplies and installs glass paper and window film across ${cityName} — frosted and privacy film, decorative and branded office film, UV and sun control film, reflective film and safety film. Film is applied wet and squeegeed for a bubble-free finish, on homes, offices and shop fronts.`,
    description: `Glass film is the fastest way to change how a glass surface behaves. Frosted film buys privacy without losing daylight, sun control film cuts heat and glare on west-facing glass, and safety film holds a pane together if it breaks. Most jobs are finished in a single visit with no disruption to the room.`,
    items: [
      "Frosted glass paper & etched effect",
      "Privacy film for homes & offices",
      "Decorative glass stickers & patterns",
      "Office glass branding & logo cuts",
      "UV & sun control film",
      "Reflective / one-way film",
      "Safety & security film",
      "Custom printed & cut designs",
    ],
    highlights: [
      "Bubble-free wet application",
      "Cut and trimmed in place",
      "Heat, glare and UV reduction options",
      "Custom logos and patterns",
      "Homes, offices, clinics & shop fronts",
      "Fast turnaround on small jobs",
    ],
    specs: [
      { label: "Film types", value: "Frosted, tinted, reflective, safety, decorative" },
      { label: "Privacy levels", value: "Full frost, gradient, banded, pattern cut" },
      { label: "Performance", value: "UV reduction, heat and glare control" },
      { label: "Branding", value: "Cut vinyl logos and printed graphics" },
      { label: "Typical lead time", value: "Small jobs often same or next day" },
    ],
    faqs: [
      {
        q: "Will frosted film give complete privacy at night?",
        a: "Frosted film obscures the view in both directions at all times, so yes. Reflective or one-way film behaves differently — it works while the outside is brighter than the inside, so at night with the lights on the effect reverses. If night privacy is the goal, frosted is the right choice.",
      },
      {
        q: "Does sun control film actually reduce heat in Lahore?",
        a: "It measurably reduces solar heat gain and glare through the glass, which makes the biggest difference on west and south-facing windows through a Lahore summer. It reduces the load on your cooling — it does not replace it.",
      },
      {
        q: "How long does glass film last?",
        a: "Quality film applied to clean, sound glass lasts for years indoors. The common causes of early failure are dirty glass at application and cheap film, which is why we clean and prepare the pane properly before anything is applied.",
      },
      {
        q: "Can you print our company logo onto office glass?",
        a: "Yes — logo cuts and printed graphics on glass partitions and shop fronts are a regular job. Send us your logo file and the glass dimensions and we will advise on the best treatment for the size.",
      },
    ],
    keywords: [
      "glass paper in Lahore",
      "frosted glass film Lahore",
      "window film Lahore",
      "privacy film Lahore",
      "sun control film Lahore",
      "office glass branding Lahore",
    ],
    image:
      "https://res.cloudinary.com/dkkrdong8/image/upload/v1788048197/ahmed-aluminium-glass/service-glass-film.png",
  },
  {
    slug: "building-interior",
    icon: "building",
    title: "Building & Interior",
    heading: `Building & Interior Finishing in ${cityName}`,
    seoTitle: `Interior Fit-Outs in ${cityName} | Complete Finishing`,
    metaDescription: `Complete building and interior finishing in ${cityName} — aluminium and glass, steel, woodwork, glass film and roller blinds coordinated by one team. Office, shop and home fit-outs with a single point of contact.`,
    tagline: "Complete fit-outs with one team and one point of contact",
    answer: `${site.name} delivers complete building and interior finishing in ${cityName} — combining aluminium and glass, steel fabrication, woodwork, glass film and roller blinds under one contract. Clients use this when a project needs several trades in sequence and they would rather manage one team than five separate contractors.`,
    description: `Most finishing projects stall in the gaps between trades — the carpenter waiting on the glazier, the glazier waiting on the steel. Running those trades in one team removes the handover. You get one schedule, one point of contact, and one party responsible when something needs adjusting.`,
    items: [
      "Complete office fit-outs",
      "Shop & showroom finishing",
      "Home renovation & finishing",
      "Aluminium & glass work",
      "Stainless steel (SS) fabrication",
      "Iron & structural fabrication",
      "Woodwork & custom furniture",
      "Glass paper & film installation",
      "Roller blinds supply & installation",
    ],
    highlights: [
      "One team across every trade",
      "Single schedule and point of contact",
      "Coordinated so trades do not block each other",
      "Free consultation and site assessment",
      "Offices, shops, homes & industrial units",
      "Itemised quotation covering all trades",
    ],
    specs: [
      { label: "Project types", value: "Office, retail, residential, industrial" },
      { label: "Scope", value: "New fit-out, renovation, partial finishing" },
      { label: "Trades covered", value: "Aluminium, glass, steel, wood, film, blinds" },
      { label: "Coordination", value: "One schedule, one point of contact" },
      { label: "Typical lead time", value: "Programmed and confirmed with your quotation" },
    ],
    faqs: [
      {
        q: "Can you handle a project that needs wood, aluminium and iron together?",
        a: "That is exactly what this service is for. One team sequences all the trades your project needs, so you are not chasing separate contractors or arbitrating between them when a dimension does not line up.",
      },
      {
        q: "Do you take on office fit-outs in Lahore?",
        a: "Yes — glass cabins and partitions, workstations and storage, branded film on the glass, blinds and the steel or aluminium work around them, delivered as one package with a single schedule.",
      },
      {
        q: "Can you work around a shop or office that stays open?",
        a: "Usually yes. Phased and after-hours working is common for retail and office jobs in Lahore. Tell us your trading hours at the survey and we will programme the work around them in the quotation.",
      },
      {
        q: "Do you provide a free consultation before quoting?",
        a: "Yes. Every project starts with a free consultation and site assessment, and the quotation that follows is itemised by trade so you can see the cost of each part and adjust scope before committing.",
      },
    ],
    keywords: [
      "interior fit out Lahore",
      "office renovation Lahore",
      "shop fitting Lahore",
      "building finishing Lahore",
      "interior contractor Lahore",
      "roller blinds Lahore",
    ],
    image:
      "https://res.cloudinary.com/dkkrdong8/image/upload/v1788048219/ahmed-aluminium-glass/service-interior.png",
  },
  {
    slug: "ac-refrigerator",
    icon: "snowflake",
    title: "AC & Refrigerator",
    heading: `AC & Refrigerator Repair in ${cityName}`,
    seoTitle: `AC Repair in ${cityName} | Service & Gas Charging`,
    metaDescription: `AC and refrigerator repair in ${cityName} — installation, uninstallation, servicing and cleaning, gas charging and compressor replacement for homes and commercial sites. Experienced technicians, on-time visits.`,
    tagline: "Installation, repair, servicing & gas charging",
    answer: `${site.name} provides AC and refrigerator services across ${cityName} — installation and uninstallation, repair and maintenance, servicing and cleaning, gas charging, and compressor repair or replacement, for both homes and commercial premises.`,
    description: `Cooling work is seasonal and time-sensitive — a failed AC in a Lahore June is not something to schedule for next week. We handle installation, servicing and repairs for split and window units and for domestic and commercial refrigeration, and we tell you honestly when a unit is worth repairing and when it is not.`,
    items: [
      "AC installation & uninstallation",
      "AC repair & maintenance",
      "AC gas charging & top-up",
      "AC service, cleaning & descaling",
      "Refrigerator repair & maintenance",
      "Refrigerator gas charging",
      "Compressor repair & replacement",
      "Annual maintenance for offices & shops",
    ],
    highlights: [
      "Experienced cooling technicians",
      "Split, window & commercial units",
      "Honest repair-or-replace advice",
      "Homes, offices, shops & restaurants",
      "On-time scheduled visits",
      "Seasonal pre-summer servicing",
    ],
    specs: [
      { label: "Unit types", value: "Split, window, inverter, commercial refrigeration" },
      { label: "Services", value: "Install, uninstall, service, repair, gas charging" },
      { label: "Refrigeration", value: "Domestic fridges, freezers, display chillers" },
      { label: "Contracts", value: "One-off visits or annual maintenance" },
      { label: "Best time to book", value: "Pre-summer servicing, before peak demand" },
    ],
    faqs: [
      {
        q: "How often should an AC be serviced in Lahore?",
        a: "Once a year as a minimum, ideally before summer starts. Lahore's dust load clogs filters and coils faster than in most climates, and a clogged coil raises your electricity bill long before the unit actually fails.",
      },
      {
        q: "My AC is cooling weakly — does it need gas?",
        a: "Weak cooling is often a dirty filter or coil rather than low refrigerant. A proper technician checks airflow and cleans first, because refrigerant does not get used up in a sealed system — if it is genuinely low, there is a leak that needs finding rather than just topping up.",
      },
      {
        q: "Do you install new air conditioners as well as repair them?",
        a: "Yes — installation and uninstallation, including remounting when you move house. We will advise on placement so the unit drains properly and the outdoor unit gets the airflow it needs.",
      },
      {
        q: "Do you service commercial refrigeration for shops and restaurants?",
        a: "Yes, including display chillers and freezers. Annual maintenance contracts are available for commercial sites in Lahore where a breakdown means lost stock.",
      },
    ],
    keywords: [
      "AC repair in Lahore",
      "AC installation Lahore",
      "AC gas charging Lahore",
      "refrigerator repair Lahore",
      "AC service Lahore",
      "fridge mechanic Lahore",
    ],
    image:
      "https://res.cloudinary.com/dkkrdong8/image/upload/v1788048238/ahmed-aluminium-glass/service-ac-repair.png",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export const heroImage =
  "https://res.cloudinary.com/dkkrdong8/image/upload/v1788048118/ahmed-aluminium-glass/hero-building.png";

export const processSteps = [
  {
    title: "Free site survey",
    description: `Tell us what you need and we visit your site anywhere in ${cityName} to measure and assess the work — at no cost and with no obligation.`,
  },
  {
    title: "Design & itemised quotation",
    description:
      "We propose a design suited to the space and price it line by line — material, fabrication, hardware and installation shown separately, so nothing is hidden in a lump sum.",
  },
  {
    title: "Fabrication & installation",
    description:
      "Our own craftsmen fabricate to the measured dimensions and install on the agreed date, keeping the site clean and workable while we do it.",
  },
  {
    title: "Handover & after-service",
    description:
      "We walk you through the finished work, adjust anything that needs it, and stay reachable afterwards if something needs attention.",
  },
];
