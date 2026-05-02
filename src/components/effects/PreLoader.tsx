import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Ethereal pre-loader. Shows for ~1.5s on first paint, then fades out.
 */
export function PreLoader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          aria-hidden
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: EASE } }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-background"
        >
          {/* faint pastel orbs behind the loader */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div
              className="absolute -left-[10%] top-[10%] h-[60vmax] w-[60vmax] rounded-full opacity-40"
              style={{ background: "hsl(var(--aura-lavender))", filter: "blur(160px)" }}
            />
            <div
              className="absolute -right-[10%] bottom-[5%] h-[55vmax] w-[55vmax] rounded-full opacity-40"
              style={{ background: "hsl(var(--aura-peach))", filter: "blur(160px)" }}
            />
          </div>

          <div className="relative flex flex-col items-center gap-6">
            <motion.div
              initial={{ opacity: 0, y: 14, letterSpacing: "0.2em" }}
              animate={{ opacity: 1, y: 0, letterSpacing: "-0.04em" }}
              transition={{ duration: 1.1, ease: EASE }}
              className="font-display text-7xl text-aura-ink md:text-8xl"
            >
              es<span className="text-aura-peach">.</span>
            </motion.div>

            <div className="relative h-px w-40 overflow-hidden bg-aura-ink/10">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.4, ease: EASE }}
                className="absolute inset-y-0 w-full bg-aura-ink"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
