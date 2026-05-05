import { ButtonHTMLAttributes, forwardRef, MouseEvent, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMotionPreference } from "./MotionPreferenceProvider";

type Variant = "dark" | "light" | "ghost";

interface MagneticButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onAnimationStart" | "onDrag" | "onDragEnd" | "onDragStart"> {
  variant?: Variant;
  strength?: number;
  asLink?: boolean;
  href?: string;
}

/**
 * A button that gently follows the cursor when nearby. Pure presentational —
 * pairs with the custom cursor to feel "magnetic".
 */
export const MagneticButton = forwardRef<HTMLButtonElement, MagneticButtonProps>(
  ({ children, className, variant = "dark", strength = 0.35, asLink, href, ...props }, ref) => {
    const localRef = useRef<HTMLButtonElement>(null);
    const { reduced } = useMotionPreference();
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
    const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

    const onMove = (e: MouseEvent<HTMLButtonElement>) => {
      if (reduced) return;
      const el = localRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      x.set((e.clientX - cx) * strength);
      y.set((e.clientY - cy) * strength);
    };

    const onLeave = () => {
      x.set(0);
      y.set(0);
    };

    const setRefs = (node: HTMLButtonElement | null) => {
      (localRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
    };

    const styles = cn(
      "relative inline-flex items-center justify-center rounded-full font-medium tracking-tight transition-colors",
      "px-7 py-4 text-base md:text-[15px]",
      variant === "dark" && "bg-aura-ink text-aura-cream hover:bg-aura-ink/90",
      variant === "light" && "bg-aura-cream text-aura-ink hover:bg-aura-cream/90",
      variant === "ghost" && "text-aura-ink hover:bg-aura-ink/5",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aura-ink/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      className,
    );

    if (asLink && href) {
      return (
        <motion.a
          href={href}
          data-magnetic
          onMouseMove={onMove as unknown as (e: MouseEvent<HTMLAnchorElement>) => void}
          onMouseLeave={onLeave}
          className={styles}
          style={{ x: sx, y: sy }}
        >
          {children}
        </motion.a>
      );
    }

    return (
      <motion.button
        ref={setRefs}
        data-magnetic
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={styles}
        style={{ x: sx, y: sy }}
        {...(props as React.ComponentProps<typeof motion.button>)}
      >
        {children}
      </motion.button>
    );
  },
);
MagneticButton.displayName = "MagneticButton";
