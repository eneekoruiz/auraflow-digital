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

  // Autocomplete: tags first, then truncated questions
  const suggestions = useMemo(() => {
    const raw = query.trim();
    if (raw.length < 2) return [];
    const low = raw.toLowerCase();
    const out: string[] = [];
    for (const tag of tags) {
      if (tag.toLowerCase().includes(low)) out.push(tag);
    }
    for (const item of items) {
      if (item.q.toLowerCase().includes(low)) {
        const label = item.q.length > 62 ? item.q.slice(0, 62) + "…" : item.q;
        if (!out.includes(label)) out.push(label);
      }
    }
    return out.slice(0, 6);
  }, [query, items, tags]);

  // Debounced search analytics
  useEffect(() => {
    if (q.length < 2) return;
    const id = window.setTimeout(
      () => track("faq_search", { query: q, results: filtered.length }),
      600,
    );
    return () => window.clearTimeout(id);
  }, [q, filtered.length]);

  // Reset accordion when filter/query changes
  useEffect(() => {
    setOpenItem(undefined);
    setActiveSuggestion(-1);
  }, [active, q]);

  // "/" shortcut focuses search
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

  // Close suggestions on outside click
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

  const handleClear = () => {
    track("faq_search_clear", { had_query: q.length > 0, results_before: filtered.length });
    setQuery("");
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const openFirstItem = () => {
    if (filtered.length === 0) return;
    setOpenItem("item-0");
    setShowSuggestions(false);
    setTimeout(() => {
      firstTriggerRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      firstTriggerRef.current?.focus();
    }, 60);
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
    if (e.key === "Enter") {
      e.preventDefault();
      track("faq_enter_open", { query: q, results: filtered.length });
      openFirstItem();
    }
    if (e.key === "Escape") setShowSuggestions(false);
  };

  const applySuggestion = (label: string) => {
    setQuery(label);
    setShowSuggestions(false);
    setActiveSuggestion(-1);
    inputRef.current?.focus();
  };

  const whatsappFAQHref = (question: string) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      `Hola, tengo una duda sobre: "${question}"`,
    )}`;

  return (
    <section id="faq" className="relative px-4 py-16 sm:px-6 sm:py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 sm:gap-12 md:grid-cols-12 md:gap-16">

        {/* ── Left column ─────────────────────────────────────── */}
        <div className="md:col-span-5">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-aura-ink/40">— {t.faq.label}</p>
          <h2 className="text-balance font-display text-[clamp(2rem,7vw,4rem)] leading-[0.95] tracking-tighter text-aura-ink">
            {t.faq.title}
          </h2>

          {/* Search box */}
          <div className="relative mt-8">
            <label htmlFor={inputId} className="sr-only">{t.faq.search.placeholder}</label>
            <div className="group relative flex items-center rounded-full border border-aura-ink/15 bg-white/70 backdrop-blur transition-all focus-within:border-aura-ink/40 focus-within:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.15)]">
              <Search className="ml-4 h-4 w-4 shrink-0 text-aura-ink/45" aria-hidden />
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
                aria-controls={listId}
                aria-autocomplete="list"
                aria-expanded={showSuggestions && suggestions.length > 0}
                aria-haspopup="listbox"
                aria-activedescendant={activeSuggestion >= 0 ? `${suggestionsId}-${activeSuggestion}` : undefined}
                autoComplete="off"
                className="flex-1 bg-transparent px-3 py-3.5 text-sm text-aura-ink placeholder:text-aura-ink/40 outline-none sm:py-4"
              />
              {query ? (
                <button
                  type="button"
                  onClick={handleClear}
                  aria-label={t.faq.search.clear}
                  className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full text-aura-ink/50 transition-colors hover:bg-aura-ink/5 hover:text-aura-ink"
                >
                  <X className="h-3.5 w-3.5" aria-hidden />
                </button>
              ) : (
                <kbd className="mr-3 hidden rounded-md border border-aura-ink/15 bg-white/60 px-1.5 py-0.5 font-mono text-[10px] text-aura-ink/45 sm:inline-block">/</kbd>
              )}
            </div>

            {/* Autocomplete dropdown */}
            <AnimatePresence>
              {showSuggestions && suggestions.length > 0 && (
                <motion.ul
                  ref={suggestionsRef}
                  id={suggestionsId}
                  role="listbox"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18, ease: EASE }}
                  className="absolute left-0 right-0 top-full z-50 mt-1.5 overflow-hidden rounded-2xl border border-aura-ink/10 bg-white/95 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.2)] backdrop-blur"
                >
                  {suggestions.map((s, i) => (
                    <li
                      key={i}
                      id={`${suggestionsId}-${i}`}
                      role="option"
                      aria-selected={i === activeSuggestion}
                      onMouseDown={(e) => { e.preventDefault(); applySuggestion(s); }}
                      className={cn(
                        "flex cursor-pointer items-center gap-3 px-4 py-3 text-sm text-aura-ink transition-colors",
                        i === activeSuggestion ? "bg-aura-peach/15" : "hover:bg-aura-ink/5",
                        i > 0 && "border-t border-aura-ink/5",
                      )}
                    >
                      <Search className="h-3 w-3 shrink-0 text-aura-ink/30" aria-hidden />
                      <span className="flex-1 truncate">{s}</span>
                    </li>
                  ))}
                  <li className="border-t border-aura-ink/5 px-4 py-2">
                    <span className="text-[10px] uppercase tracking-[0.15em] text-aura-ink/35">↵ Enter para abrir el primero</span>
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
            <p className="sr-only" aria-live="polite">{filtered.length} resultados</p>
          </div>

          {/* Filter chips — larger touch targets on mobile */}
          <div className="mt-5 flex flex-wrap gap-2">
            <Chip active={active === "all"} onClick={() => setActive("all")}>
              {t.faq.search.all}
            </Chip>
            {tags.map((tag) => (
              <Chip
                key={tag}
                active={active === tag}
                onClick={() => { setActive(tag); track("faq_filter", { tag }); }}
              >
                {tag}
              </Chip>
            ))}
          </div>

          {/* Soft CTA card (desktop) */}
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

        {/* ── Right column — accordion ─────────────────────────── */}
        <div className="md:col-span-7">
          <Accordion
            id={listId}
            type="single"
            collapsible
            value={openItem ?? ""}
            onValueChange={(v) => {
              setOpenItem(v || undefined);
              if (!v) return;
              const idx = Number(v.replace("item-", ""));
              const it = filtered[idx];
              if (it) track("faq_open", { tag: it.tag, q: it.q });
            }}
            className="w-full"
          >
            {filtered.map((item, i) => (
              <motion.div
                key={`${active}-${q}-${i}`}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.03, 0.18), ease: EASE }}
              >
                <AccordionItem value={`item-${i}`} className="border-b border-aura-ink/10">
                  <AccordionTrigger
                    ref={i === 0 ? firstTriggerRef : undefined}
                    className="group gap-4 py-5 text-left font-display text-lg tracking-tight text-aura-ink hover:no-underline sm:py-6 sm:text-xl md:text-[1.65rem]"
                  >
                    <span className="flex flex-1 items-start gap-3">
                      <span className="mt-1.5 inline-flex shrink-0 items-center rounded-full bg-aura-ink/5 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-aura-ink/55 sm:mt-2">
                        {item.tag}
                      </span>
                      <span className="flex-1">
                        <Mark text={item.q} query={q} />
                      </span>
                    </span>
                  </AccordionTrigger>

                  <AccordionContent className="pb-5 pl-0 text-base leading-relaxed text-aura-ink/70 sm:pb-6 md:text-lg md:pl-[5.25rem]">
                    <Mark text={item.a} query={q} />

                    {/* Contextual WhatsApp button inside every answer */}
                    <a
                      href={whatsappFAQHref(item.q)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => track("whatsapp_faq_click", { tag: item.tag, q: item.q })}
                      className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-[#25D366]/30 bg-[#25D366]/8 px-3.5 py-1.5 text-xs font-medium text-[#1a9e4c] transition-colors hover:bg-[#25D366]/15"
                    >
                      <svg viewBox="0 0 32 32" className="h-3.5 w-3.5 fill-current" aria-hidden>
                        <path d="M19.11 17.43c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.18-1.34-.81-.72-1.35-1.61-1.51-1.88-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.02-.22-.53-.45-.46-.61-.47-.16-.01-.34-.01-.52-.01-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29 0 1.35.98 2.66 1.12 2.84.14.18 1.94 2.97 4.71 4.16.66.28 1.17.45 1.57.58.66.21 1.26.18 1.74.11.53-.08 1.6-.65 1.83-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.32zM16 4C9.37 4 4 9.37 4 16c0 2.12.55 4.18 1.6 6L4 28l6.18-1.62A12.07 12.07 0 0016 28c6.63 0 12-5.37 12-12S22.63 4 16 4z" />
                      </svg>
                      Pregúntame sobre esto
                    </a>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>

          {/* Empty state */}
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="rounded-3xl border border-dashed border-aura-ink/15 bg-white/40 p-8 text-center"
            >
              <p className="text-aura-ink/70">
                {t.faq.search.empty} <span className="font-medium text-aura-ink">"{query}"</span>.
              </p>
              <button
                type="button"
                onClick={() => { setQuery(""); setActive("all"); inputRef.current?.focus(); }}
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-aura-ink/15 bg-white/70 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-aura-ink/70 transition-colors hover:text-aura-ink"
              >
                <X className="h-3.5 w-3.5" aria-hidden /> {t.faq.search.clear}
              </button>
            </motion.div>
          )}

          {/* Mobile CTA */}
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
  children, active, onClick,
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
