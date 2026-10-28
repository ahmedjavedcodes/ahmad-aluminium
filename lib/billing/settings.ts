import "server-only";
import type { ClientSession, Db } from "mongodb";
import { site } from "@/data/site";
import { collections } from "./db";
import type { DocKind, SettingsDoc, SettingsView } from "./types";

/** First-run values, taken from the website's own business details. */
export function defaultSettings(): SettingsDoc {
  return {
    _id: "business",
    tradingName: site.name,
    legalName: site.legalName,
    address: `${site.address.street}, ${site.address.city}`,
    phone: site.phoneLocal,
    email: site.email,
    ntn: "",
    logo: null,
    stamp: null,
    bankDetails: "",
    quoteTerms: "This quotation is valid until the date shown above.",
    invoiceTerms: "Please pay the balance due by the due date shown above.",
    validityDays: 15,
    dueDays: 7,
    tax: { enabled: false, label: "GST", rate: 0 },
    quotePrefix: "QT",
    invoicePrefix: "INV",
    updatedAt: null,
  };
}

export async function getSettings(db: Db, session?: ClientSession): Promise<SettingsDoc> {
  const saved = await collections(db).settings.findOne({ _id: "business" }, { session });
  return { ...defaultSettings(), ...saved };
}

export function settingsView(settings: SettingsDoc): SettingsView {
  const { _id, updatedAt, ...view } = settings;
  void _id;
  void updatedAt;
  return view;
}

const counterId = (kind: DocKind, year: number) => `${kind}-${year}`;

/** QT-2026-0001. Runs inside the caller's transaction, so a failed save never burns a number. */
export async function nextNumber(
  db: Db,
  session: ClientSession,
  kind: DocKind,
  year: number,
  settings: SettingsDoc,
): Promise<string> {
  const counter = await collections(db).counters.findOneAndUpdate(
    { _id: counterId(kind, year) },
    { $inc: { seq: 1 } },
    { upsert: true, returnDocument: "after", session },
  );
  const prefix = kind === "quotation" ? settings.quotePrefix : settings.invoicePrefix;
  return `${prefix}-${year}-${String(counter?.seq ?? 1).padStart(4, "0")}`;
}

/**
 * Gives a deleted document's number back to its series when it was the latest
 * one, so the next document reuses it and the series has no gap. An older
 * number stays used: winding the counter back past it would repeat numbers.
 */
export async function releaseNumber(db: Db, session: ClientSession, kind: DocKind, number: string) {
  const match = /-(\d{4})-(\d+)$/.exec(number);
  if (!match) return;
  await collections(db).counters.updateOne(
    { _id: counterId(kind, Number(match[1])), seq: Number(match[2]) },
    { $inc: { seq: -1 } },
    { session },
  );
}

export async function peekNextNumber(db: Db, kind: DocKind, year: number): Promise<number> {
  const counter = await collections(db).counters.findOne({ _id: counterId(kind, year) });
  return (counter?.seq ?? 0) + 1;
}

/** Moves a series forward (to continue a paper book); never backwards, which could duplicate numbers. */
export async function raiseNextNumber(db: Db, kind: DocKind, year: number, next: number) {
  await collections(db).counters.updateOne(
    { _id: counterId(kind, year) },
    { $max: { seq: next - 1 } },
    { upsert: true },
  );
}
