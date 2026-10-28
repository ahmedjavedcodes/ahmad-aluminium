import { ItemsManager } from "@/components/admin/ItemsManager";
import { listItems } from "@/lib/billing/data";

export const metadata = { title: "Saved items" };

export default async function ItemsPage() {
  // ItemsManager draws the page header: its New item button opens the inline form.
  return <ItemsManager items={await listItems()} />;
}
