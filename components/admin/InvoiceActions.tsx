"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Ban, Pencil, Send, Trash2 } from "lucide-react";
import { addPayment, cancelInvoice, deleteInvoice, deletePayment, issueInvoice } from "@/lib/billing/actions";
import { formatRs } from "@/lib/billing/calc";
import { formatDate } from "@/lib/billing/dates";
import type { ActionResult, InvoiceView, PaymentMethod } from "@/lib/billing/types";
import { buttonClass, Card, CardTitle, ErrorNote, Field, inputClass } from "./ui";
import { toast } from "./Toaster";

const METHOD_LABEL: Record<PaymentMethod, string> = {
  cash: "Cash",
  bank: "Bank transfer",
  cheque: "Cheque",
  wallet: "JazzCash / Easypaisa",
};

function useRunner() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");
  /** `success` is the toast once it went through; `leaveTo` is for actions that remove the page's own record. */
  const run = (
    action: () => Promise<ActionResult>,
    success: string,
    { onDone, leaveTo }: { onDone?: () => void; leaveTo?: string } = {},
  ) => {
    setError("");
    startTransition(async () => {
      const result = await action();
      if (!result.ok) return setError(result.error);
      toast.success(success);
      if (leaveTo) router.push(leaveTo);
      else {
        onDone?.();
        router.refresh();
      }
    });
  };
  return { pending, error, run };
}

export function InvoiceActions({ invoice }: { invoice: InvoiceView }) {
  const { pending, error, run } = useRunner();

  const deleteButton = (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        const also = [
          invoice.payments.length ? `Its recorded payments go with it.` : "",
          invoice.quotationNumber ? `Quotation ${invoice.quotationNumber} is unlocked again.` : "",
        ];
        const message = [`Delete ${invoice.number} permanently?`, ...also, "This can't be undone."];
        if (!confirm(message.filter(Boolean).join(" "))) return;
        run(() => deleteInvoice(invoice.id), `${invoice.number} deleted`, { leaveTo: "/admin/invoices" });
      }}
      className={buttonClass("danger") + " w-full"}
    >
      <Trash2 size={16} aria-hidden />
      Delete invoice
    </button>
  );

  if (invoice.status === "cancelled") {
    return (
      <Card className="space-y-4">
        <p className="text-sm text-ink-muted">
          This invoice is cancelled. It keeps its number so the series has no gaps.
        </p>
        {error ? <ErrorNote>{error}</ErrorNote> : null}
        <div className="border-t border-border pt-4">{deleteButton}</div>
      </Card>
    );
  }

  // Full-width rows: the next step, Edit, then the destructive actions set
  // apart below a rule.
  return (
    <Card className="space-y-4">
      <div className="grid gap-2">
        {invoice.status === "draft" && (
          <button
            type="button"
            disabled={pending}
            onClick={() => run(() => issueInvoice(invoice.id), `${invoice.number} issued`)}
            className={buttonClass("primary")}
          >
            <Send size={16} aria-hidden />
            Issue invoice
          </button>
        )}
        <Link href={`/admin/invoices/${invoice.id}/edit`} className={buttonClass("secondary")}>
          <Pencil size={16} aria-hidden />
          Edit invoice
        </Link>
      </div>
      {invoice.quotationId ? (
        <p className="text-sm text-ink-muted">
          From quotation{" "}
          <Link href={`/admin/quotations/${invoice.quotationId}`} className="font-semibold text-accent underline">
            {invoice.quotationNumber}
          </Link>
        </p>
      ) : null}
      {error ? <ErrorNote>{error}</ErrorNote> : null}
      <div className="grid gap-2 border-t border-border pt-4">
        <button
          type="button"
          disabled={pending}
          onClick={() => {
            if (!confirm(`Cancel ${invoice.number}? It stays in the list as Cancelled.`)) return;
            run(() => cancelInvoice(invoice.id), `${invoice.number} cancelled`);
          }}
          className={buttonClass("secondary")}
        >
          <Ban size={16} aria-hidden />
          Cancel invoice
        </button>
        {deleteButton}
      </div>
    </Card>
  );
}

/** Payments against an issued invoice (I-4); the balance and paid status follow. */
export function PaymentsPanel({ invoice, today }: { invoice: InvoiceView; today: string }) {
  const { pending, error, run } = useRunner();
  const balance = invoice.total - invoice.amountPaid;
  const [form, setForm] = useState({
    date: today,
    amount: String(balance),
    method: "cash" as PaymentMethod,
    reference: "",
  });

  if (invoice.status === "draft") return null;

  return (
    <Card>
      <CardTitle>Payments</CardTitle>
      {invoice.payments.length ? (
        <ul className="mb-3 divide-y divide-border text-sm">
          {invoice.payments.map((p) => (
            <li key={p.id} className="flex items-center justify-between gap-2 py-2">
              <div>
                <p className="font-semibold tabular-nums">{formatRs(p.amount)}</p>
                <p className="text-ink-muted">
                  {formatDate(p.date)} · {METHOD_LABEL[p.method]}
                  {p.reference ? ` · ${p.reference}` : ""}
                </p>
              </div>
              {invoice.status === "issued" && (
                <button
                  type="button"
                  aria-label="Remove payment"
                  disabled={pending}
                  onClick={() => {
                    if (confirm("Remove this payment?")) run(() => deletePayment(invoice.id, p.id), "Payment removed");
                  }}
                  className={buttonClass("ghost", "icon") + " text-red-700"}
                >
                  <Trash2 size={16} aria-hidden />
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mb-3 text-sm text-ink-muted">No payments yet.</p>
      )}

      {invoice.status === "issued" && balance > 0 && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const amount = Math.round(Number(form.amount.replace(/,/g, "")));
            run(() => addPayment(invoice.id, { ...form, amount }), `Payment of ${formatRs(amount)} recorded`, {
              onDone: () => setForm((f) => ({ ...f, amount: "", reference: "" })),
            });
          }}
          className="grid gap-3 border-t border-border pt-3 sm:grid-cols-2"
        >
          <Field label="Amount (Rs)" hint={`Balance due ${formatRs(balance)}`}>
            <input
              inputMode="numeric"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              className={inputClass}
            />
          </Field>
          <Field label="Date">
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className={inputClass}
            />
          </Field>
          <Field label="Method">
            <select
              value={form.method}
              onChange={(e) => setForm({ ...form, method: e.target.value as PaymentMethod })}
              className={inputClass}
            >
              {Object.entries(METHOD_LABEL).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Reference (optional)">
            <input
              value={form.reference}
              onChange={(e) => setForm({ ...form, reference: e.target.value })}
              placeholder="Cheque no., transaction ID"
              className={inputClass}
            />
          </Field>
          <button type="submit" disabled={pending} className={buttonClass("primary") + " sm:col-span-2"}>
            Record payment
          </button>
        </form>
      )}
      {error ? <div className="mt-3"><ErrorNote>{error}</ErrorNote></div> : null}
    </Card>
  );
}
