import { heroImage, services } from "@/data/services";
import { content } from "@/data/content";
import { cityName } from "@/data/site";

export interface WorkItem {
  /** Hash used to open this project directly: /work#<id>. */
  id: string;
  image: string;
  title: string;
  tagline?: string;
  alt: string;
  /** The service page for this trade, if there is one. */
  serviceHref?: string;
  items: string[];
  /** Real-project details, shown when present (filled in once the
   *  customer project photographs are added). */
  client?: string;
  location?: string;
  year?: string;
}

/**
 * The portfolio shown on the home page's "Our Work" wall and on /work.
 *
 * For now it is derived (read-only) from data/: the facade photograph plus one
 * image per trade. When the real customer projects arrive, each becomes an
 * entry here with its photograph and, where known, `client`, `location` and
 * `year` — both pages pick them up with no other changes. The wall shows the
 * first seven (most recent first).
 */
export const workItems: WorkItem[] = [
  {
    id: "facades",
    image: heroImage,
    title: content.gallery.heroLabel,
    alt: `Aluminium and glass facade work in ${cityName}`,
    serviceHref: "/services",
    items: [],
  },
  ...services.map((s) => ({
    id: s.slug,
    image: s.image,
    title: s.title,
    tagline: s.tagline,
    alt: `${s.title} in ${cityName} — ${s.tagline}`,
    serviceHref: `/services/${s.slug}`,
    items: s.items,
  })),
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
