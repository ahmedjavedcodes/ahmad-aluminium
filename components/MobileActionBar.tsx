"use client";

import { useEffect, useState } from "react";
import { MessageCircle, Phone } from "lucide-react";
import { content } from "@/data/content";
import { site, cityName, telHref, whatsappHref } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * Thumb-reach call and WhatsApp buttons on phones.
 *
 * Hidden over the first screen, where the hero already carries both actions,
 * and slides up once the visitor starts reading — so the two channels that
 * actually convert are never more than one tap away on a long page.
 */
export function MobileActionBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 px-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] transition-transform duration-500 ease-out-expo md:hidden",
        visible ? "translate-y-0" : "pointer-events-none translate-y-[130%]"
      )}
    >
      <div className="glass-panel grid grid-cols-2 gap-2 rounded-xl p-2">
        <a
          href={telHref}
          tabIndex={visible ? undefined : -1}
          className="focus-ring flex h-12 items-center justify-center gap-2 rounded-lg border border-border-strong text-sm font-semibold text-ink active:scale-[0.98]"
        >
          <Phone size={16} className="text-accent" aria-hidden />
          {content.hero.ctaSecondary}
        </a>
        <a
          href={whatsappHref(`Hi ${site.name}, I'd like a free quotation. My area in ${cityName} is: `)}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={visible ? undefined : -1}
          className="focus-ring flex h-12 items-center justify-center gap-2 rounded-lg bg-accent text-sm font-semibold text-on-accent active:scale-[0.98]"
        >
          <MessageCircle size={16} aria-hidden />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
