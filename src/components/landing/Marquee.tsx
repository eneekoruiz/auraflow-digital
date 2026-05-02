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
      className="relative w-full overflow-hidden border-y border-aura-ink/10 py-10"
    >
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {row}
        {row}
      </div>
    </section>
  );
}
