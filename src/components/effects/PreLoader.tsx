import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Ethereal pre-loader. Shows for ~1.5s on first paint, then fades out.
 */
export function PreLoader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Deliberate duration for a premium first look
    const t = setTimeout(() => setShow(false), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          aria-hidden
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1.2, ease: EASE } }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-background"
        >
          {/* Subtle background atmosphere */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 0.15, scale: 1 }}
              transition={{ duration: 2.5, ease: "easeOut" }}
              className="absolute left-1/2 top-1/2 h-[90vmax] w-[90vmax] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[180px]"
              style={{ background: "radial-gradient(circle, hsl(var(--aura-lavender)) 0%, transparent 75%)" }}
            />
          </div>

          <div className="relative flex flex-col items-center">
            {/* Minimal Monogram Reveal */}
            <div className="relative overflow-hidden px-4">
              <motion.div
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-8xl tracking-tighter text-aura-ink md:text-[10rem]"
              >
                es<span className="text-aura-peach">.</span>
              </motion.div>
            </div>

            {/* Subtle Descriptor */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="mt-6 text-[10px] font-bold uppercase tracking-[0.8em] text-aura-ink/30"
            >
              Digital Studio
            </motion.p>

            {/* High-precision line */}
            <div className="absolute -bottom-16 h-[1px] w-20 overflow-hidden bg-aura-ink/5">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
                className="h-full w-full origin-left bg-aura-ink/30"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
