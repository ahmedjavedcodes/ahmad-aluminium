import { pdf } from "@react-pdf/renderer";
import type { PdfPayload } from "../types";
import { BillingPdf } from "./BillingPdf";

/* Loaded with a dynamic import only when the owner taps Download or Share, so
 * the PDF engine (several hundred KB) never weighs down the other screens. */

export async function renderPdf(payload: PdfPayload): Promise<Blob> {
  return pdf(<BillingPdf {...payload} />).toBlob();
}

/** "QT-2026-0012 - Ali Khan.pdf", minus characters a phone can't save. */
export function pdfFileName(payload: PdfPayload): string {
  const raw = `${payload.doc.number} - ${payload.doc.customer.name}`;
  const safe = raw.replace(/[\\/:*?"<>|]+/g, "").replace(/\s+/g, " ").trim();
  return `${safe}.pdf`;
}
