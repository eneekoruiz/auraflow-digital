import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/i18n/LanguageProvider";
import { track } from "@/lib/analytics";

/**
 * Mobile-only sticky CTA bar. Appears after the user scrolls past the hero.
 * Sticky CTAs on mobile lift contact-form completion 15-25% in services
 * landings (Unbounce CRO benchmarks, Hotjar mobile UX research).
 */
export function StickyMobileCTA() {
  const { t } = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const past = window.scrollY > window.innerHeight * 0.9;
      const nearContact = (() => {
        const el = document.getElementById("contact");
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top < window.innerHeight * 1.2;
      })();
      setVisible(past && !nearContact);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-3 bottom-3 z-30 sm:hidden"
        >
          <a
            href="#contact"
            onClick={() => track("cta_click", { location: "sticky_mobile" })}
            className="flex items-center justify-between gap-3 rounded-full bg-aura-ink px-5 py-3.5 text-sm font-medium text-white shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)]"
          >
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse-soft rounded-full bg-aura-peach" />
              {t.stickyCta}
            </span>
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
