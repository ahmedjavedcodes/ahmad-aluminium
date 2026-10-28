import { LoadingScreen } from "@/components/LoadingScreen";

/**
 * Shown in the content area, between the header and the tab bar, while a
 * billing screen loads its data.
 *
 * A loading.tsx only wraps its own folder's child segments, so this covers
 * switching sections; the re-exports in customers/, invoices/, quotations/ and
 * their [id]/ folders cover list → detail and detail → edit.
 */
export default function Loading() {
  return <LoadingScreen className="min-h-[60vh]" />;
}
