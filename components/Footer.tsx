import Link from "next/link";
import { Phone, MessageCircle, Mail, MapPin, Clock, Star, ArrowUpRight } from "lucide-react";
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

const headingClass = "font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-ink-subtle";
const linkClass =
  "focus-ring inline-block rounded text-sm text-ink-muted transition-[color,transform] duration-300 ease-out-expo hover:translate-x-1 hover:text-accent-deep";

export default function Footer() {
  const [wordmark] = site.name.split(" ");

  return (
    <footer className="theme-inverse relative overflow-hidden pt-20">
      <div aria-hidden className="copper-rule absolute inset-x-0 top-0" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" className="focus-ring inline-block rounded-lg">
              <Logo variant="full" textClassName="text-sm sm:text-[15px]" />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-muted">
              {content.footer.tagline}
            </p>
            <a
              href={googleRating.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring group mt-6 inline-flex items-center gap-3 rounded-full border border-border bg-bg-elevated px-3.5 py-2.5 text-xs text-ink-muted transition-colors hover:border-accent/40 hover:text-ink"
            >
              <span className="flex items-center gap-0.5" aria-hidden>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} size={12} className="fill-accent text-accent" />
                ))}
              </span>
              Rated {googleRating.value.toFixed(1)} from {googleRating.count} Google reviews
            </a>
          </div>

          <nav aria-labelledby="footer-services" className="lg:col-span-3">
            <h2 id="footer-services" className={headingClass}>
              {content.footer.servicesHeading}
            </h2>
            <ul className="mt-5 flex flex-col gap-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className={linkClass}>
                    {s.title} in {cityName}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-company" className="lg:col-span-2">
            <h2 id="footer-company" className={headingClass}>
              {content.footer.companyHeading}
            </h2>
            <ul className="mt-5 flex flex-col gap-3">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className={headingClass}>{content.footer.contactHeading}</h2>
            <ul className="mt-5 flex flex-col gap-3.5 text-sm text-ink-muted">
              <li className="flex items-start gap-3">
                <Phone size={15} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                <a href={telHref} className="focus-ring rounded font-mono transition-colors hover:text-accent-deep">
                  {site.phoneLocal}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle size={15} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                <a
                  href={whatsappHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring rounded transition-colors hover:text-accent-deep"
                >
                  WhatsApp {site.phoneLocal}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={15} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                <a
                  href={`mailto:${site.email}`}
                  className="focus-ring break-all rounded transition-colors hover:text-accent-deep"
                >
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={15} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                <a
                  href={site.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring group rounded transition-colors hover:text-accent-deep"
                >
                  <address className="not-italic">
                    {nap.full}
                    <ArrowUpRight size={12} className="ml-1 inline opacity-60" aria-hidden />
                  </address>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={15} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                {site.hours}
              </li>
            </ul>
          </div>
        </div>

        {/* Area list repeated in the footer: it appears on every page, which is
            exactly the crawl signal local search looks for. */}
        <div className="mt-14 border-t border-border pt-8">
          <h2 className={headingClass}>{content.footer.areasHeading}</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">
            {content.areas.list.join(" · ")}
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-8 text-xs text-ink-subtle sm:flex-row">
          <p>{content.footer.copyright(new Date().getFullYear())}</p>
          <p className="text-center sm:text-right">{content.footer.servicesLine}</p>
        </div>
      </div>

      {/* Oversized outlined wordmark, cut off by the bottom edge like a
          stamped plate. Decorative only. */}
      <p
        aria-hidden
        className="pointer-events-none -mb-[4vw] mt-10 select-none lg:-mb-14 text-center font-display text-[22vw] font-black uppercase leading-[0.72] tracking-[-0.05em] text-transparent [-webkit-text-stroke:1px_rgb(255_255_255/0.08)] lg:text-[17rem]"
      >
        {wordmark}
      </p>
    </footer>
  );
}
