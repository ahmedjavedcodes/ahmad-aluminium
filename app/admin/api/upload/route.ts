import { NextResponse } from "next/server";
import { isSignedIn } from "@/lib/billing/auth";
import { uploadBrandImage } from "@/lib/billing/cloudinary";
import { collections, getDb } from "@/lib/billing/db";
import { missingCloudinaryEnv } from "@/lib/billing/env";

const MAX_BYTES = 4 * 1024 * 1024;
const TYPES = new Set(["image/png", "image/jpeg", "image/webp"]);

/** POST multipart { kind: "logo" | "stamp", file } → uploads to Cloudinary, saves it in settings. */
export async function POST(request: Request) {
  if (!(await isSignedIn())) return NextResponse.json({ error: "Sign in first." }, { status: 401 });
  const missing = missingCloudinaryEnv();
  if (missing.length) {
    return NextResponse.json({ error: `Add ${missing.join(", ")} to .env.local.` }, { status: 500 });
  }

  const form = await request.formData();
  const kind = form.get("kind");
  const file = form.get("file");
  if (kind !== "logo" && kind !== "stamp") return NextResponse.json({ error: "Unknown image." }, { status: 400 });
  if (!(file instanceof File) || !TYPES.has(file.type)) {
    return NextResponse.json({ error: "Use a PNG, JPG or WebP image." }, { status: 400 });
  }
  if (file.size > MAX_BYTES) return NextResponse.json({ error: "Keep the image under 4 MB." }, { status: 400 });

  try {
    const image = await uploadBrandImage(file, kind);
    await collections(await getDb()).settings.updateOne(
      { _id: "business" },
      { $set: { [kind]: image, updatedAt: new Date() } },
      { upsert: true },
    );
    return NextResponse.json({ image });
  } catch (error) {
    console.error("[billing] upload", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload failed." },
      { status: 502 },
    );
  }
}
