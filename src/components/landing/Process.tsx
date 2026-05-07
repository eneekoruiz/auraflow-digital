import { motion } from "framer-motion";
import { useLang } from "@/i18n/LanguageProvider";

export function Process() {
  const { t } = useLang();
  return (
    <section id="process" className="relative px-4 py-20 sm:px-6 sm:py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-aura-ink/40">— {t.process.label}</p>
        <h2 className="mb-12 max-w-2xl text-balance font-display text-[clamp(2rem,7vw,4.5rem)] leading-[0.95] tracking-tighter text-aura-ink sm:mb-16">
          {t.process.title}
        </h2>

        <ol className="space-y-2">
          {t.process.steps.map((s, i) => (
            <motion.li
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group grid grid-cols-12 items-baseline gap-3 border-t border-aura-ink/10 py-8 sm:gap-4 sm:py-10 md:gap-8 md:py-14"
            >
              <span
                className="col-span-3 font-display text-[clamp(2.5rem,10vw,6rem)] tracking-tighter text-transparent md:col-span-2"
                style={{ WebkitTextStroke: "1px hsl(var(--aura-ink) / 0.5)" }}
              >
                {s.n}
              </span>
              <h3 className="col-span-9 font-display text-[clamp(1.5rem,5vw,3rem)] leading-tight tracking-tight text-aura-ink md:col-span-4">
                {s.title}
              </h3>
              <p className="col-span-12 max-w-md text-aura-ink/65 md:col-span-6 md:text-lg">{s.body}</p>
            </motion.li>
          ))}
          <li className="border-t border-aura-ink/10" />
        </ol>
      </div>
    </section>
  );
}
