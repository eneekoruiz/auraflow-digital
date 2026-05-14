import { LegalLayout } from "@/components/legal/LegalLayout";
import { useLang } from "@/i18n/LanguageProvider";

export default function Privacy() {
  const { t } = useLang();
  return (
    <LegalLayout title={t.legal.privacy.title}>
      <p className="mb-6">{t.legal.privacy.body}</p>
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-aura-ink">1. Tratamiento de Datos</h2>
        <p>Los datos recogidos a través de los formularios de contacto se utilizarán exclusivamente para responder a sus solicitudes y prestar los servicios contratados.</p>
        <h2 className="text-xl font-bold text-aura-ink">2. Derechos</h2>
        <p>Usted tiene derecho a acceder, rectificar y suprimir sus datos, así como otros derechos explicados en la normativa vigente de protección de datos (RGPD).</p>
      </section>
    </LegalLayout>
  );
}
