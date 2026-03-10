import React from "react";
import { Trash2 } from "lucide-react";
import type { Expense } from "@/data/mockExpenses";

interface ExpenseItemProps {
  expense: Expense;
  onDelete: (id: string) => void;
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({ expense, onDelete }) => {
  return (
    <tr className="border-b border-border group hover:bg-secondary/50 transition-colors">
      <td className="p-4 text-sm font-medium text-foreground">
        {expense.title}
      </td>
      <td className="p-4 text-sm font-mono text-foreground text-right tabular-nums">
        ${expense.amount.toFixed(2)}
      </td>
      <td className="p-4">
        <span className="text-xs uppercase tracking-wider text-muted-foreground border border-border px-2 py-1">
          {expense.category}
        </span>
      </td>
      <td className="p-4 text-sm font-mono text-muted-foreground">
        {expense.date}
      </td>
      <td className="p-4 text-right">
        <button
          onClick={() => onDelete(expense.id)}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive p-1"
          aria-label={`Delete ${expense.title}`}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </td>
    </tr>
  );
};

export default ExpenseItem;
