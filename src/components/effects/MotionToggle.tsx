import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Zap } from "lucide-react";
import { useMotionPreference } from "@/components/effects/MotionPreferenceProvider";
import { useLang } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

interface Props {
  /** "light" for cream surfaces, "dark" for ink surfaces. */
  tone?: "light" | "dark";
  className?: string;
}

/**
 * Accessible toggle for the "Reduce motion" preference.
 * Shows the current resolved mode (Calm / Motion) and whether it's coming
 * from the OS or a manual choice.
 */
export function MotionToggle({ tone = "light", className }: Props) {
  const { reduced, source, toggle } = useMotionPreference();
  const { t } = useLang();

  const stateLabel = reduced ? t.motion.state.reduced : t.motion.state.full;
  const sourceLabel = source === "none" ? "" : t.motion.source[source];
  const actionLabel = reduced ? t.motion.enable : t.motion.reduce;
  const ariaLabel = sourceLabel ? `${stateLabel} (${sourceLabel}). ${actionLabel}` : `${stateLabel}. ${actionLabel}`;

  const isDark = tone === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={reduced}
      aria-label={ariaLabel}
      title={ariaLabel}
      onClick={toggle}
      className={cn(
        "group inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors",
        isDark
          ? "border-white/15 bg-white/[0.04] text-white/70 hover:border-white/30 hover:text-white"
          : "border-aura-ink/10 bg-white/60 text-aura-ink/70 backdrop-blur hover:bg-white/80 hover:text-aura-ink",
        className,
      )}
    >
      {/* Live status dot */}
      <span aria-hidden className="relative inline-flex h-2 w-2">
        <span
          className={cn(
            "absolute inset-0 rounded-full",
            reduced ? "bg-amber-500" : "bg-emerald-500",
          )}
        />
        {!reduced && (
          <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500/60" />
        )}
      </span>

      {/* Switch track */}
      <span
        aria-hidden
        className={cn(
          "relative inline-flex h-3.5 w-6 items-center rounded-full transition-colors",
          reduced
            ? isDark ? "bg-white/30" : "bg-aura-ink/30"
            : isDark ? "bg-white" : "bg-aura-ink",
        )}
      >
        <span
          className={cn(
            "absolute h-3 w-3 rounded-full transition-all duration-300",
            isDark ? "bg-aura-ink" : "bg-white",
            reduced ? "left-0.5" : "left-[calc(100%-0.875rem)]",
          )}
        />
      </span>

      {/* Resolved state + source */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={reduced ? "reduced" : "full"}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2, ease: EASE }}
          className="hidden items-center gap-1.5 sm:inline-flex"
        >
          {reduced ? <Sparkles className="h-3 w-3" /> : <Zap className="h-3 w-3" />}
          <span>{reduced ? t.motion.short.reduced : t.motion.short.full}</span>
          {sourceLabel && (
            <span
              className={cn(
                "rounded-full px-1.5 py-px text-[9px] font-medium normal-case tracking-normal",
                source === "system"
                  ? isDark ? "bg-white/10 text-white/60" : "bg-aura-ink/10 text-aura-ink/60"
                  : isDark ? "bg-emerald-400/15 text-emerald-200" : "bg-emerald-500/15 text-emerald-700",
              )}
            >
              {source === "system" ? "OS" : "Manual"}
            </span>
          )}
        </motion.span>
      </AnimatePresence>

      <span className="sr-only" aria-live="polite">{stateLabel}</span>
    </button>
  );
}
