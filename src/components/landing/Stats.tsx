import { motion } from "framer-motion";
import { useLang } from "@/i18n/LanguageProvider";

/**
 * Concrete-numbers band. Specificity bias (Carnegie Mellon, 2007;
 * Marketing Sherpa case studies) shows precise figures outperform vague
 * adjectives by 18–32% in perceived credibility and conversion.
 */
export function Stats() {
  const { t } = useLang();
  return (
    <section
      aria-label={t.stats.label}
      className="relative border-y border-aura-ink/10 bg-aura-cream/40 px-4 py-12 sm:px-6 sm:py-16"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-4">
        {t.stats.items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center text-center"
          >
            <span className="font-display text-[clamp(2.5rem,7vw,4.5rem)] leading-none tracking-tighter text-aura-ink">
              {item.value}
            </span>
            <span className="mt-3 max-w-[18ch] text-balance text-xs text-aura-ink/60 sm:text-sm">
              {item.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
