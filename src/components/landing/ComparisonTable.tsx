import { motion } from "framer-motion";
import { Check, X, Minus } from "lucide-react";
import { useLang } from "@/i18n/LanguageProvider";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * Constants & Types
 */
const EASE = [0.22, 1, 0.36, 1] as const;

// Data matrix: 0 = agency, 1 = studio, 2 = freelancer
// values: 1 = check, -1 = x, 0 = minus
const MATRIX = [
  [-1, 1, 0],  // Precio justo
  [0, 1, -1],  // Respuesta <24h
  [-1, 1, 1],  // Una sola persona
  [-1, 1, -1], // Garantía
  [-1, 1, 1],  // Sin permanencia
  [-1, 1, 1],  // Conoce negocios locales
  [-1, 1, 0],  // WhatsApp
];

/**
 * ComparisonTable: Main Section Component
 */
export function ComparisonTable() {
  const { t } = useLang();

  return (
    <section className="relative px-4 py-12 sm:px-6 sm:py-16 md:py-20">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10">
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-aura-ink/40">— {t.comparison.columns[1]}</p>
          <h2 className="max-w-4xl text-balance font-display text-[clamp(1.75rem,6vw,3.5rem)] leading-[0.9] tracking-tighter text-aura-ink">
            <span className="text-aura-peach">{t.comparison.title.split("?")[0]}?</span>
            <span className="opacity-80">{t.comparison.title.split("?")[1]}?</span>
          </h2>
          <p className="mt-6 max-w-2xl text-balance text-base leading-relaxed text-aura-ink/65 sm:text-lg">
            {t.comparison.subtitle}
          </p>
        </header>

        <motion.div
          onViewportEnter={() => track("comparison_table_viewed")}
          viewport={{ once: true, margin: "-100px" }}
          className="texture-glass relative overflow-hidden rounded-[2.5rem] border border-aura-ink/5 bg-white/40 backdrop-blur-2xl shadow-[0_40px_100px_-30px_rgba(0,0,0,0.1)]"
        >
          <TableHeader columns={t.comparison.columns} />
          <div className="divide-y divide-aura-ink/5">
            {t.comparison.rows.map((row, i) => (
              <TableRow 
                key={row} 
                label={row} 
                values={MATRIX[i]} 
                index={i} 
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/**
 * TableHeader Component
 */
function TableHeader({ columns }: { columns: string[] }) {
  return (
    <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] border-b border-aura-ink/10 bg-aura-ink/5 sm:grid-cols-[1fr_1fr_1fr_1fr]">
      <div className="p-3 sm:p-4" />
      {columns.map((col, i) => (
        <div 
          key={col} 
          className={cn(
            "flex items-center justify-center p-3 text-center text-[10px] font-bold uppercase tracking-widest sm:p-4 whitespace-nowrap",
            i === 1 ? "bg-aura-ink text-aura-cream" : "text-aura-ink/50"
          )}
        >
          {col}
        </div>
      ))}
    </div>
  );
}

/**
 * TableRow Component
 */
interface TableRowProps {
  label: string;
  values: number[];
  index: number;
}

function TableRow({ label, values, index }: TableRowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: EASE }}
      className="grid grid-cols-[1.5fr_1fr_1fr_1fr] items-center hover:bg-aura-ink/[0.02] transition-colors sm:grid-cols-[1fr_1fr_1fr_1fr]"
    >
      <div className="p-3 text-sm font-medium text-aura-ink/80 sm:p-4 whitespace-nowrap">
        {label}
      </div>
      {values.map((val, colIndex) => (
        <div 
          key={colIndex} 
          className={cn(
            "flex justify-center p-3 sm:p-4",
            colIndex === 1 && "bg-aura-peach/5 border-x border-aura-peach/20"
          )}
        >
          <StatusIcon value={val} featured={colIndex === 1} />
        </div>
      ))}
    </motion.div>
  );
}

/**
 * StatusIcon Component
 */
function StatusIcon({ value, featured }: { value: number; featured: boolean }) {
  if (value === 1) return <Check className={cn("h-5 w-5", featured ? "text-aura-ink" : "text-green-500")} />;
  if (value === -1) return <X className="h-5 w-5 text-aura-ink/20" />;
  return <Minus className="h-5 w-5 text-aura-ink/40" />;
}

