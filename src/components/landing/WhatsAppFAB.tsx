import { useLang } from "@/i18n/LanguageProvider";
import { motion } from "framer-motion";

// Replace with your real WhatsApp number (international format, no "+")
const WHATSAPP_NUMBER = "34600000000";

export function WhatsAppFAB() {
  const { t, lang } = useLang();
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t.whatsapp.message)}`;
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.whatsapp.label}
      key={lang}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group fixed bottom-6 right-6 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_15px_40px_-10px_rgba(37,211,102,0.6)] md:bottom-8 md:right-8 md:h-16 md:w-16"
    >
      <span
        aria-hidden
        className="absolute inset-0 rounded-full bg-[#25D366] animate-ring-pulse"
      />
      <svg
        viewBox="0 0 32 32"
        className="relative h-6 w-6 md:h-7 md:w-7"
        fill="currentColor"
        aria-hidden
      >
        <path d="M19.11 17.43c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.18-1.34-.81-.72-1.35-1.61-1.51-1.88-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.02-.22-.53-.45-.46-.61-.47-.16-.01-.34-.01-.52-.01-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29 0 1.35.98 2.66 1.12 2.84.14.18 1.94 2.97 4.71 4.16.66.28 1.17.45 1.57.58.66.21 1.26.18 1.74.11.53-.08 1.6-.65 1.83-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.32zM16 4C9.37 4 4 9.37 4 16c0 2.12.55 4.18 1.6 6L4 28l6.18-1.62A12.07 12.07 0 0016 28c6.63 0 12-5.37 12-12S22.63 4 16 4z" />
      </svg>
    </motion.a>
  );
}
