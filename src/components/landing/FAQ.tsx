import { useEffect, useId, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Search, X } from "lucide-react";
import { useLang } from "@/i18n/LanguageProvider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MagneticButton } from "@/components/effects/MagneticButton";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Objection-handling FAQ. Questions are grouped by the four most common
 * stalls in B2B services: timing, pricing, scope, support (Gartner buyer
 * journey research). Filterable chips let visitors jump to their objection
 * — research on FAQ patterns (NN/g 2022) shows topical filtering raises
 * read-through ~40%. Each open fires an analytics event for funnel insight.
 */
export function FAQ() {
  const { t } = useLang();
  const items = t.faq.items;

  const tags = useMemo(() => {
    const seen: string[] = [];
    for (const it of items) if (!seen.includes(it.tag)) seen.push(it.tag);
    return seen;
  }, [items]);

  const [active, setActive] = useState<string | "all">("all");
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();
  const listId = useId();

  const q = query.trim().toLowerCase();
  const filtered = useMemo(() => {
    let list = active === "all" ? items : items.filter((i) => i.tag === active);
    if (q) list = list.filter((i) => `${i.q} ${i.a} ${i.tag}`.toLowerCase().includes(q));
    return list;
  }, [items, active, q]);

  // Debounced analytics on search (only when 2+ chars and stable for 600ms)
  useEffect(() => {
    if (q.length < 2) return;
    const id = window.setTimeout(() => {
      track("faq_search", { query: q, results: filtered.length });
    }, 600);
    return () => window.clearTimeout(id);
  }, [q, filtered.length]);

  // "/" focuses the search box (skip when typing in another field)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      e.preventDefault();
      inputRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section id="faq" className="relative px-4 py-20 sm:px-6 sm:py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 sm:gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-aura-ink/40">— {t.faq.label}</p>
          <h2 className="text-balance font-display text-[clamp(2rem,7vw,4rem)] leading-[0.95] tracking-tighter text-aura-ink">
            {t.faq.title}
          </h2>

          {/* Filter chips */}
          <div className="mt-8 flex flex-wrap gap-2">
            <Chip active={active === "all"} onClick={() => setActive("all")}>
              {/* Localized "All" — using a generic dot to avoid extra dict keys */}
              ·
            </Chip>
            {tags.map((tag) => (
              <Chip
                key={tag}
                active={active === tag}
                onClick={() => {
                  setActive(tag);
                  track("faq_filter", { tag });
                }}
              >
                {tag}
              </Chip>
            ))}
          </div>

          {/* Soft CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mt-10 hidden rounded-3xl border border-aura-ink/10 bg-gradient-to-br from-aura-peach/15 via-white/40 to-aura-lavender/15 p-6 backdrop-blur md:block"
          >
            <p className="font-display text-xl tracking-tight text-aura-ink">{t.faq.cta.title}</p>
            <p className="mt-2 text-sm text-aura-ink/65">{t.faq.cta.body}</p>
            <div className="mt-5">
              <MagneticButton
                asLink
                href="#contact"
                variant="dark"
                className="px-5 py-3 text-sm"
                onClick={() => track("cta_click", { location: "faq_card" })}
              >
                <span className="inline-flex items-center gap-2">
                  {t.faq.cta.button} <ArrowRight className="h-4 w-4" />
                </span>
              </MagneticButton>
            </div>
          </motion.div>
        </div>

        <div className="md:col-span-7">
          <Accordion
            type="single"
            collapsible
            className="w-full"
            onValueChange={(v) => {
              if (!v) return;
              const idx = Number(v.replace("item-", ""));
              const it = filtered[idx];
              if (it) track("faq_open", { tag: it.tag, q: it.q });
            }}
          >
            {filtered.map((item, i) => (
              <motion.div
                key={`${active}-${i}`}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.04, ease: EASE }}
              >
                <AccordionItem
                  value={`item-${i}`}
                  className="border-b border-aura-ink/10"
                >
                  <AccordionTrigger className="group gap-4 py-5 text-left font-display text-xl tracking-tight text-aura-ink hover:no-underline sm:py-6 sm:text-2xl md:text-[1.65rem]">
                    <span className="flex flex-1 items-start gap-3">
                      <span className="mt-2 inline-flex shrink-0 items-center rounded-full bg-aura-ink/5 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-aura-ink/55">
                        {item.tag}
                      </span>
                      <span className="flex-1">{item.q}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 pl-0 text-base leading-relaxed text-aura-ink/70 md:text-lg md:pl-[5.25rem]">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>

          {/* Mobile CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mt-10 rounded-3xl border border-aura-ink/10 bg-gradient-to-br from-aura-peach/15 via-white/40 to-aura-lavender/15 p-6 backdrop-blur md:hidden"
          >
            <p className="font-display text-xl tracking-tight text-aura-ink">{t.faq.cta.title}</p>
            <p className="mt-2 text-sm text-aura-ink/65">{t.faq.cta.body}</p>
            <div className="mt-5">
              <MagneticButton
                asLink
                href="#contact"
                variant="dark"
                className="px-5 py-3 text-sm"
                onClick={() => track("cta_click", { location: "faq_card_mobile" })}
              >
                <span className="inline-flex items-center gap-2">
                  {t.faq.cta.button} <ArrowRight className="h-4 w-4" />
                </span>
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Chip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.18em] transition-all",
        active
          ? "border-aura-ink bg-aura-ink text-aura-cream"
          : "border-aura-ink/15 bg-white/40 text-aura-ink/65 hover:border-aura-ink/30 hover:text-aura-ink",
      )}
    >
      {children}
    </button>
  );
}
