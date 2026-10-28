/**
 * Emits a schema.org JSON-LD block.
 *
 * `<` is escaped so a stray closing tag inside any content string can never
 * terminate the script element early.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
