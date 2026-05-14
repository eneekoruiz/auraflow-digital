import { Star, Clock, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useLang } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

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
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
      className="texture-glass hidden flex-col gap-0 overflow-hidden rounded-[2rem] border border-aura-ink/5 bg-white/50 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] backdrop-blur-xl md:flex"
    >
      <ul className="flex flex-col">
        {items.map(({ icon: Icon, label }, i) => (
          <li 
            key={label} 
            className={cn(
              "flex items-center gap-4 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-aura-ink/50",
              i > 0 && "border-t border-aura-ink/5"
            )}
          >
            <Icon className="h-4 w-4 text-aura-peach/80" aria-hidden />
            <span>{label}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
