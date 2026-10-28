/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Cloudinary resizes on its own CDN — see lib/cloudinary-loader.ts for why
    // the built-in optimizer could not be used with these source assets.
    loader: "custom",
    loaderFile: "./lib/cloudinary-loader.ts",
    remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com" }],
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
  compress: true,

  /**
   * The site previously served bilingual /en and /ur URLs. Those paths are
   * gone, so anything already linking to or indexing them would now 404 and
   * lose its accumulated ranking. A permanent (301) redirect passes that
   * signal on to the equivalent new URL instead.
   */
  async redirects() {
    return [
      { source: "/en", destination: "/", permanent: true },
      { source: "/ur", destination: "/", permanent: true },
      { source: "/en/:path*", destination: "/:path*", permanent: true },
      { source: "/ur/:path*", destination: "/:path*", permanent: true },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
      {
        // The private billing area must never be indexed or cached by a CDN.
        source: "/admin/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
          { key: "Cache-Control", value: "private, no-store" },
        ],
      },
      {
        // Let crawlers and assistants cache the plain-text brief briefly.
        source: "/llms.txt",
        headers: [{ key: "Cache-Control", value: "public, max-age=3600" }],
      },
    ];
  },

  onDemandEntries: {
    maxInactiveAge: 10 * 1000,
    pagesBufferLength: 2,
  },
};

export default nextConfig;
