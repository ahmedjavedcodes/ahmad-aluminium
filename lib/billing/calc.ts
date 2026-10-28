import type { Discount, LineItem, Tax, Totals, Unit } from "./types";

/* ---------------------------------------------------------------------------
 * Pricing rules from the PRD. Shared by the editor (live totals), the server
 * (the amounts it stores) and the PDF, so all three always agree.
 *
 *   area (sq ft)  = width (in) × height (in) / 144, rounded to 2 decimals
 *   line amount   = billable measure × qty × rate, rounded to whole rupees
 *   total         = subtotal − discount + tax
 * ------------------------------------------------------------------------- */

export const UNIT_LABEL: Record<Unit, string> = {
  sqft: "sq ft",
  rft: "rft",
  piece: "pc",
  lumpsum: "lump sum",
};

export const UNIT_NAME: Record<Unit, string> = {
  sqft: "Per sq ft",
  rft: "Per running ft",
  piece: "Per piece",
  lumpsum: "Lump sum",
};

/** Rounds half up, after shaving off binary floating-point noise (2.675 → 2.68). */
function roundTo(value: number, decimals: number): number {
  const factor = 10 ** decimals;
  return Math.round(Number((value * factor).toFixed(6))) / factor;
}

export const toRupees = (value: number): number => roundTo(value, 0);

export function areaSqft(widthIn: number, heightIn: number): number {
  return roundTo((widthIn * heightIn) / 144, 2);
}

export function lengthFt(lengthIn: number): number {
  return roundTo(lengthIn / 12, 2);
}

type Measurable = Pick<LineItem, "unit" | "widthIn" | "heightIn" | "lengthIn" | "qty" | "rate">;

export function lineAmount(line: Measurable): number {
  switch (line.unit) {
    case "sqft":
      return toRupees(areaSqft(line.widthIn ?? 0, line.heightIn ?? 0) * line.qty * line.rate);
    case "rft":
      return toRupees(lengthFt(line.lengthIn ?? 0) * line.qty * line.rate);
    case "piece":
      return toRupees(line.qty * line.rate);
    case "lumpsum":
      return toRupees(line.rate);
  }
}

/** Clears the fields a unit does not use, so stored lines stay clean. */
export function normaliseLine<T extends Measurable>(line: T): T {
  return {
    ...line,
    widthIn: line.unit === "sqft" ? line.widthIn : null,
    heightIn: line.unit === "sqft" ? line.heightIn : null,
    lengthIn: line.unit === "rft" ? line.lengthIn : null,
    qty: line.unit === "lumpsum" ? 1 : line.qty,
  };
}

export function computeTotals(
  lines: Pick<LineItem, "amount">[],
  discount: Discount,
  tax: Tax,
): Totals {
  const subtotal = lines.reduce((sum, line) => sum + line.amount, 0);
  const rawDiscount =
    discount.type === "percent"
      ? (subtotal * Math.min(Math.max(discount.value, 0), 100)) / 100
      : Math.max(discount.value, 0);
  const discountAmount = Math.min(subtotal, toRupees(rawDiscount));
  const taxable = subtotal - discountAmount;
  const taxAmount = tax.enabled ? toRupees((taxable * Math.max(tax.rate, 0)) / 100) : 0;
  return { subtotal, discountAmount, taxAmount, total: taxable + taxAmount };
}

export function formatRs(amount: number): string {
  const sign = amount < 0 ? "-" : "";
  return `${sign}Rs ${Math.abs(Math.round(amount)).toLocaleString("en-US")}`;
}

/** 54 → 4' 6"   ·   60 → 5' 0"   ·   6.5 → 0' 6.5" */
export function formatFtIn(inches: number): string {
  const ft = Math.floor(inches / 12);
  const rest = roundTo(inches - ft * 12, 2);
  return `${ft}' ${rest}"`;
}

export function splitFtIn(inches: number | null): { ft: string; inch: string } {
  if (inches == null) return { ft: "", inch: "" };
  const ft = Math.floor(inches / 12);
  return { ft: String(ft), inch: String(roundTo(inches - ft * 12, 2)) };
}

/** The measurement line printed under a line item's name. */
export function measureText(line: Measurable): string {
  const each = line.qty !== 1 ? " each" : "";
  if (line.unit === "sqft" && line.widthIn && line.heightIn) {
    const area = areaSqft(line.widthIn, line.heightIn).toFixed(2);
    return `${formatFtIn(line.widthIn)} × ${formatFtIn(line.heightIn)} = ${area} sq ft${each}`;
  }
  if (line.unit === "rft" && line.lengthIn) {
    return `Length ${formatFtIn(line.lengthIn)} = ${lengthFt(line.lengthIn).toFixed(2)} rft${each}`;
  }
  return "";
}

export function formatQty(qty: number): string {
  return Number.isInteger(qty) ? String(qty) : String(roundTo(qty, 2));
}

export function formatRate(rate: number): string {
  return Number.isInteger(rate) ? rate.toLocaleString("en-US") : roundTo(rate, 2).toLocaleString("en-US");
}

/* ---- Amount in words, Pakistani lakh/crore system ------------------------ */

const ONES = [
  "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
  "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen",
  "Eighteen", "Nineteen",
];
const TENS = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

function twoDigits(n: number): string {
  if (n < 20) return ONES[n];
  const tens = TENS[Math.floor(n / 10)];
  return n % 10 ? `${tens}-${ONES[n % 10]}` : tens;
}

function threeDigits(n: number): string {
  const hundreds = Math.floor(n / 100);
  const rest = n % 100;
  return [hundreds ? `${ONES[hundreds]} Hundred` : "", rest ? twoDigits(rest) : ""]
    .filter(Boolean)
    .join(" ");
}

function indianWords(n: number): string {
  const crore = Math.floor(n / 1e7);
  const lakh = Math.floor((n % 1e7) / 1e5);
  const thousand = Math.floor((n % 1e5) / 1000);
  const rest = n % 1000;
  return [
    crore ? `${indianWords(crore)} Crore` : "",
    lakh ? `${twoDigits(lakh)} Lakh` : "",
    thousand ? `${twoDigits(thousand)} Thousand` : "",
    rest ? threeDigits(rest) : "",
  ]
    .filter(Boolean)
    .join(" ");
}

/** 125000 → "Rupees One Lakh Twenty-Five Thousand Only" */
export function amountInWords(amount: number): string {
  const n = Math.abs(Math.round(amount));
  return `Rupees ${n === 0 ? "Zero" : indianWords(n)} Only`;
}
