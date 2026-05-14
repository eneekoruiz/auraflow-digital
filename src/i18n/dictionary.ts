export type Lang = "es" | "en";

export interface LangMeta {
  code: Lang;
  label: string;   // Native name
  flag: string;    // emoji
  region: string;  // Group label
}

export const LANGUAGES: LangMeta[] = [
  { code: "es", label: "Español",    flag: "🇪🇸", region: "Europe" },
  { code: "en", label: "English",    flag: "🇬🇧", region: "Europe" },
];

const es = {
  nav: { services: "Servicios", process: "El Método", faq: "Dudas", cta: "Empecemos" },
  hero: {
    eyebrow: "Tu tiempo es tuyo. Mi trabajo es devolvértelo.",
    title: ["Diseño", "y", "automatización", "sin", "complicaciones."],
    subtitle: "Ayudo a autónomos y pequeños negocios a eliminar el trabajo manual. Menos gestión, más vida.",
    cta: "Recupera tu tiempo",
    ctaSecondary: "Ver mi método",
    scroll: "Desliza",
    proof: {
      stars: "5,0 · Trato directo",
      reply: "Respuesta inmediata",
      noContract: "Sin compromisos",
    },
  },
  marquee: ["Menos estrés", "Más control", "Cero jerga", "Hecho a medida"],
  manifesto: {
    label: "Manifiesto",
    text: "El 80% de las tareas de un pequeño negocio se pueden automatizar. Mi misión es que dejes de ser el secretario de tu propia empresa.",
  },
  services: {
    label: "Servicios",
    title: "Tres formas de recuperar el control.",
    cards: [
      {
        tag: "01",
        title: "Webs que trabajan por ti",
        body: "No diseño páginas, diseño herramientas comerciales. Rápidas, claras y optimizadas para que el cliente te encuentre y te elija.",
        bullets: ["Diseño exclusivo", "Carga instantánea", "Estrategia de conversión"],
      },
      {
        tag: "02",
        title: "Gestión de citas 24/7",
        body: "Tus clientes reservan solos en cualquier momento. Tú recibes el aviso y el dinero. Sin llamadas perdidas ni errores humanos.",
        bullets: ["Reservas automáticas", "Avisos por WhatsApp", "Pasarela de pagos"],
      },
      {
        tag: "03",
        title: "Automatización total",
        body: "Conectamos tus herramientas (Email, CRM, Facturación) para que el papeleo se haga solo mientras tú descansas.",
        bullets: ["Flujos de trabajo", "Gestión de clientes", "Ahorro real de horas"],
      },
    ],
  },
  process: {
    label: "El método",
    title: "Un camino claro y sin sorpresas.",
    steps: [
      { n: "01", title: "Auditoría rápida", body: "Analizamos en 15 minutos qué procesos te están robando tiempo. Si no puedo ayudarte, te lo diré con total honestidad." },
      { n: "02", title: "Estrategia y ejecución", body: "Diseño la solución técnica, la validamos juntos y la construyo en tiempo récord. Sin complicaciones para ti." },
      { n: "03", title: "Entrega y soporte", body: "Te entrego el sistema funcionando, te enseño a usarlo en minutos y me quedo a tu lado por si necesitas cualquier ajuste." },
    ],
  },
  faq: {
    label: "Dudas honestas",
    title: "Respuestas claras, sin letra pequeña.",
    cta: { title: "¿Hablamos de tu caso?", body: "Cuéntame tu idea por WhatsApp. Es la forma más rápida de resolver dudas.", button: "Chat directo" },
    search: { placeholder: "Busca tu duda en segundos…", all: "Todas", empty: "No encuentro nada con", clear: "Borrar" },
    showMore: "Ver más preguntas",
    showLess: "Ver menos preguntas",
    askMe: "Pregúntame sobre esto",
    viewAll: "Ver todas",
    items: [
      { tag: "Alcance", q: "¿Y si no sé exactamente qué necesito?", a: "Es normal. En nuestra primera llamada te ayudaré a identificar qué es lo que más impacto tendrá en tu ahorro de tiempo diario." },
      { tag: "Alcance", q: "¿Mi negocio es demasiado pequeño?", a: "Casi todos mis clientes son negocios de 1 a 5 personas. Cuanto más pequeño es el equipo, más se nota recuperar 10 horas a la semana." },
      { tag: "Alcance", q: "¿Trabajas con mis herramientas actuales?", a: "Seguramente sí: WhatsApp, Google, Stripe, Shopify, Holded, Calendly... Si usas algo muy específico, lo comprobamos antes de empezar." },
      { tag: "Tiempos", q: "¿En cuánto tiempo lo tendré listo?", a: "Desde 7 días para una web sencilla hasta 3 semanas para automatizaciones complejas. Me comprometo con una fecha y la cumplo." },
      { tag: "Precios", q: "¿Cuánto cuesta exactamente?", a: "Desde 149 € hasta proyectos a medida. Te daré un presupuesto cerrado y transparente antes de mover un solo píxel." },
      { tag: "Precios", q: "¿Hay que pagar todo de golpe?", a: "No. Normalmente dividimos el pago en dos: 50% al inicio y 50% al entregar el trabajo terminado y validado." },
      { tag: "Soporte", q: "¿Necesito saber de informática?", a: "Para nada. Mi trabajo es que la tecnología sea invisible para ti. Si sabes usar un smartphone, sabrás usar lo que te monte." },
      { tag: "Soporte", q: "¿Qué pasa si algo falla en el futuro?", a: "Me tienes a un WhatsApp de distancia. Sin tickets, sin esperas. Si es algo pequeño, lo soluciono en el momento sin coste." },
    ],
  },
  cta: {
    label: "Contacto",
    title: "¿Empezamos a recuperar tu tiempo?",
    subtitle: "Cuéntame qué te frena. Te responderé personalmente en menos de 24 horas.",
    step: "Paso",
    of: "de",
    next: "Siguiente",
    back: "Atrás",
    send: "Enviar mensaje",
    sending: "Enviando…",
    success: "Mensaje recibido. Te escribiré muy pronto.",
    error: "Algo falló. Por favor, inténtalo de nuevo o escríbeme por WhatsApp.",
    s1: { 
      title: "¿En qué puedo ayudarte?", 
      options: ["Nueva Web", "Automatización", "Sistemas de Reserva", "Auditoría"],
      descriptions: [
        "Una web profesional diseñada para atraer y convertir clientes.",
        "Elimina tareas repetitivas y ahorra horas cada semana.",
        "Permite que tus clientes reserven solos a cualquier hora.",
        "Analicemos juntos cómo optimizar tu negocio actual."
      ]
    },
    s2: { title: "¿Cuál es tu mayor reto hoy?", placeholder: "Dime qué te quita más tiempo…" },
    s3: { title: "¿Cómo te contacto?", name: "Tu nombre", email: "Tu email de contacto" },
    gdpr: "He leído y acepto la Política de Privacidad",
  },
  footer: { 
    tagline: "Pequeño estudio · Grandes soluciones.", 
    description: "Acompañamos a negocios locales en su transición hacia lo digital, eliminando la complejidad y devolviendo el tiempo a quienes lo crean.",
    rights: "Todos los derechos reservados.", 
    lang: "Idioma",
    sitemap: "Mapa del sitio",
    roi: "Calculadora ROI",
    pricing: "Tarifas",
    config: "Configuración",
    interface: "Interfaz",
    privacy: "Privacidad",
    cookies: "Cookies",
    backToTop: "Volver arriba ↑",
  },
  legal: {
    privacy: { title: "Política de Privacidad", body: "Tu privacidad es lo primero..." },
    cookies: { title: "Política de Cookies", body: "Usamos cookies para mejorar tu experiencia..." },
    notice: { title: "Aviso Legal", body: "Datos del titular: Eneko Ruiz..." },
  },
  roi: {
    title: "El coste de no hacer nada",
    noHighlight: "no",
    subtitle: "Calcula cuánto tiempo y dinero estás perdiendo hoy por culpa de tareas manuales.",
    hoursLabel: "¿Cuántas horas pierdes a la semana en gestión repetitiva?",
    rateLabel: "Tu tarifa horaria estimada",
    resultHours: "Horas perdidas al año",
    resultMoney: "Coste anual estimado",
    resultSaving: "Potencial de ahorro con automatización",
    cta: "Quiero recuperar mi tiempo",
  },
  comparison: {
    title: "¿Por qué trabajar conmigo?",
    subtitle: "Porque entiendo los retos de un pequeño negocio.",
    columns: ["Agencia grande", "Eneko (Estudio)", "Freelancer genérico"],
    rows: [
      "Precio cerrado y sin sorpresas",
      "Comunicación directa y rápida",
      "Responsabilidad de principio a fin",
      "Garantía de satisfacción real",
      "Sin contratos de permanencia",
      "Foco en resultados de negocio",
      "Soporte personal por WhatsApp",
    ],
  },
  whatsapp: { label: "WhatsApp", message: "Hola Eneko, he visto tu web y me gustaría hablar de mi proyecto." },
  cookies: {
    title: "Tu privacidad importa",
    body: "Utilizamos cookies para que la web funcione y para entender cómo mejorar tu experiencia.",
    accept: "Aceptar todo",
    configure: "Solo esenciales",
  },
  notFound: {
    title: "Página no encontrada",
    body: "Parece que te has salido del camino. Vamos a volver al inicio.",
    cta: "Volver a la portada",
  },
  loader: { tagline: "Estudio" },
  exit: {
    eyebrow: "Antes de que te vayas",
    title: "Auditoría gratuita de 15 min.",
    body: "Te diré exactamente qué automatizaría primero en tu negocio para que recuperes horas desde el primer día.",
    cta: "Reservar llamada gratuita",
    dismiss: "Ahora no, gracias",
  },
  guarantee: "Sin permanencia · Soporte directo · Compromiso real",
  stats: {
    label: "Resultados",
    items: [
      { value: "+15 h", label: "ahorradas por semana" },
      { value: "<24 h", label: "tiempo de respuesta" },
      { value: "98%", label: "satisfacción total" },
      { value: "1:1", label: "trato directo conmigo" },
    ],
  },
  testimonials: {
    label: "Opiniones",
    title: "Pequeños negocios que ya son más libres.",
    items: [
      {
        quote: "Antes perdía horas cada día gestionando citas. Ahora el sistema lo hace solo y yo me centro en mi trabajo.",
        name: "María Ferrer",
        role: "Peluquería Mar · Valencia",
      },
      {
        quote: "No sabía que la tecnología podía ser tan sencilla. En una semana tenía todo funcionando y mis clientes están encantados.",
        name: "Jorge Ruiz",
        role: "Bistró del Carmen · Madrid",
      },
      {
        quote: "Nada de jerga técnica. Me explicó todo con claridad y desde el primer día noté el ahorro de tiempo.",
        name: "Lucía Navarro",
        role: "Fisio Centro · Sevilla",
      },
    ],
  },
  founder: {
    label: "Detrás del estudio",
    name: "Soy Eneko.",
    body: "No busco ser tu agencia, busco ser tu aliado tecnológico. Cada proyecto lo llevo yo personalmente, cuidando cada detalle como si fuera mi propio negocio. Mi objetivo es que la tecnología sea tu mejor empleada, no tu mayor dolor de cabeza.",
    signature: "— Eneko",
  },
  stickyCta: "Hablemos",
  pricing: {
    label: "Planes",
    title: "Inversión clara. Resultados reales.",
    subtitle: "Tres opciones diseñadas para diferentes necesidades. Si no sabes cuál elegir, lo vemos juntos.",
    badge: "Más popular",
    from: "desde",
    cta: "Empezar ahora",
    items: [
      {
        name: "Esencial",
        price: "149 €",
        tagline: "Tu presencia online profesional en 7 días.",
        features: [
          "Landing page de alto impacto",
          "Optimización para móviles",
          "Conexión con WhatsApp",
          "SEO local básico",
        ],
      },
      {
        name: "Negocio",
        price: "490 €",
        tagline: "Web + automatización inteligente.",
        features: [
          "Web completa multi-sección",
          "Sistema de reservas automático",
          "Respuestas automáticas",
          "Integración con calendarios",
        ],
      },
      {
        name: "A medida",
        price: "Consultar",
        tagline: "Sistemas complejos para tu flujo de trabajo.",
        features: [
          "Auditoría técnica profunda",
          "Automatizaciones personalizadas",
          "Integración total de herramientas",
          "Acompañamiento premium",
        ],
      },
    ],
    promise: {
      label: "Garantía de tranquilidad",
      title: "Resultados o te devuelvo el dinero.",
      body: "Si en 14 días no sientes que el sistema te está ahorrando tiempo real, te devuelvo el importe íntegro de tu inversión. Sin preguntas incómodas.",
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
    title: "Eneko Ruiz · Diseño y Automatización para Pequeños Negocios",
    description:
      "Ayudo a autónomos y pequeños negocios a recuperar su tiempo mediante webs inteligentes y automatizaciones sencillas. Sin jerga técnica, solo resultados.",
    ogTitle: "Diseño y automatización",
    ogTitleAccent: "sin complicaciones.",
    ogTagline: "Webs · Automatización · Pequeños Negocios",
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
  marquee: ["More time", "Less stress", "Zero jargon", "Hand-crafted"],
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
    label: "The method",
    title: "Three steps to get your time back.",
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
    showMore: "See more questions",
    showLess: "See fewer questions",
    askMe: "Ask me about this",
    viewAll: "View all",
    items: [
      { tag: "Scope", q: "What if I don't know exactly what I need?", a: "That's what the free 15-min call is for. I tell you what to automate first based on your business. If you don't need anything yet, I'll say that too." },
      { tag: "Scope", q: "Is my business too small?", a: "Quite the opposite. Most of my clients are 1–5 people. The smaller the team, the bigger the impact of getting 10 hours back per week." },
      { tag: "Scope", q: "Do you work with my current tools?", a: "Almost always yes: WhatsApp, Google Calendar, Stripe, Square, Shopify, Notion, Calendly, Mailchimp… If you use something exotic, I'll tell you on the call before charging a euro." },
      { tag: "Timing", q: "How fast will it be live?", a: "Simple site: 7 days. Full site: 2 weeks. Custom automation: 2–4 weeks. I commit to dates on the first call and I hit them. If anything slips, you hear from me first." },
      { tag: "Timing", q: "How much of my time will this take?", a: "About an hour the first week. Half an hour a week after that. I do the work, you decide. No Trello board to babysit." },
      { tag: "Pricing", q: "What does it cost exactly?", a: "Essential €149, Business €490, Custom we agree together. Price closed before we start. No surprises, no 'extras', no hours appearing at the end." },
      { tag: "Pricing", q: "Do I pay everything up front?", a: "No. 50% to start, 50% on delivery. Big projects we split in 3. No interest, no third-party financing." },
      { tag: "Pricing", q: "What if it doesn't convince me after paying?", a: "14-day trial. If it doesn't save you time, I refund you. No paperwork, no debate, no fine print." },
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
    s1: { 
      title: "What kind of project?", 
      options: ["New website", "Automation", "Online bookings", "Not sure yet"],
      descriptions: [
        "Launch your business with a site that actually converts.",
        "Save hours by eliminating repetitive manual work.",
        "Your clients book themselves 24/7 without you doing anything.",
        "Tell me your idea and we'll find the best way to help."
      ]
    },
    s2: { title: "What eats your time?", placeholder: "Sum it up in one line…" },
    s3: { title: "How do I reach you?", name: "Your name", email: "Your email" },
    gdpr: "I have read and accept the Privacy Policy",
  },
  footer: { 
    tagline: "Small studio. Big results.", 
    description: "We help local businesses bridge the digital gap, removing complexity and giving time back to those who create value.",
    rights: "All rights reserved.", 
    lang: "Language",
    sitemap: "Sitemap",
    roi: "ROI Calculator",
    pricing: "Pricing",
    config: "Settings",
    interface: "Interface",
    privacy: "Privacy",
    cookies: "Cookies",
    backToTop: "Back to top ↑",
  },
  legal: {
    privacy: { title: "Privacy Policy", body: "Your privacy is our priority..." },
    cookies: { title: "Cookies Policy", body: "We use cookies to improve your experience..." },
    notice: { title: "Legal Notice", body: "Owner details: Eneko Ruiz..." },
  },
  roi: {
    title: "How much is doing nothing costing you?",
    noHighlight: "nothing",
    subtitle: "Calculate the time and money you get back each year by eliminating repetitive tasks.",
    hoursLabel: "How many hours do you lose per week on repetitive tasks?",
    rateLabel: "Your estimated hourly rate",
    resultHours: "Annual hours lost",
    resultMoney: "Annual money lost",
    resultSaving: "With automation you recover",
    cta: "Get that money back",
  },
  comparison: {
    title: "Why not a big agency? Why not any freelancer?",
    subtitle: "Because neither is built for you.",
    columns: ["Big Agency", "Studio (us)", "Random Freelancer"],
    rows: [
      "Fair and transparent pricing",
      "Response in less than 24h",
      "Single person responsible",
      "14-day money-back guarantee",
      "No lock-in or contract",
      "Knows local businesses",
      "Available via WhatsApp",
    ],
  },
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
        price: "€149",
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
        price: "€490",
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
      label: "Trust guarantee",
      title: "Your investment, protected by results.",
      body: "If in 14 days you don't feel you've regained control of your time, I'll refund you in full. No questions asked, no strings attached, no fine print.",
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
};
