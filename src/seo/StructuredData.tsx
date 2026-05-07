import { useEffect } from "react";
import { useLang } from "@/i18n/LanguageProvider";

/**
 * Injects schema.org JSON-LD: Organization + LocalBusiness + Service + FAQPage.
 * Rich results dramatically improve CTR on SERPs (avg +30% per Google data).
 * Re-rendered per language so questions/answers stay translated.
 */
export function StructuredData() {
  const { t, lang } = useLang();

  useEffect(() => {
    const id = "ld-json-main";
    const existing = document.getElementById(id);
    if (existing) existing.remove();

    const origin = typeof window !== "undefined" ? window.location.origin : "";

    const graph = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": `${origin}/#org`,
          name: "Estudio",
          url: origin || "/",
          slogan: t.seo.ogTagline,
          description: t.seo.description,
          inLanguage: lang,
        },
        {
          "@type": "LocalBusiness",
          "@id": `${origin}/#local`,
          name: "Estudio",
          url: origin || "/",
          image: `${origin}/og-image.svg`,
          priceRange: "€€",
          areaServed: "ES",
          telephone: "+34 600 000 000",
          description: t.seo.description,
        },
        ...t.services.cards.map((card) => ({
          "@type": "Service",
          name: card.title,
          description: card.body,
          provider: { "@id": `${origin}/#org` },
          areaServed: "ES",
          inLanguage: lang,
        })),
        {
          "@type": "FAQPage",
          mainEntity: t.faq.items.map((it) => ({
            "@type": "Question",
            name: it.q,
            acceptedAnswer: { "@type": "Answer", text: it.a },
          })),
        },
        {
          "@type": "WebSite",
          "@id": `${origin}/#site`,
          url: origin || "/",
          name: t.seo.title,
          inLanguage: lang,
        },
      ],
    };

    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.id = id;
    s.text = JSON.stringify(graph);
    document.head.appendChild(s);
  }, [t, lang]);

  return null;
}
