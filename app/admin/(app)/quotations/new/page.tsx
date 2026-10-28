import { DocumentEditor } from "@/components/admin/DocumentEditor";
import { PageHeader } from "@/components/admin/ui";
import { getCustomer, listItems } from "@/lib/billing/data";
import { addDays, todayPk } from "@/lib/billing/dates";
import { blankEditorState } from "@/lib/billing/editor";
import { getDb } from "@/lib/billing/db";
import { getSettings } from "@/lib/billing/settings";

export const metadata = { title: "New quotation" };

export default async function NewQuotationPage({
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
      <PageHeader title="New quotation" back={{ href: "/admin/quotations", label: "Quotations" }} />
      <DocumentEditor
        kind="quotation"
        docId={null}
        items={items}
        initial={blankEditorState({
          issueDate: today,
          endDate: addDays(today, settings.validityDays),
          terms: settings.quoteTerms,
          tax: settings.tax,
          customer: customer ? { mode: "existing", ...customer } : null,
        })}
      />
    </>
  );
}
