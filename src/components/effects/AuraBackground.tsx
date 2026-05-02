import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Ethereal Aura — pastel orbs (lavender, mint, peach) that float slowly
 * and softly chase the cursor for an "interactive light" feel.
 */
export function AuraBackground({ dim = false }: { dim?: boolean }) {
  const opacity = dim ? 0.22 : 0.55;
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 30, damping: 20, mass: 1 });
  const sy = useSpring(my, { stiffness: 30, damping: 20, mass: 1 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 80;
      const y = (e.clientY / window.innerHeight - 0.5) * 80;
      mx.set(x);
      my.set(y);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ contain: "strict" }}
    >
      {/* Lavender */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "60vmax",
          height: "60vmax",
          background: "hsl(var(--aura-lavender))",
          filter: "blur(160px)",
          opacity,
          willChange: "transform",
          x: sx,
          y: sy,
          left: "-15%",
          top: "-20%",
        }}
        animate={{
          translateX: ["0%", "10%", "-5%", "0%"],
          translateY: ["0%", "8%", "-6%", "0%"],
          scale: [1, 1.12, 0.96, 1],
        }}
        transition={{ duration: 38, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Mint */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "55vmax",
          height: "55vmax",
          background: "hsl(var(--aura-mint))",
          filter: "blur(170px)",
          opacity: opacity * 0.9,
          willChange: "transform",
          x: sx,
          y: sy,
          right: "-10%",
          top: "10%",
        }}
        animate={{
          translateX: ["0%", "-12%", "6%", "0%"],
          translateY: ["0%", "10%", "-4%", "0%"],
          scale: [1, 0.92, 1.1, 1],
        }}
        transition={{ duration: 46, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Peach */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "50vmax",
          height: "50vmax",
          background: "hsl(var(--aura-peach))",
          filter: "blur(160px)",
          opacity: opacity * 0.85,
          willChange: "transform",
          x: sx,
          y: sy,
          left: "20%",
          bottom: "-20%",
        }}
        animate={{
          translateX: ["0%", "14%", "-8%", "0%"],
          translateY: ["0%", "-10%", "4%", "0%"],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 52, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Soften wash to keep contrast */}
      <div
        className="absolute inset-0"
        style={{
          background: dim
            ? "radial-gradient(ellipse at center, hsl(0 0% 4% / 0) 0%, hsl(0 0% 4% / 0.55) 80%)"
            : "radial-gradient(ellipse at center, hsl(0 0% 100% / 0) 0%, hsl(0 0% 100% / 0.55) 75%)",
        }}
      />
    </div>
  );
}
