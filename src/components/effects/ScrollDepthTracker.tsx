import { useEffect } from "react";
import { track } from "@/lib/analytics";

const THRESHOLDS = [25, 50, 75, 100];

/**
 * Fires `scroll_depth` events at 25/50/75/100% of page height (each once per
 * session). Standard funnel-engagement signal used by GA4 enhanced
 * measurement and Plausible custom goals.
 */
export function ScrollDepthTracker() {
  useEffect(() => {
    const fired = new Set<number>();
    let ticking = false;

    const compute = () => {
      ticking = false;
      const doc = document.documentElement;
      const scrolled = window.scrollY + window.innerHeight;
      const total = doc.scrollHeight;
      if (total <= 0) return;
      const percent = Math.min(100, Math.round((scrolled / total) * 100));
      for (const t of THRESHOLDS) {
        if (percent >= t && !fired.has(t)) {
          fired.add(t);
          track("scroll_depth", { percent: t });
        }
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(compute);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    compute();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
