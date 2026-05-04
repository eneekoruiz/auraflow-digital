import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useMotionPreference } from "./MotionPreferenceProvider";

interface Props {
  text: string;
  className?: string;
}

/**
 * Word-by-word brightness reveal driven by scroll progress.
 * When motion is reduced, the text is shown at full opacity immediately —
 * no scroll-locked transforms, no per-word fades.
 */
export function ScrollRevealText({ text, className }: Props) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { reduced } = useMotionPreference();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.4"],
  });

  const words = text.split(" ");

  if (reduced) {
    return (
      <p ref={ref} className={className}>
        {text}
      </p>
    );
  }

  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {w}
          </Word>
        );
      })}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <span className="inline-block whitespace-pre">
      <motion.span style={{ opacity }} className="inline-block">
        {children}
      </motion.span>
      <span> </span>
    </span>
  );
}
