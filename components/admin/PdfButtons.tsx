"use client";

import { useEffect, useRef, useState } from "react";
import { Download, ExternalLink, Eye, Loader2, Share2, X } from "lucide-react";
import { getPdfPayload } from "@/lib/billing/actions";
import type { DocKind } from "@/lib/billing/types";
import { buttonClass } from "./ui";

type Built = { file: File; url: string };

/** Desktop browsers can show a PDF inside the page; phones mostly can't. */
function canPreviewInline(): boolean {
  return navigator.pdfViewerEnabled === true && window.matchMedia("(min-width: 768px)").matches;
}

/**
 * View, Download PDF (P-1, P-2) and, where the phone supports sharing files,
 * Share (P-5) — which opens the system share sheet with the PDF attached, so
 * WhatsApp is one tap away. The PDF is drawn in the browser on demand.
 */
export function PdfButtons({ kind, id, compact = false }: { kind: DocKind; id: string; compact?: boolean }) {
  const [busy, setBusy] = useState<"view" | "download" | "share" | null>(null);
  const [error, setError] = useState("");
  const [canShare, setCanShare] = useState(false);
  const [ready, setReady] = useState<Built | null>(null);
  const [preview, setPreview] = useState<Built | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    try {
      const probe = new File([""], "probe.pdf", { type: "application/pdf" });
      setCanShare(typeof navigator.canShare === "function" && navigator.canShare({ files: [probe] }));
    } catch {
      setCanShare(false);
    }
  }, []);

  useEffect(() => () => {
    if (ready) URL.revokeObjectURL(ready.url);
  }, [ready]);

  useEffect(() => {
    if (preview && !dialog.current?.open) dialog.current?.showModal();
  }, [preview]);

  async function build(): Promise<Built> {
    const result = await getPdfPayload(kind, id);
    if (!result.ok) throw new Error(result.error);
    const { renderPdf, pdfFileName } = await import("@/lib/billing/pdf/render");
    const blob = await renderPdf(result.payload);
    const file = new File([blob], pdfFileName(result.payload), { type: "application/pdf" });
    return { file, url: URL.createObjectURL(file) };
  }

  async function view() {
    setError("");
    // Phones open the PDF in a new tab, in their own viewer. A tab opened once
    // the PDF is built would be blocked as a pop-up, so it is opened now and
    // pointed at the PDF when ready.
    const tab = canPreviewInline() ? null : window.open("", "_blank");
    if (tab) tab.document.title = "Preparing preview…";
    setBusy("view");
    try {
      const built = await build();
      setReady(built);
      if (tab) tab.location.href = built.url;
      else setPreview(built); // also the fallback when the browser blocked the tab
    } catch (e) {
      tab?.close();
      setError(e instanceof Error ? e.message : "Couldn't create the PDF.");
    } finally {
      setBusy(null);
    }
  }

  async function download() {
    setBusy("download");
    setError("");
    try {
      const built = await build();
      const link = document.createElement("a");
      link.href = built.url;
      link.download = built.file.name;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setReady(built);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't create the PDF.");
    } finally {
      setBusy(null);
    }
  }

  async function share() {
    setError("");
    // Browsers only allow sharing straight after a tap. Building the PDF can
    // outlast that window, so the first tap prepares it and, if the browser
    // refuses, the button asks for a second tap that shares instantly.
    if (ready) {
      try {
        await navigator.share({ files: [ready.file], title: ready.file.name });
      } catch (e) {
        if ((e as Error).name !== "AbortError") setError("Sharing failed — use Download instead.");
      }
      return;
    }
    setBusy("share");
    try {
      const built = await build();
      setReady(built);
      await navigator.share({ files: [built.file], title: built.file.name });
    } catch (e) {
      const name = (e as Error).name;
      if (name === "NotAllowedError") setError("PDF ready — tap Share again.");
      else if (name !== "AbortError") setError(e instanceof Error ? e.message : "Couldn't share the PDF.");
    } finally {
      setBusy(null);
    }
  }

  const viewButton = (
    <button type="button" onClick={view} disabled={busy !== null} className={buttonClass("secondary")}>
      {busy === "view" ? <Loader2 size={16} className="animate-spin" aria-hidden /> : <Eye size={16} aria-hidden />}
      View
    </button>
  );
  const downloadButton = (
    <button type="button" onClick={download} disabled={busy !== null} className={buttonClass(compact ? "secondary" : "primary")}>
      {busy === "download" ? <Loader2 size={16} className="animate-spin" aria-hidden /> : <Download size={16} aria-hidden />}
      {compact ? "PDF" : "Download PDF"}
    </button>
  );
  const shareButton = canShare ? (
    <button type="button" onClick={share} disabled={busy !== null} className={buttonClass("secondary")}>
      {busy === "share" ? <Loader2 size={16} className="animate-spin" aria-hidden /> : <Share2 size={16} aria-hidden />}
      Share
    </button>
  ) : null;

  // In a list row the buttons sit in a line; in a document's side panel they
  // form full-width rows: Download, then View and Share as equal halves.
  return (
    <div className={compact ? "flex flex-wrap items-center gap-1.5" : "grid gap-2"}>
      {compact ? (
        <>
          {viewButton}
          {downloadButton}
          {shareButton}
        </>
      ) : (
        <>
          {downloadButton}
          <div className={canShare ? "grid grid-cols-2 gap-2" : "grid"}>
            {viewButton}
            {shareButton}
          </div>
        </>
      )}
      {error ? <p role="status" className="w-full text-xs text-red-700">{error}</p> : null}

      <dialog
        ref={dialog}
        onClose={() => setPreview(null)}
        aria-label={preview ? `Preview of ${preview.file.name}` : "PDF preview"}
        className="m-auto h-[92vh] max-h-none w-[min(64rem,94vw)] max-w-none overflow-hidden rounded-xl border border-border bg-bg-elevated p-0 text-ink shadow-2xl backdrop:bg-black/60"
      >
        {preview ? (
          <div className="flex h-full flex-col">
            <div className="flex items-center gap-2 border-b border-border px-3 py-2 sm:px-4">
              <p className="min-w-0 flex-1 truncate text-sm font-semibold">{preview.file.name}</p>
              <a href={preview.url} target="_blank" rel="noopener" className={buttonClass("ghost")}>
                <ExternalLink size={16} aria-hidden />
                <span className="hidden sm:inline">Open in new tab</span>
              </a>
              <a href={preview.url} download={preview.file.name} className={buttonClass("secondary")}>
                <Download size={16} aria-hidden />
                <span className="hidden sm:inline">Download</span>
              </a>
              <button
                type="button"
                onClick={() => dialog.current?.close()}
                aria-label="Close preview"
                className={buttonClass("ghost", "icon")}
              >
                <X size={16} aria-hidden />
              </button>
            </div>
            <iframe src={preview.url} title={preview.file.name} className="min-h-0 w-full flex-1 bg-surface" />
          </div>
        ) : null}
      </dialog>
    </div>
  );
}
