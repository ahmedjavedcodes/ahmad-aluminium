"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Home, Package, Receipt, Settings, Users } from "lucide-react";

const NAV = [
  { href: "/admin", label: "Home", icon: Home },
  { href: "/admin/quotations", label: "Quotations", short: "Quotes", icon: FileText },
  { href: "/admin/invoices", label: "Invoices", icon: Receipt },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/items", label: "Items", icon: Package, desktopOnly: true },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

function isActive(pathname: string, href: string) {
  return href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
}

/** Top links on wider screens, a thumb-reach tab bar on phones. */
export function AdminNav({ variant }: { variant: "top" | "bottom" }) {
  const pathname = usePathname();

  if (variant === "top") {
    return (
      <nav aria-label="Billing" className="hidden items-center gap-1 md:flex">
        {NAV.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={clsx(
              "focus-ring rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              isActive(pathname, href) ? "bg-accent-tint text-accent-deep" : "text-ink-muted hover:text-ink",
            )}
          >
            {label}
          </Link>
        ))}
      </nav>
    );
  }

  return (
    <nav
      aria-label="Billing"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-bg-elevated/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
    >
      <ul className="grid grid-cols-5">
        {NAV.filter((item) => !item.desktopOnly).map(({ href, label, short, icon: Icon }) => (
          <li key={href}>
            <Link
              href={href}
              className={clsx(
                "focus-ring flex flex-col items-center gap-0.5 py-2 text-[11px] font-medium",
                isActive(pathname, href) ? "text-accent" : "text-ink-muted",
              )}
            >
              <Icon size={20} aria-hidden />
              {short ?? label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
