import "server-only";
import { MongoClient, type ClientSession, type Db } from "mongodb";
import { dbName, env } from "./env";
import type {
  CounterDoc,
  CustomerDoc,
  InvoiceDoc,
  QuotationDoc,
  SavedItemDoc,
  SettingsDoc,
} from "./types";

/* One MongoClient per server process. Kept on globalThis so dev-mode hot
 * reloads reuse the connection pool instead of opening a new one per edit. */
const cache = globalThis as unknown as { __billingMongo?: Promise<MongoClient> };

async function connect(): Promise<MongoClient> {
  const client = new MongoClient(env("MONGODB_URI"), { maxPoolSize: 10 });
  await client.connect();
  await ensureIndexes(client.db(dbName()));
  return client;
}

export function getClient(): Promise<MongoClient> {
  cache.__billingMongo ??= connect().catch((error) => {
    cache.__billingMongo = undefined; // let the next request retry
    throw error;
  });
  return cache.__billingMongo;
}

export async function getDb(): Promise<Db> {
  return (await getClient()).db(dbName());
}

export const collections = (db: Db) => ({
  quotations: db.collection<QuotationDoc>("quotations"),
  invoices: db.collection<InvoiceDoc>("invoices"),
  customers: db.collection<CustomerDoc>("customers"),
  items: db.collection<SavedItemDoc>("items"),
  settings: db.collection<SettingsDoc>("settings"),
  counters: db.collection<CounterDoc>("counters"),
});

/** Thrown for problems the owner can fix; its message is shown as-is. */
export class UserError extends Error {}

/**
 * Runs `work` in a multi-document transaction. Numbering, inserts and the
 * quotation → invoice link commit together or not at all, which is what keeps
 * the invoice series free of gaps and duplicates.
 */
export async function inTransaction<T>(
  work: (db: Db, session: ClientSession) => Promise<T>,
): Promise<T> {
  const client = await getClient();
  const db = client.db(dbName());
  const session = client.startSession();
  try {
    let result: T | undefined;
    await session.withTransaction(async () => {
      result = await work(db, session);
    });
    return result as T;
  } finally {
    await session.endSession();
  }
}

async function ensureIndexes(db: Db): Promise<void> {
  const c = collections(db);
  await Promise.all([
    c.quotations.createIndex({ number: 1 }, { unique: true }),
    c.quotations.createIndex({ createdAt: -1 }),
    c.quotations.createIndex({ customerId: 1 }),
    c.invoices.createIndex({ number: 1 }, { unique: true }),
    c.invoices.createIndex({ createdAt: -1 }),
    c.invoices.createIndex({ customerId: 1 }),
    // Backstop for "a quotation converts once": a second invoice pointing at
    // the same quotation cannot be inserted.
    c.invoices.createIndex(
      { quotationId: 1 },
      { unique: true, partialFilterExpression: { quotationId: { $type: "objectId" } } },
    ),
    c.customers.createIndex({ name: 1 }),
    c.customers.createIndex({ phone: 1 }),
    c.items.createIndex({ name: 1 }),
  ]);
}
