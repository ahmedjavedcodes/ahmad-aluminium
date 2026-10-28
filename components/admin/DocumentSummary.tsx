import { amountInWords, formatQty, formatRate, formatRs, measureText, UNIT_LABEL } from "@/lib/billing/calc";
import { formatDate } from "@/lib/billing/dates";
import type { InvoiceView, QuotationView } from "@/lib/billing/types";
import { Card, CardTitle } from "./ui";

/** Read-only body of a quotation or invoice: customer, dates, lines, totals, notes. */
export function DocumentSummary({ doc }: { doc: QuotationView | InvoiceView }) {
  const isInvoice = "dueDate" in doc;
  return (
    <div className="space-y-4">
      <Card>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="text-sm">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-ink-subtle">Bill to</p>
            <p className="font-semibold text-ink">{doc.customer.name}</p>
            {[doc.customer.company, doc.customer.phone, doc.customer.address, doc.customer.email]
              .filter(Boolean)
              .map((value) => (
                <p key={value} className="text-ink-muted">
                  {value}
                </p>
              ))}
          </div>
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm sm:justify-self-end">
            <dt className="text-ink-muted">Date</dt>
            <dd>{formatDate(doc.issueDate)}</dd>
            <dt className="text-ink-muted">{isInvoice ? "Due date" : "Valid until"}</dt>
            <dd>{formatDate(isInvoice ? doc.dueDate : doc.validUntil)}</dd>
          </dl>
        </div>
      </Card>

      <Card>
        <CardTitle>Items</CardTitle>
        <ol className="divide-y divide-border text-sm">
          {doc.lines.map((line, i) => (
            <li key={line.id} className="flex gap-3 py-2.5">
              <span className="w-5 shrink-0 text-ink-subtle">{i + 1}</span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-ink">{line.name}</p>
                {measureText(line) ? <p className="text-ink-muted">{measureText(line)}</p> : null}
                {line.description ? <p className="text-ink-muted">{line.description}</p> : null}
                <p className="text-ink-subtle">
                  {line.unit === "lumpsum"
                    ? "Lump sum"
                    : `${formatQty(line.qty)} × Rs ${formatRate(line.rate)} / ${UNIT_LABEL[line.unit]}`}
                </p>
              </div>
              <span className="font-semibold tabular-nums">{formatRs(line.amount)}</span>
            </li>
          ))}
        </ol>
        <dl className="mt-3 space-y-1.5 border-t border-border pt-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-ink-muted">Subtotal</dt>
            <dd className="tabular-nums">{formatRs(doc.subtotal)}</dd>
          </div>
          {doc.discountAmount > 0 && (
            <div className="flex justify-between">
              <dt className="text-ink-muted">
                Discount{doc.discount.type === "percent" ? ` (${doc.discount.value}%)` : ""}
              </dt>
              <dd className="tabular-nums">− {formatRs(doc.discountAmount)}</dd>
            </div>
          )}
          {doc.tax.enabled && (
            <div className="flex justify-between">
              <dt className="text-ink-muted">
                {doc.tax.label} ({doc.tax.rate}%)
              </dt>
              <dd className="tabular-nums">{formatRs(doc.taxAmount)}</dd>
            </div>
          )}
          <div className="flex justify-between pt-1 text-base font-semibold">
            <dt>Total</dt>
            <dd className="tabular-nums">{formatRs(doc.total)}</dd>
          </div>
          {isInvoice && doc.amountPaid > 0 && (
            <>
              <div className="flex justify-between">
                <dt className="text-ink-muted">Paid</dt>
                <dd className="tabular-nums">{formatRs(doc.amountPaid)}</dd>
              </div>
              <div className="flex justify-between font-semibold">
                <dt>Balance due</dt>
                <dd className="tabular-nums">{formatRs(doc.total - doc.amountPaid)}</dd>
              </div>
            </>
          )}
          <p className="pt-1 text-xs italic text-ink-muted">{amountInWords(doc.total)}</p>
        </dl>
      </Card>

      {doc.notes || doc.terms ? (
        <Card>
          {doc.notes ? (
            <div className="mb-3">
              <CardTitle>Notes</CardTitle>
              <p className="whitespace-pre-line text-sm text-ink-muted">{doc.notes}</p>
            </div>
          ) : null}
          {doc.terms ? (
            <div>
              <CardTitle>Terms and conditions</CardTitle>
              <p className="whitespace-pre-line text-sm text-ink-muted">{doc.terms}</p>
            </div>
          ) : null}
        </Card>
      ) : null}
    </div>
  );
}
