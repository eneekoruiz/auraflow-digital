/**
 * Minimal, dependency-free analytics. Pushes to window.dataLayer (GA/GTM
 * compatible) and to window.plausible if present. Falls back to console in dev.
 *
 * Why: research consistently shows that funnel-instrumented landings iterate
 * 2-4× faster on conversion. We want the events in place from day one.
 */
type Props = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    plausible?: (event: string, opts?: { props?: Props }) => void;
  }
}

export function track(event: string, props: Props = {}) {
  try {
    if (typeof window === "undefined") return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...props });
    window.plausible?.(event, { props });
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.debug("[track]", event, props);
    }
  } catch {
    /* noop */
  }
}
