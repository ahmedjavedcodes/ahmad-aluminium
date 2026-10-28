"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, Phone, MessageCircle, Clock } from "lucide-react";
import { content } from "@/data/content";
import { site, cityName, telHref, whatsappHref } from "@/data/site";
import { Logo } from "@/components/Logo";
import { Button, RollText, ArrowSwap } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { QUOTE_HREF } from "@/lib/quote";

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
 * Workshop-bar navigation.
 *
 * A slim glass bar aligned to the 1280px content column. It carries the short
 * wordmark (the hero still shows the full registered name), the four routes,
 * the phone number as text on wide screens — a visible number is itself a
 * trust signal for a local trade — and one copper call to action.
 *
 * On phones the links move into a shadcn Sheet, which brings a real focus
 * trap, Escape-to-close and scroll locking.
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

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <nav
        aria-label="Main"
        className={cn(
          "mx-auto flex h-16 max-w-7xl items-center gap-3 rounded-full border px-3 transition-[background-color,border-color,box-shadow] duration-500 ease-out-expo sm:px-4",
          scrolled
            ? "glass-panel border-border"
            : "border-transparent bg-transparent"
        )}
      >
        <Link
          href="/"
          aria-label={`${site.name} — home`}
          className="focus-ring group mr-auto shrink-0 rounded-lg md:mr-0"
        >
          <Logo
            markClassName="h-9 w-9 text-accent transition-transform duration-500 ease-out-expo group-hover:-rotate-6"
            textClassName="hidden text-[15px] uppercase tracking-[0.02em] sm:block"
          />
        </Link>

        {/* Desktop links */}
        <ul className="mx-auto hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active = isActive(link.href);
            return (
              <li key={link.href} className="relative">
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "focus-ring relative block rounded-md px-3.5 py-2 text-sm transition-colors duration-300",
                    active ? "text-ink" : "text-ink-muted hover:text-ink",
                    "after:absolute after:inset-x-3.5 after:-bottom-[3px] after:h-[2px] after:origin-left after:scale-x-0 after:rounded-full after:bg-ink/25 after:transition-transform after:duration-500 after:ease-out-expo hover:after:scale-x-100"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-3.5 -bottom-[3px] z-10 h-[2px] rounded-full bg-accent"
                      transition={{ type: "spring", stiffness: 420, damping: 36 }}
                    />
                  )}
                  <span className={active ? "font-medium" : undefined}>{link.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={telHref}
            className="focus-ring hidden items-center gap-2 rounded-md px-2 py-1.5 font-mono text-[13px] text-ink-muted transition-colors hover:text-ink lg:flex"
          >
            <Phone size={14} className="text-accent" aria-hidden />
            {site.phoneLocal}
          </a>

          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href={QUOTE_HREF}>
              <RollText>{content.nav.quote}</RollText>
              <ArrowSwap size={15} />
            </Link>
          </Button>

          <a
            href={telHref}
            aria-label={`Call ${site.phoneLocal}`}
            className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg-elevated text-accent transition-colors hover:border-accent/50 sm:hidden"
          >
            <Phone size={16} aria-hidden />
          </a>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                aria-label="Open menu"
                className="focus-ring flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border bg-bg-elevated text-ink transition-colors hover:border-accent/50 md:hidden"
              >
                <Menu size={18} aria-hidden />
              </button>
            </SheetTrigger>
            <SheetContent>
              <div className="border-b border-border px-6 pb-5 pt-6">
                <SheetTitle asChild>
                  <span>
                    <Logo markClassName="h-9 w-9 text-accent" textClassName="text-base uppercase" />
                  </span>
                </SheetTitle>
                <SheetDescription className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-subtle">
                  {cityName} · {site.phoneLocal}
                </SheetDescription>
              </div>

              <ul className="flex flex-col px-3 py-4">
                {links.map((link, i) => {
                  const active = isActive(link.href);
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        aria-current={active ? "page" : undefined}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "focus-ring flex items-baseline gap-4 rounded-lg px-3 py-3.5 transition-colors",
                          active ? "bg-accent-tint" : "hover:bg-surface"
                        )}
                      >
                        <span className="font-mono text-xs text-ink-subtle">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={cn(
                            "font-display text-2xl font-semibold",
                            active ? "text-accent" : "text-ink"
                          )}
                        >
                          {link.label}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-auto flex flex-col gap-2.5 border-t border-border p-5">
                <Button asChild size="lg">
                  <Link href={QUOTE_HREF} onClick={() => setOpen(false)}>
                    <RollText>{content.nav.quote}</RollText>
                    <ArrowSwap size={16} />
                  </Link>
                </Button>
                <div className="grid grid-cols-2 gap-2.5">
                  <Button asChild variant="outline">
                    <a href={telHref}>
                      <Phone size={15} className="text-accent" aria-hidden />
                      {content.hero.ctaSecondary}
                    </a>
                  </Button>
                  <Button asChild variant="outline">
                    <a href={waHref} target="_blank" rel="noopener noreferrer">
                      <MessageCircle size={15} className="text-accent" aria-hidden />
                      WhatsApp
                    </a>
                  </Button>
                </div>
                <p className="mt-1 flex items-center gap-2 text-xs text-ink-subtle">
                  <Clock size={13} aria-hidden />
                  {site.hours}
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
