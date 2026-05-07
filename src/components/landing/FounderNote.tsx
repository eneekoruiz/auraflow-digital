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
    <section className="relative px-4 py-20 sm:px-6 sm:py-28 md:py-32">
      <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-5"
        >
          <div className="relative mx-auto aspect-[4/5] w-full max-w-xs overflow-hidden rounded-[2rem] border border-aura-ink/10 sm:max-w-sm md:max-w-none">
            <img
              src={founder}
              alt={t.founder.name}
              width={640}
              height={800}
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background: "radial-gradient(120% 80% at 0% 0%, hsl(var(--aura-peach) / 0.18), transparent 60%)",
              }}
            />
          </div>
        </motion.div>

        <div className="md:col-span-7">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-aura-ink/40">— {t.founder.label}</p>
          <h2 className="mb-6 font-display text-[clamp(2rem,6vw,4rem)] leading-[1] tracking-tighter text-aura-ink">
            {t.founder.name}
          </h2>
          <p className="text-balance text-base leading-relaxed text-aura-ink/70 sm:text-lg">
            {t.founder.body}
          </p>
          <p className="mt-6 font-display text-lg text-aura-ink/50">{t.founder.signature}</p>
        </div>
      </div>
    </section>
  );
}
