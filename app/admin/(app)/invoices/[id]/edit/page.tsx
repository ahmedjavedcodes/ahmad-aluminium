import { notFound, redirect } from "next/navigation";
import { DocumentEditor } from "@/components/admin/DocumentEditor";
import { PageHeader } from "@/components/admin/ui";
import { getInvoice, listItems } from "@/lib/billing/data";
import { editorStateFromDoc } from "@/lib/billing/editor";

export const metadata = { title: "Edit invoice" };

export default async function EditInvoicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [invoice, items] = await Promise.all([getInvoice(id), listItems()]);
  if (!invoice) notFound();
  if (invoice.status === "cancelled") redirect(`/admin/invoices/${id}`);

  return (
    <>
      <PageHeader title={`Edit ${invoice.number}`} back={{ href: `/admin/invoices/${id}`, label: invoice.number }} />
      <DocumentEditor kind="invoice" docId={id} items={items} initial={editorStateFromDoc(invoice)} />
    </>
  );
}
