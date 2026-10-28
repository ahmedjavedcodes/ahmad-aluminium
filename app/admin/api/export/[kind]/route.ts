import { NextResponse } from "next/server";
import { isSignedIn } from "@/lib/billing/auth";
import { collections, getDb } from "@/lib/billing/db";
import { todayPk } from "@/lib/billing/dates";

/* CSV export for backup or the accountant (L-3). A UTF-8 BOM makes Excel
 * read names correctly. */

type Cell = string | number | null | undefined;

function csv(header: string[], rows: Cell[][]): string {
  const escape = (value: Cell) => {
    const text = value == null ? "" : String(value);
    return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
  };
  return "﻿" + [header, ...rows].map((row) => row.map(escape).join(",")).join("\r\n");
}

export async function GET(_request: Request, { params }: { params: Promise<{ kind: string }> }) {
  if (!(await isSignedIn())) return NextResponse.json({ error: "Sign in first." }, { status: 401 });
  const { kind } = await params;
  const c = collections(await getDb());
  let body: string;

  switch (kind) {
    case "quotations": {
      const docs = await c.quotations.find().sort({ createdAt: 1 }).toArray();
      body = csv(
        ["Number", "Date", "Valid until", "Status", "Customer", "Phone", "Subtotal", "Discount", "Tax", "Total", "Invoice"],
        docs.map((d) => [d.number, d.issueDate, d.validUntil, d.status, d.customer.name, d.customer.phone, d.subtotal, d.discountAmount, d.taxAmount, d.total, d.invoiceNumber]),
      );
      break;
    }
    case "invoices": {
      const docs = await c.invoices.find().sort({ createdAt: 1 }).toArray();
      body = csv(
        ["Number", "Date", "Due date", "Status", "Customer", "Phone", "Subtotal", "Discount", "Tax", "Total", "Paid", "Balance", "Quotation"],
        docs.map((d) => [d.number, d.issueDate, d.dueDate, d.status, d.customer.name, d.customer.phone, d.subtotal, d.discountAmount, d.taxAmount, d.total, d.amountPaid, d.total - d.amountPaid, d.quotationNumber]),
      );
      break;
    }
    case "payments": {
      const docs = await c.invoices.find({ "payments.0": { $exists: true } }).sort({ createdAt: 1 }).toArray();
      body = csv(
        ["Invoice", "Customer", "Date", "Amount", "Method", "Reference"],
        docs.flatMap((d) => d.payments.map((p) => [d.number, d.customer.name, p.date, p.amount, p.method, p.reference])),
      );
      break;
    }
    case "customers": {
      const docs = await c.customers.find().sort({ name: 1 }).toArray();
      body = csv(
        ["Name", "Phone", "Company", "Address", "Email", "Notes"],
        docs.map((d) => [d.name, d.phone, d.company, d.address, d.email, d.notes]),
      );
      break;
    }
    default:
      return NextResponse.json({ error: "Unknown export." }, { status: 404 });
  }

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${kind}-${todayPk()}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
