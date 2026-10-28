import localFont from "next/font/local";

/**
 * Public-site fonts, loaded through next/font so they are preloaded and each
 * gets a metric-matched fallback (`adjustFontFallback`). Text then occupies
 * the same space before and after the real font arrives — no layout shift.
 *
 * Plus Jakarta Sans for structural headings, Inter for body copy, Geist Mono
 * for the occasional technical label. Latin subsets of the variable fonts
 * (SIL Open Font License), applied as CSS variables on `.site-theme` and
 * consumed in app/globals.css.
 */
export const displayFont = localFont({
  src: "./fonts/plus-jakarta-sans-latin-wght-normal.woff2",
  variable: "--font-jakarta",
  weight: "200 800",
  display: "swap",
});

export const bodyFont = localFont({
  src: "./fonts/inter-latin-wght-normal.woff2",
  variable: "--font-inter-site",
  weight: "100 900",
  display: "swap",
});

export const monoFont = localFont({
  src: "./fonts/geist-mono-latin-wght-normal.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
  // Small labels only; not worth a preload slot on first paint.
  preload: false,
});

export const siteFontVariables = `${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`;
