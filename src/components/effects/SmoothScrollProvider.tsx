import { ReactNode, useEffect } from "react";
import Lenis from "lenis";
import { useMotionPreference } from "./MotionPreferenceProvider";

/**
 * Wraps the app in a Lenis smooth-scroll instance.
 * Disables itself when the user (or OS) prefers reduced motion.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const { reduced } = useMotionPreference();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (reduced) return; // native scroll, no animation

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Anchor links: let Lenis handle smooth scroll-to.
    const onClick = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const link = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!link) return;
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      const offset = id === "#contact" ? 0 : -80;
      lenis.scrollTo(el as HTMLElement, { offset, duration: 1.4 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [reduced]);

  // When reduced, intercept anchor clicks and jump instantly (no smooth).
  useEffect(() => {
    if (!reduced || typeof document === "undefined") return;
    const onClick = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const link = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!link) return;
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id) as HTMLElement | null;
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: "auto", block: "start" });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [reduced]);

  return <>{children}</>;
}
