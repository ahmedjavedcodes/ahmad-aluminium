import Link from "next/link";
import { FilePlus2, ReceiptText } from "lucide-react";
import { DocumentList } from "@/components/admin/DocumentList";
import { buttonClass, Card, CardTitle, EmptyState, PageHeader } from "@/components/admin/ui";
import { formatRs } from "@/lib/billing/calc";
import { dashboardData } from "@/lib/billing/data";

export const metadata = { title: "Home" };

export default async function DashboardPage() {
  const data = await dashboardData();
  const stats = [
    { label: "Quoted this month", value: data.month.quoted },
    { label: "Invoiced this month", value: data.month.invoiced },
    { label: "Received this month", value: data.month.received },
    { label: "Outstanding", value: data.outstanding },
  ];

  return (
    <>
      <PageHeader
        title="Billing"
        actions={
          <>
            <Link href="/admin/quotations/new" className={buttonClass("primary")}>
              <FilePlus2 size={16} aria-hidden />
              New quotation
            </Link>
            <Link href="/admin/invoices/new" className={buttonClass("secondary")}>
              <ReceiptText size={16} aria-hidden />
              New invoice
            </Link>
          </>
        }
      />

      <dl className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-border bg-bg-elevated p-4">
            <dt className="text-xs font-semibold text-ink-muted">{stat.label}</dt>
            <dd className="mt-1 text-lg font-semibold tabular-nums text-ink sm:text-xl">{formatRs(stat.value)}</dd>
          </div>
        ))}
      </dl>

      <section className="mb-6">
        <h2 className="mb-3 text-[15px] font-semibold text-ink">Unpaid invoices</h2>
        {data.unpaid.length ? (
          <DocumentList today={data.today} rows={data.unpaid.map((doc) => ({ kind: "invoice", doc }))} />
        ) : (
          <EmptyState title="Nothing outstanding">Issued invoices with a balance due show up here.</EmptyState>
        )}
      </section>

      <Card>
        <CardTitle>Latest quotations</CardTitle>
        {data.recentQuotes.length ? (
          <DocumentList today={data.today} rows={data.recentQuotes.map((doc) => ({ kind: "quotation", doc }))} />
        ) : (
          <EmptyState title="No quotations yet">
            <Link href="/admin/quotations/new" className="font-semibold text-accent underline">
              Create the first one
            </Link>
          </EmptyState>
        )}
      </Card>
    </>
  );
}
