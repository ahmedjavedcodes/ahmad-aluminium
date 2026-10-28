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
  /** Full location-qualified H1: the phrase people and LLMs actually search. */
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
  /** Concrete specs: the detail that makes a page citable rather than generic. */
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
    metaDescription: `Aluminium windows, sliding doors, glass partitions, office cabins, shower enclosures, shop fronts and curtain walls in ${cityName}. Free survey and quote.`,
    tagline: "Windows, doors, partitions, shop fronts & curtain walls",
    answer: `${site.name} makes and installs aluminium and glass systems across ${cityName}: aluminium windows and doors, sliding systems, frameless glass partitions, office cabins, shower enclosures, shop fronts and curtain walls. Every job starts with a free on-site measurement anywhere in ${cityName}. You then get an itemised quotation that prices the profile section, glass thickness, hardware and installation separately.`,
    description: `Aluminium and glass is the trade this workshop was founded on. We do every stage ourselves: site measurement, cutting and fabricating the profiles, glazing and installation. That keeps tolerances tight and leaves one team responsible for the finished opening. We work on homes, offices, shop fronts and industrial units throughout ${cityName}.`,
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
        a: `Yes. We cover all of ${cityName}, including DHA, Bahria Town, Johar Town, Model Town, Gulberg, Wapda Town, Cantt and the nearby housing societies. We also take on larger commercial jobs in nearby cities such as Kasur and Sheikhupura.`,
      },
      {
        q: "What thickness of glass should I use for a shower enclosure or partition?",
        a: "Shower enclosures and frameless partitions normally use 8mm to 12mm toughened glass, because any frameless installation needs toughened glass for safety. We confirm the right thickness for your opening at the free site measurement, so the quote isn't a guess.",
      },
      {
        q: "What is the difference between powder-coated and anodised aluminium?",
        a: "Powder coating is a baked-on colour finish, so it comes in far more colours, including wood-grain effects. Anodising is an electrochemical finish that becomes part of the metal, so it wears better on walls exposed to the weather. We recommend one or the other based on where the frames go and how much weather they face.",
      },
      {
        q: "Can you replace glass in existing aluminium frames?",
        a: "Yes. Reglazing an existing frame is common and costs much less than replacing the whole unit. Send a photo of the frame and the rough size of the opening, and we can tell you whether the frame is worth keeping before we visit.",
      },
      {
        q: "How much does aluminium and glass work cost in Lahore?",
        a: "The cost depends on the profile section, the glass, the hardware and the size of the opening, so we don't publish a flat rate. After the free site survey you get an itemised quotation that prices each of these separately, so you can see exactly what you are paying for.",
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
    metaDescription: `Made-to-measure kitchen cabinets, wardrobes, TV units, bedroom and office furniture, doors and wall panelling in ${cityName}, fitted by our own carpenters.`,
    tagline: "Kitchen cabinets, wardrobes, TV units & fitted furniture",
    answer: `${site.name} builds made-to-measure woodwork in ${cityName}: kitchen cabinets, wardrobes, TV units, bedroom and office furniture, doors and wall panelling. We measure on site, build to your dimensions, and our own carpenters install everything, for homes, offices and shops across ${cityName}.`,
    description: `Fitted furniture only works if it is cut for the room it goes into. We measure on site, build to those measurements and install the result, which is why our cabinets sit flush against walls that are rarely perfectly square. You choose the materials with us at the quotation stage, so the finish and the budget are agreed before anything is cut.`,
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
        a: "Yes. We measure every kitchen on site and build it to those dimensions. This matters most at the ends of a run and around windows, where standard-size units usually leave gaps that have to be covered with trim.",
      },
      {
        q: "Which board should I choose for a kitchen in Lahore?",
        a: "Because of Lahore's humidity, we usually recommend a moisture-resistant board over standard MDF for the kitchen carcasses, especially the base units under the sink. We'll go through the options and the difference in cost when we quote.",
      },
      {
        q: "Can you match new furniture to what I already have?",
        a: "In most cases, yes. Show us a photo, or let us see the piece during the site visit, and we'll match the laminate or finish as closely as the available range allows.",
      },
      {
        q: "Do you do office furniture and workstations as well as home furniture?",
        a: "Yes. We regularly make workstations, reception counters, storage and cabin furniture for offices, and we can plan them alongside the glass partitions so one team handles the whole office.",
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
    metaDescription: `Gates, safety grills, stair and balcony railings, window grills, fencing, sheds and steel structures in ${cityName}. Welded in our workshop, fitted on site.`,
    tagline: "Gates, grills, railings, fencing & steel structures",
    answer: `${site.name} makes and installs iron and steel work across ${cityName}: main gates, safety grills, stair and balcony railings, boundary fencing, sheds, canopies and structural steel. Our own team does the fabrication and welding, and every piece is rust-proofed and finished before handover.`,
    description: `Good iron work comes down to two things: a strong weld and a finish that holds up outdoors. We build to your drawing or ours and prime every section against rust. After installation we touch up the finish on site, so scratches from fitting don't turn into rust lines a year later.`,
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
        a: "Yes. Bring a photo or a sketch. Custom designs are normal for us, and at the site visit we'll tell you honestly if a design needs changing to suit your opening or to carry its own weight.",
      },
      {
        q: "How do you stop iron work rusting in Lahore's weather?",
        a: "We clean every section and prime it with a rust-preventive coat before the finish coat goes on. After installation we touch up on site, so marks made during fitting are sealed instead of left open. For exposed boundary work, stainless steel is worth considering if the budget allows.",
      },
      {
        q: "Do you make gates ready for an automatic opener?",
        a: "Yes. Tell us at the design stage that you plan to automate it, and we'll build the gate with the right clearance, track and mounting points. An opener can then be fitted later without any rework.",
      },
      {
        q: "Do you take on structural steel and shed work?",
        a: "Yes. Sheds, canopies, trusses and light steel structures for commercial and industrial sites in Lahore are regular work for us, alongside gates and grills.",
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
    metaDescription: `Frosted and privacy film, office glass branding, UV and sun control film, reflective and safety film in ${cityName}. Bubble-free, often same day for small jobs.`,
    tagline: "Frosted, privacy, sun control & branded glass film",
    answer: `${site.name} supplies and installs glass paper and window film across ${cityName}: frosted and privacy film, decorative and branded office film, UV and sun control film, reflective film and safety film. We apply film wet and squeegee it for a bubble-free finish, on homes, offices and shop fronts.`,
    description: `Film is the quickest way to change how a pane of glass behaves. Frosted film gives you privacy without losing daylight. Sun control film cuts heat and glare on west-facing windows. Safety film holds a pane together if it breaks. Most jobs are done in one visit, and the room stays usable throughout.`,
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
        a: "Yes. Frosted film blocks the view in both directions at all times. Reflective (one-way) film is different: it only works while it is brighter outside than inside, so at night with the lights on, people can see in. If you need privacy at night, choose frosted.",
      },
      {
        q: "Does sun control film actually reduce heat in Lahore?",
        a: "Yes. It noticeably cuts the heat and glare coming through the glass, and makes the biggest difference on west- and south-facing windows during a Lahore summer. It lightens the load on your AC, but it won't replace it.",
      },
      {
        q: "How long does glass film last?",
        a: "Good film on clean, undamaged glass lasts for years indoors. Film usually fails early because the glass was dirty when it went on or the film was cheap, which is why we clean and prepare every pane properly first.",
      },
      {
        q: "Can you print our company logo onto office glass?",
        a: "Yes. We regularly put cut logos and printed graphics on glass partitions and shop fronts. Send us your logo file and the size of the glass, and we'll suggest the best treatment.",
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
    metaDescription: `Office, shop and home fit-outs in ${cityName}. Aluminium and glass, steel, woodwork, glass film and roller blinds, run by one team with one point of contact.`,
    tagline: "Complete fit-outs with one team and one point of contact",
    answer: `${site.name} handles complete building and interior finishing in ${cityName}, with aluminium and glass, steel fabrication, woodwork, glass film and roller blinds under one contract. Clients choose this when a project needs several trades in turn and they would rather manage one team than five contractors.`,
    description: `Most finishing projects stall between trades: the carpenter waits for the glazier, and the glazier waits for the steel. When one team runs every trade, those gaps disappear. You get one schedule, one point of contact and one company to call if anything needs adjusting.`,
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
        a: "Yes. One team schedules every trade your project needs, so you aren't chasing separate contractors or settling disputes between them when a measurement doesn't line up.",
      },
      {
        q: "Do you take on office fit-outs in Lahore?",
        a: "Yes. We deliver glass cabins and partitions, workstations and storage, branded film, blinds and the surrounding steel or aluminium work as one package on a single schedule.",
      },
      {
        q: "Can you work around a shop or office that stays open?",
        a: "Usually, yes. We often work in phases or after hours on shop and office jobs in Lahore. Tell us your opening hours at the survey, and the quotation will schedule the work around them.",
      },
      {
        q: "Do you provide a free consultation before quoting?",
        a: "Yes. Every project starts with a free consultation and site assessment. The quotation that follows is itemised by trade, so you can see what each part costs and change the scope before you commit.",
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
    metaDescription: `AC and fridge installation, servicing, cleaning, gas charging, repair and compressor replacement in ${cityName}, for homes and businesses. On-time visits.`,
    tagline: "Installation, repair, servicing & gas charging",
    answer: `${site.name} provides AC and refrigerator services across ${cityName}: installation and removal, repair and maintenance, servicing and cleaning, gas charging, and compressor repair or replacement, for homes and businesses.`,
    description: `Cooling work can't wait. An AC that fails in a Lahore June needs fixing now, not next week. We install, service and repair split and window units, plus home and commercial refrigeration, and we'll tell you honestly whether a unit is worth repairing.`,
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
        a: "At least once a year, ideally before summer starts. Lahore's dust clogs filters and coils faster than most climates, and a clogged coil pushes up your electricity bill long before the unit breaks down.",
      },
      {
        q: "My AC is cooling weakly. Does it need gas?",
        a: "Not necessarily. Weak cooling is often caused by a dirty filter or coil, so a good technician checks the airflow and cleans first. Refrigerant isn't used up in a sealed system. If it really is low, there is a leak to find and fix, not just a top-up.",
      },
      {
        q: "Do you install new air conditioners as well as repair them?",
        a: "Yes. We install and remove units, including refitting them when you move house, and we'll advise on placement so the unit drains properly and the outdoor unit gets enough air.",
      },
      {
        q: "Do you service commercial refrigeration for shops and restaurants?",
        a: "Yes, including display chillers and freezers. We offer annual maintenance contracts for shops and restaurants in Lahore, where a breakdown means lost stock.",
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
    description: `Tell us what you need, and we'll visit your site anywhere in ${cityName} to measure and assess the work. It costs nothing, and you are under no obligation.`,
  },
  {
    title: "Design & itemised quotation",
    description:
      "We propose a design that suits the space and price it line by line. Materials, fabrication, hardware and installation are listed separately, so nothing is hidden in a lump sum.",
  },
  {
    title: "Fabrication & installation",
    description:
      "Our own craftsmen build to the measurements we took and install on the agreed date. We keep the site clean and usable while we work.",
  },
  {
    title: "Handover & after-service",
    description:
      "We walk you through the finished work and adjust anything that needs it. You can still reach us afterwards if something needs attention.",
  },
];
