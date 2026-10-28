import { notFound } from "next/navigation";
import { DocumentSummary } from "@/components/admin/DocumentSummary";
import { PdfButtons } from "@/components/admin/PdfButtons";
import { QuotationActions } from "@/components/admin/QuotationActions";
import { Card, PageHeader, StatusBadge } from "@/components/admin/ui";
import { getQuotation } from "@/lib/billing/data";
import { todayPk } from "@/lib/billing/dates";
import { quotationDisplayStatus } from "@/lib/billing/status";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const quotation = await getQuotation((await params).id);
  return { title: quotation?.number ?? "Quotation" };
}

export default async function QuotationPage({ params }: { params: Promise<{ id: string }> }) {
  const quotation = await getQuotation((await params).id);
  if (!quotation) notFound();

  return (
    <>
      <PageHeader
        back={{ href: "/admin/quotations", label: "Quotations" }}
        title={
          <span className="flex flex-wrap items-center gap-3">
            {quotation.number}
            <StatusBadge status={quotationDisplayStatus(quotation, todayPk())} />
          </span>
        }
        subtitle={quotation.customer.name}
      />
      <div className="grid gap-4 lg:grid-cols-[1fr_20rem]">
        <DocumentSummary doc={quotation} />
        <div className="space-y-4 lg:sticky lg:top-20 lg:self-start">
          <Card>
            <PdfButtons kind="quotation" id={quotation.id} />
          </Card>
          <QuotationActions quotation={quotation} />
        </div>
      </div>
    </>
  );
}
