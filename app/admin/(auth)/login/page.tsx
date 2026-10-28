import { redirect } from "next/navigation";
import { LogoMark } from "@/components/Logo";
import { LoginForm } from "@/components/admin/LoginForm";
import { SetupNotice } from "@/components/admin/SetupNotice";
import { isSignedIn } from "@/lib/billing/auth";
import { missingCoreEnv } from "@/lib/billing/env";
import { site } from "@/data/site";

export const metadata = { title: "Sign in" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const missing = missingCoreEnv().filter((key) => key !== "MONGODB_URI");
  if (missing.length) return <SetupNotice missing={missing} />;
  if (await isSignedIn()) redirect("/admin");
  const { next } = await searchParams;

  return (
    <div className="flex min-h-dvh items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex flex-col items-center text-center">
          <LogoMark className="h-12 w-12 text-accent" />
          <h1 className="mt-4 font-display text-2xl font-semibold text-ink">Billing sign-in</h1>
          <p className="mt-1 text-sm text-ink-muted">{site.name}</p>
        </div>
        <LoginForm next={next ?? ""} />
      </div>
    </div>
  );
}
