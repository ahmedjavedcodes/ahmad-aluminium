/**
 * Cloudinary delivery URL for an image placed in a PDF or on screen.
 *
 * react-pdf can only embed PNG and JPEG, so the format is forced to PNG
 * (which also keeps a stamp's transparent background); `c_limit,w_…` keeps
 * the PDF small without ever upscaling the original.
 */
export function brandImageUrl(url: string, width: number): string {
  const marker = "/upload/";
  const at = url.indexOf(marker);
  if (at === -1) return url;
  const head = url.slice(0, at + marker.length);
  return `${head}f_png,c_limit,w_${width}/${url.slice(at + marker.length)}`;
}
