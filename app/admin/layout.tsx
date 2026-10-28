import type { Metadata } from "next";
import { site } from "@/data/site";

// Every screen depends on the session and live data (and sign-in on .env.local):
// never prerender any of it at build time.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { default: "Billing", template: `%s · Billing · ${site.name}` },
  robots: { index: false, follow: false, nocache: true },
};

/** Private billing area: quotations, invoices and their PDFs. Gated by proxy.ts. */
export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-dvh bg-bg font-body">{children}</div>;
}
