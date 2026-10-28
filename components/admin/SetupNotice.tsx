import { Card } from "./ui";

/** Shown instead of the billing screens until .env.local has what they need. */
export function SetupNotice({ missing }: { missing: string[] }) {
  return (
    <div className="mx-auto max-w-lg px-4 py-16">
      <Card>
        <h1 className="font-display text-2xl font-semibold text-ink">Finish setting up billing</h1>
        <p className="mt-2 text-sm text-ink-muted">
          Add these to <code className="rounded bg-surface px-1">.env.local</code> in the project
          root, then restart the server:
        </p>
        <ul className="mt-4 space-y-1.5">
          {missing.map((key) => (
            <li key={key}>
              <code className="rounded bg-accent-tint px-1.5 py-0.5 text-sm text-accent-deep">{key}</code>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-ink-muted">
          Each key has a comment in that file explaining where its value comes from. For the
          password hash, run <code className="rounded bg-surface px-1">npm run hash-password</code>.
        </p>
      </Card>
    </div>
  );
}
