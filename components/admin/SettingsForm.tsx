"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { saveSettings } from "@/lib/billing/actions";
import type { SettingsView } from "@/lib/billing/types";
import { buttonClass, Card, CardTitle, ErrorNote, Field, inputClass } from "./ui";
import { toast } from "./Toaster";

type Props = {
  settings: SettingsView;
  nextQuoteNumber: number;
  nextInvoiceNumber: number;
  year: number;
};

/** Business profile, PDF defaults, tax and numbering (S-1 to S-5). */
export function SettingsForm({ settings, nextQuoteNumber, nextInvoiceNumber, year }: Props) {
  const router = useRouter();
  const [form, setForm] = useState({
    tradingName: settings.tradingName,
    legalName: settings.legalName,
    address: settings.address,
    phone: settings.phone,
    email: settings.email,
    ntn: settings.ntn,
    bankDetails: settings.bankDetails,
    quoteTerms: settings.quoteTerms,
    invoiceTerms: settings.invoiceTerms,
    validityDays: String(settings.validityDays),
    dueDays: String(settings.dueDays),
    taxEnabled: settings.tax.enabled,
    taxLabel: settings.tax.label,
    taxRate: String(settings.tax.rate),
    quotePrefix: settings.quotePrefix,
    invoicePrefix: settings.invoicePrefix,
    nextQuoteNumber: String(nextQuoteNumber),
    nextInvoiceNumber: String(nextInvoiceNumber),
  });
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  const set = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [field]: e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value });
  const int = (value: string) => Number.parseInt(value, 10) || 0;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    startTransition(async () => {
      const result = await saveSettings({
        tradingName: form.tradingName,
        legalName: form.legalName,
        address: form.address,
        phone: form.phone,
        email: form.email,
        ntn: form.ntn,
        bankDetails: form.bankDetails,
        quoteTerms: form.quoteTerms,
        invoiceTerms: form.invoiceTerms,
        validityDays: int(form.validityDays),
        dueDays: int(form.dueDays),
        tax: { enabled: form.taxEnabled, label: form.taxLabel.trim(), rate: Number(form.taxRate) || 0 },
        quotePrefix: form.quotePrefix.trim().toUpperCase(),
        invoicePrefix: form.invoicePrefix.trim().toUpperCase(),
        nextQuoteNumber: int(form.nextQuoteNumber),
        nextInvoiceNumber: int(form.nextInvoiceNumber),
      });
      if (!result.ok) return setError(result.error);
      toast.success("Settings saved");
      router.refresh();
    });
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <Card>
        <CardTitle>Business details on every PDF</CardTitle>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Trading name">
            <input value={form.tradingName} onChange={set("tradingName")} required className={inputClass} />
          </Field>
          <Field label="Registered name">
            <input value={form.legalName} onChange={set("legalName")} className={inputClass} />
          </Field>
          <Field label="Address" className="sm:col-span-2">
            <input value={form.address} onChange={set("address")} className={inputClass} />
          </Field>
          <Field label="Phone">
            <input value={form.phone} onChange={set("phone")} className={inputClass} />
          </Field>
          <Field label="Email">
            <input value={form.email} onChange={set("email")} type="email" className={inputClass} />
          </Field>
          <Field label="NTN (optional)">
            <input value={form.ntn} onChange={set("ntn")} className={inputClass} />
          </Field>
          <Field label="Bank details (optional)" className="sm:col-span-2" hint="Printed at the end of quotations and invoices.">
            <textarea value={form.bankDetails} onChange={set("bankDetails")} rows={3} className={inputClass} placeholder={"Bank name\nAccount title\nIBAN"} />
          </Field>
        </div>
      </Card>

      <Card>
        <CardTitle>Defaults</CardTitle>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Quotations valid for (days)">
            <input inputMode="numeric" value={form.validityDays} onChange={set("validityDays")} className={inputClass} />
          </Field>
          <Field label="Invoices due after (days)">
            <input inputMode="numeric" value={form.dueDays} onChange={set("dueDays")} className={inputClass} />
          </Field>
          <Field label="Quotation terms and conditions" className="sm:col-span-2">
            <textarea value={form.quoteTerms} onChange={set("quoteTerms")} rows={3} className={inputClass} />
          </Field>
          <Field label="Invoice terms and conditions" className="sm:col-span-2">
            <textarea value={form.invoiceTerms} onChange={set("invoiceTerms")} rows={3} className={inputClass} />
          </Field>
        </div>
      </Card>

      <Card>
        <CardTitle>Tax</CardTitle>
        <label className="mb-3 flex cursor-pointer items-center gap-2 text-sm">
          <input type="checkbox" checked={form.taxEnabled} onChange={set("taxEnabled")} className="h-4 w-4 accent-[rgb(var(--color-accent))]" />
          Add tax to new documents by default
        </label>
        <div className="grid grid-cols-2 gap-3 sm:max-w-sm">
          <Field label="Label">
            <input value={form.taxLabel} onChange={set("taxLabel")} className={inputClass} />
          </Field>
          <Field label="Rate (%)">
            <input inputMode="decimal" value={form.taxRate} onChange={set("taxRate")} className={inputClass} />
          </Field>
        </div>
      </Card>

      <Card>
        <CardTitle>Numbering</CardTitle>
        <p className="mb-3 text-sm text-ink-muted">
          Numbers look like {form.quotePrefix || "QT"}-{year}-0001 and restart each January. To
          continue a paper book, set the next number higher. It can only move forward.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Quotation prefix">
            <input value={form.quotePrefix} onChange={set("quotePrefix")} className={inputClass + " uppercase"} />
          </Field>
          <Field label={`Next quotation number (${year})`}>
            <input inputMode="numeric" value={form.nextQuoteNumber} onChange={set("nextQuoteNumber")} className={inputClass} />
          </Field>
          <Field label="Invoice prefix">
            <input value={form.invoicePrefix} onChange={set("invoicePrefix")} className={inputClass + " uppercase"} />
          </Field>
          <Field label={`Next invoice number (${year})`}>
            <input inputMode="numeric" value={form.nextInvoiceNumber} onChange={set("nextInvoiceNumber")} className={inputClass} />
          </Field>
        </div>
      </Card>

      <div className="sticky bottom-[4.5rem] z-20 flex items-center gap-3 rounded-xl border border-border bg-bg-elevated/95 p-3 shadow-lift backdrop-blur md:bottom-4">
        <button type="submit" disabled={pending} className={buttonClass("primary")}>
          {pending ? "Saving…" : "Save settings"}
        </button>
        {error ? <ErrorNote>{error}</ErrorNote> : null}
      </div>
    </form>
  );
}
