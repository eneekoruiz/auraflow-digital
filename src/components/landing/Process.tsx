import { motion } from "framer-motion";
import { useLang } from "@/i18n/LanguageProvider";

export function Process() {
  const { t } = useLang();
  return (
    <section id="process" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-aura-ink/40">— {t.process.label}</p>
        <h2 className="mb-16 max-w-2xl text-balance font-display text-5xl leading-[0.95] tracking-tighter text-aura-ink md:text-6xl lg:text-7xl">
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
              className="group grid grid-cols-12 items-baseline gap-4 border-t border-aura-ink/10 py-10 md:gap-8 md:py-14"
            >
              <span
                className="col-span-3 font-display text-6xl tracking-tighter text-transparent md:col-span-2 md:text-8xl"
                style={{ WebkitTextStroke: "1px hsl(var(--aura-ink) / 0.5)" }}
              >
                {s.n}
              </span>
              <h3 className="col-span-9 font-display text-3xl tracking-tight text-aura-ink md:col-span-4 md:text-5xl">
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
