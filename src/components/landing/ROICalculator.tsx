import { useState, useEffect, useRef, useMemo } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { MagneticButton } from "@/components/effects/MagneticButton";
import { useLang } from "@/i18n/LanguageProvider";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { Clock, Euro, ArrowRight, Zap } from "lucide-react";

/**
 * Constants & Configuration
 */
const EASE = [0.22, 1, 0.36, 1] as const;
const ANALYTICS_DELAY = 1500;
const WEEKS_PER_YEAR = 52;

/**
 * ROICalculator: Main Section Component
 */
export function ROICalculator() {
  const { t } = useLang();
  const [hours, setHours] = useState(10);
  const [rate, setRate] = useState(25);
  const containerRef = useRef<HTMLDivElement>(null);

  // Derived Values
  const annualHours = useMemo(() => hours * WEEKS_PER_YEAR, [hours]);
  const annualLoss = useMemo(() => annualHours * rate, [annualHours, rate]);

  // Track analytics on interaction settle
  useEffect(() => {
    const timer = setTimeout(() => {
      track("roi_calculated", { hours, rate, annual_loss: annualLoss });
    }, ANALYTICS_DELAY);
    return () => clearTimeout(timer);
  }, [hours, rate, annualLoss]);

  return (
    <section id="roi" className="relative px-4 py-10 sm:px-6 sm:py-16 md:py-20" ref={containerRef}>
      <div className="mx-auto max-w-6xl">
        <ROIHeader title={t.roi.title} subtitle={t.roi.subtitle} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px]">
          <ROIControls 
            hours={hours} 
            setHours={setHours} 
            rate={rate} 
            setRate={setRate} 
            t={t.roi} 
          />
          <ROIResults 
            annualHours={annualHours} 
            annualLoss={annualLoss} 
            t={t.roi} 
          />
        </div>
      </div>
    </section>
  );
}

/**
 * ROIHeader Component
 */
function ROIHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-8 flex flex-col items-center text-center">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-2 text-xs font-medium uppercase tracking-[0.3em] text-aura-ink/40"
      >
        — ROI
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.8, ease: EASE }}
        className="font-display text-[clamp(1.75rem,6vw,3.5rem)] leading-[0.95] tracking-tighter text-aura-ink"
      >
        {title.split(` ${t.roi.noHighlight} `).map((part, i) => (
          <span key={i}>
            {part}
            {i === 0 && (
              <span className="relative inline-block px-2">
                <span className="relative z-10 font-black text-aura-peach uppercase">{t.roi.noHighlight}</span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8, duration: 0.6, ease: EASE }}
                  className="absolute bottom-1 left-0 h-4 w-full origin-left bg-aura-peach/20"
                />
              </span>
            )}
          </span>
        ))}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.8, ease: EASE }}
        className="mt-4 max-w-2xl text-aura-ink/65 text-sm sm:text-base"
      >
        {subtitle}
      </motion.p>
    </div>
  );
}

/**
 * ROIControls Component
 */
interface ROIControlsProps {
  hours: number;
  setHours: (v: number) => void;
  rate: number;
  setRate: (v: number) => void;
  t: any;
}

function ROIControls({ hours, setHours, rate, setRate, t }: ROIControlsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3, duration: 0.8, ease: EASE }}
      className="flex flex-col justify-center space-y-8 rounded-3xl border border-aura-ink/10 bg-white/40 p-6 backdrop-blur-xl sm:p-8"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-3 text-sm font-medium text-aura-ink/80">
            <Clock className="h-4 w-4 text-aura-peach" />
            {t.hoursLabel}
          </label>
          <span className="font-display text-2xl font-medium text-aura-ink">{hours}h</span>
        </div>
        <Slider
          defaultValue={[10]}
          min={2}
          max={40}
          step={1}
          onValueChange={(v) => setHours(v[0])}
          className="py-2"
        />
      </div>

      <div className="space-y-4">
        <label className="flex items-center gap-3 text-sm font-medium text-aura-ink/80">
          <Euro className="h-4 w-4 text-aura-peach" />
          {t.rateLabel}
        </label>
        <div className="flex gap-2">
          {[15, 25, 40].map((r) => (
            <button
              key={r}
              onClick={() => setRate(r)}
              className={cn(
                "flex-1 rounded-xl border py-3 text-sm font-medium transition-all duration-300",
                rate === r
                  ? "border-aura-ink bg-aura-ink text-aura-cream shadow-lg"
                  : "border-aura-ink/10 bg-white/50 text-aura-ink hover:border-aura-ink/30"
              )}
            >
              {r} €/h
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/**
 * ROIResults Component
 */
interface ROIResultsProps {
  annualHours: number;
  annualLoss: number;
  t: any;
}

function ROIResults({ annualHours, annualLoss, t }: ROIResultsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4, duration: 0.8, ease: EASE }}
      className="relative overflow-hidden rounded-3xl bg-aura-ink p-6 text-aura-cream shadow-2xl sm:p-8"
    >
      <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-aura-peach/20 blur-[80px]" />
      <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-aura-lavender/10 blur-[80px]" />

      <div className="relative z-10 space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-0.5">
            <p className="text-[10px] uppercase tracking-widest text-aura-cream/50">{t.resultHours}</p>
            <Counter value={annualHours} className="font-display text-2xl tracking-tighter" />
          </div>
          <div className="text-right space-y-0.5">
            <p className="text-[10px] uppercase tracking-widest text-aura-cream/50">{t.resultMoney}</p>
            <div className="flex items-baseline justify-end gap-1">
              <Counter value={annualLoss} className="font-display text-2xl tracking-tighter" />
              <span className="text-lg opacity-50">€</span>
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-aura-cream/10" />

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-aura-peach">
            <Zap className="h-4 w-4 fill-current" />
            <span className="text-[10px] font-bold uppercase tracking-wider">{t.resultSaving}</span>
          </div>
          <div className="flex items-baseline gap-2 text-aura-peach">
            <Counter value={annualLoss} className="font-display text-[clamp(2.5rem,10vw,4rem)] leading-none tracking-tighter" />
            <span className="text-2xl opacity-80">€</span>
          </div>
        </div>

        <MagneticButton
          asLink
          href="#contact"
          variant="light"
          className="group w-full gap-2 px-6 py-4 text-base font-semibold"
        >
          {t.cta}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </MagneticButton>
      </div>
    </motion.div>
  );
}

/**
 * Counter Component: Animates numeric values
 */
function Counter({ value, className }: { value: number; className?: string }) {
  const { lang } = useLang();
  return (
    <span className={cn("inline-block tabular-nums", className)}>
      {value.toLocaleString(lang === "es" ? "es-ES" : "en-US")}
    </span>
  );
}

