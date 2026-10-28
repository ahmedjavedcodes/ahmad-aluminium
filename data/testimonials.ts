/* ---------------------------------------------------------------------------
 * Customer reviews, mirrored verbatim from the Google Business Profile.
 *
 * Review text is reproduced EXACTLY as written — not tidied, expanded or
 * rephrased. Publishing an edited or invented review is deceptive and breaches
 * Google's policies, so if a review is short it stays short.
 *
 * Star ratings: the profile shows an average of 5.0 across 9 ratings. An
 * average of exactly 5.0 over 9 ratings is only possible if every rating is a
 * 5, so each entry below is recorded as 5 stars on that basis rather than
 * being guessed.
 *
 * Dates: the profile displays relative timestamps ("3 weeks ago"), so these
 * are the calculated calendar dates as of 2026-08-30 and are approximate to
 * within a few days. Replace with exact dates if you have them.
 * ------------------------------------------------------------------------- */

export interface Testimonial {
  /** Reviewer name exactly as shown on Google. */
  name: string;
  /** 1–5. */
  rating: number;
  /** The review text, verbatim. */
  text: string;
  /** ISO date (YYYY-MM-DD). Derived from the profile's relative timestamp. */
  date: string;
}

/** Reviews that carry written text — the two rating-only reviews are counted
 *  in the aggregate below but have nothing to quote. */
export const testimonials: Testimonial[] = [
  {
    name: "Usama G",
    rating: 5,
    date: "2026-08-29",
    text: "Work Soo amazing I'm happy Thanks",
  },
  {
    name: "Wajeeha Asghar",
    rating: 5,
    date: "2026-08-16",
    text: "Good work",
  },
  {
    name: "Puppy kennel Club lahore",
    rating: 5,
    date: "2026-08-09",
    text: "Window installation service best time on delivery satisfied Ahmad aluminium & glass fabrication.",
  },
  {
    name: "shaheen Malik",
    rating: 5,
    date: "2026-08-09",
    text: "Satisfied.. Good quality and good work 💯",
  },
  {
    name: "Meerab Ahmad hassan",
    rating: 5,
    date: "2026-08-09",
    text: "Excellent services",
  },
  {
    name: "Muhammad Altaf",
    rating: 5,
    date: "2026-08-09",
    text: "Excellent work",
  },
  {
    name: "Asad Ali",
    rating: 5,
    date: "2026-08-09",
    text: "Excellent service",
  },
];

/**
 * Overall Google rating. `count` is the full number of ratings on the profile
 * (9), which is larger than `testimonials.length` (7) because two reviewers
 * left a star rating without written text.
 */
export const googleRating: {
  value: number;
  count: number;
  profileUrl: string;
} = {
  value: 5.0,
  count: 9,
  profileUrl: "https://share.google/98JTnq8VPj6YfFfjb",
};

export const hasTestimonials = testimonials.length > 0;
