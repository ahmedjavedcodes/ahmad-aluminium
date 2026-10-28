import "server-only";
import { ObjectId, type Filter } from "mongodb";
import { collections, getDb } from "./db";
import { monthStart, todayPk, yearOf } from "./dates";
import { getSettings, peekNextNumber, settingsView } from "./settings";
import type {
  CustomerDoc,
  CustomerView,
  InvoiceDoc,
  InvoiceView,
  QuotationDoc,
  QuotationView,
  SavedItemDoc,
  SavedItemView,
} from "./types";

/* Read side of the billing area: queries plus the mappers that turn stored
 * documents into plain, serialisable views. */

export const PAGE_SIZE = 50;

const iso = (date: Date) => date.toISOString();

export function quotationView(doc: QuotationDoc): QuotationView {
  const { _id, customerId, invoiceId, createdAt, updatedAt, ...rest } = doc;
  return {
    ...rest,
    id: _id.toHexString(),
    customerId: customerId.toHexString(),
    invoiceId: invoiceId?.toHexString() ?? null,
    createdAt: iso(createdAt),
    updatedAt: iso(updatedAt),
  };
}

export function invoiceView(doc: InvoiceDoc): InvoiceView {
  const { _id, customerId, quotationId, createdAt, updatedAt, ...rest } = doc;
  return {
    ...rest,
    id: _id.toHexString(),
    customerId: customerId.toHexString(),
    quotationId: quotationId?.toHexString() ?? null,
    createdAt: iso(createdAt),
    updatedAt: iso(updatedAt),
  };
}

export function customerView(doc: CustomerDoc): CustomerView {
  const { _id, createdAt, updatedAt, ...rest } = doc;
  return { ...rest, id: _id.toHexString(), createdAt: iso(createdAt), updatedAt: iso(updatedAt) };
}

export function savedItemView(doc: SavedItemDoc): SavedItemView {
  const { _id, createdAt, updatedAt, ...rest } = doc;
  return { ...rest, id: _id.toHexString(), createdAt: iso(createdAt), updatedAt: iso(updatedAt) };
}

export function toObjectId(id: string): ObjectId | null {
  return ObjectId.isValid(id) && /^[a-f0-9]{24}$/i.test(id) ? new ObjectId(id) : null;
}

const escapeRegex = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function documentSearch(q: string) {
  if (!q) return {};
  const rx = new RegExp(escapeRegex(q), "i");
  return {
    $or: [{ number: rx }, { "customer.name": rx }, { "customer.phone": rx }, { "customer.company": rx }],
  };
}

const unpaid = { $expr: { $lt: ["$amountPaid", "$total"] } };

export async function listQuotations(opts: { q: string; status: string; page: number }) {
  const today = todayPk();
  const filter: Filter<QuotationDoc> = { ...documentSearch(opts.q) };
  if (opts.status === "expired") {
    Object.assign(filter, { status: { $in: ["draft", "sent"] }, validUntil: { $lt: today } });
  } else if (opts.status === "draft" || opts.status === "sent") {
    Object.assign(filter, { status: opts.status, validUntil: { $gte: today } });
  } else if (opts.status) {
    Object.assign(filter, { status: opts.status });
  }
  const docs = await collections(await getDb())
    .quotations.find(filter)
    .sort({ createdAt: -1 })
    .skip((opts.page - 1) * PAGE_SIZE)
    .limit(PAGE_SIZE + 1)
    .toArray();
  return { items: docs.slice(0, PAGE_SIZE).map(quotationView), hasMore: docs.length > PAGE_SIZE };
}

export async function listInvoices(opts: { q: string; status: string; page: number }) {
  const today = todayPk();
  const filter: Filter<InvoiceDoc> = { ...documentSearch(opts.q) };
  switch (opts.status) {
    case "draft":
    case "cancelled":
      Object.assign(filter, { status: opts.status });
      break;
    case "issued":
      Object.assign(filter, { status: "issued", amountPaid: 0, dueDate: { $gte: today }, ...unpaid });
      break;
    case "partial":
      Object.assign(filter, { status: "issued", amountPaid: { $gt: 0 }, dueDate: { $gte: today }, ...unpaid });
      break;
    case "overdue":
      Object.assign(filter, { status: "issued", dueDate: { $lt: today }, ...unpaid });
      break;
    case "paid":
      Object.assign(filter, { status: "issued", $expr: { $gte: ["$amountPaid", "$total"] } });
      break;
  }
  const docs = await collections(await getDb())
    .invoices.find(filter)
    .sort({ createdAt: -1 })
    .skip((opts.page - 1) * PAGE_SIZE)
    .limit(PAGE_SIZE + 1)
    .toArray();
  return { items: docs.slice(0, PAGE_SIZE).map(invoiceView), hasMore: docs.length > PAGE_SIZE };
}

export async function getQuotation(id: string): Promise<QuotationView | null> {
  const _id = toObjectId(id);
  if (!_id) return null;
  const doc = await collections(await getDb()).quotations.findOne({ _id });
  return doc ? quotationView(doc) : null;
}

export async function getInvoice(id: string): Promise<InvoiceView | null> {
  const _id = toObjectId(id);
  if (!_id) return null;
  const doc = await collections(await getDb()).invoices.findOne({ _id });
  return doc ? invoiceView(doc) : null;
}

export async function listCustomers(q: string): Promise<CustomerView[]> {
  const rx = q ? new RegExp(escapeRegex(q), "i") : null;
  const filter = rx ? { $or: [{ name: rx }, { phone: rx }, { company: rx }] } : {};
  const docs = await collections(await getDb())
    .customers.find(filter)
    .sort({ name: 1 })
    .limit(300)
    .toArray();
  return docs.map(customerView);
}

export async function getCustomer(id: string): Promise<CustomerView | null> {
  const _id = toObjectId(id);
  if (!_id) return null;
  const doc = await collections(await getDb()).customers.findOne({ _id });
  return doc ? customerView(doc) : null;
}

export async function customerDocuments(id: string) {
  const customerId = toObjectId(id);
  if (!customerId) return { quotations: [], invoices: [] };
  const c = collections(await getDb());
  const [quotations, invoices] = await Promise.all([
    c.quotations.find({ customerId }).sort({ createdAt: -1 }).limit(200).toArray(),
    c.invoices.find({ customerId }).sort({ createdAt: -1 }).limit(200).toArray(),
  ]);
  return { quotations: quotations.map(quotationView), invoices: invoices.map(invoiceView) };
}

export async function listItems(): Promise<SavedItemView[]> {
  const docs = await collections(await getDb()).items.find().sort({ name: 1 }).limit(1000).toArray();
  return docs.map(savedItemView);
}

export async function loadSettings() {
  const db = await getDb();
  const settings = await getSettings(db);
  const year = yearOf(todayPk());
  const [nextQuoteNumber, nextInvoiceNumber] = await Promise.all([
    peekNextNumber(db, "quotation", year),
    peekNextNumber(db, "invoice", year),
  ]);
  return { settings: settingsView(settings), nextQuoteNumber, nextInvoiceNumber, year };
}

export async function dashboardData() {
  const c = collections(await getDb());
  const today = todayPk();
  const range = { $gte: monthStart(today), $lte: today };
  const sum = async (cursor: Promise<{ total?: number }[]>) => (await cursor)[0]?.total ?? 0;

  const [quoted, invoiced, received, outstanding, unpaidInvoices, recentQuotes] = await Promise.all([
    sum(c.quotations.aggregate<{ total: number }>([
      { $match: { issueDate: range } },
      { $group: { _id: null, total: { $sum: "$total" } } },
    ]).toArray()),
    sum(c.invoices.aggregate<{ total: number }>([
      { $match: { status: "issued", issueDate: range } },
      { $group: { _id: null, total: { $sum: "$total" } } },
    ]).toArray()),
    sum(c.invoices.aggregate<{ total: number }>([
      { $match: { status: "issued" } },
      { $unwind: "$payments" },
      { $match: { "payments.date": range } },
      { $group: { _id: null, total: { $sum: "$payments.amount" } } },
    ]).toArray()),
    sum(c.invoices.aggregate<{ total: number }>([
      { $match: { status: "issued", ...unpaid } },
      { $group: { _id: null, total: { $sum: { $subtract: ["$total", "$amountPaid"] } } } },
    ]).toArray()),
    c.invoices.find({ status: "issued", ...unpaid }).sort({ dueDate: 1 }).limit(20).toArray(),
    c.quotations.find().sort({ createdAt: -1 }).limit(5).toArray(),
  ]);

  return {
    today,
    month: { quoted, invoiced, received },
    outstanding,
    unpaid: unpaidInvoices.map(invoiceView),
    recentQuotes: recentQuotes.map(quotationView),
  };
}
