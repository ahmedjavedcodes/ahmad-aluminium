"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { ArrowRightLeft, Copy, Pencil, Trash2 } from "lucide-react";
import {
  convertQuotation,
  deleteQuotation,
  duplicateQuotation,
  setQuotationStatus,
} from "@/lib/billing/actions";
import { STATUS_LABEL } from "@/lib/billing/status";
import type { ActionResult, QuotationView } from "@/lib/billing/types";
import { buttonClass, Card, ErrorNote, Field, inputClass } from "./ui";
import { toast } from "./Toaster";

const MANUAL_STATUSES = ["draft", "sent", "accepted", "rejected"] as const;

export function QuotationActions({ quotation }: { quotation: QuotationView }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const converted = quotation.status === "converted";

  /** `success` is the toast once it went through. */
  function run(action: () => Promise<ActionResult>, success: string, after?: (id: string) => void) {
    setError("");
    startTransition(async () => {
      const result = await action();
      if (!result.ok) return setError(result.error);
      toast.success(success);
      if (after) after(result.id);
      else router.refresh();
    });
  }

  const duplicate = () =>
    run(
      () => duplicateQuotation(quotation.id),
      `Copied ${quotation.number} to a new draft`,
      (id) => router.push(`/admin/quotations/${id}/edit`),
    );

  if (converted) {
    return (
      <Card>
        <p className="text-sm text-ink-muted">
          Converted to{" "}
          {quotation.invoiceId ? (
            <Link href={`/admin/invoices/${quotation.invoiceId}`} className="font-semibold text-accent underline">
              {quotation.invoiceNumber}
            </Link>
          ) : (
            "an invoice"
          )}
          . This quotation is locked; to delete it, delete that invoice first.
        </p>
        <button
          type="button"
          disabled={pending}
          onClick={() => duplicate()}
          className={buttonClass("secondary") + " mt-3 w-full"}
        >
          <Copy size={16} aria-hidden />
          Duplicate as new quotation
        </button>
        {error ? <div className="mt-3"><ErrorNote>{error}</ErrorNote></div> : null}
      </Card>
    );
  }

  return (
    <Card className="space-y-4">
      <button
        type="button"
        disabled={pending}
        onClick={() => {
          if (!confirm(`Create an invoice from ${quotation.number}?`)) return;
          run(
            () => convertQuotation(quotation.id),
            `Invoice created from ${quotation.number}`,
            (id) => router.push(`/admin/invoices/${id}`),
          );
        }}
        className={buttonClass("primary") + " w-full"}
      >
        <ArrowRightLeft size={16} aria-hidden />
        Convert to invoice
      </button>

      <Field label="Status">
        <select
          value={quotation.status}
          disabled={pending}
          onChange={(e) => {
            const status = e.target.value as (typeof MANUAL_STATUSES)[number];
            run(() => setQuotationStatus(quotation.id, status), `Marked as ${STATUS_LABEL[status]}`);
          }}
          className={inputClass}
        >
          {MANUAL_STATUSES.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABEL[s]}
            </option>
          ))}
        </select>
      </Field>

      <div className="grid grid-cols-2 gap-2">
        <Link href={`/admin/quotations/${quotation.id}/edit`} className={buttonClass("secondary")}>
          <Pencil size={16} aria-hidden />
          Edit
        </Link>
        <button
          type="button"
          disabled={pending}
          onClick={() => duplicate()}
          className={buttonClass("secondary")}
        >
          <Copy size={16} aria-hidden />
          Duplicate
        </button>
      </div>
      {error ? <ErrorNote>{error}</ErrorNote> : null}

      <div className="border-t border-border pt-4">
        <button
          type="button"
          disabled={pending}
          onClick={() => {
            if (!confirm(`Delete ${quotation.number}? This can't be undone.`)) return;
            run(() => deleteQuotation(quotation.id), `${quotation.number} deleted`, () => router.push("/admin/quotations"));
          }}
          className={buttonClass("danger") + " w-full"}
        >
          <Trash2 size={16} aria-hidden />
          Delete quotation
        </button>
      </div>
    </Card>
  );
}
