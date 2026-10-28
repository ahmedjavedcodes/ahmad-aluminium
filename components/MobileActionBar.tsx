"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, Phone } from "lucide-react";
import { content } from "@/data/content";
import { site, cityName, telHref, whatsappHref } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * Thumb-reach call and WhatsApp buttons on phones.
 *
 * Hidden over the first screen, where the hero already carries both actions,
 * and slides up once the visitor starts reading — so the two channels that
 * actually convert are never more than one tap away on a long page. It also
 * steps aside while the quote form (#quote) is on screen: the form has its
 * own send button, and the bar would cover it.
 */
export function MobileActionBar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [overQuote, setOverQuote] = useState(false);
  const visible = scrolled && !overQuote;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const quote = document.getElementById("quote");
    setOverQuote(false);
    if (!quote) return;
    const io = new IntersectionObserver(([entry]) => setOverQuote(entry.isIntersecting), { threshold: 0.2 });
    io.observe(quote);
    return () => io.disconnect();
  }, [pathname]);

  return (
    <div
      aria-hidden={!visible}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 px-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] transition-transform duration-500 ease-out-expo md:hidden",
        visible ? "translate-y-0" : "pointer-events-none translate-y-[130%]"
      )}
    >
      <div className="glass-panel grid grid-cols-2 gap-2 rounded-full p-1.5">
        <a
          href={telHref}
          tabIndex={visible ? undefined : -1}
          className="focus-ring flex h-12 items-center justify-center gap-2 rounded-full border border-border-strong bg-bg-elevated text-sm font-semibold text-ink active:scale-[0.97]"
        >
          <Phone size={16} className="text-accent" aria-hidden />
          {content.hero.ctaSecondary}
        </a>
        <a
          href={whatsappHref(`Hi ${site.name}, I'd like a free quotation. My area in ${cityName} is: `)}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={visible ? undefined : -1}
          className="focus-ring flex h-12 items-center justify-center gap-2 rounded-full bg-accent text-sm font-semibold text-on-accent shadow-copper-glow active:scale-[0.97]"
        >
          <MessageCircle size={16} aria-hidden />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
