import Link from "next/link";
import { notFound } from "next/navigation";
import { FilePlus2, ReceiptText } from "lucide-react";
import { CustomerForm } from "@/components/admin/CustomerForm";
import { DocumentList } from "@/components/admin/DocumentList";
import { buttonClass, Card, CardTitle, EmptyState, PageHeader } from "@/components/admin/ui";
import { customerDocuments, getCustomer } from "@/lib/billing/data";
import { todayPk } from "@/lib/billing/dates";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const customer = await getCustomer((await params).id);
  return { title: customer?.name ?? "Customer" };
}

export default async function CustomerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [customer, docs] = await Promise.all([getCustomer(id), customerDocuments(id)]);
  if (!customer) notFound();
  const today = todayPk();

  return (
    <>
      <PageHeader
        title={customer.name}
        subtitle={customer.phone}
        back={{ href: "/admin/customers", label: "Customers" }}
        actions={
          <>
            <Link href={`/admin/quotations/new?customer=${id}`} className={buttonClass("primary")}>
              <FilePlus2 size={16} aria-hidden />
              New quotation
            </Link>
            <Link href={`/admin/invoices/new?customer=${id}`} className={buttonClass("secondary")}>
              <ReceiptText size={16} aria-hidden />
              New invoice
            </Link>
          </>
        }
      />
      <div className="space-y-6">
        <section>
          <h2 className="mb-3 text-[15px] font-semibold text-ink">Invoices</h2>
          {docs.invoices.length ? (
            <DocumentList today={today} rows={docs.invoices.map((doc) => ({ kind: "invoice", doc }))} />
          ) : (
            <EmptyState title="No invoices for this customer" />
          )}
        </section>
        <section>
          <h2 className="mb-3 text-[15px] font-semibold text-ink">Quotations</h2>
          {docs.quotations.length ? (
            <DocumentList today={today} rows={docs.quotations.map((doc) => ({ kind: "quotation", doc }))} />
          ) : (
            <EmptyState title="No quotations for this customer" />
          )}
        </section>
        <Card>
          <CardTitle>Details</CardTitle>
          <CustomerForm customer={customer} documentCount={docs.quotations.length + docs.invoices.length} />
        </Card>
      </div>
    </>
  );
}
