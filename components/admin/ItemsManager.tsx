"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { deleteItem, saveItem } from "@/lib/billing/actions";
import { formatRate, UNIT_LABEL, UNIT_NAME } from "@/lib/billing/calc";
import { UNITS, type SavedItemView, type Unit } from "@/lib/billing/types";
import { buttonClass, Card, EmptyState, ErrorNote, Field, inputClass, PageHeader } from "./ui";
import { toast } from "./Toaster";

type Draft = { name: string; description: string; unit: Unit; rate: string };
const BLANK: Draft = { name: "", description: "", unit: "sqft", rate: "" };

/** Saved items with a default unit and rate, offered while typing a line (Q-6). */
export function ItemsManager({ items }: { items: SavedItemView[] }) {
  const router = useRouter();
  const [editing, setEditing] = useState<string | "new" | null>(null);
  const [draft, setDraft] = useState<Draft>(BLANK);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  function open(item?: SavedItemView) {
    setError("");
    setEditing(item?.id ?? "new");
    setDraft(item ? { name: item.name, description: item.description, unit: item.unit, rate: String(item.rate) } : BLANK);
  }

  function save() {
    setError("");
    startTransition(async () => {
      const result = await saveItem(editing === "new" ? null : editing, {
        ...draft,
        rate: Number(draft.rate.replace(/,/g, "")) || 0,
      });
      if (!result.ok) return setError(result.error);
      toast.success(editing === "new" ? "Item added" : "Item saved");
      setEditing(null);
      router.refresh();
    });
  }

  function remove(item: SavedItemView) {
    if (!confirm(`Delete "${item.name}"? Existing documents are not affected.`)) return;
    startTransition(async () => {
      const result = await deleteItem(item.id);
      // A toast for the failure too: the inline error only shows while the form is open.
      if (!result.ok) {
        toast.error("Couldn't delete the item", { description: result.error });
        return;
      }
      toast.success(`"${item.name}" deleted`);
      router.refresh();
    });
  }

  const form = (
    <Card className="mb-4">
      <div className="grid gap-3 sm:grid-cols-[1fr_12rem_9rem]">
        <Field label="Name">
          <input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} className={inputClass} placeholder="e.g. 5 mm clear glass" />
        </Field>
        <Field label="Priced">
          <select value={draft.unit} onChange={(e) => setDraft({ ...draft, unit: e.target.value as Unit })} className={inputClass}>
            {UNITS.map((u) => (
              <option key={u} value={u}>
                {UNIT_NAME[u]}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Rate (Rs)">
          <input inputMode="decimal" value={draft.rate} onChange={(e) => setDraft({ ...draft, rate: e.target.value })} className={inputClass} />
        </Field>
        <Field label="Details (optional)" className="sm:col-span-3">
          <input value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} className={inputClass} />
        </Field>
      </div>
      {error ? <div className="mt-3"><ErrorNote>{error}</ErrorNote></div> : null}
      <div className="mt-3 flex gap-2">
        <button type="button" onClick={save} disabled={pending} className={buttonClass("primary")}>
          {pending ? "Saving…" : "Save item"}
        </button>
        <button type="button" onClick={() => setEditing(null)} className={buttonClass("ghost")}>
          Cancel
        </button>
      </div>
    </Card>
  );

  return (
    <>
      <PageHeader
        title="Saved items"
        subtitle="Default units and rates for lines you write often."
        actions={
          <button type="button" onClick={() => open()} disabled={editing === "new"} className={buttonClass("primary")}>
            <Plus size={16} aria-hidden />
            New item
          </button>
        }
      />
      {editing === "new" ? form : null}
      {items.length ? (
        <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-bg-elevated">
          {items.map((item) =>
            editing === item.id ? (
              <li key={item.id} className="p-3">{form}</li>
            ) : (
              <li key={item.id} className="flex items-center gap-3 px-4 py-3">
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-ink">{item.name}</p>
                  <p className="text-sm text-ink-muted">
                    Rs {formatRate(item.rate)}
                    {item.unit === "lumpsum" ? " lump sum" : ` / ${UNIT_LABEL[item.unit]}`}
                    {item.description ? ` · ${item.description}` : ""}
                  </p>
                </div>
                <button type="button" aria-label={`Edit ${item.name}`} onClick={() => open(item)} className={buttonClass("ghost", "icon")}>
                  <Pencil size={16} aria-hidden />
                </button>
                <button type="button" aria-label={`Delete ${item.name}`} onClick={() => remove(item)} className={buttonClass("ghost", "icon") + " text-red-700"}>
                  <Trash2 size={16} aria-hidden />
                </button>
              </li>
            ),
          )}
        </ul>
      ) : (
        <EmptyState title="No saved items yet">
          Save the things you quote often; typing their name on a line fills in the rate.
        </EmptyState>
      )}
    </>
  );
}
