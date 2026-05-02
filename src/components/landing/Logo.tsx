import { useLang } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  invert?: boolean;
}

const INITIALS = "es"; // ← edit to your initials

export function Logo({ className, invert }: Props) {
  useLang();
  return (
    <a
      href="#top"
      aria-label="Inicio"
      className={cn(
        "group inline-flex items-end gap-1 leading-none",
        invert ? "text-white" : "text-aura-ink",
        className,
      )}
    >
      <span className="font-display text-3xl tracking-tighter">{INITIALS}</span>
      <span className="mb-[0.4rem] block h-1.5 w-1.5 rounded-full bg-aura-peach transition-transform duration-500 group-hover:scale-150" />
    </a>
  );
}
