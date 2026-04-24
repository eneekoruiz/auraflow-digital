import { useLang } from "@/i18n/LanguageProvider";
import { ScrollRevealText } from "@/components/effects/ScrollRevealText";

export function Manifesto() {
  const { t } = useLang();
  return (
    <section className="relative px-6 py-32 md:py-56">
      <div className="mx-auto max-w-5xl">
        <p className="mb-10 text-xs uppercase tracking-[0.3em] text-aura-ink/40">— {t.manifesto.label}</p>
        <ScrollRevealText
          text={t.manifesto.text}
          className="font-display text-balance text-4xl leading-[1.05] tracking-tight text-aura-ink sm:text-5xl md:text-6xl lg:text-7xl"
        />
      </div>
    </section>
  );
}
