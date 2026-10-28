import { notFound } from "next/navigation";
import { DocumentSummary } from "@/components/admin/DocumentSummary";
import { InvoiceActions, PaymentsPanel } from "@/components/admin/InvoiceActions";
import { PdfButtons } from "@/components/admin/PdfButtons";
import { Card, PageHeader, StatusBadge } from "@/components/admin/ui";
import { getInvoice } from "@/lib/billing/data";
import { todayPk } from "@/lib/billing/dates";
import { invoiceDisplayStatus } from "@/lib/billing/status";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const invoice = await getInvoice((await params).id);
  return { title: invoice?.number ?? "Invoice" };
}

export default async function InvoicePage({ params }: { params: Promise<{ id: string }> }) {
  const invoice = await getInvoice((await params).id);
  if (!invoice) notFound();
  const today = todayPk();

  return (
    <>
      <PageHeader
        back={{ href: "/admin/invoices", label: "Invoices" }}
        title={
          <span className="flex flex-wrap items-center gap-3">
            {invoice.number}
            <StatusBadge status={invoiceDisplayStatus(invoice, today)} />
          </span>
        }
        subtitle={invoice.customer.name}
      />
      <div className="grid gap-4 lg:grid-cols-[1fr_20rem]">
        <DocumentSummary doc={invoice} />
        <div className="space-y-4 lg:sticky lg:top-20 lg:self-start">
          <Card>
            <PdfButtons kind="invoice" id={invoice.id} />
          </Card>
          <InvoiceActions invoice={invoice} />
          <PaymentsPanel key={invoice.updatedAt} invoice={invoice} today={today} />
        </div>
      </div>
    </>
  );
}
