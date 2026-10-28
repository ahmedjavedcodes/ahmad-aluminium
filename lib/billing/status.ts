import type { InvoiceStatus, QuotationStatus } from "./types";

/* Stored statuses are what the owner sets. Display statuses add the ones that
 * follow from dates and payments: a quotation past its valid-until date reads
 * Expired, and an issued invoice reads Partially paid, Paid or Overdue. */

export type QuotationDisplayStatus = QuotationStatus | "expired";
export type InvoiceDisplayStatus = InvoiceStatus | "partial" | "paid" | "overdue";
export type DisplayStatus = QuotationDisplayStatus | InvoiceDisplayStatus;

export function quotationDisplayStatus(
  q: { status: QuotationStatus; validUntil: string },
  today: string,
): QuotationDisplayStatus {
  if ((q.status === "draft" || q.status === "sent") && q.validUntil < today) return "expired";
  return q.status;
}

export function invoiceDisplayStatus(
  inv: { status: InvoiceStatus; total: number; amountPaid: number; dueDate: string },
  today: string,
): InvoiceDisplayStatus {
  if (inv.status !== "issued") return inv.status;
  if (inv.amountPaid >= inv.total) return "paid";
  if (inv.dueDate < today) return "overdue";
  if (inv.amountPaid > 0) return "partial";
  return "issued";
}

export const STATUS_LABEL: Record<DisplayStatus, string> = {
  draft: "Draft",
  sent: "Sent",
  accepted: "Accepted",
  rejected: "Rejected",
  converted: "Converted",
  expired: "Expired",
  issued: "Issued",
  partial: "Partially paid",
  paid: "Paid",
  overdue: "Overdue",
  cancelled: "Cancelled",
};

export type StatusTone = "neutral" | "info" | "good" | "warn" | "bad" | "accent";

export const STATUS_TONE: Record<DisplayStatus, StatusTone> = {
  draft: "neutral",
  sent: "info",
  accepted: "good",
  rejected: "bad",
  converted: "accent",
  expired: "warn",
  issued: "info",
  partial: "warn",
  paid: "good",
  overdue: "bad",
  cancelled: "neutral",
};

export const QUOTATION_FILTERS = ["draft", "sent", "accepted", "rejected", "expired", "converted"] as const;
export const INVOICE_FILTERS = ["draft", "issued", "partial", "overdue", "paid", "cancelled"] as const;
