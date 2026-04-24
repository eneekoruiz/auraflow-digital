import { useLang } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  invert?: boolean;
}

/**
 * Monogram logo. Two initials in a serif display face — change the
 * INITIALS constant below to update the brand mark site-wide.
 */
const INITIALS = "es"; // ← edit this to your initials

export function Logo({ className, invert }: Props) {
  // language is unused here but the hook keeps re-renders consistent
  // when language changes (so screen readers re-read).
  useLang();
  return (
    <a
      href="#top"
      aria-label="Inicio"
      className={cn(
        "group inline-flex items-end gap-1 leading-none",
        invert ? "text-aura-cream" : "text-aura-ink",
        className,
      )}
    >
      <span className="font-display text-3xl tracking-tighter">{INITIALS}</span>
      <span className="mb-[0.35rem] block h-1.5 w-1.5 rounded-full bg-aura-orange transition-transform duration-500 group-hover:scale-150" />
    </a>
  );
}
