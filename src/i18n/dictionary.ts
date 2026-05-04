export type Lang =
  | "es" | "en" | "fr" | "de" | "it" | "pt" | "nl" | "ca"
  | "zh" | "ja" | "ko" | "ar" | "ru" | "tr" | "pl" | "sv" | "hi" | "id";

export interface LangMeta {
  code: Lang;
  label: string;   // Native name
  flag: string;    // emoji
  region: string;  // Group label
}

export const LANGUAGES: LangMeta[] = [
  { code: "es", label: "Español",    flag: "🇪🇸", region: "Europe" },
  { code: "en", label: "English",    flag: "🇬🇧", region: "Europe" },
  { code: "fr", label: "Français",   flag: "🇫🇷", region: "Europe" },
  { code: "de", label: "Deutsch",    flag: "🇩🇪", region: "Europe" },
  { code: "it", label: "Italiano",   flag: "🇮🇹", region: "Europe" },
  { code: "pt", label: "Português",  flag: "🇵🇹", region: "Europe" },
  { code: "nl", label: "Nederlands", flag: "🇳🇱", region: "Europe" },
  { code: "ca", label: "Català",     flag: "🏴", region: "Europe" },
  { code: "sv", label: "Svenska",    flag: "🇸🇪", region: "Europe" },
  { code: "pl", label: "Polski",     flag: "🇵🇱", region: "Europe" },
  { code: "ru", label: "Русский",    flag: "🇷🇺", region: "Europe" },
  { code: "tr", label: "Türkçe",     flag: "🇹🇷", region: "Europe" },
  { code: "zh", label: "中文",        flag: "🇨🇳", region: "Asia" },
  { code: "ja", label: "日本語",      flag: "🇯🇵", region: "Asia" },
  { code: "ko", label: "한국어",      flag: "🇰🇷", region: "Asia" },
  { code: "hi", label: "हिन्दी",       flag: "🇮🇳", region: "Asia" },
  { code: "id", label: "Indonesia",  flag: "🇮🇩", region: "Asia" },
  { code: "ar", label: "العربية",    flag: "🇸🇦", region: "MENA" },
];

const es = {
  nav: { services: "Servicios", process: "Proceso", faq: "FAQ", cta: "Hablemos" },
  hero: {
    eyebrow: "Un pequeño negocio, ayudando a otro",
    title: ["Hacemos", "que", "lo", "complejo,", "desaparezca."],
    subtitle: "Tú dedícate a tu negocio. Yo automatizo el resto.",
    cta: "Recupera tu tiempo",
    scroll: "Desliza",
  },
  marquee: ["Menos estrés", "Más tiempo", "Mayor crecimiento", "Cero jerga", "Hecho a mano"],
  manifesto: {
    label: "Manifiesto",
    text: "Los negocios locales pierden 15 horas a la semana en tareas que una máquina haría en un segundo. Vamos a cambiar eso.",
  },
  services: {
    label: "Servicios",
    title: "Tres formas de devolverte el tiempo.",
    cards: [
      {
        tag: "01",
        title: "Webs que captan",
        body: "Páginas rápidas, claras y diseñadas para que la gente reserve, llame o compre. Sin plantillas tristes.",
        bullets: ["Diseño a medida", "Carga ultrarrápida", "SEO local"],
      },
      {
        tag: "02",
        title: "Agendas automáticas",
        body: "Tus clientes reservan solos, 24/7. Tú recibes el aviso. Sin llamadas perdidas, sin huecos vacíos.",
        bullets: ["Reservas online", "Recordatorios WhatsApp", "Pagos opcionales"],
      },
      {
        tag: "03",
        title: "Automatización total",
        body: "Conectamos tus herramientas para que el papeleo, los emails y los recordatorios se hagan solos.",
        bullets: ["Email & CRM", "Facturas y cobros", "Integraciones a medida"],
      },
    ],
  },
  process: {
    label: "Cómo funciona",
    title: "Tres pasos. Sin jerga.",
    steps: [
      { n: "01", title: "Café virtual", body: "Una llamada relajada de 30 minutos. Me cuentas qué te quita tiempo y te digo si puedo ayudarte." },
      { n: "02", title: "Diseño del sistema", body: "Te enseño cómo va a funcionar todo, en cristiano. Aprobamos juntos, y construyo." },
      { n: "03", title: "Disfrutas de tu tiempo", body: "Lo dejo funcionando, te formo en 20 minutos y quedo de guardia por si algo se tuerce." },
    ],
  },
  faq: {
    label: "Dudas honestas",
    title: "Lo que la gente me pregunta.",
    items: [
      { q: "¿Necesito saber de informática?", a: "Cero. Yo me encargo de todo. Si sabes mandar un WhatsApp, sabes usar lo que te monto." },
      { q: "¿Cuánto tarda?", a: "Una web sencilla: una semana. Una automatización completa: dos a cuatro semanas. Te doy fechas en la primera llamada." },
      { q: "¿Y si soy muy pequeño?", a: "Mejor. Trabajo casi solo con negocios pequeños. No hay proyecto demasiado pequeño." },
      { q: "¿Qué pasa si algo se rompe?", a: "Lo arreglo yo. Tienes acceso directo a mí por WhatsApp. Sin tickets, sin esperas." },
      { q: "¿Me ato a un contrato largo?", a: "No. Pago por proyecto y un mantenimiento mensual opcional que cancelas cuando quieras." },
      { q: "¿Cuánto cuesta?", a: "Depende de lo que necesites, pero hablamos siempre desde el principio. Sin sorpresas." },
    ],
  },
  cta: {
    label: "Hablemos",
    title: "¿Listo para que tu negocio trabaje para ti?",
    subtitle: "Cuéntame qué te quita tiempo. Te respondo en menos de 24 horas, en persona.",
    step: "Paso",
    of: "de",
    next: "Siguiente",
    back: "Atrás",
    send: "Enviar",
    sending: "Enviando…",
    success: "Recibido. Te escribo en menos de 24 horas.",
    error: "Algo falló. Inténtalo otra vez o escríbeme por WhatsApp.",
    s1: { title: "¿Qué tipo de proyecto?", options: ["Web nueva", "Automatización", "Reservas online", "No estoy seguro"] },
    s2: { title: "¿Qué te quita el tiempo?", placeholder: "Cuéntamelo en una frase…" },
    s3: { title: "¿Cómo te localizo?", name: "Tu nombre", email: "Tu email" },
  },
  footer: { tagline: "Pequeño estudio. Grandes resultados.", rights: "Todos los derechos reservados.", lang: "Idioma" },
  whatsapp: { label: "WhatsApp", message: "Hola, vengo de tu web. Me gustaría que hablemos." },
  cookies: {
    title: "Galletas digitales 🍪",
    body: "Usamos cookies esenciales y, con tu permiso, analítica anónima para mejorar la web.",
    accept: "Aceptar",
    configure: "Solo esenciales",
  },
  notFound: {
    title: "Te saliste del flujo",
    body: "Esta página no existe (todavía). Volvamos al camino.",
    cta: "Volver al inicio",
  },
  loader: { tagline: "Estudio" },
  seo: {
    title: "Estudio · Hacemos que lo complejo, desaparezca.",
    description:
      "Un pequeño negocio ayudando a otro. Webs y automatización para negocios locales. Tú dedícate a tu negocio, yo automatizo el resto.",
    ogTitle: "Hacemos que lo complejo,",
    ogTitleAccent: "desaparezca.",
    ogTagline: "Webs · Automatización · Negocios locales",
    locale: "es_ES",
  },
};

const en = {
  nav: { services: "Services", process: "Process", faq: "FAQ", cta: "Let's talk" },
  hero: {
    eyebrow: "A small business, helping another",
    title: ["We", "make", "the", "complex,", "disappear."],
    subtitle: "You focus on your business. I automate the rest.",
    cta: "Get your time back",
    scroll: "Scroll",
  },
  marquee: ["Less stress", "More time", "More growth", "Zero jargon", "Hand-crafted"],
  manifesto: {
    label: "Manifesto",
    text: "Local businesses lose 15 hours a week on tasks a machine would do in one second. Let's change that.",
  },
  services: {
    label: "Services",
    title: "Three ways to get your time back.",
    cards: [
      {
        tag: "01",
        title: "Sites that convert",
        body: "Fast, clear pages designed so people book, call or buy. No sad templates.",
        bullets: ["Custom design", "Lightning fast", "Local SEO"],
      },
      {
        tag: "02",
        title: "Automatic bookings",
        body: "Customers book themselves, 24/7. You get the notification. No missed calls, no empty slots.",
        bullets: ["Online booking", "WhatsApp reminders", "Optional payments"],
      },
      {
        tag: "03",
        title: "Full automation",
        body: "We connect your tools so paperwork, emails and reminders happen on their own.",
        bullets: ["Email & CRM", "Invoices & payments", "Custom integrations"],
      },
    ],
  },
  process: {
    label: "How it works",
    title: "Three steps. No jargon.",
    steps: [
      { n: "01", title: "Virtual coffee", body: "A relaxed 30-minute call. You tell me what eats your time, I tell you if I can help." },
      { n: "02", title: "System design", body: "I show you exactly how it'll work, in plain English. We approve, then I build it." },
      { n: "03", title: "Enjoy your time", body: "I leave it running, train you in 20 minutes, and stay on call if anything breaks." },
    ],
  },
  faq: {
    label: "Honest doubts",
    title: "What people ask me.",
    items: [
      { q: "Do I need to be tech-savvy?", a: "Zero. I handle everything. If you can send a WhatsApp, you can use what I build." },
      { q: "How long does it take?", a: "A simple site: one week. A full automation: two to four weeks. I give you dates on the first call." },
      { q: "What if my business is tiny?", a: "Even better. I almost exclusively work with small businesses." },
      { q: "What if something breaks?", a: "I fix it. Direct access to me on WhatsApp. No tickets, no waiting." },
      { q: "Am I locked in a contract?", a: "No. Pay per project plus an optional monthly maintenance you can cancel anytime." },
      { q: "How much does it cost?", a: "It depends, but we talk numbers from the start. No surprises." },
    ],
  },
  cta: {
    label: "Let's talk",
    title: "Ready for your business to work for you?",
    subtitle: "Tell me what eats your time. I reply within 24 hours, personally.",
    step: "Step",
    of: "of",
    next: "Next",
    back: "Back",
    send: "Send",
    sending: "Sending…",
    success: "Got it. I'll write back within 24 hours.",
    error: "Something failed. Try again or message me on WhatsApp.",
    s1: { title: "What kind of project?", options: ["New website", "Automation", "Online bookings", "Not sure yet"] },
    s2: { title: "What eats your time?", placeholder: "Sum it up in one line…" },
    s3: { title: "How do I reach you?", name: "Your name", email: "Your email" },
  },
  footer: { tagline: "Small studio. Big results.", rights: "All rights reserved.", lang: "Language" },
  whatsapp: { label: "WhatsApp", message: "Hi, I came from your site. I'd love to chat." },
  cookies: {
    title: "Digital cookies 🍪",
    body: "We use essential cookies and, with your permission, anonymous analytics to improve the site.",
    accept: "Accept",
    configure: "Essential only",
  },
  notFound: {
    title: "You stepped out of the flow",
    body: "This page doesn't exist (yet). Let's get you back on track.",
    cta: "Back to home",
  },
  loader: { tagline: "Studio" },
  seo: {
    title: "Estudio · We make the complex, disappear.",
    description:
      "A small business helping another. Websites and automation for local businesses. You focus on your business, I automate the rest.",
    ogTitle: "We make the complex,",
    ogTitleAccent: "disappear.",
    ogTagline: "Websites · Automation · Local businesses",
    locale: "en_US",
  },
};

export type Dict = typeof es;

// Languages without full translations fall back to English to keep the site usable.
export const dictionary: Record<Lang, Dict> = {
  es,
  en,
  fr: en, de: en, it: en, pt: en, nl: en, ca: en,
  sv: en, pl: en, ru: en, tr: en,
  zh: en, ja: en, ko: en, hi: en, id: en,
  ar: en,
};
