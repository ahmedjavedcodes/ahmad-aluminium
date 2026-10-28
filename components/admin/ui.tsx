import clsx from "clsx";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { STATUS_LABEL, STATUS_TONE, type DisplayStatus, type StatusTone } from "@/lib/billing/status";

/* Small presentational pieces shared by the /admin billing screens. Server-safe:
 * no hooks, so both server and client components can use them. */

/** Without a width, for inputs that set their own (w-auto, w-28…). */
export const inputBase =
  "rounded-lg border border-border-strong bg-bg-elevated px-3 py-2.5 text-[15px] text-ink placeholder:text-ink-subtle focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25 disabled:cursor-not-allowed disabled:opacity-60";

export const inputClass = `${inputBase} w-full`;

const BUTTON_VARIANTS = {
  primary: "bg-accent text-on-accent hover:bg-accent-deep",
  secondary: "border border-border-strong bg-bg-elevated text-ink hover:border-accent/50 hover:text-accent",
  ghost: "text-ink-muted hover:bg-surface hover:text-ink",
  danger: "border border-red-700/30 bg-bg-elevated text-red-700 hover:bg-red-50",
};

const BUTTON_SIZES = {
  md: "min-h-11 px-4 py-2.5",
  /** Square, for a button that is only an icon (give it an aria-label). */
  icon: "h-11 w-11 shrink-0",
};

/** Every button in the billing area: one height, one text size, 16px icons. */
export function buttonClass(
  variant: keyof typeof BUTTON_VARIANTS = "secondary",
  size: keyof typeof BUTTON_SIZES = "md",
): string {
  return clsx(
    "focus-ring inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 text-sm",
    BUTTON_SIZES[size],
    BUTTON_VARIANTS[variant],
  );
}

export function Field({
  label,
  hint,
  children,
  className,
}: {
  label: string;
  hint?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={clsx("block", className)}>
      <span className="mb-1.5 block text-[13px] font-semibold text-ink-muted">{label}</span>
      {children}
      {hint ? <span className="mt-1 block text-xs text-ink-subtle">{hint}</span> : null}
    </label>
  );
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <section className={clsx("rounded-xl border border-border bg-bg-elevated p-4 sm:p-5", className)}>
      {children}
    </section>
  );
}

export function CardTitle({ children }: { children: ReactNode }) {
  return <h2 className="mb-3 text-[15px] font-semibold text-ink">{children}</h2>;
}

export function PageHeader({
  title,
  subtitle,
  actions,
  back,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
  back?: { href: string; label: string };
}) {
  return (
    <div className="mb-5">
      {back ? (
        <Link
          href={back.href}
          className="focus-ring mb-2 inline-flex items-center gap-1 text-sm text-ink-muted hover:text-accent"
        >
          <ArrowLeft size={15} aria-hidden />
          {back.label}
        </Link>
      ) : null}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h1 className="font-display text-2xl font-semibold tracking-[-0.01em] text-ink sm:text-3xl">
            {title}
          </h1>
          {subtitle ? <div className="mt-1 text-sm text-ink-muted">{subtitle}</div> : null}
        </div>
        {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
      </div>
    </div>
  );
}

const TONE_CLASS: Record<StatusTone, string> = {
  neutral: "bg-surface text-ink-muted",
  info: "bg-teal-tint text-teal-deep",
  good: "bg-emerald-50 text-emerald-800",
  warn: "bg-amber-50 text-amber-800",
  bad: "bg-red-50 text-red-700",
  accent: "bg-accent-tint text-accent-deep",
};

export function StatusBadge({ status }: { status: DisplayStatus }) {
  return (
    <span
      className={clsx(
        "inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        TONE_CLASS[STATUS_TONE[status]],
      )}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}

export function EmptyState({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="rounded-xl border border-dashed border-border-strong px-5 py-10 text-center">
      <p className="font-semibold text-ink">{title}</p>
      {children ? <div className="mt-2 text-sm text-ink-muted">{children}</div> : null}
    </div>
  );
}

export function ErrorNote({ children }: { children: ReactNode }) {
  return (
    <p role="alert" className="rounded-lg border border-red-700/20 bg-red-50 px-3 py-2 text-sm text-red-800">
      {children}
    </p>
  );
}
