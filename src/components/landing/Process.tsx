import { motion } from "framer-motion";
import { useLang } from "@/i18n/LanguageProvider";

export function Process() {
  const { t } = useLang();
  return (
    <section id="process" className="relative px-4 py-10 sm:px-6 sm:py-16 md:py-20">
      <div className="mx-auto max-w-5xl">
        <header className="mb-12 sm:mb-16">
          <p className="mb-6 text-xs uppercase tracking-[0.4em] text-aura-ink/40">— {t.process.label}</p>
          <h2 className="max-w-4xl text-balance font-display text-[clamp(2.5rem,8vw,5rem)] leading-[0.85] tracking-tighter text-aura-ink">
            {t.process.title}
          </h2>
        </header>

        <ol className="space-y-0">
          {t.process.steps.map((s, i) => (
            <motion.li
              key={s.n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group grid grid-cols-12 items-center gap-4 border-t border-aura-ink/10 py-5 sm:gap-6 sm:py-6 md:gap-10"
            >
              <span
                className="col-span-3 font-display text-[clamp(2rem,8vw,4rem)] tracking-tighter text-transparent md:col-span-2"
                style={{ WebkitTextStroke: "1px hsl(var(--aura-ink) / 0.3)" }}
              >
                {s.n}
              </span>
              <div className="col-span-9 grid grid-cols-1 gap-1 md:col-span-10 md:grid-cols-12 md:items-center md:gap-8">
                <h3 className="font-display text-lg tracking-tight text-aura-ink sm:text-xl md:col-span-5 md:text-2xl">
                  {s.title}
                </h3>
                <p className="text-sm text-aura-ink/65 md:col-span-7 md:text-base">{s.body}</p>
              </div>
            </motion.li>
          ))}
          <li className="border-t border-aura-ink/10" />
        </ol>
      </div>
    </section>
  );
}
