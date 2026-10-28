import Link from "next/link";
import { buttonClass, EmptyState } from "@/components/admin/ui";

export default function BillingNotFound() {
  return (
    <EmptyState title="That record doesn't exist">
      <Link href="/admin" className={buttonClass("secondary") + " mt-3"}>
        Back to billing
      </Link>
    </EmptyState>
  );
}
