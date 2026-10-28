
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { MobileActionBar } from "@/components/MobileActionBar";
import { JsonLd } from "@/components/JsonLd";
import { graph, localBusinessSchema, websiteSchema } from "@/lib/structured-data";
import { siteFontVariables } from "@/app/site-fonts";

/** Browser chrome colour to match the site ground (mobile address bar). */
export const viewport = {
  themeColor: "#f6f6f4",
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
 * light industrial palette for these pages only; /admin keeps the palette
 * from :root.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`site-theme ${siteFontVariables}`}>
      <JsonLd data={graph(localBusinessSchema(), websiteSchema())} />
      <a
        href="#main"
        className="focus-ring sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-on-accent"
      >
        Skip to content
      </a>
      {/* Without JavaScript nothing would ever be marked as revealed, so show
          everything outright. */}
      <noscript>
        <style>{`.reveal,.reveal-child,.split-word,.compare-row,.compare-mark{opacity:1!important;transform:none!important}`}</style>
      </noscript>
      <ScrollProgress />
      <Navbar />
      <PageTransition>{children}</PageTransition>
      <Footer />
      <MobileActionBar />
    </div>
  );
}
