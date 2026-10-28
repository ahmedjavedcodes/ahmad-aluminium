import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { buttonClass, EmptyState, inputClass, PageHeader } from "@/components/admin/ui";
import { listCustomers } from "@/lib/billing/data";

export const metadata = { title: "Customers" };

export default async function CustomersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const q = (await searchParams).q?.trim() ?? "";
  const customers = await listCustomers(q);

  return (
    <>
      <PageHeader
        title="Customers"
        actions={
          <Link href="/admin/customers/new" className={buttonClass("primary")}>
            <Plus size={16} aria-hidden />
            New customer
          </Link>
        }
      />

      <form action="/admin/customers" className="relative mb-4">
        <Search size={16} aria-hidden className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-subtle" />
        <input name="q" defaultValue={q} placeholder="Search by name, phone or company" aria-label="Search customers" className={inputClass + " pl-9"} />
      </form>

      {customers.length ? (
        <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-bg-elevated">
          {customers.map((c) => (
            <li key={c.id}>
              <Link href={`/admin/customers/${c.id}`} className="focus-ring block px-4 py-3 hover:bg-surface">
                <p className="font-semibold text-ink">{c.name}</p>
                <p className="text-sm text-ink-muted">{[c.phone, c.company, c.address].filter(Boolean).join(" · ") || "No contact details"}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState title={q ? "No customers match" : "No customers yet"}>
          Customers are also added while writing a quotation or invoice.
        </EmptyState>
      )}
    </>
  );
}
