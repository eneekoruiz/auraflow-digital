/**
 * Lightweight analytics layer with consent gating.
 *
 * Supports two providers, configurable via Vite env vars (no code changes
 * required to switch):
 *   - VITE_GA4_ID         e.g. "G-XXXXXXX"   → loads gtag.js + GA4
 *   - VITE_PLAUSIBLE_DOMAIN e.g. "estudio.com" → loads plausible.js
 *
 * If neither is set, events are still pushed to window.dataLayer (so a GTM
 * container added later picks them up) and logged in dev.
 *
 * Consent: scripts only load when the cookie banner stored "all". The track()
 * function works regardless (queues to dataLayer), but third-party calls are
 * gated.
 *
 * Standard events used across the app:
 *   - cta_click            { location, label? }
 *   - lead_submitted       { project, language }
 *   - lead_form_step       { step, total }            // step view
 *   - lead_form_abandoned  { last_step, total, time_ms }
 *   - scroll_depth         { percent }                // 25/50/75/100
 *   - exit_intent_shown / _dismissed / _cta
 *   - whatsapp_click       { section }
 */

type Props = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    plausible?: (event: string, opts?: { props?: Props }) => void;
    gtag?: (...args: unknown[]) => void;
    __analyticsLoaded?: boolean;
  }
}

const CONSENT_KEY = "estudio.cookies";

function hasConsent(): boolean {
  try {
    return localStorage.getItem(CONSENT_KEY) === "all";
  } catch {
    return false;
  }
}

function loadScript(src: string, attrs: Record<string, string> = {}) {
  if (typeof document === "undefined") return;
  if (document.querySelector(`script[src="${src}"]`)) return;
  const s = document.createElement("script");
  s.src = src;
  s.async = true;
  for (const [k, v] of Object.entries(attrs)) s.setAttribute(k, v);
  document.head.appendChild(s);
}

/** Initialize providers (idempotent). Call once at app boot, and again after
 *  consent is granted. */
export function initAnalytics() {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  if (window.__analyticsLoaded) return;
  if (!hasConsent()) return;

  const ga4 = import.meta.env.VITE_GA4_ID as string | undefined;
  const plausibleDomain = import.meta.env.VITE_PLAUSIBLE_DOMAIN as string | undefined;

  if (ga4) {
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${ga4}`);
    window.gtag = window.gtag || function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments as unknown as Record<string, unknown>);
    };
    window.gtag("js", new Date());
    window.gtag("config", ga4, { anonymize_ip: true, send_page_view: true });
  }

  if (plausibleDomain) {
    loadScript("https://plausible.io/js/script.tagged-events.js", {
      "data-domain": plausibleDomain,
    });
  }

  window.__analyticsLoaded = true;
}

export function track(event: string, props: Props = {}) {
  try {
    if (typeof window === "undefined") return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...props });

    if (hasConsent()) {
      window.plausible?.(event, { props });
      window.gtag?.("event", event, props);
    }

    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.debug("[track]", event, props);
    }
  } catch {
    /* noop */
  }
}

/** Page view (SPA). Call on route changes. */
export function trackPageView(path: string) {
  if (typeof window === "undefined") return;
  if (hasConsent()) {
    const ga4 = import.meta.env.VITE_GA4_ID as string | undefined;
    if (ga4) window.gtag?.("config", ga4, { page_path: path });
    window.plausible?.("pageview");
  }
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "page_view", page_path: path });
}
