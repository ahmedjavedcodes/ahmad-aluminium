import Link from "next/link";
import { Plus } from "lucide-react";
import { DocumentList } from "@/components/admin/DocumentList";
import { ListToolbar } from "@/components/admin/ListToolbar";
import { buttonClass, EmptyState, PageHeader } from "@/components/admin/ui";
import { listQuotations } from "@/lib/billing/data";
import { todayPk } from "@/lib/billing/dates";
import { QUOTATION_FILTERS } from "@/lib/billing/status";

export const metadata = { title: "Quotations" };

export default async function QuotationsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; page?: string }>;
}) {
  const params = await searchParams;
  const q = params.q?.trim() ?? "";
  const status = (QUOTATION_FILTERS as readonly string[]).includes(params.status ?? "") ? params.status! : "";
  const page = Math.max(1, Number(params.page) || 1);
  const { items, hasMore } = await listQuotations({ q, status, page });
  const today = todayPk();
  const more = new URLSearchParams({ ...(q && { q }), ...(status && { status }), page: String(page + 1) });

  return (
    <>
      <PageHeader
        title="Quotations"
        actions={
          <Link href="/admin/quotations/new" className={buttonClass("primary")}>
            <Plus size={16} aria-hidden />
            New quotation
          </Link>
        }
      />
      <ListToolbar basePath="/admin/quotations" q={q} status={status} statuses={QUOTATION_FILTERS} />
      {items.length ? (
        <DocumentList today={today} rows={items.map((doc) => ({ kind: "quotation", doc }))} />
      ) : (
        <EmptyState title={q || status ? "No quotations match" : "No quotations yet"} />
      )}
      {hasMore && (
        <Link href={`/admin/quotations?${more}`} className={buttonClass("secondary") + " mt-4"}>
          Show more
        </Link>
      )}
    </>
  );
}
