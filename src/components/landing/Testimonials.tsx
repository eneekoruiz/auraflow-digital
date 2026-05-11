import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useLang } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

const monograms = [
  { bg: "bg-aura-peach/25", ring: "ring-aura-peach/40" },
  { bg: "bg-aura-lavender/30", ring: "ring-aura-lavender/50" },
  { bg: "bg-aura-ink/10", ring: "ring-aura-ink/20" },
];

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");

const EASE = [0.22, 1, 0.36, 1] as const;
const AUTOPLAY_MS = 6500;

/**
 * Soft-rotating testimonial carousel. Framer Motion handles the slide
 * crossfade; controls follow WAI-ARIA "carousel" pattern: live region,
 * labelled prev/next, slide picker, and autoplay pauses on hover, focus
 * and when the user prefers reduced motion.
 */
export function Testimonials() {
  const { t } = useLang();
  const items = t.testimonials.items;
  const count = items.length;

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const regionRef = useRef<HTMLDivElement>(null);

  const go = useCallback(
    (next: number) => {
      setDirection(next > index || (index === count - 1 && next === 0) ? 1 : -1);
      setIndex(((next % count) + count) % count);
    },
    [index, count],
  );
  const prev = useCallback(() => go(index - 1), [go, index]);
  const next = useCallback(() => go(index + 1), [go, index]);

  // Autoplay (respects reduced-motion + pause states)
  useEffect(() => {
    if (paused) return;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const id = window.setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % count);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, count]);

  // Keyboard nav when the carousel region has focus
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
    if (e.key === "ArrowRight") { e.preventDefault(); next(); }
  };

  const item = items[index];
  const mono = monograms[index % monograms.length];

  return (
    <section className="relative px-4 py-8 sm:px-6 sm:py-10 md:py-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-aura-ink/40">— {t.testimonials.label}</p>
            <h2 className="text-balance font-display text-[clamp(2rem,7vw,4.5rem)] leading-[0.95] tracking-tighter text-aura-ink">
              {t.testimonials.title}
            </h2>
          </div>

          {/* Controls (desktop) */}
          <div className="hidden items-center gap-2 sm:flex" role="group" aria-label="Carousel controls">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous testimonial"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-aura-ink/15 bg-white/60 text-aura-ink transition-all hover:-translate-y-0.5 hover:bg-white"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next testimonial"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-aura-ink/15 bg-white/60 text-aura-ink transition-all hover:-translate-y-0.5 hover:bg-white"
            >
              <ChevronRight className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>

        {/* Live region */}
        <div
          ref={regionRef}
          role="region"
          aria-roledescription="carousel"
          aria-label={t.testimonials.label}
          tabIndex={0}
          onKeyDown={onKey}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          className="relative overflow-hidden rounded-3xl border border-aura-ink/10 bg-white/60 p-5 backdrop-blur-xl sm:p-8 md:p-10"
        >
          <div aria-live="polite" aria-atomic="true" className="relative min-h-[200px] sm:min-h-[160px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.figure
                key={index}
                custom={direction}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -40 }}
                transition={{ duration: 0.6, ease: EASE }}
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${count}`}
                className="flex flex-col"
              >
                <Quote className="mb-5 h-7 w-7 text-aura-peach" aria-hidden />
                <blockquote className="mb-5 max-w-3xl text-balance font-display text-[clamp(1.1rem,2.6vw,1.65rem)] leading-[1.3] tracking-tight text-aura-ink">
                  "{item.quote}"
                </blockquote>
                <div className="mb-5 flex items-center gap-1 text-aura-peach" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-3.5 w-3.5 fill-current" aria-hidden />
                  ))}
                </div>
                <figcaption className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-full font-display text-base tracking-tight ring-1 text-aura-ink",
                      mono.bg,
                      mono.ring,
                    )}
                  >
                    {initials(item.name)}
                  </span>
                  <div className="leading-tight">
                    <div className="font-medium text-aura-ink">{item.name}</div>
                    <div className="text-xs text-aura-ink/50">{item.role}</div>
                  </div>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* Bottom: dots + mobile arrows */}
          <div className="mt-8 flex items-center justify-between gap-4 border-t border-aura-ink/10 pt-6">
            <div className="flex items-center gap-2" role="tablist" aria-label="Select testimonial">
              {items.map((_, i) => {
                const active = i === index;
                return (
                  <button
                    key={i}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    aria-label={`Go to testimonial ${i + 1}`}
                    onClick={() => go(i)}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-500",
                      active ? "w-8 bg-aura-ink" : "w-3 bg-aura-ink/20 hover:bg-aura-ink/40",
                    )}
                  />
                );
              })}
            </div>

            <div className="flex items-center gap-2 sm:hidden">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous testimonial"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-aura-ink/15 bg-white/70 text-aura-ink"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next testimonial"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-aura-ink/15 bg-white/70 text-aura-ink"
              >
                <ChevronRight className="h-4 w-4" aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
