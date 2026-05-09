import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { useLang } from "@/i18n/LanguageProvider";

// Pure CSS monogram palette — semantic tokens kept for theme coherence.
const monograms = [
  { bg: "bg-aura-peach/25", ring: "ring-aura-peach/40", text: "text-aura-ink" },
  { bg: "bg-aura-lavender/30", ring: "ring-aura-lavender/50", text: "text-aura-ink" },
  { bg: "bg-aura-ink/10", ring: "ring-aura-ink/20", text: "text-aura-ink" },
];

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");

/**
 * Typography-only testimonials. Initials inside a soft CSS shape replace
 * portrait photos — keeps perceived trust (name + role + 5★ rating remain,
 * which are the strongest credibility signals per Nielsen 2020 trust study)
 * while reinforcing the brand's minimal, editorial aesthetic.
 */
export function Testimonials() {
  const { t } = useLang();
  return (
    <section className="relative px-4 py-20 sm:px-6 sm:py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-2xl">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-aura-ink/40">— {t.testimonials.label}</p>
          <h2 className="text-balance font-display text-[clamp(2rem,7vw,4.5rem)] leading-[0.95] tracking-tighter text-aura-ink">
            {t.testimonials.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {t.testimonials.items.map((item, i) => (
            <motion.figure
              key={item.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex flex-col rounded-3xl border border-aura-ink/10 bg-white/60 p-7 backdrop-blur-xl transition-shadow duration-500 hover:shadow-[0_30px_70px_-30px_rgba(0,0,0,0.18)] sm:p-8"
            >
              <Quote className="mb-5 h-6 w-6 text-aura-peach" aria-hidden />
              <blockquote className="mb-8 flex-1 text-balance text-base leading-relaxed text-aura-ink/85 sm:text-lg">
                "{item.quote}"
              </blockquote>
              <div className="flex items-center gap-1 pb-4 text-aura-peach">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-3.5 w-3.5 fill-current" aria-hidden />
                ))}
              </div>
              <figcaption className="flex items-center gap-3 border-t border-aura-ink/10 pt-5">
                <span
                  aria-hidden
                  className={`flex h-12 w-12 items-center justify-center rounded-full font-display text-base tracking-tight ring-1 ${monograms[i % monograms.length].bg} ${monograms[i % monograms.length].ring} ${monograms[i % monograms.length].text}`}
                >
                  {initials(item.name)}
                </span>
                <div className="leading-tight">
                  <div className="font-medium text-aura-ink">{item.name}</div>
                  <div className="text-xs text-aura-ink/50">{item.role}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
