"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deleteCustomer, saveCustomer } from "@/lib/billing/actions";
import type { CustomerView } from "@/lib/billing/types";
import { buttonClass, ErrorNote, Field, inputClass } from "./ui";
import { toast } from "./Toaster";

const EMPTY = { name: "", phone: "", company: "", address: "", email: "", notes: "" };

/** `documentCount`: the customer's quotations and invoices, which must go before they can. */
export function CustomerForm({ customer, documentCount = 0 }: { customer?: CustomerView; documentCount?: number }) {
  const router = useRouter();
  const [form, setForm] = useState(
    customer
      ? { name: customer.name, phone: customer.phone, company: customer.company, address: customer.address, email: customer.email, notes: customer.notes }
      : EMPTY,
  );
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();
  const set = (field: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [field]: e.target.value });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setError("");
        startTransition(async () => {
          const result = await saveCustomer(customer?.id ?? null, form);
          if (!result.ok) return setError(result.error);
          if (customer) {
            toast.success("Customer saved", { description: "New documents use these details." });
            router.refresh();
          } else {
            toast.success("Customer added");
            router.push(`/admin/customers/${result.id}`);
          }
        });
      }}
      className="grid gap-3 sm:grid-cols-2"
    >
      <Field label="Name">
        <input value={form.name} onChange={set("name")} required className={inputClass} />
      </Field>
      <Field label="Phone (WhatsApp)">
        <input value={form.phone} onChange={set("phone")} inputMode="tel" className={inputClass} />
      </Field>
      <Field label="Company">
        <input value={form.company} onChange={set("company")} className={inputClass} />
      </Field>
      <Field label="Email">
        <input value={form.email} onChange={set("email")} type="email" className={inputClass} />
      </Field>
      <Field label="Address" className="sm:col-span-2">
        <input value={form.address} onChange={set("address")} className={inputClass} />
      </Field>
      <Field label="Private notes" className="sm:col-span-2" hint="Never printed on a PDF.">
        <textarea value={form.notes} onChange={set("notes")} rows={2} className={inputClass} />
      </Field>
      {error ? <div className="sm:col-span-2"><ErrorNote>{error}</ErrorNote></div> : null}
      <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
        <button type="submit" disabled={pending} className={buttonClass("primary")}>
          {pending ? "Saving…" : customer ? "Save changes" : "Save customer"}
        </button>
        {customer ? null : (
          <Link href="/admin/customers" className={buttonClass("ghost")}>
            Cancel
          </Link>
        )}
        {customer ? (
          <button
            type="button"
            disabled={pending}
            onClick={() => {
              if (documentCount) {
                setError("This customer has quotations or invoices. Delete those first.");
                return;
              }
              if (!confirm(`Delete ${customer.name}? This can't be undone.`)) return;
              setError("");
              startTransition(async () => {
                const result = await deleteCustomer(customer.id);
                if (!result.ok) return setError(result.error);
                toast.success(`${customer.name} deleted`);
                router.push("/admin/customers");
              });
            }}
            className={buttonClass("danger") + " ml-auto"}
          >
            <Trash2 size={16} aria-hidden />
            Delete customer
          </button>
        ) : null}
      </div>
    </form>
  );
}
