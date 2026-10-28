import { splitFtIn } from "./calc";
import type {
  CustomerSnapshot,
  InvoiceView,
  LineItem,
  QuotationView,
  Tax,
  Unit,
} from "./types";

/* Editor state is all strings (what inputs hold) and converts to the numeric
 * payload only on save. Shared so server pages can build the initial state. */

export type CustomerChoice = ({ mode: "existing"; id: string } | { mode: "new" }) & CustomerSnapshot;

export interface LineDraft {
  id: string;
  name: string;
  description: string;
  unit: Unit;
  widthFt: string;
  widthIn: string;
  heightFt: string;
  heightIn: string;
  lengthFt: string;
  lengthIn: string;
  qty: string;
  rate: string;
}

export interface EditorState {
  customer: CustomerChoice | null;
  issueDate: string;
  /** Valid-until for a quotation, due date for an invoice. */
  endDate: string;
  lines: LineDraft[];
  discountType: "amount" | "percent";
  discountValue: string;
  taxEnabled: boolean;
  taxLabel: string;
  taxRate: string;
  notes: string;
  terms: string;
}

/** Not crypto.randomUUID: that needs HTTPS, and a phone on the LAN uses plain http in dev. */
export const draftId = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36);

export function newLineDraft(unit: Unit = "sqft"): LineDraft {
  return {
    id: draftId(),
    name: "",
    description: "",
    unit,
    widthFt: "",
    widthIn: "",
    heightFt: "",
    heightIn: "",
    lengthFt: "",
    lengthIn: "",
    qty: "1",
    rate: "",
  };
}

function lineDraftFrom(line: LineItem): LineDraft {
  const w = splitFtIn(line.widthIn);
  const h = splitFtIn(line.heightIn);
  const l = splitFtIn(line.lengthIn);
  return {
    id: line.id,
    name: line.name,
    description: line.description,
    unit: line.unit,
    widthFt: w.ft,
    widthIn: w.inch,
    heightFt: h.ft,
    heightIn: h.inch,
    lengthFt: l.ft,
    lengthIn: l.inch,
    qty: String(line.qty),
    rate: String(line.rate),
  };
}

export function editorStateFromDoc(doc: QuotationView | InvoiceView): EditorState {
  return {
    customer: { mode: "existing", id: doc.customerId, ...doc.customer },
    issueDate: doc.issueDate,
    endDate: "validUntil" in doc ? doc.validUntil : doc.dueDate,
    lines: doc.lines.map(lineDraftFrom),
    discountType: doc.discount.type,
    discountValue: doc.discount.value ? String(doc.discount.value) : "",
    taxEnabled: doc.tax.enabled,
    taxLabel: doc.tax.label,
    taxRate: String(doc.tax.rate),
    notes: doc.notes,
    terms: doc.terms,
  };
}

export function blankEditorState(opts: {
  issueDate: string;
  endDate: string;
  terms: string;
  tax: Tax;
  customer: CustomerChoice | null;
}): EditorState {
  return {
    customer: opts.customer,
    issueDate: opts.issueDate,
    endDate: opts.endDate,
    lines: [newLineDraft()],
    discountType: "amount",
    discountValue: "",
    taxEnabled: opts.tax.enabled,
    taxLabel: opts.tax.label,
    taxRate: String(opts.tax.rate),
    notes: "",
    terms: opts.terms,
  };
}

export const toNumber = (value: string): number => {
  const n = Number.parseFloat(value.replace(/,/g, ""));
  return Number.isFinite(n) ? n : 0;
};

function inches(ft: string, inch: string): number | null {
  if (ft.trim() === "" && inch.trim() === "") return null;
  return toNumber(ft) * 12 + toNumber(inch);
}

export function lineFromDraft(d: LineDraft): Omit<LineItem, "amount"> {
  return {
    id: d.id,
    name: d.name.trim(),
    description: d.description.trim(),
    unit: d.unit,
    widthIn: inches(d.widthFt, d.widthIn),
    heightIn: inches(d.heightFt, d.heightIn),
    lengthIn: inches(d.lengthFt, d.lengthIn),
    qty: d.unit === "lumpsum" ? 1 : toNumber(d.qty),
    rate: toNumber(d.rate),
  };
}

export function payloadFromState(state: EditorState) {
  const c = state.customer;
  return {
    customer:
      c?.mode === "existing"
        ? { mode: "existing" as const, id: c.id }
        : {
            mode: "new" as const,
            fields: {
              name: c?.name ?? "",
              phone: c?.phone ?? "",
              company: c?.company ?? "",
              address: c?.address ?? "",
              email: c?.email ?? "",
              notes: "",
            },
          },
    issueDate: state.issueDate,
    endDate: state.endDate,
    lines: state.lines.map(lineFromDraft),
    discount: { type: state.discountType, value: toNumber(state.discountValue) },
    tax: { enabled: state.taxEnabled, label: state.taxLabel.trim(), rate: toNumber(state.taxRate) },
    notes: state.notes,
    terms: state.terms,
  };
}

/** Loose check before trusting state restored from this device's storage. */
export function isEditorState(value: unknown): value is EditorState {
  const v = value as EditorState | null;
  return !!v && typeof v === "object" && Array.isArray(v.lines) && typeof v.issueDate === "string";
}
