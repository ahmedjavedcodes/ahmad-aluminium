import Link from "next/link";
import { Download, Package } from "lucide-react";
import { BrandImageField } from "@/components/admin/BrandImageField";
import { SettingsForm } from "@/components/admin/SettingsForm";
import { buttonClass, Card, CardTitle, PageHeader } from "@/components/admin/ui";
import { loadSettings } from "@/lib/billing/data";
import { missingCloudinaryEnv } from "@/lib/billing/env";

export const metadata = { title: "Settings" };

const EXPORTS = [
  { kind: "invoices", label: "Invoices" },
  { kind: "quotations", label: "Quotations" },
  { kind: "payments", label: "Payments" },
  { kind: "customers", label: "Customers" },
];

export default async function SettingsPage() {
  const { settings, nextQuoteNumber, nextInvoiceNumber, year } = await loadSettings();
  const missingCloudinary = missingCloudinaryEnv();
  const uploadBlocked = missingCloudinary.length
    ? `Add ${missingCloudinary.join(", ")} to .env.local to upload.`
    : undefined;

  return (
    <>
      <PageHeader title="Settings" />
      <div className="space-y-4">
        <Card>
          <CardTitle>Logo and stamp</CardTitle>
          <div className="grid gap-5 sm:grid-cols-2">
            <BrandImageField
              kind="logo"
              label="Company logo"
              hint="Top left of every PDF. Square PNG works best."
              image={settings.logo}
              disabled={uploadBlocked}
            />
            <BrandImageField
              kind="stamp"
              label="Company stamp"
              hint="Printed at the end of every quotation and invoice. Use a PNG with a transparent background."
              image={settings.stamp}
              disabled={uploadBlocked}
            />
          </div>
        </Card>

        <SettingsForm
          settings={settings}
          nextQuoteNumber={nextQuoteNumber}
          nextInvoiceNumber={nextInvoiceNumber}
          year={year}
        />

        <Card>
          <CardTitle>More</CardTitle>
          <Link href="/admin/items" className={buttonClass("secondary") + " mb-4 w-full md:hidden"}>
            <Package size={16} aria-hidden />
            Saved items
          </Link>
          <p className="mb-2 text-sm text-ink-muted">Download your records as CSV, for backup or your accountant.</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {EXPORTS.map(({ kind, label }) => (
              <a key={kind} href={`/admin/api/export/${kind}`} className={buttonClass("secondary")}>
                <Download size={16} aria-hidden />
                {label}
              </a>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}
