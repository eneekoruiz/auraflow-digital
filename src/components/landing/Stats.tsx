import { useEffect, useState, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/i18n/LanguageProvider";

/**
 * useCountUp Hook: Animates a numeric value from 0 to target.
 * Respects prefers-reduced-motion and triggers only when in view.
 */
function useCountUp(valueStr: string, duration = 2000) {
  const [displayValue, setDisplayValue] = useState(valueStr);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  // Parse prefix, number, and suffix (e.g., "+15 h" -> prefix: "+", number: 15, suffix: " h")
  const parsed = useMemo(() => {
    const match = valueStr.match(/^([^0-9]*)([0-9]+)(.*)$/);
    if (!match) return { prefix: "", target: 0, suffix: valueStr };
    return {
      prefix: match[1],
      target: parseInt(match[2], 10),
      suffix: match[3],
    };
  }, [valueStr]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Respect user preference for reduced motion
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setDisplayValue(valueStr);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (elementRef.current) observer.observe(elementRef.current);

    return () => observer.disconnect();
  }, [valueStr]);

  useEffect(() => {
    if (!hasStarted) return;

    let start: number | null = null;
    const { prefix, target, suffix } = parsed;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing: easeOutExpo
      const easedPercentage = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);
      
      const currentCount = Math.floor(easedPercentage * target);
      setDisplayValue(`${prefix}${currentCount}${suffix}`);

      if (percentage < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(valueStr); // Ensure final string matches exactly
      }
    };

    requestAnimationFrame(animate);
  }, [hasStarted, parsed, duration, valueStr]);

  return { displayValue, elementRef };
}

/**
 * Concrete-numbers band. Specificity bias (Carnegie Mellon, 2007;
 * Marketing Sherpa case studies) shows precise figures outperform vague
 * adjectives by 18–32% in perceived credibility and conversion.
 */
export function Stats() {
  const { t } = useLang();
  
  return (
    <section
      aria-label={t.stats.label}
      className="relative border-y border-aura-ink/5 bg-aura-cream/20 px-4 py-8 sm:px-6 sm:py-12 md:py-14"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-4">
        {t.stats.items.map((item, i) => (
          <StatItem key={item.label} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}

function StatItem({ item, index }: { item: { value: string; label: string }; index: number }) {
  const { displayValue, elementRef } = useCountUp(item.value);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center text-center"
    >
      <span 
        ref={elementRef}
        className="font-display text-[clamp(2rem,6vw,3.5rem)] leading-none tracking-tighter text-aura-ink whitespace-nowrap"
      >
        {displayValue}
      </span>
      <span className="mt-3 max-w-[18ch] text-balance text-xs text-aura-ink/60 sm:text-sm">
        {item.label}
      </span>
    </motion.div>
  );
}
