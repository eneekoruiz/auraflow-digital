import { MouseEvent, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { CalendarClock, Globe, Workflow, ArrowUpRight } from "lucide-react";
import { useLang } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

const ICONS = [Globe, CalendarClock, Workflow] as const;
const ACCENTS = ["aura-lavender", "aura-mint", "aura-peach"] as const;
const EASE = [0.22, 1, 0.36, 1] as const;

export function BentoServices() {
  const { t } = useLang();

  return (
    <section id="services" className="relative px-4 py-10 sm:px-6 sm:py-12 md:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-6 sm:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-aura-ink/40">— {t.services.label}</p>
            <h2 className="max-w-2xl text-balance font-display text-[clamp(2rem,7vw,4.5rem)] leading-[0.95] tracking-tighter text-aura-ink">
              {t.services.title}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:gap-5">
          {t.services.cards.map((card, i) => {
            const Icon = ICONS[i];
            const accent = ACCENTS[i];
            const span = i === 0 ? "md:col-span-6 lg:col-span-4" : "md:col-span-3 lg:col-span-2";
            return (
              <TiltCard key={card.tag} className={span} delay={i * 0.1} accent={accent} index={i}>
                <header className="relative flex items-start justify-between">
                  <span
                    className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-aura-ink/10 bg-white/70 transition-transform duration-500 group-hover:-translate-y-1"
                    style={{ boxShadow: `0 10px 30px -12px hsl(var(--${accent}) / 0.7)` }}
                  >
                    <Icon className="h-5 w-5" style={{ color: `hsl(var(--${accent}))` }} />
                  </span>
                  <span className="font-display text-xl text-aura-ink/30">{card.tag}</span>
                </header>

                <div className="relative">
                  <h3 className="mb-3 font-display text-[clamp(1.5rem,5vw,3rem)] leading-tight tracking-tight text-aura-ink">
                    {card.title}
                  </h3>
                  <p className="mb-6 max-w-md text-aura-ink/65 md:text-[15px]">{card.body}</p>

                  <ul className="flex flex-wrap gap-2">
                    {card.bullets.map((b) => (
                      <li
                        key={b}
                        className="rounded-full border border-aura-ink/10 bg-white/60 px-3 py-1 text-xs text-aura-ink/70"
                      >
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>

                <ArrowUpRight
                  aria-hidden
                  className="absolute right-7 top-7 h-4 w-4 text-aura-ink/30 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-aura-ink"
                />
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );

  function TiltCard({
    children, className, delay, accent, index,
  }: { children: React.ReactNode; className?: string; delay: number; accent: string; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const sx = useSpring(mx, { stiffness: 200, damping: 20 });
    const sy = useSpring(my, { stiffness: 200, damping: 20 });
    const rotateX = useTransform(sy, [-0.5, 0.5], [6, -6]);
    const rotateY = useTransform(sx, [-0.5, 0.5], [-6, 6]);

    const onMove = (e: MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      mx.set((e.clientX - r.left) / r.width - 0.5);
      my.set((e.clientY - r.top) / r.height - 0.5);
    };
    const onLeave = () => { mx.set(0); my.set(0); };

    return (
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay, ease: EASE }}
        className={cn("[perspective:1200px]", className)}
      >
        <motion.article
          ref={ref}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="group relative flex min-h-[280px] flex-col justify-between overflow-hidden rounded-3xl border border-aura-ink/10 bg-white/40 p-6 backdrop-blur-2xl sm:p-7 md:min-h-[380px] md:p-9"
        >
          {/* Animated frosted gradient wash */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            style={{
              background: `radial-gradient(600px circle at 30% 0%, hsl(var(--${accent}) / 0.35), transparent 60%)`,
            }}
          />
          {/* Hairline grid overlay */}
          <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id={`grid-${index}`} width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#grid-${index})`} />
          </svg>
          {children}
        </motion.article>
      </motion.div>
    );
  }
}
