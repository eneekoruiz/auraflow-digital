import { motion } from "framer-motion";
import { useLang } from "@/i18n/LanguageProvider";
import founder from "@/assets/founder.jpg";

/**
 * Founder note. Personal accountability + a real face is one of the
 * strongest trust signals for solo studios and agencies in the SMB segment
 * (Edelman Trust Barometer, NN/g About-page studies).
 */
export function FounderNote() {
  const { t } = useLang();
  return (
    <section className="relative px-4 py-10 sm:px-6 sm:py-16 md:py-20">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 sm:gap-16 md:grid-cols-12 md:gap-24">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-5"
        >
          <div className="relative mx-auto aspect-[4/5] w-full max-w-xs overflow-hidden rounded-[2.5rem] border border-aura-ink/5 sm:max-w-sm md:max-w-none shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)]">
            <img
              src={founder}
              alt={t.founder.name}
              width={640}
              height={800}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-aura-ink/20 to-transparent"
            />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-7"
        >
          <div className="texture-glass relative rounded-[2.5rem] border border-aura-ink/5 bg-white/40 p-8 backdrop-blur-xl sm:p-12">
            <p className="mb-6 text-xs uppercase tracking-[0.4em] text-aura-ink/40">— {t.founder.label}</p>
            <h2 className="mb-8 font-display text-[clamp(2.25rem,6vw,4rem)] leading-[0.9] tracking-tighter text-aura-ink">
              {t.founder.name}
            </h2>
            <p className="text-balance text-base leading-relaxed text-aura-ink/70 sm:text-lg md:text-xl md:leading-relaxed">
              {t.founder.body}
            </p>
            <p className="mt-10 font-display text-2xl tracking-tighter text-aura-ink/40 italic">
              {t.founder.signature}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
