import "server-only";
import { z } from "zod";
import { isDateString } from "./dates";
import { PAYMENT_METHODS, QUOTATION_STATUSES, UNITS } from "./types";

/* Everything a browser sends is validated here before it touches the
 * database. Amounts and totals are never accepted from the client — the
 * server recomputes them from these fields. */

const text = (max: number) => z.string().trim().max(max);
const objectId = z.string().regex(/^[a-f0-9]{24}$/i, "Invalid id");
const date = z.string().refine(isDateString, "Enter a valid date");
const email = text(200).refine(
  (v) => v === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
  "Enter a valid email address",
);
const inches = z.number().min(0).max(120_000).nullable();
const money = z.number().min(0).max(1_000_000_000);

export const customerFieldsSchema = z.object({
  name: text(120).min(1, "Customer name is required"),
  phone: text(40),
  company: text(120),
  address: text(500),
  email,
  notes: text(2000).default(""),
});

const lineSchema = z
  .object({
    id: text(40).min(1),
    name: text(200).min(1, "Every line needs a name"),
    description: text(1000),
    unit: z.enum(UNITS),
    widthIn: inches,
    heightIn: inches,
    lengthIn: inches,
    qty: z.number().min(0).max(1_000_000),
    rate: money,
  })
  .superRefine((line, ctx) => {
    if (line.unit === "sqft" && (!line.widthIn || !line.heightIn)) {
      ctx.addIssue({ code: "custom", message: `"${line.name}" needs a width and a height` });
    }
    if (line.unit === "rft" && !line.lengthIn) {
      ctx.addIssue({ code: "custom", message: `"${line.name}" needs a length` });
    }
  });

export const documentSchema = z
  .object({
    customer: z.discriminatedUnion("mode", [
      z.object({ mode: z.literal("existing"), id: objectId }),
      z.object({ mode: z.literal("new"), fields: customerFieldsSchema }),
    ]),
    issueDate: date,
    /** Valid-until for a quotation, due date for an invoice. */
    endDate: date,
    lines: z.array(lineSchema).min(1, "Add at least one line").max(300),
    discount: z.object({ type: z.enum(["amount", "percent"]), value: money }),
    tax: z.object({ enabled: z.boolean(), label: text(30), rate: z.number().min(0).max(100) }),
    notes: text(4000),
    terms: text(4000),
  })
  .refine((d) => d.endDate >= d.issueDate, {
    message: "The end date can't be before the issue date",
    path: ["endDate"],
  })
  .refine((d) => d.discount.type !== "percent" || d.discount.value <= 100, {
    message: "A percentage discount can't exceed 100%",
    path: ["discount"],
  });

export type DocumentInput = z.infer<typeof documentSchema>;

export const quotationStatusSchema = z.enum(
  QUOTATION_STATUSES.filter((s) => s !== "converted") as ["draft", "sent", "accepted", "rejected"],
);

export const paymentSchema = z.object({
  date,
  amount: z.number().int("Enter whole rupees").min(1, "Enter an amount").max(1_000_000_000),
  method: z.enum(PAYMENT_METHODS),
  reference: text(120),
});

export const savedItemSchema = z.object({
  name: text(200).min(1, "Name is required"),
  description: text(1000),
  unit: z.enum(UNITS),
  rate: money,
});

const prefix = text(8).regex(/^[A-Z0-9]+$/, "Prefixes use capital letters and digits only").min(1);

export const settingsSchema = z.object({
  tradingName: text(120).min(1, "Trading name is required"),
  legalName: text(200),
  address: text(500),
  phone: text(60),
  email,
  ntn: text(40),
  bankDetails: text(1000),
  quoteTerms: text(4000),
  invoiceTerms: text(4000),
  validityDays: z.number().int().min(1).max(365),
  dueDays: z.number().int().min(0).max(365),
  tax: z.object({ enabled: z.boolean(), label: text(30), rate: z.number().min(0).max(100) }),
  quotePrefix: prefix,
  invoicePrefix: prefix,
  nextQuoteNumber: z.number().int().min(1).max(999_999),
  nextInvoiceNumber: z.number().int().min(1).max(999_999),
});

export const idSchema = objectId;

export function firstError(error: z.ZodError): string {
  return error.issues[0]?.message ?? "Some fields are not valid";
}
