import { motion } from "framer-motion";
import { Check, ShieldCheck } from "lucide-react";
import { useLang } from "@/i18n/LanguageProvider";
import { MagneticButton } from "@/components/effects/MagneticButton";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Three-tier pricing with a single bold "promise" panel underneath.
 * Three options is the documented sweet spot for choice architecture
 * (Iyengar & Lepper, "Choice Overload"): enough to feel choice, few enough
 * to decide. The middle plan is highlighted ("decoy effect", Ariely 2008)
 * to anchor the most desired conversion.
 */
export function Pricing() {
  const { t } = useLang();
  const items = t.pricing.items;

  return (
    <section id="pricing" className="relative px-4 py-10 sm:px-6 sm:py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 w-full">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-aura-ink/40">— {t.pricing.label}</p>
          <h2 className="text-balance font-display text-[clamp(2rem,8vw,4.5rem)] leading-[0.9] tracking-tighter text-aura-ink">
            {t.pricing.title}
          </h2>
          <p className="mt-6 max-w-xl text-balance text-base leading-relaxed text-aura-ink/65 sm:text-lg">
            {t.pricing.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {items.map((item, i) => {
            const featured = i === 1;
            return (
              <motion.article
                key={item.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
                className={cn(
                  "texture-glass relative flex flex-col rounded-[2.5rem] border p-8 backdrop-blur-2xl transition-all duration-500 sm:p-10",
                  featured
                    ? "border-white/10 bg-aura-ink/95 text-aura-cream shadow-[0_40px_100px_-30px_rgba(0,0,0,0.5)]"
                    : "border-aura-ink/5 bg-white/40 text-aura-ink hover:shadow-[0_40px_100px_-30px_rgba(0,0,0,0.15)]",
                )}
              >
                {featured && (
                  <span className="absolute -top-3 left-10 rounded-full bg-aura-peach px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-aura-ink shadow-lg">
                    {t.pricing.badge}
                  </span>
                )}

                <header className="mb-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className={cn("font-display text-lg tracking-tight", featured ? "text-white" : "text-aura-ink")}>
                      {item.name}
                    </h3>
                    <div className="flex flex-col items-end gap-0.5">
                      <div className="flex items-baseline gap-1">
                        {item.price !== t.pricing.items[2].price && (
                          <span className={cn("text-[9px] uppercase tracking-widest opacity-40", featured ? "text-white" : "text-aura-ink")}>
                            {t.pricing.from}
                          </span>
                        )}
                        <span className={cn("font-display text-xl tracking-tighter", featured ? "text-white" : "text-aura-ink")}>
                          {item.price}
                        </span>
                      </div>
                      {item.price !== t.pricing.items[2].price && (
                        <span className={cn("text-[7.5px] font-bold uppercase tracking-[0.2em] opacity-30", featured ? "text-white" : "text-aura-ink")}>
                          IVA incluido
                        </span>
                      )}
                    </div>
                  </div>
                  <p className={cn("mt-2 text-xs font-medium leading-tight opacity-50", featured ? "text-white" : "text-aura-ink")}>
                    {item.tagline}
                  </p>
                </header>

                <ul className="mb-10 flex-1 space-y-3">
                  {item.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <Check
                        className={cn("mt-1 h-4 w-4 shrink-0", featured ? "text-aura-peach" : "text-aura-ink/40")}
                        aria-hidden
                      />
                      <span className={featured ? "text-white/80" : "text-aura-ink/70"}>{f}</span>
                    </li>
                  ))}
                </ul>

                <MagneticButton
                  asLink
                  href="#contact"
                  variant={featured ? "light" : "dark"}
                  className="w-full justify-center px-8 py-4 text-sm font-bold"
                  onClick={() => track("cta_click", { location: "pricing", plan: item.name })}
                >
                  {t.pricing.cta}
                </MagneticButton>
              </motion.article>
            );
          })}
        </div>

        {/* Guarantee / promise — no fine print, single voice */}
        <motion.aside
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mt-6 grid grid-cols-1 items-center gap-4 rounded-2xl border border-aura-ink/5 bg-white/40 p-5 backdrop-blur-xl sm:p-6 md:grid-cols-[auto_1fr] md:gap-8"
        >
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-aura-ink text-aura-cream">
            <ShieldCheck className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <p className="mb-1 text-[10px] uppercase tracking-[0.3em] text-aura-ink/45">— {t.pricing.promise.label}</p>
            <h3 className="text-balance font-display text-lg tracking-tight text-aura-ink sm:text-xl">
              {t.pricing.promise.title}
            </h3>
            <p className="mt-1 text-sm text-aura-ink/70">{t.pricing.promise.body}</p>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
