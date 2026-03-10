import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { TrendingUp, ArrowUpRight } from "lucide-react";

interface ExpenseSummaryProps {
  total: number;
  count: number;
}

const RollingDigits: React.FC<{ value: string }> = ({ value }) => {
  return (
    <span className="inline-flex overflow-hidden">
      {value.split("").map((char, i) => (
        <span key={`${i}-${char}`} className="digit-roll">
          {char}
        </span>
      ))}
    </span>
  );
};

const ExpenseSummary: React.FC<ExpenseSummaryProps> = ({ total, count }) => {
  const formattedTotal = useMemo(() => {
    return total.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }, [total]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="p-6 lg:p-8"
    >
      <div className="rounded-2xl p-6 relative overflow-hidden" style={{ background: 'var(--gradient-surface)', boxShadow: 'var(--shadow-card)' }}>
        {/* Decorative gradient orb */}
        <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-20" style={{ background: 'var(--gradient-primary)', filter: 'blur(40px)' }} />
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-primary/15 flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
              Total Spent
            </p>
          </div>
          <span className="flex items-center gap-1 text-xs font-medium text-accent bg-accent/10 px-2.5 py-1 rounded-full">
            <ArrowUpRight className="h-3 w-3" />
            {count} entries
          </span>
        </div>

        <div className="font-mono text-4xl lg:text-5xl font-bold text-foreground tracking-tight relative z-10">
          <span className="text-muted-foreground text-3xl lg:text-4xl">$</span>
          <RollingDigits value={formattedTotal} />
        </div>

        <div className="mt-4 h-1 rounded-full bg-secondary overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '65%' }}
            transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
            className="h-full rounded-full"
            style={{ background: 'var(--gradient-primary)' }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">65% of monthly budget</p>
      </div>
    </motion.div>
  );
};

export default ExpenseSummary;
