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
    ctaSecondary: "Cómo funciona",
    scroll: "Desliza",
    proof: {
      stars: "5,0 · clientes locales",
      reply: "Respuesta en <24 h",
      noContract: "Sin permanencia",
    },
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
    title: "Lo que la gente me pregunta antes de decir sí.",
    cta: { title: "¿Te queda alguna duda?", body: "Pregúntame por WhatsApp en 1 minuto. Sin compromiso.", button: "Resolverla ahora" },
    search: { placeholder: "Busca tu duda en segundos…", all: "Todas", empty: "No encuentro nada con", clear: "Borrar" },
    items: [
      { tag: "Tiempos", q: "¿En cuánto tiempo lo tendré listo?", a: "Una web sencilla: 7 días. Una web completa: 2 semanas. Una automatización a medida: 2 a 4 semanas. Te doy fechas concretas en la primera llamada y las cumplo. Si no, te aviso antes de que se mueva un día." },
      { tag: "Tiempos", q: "¿Cuánto tiempo me va a quitar a mí?", a: "Una hora la primera semana. Media hora a la semana después. Yo hago el trabajo, tú solo decides. No vas a estar pegado a un Trello." },
      { tag: "Precios", q: "¿Cuánto cuesta exactamente?", a: "Esencial 490 €, Negocio 1.490 €, A medida lo hablamos. Precio cerrado antes de empezar. No hay sorpresas, ni 'extras', ni horas que aparecen al final." },
      { tag: "Precios", q: "¿Hay que pagar todo de golpe?", a: "No. 50% al empezar y 50% al entregar. Si el proyecto es grande, lo partimos en 3. Sin intereses, sin financieras." },
      { tag: "Precios", q: "¿Y si después de pagar no me convence?", a: "14 días de prueba. Si no notas que ahorras tiempo, te devuelvo el dinero. Sin papeleo, sin discusión, sin letra pequeña." },
      { tag: "Alcance", q: "¿Y si no sé exactamente qué necesito?", a: "Para eso es la llamada gratis de 15 minutos. Te digo yo qué automatizar primero según tu negocio. Si no necesitas nada todavía, te lo digo también." },
      { tag: "Alcance", q: "¿Mi negocio es demasiado pequeño?", a: "Al revés. Casi todos mis clientes son negocios de 1 a 5 personas. Cuanto más pequeño, más impacto tiene recuperar 10 horas a la semana." },
      { tag: "Alcance", q: "¿Trabajas con mis herramientas actuales?", a: "Casi siempre sí: WhatsApp, Google Calendar, Stripe, Square, Shopify, Notion, Holded, Calendly, Mailchimp… Si usas algo raro, te lo digo en la llamada antes de cobrarte un euro." },
      { tag: "Soporte", q: "¿Necesito saber de informática?", a: "Cero. Si sabes mandar un audio por WhatsApp, sabes usar lo que te monto. Te lo dejo todo explicado en vídeo de 2 minutos." },
      { tag: "Soporte", q: "¿Qué pasa si algo se rompe a los 6 meses?", a: "Me escribes por WhatsApp y lo arreglo yo. Sin tickets, sin centralitas. Para cosas pequeñas no cobro nada. Para cosas grandes, te aviso antes." },
      { tag: "Soporte", q: "¿Me ato a un contrato?", a: "No. Pago por proyecto. El mantenimiento mensual es opcional y lo cancelas cuando quieras, en un mensaje." },
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
  exit: {
    eyebrow: "Antes de irte",
    title: "Auditoría gratis (15 min).",
    body: "Te digo en una llamada qué automatizarías primero y cuánto tiempo recuperarías. Sin compromiso.",
    cta: "Reservar mi auditoría",
    dismiss: "Ahora no",
  },
  guarantee: "Sin permanencia · Respuesta en menos de 24 h · Trato directo conmigo",
  stats: {
    label: "En cifras",
    items: [
      { value: "+15 h", label: "recuperadas a la semana, de media" },
      { value: "<24 h", label: "tiempo de respuesta" },
      { value: "98%", label: "clientes que repiten" },
      { value: "1", label: "persona detrás. Yo." },
    ],
  },
  testimonials: {
    label: "Lo que dicen",
    title: "Pequeños negocios. Grandes alivios.",
    items: [
      {
        quote: "Antes pasaba dos horas al día gestionando reservas por WhatsApp. Ahora se reservan solas. Es otra vida.",
        name: "María Ferrer",
        role: "Peluquería Mar · Valencia",
      },
      {
        quote: "Pensaba que automatizar era para grandes. Me montó algo simple, en una semana, y mis clientes lo notan.",
        name: "Jorge Ruiz",
        role: "Bistró del Carmen · Madrid",
      },
      {
        quote: "Cero jerga. Me explicó todo como si tuviera 80 años. Y funciona desde el primer día.",
        name: "Lucía Navarro",
        role: "Fisio Centro · Sevilla",
      },
    ],
  },
  founder: {
    label: "Quién está detrás",
    name: "Hola, soy yo.",
    body: "No soy una agencia. Soy una persona. Cada proyecto lo llevo yo, de principio a fin. Si me escribes, te respondo yo. Si algo se rompe, lo arreglo yo. Por eso solo cojo unos pocos proyectos al mes.",
    signature: "— Estudio",
  },
  stickyCta: "Hablemos",
  pricing: {
    label: "Paquetes",
    title: "Precio claro. Sin sorpresas.",
    subtitle: "Tres formas de empezar. Elige la que encaje. Si no estás seguro, te lo digo yo en la llamada gratuita.",
    badge: "Más elegido",
    from: "desde",
    cta: "Empezar",
    items: [
      {
        name: "Esencial",
        price: "490 €",
        tagline: "Tu presencia online, lista en 7 días.",
        features: [
          "Web de 1 página, rápida y bonita",
          "Formulario de contacto + WhatsApp",
          "SEO básico y dominio configurado",
          "1 ronda de cambios",
        ],
      },
      {
        name: "Negocio",
        price: "1.490 €",
        tagline: "Web + automatización del día a día.",
        features: [
          "Web completa (hasta 5 secciones)",
          "Reservas o pedidos automáticos",
          "Respuestas automáticas en WhatsApp",
          "Conexión con tu calendario o caja",
          "2 rondas de cambios",
        ],
      },
      {
        name: "A medida",
        price: "Hablemos",
        tagline: "Procesos complejos, integraciones, IA.",
        features: [
          "Auditoría completa de tus procesos",
          "Automatizaciones a medida",
          "Integraciones con tus herramientas",
          "Acompañamiento durante 1 mes",
        ],
      },
    ],
    promise: {
      label: "Mi compromiso contigo",
      title: "Si no te ahorra tiempo, no me pagas.",
      body: "Probamos juntos durante 14 días. Si no notas la diferencia, te devuelvo el dinero. Sin papeleo, sin discusión, sin letra pequeña.",
    },
  },
  motion: {
    reduce: "Reducir movimiento",
    enable: "Activar movimiento",
    short: { full: "Movimiento", reduced: "Calmado" },
    state: { full: "Modo Movimiento", reduced: "Modo Calmado" },
    source: { system: "según tu sistema", user: "elegido por ti", none: "" },
    shortcutHint: "Atajo: Mayús + M",
    announce: { full: "Modo Movimiento activado", reduced: "Modo Calmado activado" },
  },
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
    ctaSecondary: "How it works",
    scroll: "Scroll",
    proof: {
      stars: "5.0 · local clients",
      reply: "Reply in <24 h",
      noContract: "No lock-in",
    },
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
    title: "What people ask before saying yes.",
    cta: { title: "Still on the fence?", body: "Ask me on WhatsApp, takes a minute. No strings.", button: "Ask now" },
    search: { placeholder: "Search your question in seconds…", all: "All", empty: "No matches for", clear: "Clear" },
    items: [
      { tag: "Timing", q: "How fast will it be live?", a: "Simple site: 7 days. Full site: 2 weeks. Custom automation: 2–4 weeks. I commit to dates on the first call and I hit them. If anything slips, you hear from me first." },
      { tag: "Timing", q: "How much of my time will this take?", a: "About an hour the first week. Half an hour a week after that. I do the work, you decide. No Trello board to babysit." },
      { tag: "Pricing", q: "What does it cost exactly?", a: "Essential €490, Business €1,490, Custom we agree together. Price closed before we start. No surprises, no 'extras', no hours appearing at the end." },
      { tag: "Pricing", q: "Do I pay everything up front?", a: "No. 50% to start, 50% on delivery. Big projects we split in 3. No interest, no third-party financing." },
      { tag: "Pricing", q: "What if it doesn't convince me after paying?", a: "14-day trial. If it doesn't save you time, I refund you. No paperwork, no debate, no fine print." },
      { tag: "Scope", q: "What if I don't know exactly what I need?", a: "That's what the free 15-min call is for. I tell you what to automate first based on your business. If you don't need anything yet, I'll say that too." },
      { tag: "Scope", q: "Is my business too small?", a: "Quite the opposite. Most of my clients are 1–5 people. The smaller the team, the bigger the impact of getting 10 hours back per week." },
      { tag: "Scope", q: "Do you work with my current tools?", a: "Almost always yes: WhatsApp, Google Calendar, Stripe, Square, Shopify, Notion, Calendly, Mailchimp… If you use something exotic, I'll tell you on the call before charging a euro." },
      { tag: "Support", q: "Do I need to be tech-savvy?", a: "Zero. If you can send a voice note on WhatsApp, you can use what I build. I leave you a 2-minute video explaining everything." },
      { tag: "Support", q: "What if something breaks 6 months later?", a: "Message me on WhatsApp and I fix it. No tickets, no call centres. Small things are free. Big things, I tell you before." },
      { tag: "Support", q: "Am I tied to a contract?", a: "No. Pay per project. Monthly maintenance is optional and you cancel any time, with one message." },
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
  exit: {
    eyebrow: "Before you go",
    title: "Free 15-min audit.",
    body: "On a quick call I tell you what to automate first and how much time you'd get back. No strings attached.",
    cta: "Book my audit",
    dismiss: "Not now",
  },
  guarantee: "No lock-in · Reply within 24 h · Direct line to me",
  stats: {
    label: "By the numbers",
    items: [
      { value: "+15 h", label: "saved per week, on average" },
      { value: "<24 h", label: "average reply time" },
      { value: "98%", label: "of clients come back" },
      { value: "1", label: "person behind it. Me." },
    ],
  },
  testimonials: {
    label: "What they say",
    title: "Small businesses. Big relief.",
    items: [
      {
        quote: "I used to spend two hours a day juggling bookings on WhatsApp. Now they book themselves. Different life.",
        name: "María Ferrer",
        role: "Mar Hair Studio · Valencia",
      },
      {
        quote: "I thought automation was for big companies. He built me something simple in a week and my customers feel it.",
        name: "Jorge Ruiz",
        role: "Bistró del Carmen · Madrid",
      },
      {
        quote: "Zero jargon. Explained everything like I was 80. And it has worked from day one.",
        name: "Lucía Navarro",
        role: "Fisio Centro · Sevilla",
      },
    ],
  },
  founder: {
    label: "Who's behind this",
    name: "Hi, it's me.",
    body: "I'm not an agency. I'm one person. I take every project from start to finish. If you write, I reply. If something breaks, I fix it. That's why I only take a handful of projects each month.",
    signature: "— Estudio",
  },
  stickyCta: "Let's talk",
  pricing: {
    label: "Packages",
    title: "Clear pricing. No surprises.",
    subtitle: "Three ways to start. Pick the one that fits. Not sure? I'll tell you on the free call.",
    badge: "Most chosen",
    from: "from",
    cta: "Get started",
    items: [
      {
        name: "Essential",
        price: "€490",
        tagline: "Your online presence, live in 7 days.",
        features: [
          "1-page site, fast and beautiful",
          "Contact form + WhatsApp",
          "Basic SEO and domain setup",
          "1 round of changes",
        ],
      },
      {
        name: "Business",
        price: "€1,490",
        tagline: "Website + everyday automation.",
        features: [
          "Full site (up to 5 sections)",
          "Automated bookings or orders",
          "WhatsApp auto-replies",
          "Calendar or POS integration",
          "2 rounds of changes",
        ],
      },
      {
        name: "Custom",
        price: "Let's talk",
        tagline: "Complex processes, integrations, AI.",
        features: [
          "Full audit of your processes",
          "Tailor-made automations",
          "Integrations with your tools",
          "1 month of follow-up support",
        ],
      },
    ],
    promise: {
      label: "My promise to you",
      title: "If it doesn't save you time, you don't pay.",
      body: "We try it together for 14 days. If you don't feel the difference, I refund you. No paperwork, no debate, no fine print.",
    },
  },
  motion: {
    reduce: "Reduce motion",
    enable: "Enable motion",
    short: { full: "Motion", reduced: "Calm" },
    state: { full: "Motion mode", reduced: "Calm mode" },
    source: { system: "from your system", user: "your choice", none: "" },
    shortcutHint: "Shortcut: Shift + M",
    announce: { full: "Motion mode enabled", reduced: "Calm mode enabled" },
  },
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
