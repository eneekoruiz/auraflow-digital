import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "@/i18n/LanguageProvider";
import { Logo } from "./Logo";
import { MagneticButton } from "@/components/effects/MagneticButton";
import { cn } from "@/lib/utils";

export function Nav() {
  const { t, lang, setLang } = useLang();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {shown && (
        <motion.header
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 top-4 z-50 mx-auto flex w-[min(96%,1180px)] items-center justify-between rounded-full glass px-4 py-2.5 md:px-6"
        >
          <Logo />

          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            <a href="#services" className="story-link">
              {t.nav.services}
            </a>
            <a href="#process" className="story-link">
              {t.nav.process}
            </a>
            <a href="#faq" className="story-link">
              {t.nav.faq}
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <div
              role="group"
              aria-label="Language"
              className="hidden items-center rounded-full border border-aura-ink/10 p-0.5 text-xs font-semibold sm:flex"
            >
              {(["es", "en"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={cn(
                    "rounded-full px-2.5 py-1 uppercase transition-colors",
                    lang === l ? "bg-aura-ink text-aura-cream" : "text-aura-ink/60 hover:text-aura-ink",
                  )}
                  aria-pressed={lang === l}
                >
                  {l}
                </button>
              ))}
            </div>

            <MagneticButton variant="dark" className="px-5 py-2.5 text-sm" asLink href="#contact">
              {t.nav.cta}
            </MagneticButton>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
