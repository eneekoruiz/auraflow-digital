import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useLang } from "@/i18n/LanguageProvider";
import { MagneticButton } from "@/components/effects/MagneticButton";
import { track } from "@/lib/analytics";

const KEY = "estudio.exit.shown";
const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Exit-intent capture. Triggered once per user when the cursor leaves the top
 * of the viewport (desktop) or after deep scroll + idle (mobile fallback).
 * Exit-intent overlays recover 5–15% of abandoning visitors in published CRO
 * benchmarks (Sleeknote, OptinMonster) when the offer is genuinely valuable.
 */
export function ExitIntent() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let shown = false;
    try { shown = !!sessionStorage.getItem(KEY); } catch { /* noop */ }
    if (shown) return;

    const trigger = () => {
      try { sessionStorage.setItem(KEY, "1"); } catch { /* noop */ }
      setOpen(true);
      track("exit_intent_shown");
      cleanup();
    };

    const onMouseOut = (e: MouseEvent) => {
      if (e.relatedTarget === null && e.clientY <= 4) trigger();
    };

    // Mobile fallback: when the page becomes hidden after some engagement
    let scrolled = 0;
    const onScroll = () => { scrolled = Math.max(scrolled, window.scrollY); };
    const onVisibility = () => {
      if (document.visibilityState === "hidden" && scrolled > window.innerHeight * 1.5) {
        trigger();
      }
    };

    const armTimer = window.setTimeout(() => {
      document.addEventListener("mouseout", onMouseOut);
      document.addEventListener("visibilitychange", onVisibility);
      window.addEventListener("scroll", onScroll, { passive: true });
    }, 8000);

    function cleanup() {
      window.clearTimeout(armTimer);
      document.removeEventListener("mouseout", onMouseOut);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("scroll", onScroll);
    }
    return cleanup;
  }, []);

  const close = () => {
    track("exit_intent_dismissed");
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="exit-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-end justify-center bg-aura-ink/40 p-4 backdrop-blur-sm sm:items-center"
          onClick={close}
        >
          <motion.div
            initial={{ y: 60, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-aura-ink/10 bg-white p-7 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)] sm:p-9"
          >
            <button
              type="button"
              onClick={close}
              aria-label={t.exit.dismiss}
              className="absolute right-4 top-4 rounded-full p-2 text-aura-ink/40 transition-colors hover:bg-aura-ink/5 hover:text-aura-ink"
            >
              <X className="h-4 w-4" />
            </button>
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-aura-ink/40">
              — {t.exit.eyebrow}
            </p>
            <h2 id="exit-title" className="mb-4 font-display text-[clamp(1.75rem,5vw,2.5rem)] leading-tight tracking-tight text-aura-ink">
              {t.exit.title}
            </h2>
            <p className="mb-7 text-aura-ink/65">{t.exit.body}</p>
            <div className="flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={close}
                className="rounded-full px-5 py-3 text-sm text-aura-ink/60 transition-colors hover:text-aura-ink"
              >
                {t.exit.dismiss}
              </button>
              <MagneticButton
                asLink
                href="#contact"
                variant="dark"
                className="px-6 py-3 text-sm sm:ml-auto"
                onClick={() => { track("exit_intent_cta"); setOpen(false); }}
              >
                {t.exit.cta}
              </MagneticButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
