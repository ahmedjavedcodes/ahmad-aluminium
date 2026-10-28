import "server-only";
import { createHash } from "node:crypto";
import { cloudinaryFolder, env } from "./env";
import type { CloudImage } from "./types";

/**
 * Signed upload straight to Cloudinary's REST API — no SDK needed for one call.
 * The logo and stamp each keep a fixed public id, so a new upload replaces
 * the old file; the returned URL carries a new version and busts caches.
 */
export async function uploadBrandImage(file: File, name: "logo" | "stamp"): Promise<CloudImage> {
  const cloudName = env("CLOUDINARY_CLOUD_NAME");
  const params: Record<string, string> = {
    folder: cloudinaryFolder(),
    invalidate: "true",
    overwrite: "true",
    public_id: name,
    timestamp: String(Math.floor(Date.now() / 1000)),
  };
  const toSign = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");
  const signature = createHash("sha1")
    .update(toSign + env("CLOUDINARY_API_SECRET"))
    .digest("hex");

  const form = new FormData();
  form.append("file", file);
  for (const [key, value] of Object.entries(params)) form.append(key, value);
  form.append("api_key", env("CLOUDINARY_API_KEY"));
  form.append("signature", signature);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: form,
  });
  const body = (await response.json()) as {
    public_id?: string;
    secure_url?: string;
    width?: number;
    height?: number;
    error?: { message?: string };
  };
  if (!response.ok || !body.secure_url || !body.public_id) {
    throw new Error(body.error?.message ?? `Cloudinary upload failed (${response.status})`);
  }
  return {
    publicId: body.public_id,
    url: body.secure_url,
    width: body.width ?? 0,
    height: body.height ?? 0,
  };
}
