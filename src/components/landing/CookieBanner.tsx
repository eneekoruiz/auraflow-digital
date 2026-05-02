import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "@/i18n/LanguageProvider";

const EASE = [0.22, 1, 0.36, 1] as const;
const KEY = "estudio.cookies";

export function CookieBanner() {
  const { t } = useLang();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      try {
        if (!localStorage.getItem(KEY)) setShow(true);
      } catch { setShow(true); }
    }, 1800);
    return () => clearTimeout(t);
  }, []);

  const decide = (value: "all" | "essential") => {
    try { localStorage.setItem(KEY, value); } catch { /* noop */ }
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="dialog"
          aria-label="Cookies"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="fixed inset-x-0 bottom-4 z-40 mx-auto flex w-[min(94%,640px)] flex-col items-start gap-4 rounded-3xl glass p-5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.3)] sm:flex-row sm:items-center sm:gap-6"
        >
          <div className="flex-1">
            <p className="mb-1 font-display text-base text-aura-ink">{t.cookies.title}</p>
            <p className="text-sm text-aura-ink/65">{t.cookies.body}</p>
          </div>
          <div className="flex w-full items-center gap-2 sm:w-auto">
            <button
              type="button"
              onClick={() => decide("essential")}
              className="flex-1 rounded-full px-4 py-2 text-sm text-aura-ink/70 transition-colors hover:bg-aura-ink/5 sm:flex-initial"
            >
              {t.cookies.configure}
            </button>
            <button
              type="button"
              onClick={() => decide("all")}
              className="flex-1 rounded-full bg-aura-ink px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-aura-ink/90 sm:flex-initial"
            >
              {t.cookies.accept}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
