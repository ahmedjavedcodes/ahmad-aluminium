import localFont from "next/font/local";

/**
 * Public-site fonts, loaded through next/font so they are preloaded and each
 * gets a metric-matched fallback (`adjustFontFallback`). Text then occupies
 * the same space before and after the real font arrives — no layout shift
 * when a heading re-wraps on swap.
 *
 * Latin subsets of the variable fonts, copied from @fontsource-variable
 * (SIL Open Font License). Applied as CSS variables on the `.site-theme`
 * wrapper and consumed in app/globals.css.
 */
export const displayFont = localFont({
  src: "./fonts/bricolage-grotesque-latin-opsz-normal.woff2",
  variable: "--font-bricolage",
  weight: "200 800",
  display: "swap",
});

export const bodyFont = localFont({
  src: "./fonts/manrope-latin-wght-normal.woff2",
  variable: "--font-manrope",
  weight: "200 800",
  display: "swap",
});

export const monoFont = localFont({
  src: "./fonts/geist-mono-latin-wght-normal.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
  // Labels only; not worth a preload slot on first paint.
  preload: false,
});

export const siteFontVariables = `${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`;
