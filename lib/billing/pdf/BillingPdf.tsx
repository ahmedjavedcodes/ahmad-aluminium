import { Document, Font, Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { amountInWords, formatQty, formatRate, formatRs, measureText, UNIT_LABEL } from "../calc";
import { formatDate } from "../dates";
import { brandImageUrl } from "../images";
import type { PdfPayload } from "../types";

/* A4 layout from the PRD: header · customer and dates · line items · totals ·
 * terms and bank details · company stamp · footer. Quotations and invoices
 * share it; only the title, number and date labels differ. */

// Never split words across lines: names like "FABRICATION" must stay whole.
Font.registerHyphenationCallback((word) => [word]);

const ACCENT = "#9a4513";
const INK = "#1c1a16";
const MUTED = "#5c554a";
const RULE = "#e4ddd0";
const TINT = "#f3eee4";

const s = StyleSheet.create({
  page: { paddingTop: 36, paddingBottom: 56, paddingHorizontal: 40, fontSize: 9, color: INK, fontFamily: "Helvetica" },
  row: { flexDirection: "row" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  brand: { flexDirection: "row", gap: 10, maxWidth: 330 },
  logo: { width: 56, height: 56, objectFit: "contain" },
  tradingName: { fontSize: 14, fontFamily: "Helvetica-Bold" },
  legalName: { fontSize: 7.5, color: MUTED, marginTop: 2 },
  small: { fontSize: 8, color: MUTED, marginTop: 1.5 },
  titleBlock: { alignItems: "flex-end" },
  title: { fontSize: 18, fontFamily: "Helvetica-Bold", color: ACCENT, letterSpacing: 1 },
  number: { fontSize: 10, marginTop: 4 },
  divider: { borderBottomWidth: 1, borderBottomColor: RULE, marginVertical: 14 },
  label: { fontSize: 7.5, color: MUTED, fontFamily: "Helvetica-Bold", textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 3 },
  billTo: { flexGrow: 1, paddingRight: 20 },
  customerName: { fontSize: 11, fontFamily: "Helvetica-Bold" },
  dates: { width: 190 },
  dateRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 3 },
  table: { marginTop: 16 },
  th: { flexDirection: "row", backgroundColor: TINT, paddingVertical: 5, paddingHorizontal: 6 },
  thText: { fontSize: 7.5, fontFamily: "Helvetica-Bold", color: ACCENT, textTransform: "uppercase" },
  tr: { flexDirection: "row", paddingVertical: 6, paddingHorizontal: 6, borderBottomWidth: 0.75, borderBottomColor: RULE },
  cNo: { width: 20 },
  cDesc: { flexGrow: 1, flexBasis: 0, paddingRight: 8 },
  cQty: { width: 34, textAlign: "right" },
  cUnit: { width: 46, textAlign: "right" },
  cRate: { width: 60, textAlign: "right" },
  cAmount: { width: 72, textAlign: "right" },
  itemName: { fontFamily: "Helvetica-Bold" },
  itemNote: { fontSize: 8, color: MUTED, marginTop: 2 },
  totalsWrap: { flexDirection: "row", justifyContent: "space-between", marginTop: 12 },
  words: { flexGrow: 1, flexBasis: 0, paddingRight: 24, paddingTop: 2 },
  wordsText: { fontFamily: "Helvetica-Oblique", fontSize: 8.5 },
  totals: { width: 210 },
  totalRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 2.5 },
  grandRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 5, marginTop: 3, borderTopWidth: 1, borderTopColor: INK },
  grand: { fontSize: 11, fontFamily: "Helvetica-Bold" },
  section: { marginTop: 18 },
  body: { fontSize: 8.5, lineHeight: 1.45, color: INK },
  // Grows into whatever is left of the last page and holds the closing block at
  // its foot. Unbreakable, so when the block spills over it does so as a whole
  // and grows again on the new page, instead of landing at that page's top.
  closingArea: { flexGrow: 1, justifyContent: "flex-end" },
  closing: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", marginTop: 18 },
  closingText: { flexGrow: 1, flexBasis: 0, paddingRight: 24 },
  stampBox: { width: 180, alignItems: "center" },
  stamp: { width: 120, height: 120, objectFit: "contain" },
  stampLine: { width: 180, borderTopWidth: 0.75, borderTopColor: MUTED, marginTop: 4, paddingTop: 3 },
  stampName: { fontSize: 7.5, color: MUTED, textAlign: "center", lineHeight: 1.3 },
  footer: { position: "absolute", bottom: 24, left: 40, right: 40, flexDirection: "row", justifyContent: "space-between", fontSize: 7.5, color: MUTED, borderTopWidth: 0.75, borderTopColor: RULE, paddingTop: 6 },
  watermark: { position: "absolute", top: 330, left: 0, right: 0, textAlign: "center", fontSize: 96, fontFamily: "Helvetica-Bold", color: "#000000", opacity: 0.06, transform: "rotate(-30deg)" },
});

/** "NAME ( SMC-PRIVATE ) LIMITED" → ["NAME", "(SMC-PRIVATE) LIMITED"]: the company
 * type gets its own line under the stamp instead of wrapping mid-bracket. */
function signatureLines(name: string): string[] {
  const at = name.indexOf("(");
  if (at <= 0) return [name];
  const suffix = name.slice(at).replace(/\(\s+/g, "(").replace(/\s+\)/g, ")").trim();
  return [name.slice(0, at).trim(), suffix];
}

export function BillingPdf({ kind, doc, settings }: PdfPayload) {
  const isInvoice = kind === "invoice";
  const isDraft = doc.status === "draft";
  const title = isInvoice ? "INVOICE" : "QUOTATION";
  const endLabel = isInvoice ? "Due date" : "Valid until";
  const endDate = "dueDate" in doc ? doc.dueDate : doc.validUntil;
  const amountPaid = "amountPaid" in doc ? doc.amountPaid : 0;
  const contact = [settings.phone, settings.email].filter(Boolean).join("  ·  ");

  return (
    <Document title={`${doc.number} — ${doc.customer.name}`} author={settings.legalName || settings.tradingName}>
      <Page size="A4" style={s.page}>
        {isDraft && (
          <Text style={s.watermark} fixed>
            DRAFT
          </Text>
        )}

        {/* Header */}
        <View style={s.header}>
          <View style={s.brand}>
            {settings.logo && <Image style={s.logo} src={brandImageUrl(settings.logo.url, 300)} />}
            <View>
              <Text style={s.tradingName}>{settings.tradingName}</Text>
              {settings.legalName ? <Text style={s.legalName}>{settings.legalName}</Text> : null}
              {settings.address ? <Text style={s.small}>{settings.address}</Text> : null}
              {contact ? <Text style={s.small}>{contact}</Text> : null}
              {settings.ntn ? <Text style={s.small}>NTN: {settings.ntn}</Text> : null}
            </View>
          </View>
          <View style={s.titleBlock}>
            <Text style={s.title}>{title}</Text>
            <Text style={s.number}>{doc.number}</Text>
          </View>
        </View>

        <View style={s.divider} />

        {/* Customer and dates */}
        <View style={s.row}>
          <View style={s.billTo}>
            <Text style={s.label}>Bill to</Text>
            <Text style={s.customerName}>{doc.customer.name}</Text>
            {doc.customer.company ? <Text style={s.small}>{doc.customer.company}</Text> : null}
            {doc.customer.phone ? <Text style={s.small}>{doc.customer.phone}</Text> : null}
            {doc.customer.address ? <Text style={s.small}>{doc.customer.address}</Text> : null}
            {doc.customer.email ? <Text style={s.small}>{doc.customer.email}</Text> : null}
          </View>
          <View style={s.dates}>
            <View style={s.dateRow}>
              <Text style={{ color: MUTED }}>Date</Text>
              <Text>{formatDate(doc.issueDate)}</Text>
            </View>
            <View style={s.dateRow}>
              <Text style={{ color: MUTED }}>{endLabel}</Text>
              <Text>{formatDate(endDate)}</Text>
            </View>
            {"quotationNumber" in doc && doc.quotationNumber ? (
              <View style={s.dateRow}>
                <Text style={{ color: MUTED }}>Quotation</Text>
                <Text>{doc.quotationNumber}</Text>
              </View>
            ) : null}
          </View>
        </View>

        {/* Line items — the header row repeats on every page */}
        <View style={s.table}>
          <View style={s.th} fixed>
            <Text style={[s.thText, s.cNo]}>#</Text>
            <Text style={[s.thText, s.cDesc]}>Description</Text>
            <Text style={[s.thText, s.cQty]}>Qty</Text>
            <Text style={[s.thText, s.cUnit]}>Unit</Text>
            <Text style={[s.thText, s.cRate]}>Rate</Text>
            <Text style={[s.thText, s.cAmount]}>Amount</Text>
          </View>
          {doc.lines.map((line, i) => {
            const measure = measureText(line);
            return (
              <View key={line.id} style={s.tr} wrap={false}>
                <Text style={s.cNo}>{i + 1}</Text>
                <View style={s.cDesc}>
                  <Text style={s.itemName}>{line.name}</Text>
                  {measure ? <Text style={s.itemNote}>{measure}</Text> : null}
                  {line.description ? <Text style={s.itemNote}>{line.description}</Text> : null}
                </View>
                <Text style={s.cQty}>{line.unit === "lumpsum" ? "" : formatQty(line.qty)}</Text>
                <Text style={s.cUnit}>{UNIT_LABEL[line.unit]}</Text>
                <Text style={s.cRate}>{line.unit === "lumpsum" ? "" : formatRate(line.rate)}</Text>
                <Text style={s.cAmount}>{line.amount.toLocaleString("en-US")}</Text>
              </View>
            );
          })}
        </View>

        {/* Totals stay together */}
        <View style={s.totalsWrap} wrap={false}>
          <View style={s.words}>
            <Text style={s.label}>Amount in words</Text>
            <Text style={s.wordsText}>{amountInWords(doc.total)}</Text>
          </View>
          <View style={s.totals}>
            <View style={s.totalRow}>
              <Text>Subtotal</Text>
              <Text>{formatRs(doc.subtotal)}</Text>
            </View>
            {doc.discountAmount > 0 && (
              <View style={s.totalRow}>
                <Text>Discount{doc.discount.type === "percent" ? ` (${doc.discount.value}%)` : ""}</Text>
                <Text>- {formatRs(doc.discountAmount)}</Text>
              </View>
            )}
            {doc.tax.enabled && (
              <View style={s.totalRow}>
                <Text>
                  {doc.tax.label} ({doc.tax.rate}%)
                </Text>
                <Text>{formatRs(doc.taxAmount)}</Text>
              </View>
            )}
            <View style={s.grandRow}>
              <Text style={s.grand}>Total</Text>
              <Text style={s.grand}>{formatRs(doc.total)}</Text>
            </View>
            {isInvoice && amountPaid > 0 && (
              <>
                <View style={s.totalRow}>
                  <Text>Paid</Text>
                  <Text>{formatRs(amountPaid)}</Text>
                </View>
                <View style={s.totalRow}>
                  <Text style={{ fontFamily: "Helvetica-Bold" }}>Balance due</Text>
                  <Text style={{ fontFamily: "Helvetica-Bold" }}>{formatRs(doc.total - amountPaid)}</Text>
                </View>
              </>
            )}
          </View>
        </View>

        {doc.notes ? (
          <View style={s.section} wrap={false}>
            <Text style={s.label}>Notes</Text>
            <Text style={s.body}>{doc.notes}</Text>
          </View>
        ) : null}

        {/* Terms and conditions, bank details and the stamp close the document,
            at the bottom of its last page */}
        <View style={s.closingArea} wrap={false}>
          <View style={s.closing}>
            <View style={s.closingText}>
              {doc.terms ? (
                <View>
                  <Text style={s.label}>Terms and conditions</Text>
                  <Text style={s.body}>{doc.terms}</Text>
                </View>
              ) : null}
              {settings.bankDetails ? (
                <View style={{ marginTop: doc.terms ? 10 : 0 }}>
                  <Text style={s.label}>Bank details</Text>
                  <Text style={s.body}>{settings.bankDetails}</Text>
                </View>
              ) : null}
            </View>
            <View style={s.stampBox}>
              {settings.stamp ? <Image style={s.stamp} src={brandImageUrl(settings.stamp.url, 400)} /> : null}
              <View style={s.stampLine}>
                {signatureLines(settings.legalName || settings.tradingName).map((line) => (
                  <Text key={line} style={s.stampName}>
                    {line}
                  </Text>
                ))}
              </View>
            </View>
          </View>
        </View>

        <View style={s.footer} fixed>
          <Text>{settings.tradingName}</Text>
          <Text render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} />
        </View>
      </Page>
    </Document>
  );
}
