import { notFound, redirect } from "next/navigation";
import { DocumentEditor } from "@/components/admin/DocumentEditor";
import { PageHeader } from "@/components/admin/ui";
import { getQuotation, listItems } from "@/lib/billing/data";
import { editorStateFromDoc } from "@/lib/billing/editor";

export const metadata = { title: "Edit quotation" };

export default async function EditQuotationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [quotation, items] = await Promise.all([getQuotation(id), listItems()]);
  if (!quotation) notFound();
  if (quotation.status === "converted") redirect(`/admin/quotations/${id}`);

  return (
    <>
      <PageHeader
        title={`Edit ${quotation.number}`}
        back={{ href: `/admin/quotations/${id}`, label: quotation.number }}
      />
      <DocumentEditor kind="quotation" docId={id} items={items} initial={editorStateFromDoc(quotation)} />
    </>
  );
}
