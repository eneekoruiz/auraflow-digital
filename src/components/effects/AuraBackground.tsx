import { motion } from "framer-motion";

/**
 * Dynamic Aura — three large blurred orbs floating slowly.
 * Sits behind everything. Pointer-events disabled.
 */
export function AuraBackground({ dim = false }: { dim?: boolean }) {
  const opacity = dim ? 0.18 : 0.55;
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ contain: "strict" }}
    >
      {/* Orange */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "55vmax",
          height: "55vmax",
          background: "hsl(var(--aura-orange))",
          filter: "blur(140px)",
          opacity,
          willChange: "transform",
        }}
        initial={{ x: "-20%", y: "-25%", scale: 1 }}
        animate={{
          x: ["-20%", "5%", "-15%", "-20%"],
          y: ["-25%", "-10%", "-30%", "-25%"],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{ duration: 38, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Magenta */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "50vmax",
          height: "50vmax",
          background: "hsl(var(--aura-magenta))",
          filter: "blur(150px)",
          opacity: opacity * 0.8,
          willChange: "transform",
          right: 0,
          top: "20%",
        }}
        animate={{
          x: ["10%", "-10%", "15%", "10%"],
          y: ["0%", "20%", "-5%", "0%"],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{ duration: 44, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Electric blue */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "45vmax",
          height: "45vmax",
          background: "hsl(var(--aura-blue))",
          filter: "blur(160px)",
          opacity: opacity * 0.7,
          willChange: "transform",
          left: "20%",
          bottom: "-15%",
        }}
        animate={{
          x: ["0%", "20%", "-10%", "0%"],
          y: ["0%", "-15%", "5%", "0%"],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 50, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Cream wash to soften */}
      <div
        className="absolute inset-0"
        style={{
          background: dim
            ? "radial-gradient(ellipse at center, hsl(0 0% 4% / 0) 0%, hsl(0 0% 4% / 0.7) 80%)"
            : "radial-gradient(ellipse at center, hsl(var(--aura-cream) / 0) 0%, hsl(var(--aura-cream) / 0.45) 75%)",
        }}
      />
    </div>
  );
}
