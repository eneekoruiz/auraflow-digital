import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Globe } from "lucide-react";
import { useLang } from "@/i18n/LanguageProvider";
import { Logo } from "./Logo";
import { MagneticButton } from "@/components/effects/MagneticButton";
import { LANGUAGES } from "@/i18n/dictionary";
import { MotionToggle } from "@/components/effects/MotionToggle";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Nav() {
  const { t, lang, setLang } = useLang();
  const [shown, setShown] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const current = LANGUAGES.find((l) => l.code === lang);

  return (
    <AnimatePresence>
      {shown && (
        <motion.header
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="fixed inset-x-0 top-4 z-50 mx-auto flex w-[min(96%,1180px)] items-center justify-between rounded-full glass px-4 py-2.5 md:px-6"
        >
          <Logo />

          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            <a href="#services" className="story-link">{t.nav.services}</a>
            <a href="#process" className="story-link">{t.nav.process}</a>
            <a href="#faq" className="story-link">{t.nav.faq}</a>
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            {/* Reduce-motion toggle */}
            <MotionToggle tone="light" className="hidden sm:inline-flex" />

            {/* Language dropdown */}
            <div ref={ref} className="relative">
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-haspopup="listbox"
                className="inline-flex items-center gap-1.5 rounded-full border border-aura-ink/10 bg-white/60 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-aura-ink/80 backdrop-blur transition-colors hover:bg-white/80"
              >
                <Globe className="h-3.5 w-3.5" />
                <span>{current?.code}</span>
                <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} />
              </button>

              <AnimatePresence>
                {open && (
                  <motion.div
                    role="listbox"
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.97 }}
                    transition={{ duration: 0.25, ease: EASE }}
                    className="glass absolute right-0 mt-3 max-h-[60vh] w-64 origin-top-right overflow-y-auto rounded-2xl p-2 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)]"
                  >
                    {LANGUAGES.map((l) => {
                      const active = l.code === lang;
                      return (
                        <button
                          key={l.code}
                          type="button"
                          role="option"
                          aria-selected={active}
                          onClick={() => {
                            setLang(l.code);
                            setOpen(false);
                          }}
                          className={cn(
                            "flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left text-sm transition-colors",
                            active ? "bg-aura-ink text-white" : "text-aura-ink/80 hover:bg-aura-ink/5",
                          )}
                        >
                          <span className="flex items-center gap-3">
                            <span className="text-base leading-none">{l.flag}</span>
                            <span className="font-medium">{l.label}</span>
                          </span>
                          <span className="flex items-center gap-2">
                            <span className={cn("text-[10px] uppercase tracking-widest", active ? "text-white/60" : "text-aura-ink/40")}>
                              {l.code}
                            </span>
                            {active && <Check className="h-3.5 w-3.5" />}
                          </span>
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <MagneticButton variant="dark" className="hidden px-5 py-2.5 text-sm sm:inline-flex" asLink href="#contact">
              {t.nav.cta}
            </MagneticButton>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
