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
 * Keyboard-friendly (native button + role="switch" + aria-checked).
 */
export function MotionToggle({ tone = "light", className }: Props) {
  const { reduced, toggle } = useMotionPreference();
  const { t } = useLang();
  const label = reduced ? t.motion.enable : t.motion.reduce;

  const isDark = tone === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={reduced}
      aria-label={label}
      title={label}
      onClick={toggle}
      className={cn(
        "group inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors",
        isDark
          ? "border-white/15 bg-white/[0.04] text-white/70 hover:border-white/30 hover:text-white"
          : "border-aura-ink/10 bg-white/60 text-aura-ink/70 backdrop-blur hover:bg-white/80 hover:text-aura-ink",
        className,
      )}
    >
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
          {reduced ? t.motion.short.reduced : t.motion.short.full}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
