import { useLang } from "@/i18n/LanguageProvider";
import { Logo } from "./Logo";
import { LANGUAGES } from "@/i18n/dictionary";
import { MotionToggle } from "@/components/effects/MotionToggle";

export function Footer() {
  const { t, lang, setLang } = useLang();
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-white/10 bg-aura-ink px-6 py-12 text-white/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Logo invert />
          <p className="text-sm text-white/50">{t.footer.tagline}</p>
        </div>

        <nav className="flex flex-wrap items-center gap-6 text-sm">
          <a href="#services" className="story-link">{t.nav.services}</a>
          <a href="#process" className="story-link">{t.nav.process}</a>
          <a href="#faq" className="story-link">{t.nav.faq}</a>
        </nav>

        <div className="flex flex-wrap items-center gap-3">
          <MotionToggle tone="dark" />
          <label htmlFor="footer-lang" className="sr-only">
            {t.footer.lang}
          </label>
          <select
            id="footer-lang"
            value={lang}
            onChange={(e) => setLang(e.target.value as typeof lang)}
            className="rounded-full border border-white/20 bg-transparent px-3 py-1.5 text-xs uppercase tracking-wide text-white outline-none transition-colors hover:border-white/40"
          >
            {LANGUAGES.map((l) => (
              <option key={l.code} value={l.code} className="bg-aura-ink text-white">
                {l.flag} {l.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl border-t border-white/10 pt-6 text-xs text-white/40">
        © {year} · {t.footer.rights}
      </div>
    </footer>
  );
}
