/**
 * Code-only Open Graph image generator (1200x630).
 * Returns a data URI with an inline SVG — no external assets, no build step.
 *
 * Brand surface mirrors the "Ethereal Light" system (cream + ink + pastel aura).
 */

interface OgInput {
  title: string;
  accent: string;
  tagline: string;
  initials?: string;
  lang: string;
}

const escape = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export function buildOgSvg({ title, accent, tagline, initials = "ES", lang }: OgInput): string {
  const t = escape(title);
  const a = escape(accent);
  const tg = escape(tagline);
  const ini = escape(initials);
  const lc = escape(lang.toUpperCase());

  // 1200x630 — Open Graph standard
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <radialGradient id="lav" cx="15%" cy="20%" r="55%">
      <stop offset="0%" stop-color="#D6BBFF" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#D6BBFF" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="peach" cx="85%" cy="85%" r="55%">
      <stop offset="0%" stop-color="#FFCBAA" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#FFCBAA" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="mint" cx="80%" cy="15%" r="40%">
      <stop offset="0%" stop-color="#A6F0C6" stop-opacity="0.7"/>
      <stop offset="100%" stop-color="#A6F0C6" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="hairline" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0%" stop-color="#111" stop-opacity="0"/>
      <stop offset="50%" stop-color="#111" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#111" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <!-- Background: silk cream -->
  <rect width="1200" height="630" fill="#F8F9FA"/>

  <!-- Pastel aura blobs -->
  <rect width="1200" height="630" fill="url(#lav)"/>
  <rect width="1200" height="630" fill="url(#peach)"/>
  <rect width="1200" height="630" fill="url(#mint)"/>

  <!-- Hairline top + bottom -->
  <rect x="0" y="118" width="1200" height="1" fill="url(#hairline)"/>
  <rect x="0" y="512" width="1200" height="1" fill="url(#hairline)"/>

  <!-- Header row: monogram + lang chip -->
  <g font-family="'Plus Jakarta Sans', -apple-system, system-ui, sans-serif" fill="#111">
    <circle cx="100" cy="78" r="26" fill="#111"/>
    <text x="100" y="86" text-anchor="middle" font-size="22" font-weight="700" fill="#F8F9FA" letter-spacing="0.5">${ini}</text>
    <text x="142" y="84" font-size="20" font-weight="600" letter-spacing="-0.01em">Estudio</text>

    <g transform="translate(1010, 56)">
      <rect width="110" height="44" rx="22" fill="#FFFFFF" fill-opacity="0.7" stroke="#111" stroke-opacity="0.08"/>
      <circle cx="22" cy="22" r="4" fill="#FFCBAA"/>
      <text x="38" y="28" font-size="14" font-weight="600" letter-spacing="0.18em">${lc}</text>
    </g>
  </g>

  <!-- Headline (Syne / display) -->
  <g font-family="'Syne', 'Plus Jakarta Sans', sans-serif" fill="#111" font-weight="800" letter-spacing="-0.04em">
    <text x="80" y="320" font-size="92">${t}</text>
    <text x="80" y="430" font-size="92" fill="#111" fill-opacity="0.35">${a}</text>
  </g>

  <!-- Footer tagline -->
  <g font-family="'Plus Jakarta Sans', system-ui, sans-serif" fill="#111">
    <text x="80" y="568" font-size="22" font-weight="500" fill-opacity="0.65">${tg}</text>
    <text x="1120" y="568" font-size="14" font-weight="600" letter-spacing="0.3em" text-anchor="end" fill-opacity="0.5">EST · 2026</text>
  </g>
</svg>`;
}

export function buildOgDataUri(input: OgInput): string {
  const svg = buildOgSvg(input);
  // Use encodeURIComponent for safe data URI (works in OG crawlers that accept SVG)
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
