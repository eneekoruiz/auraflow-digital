import { motion } from "framer-motion";
import { CalendarClock, Globe, Workflow, ArrowUpRight } from "lucide-react";
import { useLang } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

const ICONS = [Globe, CalendarClock, Workflow] as const;
const ACCENTS = ["aura-orange", "aura-magenta", "aura-blue"] as const;

export function BentoServices() {
  const { t } = useLang();

  return (
    <section id="services" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-aura-ink/40">— {t.services.label}</p>
            <h2 className="max-w-2xl text-balance font-display text-5xl leading-[0.95] tracking-tighter text-aura-ink md:text-6xl lg:text-7xl">
              {t.services.title}
            </h2>
          </div>
        </div>

        {/* Bento grid: 1 large + 2 medium */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:gap-5">
          {t.services.cards.map((card, i) => {
            const Icon = ICONS[i];
            const accent = ACCENTS[i];
            const span = i === 0 ? "md:col-span-6 lg:col-span-4" : "md:col-span-3 lg:col-span-2";

            return (
              <motion.article
                key={card.tag}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  "group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-aura-ink/8 bg-aura-cream/55 p-7 backdrop-blur-xl md:p-9",
                  "min-h-[320px] md:min-h-[380px]",
                  span,
                )}
              >
                {/* Animated gradient wash */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(600px circle at 30% 0%, hsl(var(--${accent}) / 0.22), transparent 60%)`,
                  }}
                />
                {/* Hairline grid overlay */}
                <svg
                  aria-hidden
                  className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.06]"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <pattern id={`grid-${i}`} width="32" height="32" patternUnits="userSpaceOnUse">
                      <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill={`url(#grid-${i})`} />
                </svg>

                <header className="relative flex items-start justify-between">
                  <span
                    className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-aura-ink/10 bg-aura-cream/70 transition-transform duration-500 group-hover:-translate-y-1"
                    style={{ boxShadow: `0 10px 30px -12px hsl(var(--${accent}) / 0.5)` }}
                  >
                    <Icon className="h-5 w-5" style={{ color: `hsl(var(--${accent}))` }} />
                  </span>
                  <span className="font-display text-xl text-aura-ink/30">{card.tag}</span>
                </header>

                <div className="relative">
                  <h3 className="mb-3 font-display text-3xl tracking-tight text-aura-ink md:text-4xl lg:text-5xl">
                    {card.title}
                  </h3>
                  <p className="mb-6 max-w-md text-aura-ink/65 md:text-[15px]">{card.body}</p>

                  <ul className="flex flex-wrap gap-2">
                    {card.bullets.map((b) => (
                      <li
                        key={b}
                        className="rounded-full border border-aura-ink/10 bg-aura-cream/60 px-3 py-1 text-xs text-aura-ink/70"
                      >
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Decorative arrow */}
                <ArrowUpRight
                  aria-hidden
                  className="absolute right-7 top-7 h-4 w-4 text-aura-ink/30 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-aura-ink"
                />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
