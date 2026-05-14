import { LegalLayout } from "@/components/legal/LegalLayout";
import { useLang } from "@/i18n/LanguageProvider";

export default function Cookies() {
  const { t } = useLang();
  return (
    <LegalLayout title={t.legal.cookies.title}>
      <p className="mb-6">{t.legal.cookies.body}</p>
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-aura-ink">1. ¿Qué son las cookies?</h2>
        <p>Las cookies son pequeños archivos de texto que se almacenan en su navegador para mejorar su experiencia de navegación y analizar el tráfico de la web de forma anónima.</p>
        <h2 className="text-xl font-bold text-aura-ink">2. Tipos de Cookies</h2>
        <p>Utilizamos cookies técnicas necesarias para el funcionamiento de la web y cookies analíticas para mejorar nuestros servicios.</p>
      </section>
    </LegalLayout>
  );
}
