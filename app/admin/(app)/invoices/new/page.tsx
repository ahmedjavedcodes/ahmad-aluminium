import { DocumentEditor } from "@/components/admin/DocumentEditor";
import { PageHeader } from "@/components/admin/ui";
import { getCustomer, listItems } from "@/lib/billing/data";
import { addDays, todayPk } from "@/lib/billing/dates";
import { getDb } from "@/lib/billing/db";
import { blankEditorState } from "@/lib/billing/editor";
import { getSettings } from "@/lib/billing/settings";

export const metadata = { title: "New invoice" };

export default async function NewInvoicePage({
  searchParams,
}: {
  searchParams: Promise<{ customer?: string }>;
}) {
  const { customer: customerId } = await searchParams;
  const [settings, items, customer] = await Promise.all([
    getDb().then((db) => getSettings(db)),
    listItems(),
    customerId ? getCustomer(customerId) : null,
  ]);
  const today = todayPk();

  return (
    <>
      <PageHeader title="New invoice" back={{ href: "/admin/invoices", label: "Invoices" }} />
      <DocumentEditor
        kind="invoice"
        docId={null}
        items={items}
        initial={blankEditorState({
          issueDate: today,
          endDate: addDays(today, settings.dueDays),
          terms: settings.invoiceTerms,
          tax: settings.tax,
          customer: customer ? { mode: "existing", ...customer } : null,
        })}
      />
    </>
  );
}
