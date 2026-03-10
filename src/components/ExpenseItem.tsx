import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Expense } from "@/data/mockExpenses";

interface ExpenseItemProps {
  expense: Expense;
  onDelete: (id: string) => void;
  index: number;
}

const categoryColors: Record<string, string> = {
  "Food & Dining": "text-orange-400 bg-orange-400/10 border-orange-400/20",
  "Transportation": "text-blue-400 bg-blue-400/10 border-blue-400/20",
  "Entertainment": "text-purple-400 bg-purple-400/10 border-purple-400/20",
  "Shopping": "text-pink-400 bg-pink-400/10 border-pink-400/20",
  "Utilities": "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  "Healthcare": "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  "Education": "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
  "Other": "text-slate-400 bg-slate-400/10 border-slate-400/20",
};

const ExpenseItem: React.FC<ExpenseItemProps> = ({ expense, onDelete, index }) => {
  return (
    <motion.tr
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="border-b border-border/30 group hover:bg-secondary/30 transition-colors"
    >
      <td className="p-4 text-sm font-medium text-foreground">
        {expense.title}
      </td>
      <td className="p-4 text-sm font-mono text-foreground text-right tabular-nums font-semibold">
        <span className="text-muted-foreground">$</span>{expense.amount.toFixed(2)}
      </td>
      <td className="p-4">
        <span className={cn(
          "text-xs font-medium px-2.5 py-1 rounded-full border",
          categoryColors[expense.category] || categoryColors["Other"]
        )}>
          {expense.category}
        </span>
      </td>
      <td className="p-4 text-sm font-mono text-muted-foreground">
        {expense.date}
      </td>
      <td className="p-4 text-right">
        <button
          onClick={() => onDelete(expense.id)}
          className="opacity-0 group-hover:opacity-100 transition-all text-muted-foreground hover:text-destructive p-1.5 rounded-lg hover:bg-destructive/10"
          aria-label={`Delete ${expense.title}`}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </td>
    </motion.tr>
  );
};

export default ExpenseItem;
