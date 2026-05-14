import { useEffect, useId, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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

// Replace with your real WhatsApp number (international format, no "+")
const WHATSAPP_NUMBER = "34600000000";

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
  const [openItem, setOpenItem] = useState<string | undefined>(undefined);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const [showAll, setShowAll] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const firstTriggerRef = useRef<HTMLButtonElement>(null);
  const suggestionsRef = useRef<HTMLUListElement>(null);
  const inputId = useId();
  const listId = useId();
  const suggestionsId = useId();

  const q = query.trim().toLowerCase();

  const filtered = useMemo(() => {
    let list = active === "all" ? items : items.filter((i) => i.tag === active);
    if (q) list = list.filter((i) => `${i.q} ${i.a} ${i.tag}`.toLowerCase().includes(q));
    return list;
  }, [items, active, q]);

  const grouped = useMemo(() => {
    const map: Record<string, typeof items> = {};
    filtered.forEach((it) => {
      if (!map[it.tag]) map[it.tag] = [];
      map[it.tag].push(it);
    });
    return map;
  }, [filtered]);

  const activeTags = Object.keys(grouped);
  const displayTags = useMemo(() => {
    if (showAll || q.length > 0 || active !== "all") return activeTags;
    return activeTags.slice(0, 2);
  }, [activeTags, showAll, q, active]);

  const suggestions = useMemo(() => {
    const raw = query.trim();
    if (raw.length < 2) return [];
    const low = raw.toLowerCase();
    const out: string[] = [];
    for (const tag of tags) if (tag.toLowerCase().includes(low)) out.push(tag);
    for (const item of items) {
      if (item.q.toLowerCase().includes(low)) {
        const label = item.q.length > 62 ? item.q.slice(0, 62) + "…" : item.q;
        if (!out.includes(label)) out.push(label);
      }
    }
    return out.slice(0, 6);
  }, [query, items, tags]);

  const handleClear = () => {
    setQuery("");
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const applySuggestion = (label: string) => {
    setQuery(label);
    setShowSuggestions(false);
    setActiveSuggestion(-1);
    inputRef.current?.focus();
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (showSuggestions && suggestions.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveSuggestion((s) => Math.min(s + 1, suggestions.length - 1));
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveSuggestion((s) => Math.max(s - 1, -1));
        return;
      }
      if (e.key === "Enter" && activeSuggestion >= 0) {
        e.preventDefault();
        applySuggestion(suggestions[activeSuggestion]);
        return;
      }
    }
    if (e.key === "Escape") setShowSuggestions(false);
  };

  const whatsappFAQHref = (question: string) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      `Hola, tengo una duda sobre: "${question}"`,
    )}`;

  useEffect(() => {
    setOpenItem(undefined);
    setActiveSuggestion(-1);
  }, [active, q]);

  useEffect(() => {
    if (q.length > 0 || active !== "all") setShowAll(true);
  }, [q, active]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (
        inputRef.current && !inputRef.current.contains(e.target as Node) &&
        suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <section id="faq" className="relative px-4 py-10 sm:px-6 sm:py-16 md:py-20">
      <div className="mx-auto w-full max-w-6xl">
        <header className="mb-16 text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-aura-ink/40">— {t.faq.label}</p>
          <h2 className="text-balance font-display text-[clamp(2.25rem,6vw,4rem)] leading-[0.95] tracking-tighter text-aura-ink">
            {t.faq.title}
          </h2>

          <div className="relative mx-auto mt-10 max-w-xl">
            <label htmlFor={inputId} className="sr-only">{t.faq.search.placeholder}</label>
            <div className="group relative flex items-center rounded-2xl border border-aura-ink/10 bg-white/40 backdrop-blur-xl transition-all focus-within:border-aura-ink/30 focus-within:bg-white/80 focus-within:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.15)]">
              <Search className="ml-5 h-4 w-4 shrink-0 text-aura-ink/40" aria-hidden />
              <input
                ref={inputRef}
                id={inputId}
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setShowSuggestions(true);
                  setActiveSuggestion(-1);
                }}
                onFocus={() => query.trim().length >= 2 && setShowSuggestions(true)}
                onKeyDown={handleInputKeyDown}
                placeholder={t.faq.search.placeholder}
                className="flex-1 bg-transparent px-4 py-4 text-sm text-aura-ink placeholder:text-aura-ink/30 outline-none md:py-5 md:text-base"
              />
              {query && (
                <button type="button" onClick={handleClear} className="mr-3 inline-flex h-8 w-8 items-center justify-center rounded-full text-aura-ink/30 transition-colors hover:bg-aura-ink/5 hover:text-aura-ink">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <AnimatePresence>
              {showSuggestions && suggestions.length > 0 && (
                <motion.ul
                  ref={suggestionsRef}
                  id={suggestionsId}
                  role="listbox"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, ease: EASE }}
                  className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-aura-ink/10 bg-white/95 shadow-2xl backdrop-blur-xl"
                >
                  {suggestions.map((s, i) => (
                    <li
                      key={i}
                      role="option"
                      aria-selected={i === activeSuggestion}
                      onMouseDown={(e) => { e.preventDefault(); applySuggestion(s); }}
                      className={cn(
                        "flex cursor-pointer items-center gap-3 px-5 py-4 text-sm text-aura-ink transition-colors",
                        i === activeSuggestion ? "bg-aura-peach/10" : "hover:bg-aura-ink/5",
                        i > 0 && "border-t border-aura-ink/5",
                      )}
                    >
                      <Search className="h-3.5 w-3.5 text-aura-ink/30" />
                      <span className="truncate">{s}</span>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            <Chip active={active === "all"} onClick={() => setActive("all")}>{t.faq.search.all}</Chip>
            {tags.map((tag) => (
              <Chip key={tag} active={active === tag} onClick={() => setActive(tag)}>{tag}</Chip>
            ))}
          </div>
        </header>

        <div className="space-y-16">
          <AnimatePresence>
            {displayTags.map((tag) => (
              <motion.div
                key={tag}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ 
                  opacity: { duration: 0.4 },
                  layout: { duration: 0.5, ease: EASE }
                }}
                className="space-y-6"
              >
                <div className="flex items-center gap-4">
                  <h3 className="text-xs font-bold uppercase tracking-[0.4em] text-aura-ink/30">{tag}</h3>
                  <div className="h-px flex-1 bg-aura-ink/5" />
                </div>
                
                <Accordion type="single" collapsible className="w-full space-y-3">
                  {grouped[tag].map((item, i) => (
                    <AccordionItem 
                      key={i} 
                      value={`item-${tag}-${i}`} 
                      className="overflow-hidden rounded-2xl border border-aura-ink/5 bg-white/40 transition-all hover:border-aura-ink/10 hover:bg-white/60"
                    >
                      <AccordionTrigger className="px-6 py-5 text-left font-display text-lg tracking-tight text-aura-ink hover:no-underline md:text-xl">
                        <Mark text={item.q} query={q} />
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-6 text-base leading-relaxed text-aura-ink/65 md:text-lg">
                        <Mark text={item.a} query={q} />
                        <div className="mt-6 flex">
                          <a
                            href={whatsappFAQHref(item.q)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full bg-[#25D366]/10 px-4 py-2 text-xs font-bold text-[#1a9e4c] transition-colors hover:bg-[#25D366]/20"
                          >
                            {t.faq.askMe}
                          </a>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 text-center">
            <p className="text-aura-ink/50">{t.faq.search.empty} <span className="font-bold text-aura-ink">"{query}"</span></p>
            <button onClick={handleClear} className="mt-4 text-xs font-bold uppercase tracking-widest text-aura-peach underline decoration-aura-peach/30 underline-offset-4">{t.faq.viewAll}</button>
          </motion.div>
        )}

        {q.length === 0 && active === "all" && activeTags.length > 2 && (
          <div className="mt-16 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll(!showAll)}
              className="group flex items-center gap-3 rounded-full border border-aura-ink/10 bg-white/60 px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] text-aura-ink/60 transition-all hover:border-aura-ink/30 hover:bg-white hover:text-aura-ink"
            >
              {showAll ? t.faq.showLess : t.faq.showMore}
              <motion.div animate={{ rotate: showAll ? 180 : 0 }} transition={{ duration: 0.4, ease: EASE }}>
                <ArrowRight className="h-4 w-4" />
              </motion.div>
            </button>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mt-24 overflow-hidden rounded-[2.5rem] bg-aura-ink p-8 text-center text-aura-cream shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] md:p-14"
        >
          {/* Background Aura Effects */}
          <div aria-hidden className="aura-blend-overlay pointer-events-none absolute inset-0 -z-0 overflow-hidden">
            <div className="absolute -left-[10%] top-[10%] h-[50vmax] w-[50vmax] rounded-full opacity-25" style={{ background: "hsl(var(--aura-lavender))", filter: "blur(120px)" }} />
            <div className="absolute -right-[10%] bottom-[10%] h-[45vmax] w-[45vmax] rounded-full opacity-20" style={{ background: "hsl(var(--aura-peach))", filter: "blur(120px)" }} />
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
          </div>

          <div className="relative z-10">
            <h3 className="font-display text-3xl tracking-tight text-white md:text-4xl">{t.faq.cta.title}</h3>
            <p className="mx-auto mt-4 max-w-lg text-white/60 md:text-lg">{t.faq.cta.body}</p>
            <div className="mt-10 flex justify-center">
              <MagneticButton asLink href="#contact" variant="light" className="px-10 py-5 text-base font-semibold">
                <span className="flex items-center gap-2">
                  {t.faq.cta.button} <ArrowRight className="h-5 w-5" />
                </span>
              </MagneticButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Chip({ children, active, onClick }: { children: React.ReactNode; active?: boolean; onClick?: () => void; }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] transition-all sm:px-3.5 sm:py-1.5",
        active
          ? "border-aura-ink bg-aura-ink text-aura-cream"
          : "border-aura-ink/15 bg-white/40 text-aura-ink/65 hover:border-aura-ink/30 hover:text-aura-ink",
      )}
    >
      {children}
    </button>
  );
}

function escapeRe(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function Mark({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>;
  const re = new RegExp(`(${escapeRe(query)})`, "ig");
  const parts = text.split(re);
  return (
    <>
      {parts.map((p, i) =>
        p.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="rounded bg-aura-peach/40 px-0.5 text-aura-ink">{p}</mark>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  );
}
