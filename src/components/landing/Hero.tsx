import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useLang } from "@/i18n/LanguageProvider";
import { MagneticButton } from "@/components/effects/MagneticButton";
import { ArrowDown } from "lucide-react";
import { Logo } from "./Logo";
import { SocialProof } from "./SocialProof";
import { track } from "@/lib/analytics";
import { useRef, useEffect, useState } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const { t, lang } = useLang();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], [0, 100]);
  const backgroundScale = useTransform(scrollY, [0, 500], [1, 1.15]);

  useEffect(() => {
    let frameId: number;
    const handleMouseMove = (e: MouseEvent) => {
      frameId = requestAnimationFrame(() => {
        setMousePos({
          x: (e.clientX / window.innerWidth - 0.5) * 20,
          y: (e.clientY / window.innerHeight - 0.5) * 20,
        });
      });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <section
      id="top"
      ref={containerRef}
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-4 pt-20 text-center sm:px-6 md:pt-0"
    >
      {/* Background Visual Asset — Parallax & Floating */}
      <motion.div 
        style={{ y: backgroundY, scale: backgroundScale }}
        className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-40 aura-blend-overlay"
      >
        <motion.div
          animate={{ 
            x: mousePos.x, 
            y: mousePos.y,
            rotate: [0, 5, 0, -5, 0],
          }}
          transition={{ 
            x: { type: "spring", stiffness: 30, damping: 20 },
            y: { type: "spring", stiffness: 30, damping: 20 },
            rotate: { duration: 30, repeat: Infinity, ease: "linear" }
          }}
          className="relative h-[90vh] w-[90vh] max-w-[100vw]"
        >
          <img 
            src="/hero_abstract_fluid.png" 
            alt="" 
            className="h-full w-full object-contain blur-[1px] contrast-[1.1] saturate-[1.2]"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />

          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        </motion.div>
      </motion.div>

      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          key={`eyebrow-${lang}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          className="mb-10 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.5em] text-aura-ink/30 sm:mb-12"
        >
          <span className="h-px w-12 bg-aura-ink/10" />
          {t.hero.eyebrow}
          <span className="h-px w-12 bg-aura-ink/10" />
        </motion.div>

        {/* Headline — High Impact Typography */}
        <div className="overflow-hidden">
          <motion.h1
            key={`title-${lang}`}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: EASE }}
            className="mx-auto max-w-[15ch] text-balance font-display text-[clamp(2.5rem,9vw,6.5rem)] leading-[0.85] tracking-tighter text-aura-ink"
          >
            {t.hero.title.join(" ")}
          </motion.h1>
        </div>

        <motion.p
          key={`sub-${lang}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1, ease: EASE }}
          className="mt-8 max-w-xl text-balance text-base font-medium text-aura-ink/60 sm:mt-10 sm:text-xl sm:leading-relaxed"
        >
          {t.hero.subtitle}
        </motion.p>

        {/* Dual CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2, ease: EASE }}
          className="mt-10 flex flex-col items-stretch gap-4 sm:mt-12 sm:flex-row sm:items-center sm:gap-6"
        >
          <MagneticButton
            asLink
            href="#contact"
            variant="warm"
            className="px-10 py-4 text-lg sm:px-12 sm:py-5"
            onClick={() => track("cta_click", { location: "hero", variant: "primary" })}
          >
            {t.hero.cta}
          </MagneticButton>
          <MagneticButton
            asLink
            href="#process"
            variant="ghost"
            className="border border-aura-ink/10 bg-white/40 px-8 py-4 text-lg backdrop-blur-sm"
            onClick={() => track("cta_click", { location: "hero", variant: "secondary" })}
          >
            {t.hero.ctaSecondary}
          </MagneticButton>
        </motion.div>
      </div>

      {/* Trust Box positioned in the corner to utilize whitespace */}
      <div className="absolute bottom-36 left-12 hidden xl:block">
        <SocialProof />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-aura-ink/30 sm:flex"
      >
        <span>{t.hero.scroll}</span>
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <ArrowDown className="h-5 w-5" />
        </motion.span>
      </motion.div>
    </section>
  );
}

