import { LegalLayout } from "@/components/legal/LegalLayout";
import { useLang } from "@/i18n/LanguageProvider";

export default function Legal() {
  const { t } = useLang();
  return (
    <LegalLayout title={t.legal.notice.title}>
      <p className="mb-6">{t.legal.notice.body}</p>
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-aura-ink">1. Datos del Titular</h2>
        <p>Nombre: Eneko Ruiz</p>
        <p>CIF/NIF: [Añadir NIF]</p>
        <p>Domicilio: [Añadir Dirección]</p>
        <p>Email: [Añadir Email]</p>
      </section>
    </LegalLayout>
  );
}
