import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useMotionPreference } from "@/components/effects/MotionPreferenceProvider";

/**
 * ScrollProgressBar: A slim, non-intrusive progress bar at the top of the viewport.
 * Uses scaleX for performance and includes a threshold to avoid cluttering the hero.
 */
export function ScrollProgressBar() {
  const { reduced } = useMotionPreference();
  const { scrollYProgress } = useScroll();

  // Create a spring-smoothed version of the scroll progress
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Threshold: Only show after 8% scroll (0.08)
  const opacity = useTransform(scrollYProgress, [0, 0.08, 0.1], [0, 0, 1]);

  // If reduced motion is active, we don't show the progress bar to avoid constant visual changes
  if (reduced) return null;

  return (
    <motion.div
      style={{
        scaleX,
        opacity,
        transformOrigin: "0%"
      }}
      className="fixed inset-x-0 top-0 z-[100] h-[3px] bg-gradient-to-r from-aura-peach to-aura-lavender"
    />
  );
}
