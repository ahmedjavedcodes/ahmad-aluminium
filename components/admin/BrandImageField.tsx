"use client";

import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { ImageUp, Trash2 } from "lucide-react";
import { removeBrandImage } from "@/lib/billing/actions";
import { brandImageUrl } from "@/lib/billing/images";
import type { CloudImage } from "@/lib/billing/types";
import { buttonClass, ErrorNote } from "./ui";
import { toast } from "./Toaster";

const MAX_BYTES = 4 * 1024 * 1024;

/** Upload or replace the company logo or stamp; both live on Cloudinary. */
export function BrandImageField({
  kind,
  label,
  hint,
  image,
  disabled,
}: {
  kind: "logo" | "stamp";
  label: string;
  hint: string;
  image: CloudImage | null;
  disabled?: string;
}) {
  const router = useRouter();
  const input = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  async function upload(file: File) {
    setError("");
    if (!/^image\/(png|jpeg|webp)$/.test(file.type)) return setError("Use a PNG, JPG or WebP image.");
    if (file.size > MAX_BYTES) return setError("Keep the image under 4 MB.");
    setUploading(true);
    try {
      const body = new FormData();
      body.append("kind", kind);
      body.append("file", file);
      const response = await fetch("/admin/api/upload", { method: "POST", body });
      const json = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(json.error ?? "Upload failed.");
      toast.success(`${label} ${image ? "replaced" : "uploaded"}`);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      setUploading(false);
      if (input.current) input.current.value = "";
    }
  }

  return (
    <div>
      <p className="mb-1.5 text-[13px] font-semibold text-ink-muted">{label}</p>
      <div className="flex items-center gap-4">
        <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-dashed border-border-strong bg-[repeating-conic-gradient(#f3eee4_0_25%,#fff_0_50%)] bg-[length:16px_16px]">
          {image ? (
            <img src={brandImageUrl(image.url, 200)} alt={label} className="max-h-full max-w-full object-contain" />
          ) : (
            <span className="text-xs text-ink-subtle">None</span>
          )}
        </div>
        <div className="space-y-2">
          <input
            ref={input}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="sr-only"
            id={`upload-${kind}`}
            onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])}
            disabled={!!disabled || uploading}
          />
          <label
            htmlFor={`upload-${kind}`}
            aria-disabled={!!disabled || uploading}
            className={buttonClass("secondary") + (disabled ? " pointer-events-none opacity-60" : "")}
          >
            <ImageUp size={16} aria-hidden />
            {uploading ? "Uploading…" : image ? "Replace" : "Upload"}
          </label>
          {image && (
            <button
              type="button"
              disabled={pending}
              onClick={() =>
                startTransition(async () => {
                  const result = await removeBrandImage(kind);
                  if (!result.ok) return setError(result.error);
                  toast.success(`${label} removed`);
                  router.refresh();
                })
              }
              className={buttonClass("ghost") + " text-red-700"}
            >
              <Trash2 size={16} aria-hidden />
              Remove
            </button>
          )}
          <p className="text-xs text-ink-subtle">{disabled ?? hint}</p>
        </div>
      </div>
      {error ? <div className="mt-2"><ErrorNote>{error}</ErrorNote></div> : null}
    </div>
  );
}
