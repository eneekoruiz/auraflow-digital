import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { useLang } from "@/i18n/LanguageProvider";
import { MagneticButton } from "@/components/effects/MagneticButton";
import { AuraBackground } from "@/components/effects/AuraBackground";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Check, ArrowRight } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  pain: z.string().trim().max(1000).optional(),
});

export function FinalCTA() {
  const { t, lang } = useLang();
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: fd.get("name"),
      email: fd.get("email"),
      pain: fd.get("pain") || undefined,
    });
    if (!parsed.success) {
      toast.error(t.cta.error);
      return;
    }
    setSubmitting(true);
    try {
      const { error } = await supabase.from("leads").insert({
        name: parsed.data.name,
        email: parsed.data.email,
        pain_point: parsed.data.pain ?? null,
        language: lang,
        user_agent: typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 500) : null,
      });
      if (error) throw error;
      setDone(true);
      toast.success(t.cta.success);
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      console.error(err);
      toast.error(t.cta.error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative isolate overflow-hidden bg-aura-ink px-6 py-32 text-aura-cream md:py-48">
      {/* Inverted aura, dimmer */}
      <AuraBackground dim />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-16 md:grid-cols-12 md:gap-20">
        <div className="md:col-span-6">
          <p className="mb-6 text-xs uppercase tracking-[0.3em] text-aura-cream/40">— {t.cta.label}</p>
          <h2 className="text-balance font-display text-5xl leading-[0.92] tracking-tighter text-aura-cream md:text-7xl lg:text-8xl">
            {t.cta.title}
          </h2>
          <p className="mt-8 max-w-md text-aura-cream/60 md:text-lg">{t.cta.subtitle}</p>
        </div>

        <div className="md:col-span-6">
          {done ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex h-full flex-col items-start justify-center gap-6 rounded-3xl border border-aura-cream/15 p-10"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-aura-cream text-aura-ink">
                <Check className="h-5 w-5" />
              </span>
              <p className="font-display text-3xl leading-tight text-aura-cream md:text-4xl">
                {t.cta.success}
              </p>
            </motion.div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-2">
              <Field name="name" label={t.cta.name} required maxLength={120} />
              <Field name="email" label={t.cta.email} type="email" required maxLength={255} />
              <Field name="pain" label={t.cta.pain} as="textarea" maxLength={1000} />
              <div className="pt-6">
                <MagneticButton
                  type="submit"
                  variant="light"
                  disabled={submitting}
                  className="px-9 py-5"
                >
                  <span className="inline-flex items-center gap-2">
                    {submitting ? t.cta.sending : t.cta.send}
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

interface FieldProps {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  maxLength?: number;
  as?: "input" | "textarea";
}

function Field({ name, label, type = "text", required, maxLength, as = "input" }: FieldProps) {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const floating = focused || hasValue;

  const baseInput =
    "w-full bg-transparent pb-3 pt-7 text-aura-cream placeholder-transparent outline-none";

  return (
    <div className="relative border-b border-aura-cream/20 transition-colors focus-within:border-aura-cream">
      <label
        htmlFor={name}
        className={`pointer-events-none absolute left-0 transition-all duration-300 ${
          floating
            ? "top-1 text-[11px] uppercase tracking-[0.2em] text-aura-cream/50"
            : "top-7 text-base text-aura-cream/55"
        }`}
      >
        {label}
        {required && <span className="ml-1 text-aura-orange">*</span>}
      </label>

      {as === "textarea" ? (
        <textarea
          id={name}
          name={name}
          rows={3}
          maxLength={maxLength}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false);
            setHasValue(e.target.value.length > 0);
          }}
          onChange={(e) => setHasValue(e.target.value.length > 0)}
          className={`${baseInput} resize-none`}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          maxLength={maxLength}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false);
            setHasValue(e.target.value.length > 0);
          }}
          onChange={(e) => setHasValue(e.target.value.length > 0)}
          className={baseInput}
        />
      )}
    </div>
  );
}
