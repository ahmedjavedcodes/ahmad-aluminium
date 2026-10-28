import Link from "next/link";
import { Phone, MessageCircle, Mail, MapPin, Clock, Star } from "lucide-react";
import { services } from "@/data/services";
import { content } from "@/data/content";
import { site, nap, cityName, telHref, whatsappHref } from "@/data/site";
import { googleRating } from "@/data/testimonials";
import { Logo } from "@/components/Logo";

const companyLinks = [
  { href: "/about", label: content.footer.aboutUs },
  { href: "/services", label: content.footer.allServices },
  { href: "/#gallery", label: content.footer.galleryLink },
  { href: "/#areas", label: content.footer.areasHeading },
  { href: "/contact", label: content.footer.contactLink },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-border bg-bg-sunken py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="focus-ring inline-block rounded-lg">
              <Logo variant="full" textClassName="text-sm sm:text-base" />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-muted">
              {content.footer.tagline}
            </p>
          </div>

          <nav aria-labelledby="footer-services">
            <h2 id="footer-services" className="font-display text-sm font-semibold text-ink">
              {content.footer.servicesHeading}
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="focus-ring rounded text-sm text-ink-muted transition-colors hover:text-accent"
                  >
                    {s.title} in {cityName}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-company">
            <h2 id="footer-company" className="font-display text-sm font-semibold text-ink">
              {content.footer.companyHeading}
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="focus-ring rounded text-sm text-ink-muted transition-colors hover:text-accent"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-sm font-semibold text-ink">
              {content.footer.contactHeading}
            </h2>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-ink-muted">
              <li className="flex items-start gap-2.5">
                <Phone size={15} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                <a href={telHref} className="focus-ring rounded transition-colors hover:text-accent">
                  {site.phoneLocal}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MessageCircle size={15} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                <a
                  href={whatsappHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring rounded transition-colors hover:text-accent"
                >
                  WhatsApp {site.phoneLocal}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail size={15} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                <a
                  href={`mailto:${site.email}`}
                  className="focus-ring break-all rounded transition-colors hover:text-accent"
                >
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                <a
                  href={site.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring rounded transition-colors hover:text-accent"
                >
                  <address className="not-italic">{nap.full}</address>
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock size={15} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                {site.hours}
              </li>
            </ul>
          </div>
        </div>

        {/* Area list repeated in the footer: it appears on every page, which is
            exactly the crawl signal local search looks for. */}
        <div className="mt-12 border-t border-border pt-8">
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-subtle">
            {content.footer.areasHeading}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">
            {content.areas.list.join(" · ")}
          </p>
        </div>

        <div className="mt-10 border-t border-border pt-8">
          <a
            href={googleRating.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring inline-flex items-center gap-2 rounded-full text-xs text-ink-muted transition-colors hover:text-accent"
          >
            <span className="flex items-center gap-0.5" aria-hidden>
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} size={12} className="fill-accent text-accent" />
              ))}
            </span>
            Rated {googleRating.value.toFixed(1)} from {googleRating.count} Google reviews
          </a>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-border pt-8 text-xs text-ink-subtle sm:flex-row">
          <p>{content.footer.copyright(new Date().getFullYear())}</p>
          <p className="text-center sm:text-right">{content.footer.servicesLine}</p>
        </div>
      </div>
    </footer>
  );
}
