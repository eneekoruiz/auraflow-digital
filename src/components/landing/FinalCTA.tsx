import { FormEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { z } from "zod";
import { useLang } from "@/i18n/LanguageProvider";
import { MagneticButton } from "@/components/effects/MagneticButton";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Check, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";

const EASE = [0.22, 1, 0.36, 1] as const;

const schema = z.object({
  project: z.string().trim().min(1).max(120),
  pain: z.string().trim().min(1).max(1000),
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
});

interface State {
  project: string;
  pain: string;
  name: string;
  email: string;
}

export function FinalCTA() {
  const { t, lang } = useLang();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<State>({ project: "", pain: "", name: "", email: "" });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const total = 3;
  const canNext =
    (step === 0 && data.project.trim().length > 0) ||
    (step === 1 && data.pain.trim().length > 0) ||
    (step === 2 && data.name.trim().length > 0 && /\S+@\S+\.\S+/.test(data.email));

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
      toast.success(t.cta.success);
    } catch (err) {
      console.error(err);
      toast.error(t.cta.error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden bg-aura-ink px-4 py-24 text-white sm:px-6 sm:py-32 md:py-48"
    >
      {/* Inverted soft aura */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-0">
        <div
          className="absolute -left-[10%] top-[10%] h-[60vmax] w-[60vmax] rounded-full opacity-25"
          style={{ background: "hsl(var(--aura-lavender))", filter: "blur(180px)" }}
        />
        <div
          className="absolute -right-[10%] bottom-[5%] h-[55vmax] w-[55vmax] rounded-full opacity-20"
          style={{ background: "hsl(var(--aura-peach))", filter: "blur(180px)" }}
        />
      </div>

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-12 sm:gap-16 md:grid-cols-12 md:gap-20">
        <div className="md:col-span-6">
          <p className="mb-6 text-xs uppercase tracking-[0.3em] text-white/40">— {t.cta.label}</p>
          <h2 className="text-balance font-display text-[clamp(2.25rem,8vw,6rem)] leading-[0.92] tracking-tighter text-white">
            {t.cta.title}
          </h2>
          <p className="mt-6 max-w-md text-white/60 sm:mt-8 md:text-lg">{t.cta.subtitle}</p>
        </div>

        <div className="md:col-span-6">
          {done ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="flex h-full flex-col items-start justify-center gap-6 rounded-3xl border border-white/15 p-10"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-aura-ink">
                <Check className="h-5 w-5" />
              </span>
              <p className="font-display text-3xl leading-tight text-white md:text-4xl">{t.cta.success}</p>
            </motion.div>
          ) : (
            <form onSubmit={onSubmit} className="rounded-3xl border border-white/15 bg-white/[0.02] p-6 backdrop-blur md:p-10">
              {/* Progress */}
              <div className="mb-8 flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.3em] text-white/40">
                  {t.cta.step} {step + 1} {t.cta.of} {total}
                </span>
                <div className="flex gap-1.5">
                  {Array.from({ length: total }).map((_, i) => (
                    <span
                      key={i}
                      className={cn(
                        "h-1 w-8 rounded-full transition-colors duration-500",
                        i <= step ? "bg-white" : "bg-white/15",
                      )}
                    />
                  ))}
                </div>
              </div>

              <div className="relative min-h-[280px]">
                <AnimatePresence mode="wait">
                  {step === 0 && (
                    <motion.div
                      key="s1"
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -24 }}
                      transition={{ duration: 0.45, ease: EASE }}
                    >
                      <h3 className="mb-6 font-display text-3xl tracking-tight text-white md:text-4xl">
                        {t.cta.s1.title}
                      </h3>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {t.cta.s1.options.map((opt) => {
                          const active = data.project === opt;
                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => setData({ ...data, project: opt })}
                              className={cn(
                                "rounded-2xl border px-4 py-4 text-left text-sm transition-all",
                                active
                                  ? "border-white bg-white text-aura-ink"
                                  : "border-white/15 bg-white/[0.02] text-white/80 hover:border-white/30 hover:bg-white/[0.06]",
                              )}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {step === 1 && (
                    <motion.div
                      key="s2"
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -24 }}
                      transition={{ duration: 0.45, ease: EASE }}
                    >
                      <h3 className="mb-6 font-display text-3xl tracking-tight text-white md:text-4xl">
                        {t.cta.s2.title}
                      </h3>
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
                    <motion.div
                      key="s3"
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -24 }}
                      transition={{ duration: 0.45, ease: EASE }}
                      className="space-y-4"
                    >
                      <h3 className="mb-2 font-display text-3xl tracking-tight text-white md:text-4xl">
                        {t.cta.s3.title}
                      </h3>
                      <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData({ ...data, name: e.target.value })}
                        placeholder={t.cta.s3.name}
                        maxLength={120}
                        autoFocus
                        className="w-full rounded-2xl border border-white/15 bg-white/[0.02] px-5 py-4 text-white placeholder-white/30 outline-none transition-colors focus:border-white/50"
                      />
                      <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData({ ...data, email: e.target.value })}
                        placeholder={t.cta.s3.email}
                        maxLength={255}
                        className="w-full rounded-2xl border border-white/15 bg-white/[0.02] px-5 py-4 text-white placeholder-white/30 outline-none transition-colors focus:border-white/50"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="mt-8 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  disabled={step === 0}
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-white/60 transition-colors hover:text-white disabled:opacity-30"
                >
                  <ArrowLeft className="h-4 w-4" /> {t.cta.back}
                </button>

                {step < total - 1 ? (
                  <MagneticButton
                    type="button"
                    variant="light"
                    disabled={!canNext}
                    onClick={() => canNext && setStep((s) => s + 1)}
                    className={cn("px-7 py-4", !canNext && "opacity-40")}
                  >
                    <span className="inline-flex items-center gap-2">
                      {t.cta.next} <ArrowRight className="h-4 w-4" />
                    </span>
                  </MagneticButton>
                ) : (
                  <MagneticButton
                    type="submit"
                    variant="light"
                    disabled={!canNext || submitting}
                    className={cn("px-7 py-4", (!canNext || submitting) && "opacity-60")}
                  >
                    <span className="inline-flex items-center gap-2">
                      {submitting ? t.cta.sending : t.cta.send}
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </MagneticButton>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
