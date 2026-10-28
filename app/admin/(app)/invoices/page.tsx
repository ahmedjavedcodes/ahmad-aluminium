import Link from "next/link";
import { Plus } from "lucide-react";
import { DocumentList } from "@/components/admin/DocumentList";
import { ListToolbar } from "@/components/admin/ListToolbar";
import { buttonClass, EmptyState, PageHeader } from "@/components/admin/ui";
import { listInvoices } from "@/lib/billing/data";
import { todayPk } from "@/lib/billing/dates";
import { INVOICE_FILTERS } from "@/lib/billing/status";

export const metadata = { title: "Invoices" };

export default async function InvoicesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; page?: string }>;
}) {
  const params = await searchParams;
  const q = params.q?.trim() ?? "";
  const status = (INVOICE_FILTERS as readonly string[]).includes(params.status ?? "") ? params.status! : "";
  const page = Math.max(1, Number(params.page) || 1);
  const { items, hasMore } = await listInvoices({ q, status, page });
  const today = todayPk();
  const more = new URLSearchParams({ ...(q && { q }), ...(status && { status }), page: String(page + 1) });

  return (
    <>
      <PageHeader
        title="Invoices"
        actions={
          <Link href="/admin/invoices/new" className={buttonClass("primary")}>
            <Plus size={16} aria-hidden />
            New invoice
          </Link>
        }
      />
      <ListToolbar basePath="/admin/invoices" q={q} status={status} statuses={INVOICE_FILTERS} />
      {items.length ? (
        <DocumentList today={today} rows={items.map((doc) => ({ kind: "invoice", doc }))} />
      ) : (
        <EmptyState title={q || status ? "No invoices match" : "No invoices yet"}>
          Convert an accepted quotation, or create an invoice directly.
        </EmptyState>
      )}
      {hasMore && (
        <Link href={`/admin/invoices?${more}`} className={buttonClass("secondary") + " mt-4"}>
          Show more
        </Link>
      )}
    </>
  );
}
