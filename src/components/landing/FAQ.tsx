import { useLang } from "@/i18n/LanguageProvider";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function FAQ() {
  const { t } = useLang();
  return (
    <section id="faq" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-aura-ink/40">— {t.faq.label}</p>
          <h2 className="text-balance font-display text-5xl leading-[0.95] tracking-tighter text-aura-ink md:text-6xl">
            {t.faq.title}
          </h2>
        </div>

        <div className="md:col-span-7">
          <Accordion type="single" collapsible className="w-full">
            {t.faq.items.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-b border-aura-ink/10"
              >
                <AccordionTrigger className="py-6 text-left font-display text-2xl tracking-tight text-aura-ink hover:no-underline md:text-3xl">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-base text-aura-ink/65 md:text-lg">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
