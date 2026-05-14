import { useLang } from "@/i18n/LanguageProvider";
import { Logo } from "./Logo";
import { LANGUAGES } from "@/i18n/dictionary";
import { MotionToggle } from "@/components/effects/MotionToggle";

export function Footer() {
  const { t, lang, setLang } = useLang();
  const year = new Date().getFullYear();
  return (
    <footer className="relative isolate overflow-hidden bg-aura-ink px-6 pb-6 pt-10 text-white/50">
      {/* Background Atmosphere */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -bottom-1/4 -left-1/4 h-[60vmax] w-[60vmax] rounded-full opacity-20 blur-[120px] aura-blend-overlay" style={{ background: "hsl(var(--aura-lavender))" }} />
        <div className="absolute -right-1/4 -top-1/4 h-[60vmax] w-[60vmax] rounded-full opacity-10 blur-[120px] aura-blend-overlay" style={{ background: "hsl(var(--aura-peach))" }} />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          {/* Brand Column */}
          <div className="md:col-span-5">
            <div className="flex flex-col gap-6">
              <Logo invert className="scale-110" />
              <p className="max-w-sm text-balance text-sm leading-relaxed text-white/40">
                {t.footer.tagline}
                {t.footer.description}
              </p>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-4 md:col-start-7">
            <h4 className="mb-6 text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">{t.footer.sitemap}</h4>
            <nav className="flex flex-col gap-4">
              {[
                { label: t.nav.services, href: "#services" },
                { label: t.nav.process, href: "#process" },
                { label: t.nav.faq, href: "#faq" },
                { label: t.footer.roi, href: "#roi" },
                { label: t.footer.pricing, href: "#pricing" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="group flex w-fit items-center gap-2 text-sm font-medium text-white/60 transition-all hover:text-white"
                >
                  <span className="h-px w-0 bg-aura-peach transition-all duration-300 group-hover:w-4" />
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Preferences Column */}
          <div className="md:col-span-2">
            <h4 className="mb-6 text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">{t.footer.config}</h4>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <label htmlFor="footer-lang" className="text-[10px] text-white/30 uppercase tracking-widest">{t.footer.lang}</label>
                <select
                  id="footer-lang"
                  value={lang}
                  onChange={(e) => setLang(e.target.value as typeof lang)}
                  className="w-full appearance-none rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-medium text-white/80 outline-none transition-all hover:border-white/20 focus:border-white/30"
                >
                  {LANGUAGES.map((l) => (
                    <option key={l.code} value={l.code} className="bg-aura-ink text-white">
                      {l.flag} {l.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-[10px] text-white/30 uppercase tracking-widest">{t.footer.interface}</span>
                <MotionToggle tone="dark" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-8 md:flex-row">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/20">
            © {year} · {t.footer.rights}
          </p>
          <div className="flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em]">
            <a href="/legal" className="text-white/20 transition-colors hover:text-aura-peach">{t.legal.notice.title}</a>
            <a href="/privacy" className="text-white/20 transition-colors hover:text-aura-peach">{t.footer.privacy}</a>
            <a href="/cookies" className="text-white/20 transition-colors hover:text-aura-peach">{t.footer.cookies}</a>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-white/40 transition-colors hover:text-white"
            >
              {t.footer.backToTop}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
