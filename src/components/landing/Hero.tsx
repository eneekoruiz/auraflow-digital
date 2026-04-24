import { motion } from "framer-motion";
import { useLang } from "@/i18n/LanguageProvider";
import { MagneticButton } from "@/components/effects/MagneticButton";
import { ArrowDown } from "lucide-react";

export function Hero() {
  const { t, lang } = useLang();

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 pt-24 text-center"
    >
      {/* Eyebrow */}
      <motion.p
        key={`eyebrow-${lang}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-10 inline-flex items-center gap-2 rounded-full border border-aura-ink/15 bg-aura-cream/50 px-4 py-1.5 text-xs font-medium tracking-wide text-aura-ink/70 backdrop-blur"
      >
        <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-aura-orange" />
        {t.hero.eyebrow}
      </motion.p>

      {/* Headline — word-by-word reveal */}
      <h1
        key={`title-${lang}`}
        className="mx-auto max-w-[18ch] text-balance font-display text-[14vw] leading-[0.92] tracking-tighter text-aura-ink sm:text-[10vw] md:text-[8.5vw] lg:text-[7.5rem] xl:text-[9rem]"
      >
        {t.hero.title.map((word, i) => (
          <span key={`${word}-${i}`} className="mr-[0.18em] inline-block overflow-hidden align-bottom">
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.9, delay: 0.15 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block"
            >
              {word}
            </motion.span>
          </span>
        ))}
      </h1>

      {/* Subtitle */}
      <motion.p
        key={`sub-${lang}`}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.9 }}
        className="mt-10 max-w-xl text-balance text-lg text-aura-ink/65 md:text-xl"
      >
        {t.hero.subtitle}
      </motion.p>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.1 }}
        className="mt-10"
      >
        <MagneticButton asLink href="#contact" variant="dark" className="px-9 py-5 text-base">
          {t.hero.cta}
        </MagneticButton>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-aura-ink/40"
      >
        <span>{t.hero.scroll}</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4" />
        </motion.span>
      </motion.div>
    </section>
  );
}
