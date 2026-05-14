import { useLang } from "@/i18n/LanguageProvider";

/**
 * Outline marquee that scrolls infinitely to the left.
 * Pure CSS animation with duplicated content for seamless loop.
 */
export function Marquee() {
  const { t } = useLang();
  const items = t.marquee;
  const row = (
    <div className="flex shrink-0 items-center gap-12 px-6">
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-12">
          <span className="text-stroke font-display text-[12vw] leading-none tracking-tighter md:text-[8vw]">
            {it}
          </span>
          <span className="h-3 w-3 shrink-0 rounded-full bg-aura-ink/80" aria-hidden />
        </span>
      ))}
    </div>
  );

  return (
    <section
      aria-hidden
      className="relative w-full overflow-hidden border-y border-aura-ink/5 pt-4 pb-12 md:pt-6 md:pb-20"
    >
      {/* Premium Linear Edge Masks */}
      <div className="absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-background via-background/80 to-transparent md:w-64" />
      <div className="absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-background via-background/80 to-transparent md:w-64" />

      <div 
        className="flex w-max animate-marquee whitespace-nowrap opacity-30 mix-blend-multiply transition-opacity duration-1000 hover:opacity-60"
        style={{ animationDuration: "60s" }}
      >
        {row}
        {row}
        {row}
      </div>
    </section>
  );
}
