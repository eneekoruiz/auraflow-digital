import { MouseEvent, useRef, ReactNode, useMemo } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { CalendarClock, Globe, Workflow, ArrowUpRight, LucideIcon } from "lucide-react";
import { useLang } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

/**
 * Constants & Configuration
 */
const ICONS: LucideIcon[] = [Globe, CalendarClock, Workflow];
const ACCENTS = ["aura-lavender", "aura-mint", "aura-peach"] as const;
const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * BentoServices: Main Section Component
 */
export function BentoServices() {
  const { t } = useLang();

  return (
    <section id="services" className="relative px-4 pt-10 pb-4 sm:px-6 sm:pt-14 sm:pb-6 md:pt-20 md:pb-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 flex flex-col gap-5 sm:mb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.3em] text-aura-ink/40">— {t.services.label}</p>
            <h2 className="max-w-4xl text-balance font-display text-[clamp(2rem,6vw,4rem)] leading-[0.9] tracking-tighter text-aura-ink">
              {t.services.title}
            </h2>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {t.services.cards.map((card, i) => (
            <ServiceCard 
              key={card.tag} 
              card={card} 
              index={i} 
              className="md:col-span-1"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * ServiceCard: Specialized card for the Bento grid
 */
interface ServiceCardProps {
  card: { tag: string; title: string; body: string; bullets: string[] };
  index: number;
  className?: string;
}

function ServiceCard({ card, index, className }: ServiceCardProps) {
  const Icon = ICONS[index];
  const accent = ACCENTS[index];

  return (
    <TiltCard className={className} delay={index * 0.1} accent={accent} index={index}>
      <header className="relative flex items-start justify-between">
        <span
          className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-aura-ink/5 bg-white/80 transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-xl"
          style={{ boxShadow: `0 10px 30px -12px hsl(var(--${accent}) / 0.5)` }}
        >
          <Icon className="h-5 w-5" style={{ color: `hsl(var(--${accent}))` }} />
        </span>
        <span className="font-display text-xl text-aura-ink/20 transition-colors group-hover:text-aura-ink/40">{card.tag}</span>
      </header>

      <div className="relative mt-6">
        <h3 className="mb-2 text-balance font-display text-[clamp(1.1rem,4vw,2rem)] leading-[1.05] tracking-tight text-aura-ink">
          {card.title}
        </h3>
        <p className="mb-5 text-aura-ink/65 text-sm leading-relaxed md:text-base">{card.body}</p>

        <div className="flex flex-wrap gap-1.5">
          {card.bullets.map((b) => (
            <span
              key={b}
              className="rounded-full bg-aura-ink/[0.04] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-aura-ink/50 transition-all hover:bg-aura-ink/10 hover:text-aura-ink/80"
            >
              {b}
            </span>
          ))}
        </div>
      </div>

      <ArrowUpRight
        aria-hidden
        className="absolute right-7 top-7 h-4 w-4 text-aura-ink/20 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-aura-ink"
      />
    </TiltCard>
  );
}

/**
 * TiltCard: Interactive card container with mouse-following tilt effect
 */
interface TiltCardProps {
  children: ReactNode;
  className?: string;
  delay: number;
  accent: string;
  index: number;
}

function TiltCard({ children, className, delay, accent, index }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Motion Values
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  
  // Springs for smoothness
  const sx = useSpring(mx, { stiffness: 200, damping: 20 });
  const sy = useSpring(my, { stiffness: 200, damping: 20 });
  
  // Transformations
  const rotateX = useTransform(sy, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-6, 6]);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const gridId = useMemo(() => `grid-${index}`, [index]);

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
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative texture-glass flex min-h-[240px] flex-col justify-between overflow-hidden rounded-[2.5rem] border border-aura-ink/10 bg-white/40 p-6 backdrop-blur-2xl sm:p-8 md:min-h-[300px] md:p-10"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          style={{
            background: `radial-gradient(600px circle at 30% 0%, hsl(var(--${accent}) / 0.35), transparent 60%)`,
          }}
        />
        
        <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id={gridId} width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${gridId})`} />
        </svg>

        {children}
      </motion.article>
    </motion.div>
  );
}

