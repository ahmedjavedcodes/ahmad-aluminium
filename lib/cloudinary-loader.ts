"use client";

/**
 * next/image loader that delegates resizing to Cloudinary.
 *
 * The source assets are 3–5 MB PNGs. Next's own optimizer has to fetch the
 * whole original before it can resize, which exceeded its fetch timeout and
 * made every `/_next/image` request return a 500 — so no image on the site
 * rendered in production. Pointing the loader at Cloudinary's transformation
 * API instead means the CDN does the work and returns a correctly sized,
 * modern-format image (3.87 MB → ~231 KB at 1920px, ~31 KB at 640px).
 *
 * Also a direct SEO win: image weight is the dominant term in Largest
 * Contentful Paint on this layout, and Core Web Vitals feed page ranking.
 */
export default function cloudinaryLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  const marker = "/upload/";
  const at = src.indexOf(marker);

  // Anything not served from a Cloudinary delivery URL passes through
  // untouched, so local files in /public keep working.
  if (at === -1) return src;

  const transforms = [
    "f_auto", // negotiate AVIF/WebP from the Accept header
    "q_auto", // perceptual quality target
    "c_limit", // never upscale past the original
    `w_${width}`,
    ...(quality ? [`q_${quality}`] : []),
  ].join(",");

  const head = src.slice(0, at + marker.length);
  const tail = src.slice(at + marker.length);
  return `${head}${transforms}/${tail}`;
}
