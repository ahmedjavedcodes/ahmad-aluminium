import Link from "next/link";
import { LogOut } from "lucide-react";
import { LogoMark } from "@/components/Logo";
import { AdminNav } from "@/components/admin/AdminNav";
import { SetupNotice } from "@/components/admin/SetupNotice";
import { Toaster } from "@/components/admin/Toaster";
import { buttonClass } from "@/components/admin/ui";
import { logout } from "@/lib/billing/actions";
import { requireOwner } from "@/lib/billing/auth";
import { missingCoreEnv } from "@/lib/billing/env";

export default async function BillingAppLayout({ children }: { children: React.ReactNode }) {
  const missing = missingCoreEnv();
  if (missing.length) return <SetupNotice missing={missing} />;
  await requireOwner();

  return (
    <div className="pb-24 md:pb-10">
      <header className="sticky top-0 z-30 border-b border-border bg-bg/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center gap-4 px-4 py-2.5">
          <Link href="/admin" className="focus-ring flex items-center gap-2 rounded-lg">
            <LogoMark className="h-8 w-8 text-accent" />
            <span className="font-display text-lg font-semibold text-ink">Billing</span>
          </Link>
          <AdminNav variant="top" />
          <form action={logout} className="ml-auto">
            <button type="submit" className={buttonClass("ghost")}>
              <LogOut size={16} aria-hidden />
              Sign out
            </button>
          </form>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-6">{children}</main>
      <AdminNav variant="bottom" />
      <Toaster />
    </div>
  );
}
