import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { LanguageProvider, useLang } from "@/i18n/LanguageProvider";
import { AuraBackground } from "@/components/effects/AuraBackground";
import { CustomCursor } from "@/components/effects/CustomCursor";

const EASE = [0.22, 1, 0.36, 1] as const;

function NotFoundInner() {
  const { t } = useLang();
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <main className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-background px-6">
      <AuraBackground />
      <CustomCursor />

      <div className="relative mx-auto max-w-3xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-aura-ink/10 bg-white/60 px-4 py-1.5 text-xs font-medium tracking-wide text-aura-ink/70 backdrop-blur"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-aura-peach" /> 404
        </motion.p>

        <h1 className="text-balance font-display text-[14vw] leading-[0.92] tracking-tighter text-aura-ink sm:text-[10vw] md:text-8xl lg:text-9xl">
          {t.notFound.title.split(" ").map((w, i) => (
            <span key={i} className="mr-[0.18em] inline-block overflow-hidden align-bottom">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.9, delay: 0.2 + i * 0.08, ease: EASE }}
                className="inline-block"
              >
                {w}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8, ease: EASE }}
          className="mx-auto mt-8 max-w-md text-balance text-aura-ink/65 md:text-lg"
        >
          {t.notFound.body}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1, ease: EASE }}
          className="mt-10"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-aura-ink px-7 py-4 text-sm font-medium text-white transition-colors hover:bg-aura-ink/90"
          >
            <ArrowLeft className="h-4 w-4" />
            {t.notFound.cta}
          </Link>
        </motion.div>
      </div>
    </main>
  );
}

const NotFound = () => (
  <LanguageProvider>
    <NotFoundInner />
  </LanguageProvider>
);

export default NotFound;
