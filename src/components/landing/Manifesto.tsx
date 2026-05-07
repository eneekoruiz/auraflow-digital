import { useLang } from "@/i18n/LanguageProvider";
import { ScrollRevealText } from "@/components/effects/ScrollRevealText";

export function Manifesto() {
  const { t } = useLang();
  return (
    <section className="relative px-4 py-24 sm:px-6 sm:py-32 md:py-56">
      <div className="mx-auto max-w-5xl">
        <p className="mb-8 text-xs uppercase tracking-[0.3em] text-aura-ink/40 sm:mb-10">— {t.manifesto.label}</p>
        <ScrollRevealText
          text={t.manifesto.text}
          className="font-display text-balance text-[clamp(1.75rem,6vw,4.5rem)] leading-[1.05] tracking-tight text-aura-ink"
        />
      </div>
    </section>
  );
}
