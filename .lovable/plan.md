## Landing page "Code-Only" para tu agencia (ES/EN)

Una single-page de clase mundial, 100% sin imágenes ni vídeos, apoyada solo en tipografía masiva, espacio negativo, color y movimiento. Tono cercano, ejecución Apple/Stripe.

---

### 1. Sistema visual y estructura global

- **Paleta tricolor "Aura"**: naranja, magenta y azul eléctrico flotando sobre fondo crema sutil (`#FBFAF7`). Sección final invierte a negro puro con texto blanco.
- **Tipografía brutalista**: títulos `text-7xl`–`text-9xl` con `tracking-tighter`. Secundaria limpia para cuerpo. Solo fuentes del sistema + una display gratuita de Google Fonts compatible con vibe Apple/Stripe.
- **Monograma**: dos iniciales en serif/sans muy apretadas como logo en nav y footer. Edita el archivo `Logo.tsx` para cambiarlas en un sitio.
- **Idioma**: toggle ES/EN en el nav. Toda la copy vive en un único diccionario; cambia al instante sin recargar. Por defecto: Español.

### 2. Capas globales (siempre activas)

- **Dynamic Aura Background**: 3–4 orbes con `blur-[140px]` flotando con animaciones `Framer Motion` muy lentas (20–40s) que cambian posición, escala y opacidad. Fijo detrás de todo, no interfiere con scroll.
- **Custom Cursor**: punto sólido + anillo que lo persigue con `spring`. Al hacer hover en botones/links: el anillo crece, el botón se desplaza ligeramente hacia el cursor (efecto magnético). Se desactiva en touch/móvil (cursor nativo).
- **Smooth scroll Lenis**: integrado a nivel raíz, sincronizado con Framer Motion para que las animaciones de scroll sean mantequilla.
- **Nav glassmorphism**: invisible al cargar, aparece desde arriba al pasar de 80px de scroll. Contiene monograma · enlaces ancla (Servicios, Proceso, FAQ) · selector ES/EN · botón "Hablemos" magnético.

### 3. Secciones (storytelling fluido)

1. **Hero sensorial**
   - Titular masivo centrado revelado palabra por palabra con `stagger`: *"Hacemos que lo complejo, desaparezca."*
   - Subtítulo con fade suave: *"Tú dedícate a tu negocio, yo automatizo el resto."*
   - CTA primario oscuro magnético: *"Recupera tu tiempo"* → ancla al CTA final.
   - Indicador sutil de scroll abajo.

2. **Manifiesto**
   - Padding gigante, texto grande (~text-5xl) con efecto de iluminación por palabra al hacer scroll (opacidad 20% → 100% según `useScroll`):
   - *"Los negocios locales pierden 15 horas a la semana en tareas que una máquina haría en un segundo. Vamos a cambiar eso."*

3. **Bento grid de servicios**
   - 3 tarjetas asimétricas (1 grande + 2 medianas) con bordes finos translúcidos, fondo `backdrop-blur` y gradientes sutiles. Iconos Lucide (`Globe`, `CalendarClock`, `Workflow`).
   - Tarjeta 1 (grande): **Webs que Captan**.
   - Tarjeta 2: **Agendas Automáticas**.
   - Tarjeta 3: **Automatización Total**.
   - Líneas decorativas SVG y micro-animaciones de hover (gradiente que se mueve, icono que pulsa).

4. **Cómo funciona**
   - Timeline 100% tipográfico vertical. Números gigantes (01 · 02 · 03) en outline, título y descripción al lado. Cada paso aparece con `whileInView` fade+slide.
   - Paso 1: *Café virtual* · Paso 2: *Diseño del sistema* · Paso 3: *Disfrutas de tu tiempo*.

5. **FAQ**
   - Acordeón minimalista (componente `accordion` ya disponible) con altura animada suave. 5–6 preguntas que quitan miedo:
     - ¿Necesito saber de informática?
     - ¿Cuánto tarda?
     - ¿Y si soy muy pequeño?
     - ¿Qué pasa si algo se rompe?
     - ¿Me ato a un contrato largo?
     - ¿Cuánto cuesta?

6. **CTA final (alto contraste)**
   - Fondo negro puro, los orbes se atenúan. Titular blanco gigante: *"¿Listo para que tu negocio trabaje para ti?"*
   - Formulario ultra-minimalista: 3 campos con líneas inferiores animadas (Nombre · Email · *"¿Qué te quita tiempo?"*) + botón claro magnético.
   - Validación con Zod (límites de longitud, email válido).
   - Al enviar: email transaccional de confirmación al usuario + email de notificación a tu bandeja.

7. **Footer minimalista**
   - Monograma · enlaces ancla · selector idioma · línea de copyright.

8. **WhatsApp flotante**
   - Botón redondo abajo-derecha, icono Lucide `MessageCircle`, anillo que pulsa suavemente en loop infinito. Abre `wa.me/<placeholder>` con mensaje pre-rellenado en el idioma activo.

### 4. Backend (emails)

- Activamos **Lovable Cloud** y configuramos un **dominio de email** (te guío con el diálogo).
- Una sola Edge Function `send-transactional-email` con dos plantillas React Email (en español + inglés según preferencia del visitante):
  - `lead-confirmation`: confirma al visitante que recibiste su mensaje.
  - `lead-notification`: te llega a ti con los datos del lead.
- Tabla `leads` en Supabase con RLS estricto (solo insert público, select bloqueado salvo service role).
- Idempotencia y validación server-side en la function.

### 5. Detalles técnicos

- **Stack**: React 18 + Vite + Tailwind + TypeScript + Framer Motion + Lenis.
- **Modularidad**:
  - `src/components/landing/` → `Nav`, `Hero`, `Manifesto`, `BentoServices`, `Process`, `FAQ`, `FinalCTA`, `Footer`, `WhatsAppFAB`.
  - `src/components/effects/` → `AuraBackground`, `CustomCursor`, `MagneticButton`, `ScrollRevealText`, `SmoothScrollProvider`.
  - `src/i18n/dictionary.ts` → único punto de verdad para textos ES/EN.
  - `src/hooks/useLanguage.ts` → estado global con persistencia en `localStorage`.
- **Design tokens** en `index.css` + `tailwind.config.ts`: tokens HSL para `aura-orange`, `aura-magenta`, `aura-blue`, `cream`, `ink`, plus `fade-in-up`, `word-reveal`, `pulse-soft`.
- **Accesibilidad**: respeta `prefers-reduced-motion` (orbes y reveals se atenúan), foco visible en todos los interactivos, labels en formulario, contraste AA garantizado.
- **Rendimiento**: orbes en capa propia con `will-change: transform`, animaciones GPU-only, lazy mount del cursor en desktop.
- **Móvil**: tipografía escalada (`text-5xl` base), bento se apila, cursor custom desactivado, nav colapsa los enlaces dejando solo logo + idioma + Hablemos.

### 6. Lo que NO se hará

- Nada de imágenes, vídeo, ilustraciones rasterizadas ni assets externos.
- Nada de librerías UI extra fuera de las ya disponibles (shadcn) y Lucide.
- Nada de routing adicional: todo es scroll en `/`.
