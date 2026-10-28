"use client";

import { buttonClass, Card } from "@/components/admin/ui";

/** Usually a database that can't be reached: wrong MONGODB_URI, or this IP not allowed in Atlas. */
export default function BillingError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <Card className="mx-auto max-w-lg">
      <h1 className="font-display text-xl font-semibold text-ink">Billing couldn&apos;t load</h1>
      <p className="mt-2 text-sm text-ink-muted">
        The database may be unreachable. Check MONGODB_URI in .env.local and that this
        server&apos;s IP address is allowed under Atlas → Network Access.
      </p>
      {error.digest ? <p className="mt-2 text-xs text-ink-subtle">Reference: {error.digest}</p> : null}
      <button type="button" onClick={reset} className={buttonClass("primary") + " mt-4"}>
        Try again
      </button>
    </Card>
  );
}
