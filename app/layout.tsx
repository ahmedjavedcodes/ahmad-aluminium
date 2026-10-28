import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/fraunces/wght.css";
import "./globals.css";

import { content } from "@/data/content";
import { site, cityName } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: content.meta.title,
    template: `%s | ${site.name}`,
  },
  description: content.meta.description,
  applicationName: site.name,
  keywords: [
    `aluminium and glass work in ${cityName}`,
    `aluminium windows ${cityName}`,
    `glass partition ${cityName}`,
    `woodwork in ${cityName}`,
    `kitchen cabinets ${cityName}`,
    `iron work ${cityName}`,
    `glass paper ${cityName}`,
    `interior fit out ${cityName}`,
    `AC repair ${cityName}`,
    `fabrication workshop ${cityName}`,
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: site.url,
    siteName: site.name,
    title: content.meta.title,
    description: content.meta.description,
  },
  twitter: {
    card: "summary_large_image",
    title: content.meta.title,
    description: content.meta.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "Construction & Fabrication",
  other: {
    // Explicit geo hints. Legacy, but still parsed by a number of local
    // directories and crawlers that index trade businesses.
    "geo.region": "PK-PB",
    "geo.placename": cityName,
    "geo.position": `${site.geo.latitude};${site.geo.longitude}`,
    ICBM: `${site.geo.latitude}, ${site.geo.longitude}`,
  },
};

export const viewport = {
  themeColor: "#faf7f1",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-PK">
      {/* No background utility here on purpose — the ground is set on <html>
          in globals.css so that negative-z-index hero imagery stays visible. */}
      <body className="text-ink antialiased">{children}</body>
    </html>
  );
}
