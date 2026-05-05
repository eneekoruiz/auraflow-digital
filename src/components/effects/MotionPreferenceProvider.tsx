import { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from "react";

/**
 * Motion preference: "auto" follows the OS `prefers-reduced-motion` setting,
 * "full" forces normal animations, "reduced" forces calmer / disabled motion.
 *
 * Components should consume `reduced` (the resolved boolean) to slow down or
 * disable non-essential motion. We also expose a `multiplier` (1 = full speed,
 * 0 = no animation) so subtle effects can be eased rather than killed.
 */

export type MotionChoice = "auto" | "full" | "reduced";

interface Ctx {
  choice: MotionChoice;
  setChoice: (c: MotionChoice) => void;
  toggle: () => void;
  reduced: boolean;
  /** True when the OS reports prefers-reduced-motion. */
  systemReduced: boolean;
  /** What's driving the current `reduced` value. */
  source: "system" | "user" | "none";
  /** 0 → fully disabled, 1 → normal speed. Use to scale durations / amplitudes. */
  multiplier: number;
}

const MotionContext = createContext<Ctx | null>(null);
const STORAGE_KEY = "estudio.motion";

function readStored(): MotionChoice {
  if (typeof window === "undefined") return "auto";
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    if (v === "auto" || v === "full" || v === "reduced") return v;
  } catch { /* noop */ }
  return "auto";
}

export function MotionPreferenceProvider({ children }: { children: ReactNode }) {
  const [choice, setChoiceState] = useState<MotionChoice>("auto");
  const [systemReduced, setSystemReduced] = useState(false);

  // Read stored value once
  useEffect(() => {
    setChoiceState(readStored());
  }, []);

  // Watch OS-level preference
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setSystemReduced(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  const setChoice = useCallback((c: MotionChoice) => {
    setChoiceState(c);
    try { window.localStorage.setItem(STORAGE_KEY, c); } catch { /* noop */ }
  }, []);

  const reduced = choice === "reduced" || (choice === "auto" && systemReduced);

  // Reflect on <html> so global CSS rules can react too
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.dataset.motion = reduced ? "reduced" : "full";
  }, [reduced]);

  const value = useMemo<Ctx>(() => ({
    choice,
    setChoice,
    toggle: () => setChoice(reduced ? "full" : "reduced"),
    reduced,
    multiplier: reduced ? 0.25 : 1,
  }), [choice, reduced, setChoice]);

  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
}

export function useMotionPreference() {
  const ctx = useContext(MotionContext);
  if (!ctx) throw new Error("useMotionPreference must be used inside MotionPreferenceProvider");
  return ctx;
}
