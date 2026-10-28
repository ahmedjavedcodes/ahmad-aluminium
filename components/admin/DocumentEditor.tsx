"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import { saveInvoice, saveQuotation } from "@/lib/billing/actions";
import {
  amountInWords,
  areaSqft,
  computeTotals,
  formatRs,
  lengthFt,
  lineAmount,
  UNIT_NAME,
} from "@/lib/billing/calc";
import {
  isEditorState,
  lineFromDraft,
  newLineDraft,
  payloadFromState,
  toNumber,
  type EditorState,
  type LineDraft,
} from "@/lib/billing/editor";
import { UNITS, type DocKind, type SavedItemView } from "@/lib/billing/types";
import { CustomerPicker } from "./CustomerPicker";
import { buttonClass, Card, CardTitle, ErrorNote, Field, inputBase, inputClass } from "./ui";
import { toast } from "./Toaster";

const smallInput = inputClass + " px-2.5 text-center";

/**
 * Create or edit a quotation or invoice. Totals update as the owner types
 * (Q-3); the server recomputes them on save. Work in progress is kept in this
 * device's storage, so a dropped connection or a closed tab loses nothing.
 */
export function DocumentEditor({
  kind,
  docId,
  initial,
  items,
}: {
  kind: DocKind;
  docId: string | null;
  initial: EditorState;
  items: SavedItemView[];
}) {
  const router = useRouter();
  const storageKey = `aag-billing:${kind}:${docId ?? "new"}`;
  const [state, setState] = useState<EditorState>(initial);
  const [restored, setRestored] = useState(false);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();
  const edited = useRef(false);
  const listHref = kind === "quotation" ? "/admin/quotations" : "/admin/invoices";

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) ?? "null");
      if (isEditorState(saved)) {
        setState(saved);
        setRestored(true);
      }
    } catch {
      /* storage unavailable — start from the server's copy */
    }
  }, [storageKey]);

  useEffect(() => {
    if (!edited.current) return;
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(storageKey, JSON.stringify(state));
      } catch {
        /* storage full or blocked — autosave is a convenience only */
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [state, storageKey]);

  const update = (patch: Partial<EditorState>) => {
    edited.current = true;
    setState((s) => ({ ...s, ...patch }));
  };
  const updateLines = (fn: (lines: LineDraft[]) => LineDraft[]) => {
    edited.current = true;
    setState((s) => ({ ...s, lines: fn(s.lines) }));
  };

  const amounts = useMemo(() => state.lines.map((d) => lineAmount(lineFromDraft(d))), [state.lines]);
  const totals = computeTotals(
    amounts.map((amount) => ({ amount })),
    { type: state.discountType, value: toNumber(state.discountValue) },
    { enabled: state.taxEnabled, label: state.taxLabel, rate: toNumber(state.taxRate) },
  );

  function discardRestored() {
    try {
      localStorage.removeItem(storageKey);
    } catch {}
    edited.current = false;
    setState(initial);
    setRestored(false);
  }

  function save() {
    setError("");
    if (!state.customer) {
      setError("Pick a customer, or add a new one, first.");
      return;
    }
    startTransition(async () => {
      const action = kind === "quotation" ? saveQuotation : saveInvoice;
      const result = await action(docId, payloadFromState(state));
      if (!result.ok) {
        setError(result.error);
        return;
      }
      try {
        localStorage.removeItem(storageKey);
      } catch {}
      edited.current = false;
      const noun = kind === "quotation" ? "Quotation" : "Invoice";
      toast.success(docId ? `${noun} saved` : `${noun} created`);
      router.push(`${listHref}/${result.id}`);
    });
  }

  return (
    <div className="space-y-4">
      {restored && (
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-amber-700/20 bg-amber-50 px-3 py-2 text-sm text-amber-900">
          <span>Restored unsaved changes from this device.</span>
          <button type="button" onClick={discardRestored} className={buttonClass("ghost")}>
            Discard them
          </button>
        </div>
      )}

      <Card>
        <CardTitle>Customer</CardTitle>
        <CustomerPicker value={state.customer} onChange={(customer) => update({ customer })} />
      </Card>

      <Card>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Date">
            <input
              type="date"
              value={state.issueDate}
              onChange={(e) => update({ issueDate: e.target.value })}
              className={inputClass}
            />
          </Field>
          <Field label={kind === "quotation" ? "Valid until" : "Due date"}>
            <input
              type="date"
              value={state.endDate}
              onChange={(e) => update({ endDate: e.target.value })}
              className={inputClass}
            />
          </Field>
        </div>
      </Card>

      <Card>
        <CardTitle>Items</CardTitle>
        <datalist id="saved-items">
          {items.map((item) => (
            <option key={item.id} value={item.name} />
          ))}
        </datalist>
        <ol className="space-y-3">
          {state.lines.map((line, index) => (
            <LineEditor
              key={line.id}
              index={index}
              count={state.lines.length}
              line={line}
              amount={amounts[index]}
              items={items}
              onChange={(patch) =>
                updateLines((lines) => lines.map((l) => (l.id === line.id ? { ...l, ...patch } : l)))
              }
              onMove={(delta) =>
                updateLines((lines) => {
                  const next = [...lines];
                  const [moved] = next.splice(index, 1);
                  next.splice(index + delta, 0, moved);
                  return next;
                })
              }
              onRemove={() => updateLines((lines) => lines.filter((l) => l.id !== line.id))}
            />
          ))}
        </ol>
        <button
          type="button"
          onClick={() => updateLines((lines) => [...lines, newLineDraft(lines.at(-1)?.unit)])}
          className={buttonClass("secondary") + " mt-3 w-full sm:w-auto"}
        >
          <Plus size={16} aria-hidden />
          Add line
        </button>
      </Card>

      <Card>
        <CardTitle>Totals</CardTitle>
        <dl className="space-y-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-ink-muted">Subtotal</dt>
            <dd className="font-semibold tabular-nums">{formatRs(totals.subtotal)}</dd>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <dt className="text-ink-muted">Discount</dt>
            <dd className="flex items-center gap-2">
              <select
                aria-label="Discount type"
                value={state.discountType}
                onChange={(e) => update({ discountType: e.target.value as EditorState["discountType"] })}
                className={inputBase + " w-auto py-2"}
              >
                <option value="amount">Rs</option>
                <option value="percent">%</option>
              </select>
              <input
                aria-label="Discount"
                inputMode="decimal"
                value={state.discountValue}
                onChange={(e) => update({ discountValue: e.target.value })}
                placeholder="0"
                className={inputBase + " w-28 py-2 text-right"}
              />
              <span className="w-24 text-right tabular-nums">− {formatRs(totals.discountAmount)}</span>
            </dd>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <dt>
              <label className="flex cursor-pointer items-center gap-2 text-ink-muted">
                <input
                  type="checkbox"
                  checked={state.taxEnabled}
                  onChange={(e) => update({ taxEnabled: e.target.checked })}
                  className="h-4 w-4 accent-[rgb(var(--color-accent))]"
                />
                Add tax
              </label>
            </dt>
            {state.taxEnabled ? (
              <dd className="flex items-center gap-2">
                <input
                  aria-label="Tax label"
                  value={state.taxLabel}
                  onChange={(e) => update({ taxLabel: e.target.value })}
                  className={inputBase + " w-20 py-2"}
                />
                <input
                  aria-label="Tax rate percent"
                  inputMode="decimal"
                  value={state.taxRate}
                  onChange={(e) => update({ taxRate: e.target.value })}
                  className={inputBase + " w-16 py-2 text-right"}
                />
                <span className="text-ink-muted">%</span>
                <span className="w-24 text-right tabular-nums">{formatRs(totals.taxAmount)}</span>
              </dd>
            ) : null}
          </div>
          <div className="flex justify-between border-t border-border pt-3 text-base">
            <dt className="font-semibold">Total</dt>
            <dd className="font-semibold tabular-nums">{formatRs(totals.total)}</dd>
          </div>
          <p className="text-xs italic text-ink-muted">{amountInWords(totals.total)}</p>
        </dl>
      </Card>

      <Card>
        <div className="grid gap-3">
          <Field label="Notes (optional)" hint="Printed on the PDF above the terms and conditions.">
            <textarea
              rows={2}
              value={state.notes}
              onChange={(e) => update({ notes: e.target.value })}
              className={inputClass}
            />
          </Field>
          <Field label="Terms and conditions">
            <textarea
              rows={3}
              value={state.terms}
              onChange={(e) => update({ terms: e.target.value })}
              className={inputClass}
            />
          </Field>
        </div>
      </Card>

      <div className="sticky bottom-[4.5rem] z-20 rounded-xl border border-border bg-bg-elevated/95 p-3 shadow-lift backdrop-blur md:bottom-4">
        {error ? <div className="mb-2"><ErrorNote>{error}</ErrorNote></div> : null}
        <div className="flex items-center justify-between gap-3">
          <div className="text-sm">
            <span className="text-ink-muted">Total </span>
            <span className="font-semibold tabular-nums">{formatRs(totals.total)}</span>
          </div>
          <div className="flex gap-2">
            <Link href={docId ? `${listHref}/${docId}` : listHref} className={buttonClass("ghost")}>
              Cancel
            </Link>
            <button type="button" onClick={save} disabled={pending} className={buttonClass("primary")}>
              {pending ? "Saving…" : kind === "quotation" ? "Save quotation" : "Save invoice"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function LineEditor({
  index,
  count,
  line,
  amount,
  items,
  onChange,
  onMove,
  onRemove,
}: {
  index: number;
  count: number;
  line: LineDraft;
  amount: number;
  items: SavedItemView[];
  onChange: (patch: Partial<LineDraft>) => void;
  onMove: (delta: -1 | 1) => void;
  onRemove: () => void;
}) {
  const parsed = lineFromDraft(line);
  const set = (field: keyof LineDraft) => (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange({ [field]: e.target.value });

  // Picking a saved item fills its unit, rate and description (Q-6) — but never
  // overwrites a rate the owner already typed.
  function onName(name: string) {
    const match = items.find((i) => i.name.toLowerCase() === name.trim().toLowerCase());
    if (match && !line.rate) {
      onChange({
        name,
        unit: match.unit,
        rate: String(match.rate),
        description: line.description || match.description,
      });
    } else {
      onChange({ name });
    }
  }

  const dims = (label: string, ft: keyof LineDraft, inch: keyof LineDraft) => (
    <Field label={label}>
      <div className="flex items-center gap-1">
        <input inputMode="decimal" value={line[ft]} onChange={set(ft)} placeholder="0" aria-label={`${label} feet`} className={smallInput} />
        <span className="text-xs text-ink-subtle">ft</span>
        <input inputMode="decimal" value={line[inch]} onChange={set(inch)} placeholder="0" aria-label={`${label} inches`} className={smallInput} />
        <span className="text-xs text-ink-subtle">in</span>
      </div>
    </Field>
  );

  const rateLabel =
    line.unit === "sqft" ? "Rate / sq ft" : line.unit === "rft" ? "Rate / rft" : line.unit === "piece" ? "Rate / piece" : "Amount";

  return (
    <li className="rounded-lg border border-border bg-bg p-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-ink-subtle">Line {index + 1}</span>
        <div className="flex gap-1">
          <button type="button" aria-label="Move up" disabled={index === 0} onClick={() => onMove(-1)} className={buttonClass("ghost", "icon")}>
            <ArrowUp size={16} aria-hidden />
          </button>
          <button type="button" aria-label="Move down" disabled={index === count - 1} onClick={() => onMove(1)} className={buttonClass("ghost", "icon")}>
            <ArrowDown size={16} aria-hidden />
          </button>
          <button type="button" aria-label="Remove line" disabled={count === 1} onClick={onRemove} className={buttonClass("ghost", "icon") + " text-red-700"}>
            <Trash2 size={16} aria-hidden />
          </button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-[1fr_11rem]">
        <Field label="Item">
          <input
            list="saved-items"
            value={line.name}
            onChange={(e) => onName(e.target.value)}
            placeholder="e.g. Sliding window, 2 panel"
            className={inputClass}
          />
        </Field>
        <Field label="Priced">
          <select
            value={line.unit}
            onChange={(e) => onChange({ unit: e.target.value as LineDraft["unit"] })}
            className={inputClass}
          >
            {UNITS.map((unit) => (
              <option key={unit} value={unit}>
                {UNIT_NAME[unit]}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {line.unit === "sqft" && (
          <>
            {dims("Width", "widthFt", "widthIn")}
            {dims("Height", "heightFt", "heightIn")}
          </>
        )}
        {line.unit === "rft" && <div className="col-span-2">{dims("Length", "lengthFt", "lengthIn")}</div>}
        {line.unit !== "lumpsum" && (
          <Field label="Qty">
            <input inputMode="decimal" value={line.qty} onChange={set("qty")} className={inputClass} />
          </Field>
        )}
        <Field label={rateLabel}>
          <input inputMode="decimal" value={line.rate} onChange={set("rate")} placeholder="0" className={inputClass} />
        </Field>
      </div>

      <Field label="Details (optional)" className="mt-3">
        <input
          value={line.description}
          onChange={set("description")}
          placeholder="Thickness, colour, profile…"
          className={inputClass}
        />
      </Field>

      <div className="mt-3 flex items-center justify-between border-t border-border pt-2 text-sm">
        <span className="text-ink-muted">
          {line.unit === "sqft" && parsed.widthIn && parsed.heightIn
            ? `${areaSqft(parsed.widthIn, parsed.heightIn).toFixed(2)} sq ft${parsed.qty !== 1 ? " each" : ""}`
            : line.unit === "rft" && parsed.lengthIn
              ? `${lengthFt(parsed.lengthIn).toFixed(2)} rft${parsed.qty !== 1 ? " each" : ""}`
              : ""}
        </span>
        <span className="font-semibold tabular-nums">{formatRs(amount)}</span>
      </div>
    </li>
  );
}
