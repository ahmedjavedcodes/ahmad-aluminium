import { CustomerForm } from "@/components/admin/CustomerForm";
import { Card, PageHeader } from "@/components/admin/ui";

export const metadata = { title: "New customer" };

export default function NewCustomerPage() {
  return (
    <>
      <PageHeader title="New customer" back={{ href: "/admin/customers", label: "Customers" }} />
      <Card>
        <CustomerForm />
      </Card>
    </>
  );
}
