import { LoadingScreen } from "@/components/LoadingScreen";

/**
 * Shown while a marketing page streams in after a navigation. Static pages are
 * prefetched in production, so this mostly appears on slow connections (and in
 * `next dev`, where each route compiles on its first visit).
 */
export default function Loading() {
  return <LoadingScreen className="min-h-dvh" />;
}
