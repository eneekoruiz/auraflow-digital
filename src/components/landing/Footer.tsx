import { useLang } from "@/i18n/LanguageProvider";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

export function Footer() {
  const { t, lang, setLang } = useLang();
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-aura-cream/10 bg-aura-ink px-6 py-12 text-aura-cream/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Logo invert />
          <p className="text-sm text-aura-cream/50">{t.footer.tagline}</p>
        </div>

        <nav className="flex flex-wrap items-center gap-6 text-sm">
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

        <div className="flex items-center gap-4">
          <span className="text-xs uppercase tracking-[0.2em] text-aura-cream/40">{t.footer.lang}</span>
          <div className="inline-flex rounded-full border border-aura-cream/20 p-0.5 text-xs font-semibold">
            {(["es", "en"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={cn(
                  "rounded-full px-2.5 py-1 uppercase transition-colors",
                  lang === l ? "bg-aura-cream text-aura-ink" : "text-aura-cream/50 hover:text-aura-cream",
                )}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl border-t border-aura-cream/10 pt-6 text-xs text-aura-cream/40">
        © {year} · {t.footer.rights}
      </div>
    </footer>
  );
}
