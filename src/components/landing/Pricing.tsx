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
    <section id="pricing" className="relative px-4 py-10 sm:px-6 sm:py-12 md:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-2xl">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-aura-ink/40">— {t.pricing.label}</p>
          <h2 className="text-balance font-display text-[clamp(2rem,7vw,4.5rem)] leading-[0.95] tracking-tighter text-aura-ink">
            {t.pricing.title}
          </h2>
          <p className="mt-5 max-w-xl text-aura-ink/65 sm:text-lg">{t.pricing.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {items.map((item, i) => {
            const featured = i === 1;
            return (
              <motion.article
                key={item.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
                className={cn(
                  "relative flex flex-col rounded-3xl border p-7 backdrop-blur-xl transition-shadow duration-500 sm:p-8",
                  featured
                    ? "border-aura-ink/15 bg-aura-ink text-aura-cream shadow-[0_30px_70px_-30px_rgba(0,0,0,0.45)]"
                    : "border-aura-ink/10 bg-white/60 text-aura-ink hover:shadow-[0_30px_70px_-30px_rgba(0,0,0,0.18)]",
                )}
              >
                {featured && (
                  <span className="absolute -top-3 left-7 rounded-full bg-aura-peach px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-aura-ink">
                    {t.pricing.badge}
                  </span>
                )}

                <header className="mb-6">
                  <h3 className={cn("font-display text-2xl tracking-tight", featured ? "text-aura-cream" : "text-aura-ink")}>
                    {item.name}
                  </h3>
                  <p className={cn("mt-1 text-sm", featured ? "text-aura-cream/60" : "text-aura-ink/55")}>
                    {item.tagline}
                  </p>
                </header>

                <div className="mb-7">
                  {item.price !== t.pricing.items[2].price && (
                    <span className={cn("mr-1.5 text-xs uppercase tracking-[0.2em]", featured ? "text-aura-cream/50" : "text-aura-ink/45")}>
                      {t.pricing.from}
                    </span>
                  )}
                  <span className={cn("font-display text-[clamp(2rem,5vw,3rem)] leading-none tracking-tight", featured ? "text-aura-cream" : "text-aura-ink")}>
                    {item.price}
                  </span>
                </div>

                <ul className="mb-8 flex-1 space-y-3">
                  {item.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <Check
                        className={cn("mt-0.5 h-4 w-4 shrink-0", featured ? "text-aura-peach" : "text-aura-ink/70")}
                        aria-hidden
                      />
                      <span className={featured ? "text-aura-cream/85" : "text-aura-ink/80"}>{f}</span>
                    </li>
                  ))}
                </ul>

                <MagneticButton
                  asLink
                  href="#contact"
                  variant={featured ? "light" : "dark"}
                  className="w-full justify-center px-6 py-3.5 text-sm"
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
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mt-10 grid grid-cols-1 items-center gap-6 rounded-3xl border border-aura-ink/10 bg-gradient-to-br from-aura-peach/15 via-white/40 to-aura-lavender/20 p-8 backdrop-blur-xl sm:p-10 md:grid-cols-[auto_1fr] md:gap-10"
        >
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-aura-ink text-aura-cream">
            <ShieldCheck className="h-6 w-6" aria-hidden />
          </span>
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.3em] text-aura-ink/45">— {t.pricing.promise.label}</p>
            <h3 className="text-balance font-display text-[clamp(1.5rem,4vw,2.25rem)] leading-tight tracking-tight text-aura-ink">
              {t.pricing.promise.title}
            </h3>
            <p className="mt-3 max-w-2xl text-aura-ink/70">{t.pricing.promise.body}</p>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
