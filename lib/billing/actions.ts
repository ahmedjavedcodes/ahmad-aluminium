"use server";

import { randomUUID } from "node:crypto";
import { ObjectId, type ClientSession, type Db } from "mongodb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { checkCredentials, endSession, requireOwner, startSession } from "./auth";
import { computeTotals, lineAmount, normaliseLine } from "./calc";
import { customerView, invoiceView, quotationView, toObjectId } from "./data";
import { addDays, todayPk, yearOf } from "./dates";
import { collections, getDb, inTransaction, UserError } from "./db";
import { missingCoreEnv } from "./env";
import {
  customerFieldsSchema,
  documentSchema,
  firstError,
  paymentSchema,
  quotationStatusSchema,
  savedItemSchema,
  settingsSchema,
  type DocumentInput,
} from "./schemas";
import { getSettings, nextNumber, raiseNextNumber, releaseNumber, settingsView } from "./settings";
import type {
  ActionResult,
  CustomerSnapshot,
  CustomerView,
  DocKind,
  LineItem,
  PdfPayload,
} from "./types";

/* Write side of the billing area. Every action re-checks the session: server
 * actions are plain POST endpoints and must not rely on the page being gated. */

type Result = ActionResult;

const ok = (id: ObjectId | string): Result => ({
  ok: true,
  id: typeof id === "string" ? id : id.toHexString(),
});

async function attempt<T>(work: () => Promise<ActionResult<T>>): Promise<ActionResult<T>> {
  try {
    return await work();
  } catch (error) {
    if (error instanceof UserError) return { ok: false, error: error.message };
    console.error("[billing]", error);
    return { ok: false, error: "That didn't save — the database may be unreachable. Please try again." };
  }
}

function refresh() {
  revalidatePath("/admin", "layout");
}

function requireId(id: string, what: string): ObjectId {
  const _id = toObjectId(id);
  if (!_id) throw new UserError(`${what} not found.`);
  return _id;
}

/* ---- Session -------------------------------------------------------------- */

export type LoginState = { error: string; email: string } | null;

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const missing = missingCoreEnv().filter((key) => key !== "MONGODB_URI");
  const email = String(formData.get("email") ?? "");
  if (missing.length) return { error: `Set ${missing.join(", ")} in .env.local, then restart.`, email };

  const password = String(formData.get("password") ?? "");
  await new Promise((resolve) => setTimeout(resolve, 400)); // slows down password guessing
  if (!checkCredentials(email, password)) return { error: "That email or password is wrong.", email };

  await startSession();
  const next = String(formData.get("next") ?? "");
  redirect(/^\/admin(\/[\w\-/]*)?$/.test(next) && next !== "/admin/login" ? next : "/admin");
}

export async function logout(): Promise<void> {
  await endSession();
  redirect("/admin/login");
}

/* ---- Shared document helpers --------------------------------------------- */

const snapshotOf = (c: CustomerSnapshot): CustomerSnapshot => ({
  name: c.name,
  phone: c.phone,
  company: c.company,
  address: c.address,
  email: c.email,
});

async function resolveCustomer(
  db: Db,
  session: ClientSession,
  ref: DocumentInput["customer"],
): Promise<{ id: ObjectId; snapshot: CustomerSnapshot }> {
  const { customers } = collections(db);
  if (ref.mode === "existing") {
    const doc = await customers.findOne({ _id: new ObjectId(ref.id) }, { session });
    if (!doc) throw new UserError("That customer no longer exists — pick another one.");
    return { id: doc._id, snapshot: snapshotOf(doc) };
  }
  const now = new Date();
  const _id = new ObjectId();
  await customers.insertOne({ _id, ...ref.fields, createdAt: now, updatedAt: now }, { session });
  return { id: _id, snapshot: snapshotOf(ref.fields) };
}

/** Recomputes every amount on the server; the browser's totals are never trusted. */
function priced(input: DocumentInput) {
  const lines: LineItem[] = input.lines.map((line) => {
    const clean = normaliseLine(line);
    return { ...clean, amount: lineAmount(clean) };
  });
  const tax = {
    enabled: input.tax.enabled,
    label: input.tax.label || "Tax",
    rate: input.tax.enabled ? input.tax.rate : 0,
  };
  return {
    lines,
    discount: input.discount,
    tax,
    ...computeTotals(lines, input.discount, tax),
    notes: input.notes,
    terms: input.terms,
  };
}

/* ---- Quotations ----------------------------------------------------------- */

export async function saveQuotation(id: string | null, raw: unknown): Promise<Result> {
  await requireOwner();
  const parsed = documentSchema.safeParse(raw);
  if (!parsed.success) return { ok: false, error: firstError(parsed.error) };
  const input = parsed.data;

  return attempt(async () => {
    const savedId = await inTransaction(async (db, session) => {
      const { quotations } = collections(db);
      const customer = await resolveCustomer(db, session, input.customer);
      const now = new Date();
      const fields = {
        customerId: customer.id,
        customer: customer.snapshot,
        issueDate: input.issueDate,
        validUntil: input.endDate,
        ...priced(input),
        updatedAt: now,
      };

      if (id) {
        const _id = requireId(id, "Quotation");
        const existing = await quotations.findOne({ _id }, { session });
        if (!existing) throw new UserError("Quotation not found.");
        if (existing.status === "converted") {
          throw new UserError("This quotation was converted to an invoice and is locked.");
        }
        await quotations.updateOne({ _id }, { $set: fields }, { session });
        return _id;
      }

      const settings = await getSettings(db, session);
      const number = await nextNumber(db, session, "quotation", yearOf(input.issueDate), settings);
      const _id = new ObjectId();
      await quotations.insertOne(
        { _id, number, status: "draft", invoiceId: null, invoiceNumber: null, createdAt: now, ...fields },
        { session },
      );
      return _id;
    });
    refresh();
    return ok(savedId);
  });
}

export async function setQuotationStatus(id: string, status: string): Promise<Result> {
  await requireOwner();
  const parsed = quotationStatusSchema.safeParse(status);
  if (!parsed.success) return { ok: false, error: "Unknown status." };
  return attempt(async () => {
    const _id = requireId(id, "Quotation");
    const { matchedCount } = await collections(await getDb()).quotations.updateOne(
      { _id, status: { $ne: "converted" } },
      { $set: { status: parsed.data, updatedAt: new Date() } },
    );
    if (!matchedCount) throw new UserError("Converted quotations are locked.");
    refresh();
    return ok(_id);
  });
}

export async function deleteQuotation(id: string): Promise<Result> {
  await requireOwner();
  return attempt(async () => {
    const _id = requireId(id, "Quotation");
    await inTransaction(async (db, session) => {
      const { quotations } = collections(db);
      const q = await quotations.findOne({ _id }, { session });
      if (!q) throw new UserError("Quotation not found.");
      if (q.status === "converted") {
        throw new UserError(`This quotation became invoice ${q.invoiceNumber}. Delete that invoice first.`);
      }
      await quotations.deleteOne({ _id }, { session });
      await releaseNumber(db, session, "quotation", q.number);
    });
    refresh();
    return ok(_id);
  });
}

export async function duplicateQuotation(id: string): Promise<Result> {
  await requireOwner();
  return attempt(async () => {
    const sourceId = requireId(id, "Quotation");
    const newId = await inTransaction(async (db, session) => {
      const { quotations } = collections(db);
      const source = await quotations.findOne({ _id: sourceId }, { session });
      if (!source) throw new UserError("Quotation not found.");
      const settings = await getSettings(db, session);
      const today = todayPk();
      const now = new Date();
      const _id = new ObjectId();
      await quotations.insertOne(
        {
          ...source,
          _id,
          number: await nextNumber(db, session, "quotation", yearOf(today), settings),
          issueDate: today,
          validUntil: addDays(today, settings.validityDays),
          status: "draft",
          invoiceId: null,
          invoiceNumber: null,
          createdAt: now,
          updatedAt: now,
        },
        { session },
      );
      return _id;
    });
    refresh();
    return ok(newId);
  });
}

/**
 * Quotation → invoice in one transaction: number the invoice, copy the
 * customer, lines, discount, tax and notes, then lock and link the quotation.
 * Converting again returns the invoice that already exists.
 */
export async function convertQuotation(id: string): Promise<Result> {
  await requireOwner();
  return attempt(async () => {
    const quotationId = requireId(id, "Quotation");
    const invoiceId = await inTransaction(async (db, session) => {
      const { quotations, invoices } = collections(db);
      const q = await quotations.findOne({ _id: quotationId }, { session });
      if (!q) throw new UserError("Quotation not found.");
      if (q.invoiceId) return q.invoiceId;

      const settings = await getSettings(db, session);
      const today = todayPk();
      const now = new Date();
      const number = await nextNumber(db, session, "invoice", yearOf(today), settings);
      const _id = new ObjectId();
      await invoices.insertOne(
        {
          _id,
          number,
          customerId: q.customerId,
          customer: q.customer,
          issueDate: today,
          dueDate: addDays(today, settings.dueDays),
          lines: q.lines,
          discount: q.discount,
          tax: q.tax,
          subtotal: q.subtotal,
          discountAmount: q.discountAmount,
          taxAmount: q.taxAmount,
          total: q.total,
          notes: q.notes,
          terms: settings.invoiceTerms,
          status: "draft",
          quotationId: q._id,
          quotationNumber: q.number,
          payments: [],
          amountPaid: 0,
          createdAt: now,
          updatedAt: now,
        },
        { session },
      );
      const { matchedCount } = await quotations.updateOne(
        { _id: q._id, invoiceId: null },
        { $set: { status: "converted", invoiceId: _id, invoiceNumber: number, updatedAt: now } },
        { session },
      );
      if (!matchedCount) throw new UserError("This quotation was converted a moment ago — refresh.");
      return _id;
    });
    refresh();
    return ok(invoiceId);
  });
}

/* ---- Invoices ------------------------------------------------------------- */

export async function saveInvoice(id: string | null, raw: unknown): Promise<Result> {
  await requireOwner();
  const parsed = documentSchema.safeParse(raw);
  if (!parsed.success) return { ok: false, error: firstError(parsed.error) };
  const input = parsed.data;

  return attempt(async () => {
    const savedId = await inTransaction(async (db, session) => {
      const { invoices } = collections(db);
      const customer = await resolveCustomer(db, session, input.customer);
      const now = new Date();
      const fields = {
        customerId: customer.id,
        customer: customer.snapshot,
        issueDate: input.issueDate,
        dueDate: input.endDate,
        ...priced(input),
        updatedAt: now,
      };

      if (id) {
        const _id = requireId(id, "Invoice");
        const existing = await invoices.findOne({ _id }, { session });
        if (!existing) throw new UserError("Invoice not found.");
        if (existing.status === "cancelled") throw new UserError("Cancelled invoices can't be edited.");
        if (fields.total < existing.amountPaid) {
          throw new UserError("The total can't be less than the payments already recorded.");
        }
        await invoices.updateOne({ _id }, { $set: fields }, { session });
        return _id;
      }

      const settings = await getSettings(db, session);
      const number = await nextNumber(db, session, "invoice", yearOf(input.issueDate), settings);
      const _id = new ObjectId();
      await invoices.insertOne(
        {
          _id,
          number,
          status: "draft",
          quotationId: null,
          quotationNumber: null,
          payments: [],
          amountPaid: 0,
          createdAt: now,
          ...fields,
        },
        { session },
      );
      return _id;
    });
    refresh();
    return ok(savedId);
  });
}

export async function issueInvoice(id: string): Promise<Result> {
  await requireOwner();
  return attempt(async () => {
    const _id = requireId(id, "Invoice");
    const { matchedCount } = await collections(await getDb()).invoices.updateOne(
      { _id, status: "draft" },
      { $set: { status: "issued", updatedAt: new Date() } },
    );
    if (!matchedCount) throw new UserError("Only a draft invoice can be issued.");
    refresh();
    return ok(_id);
  });
}

/** Cancelling keeps the invoice and its number on record; deleting removes both. */
export async function cancelInvoice(id: string): Promise<Result> {
  await requireOwner();
  return attempt(async () => {
    const _id = requireId(id, "Invoice");
    const { matchedCount } = await collections(await getDb()).invoices.updateOne(
      { _id, status: { $ne: "cancelled" } },
      { $set: { status: "cancelled", updatedAt: new Date() } },
    );
    if (!matchedCount) throw new UserError("This invoice is already cancelled.");
    refresh();
    return ok(_id);
  });
}

/**
 * Deletes an invoice and its payments for good. The quotation it came from is
 * unlocked (back to Accepted), and the number is reused if it was the latest.
 */
export async function deleteInvoice(id: string): Promise<Result> {
  await requireOwner();
  return attempt(async () => {
    const _id = requireId(id, "Invoice");
    await inTransaction(async (db, session) => {
      const { invoices, quotations } = collections(db);
      const invoice = await invoices.findOne({ _id }, { session });
      if (!invoice) throw new UserError("Invoice not found.");
      await invoices.deleteOne({ _id }, { session });
      if (invoice.quotationId) {
        await quotations.updateOne(
          { _id: invoice.quotationId, invoiceId: _id },
          { $set: { status: "accepted", invoiceId: null, invoiceNumber: null, updatedAt: new Date() } },
          { session },
        );
      }
      await releaseNumber(db, session, "invoice", invoice.number);
    });
    refresh();
    return ok(_id);
  });
}

export async function addPayment(invoiceId: string, raw: unknown): Promise<Result> {
  await requireOwner();
  const parsed = paymentSchema.safeParse(raw);
  if (!parsed.success) return { ok: false, error: firstError(parsed.error) };
  return attempt(async () => {
    const _id = requireId(invoiceId, "Invoice");
    const { invoices } = collections(await getDb());
    const invoice = await invoices.findOne({ _id });
    if (!invoice) throw new UserError("Invoice not found.");
    if (invoice.status !== "issued") throw new UserError("Issue the invoice before recording payments.");
    const balance = invoice.total - invoice.amountPaid;
    if (parsed.data.amount > balance) {
      throw new UserError(`That is more than the balance due (Rs ${balance.toLocaleString("en-US")}).`);
    }
    const { matchedCount } = await invoices.updateOne(
      { _id, amountPaid: invoice.amountPaid },
      {
        $push: { payments: { id: randomUUID(), ...parsed.data } },
        $inc: { amountPaid: parsed.data.amount },
        $set: { updatedAt: new Date() },
      },
    );
    if (!matchedCount) throw new UserError("The invoice changed while saving — refresh and try again.");
    refresh();
    return ok(_id);
  });
}

export async function deletePayment(invoiceId: string, paymentId: string): Promise<Result> {
  await requireOwner();
  return attempt(async () => {
    const _id = requireId(invoiceId, "Invoice");
    const { invoices } = collections(await getDb());
    const invoice = await invoices.findOne({ _id });
    const payment = invoice?.payments.find((p) => p.id === paymentId);
    if (!invoice || !payment) throw new UserError("Payment not found.");
    await invoices.updateOne(
      { _id, "payments.id": paymentId },
      {
        $pull: { payments: { id: paymentId } },
        $inc: { amountPaid: -payment.amount },
        $set: { updatedAt: new Date() },
      },
    );
    refresh();
    return ok(_id);
  });
}

/* ---- PDF ------------------------------------------------------------------ */

export async function getPdfPayload(
  kind: DocKind,
  id: string,
): Promise<ActionResult<{ payload: PdfPayload }>> {
  await requireOwner();
  return attempt<{ payload: PdfPayload }>(async () => {
    const _id = requireId(id, kind === "quotation" ? "Quotation" : "Invoice");
    const db = await getDb();
    const c = collections(db);
    const settings = settingsView(await getSettings(db));
    if (kind === "quotation") {
      const doc = await c.quotations.findOne({ _id });
      if (!doc) throw new UserError("Quotation not found.");
      return { ok: true, payload: { kind, doc: quotationView(doc), settings } };
    }
    const doc = await c.invoices.findOne({ _id });
    if (!doc) throw new UserError("Invoice not found.");
    return { ok: true, payload: { kind, doc: invoiceView(doc), settings } };
  });
}

/* ---- Customers ------------------------------------------------------------ */

export async function saveCustomer(id: string | null, raw: unknown): Promise<Result> {
  await requireOwner();
  const parsed = customerFieldsSchema.safeParse(raw);
  if (!parsed.success) return { ok: false, error: firstError(parsed.error) };
  return attempt(async () => {
    const { customers } = collections(await getDb());
    const now = new Date();
    if (id) {
      const _id = requireId(id, "Customer");
      const { matchedCount } = await customers.updateOne(
        { _id },
        { $set: { ...parsed.data, updatedAt: now } },
      );
      if (!matchedCount) throw new UserError("Customer not found.");
      refresh();
      return ok(_id);
    }
    const _id = new ObjectId();
    await customers.insertOne({ _id, ...parsed.data, createdAt: now, updatedAt: now });
    refresh();
    return ok(_id);
  });
}

/** Only a customer with no quotations or invoices can go: those documents link to the record. */
export async function deleteCustomer(id: string): Promise<Result> {
  await requireOwner();
  return attempt(async () => {
    const _id = requireId(id, "Customer");
    const { customers, quotations, invoices } = collections(await getDb());
    const [q, i] = await Promise.all([
      quotations.countDocuments({ customerId: _id }),
      invoices.countDocuments({ customerId: _id }),
    ]);
    if (q || i) {
      const held = [q && `${q} quotation${q === 1 ? "" : "s"}`, i && `${i} invoice${i === 1 ? "" : "s"}`];
      throw new UserError(`This customer has ${held.filter(Boolean).join(" and ")}. Delete those first.`);
    }
    await customers.deleteOne({ _id });
    refresh();
    return ok(_id);
  });
}

export async function searchCustomers(q: string): Promise<CustomerView[]> {
  await requireOwner();
  const term = q.trim().slice(0, 60);
  if (!term) return [];
  const rx = new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
  const docs = await collections(await getDb())
    .customers.find({ $or: [{ name: rx }, { phone: rx }, { company: rx }] })
    .sort({ name: 1 })
    .limit(8)
    .toArray();
  return docs.map(customerView);
}

/* ---- Saved items ---------------------------------------------------------- */

export async function saveItem(id: string | null, raw: unknown): Promise<Result> {
  await requireOwner();
  const parsed = savedItemSchema.safeParse(raw);
  if (!parsed.success) return { ok: false, error: firstError(parsed.error) };
  return attempt(async () => {
    const { items } = collections(await getDb());
    const now = new Date();
    if (id) {
      const _id = requireId(id, "Item");
      await items.updateOne({ _id }, { $set: { ...parsed.data, updatedAt: now } });
      refresh();
      return ok(_id);
    }
    const _id = new ObjectId();
    await items.insertOne({ _id, ...parsed.data, createdAt: now, updatedAt: now });
    refresh();
    return ok(_id);
  });
}

export async function deleteItem(id: string): Promise<Result> {
  await requireOwner();
  return attempt(async () => {
    const _id = requireId(id, "Item");
    await collections(await getDb()).items.deleteOne({ _id });
    refresh();
    return ok(_id);
  });
}

/* ---- Settings ------------------------------------------------------------- */

export async function saveSettings(raw: unknown): Promise<Result> {
  await requireOwner();
  const parsed = settingsSchema.safeParse(raw);
  if (!parsed.success) return { ok: false, error: firstError(parsed.error) };
  const { nextQuoteNumber, nextInvoiceNumber, ...fields } = parsed.data;
  return attempt(async () => {
    const db = await getDb();
    await collections(db).settings.updateOne(
      { _id: "business" },
      { $set: { ...fields, updatedAt: new Date() } },
      { upsert: true },
    );
    const year = yearOf(todayPk());
    await raiseNextNumber(db, "quotation", year, nextQuoteNumber);
    await raiseNextNumber(db, "invoice", year, nextInvoiceNumber);
    refresh();
    return ok("business");
  });
}

export async function removeBrandImage(kind: "logo" | "stamp"): Promise<Result> {
  await requireOwner();
  if (kind !== "logo" && kind !== "stamp") return { ok: false, error: "Unknown image." };
  return attempt(async () => {
    await collections(await getDb()).settings.updateOne(
      { _id: "business" },
      { $set: { [kind]: null, updatedAt: new Date() } },
      { upsert: true },
    );
    refresh();
    return ok("business");
  });
}
