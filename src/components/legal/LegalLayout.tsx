import { motion } from "framer-motion";
import { useLang } from "@/i18n/LanguageProvider";
import { AuraBackground } from "@/components/effects/AuraBackground";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { CustomCursor } from "@/components/effects/CustomCursor";

interface LegalLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function LegalLayout({ title, children }: LegalLayoutProps) {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <AuraBackground dim />
      <CustomCursor />
      <Nav />
      <main className="relative z-10 mx-auto max-w-4xl px-6 pb-24 pt-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="mb-12 font-display text-4xl tracking-tight text-aura-ink md:text-6xl">
            {title}
          </h1>
          <div className="prose prose-aura max-w-none text-aura-ink/70">
            {children}
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
