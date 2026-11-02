export interface WorkPhoto {
  src: string;
  alt: string;
}

export interface WorkItem {
  /** Hash used to open this project directly: /work#<id>. */
  id: string;
  /** Cover photograph: the overall view of the job. Also the first slide. */
  image: string;
  title: string;
  /** Short label for the small frames on the portfolio wall. */
  shortTitle?: string;
  /** One-line summary. */
  tagline?: string;
  /** Full project write-up, shown under the project on /work. */
  description?: string;
  alt: string;
  /** The service page for this trade, if there is one. */
  serviceHref?: string;
  /** Scope of work, shown as chips. */
  items: string[];
  /** Every photograph of the job, cover first. The viewer is a swipeable
   *  carousel of these, numbered from the second slide on. */
  photos: WorkPhoto[];
  client?: string;
  location?: string;
  year?: string;
}

const ALUMINIUM = "/services/aluminium-glass";

/** `/work/<id>/01.jpg … NN.jpg`, each with its own caption as alt text. */
const photosFor = (id: string, captions: string[]): WorkPhoto[] =>
  captions.map((alt, i) => ({ src: `/work/${id}/${String(i + 1).padStart(2, "0")}.jpg`, alt }));

const project = (p: Omit<WorkItem, "image" | "alt" | "photos"> & { captions: string[] }): WorkItem => {
  const { captions, ...rest } = p;
  return {
    ...rest,
    image: `/work/${p.id}/thumb.jpg`,
    alt: `${p.title}${p.location ? `, ${p.location}` : ""}`,
    photos: photosFor(p.id, captions),
  };
};

/**
 * The portfolio shown on the home page's "Our Work" wall and on /work: real
 * customer projects, photographed on site. Photos live in public/work/<id>/
 * (01.jpg is the cover; thumb.jpg is a smaller copy of it for the grid). The
 * wall shows the first seven; /work lists them all.
 */
export const workItems: WorkItem[] = [
  project({
    id: "packages-mall-lahore",
    shortTitle: "Packages Mall Glass Feature Wall",
    title: "Packages Mall: Coloured Glass Feature Wall & Partitions",
    client: "Packages Mall",
    location: "Lahore",
    tagline: "Double-height coloured glass feature wall and black aluminium glass partitions.",
    description:
      "Commercial aluminium and glass work at Packages Mall, one of Lahore's largest shopping destinations. The centrepiece is a double-height feature wall of multi-coloured glass panels set in slim aluminium framing, which fills the space with colour as light passes through. We also installed black aluminium-framed glass partitions and screens throughout the interior, including a curved-base glass screen and floor-to-ceiling partition walls. All work was carried out on a busy live construction site, alongside other trades.",
    serviceHref: ALUMINIUM,
    items: ["Coloured glass feature wall", "Black aluminium glass partitions", "Floor-to-ceiling glass screens", "On-site installation"],
    captions: [
      "Double-height coloured glass feature wall during installation",
      "Coloured glass panels in slim aluminium framing",
      "Black aluminium glass screen on a curved base",
      "Floor-to-ceiling black aluminium glass partition",
      "Installing a black aluminium glass partition frame",
    ],
  }),
  project({
    id: "curtain-wall-factory-sialkot",
    shortTitle: "Factory Curtain Wall",
    title: "Glass Curtain Wall Façade",
    client: "Factory Building",
    location: "Sialkot",
    tagline: "Full-width, double-height aluminium curtain wall for a factory's front elevation.",
    description:
      "We designed, fabricated and installed a full-width aluminium curtain wall across the double-height front façade of this factory building in Sialkot. Black powder-coated aluminium mullions and transoms frame large clear glass panels on both floors, giving the building a sleek, modern frontage while flooding the interior with natural light. All work was carried out on site from scaffolding, from framing through to final glazing.",
    serviceHref: ALUMINIUM,
    items: ["Aluminium curtain wall system", "Black powder-coated mullions & transoms", "Clear glass glazing", "On-site installation"],
    captions: [
      "Full façade view: curtain wall glazed across both floors",
      "Before: façade openings prepared for the curtain wall",
      "In progress: black aluminium mullions and transoms being fixed",
    ],
  }),
  project({
    id: "aluminium-works-eden-society",
    shortTitle: "Arched & Sliding Windows",
    title: "Arched & Sliding Aluminium Windows",
    client: "Private Residence",
    location: "Eden Society",
    tagline: "Custom arched and grid-style sliding aluminium windows for a classical-style home.",
    description:
      "Complete aluminium window package for a multi-storey, classical-style home in Eden Society. We made custom arched windows with radial grid bars to fit the façade's curved stone surrounds, alongside large grid-style windows on every floor. Inside, black aluminium sliding windows with built-in fly mesh let in fresh air while keeping insects out. Every frame is finished in matte black to match the home's black-and-gold front.",
    serviceHref: ALUMINIUM,
    items: ["Custom arched windows", "Grid-style façade windows", "Sliding windows with fly mesh", "Matte black aluminium"],
    captions: [
      "Front elevation: black aluminium windows across every floor",
      "Arched and grid-style windows set into the classical stone façade",
      "Custom arched aluminium window with radial grid bars",
      "Black aluminium sliding window with built-in fly mesh",
      "Grid-style sliding window: glass panel and fly-mesh panel",
    ],
  }),
  project({
    id: "aluminium-partitions-dha-phase-6",
    shortTitle: "Glass Partitions",
    title: "Aluminium Glass Partitions & Shower Enclosures",
    client: "Private Residence",
    location: "DHA Phase 6",
    tagline: "Black grid-style glass partitions and aluminium shower enclosures for a modern home.",
    description:
      "Interior aluminium and glass work for a modern home in DHA Phase 6. The lounge and dining areas are divided by floor-to-ceiling black aluminium glass partitions with sliding doors and a bold grid design, keeping the spaces open and bright while separating them. In the bathrooms we installed aluminium-framed sliding shower enclosures and top-hung windows, finished in clean, durable profiles built to handle daily moisture.",
    serviceHref: ALUMINIUM,
    items: ["Black grid glass partitions", "Sliding partition doors", "Aluminium sliding shower enclosures", "Top-hung bathroom windows"],
    captions: [
      "Floor-to-ceiling black grid glass partitions dividing the lounge and dining areas",
      "Glass partition set between fluted wall panels",
      "Aluminium sliding shower enclosure and top-hung window",
      "Clear glass sliding shower enclosure with slim aluminium frame",
      "Staircase hall with black trim detailing",
    ],
  }),
  project({
    id: "double-glazed-windows-dha",
    shortTitle: "Double-Glazed Windows",
    title: "Double-Glazed Aluminium Windows",
    client: "Private Residence",
    location: "DHA",
    tagline: "Black aluminium double-glazed windows and doors for a classical-style home.",
    description:
      "Black powder-coated aluminium double-glazed windows and doors for a classical-style home in DHA. The work includes large sliding windows with decorative Georgian grid bars, a full-height glazed door opening onto the balcony, and wide sliding windows overlooking the terrace. Double glazing keeps rooms cooler in summer, warmer in winter and noticeably quieter, while the slim black frames set off the home's cream stone façade.",
    serviceHref: ALUMINIUM,
    items: ["Double-glazed sliding windows", "Georgian grid bar design", "Glazed balcony door", "Black powder-coated aluminium"],
    captions: [
      "Front elevation: black aluminium windows on a classical stone façade",
      "Double-glazed sliding window with Georgian grid bars",
      "Full-height glazed aluminium door opening onto the balcony",
      "Wide double-glazed sliding window overlooking the terrace",
    ],
  }),
  project({
    id: "aluminium-kitchen-panels",
    shortTitle: "Aluminium Kitchens",
    title: "Aluminium Glass Kitchen Cabinets & Panels",
    client: "Private Residences",
    tagline: "Slim-frame aluminium glass cabinet doors for modern kitchens and storage units.",
    description:
      "Aluminium-framed glass cabinet doors and panels for modern kitchens, pantries and storage units. This selection includes a full-height kitchen pantry with smoked glass doors in slim black aluminium frames, glass shelving and built-in lighting; tall floor-to-ceiling smoked glass cabinet doors; and wall cabinets with textured frosted glass. Unlike wood, aluminium won't swell, warp or attract termites, so the doors stay straight and easy to clean in the heat and moisture of a working kitchen.",
    serviceHref: ALUMINIUM,
    items: ["Aluminium-framed glass cabinet doors", "Smoked & frosted glass options", "Glass shelving", "Full-height pantry units"],
    captions: [
      "Kitchen pantry unit with smoked glass doors in slim black aluminium frames",
      "Floor-to-ceiling smoked glass cabinet doors",
      "Cabinet interior with glass shelves",
      "Wall cabinets with textured frosted glass doors",
      "Smoked glass wall cabinet with slim bronze aluminium frame",
    ],
  }),
  project({
    id: "wapda-grid-station-nowshera",
    shortTitle: "WAPDA Grid Station",
    title: "WAPDA Grid Station: Windows & Office Partitions",
    client: "WAPDA Grid Station",
    location: "Nowshera",
    tagline: "Aluminium casement windows and a glass office cabin for a grid station control building.",
    description:
      "Aluminium windows and glass partitions for the control building of the WAPDA grid station in Nowshera. We supplied and installed white and silver aluminium casement windows across all floors of the building, built to stay sealed and secure on an exposed industrial site. Inside, we fitted a frameless-look glass office cabin with a slim aluminium frame and a glass door, creating a bright, enclosed workspace within the open-plan control floor. All work was completed on a live, high-security power installation alongside other contractors.",
    serviceHref: ALUMINIUM,
    items: ["Aluminium casement windows", "Glass office cabin", "Glass door with aluminium frame", "Government site installation"],
    captions: [
      "Grid station control building with aluminium windows on every floor",
      "White aluminium casement windows overlooking the switchyard",
      "Silver aluminium casement window from inside",
      "Installing the glass office cabin on the control floor",
    ],
  }),
  project({
    id: "aluminium-sliding-windows",
    shortTitle: "Arched Sliding Windows",
    title: "Arched Aluminium Sliding Windows",
    client: "Private Residence",
    tagline: "Black aluminium sliding windows with fixed arched tops for a classical white façade.",
    description:
      "Black aluminium sliding windows made to fit the arched openings of this classical-style home. Each window combines a fixed half-round glass top with smooth two-panel sliding sashes below, framed precisely between the façade's columns and decorative arches on both the ground and first floors. Inside, we added sliding windows with a top-hung ventilator above for airflow. The slim black frames contrast sharply with the white façade and open up wide, clear views.",
    serviceHref: ALUMINIUM,
    items: ["Arched-top sliding windows", "Fixed half-round glass", "Sliding windows with top vent", "Black aluminium frames"],
    captions: [
      "Front elevation: black arched sliding windows on a classical white façade",
      "Twin arched windows behind the first-floor balcony",
      "Ground-floor arched windows with two-panel sliding sashes",
      "Arched sliding windows set between decorative columns",
      "Interior sliding window with top-hung ventilator",
    ],
  }),
];

export const WORK_HREF = "/work";
export const workHref = (id: string) => `${WORK_HREF}#${id}`;

/**
 * Asymmetric placement on a 12 × 3 grid (lg), explicit so the wall always
 * closes cleanly:
 *
 *   ┌──────────┬────────┬──────┐
 *   │          │   1    │      │
 *   │          ├────┬───┤  2   │
 *   │    0     │    │ 4 │      │
 *   │          │ 3  ├───┼──────┤
 *   │          │    │ 5 │  6   │
 *   └──────────┴────┴───┴──────┘
 */
export const WORK_PLACEMENT = [
  "lg:col-start-1 lg:col-end-6 lg:row-start-1 lg:row-end-4",
  "lg:col-start-6 lg:col-end-10 lg:row-start-1 lg:row-end-2",
  "lg:col-start-10 lg:col-end-13 lg:row-start-1 lg:row-end-3",
  "lg:col-start-6 lg:col-end-8 lg:row-start-2 lg:row-end-4",
  "lg:col-start-8 lg:col-end-10 lg:row-start-2 lg:row-end-3",
  "lg:col-start-8 lg:col-end-10 lg:row-start-3 lg:row-end-4",
  "lg:col-start-10 lg:col-end-13 lg:row-start-3 lg:row-end-4",
];
