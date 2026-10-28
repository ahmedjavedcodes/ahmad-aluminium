import Link from "next/link";
import { ArrowRight, Home, Phone } from "lucide-react";
import { services } from "@/data/services";
import { site, telHref, cityName } from "@/data/site";
import { LogoMark } from "@/components/Logo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { siteFontVariables } from "@/app/site-fonts";

export const metadata = {
  title: { absolute: `Page not found | ${site.name}` },
  robots: { index: false, follow: true },
};

/**
 * Branded 404.
 *
 * Next's built-in not-found page ships its own styles and renders on a dark
 * ground, which looked broken inside this light layout. It also matters more
 * than usual here: the site previously served bilingual /en and /ur URLs, so
 * any old inbound link that misses the redirects lands on this page — it needs
 * to route people onward rather than dead-end them.
 *
 * The root not-found renders outside the (site) route group, so it brings its
 * own navbar, footer and `.site-theme` wrapper.
 */
export default function NotFound() {
  return (
    <div className={`site-theme ${siteFontVariables}`}>
      <Navbar />
      <main id="main">
        <section className="relative isolate flex min-h-[70vh] items-center overflow-hidden pb-24 pt-36">
          <div aria-hidden className="blueprint absolute inset-0 -z-10" />

          <div className="mx-auto w-full max-w-3xl px-5 text-center sm:px-8">
            <LogoMark className="mx-auto h-14 w-14 text-accent" />

            <p className="mt-8 font-mono text-6xl font-semibold text-accent sm:text-7xl">404</p>
            <h1 className="mt-4 font-display text-3xl font-bold tracking-[-0.025em] text-ink sm:text-5xl">
              We couldn&apos;t find that page
            </h1>
            <p className="mx-auto mt-4 max-w-prose leading-relaxed text-ink-muted">
              The page may have moved or the link may be out of date. Everything we do in{" "}
              {cityName} is still here — pick a service below, or call us and we&apos;ll help
              directly.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/">
                  <Home size={16} aria-hidden />
                  Back to home
                  <ArrowRight
                    size={16}
                    aria-hidden
                    className="transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
                  />
                </Link>
              </Button>
              <Button asChild size="lg" variant="glass">
                <a href={telHref}>
                  <Phone size={15} className="text-accent" aria-hidden />
                  <span className="font-mono">{site.phoneLocal}</span>
                </a>
              </Button>
            </div>

            <div className="mt-12 border-t border-border pt-8">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-subtle">
                Our services
              </h2>
              <ul className="mt-4 flex flex-wrap justify-center gap-2.5">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="focus-ring inline-block rounded-md border border-border bg-bg-elevated px-4 py-2 text-sm text-ink-muted transition-colors duration-300 hover:border-accent/40 hover:text-accent"
                    >
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
