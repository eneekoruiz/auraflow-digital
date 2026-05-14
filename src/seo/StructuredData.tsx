import { useEffect } from "react";
import { useLang } from "@/i18n/LanguageProvider";

/**
 * Injects multiple schema.org JSON-LD blocks: FAQPage, LocalBusiness, Person, and AggregateRating.
 * Using separate script tags per type for clarity and targeted rich results.
 * Synchronized with the current language dictionary.
 */
export function StructuredData() {
  const { t, lang } = useLang();

  useEffect(() => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const prefix = "ld-json-";
    
    // Cleanup existing structured data tags
    const existing = document.querySelectorAll(`script[id^="${prefix}"]`);
    existing.forEach((el) => el.remove());

    const schemas = [
      // 1. FAQPage Schema
      {
        id: "faq",
        data: {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": t.faq.items.map((it) => ({
            "@type": "Question",
            "name": it.q,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": it.a
            }
          }))
        }
      },
      // 2. LocalBusiness Schema
      {
        id: "business",
        data: {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Estudio",
          "description": t.seo.description,
          "url": origin || "https://auraflow.digital",
          "telephone": "+34 600 000 000",
          "priceRange": "€€",
          "image": `${origin}/og-image.svg`,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Valencia",
            "addressRegion": "Comunidad Valenciana",
            "addressCountry": "ES"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5.0",
            "reviewCount": "47",
            "bestRating": "5"
          }
        }
      },
      // 3. Person Schema (Founder)
      {
        id: "person",
        data: {
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Estudio",
          "jobTitle": "Consultor de automatización y desarrollo web",
          "url": origin,
          "sameAs": [
            "https://linkedin.com/in/estudio",
            "https://twitter.com/estudio"
          ]
        }
      }
    ];

    // Inject each schema as a separate script tag
    schemas.forEach((schema) => {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.id = `${prefix}${schema.id}`;
      s.text = JSON.stringify(schema.data);
      document.head.appendChild(s);
    });

  }, [t, lang]);

  return null;
}
