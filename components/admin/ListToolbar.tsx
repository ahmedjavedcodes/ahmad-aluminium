import Link from "next/link";
import { Search } from "lucide-react";
import { STATUS_LABEL, type DisplayStatus } from "@/lib/billing/status";
import { buttonClass, inputBase, inputClass } from "./ui";

/** Plain GET form: search and filter work even before JavaScript loads (L-1). */
export function ListToolbar({
  basePath,
  q,
  status,
  statuses,
}: {
  basePath: string;
  q: string;
  status: string;
  statuses: readonly DisplayStatus[];
}) {
  return (
    <form action={basePath} className="mb-4 flex flex-wrap gap-2">
      <div className="relative min-w-48 flex-1">
        <Search
          size={16}
          aria-hidden
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-subtle"
        />
        <input
          name="q"
          defaultValue={q}
          placeholder="Number, customer or phone"
          aria-label="Search"
          className={inputClass + " pl-9"}
        />
      </div>
      <select name="status" defaultValue={status} aria-label="Status" className={inputBase + " w-auto"}>
        <option value="">All statuses</option>
        {statuses.map((s) => (
          <option key={s} value={s}>
            {STATUS_LABEL[s]}
          </option>
        ))}
      </select>
      <button type="submit" className={buttonClass("secondary")}>
        Filter
      </button>
      {q || status ? (
        <Link href={basePath} className={buttonClass("ghost")}>
          Clear
        </Link>
      ) : null}
    </form>
  );
}
