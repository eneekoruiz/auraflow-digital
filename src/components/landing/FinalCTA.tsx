import { FormEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { z } from "zod";
import { useLang } from "@/i18n/LanguageProvider";
import { MagneticButton } from "@/components/effects/MagneticButton";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Check, ShieldCheck, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";

const EASE = [0.22, 1, 0.36, 1] as const;

const schema = z.object({
  project: z.string().trim().min(1).max(120),
  pain: z.string().trim().min(1).max(1000),
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(255),
  gdpr: z.literal(true, {
    errorMap: () => ({ message: "Debes aceptar la política de privacidad" }),
  }),
});

interface State {
  project: string;
  pain: string;
  name: string;
  email: string;
  gdpr: boolean;
}

export function FinalCTA() {
  const { t, lang } = useLang();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<State>({ project: "", pain: "", name: "", email: "", gdpr: false });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [hoveredOption, setHoveredOption] = useState<number | null>(null);

  const total = 3;
  const startedAt = useRef<number | null>(null);
  const lastStep = useRef(0);
  const submittedRef = useRef(false);

  // Validation Logic
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
  const isNameValid = data.name.trim().length >= 2;
  const canNext =
    (step === 0 && data.project.trim().length > 0) ||
    (step === 1 && data.pain.trim().length > 0) ||
    (step === 2 && isNameValid && isEmailValid && data.gdpr);

  useEffect(() => {
    lastStep.current = step;
    if (startedAt.current === null) startedAt.current = Date.now();
    track("lead_form_step", { step: step + 1, total });
  }, [step]);

  useEffect(() => {
    const reportAbandon = () => {
      if (submittedRef.current || startedAt.current === null) return;
      track("lead_form_abandoned", {
        last_step: lastStep.current + 1,
        total,
        time_ms: Date.now() - startedAt.current,
      });
      startedAt.current = null;
    };
    const onVis = () => { if (document.visibilityState === "hidden") reportAbandon(); };
    window.addEventListener("pagehide", reportAbandon);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.removeEventListener("pagehide", reportAbandon);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      toast.error(t.cta.error);
      return;
    }
    setSubmitting(true);
    try {
      const { error } = await supabase.from("leads").insert({
        name: parsed.data.name,
        email: parsed.data.email,
        pain_point: `[${parsed.data.project}] ${parsed.data.pain}`,
        language: lang,
        user_agent: typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 500) : null,
      });
      if (error) throw error;
      setDone(true);
      submittedRef.current = true;
      track("lead_submitted", { project: parsed.data.project, language: lang });
      toast.success(t.cta.success);
    } catch (err) {
      console.error(err);
      toast.error(t.cta.error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative isolate flex min-h-screen items-center overflow-hidden bg-aura-ink px-4 py-20 text-white sm:px-6">
      {/* Background Aura Effects & Texture */}
      <div aria-hidden className="aura-blend-overlay pointer-events-none absolute inset-0 -z-0 overflow-hidden">
        <div className="absolute -left-[10%] top-[10%] h-[70vmax] w-[70vmax] rounded-full opacity-30" style={{ background: "hsl(var(--aura-lavender))", filter: "blur(180px)" }} />
        <div className="absolute -right-[10%] bottom-[5%] h-[65vmax] w-[65vmax] rounded-full opacity-25" style={{ background: "hsl(var(--aura-peach))", filter: "blur(180px)" }} />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 sm:gap-16 md:grid-cols-12 md:gap-20">
        <div className="md:col-span-6">
          <p className="mb-6 text-xs uppercase tracking-[0.3em] text-white/40">— {t.cta.label}</p>
          <h2 className="text-balance font-display text-[clamp(2rem,6vw,4rem)] leading-[0.92] tracking-tighter text-white">
            {t.cta.title}
          </h2>
          <p className="mt-6 max-w-md text-white/60 sm:mt-8 md:text-lg">{t.cta.subtitle}</p>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs text-white/70 whitespace-nowrap">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden /> {t.guarantee}
          </p>
        </div>

        <div className="md:col-span-6">
          {done ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="relative flex h-full flex-col items-start justify-center gap-6 rounded-3xl border border-white/15 p-10 overflow-hidden"
            >
              <Confetti />
              <span className="relative z-10 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-aura-ink">
                <Check className="h-5 w-5" />
              </span>
              <p className="relative z-10 font-display text-3xl leading-tight text-white md:text-4xl">{t.cta.success}</p>
            </motion.div>
          ) : (
            <form onSubmit={onSubmit} className="rounded-3xl border border-white/15 bg-white/[0.02] p-6 backdrop-blur md:p-10">
              {/* Progress Bar */}
              <div className="mb-8 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.3em] text-white/40">
                    {t.cta.step} {step + 1} {t.cta.of} {total}
                  </span>
                </div>
                <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${((step + 1) / total) * 100}%` }}
                    transition={{ duration: 0.8, ease: EASE }}
                    className="h-full bg-gradient-to-r from-aura-peach to-aura-lavender"
                  />
                </div>
              </div>

              <div className="relative min-h-[300px]">
                <AnimatePresence mode="wait">
                  {step === 0 && (
                    <motion.div key="s1" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.45, ease: EASE }}>
                      <h3 className="mb-6 font-display text-3xl tracking-tight text-white md:text-4xl">{t.cta.s1.title}</h3>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {t.cta.s1.options.map((opt, i) => {
                          const active = data.project === opt;
                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => setData({ ...data, project: opt })}
                              onMouseEnter={() => setHoveredOption(i)}
                              onMouseLeave={() => setHoveredOption(null)}
                              className={cn(
                                "rounded-2xl border px-4 py-4 text-left text-sm transition-all",
                                active
                                  ? "border-white bg-white text-aura-ink"
                                  : "border-white/15 bg-white/[0.02] text-white/80 hover:border-white/30 hover:bg-white/[0.06]"
                              )}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                      <div className="mt-4 h-6">
                        <AnimatePresence mode="wait">
                          {hoveredOption !== null && (
                            <motion.p
                              key={hoveredOption}
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              className="text-xs text-white/40"
                            >
                              {t.cta.s1.descriptions[hoveredOption]}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  )}

                  {step === 1 && (
                    <motion.div key="s2" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.45, ease: EASE }}>
                      <h3 className="mb-6 font-display text-3xl tracking-tight text-white md:text-4xl">{t.cta.s2.title}</h3>
                      <textarea
                        value={data.pain}
                        onChange={(e) => setData({ ...data, pain: e.target.value })}
                        placeholder={t.cta.s2.placeholder}
                        maxLength={1000}
                        rows={5}
                        autoFocus
                        className="w-full resize-none rounded-2xl border border-white/15 bg-white/[0.02] p-5 text-white placeholder-white/30 outline-none transition-colors focus:border-white/50"
                      />
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div key="s3" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.45, ease: EASE }} className="space-y-4">
                      <h3 className="mb-2 font-display text-3xl tracking-tight text-white md:text-4xl">{t.cta.s3.title}</h3>
                      
                      <div className="relative">
                        <input
                          type="text"
                          value={data.name}
                          onChange={(e) => setData({ ...data, name: e.target.value })}
                          placeholder={t.cta.s3.name}
                          maxLength={120}
                          autoFocus
                          className={cn(
                            "w-full rounded-2xl border bg-white/[0.02] px-5 py-4 text-white placeholder-white/30 outline-none transition-colors",
                            data.name.length > 0 && (isNameValid ? "border-green-500/50" : "border-red-500/50"),
                            data.name.length === 0 && "border-white/15 focus:border-white/50"
                          )}
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                          {data.name.length > 0 && (
                            isNameValid ? <CheckCircle2 className="h-5 w-5 text-green-500" /> : <XCircle className="h-5 w-5 text-red-500" />
                          )}
                        </div>
                      </div>

                      <div className="relative">
                        <input
                          type="email"
                          value={data.email}
                          onChange={(e) => setData({ ...data, email: e.target.value })}
                          placeholder={t.cta.s3.email}
                          maxLength={255}
                          className={cn(
                            "w-full rounded-2xl border bg-white/[0.02] px-5 py-4 text-white placeholder-white/30 outline-none transition-colors",
                            data.email.length > 0 && (isEmailValid ? "border-green-500/50" : "border-red-500/50"),
                            data.email.length === 0 && "border-white/15 focus:border-white/50"
                          )}
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                          {data.email.length > 0 && (
                            isEmailValid ? <CheckCircle2 className="h-5 w-5 text-green-500" /> : <XCircle className="h-5 w-5 text-red-500" />
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 pt-2">
                        <input
                          id="gdpr"
                          type="checkbox"
                          checked={data.gdpr}
                          onChange={(e) => setData({ ...data, gdpr: e.target.checked })}
                          className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 text-aura-peach accent-aura-peach outline-none"
                        />
                        <label htmlFor="gdpr" className="text-xs text-white/50 leading-relaxed">
                          {t.cta.gdpr} <a href="/privacy" target="_blank" className="text-white/80 underline decoration-white/20 hover:text-white">Política de Privacidad</a>
                        </label>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="mt-8 flex items-center justify-between gap-3">
                <button type="button" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-white/60 transition-colors hover:text-white disabled:opacity-30">
                  <ArrowLeft className="h-4 w-4" /> {t.cta.back}
                </button>

                <MagneticButton
                  type={step === total - 1 ? "submit" : "button"}
                  variant="light"
                  disabled={!canNext || submitting}
                  onClick={() => step < total - 1 && canNext && setStep((s) => s + 1)}
                  className={cn("px-7 py-4", (!canNext || submitting) && "opacity-40")}
                >
                  <span className="inline-flex items-center gap-2">
                    {step === total - 1 ? (submitting ? t.cta.sending : t.cta.send) : t.cta.next}
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </MagneticButton>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Confetti() {
  const particles = [
    { delay: 0, x: -50, rotate: 15, color: "bg-aura-peach" },
    { delay: 0.1, x: 50, rotate: -15, color: "bg-aura-lavender" },
    { delay: 0.2, x: -20, rotate: 5, color: "bg-aura-peach" },
    { delay: 0.3, x: 20, rotate: -5, color: "bg-aura-lavender" },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          initial={{ y: -100, x: p.x, opacity: 1, rotate: p.rotate }}
          animate={{ y: 200, opacity: 0, rotate: p.rotate * 2 }}
          transition={{ duration: 2, delay: p.delay, ease: "easeOut" }}
          className={cn("absolute h-4 w-2 rounded-sm", p.color)}
        />
      ))}
    </div>
  );
}
