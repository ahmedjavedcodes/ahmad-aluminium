"use client";

import { useEffect, useState } from "react";
import { Phone, Search, UserPlus, X } from "lucide-react";
import { searchCustomers } from "@/lib/billing/actions";
import type { CustomerChoice } from "@/lib/billing/editor";
import type { CustomerView } from "@/lib/billing/types";
import { buttonClass, Field, inputClass } from "./ui";

/** Pick an existing customer by name or phone, or add one inline (C-2). */
export function CustomerPicker({
  value,
  onChange,
}: {
  value: CustomerChoice | null;
  onChange: (customer: CustomerChoice | null) => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<CustomerView[]>([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    if (value || !query.trim()) {
      setResults([]);
      return;
    }
    let live = true;
    setSearching(true);
    const timer = setTimeout(async () => {
      try {
        const found = await searchCustomers(query);
        if (live) setResults(found);
      } catch {
        if (live) setResults([]);
      } finally {
        if (live) setSearching(false);
      }
    }, 250);
    return () => {
      live = false;
      clearTimeout(timer);
    };
  }, [query, value]);

  if (value?.mode === "existing") {
    return (
      <div className="flex items-start justify-between gap-3 rounded-lg border border-border bg-bg px-3 py-2.5">
        <div className="min-w-0 text-sm">
          <p className="font-semibold text-ink">{value.name}</p>
          {value.company ? <p className="text-ink-muted">{value.company}</p> : null}
          {value.phone ? (
            <p className="flex items-center gap-1 text-ink-muted">
              <Phone size={13} aria-hidden />
              {value.phone}
            </p>
          ) : null}
          {value.address ? <p className="text-ink-muted">{value.address}</p> : null}
        </div>
        <button type="button" onClick={() => onChange(null)} className={buttonClass("ghost")}>
          Change
        </button>
      </div>
    );
  }

  if (value?.mode === "new") {
    const set =
      (field: "name" | "phone" | "company" | "address" | "email") =>
      (e: React.ChangeEvent<HTMLInputElement>) =>
        onChange({ ...value, [field]: e.target.value });
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-ink">New customer</p>
          <button type="button" onClick={() => onChange(null)} className={buttonClass("ghost")}>
            <X size={16} aria-hidden />
            Search instead
          </button>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Name">
            <input value={value.name} onChange={set("name")} className={inputClass} required />
          </Field>
          <Field label="Phone (WhatsApp)">
            <input value={value.phone} onChange={set("phone")} inputMode="tel" className={inputClass} />
          </Field>
          <Field label="Company (optional)">
            <input value={value.company} onChange={set("company")} className={inputClass} />
          </Field>
          <Field label="Email (optional)">
            <input value={value.email} onChange={set("email")} type="email" className={inputClass} />
          </Field>
          <Field label="Address (optional)" className="sm:col-span-2">
            <input value={value.address} onChange={set("address")} className={inputClass} />
          </Field>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="relative">
        <Search
          size={16}
          aria-hidden
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-subtle"
        />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or phone"
          aria-label="Search customers"
          className={inputClass + " pl-9"}
        />
      </div>
      {results.length > 0 && (
        <ul className="divide-y divide-border overflow-hidden rounded-lg border border-border">
          {results.map((c) => (
            <li key={c.id}>
              <button
                type="button"
                onClick={() =>
                  onChange({
                    mode: "existing",
                    id: c.id,
                    name: c.name,
                    phone: c.phone,
                    company: c.company,
                    address: c.address,
                    email: c.email,
                  })
                }
                className="focus-ring flex w-full cursor-pointer flex-col items-start bg-bg-elevated px-3 py-2 text-left text-sm hover:bg-surface"
              >
                <span className="font-semibold text-ink">{c.name}</span>
                <span className="text-ink-muted">{[c.phone, c.company].filter(Boolean).join(" · ")}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
      {searching ? <p className="text-xs text-ink-subtle">Searching…</p> : null}
      <button
        type="button"
        onClick={() =>
          onChange({ mode: "new", name: query.trim(), phone: "", company: "", address: "", email: "" })
        }
        className={buttonClass("secondary")}
      >
        <UserPlus size={16} aria-hidden />
        {query.trim() ? `Add “${query.trim()}” as a new customer` : "Add a new customer"}
      </button>
    </div>
  );
}
