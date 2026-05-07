import { Star, Clock, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useLang } from "@/i18n/LanguageProvider";

/**
 * Trust strip directly under the hero CTA. Surfacing concrete trust signals
 * near the primary action is one of the highest-impact CRO patterns
 * (Baymard, NN/g): it reduces perceived risk before the user has to think.
 */
export function SocialProof() {
  const { t } = useLang();
  const items = [
    { icon: Star, label: t.hero.proof.stars },
    { icon: Clock, label: t.hero.proof.reply },
    { icon: ShieldCheck, label: t.hero.proof.noContract },
  ];
  return (
    <motion.ul
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
      className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-aura-ink/60 sm:text-sm"
      aria-label="trust signals"
    >
      {items.map(({ icon: Icon, label }) => (
        <li key={label} className="inline-flex items-center gap-2">
          <Icon className="h-3.5 w-3.5 text-aura-ink/50" aria-hidden />
          <span>{label}</span>
        </li>
      ))}
    </motion.ul>
  );
}
