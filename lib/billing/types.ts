import type { ObjectId } from "mongodb";

/* ---------------------------------------------------------------------------
 * Billing domain types.
 *
 * `*Doc` types are what MongoDB stores. `*View` types are the same records
 * made serialisable (ObjectId → string, Date → ISO string) so server
 * components can hand them to client components and server actions can
 * return them.
 * ------------------------------------------------------------------------- */

export const UNITS = ["sqft", "rft", "piece", "lumpsum"] as const;
export type Unit = (typeof UNITS)[number];

export const QUOTATION_STATUSES = ["draft", "sent", "accepted", "rejected", "converted"] as const;
export type QuotationStatus = (typeof QUOTATION_STATUSES)[number];

export const INVOICE_STATUSES = ["draft", "issued", "cancelled"] as const;
export type InvoiceStatus = (typeof INVOICE_STATUSES)[number];

export const PAYMENT_METHODS = ["cash", "bank", "cheque", "wallet"] as const;
export type PaymentMethod = (typeof PAYMENT_METHODS)[number];

export type DocKind = "quotation" | "invoice";

export interface LineItem {
  id: string;
  name: string;
  description: string;
  unit: Unit;
  /** Dimensions are stored in inches; only the ones the unit uses are set. */
  widthIn: number | null;
  heightIn: number | null;
  lengthIn: number | null;
  qty: number;
  /** Per sq ft, per running ft, per piece — or the whole amount for a lump sum. */
  rate: number;
  /** Whole rupees, computed on the server from the fields above. */
  amount: number;
}

export interface Discount {
  type: "amount" | "percent";
  value: number;
}

export interface Tax {
  enabled: boolean;
  label: string;
  rate: number;
}

export interface CustomerSnapshot {
  name: string;
  phone: string;
  company: string;
  address: string;
  email: string;
}

export interface Totals {
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  total: number;
}

interface DocBase extends Totals {
  number: string;
  customerId: ObjectId;
  /** The customer as they were when the document was last saved. */
  customer: CustomerSnapshot;
  /** Calendar dates as YYYY-MM-DD (Pakistan time), never Date objects. */
  issueDate: string;
  lines: LineItem[];
  discount: Discount;
  tax: Tax;
  notes: string;
  terms: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface QuotationDoc extends DocBase {
  _id: ObjectId;
  validUntil: string;
  status: QuotationStatus;
  invoiceId: ObjectId | null;
  invoiceNumber: string | null;
}

export interface Payment {
  id: string;
  date: string;
  amount: number;
  method: PaymentMethod;
  reference: string;
}

export interface InvoiceDoc extends DocBase {
  _id: ObjectId;
  dueDate: string;
  status: InvoiceStatus;
  quotationId: ObjectId | null;
  quotationNumber: string | null;
  payments: Payment[];
  amountPaid: number;
}

export interface CustomerDoc {
  _id: ObjectId;
  name: string;
  phone: string;
  company: string;
  address: string;
  email: string;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SavedItemDoc {
  _id: ObjectId;
  name: string;
  description: string;
  unit: Unit;
  rate: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CloudImage {
  publicId: string;
  url: string;
  width: number;
  height: number;
}

export interface SettingsDoc {
  _id: "business";
  tradingName: string;
  legalName: string;
  address: string;
  phone: string;
  email: string;
  ntn: string;
  logo: CloudImage | null;
  /** Company stamp, printed at the end of every quotation and invoice. */
  stamp: CloudImage | null;
  bankDetails: string;
  quoteTerms: string;
  invoiceTerms: string;
  validityDays: number;
  dueDays: number;
  tax: Tax;
  quotePrefix: string;
  invoicePrefix: string;
  updatedAt: Date | null;
}

export interface CounterDoc {
  _id: string;
  seq: number;
}

type Serialised<T, Ids extends keyof T> = Omit<T, "_id" | Ids | "createdAt" | "updatedAt"> & {
  id: string;
  createdAt: string;
  updatedAt: string;
} & { [K in Ids]: null extends T[K] ? string | null : string };

export type QuotationView = Serialised<QuotationDoc, "customerId" | "invoiceId">;
export type InvoiceView = Serialised<InvoiceDoc, "customerId" | "quotationId">;
export type CustomerView = Serialised<CustomerDoc, never>;
export type SavedItemView = Serialised<SavedItemDoc, never>;
export type SettingsView = Omit<SettingsDoc, "_id" | "updatedAt">;

export type PdfPayload =
  | { kind: "quotation"; doc: QuotationView; settings: SettingsView }
  | { kind: "invoice"; doc: InvoiceView; settings: SettingsView };

export type ActionResult<T = { id: string }> =
  | ({ ok: true } & T)
  | { ok: false; error: string };
