import Link from "next/link";
import { formatRs } from "@/lib/billing/calc";
import { formatDate } from "@/lib/billing/dates";
import { invoiceDisplayStatus, quotationDisplayStatus } from "@/lib/billing/status";
import type { InvoiceView, QuotationView } from "@/lib/billing/types";
import { PdfButtons } from "./PdfButtons";
import { StatusBadge } from "./ui";

type Row =
  | { kind: "quotation"; doc: QuotationView }
  | { kind: "invoice"; doc: InvoiceView };

/** Quotation or invoice rows, each with its own PDF button (P-1). */
export function DocumentList({ rows, today }: { rows: Row[]; today: string }) {
  return (
    <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-bg-elevated">
      {rows.map((row) => {
        const { doc } = row;
        const href = `/admin/${row.kind === "quotation" ? "quotations" : "invoices"}/${doc.id}`;
        const status =
          row.kind === "quotation"
            ? quotationDisplayStatus(row.doc, today)
            : invoiceDisplayStatus(row.doc, today);
        const balance = row.kind === "invoice" ? row.doc.total - row.doc.amountPaid : 0;
        return (
          <li key={doc.id} className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3">
            <Link href={href} className="focus-ring min-w-0 flex-1 rounded">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold text-ink">{doc.number}</span>
                <StatusBadge status={status} />
              </div>
              <p className="truncate text-sm text-ink-muted">
                {doc.customer.name} · {formatDate(doc.issueDate)}
              </p>
            </Link>
            <div className="text-right">
              <p className="font-semibold tabular-nums text-ink">{formatRs(doc.total)}</p>
              {row.kind === "invoice" && row.doc.status === "issued" && balance > 0 && balance < doc.total ? (
                <p className="text-xs text-ink-muted">{formatRs(balance)} due</p>
              ) : null}
            </div>
            <PdfButtons kind={row.kind} id={doc.id} compact />
          </li>
        );
      })}
    </ul>
  );
}
