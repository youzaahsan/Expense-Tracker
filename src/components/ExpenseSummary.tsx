import React, { useMemo } from "react";

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
    <div className="border-b border-border p-6 lg:p-8">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
        Total Expenses
      </p>
      <div className="font-mono text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
        $<RollingDigits value={formattedTotal} />
      </div>
      <p className="text-xs text-muted-foreground mt-3 font-mono">
        {count} {count === 1 ? "entry" : "entries"}
      </p>
    </div>
  );
};

export default ExpenseSummary;
