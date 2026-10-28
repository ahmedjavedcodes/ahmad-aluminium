"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { content } from "@/data/content";
import { site, cityName, telHref, whatsappHref } from "@/data/site";
import { LogoMark } from "@/components/Logo";

const links = [
  { href: "/", label: content.nav.home },
  { href: "/services", label: content.nav.services },
  { href: "/about", label: content.nav.about },
  { href: "/contact", label: content.nav.contact },
];

const waHref = whatsappHref(
  `Hi ${site.name}, I'd like a free quotation. My area in ${cityName} is: `
);

/**
 * Floating pill navigation.
 *
 * Sized to its contents and centred rather than spanning the full width — a
 * full-bleed bar on a page whose content sits in a 1280px column reads as a
 * heavy band across the top and competes with the hero. The pill keeps the
 * chrome proportional to the content beneath it.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-5">
      <nav
        aria-label="Main"
        className={`glass-panel flex items-center gap-1 rounded-full p-1.5 transition-shadow duration-500 ease-out-expo ${
          scrolled ? "shadow-glass" : "shadow-none"
        }`}
      >
        <Link
          href="/"
          aria-label={`${site.name} — home`}
          className="focus-ring group shrink-0 rounded-full"
        >
          {/* Mark only — no wordmark. The pill stays the same short width at
              every breakpoint; the hero lockup is what names the business. */}
          <LogoMark className="h-9 w-9 shrink-0 text-accent transition-transform duration-500 ease-out-expo group-hover:-rotate-6" />
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-0.5 pl-1 md:flex">
          {links.map((link) => {
            const active = isActive(link.href);
            return (
              <li key={link.href} className="relative">
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`focus-ring relative block rounded-full px-3.5 py-2 text-sm transition-colors duration-300 ${
                    active ? "text-ink" : "text-ink-muted hover:text-ink"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-accent-tint"
                      transition={{ type: "spring", stiffness: 420, damping: 36 }}
                    />
                  )}
                  <span className={active ? "font-medium" : undefined}>{link.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <span aria-hidden className="mx-1 hidden h-6 w-px bg-border md:block" />

        {/* Contact actions — icon-only to keep the pill short */}
        <div className="flex items-center gap-1">
          <a
            href={telHref}
            title={`Call ${site.phoneLocal}`}
            aria-label={`Call ${site.phoneLocal}`}
            className="focus-ring flex h-9 w-9 items-center justify-center rounded-full text-ink-muted transition-colors duration-300 hover:bg-accent-tint hover:text-accent"
          >
            <Phone size={16} aria-hidden />
          </a>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            title={`WhatsApp ${site.phoneLocal}`}
            aria-label={`WhatsApp ${site.phoneLocal}`}
            className="focus-ring flex h-9 w-9 items-center justify-center rounded-full bg-accent text-on-accent transition-shadow duration-300 hover:shadow-glow-accent"
          >
            <MessageCircle size={16} aria-hidden />
          </a>

          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="focus-ring flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-ink transition-colors duration-300 hover:bg-surface md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="glass-panel absolute inset-x-4 top-[4.75rem] rounded-2xl p-4 md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {links.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={`focus-ring block rounded-xl px-3 py-2.5 text-base transition-colors ${
                      isActive(link.href)
                        ? "bg-accent-tint font-medium text-accent"
                        : "text-ink-muted hover:text-ink"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <div className="mt-3 grid grid-cols-2 gap-2.5 border-t border-border pt-3">
              <a
                href={telHref}
                className="focus-ring flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-ink"
              >
                <Phone size={15} className="text-accent" aria-hidden />
                Call
              </a>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-on-accent"
              >
                <MessageCircle size={15} aria-hidden />
                WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
