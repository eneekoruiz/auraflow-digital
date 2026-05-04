import { useEffect } from "react";
import { useLang } from "@/i18n/LanguageProvider";
import { LANGUAGES } from "@/i18n/dictionary";
import { buildOgDataUri } from "./ogImage";

/**
 * Dynamic SEO head: updates <title>, meta description, OG/Twitter tags,
 * <html lang>, hreflang alternates, and a code-only og:image whenever the
 * active language changes. No external assets required.
 */

const MONOGRAM = "ES"; // Update if your initials change

function upsertMeta(selector: string, attrs: Record<string, string>) {
  let el = document.head.querySelector<HTMLMetaElement | HTMLLinkElement>(selector);
  if (!el) {
    const tag = selector.startsWith("link") ? "link" : "meta";
    el = document.createElement(tag) as HTMLMetaElement | HTMLLinkElement;
    // Apply identifying attributes from the selector hint
    Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
    document.head.appendChild(el);
    return el;
  }
  Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
  return el;
}

function setMetaByName(name: string, content: string) {
  upsertMeta(`meta[name="${name}"]`, { name, content });
}

function setMetaByProperty(property: string, content: string) {
  upsertMeta(`meta[property="${property}"]`, { property, content });
}

function setLink(rel: string, href: string, extra: Record<string, string> = {}) {
  const sel = extra.hreflang
    ? `link[rel="${rel}"][hreflang="${extra.hreflang}"]`
    : `link[rel="${rel}"]`;
  upsertMeta(sel, { rel, href, ...extra });
}

export function SEO() {
  const { t, lang } = useLang();

  useEffect(() => {
    const { title, description, ogTitle, ogTitleAccent, ogTagline, locale } = t.seo;

    // <html lang="..."> + dir for RTL
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

    // Title + description
    document.title = title;
    setMetaByName("description", description);

    // Code-only OG image (data URI SVG)
    const ogImage = buildOgDataUri({
      title: ogTitle,
      accent: ogTitleAccent,
      tagline: ogTagline,
      initials: MONOGRAM,
      lang,
    });

    // Open Graph
    setMetaByProperty("og:title", title);
    setMetaByProperty("og:description", description);
    setMetaByProperty("og:type", "website");
    setMetaByProperty("og:locale", locale);
    setMetaByProperty("og:image", ogImage);
    setMetaByProperty("og:image:type", "image/svg+xml");
    setMetaByProperty("og:image:width", "1200");
    setMetaByProperty("og:image:height", "630");
    setMetaByProperty("og:image:alt", `${ogTitle} ${ogTitleAccent} — ${ogTagline}`);

    // Twitter
    setMetaByName("twitter:card", "summary_large_image");
    setMetaByName("twitter:title", title);
    setMetaByName("twitter:description", description);
    setMetaByName("twitter:image", ogImage);
    setMetaByName("twitter:image:alt", `${ogTitle} ${ogTitleAccent}`);

    // Canonical + hreflang alternates (relative — works on any domain)
    setLink("canonical", "/");
    LANGUAGES.forEach((l) => {
      setLink("alternate", `/?lang=${l.code}`, { hreflang: l.code });
    });
    setLink("alternate", "/", { hreflang: "x-default" });
  }, [t, lang]);

  return null;
}
