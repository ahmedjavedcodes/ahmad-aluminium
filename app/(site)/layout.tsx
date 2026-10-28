import "@fontsource-variable/archivo/wdth.css";
import "@fontsource-variable/jetbrains-mono";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { MobileActionBar } from "@/components/MobileActionBar";
import { JsonLd } from "@/components/JsonLd";
import { graph, localBusinessSchema, websiteSchema } from "@/lib/structured-data";

/** Browser chrome colour to match the dark site ground (mobile address bar). */
export const viewport = {
  themeColor: "#0b0d0f",
};

/**
 * Chrome for the public marketing pages.
 *
 * Lives in a route group rather than the root layout so the private /admin
 * billing area can render its own shell without the site's navbar, footer,
 * scroll progress bar or LocalBusiness structured data. URLs are unchanged —
 * a `(group)` folder never appears in the path.
 *
 * `.site-theme` switches every colour token and the display/mono fonts to the
 * dark "anodised workshop" palette for these pages only; /admin keeps the
 * light palette from :root.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-theme">
      <JsonLd data={graph(localBusinessSchema(), websiteSchema())} />
      <a
        href="#main"
        className="focus-ring sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-on-accent"
      >
        Skip to content
      </a>
      <div aria-hidden className="noise-overlay fixed z-[1]" />
      <ScrollProgress />
      <Navbar />
      <PageTransition>{children}</PageTransition>
      <Footer />
      <MobileActionBar />
    </div>
  );
}
