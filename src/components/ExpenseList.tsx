import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Receipt } from "lucide-react";
import ExpenseItem from "./ExpenseItem";
import type { Expense } from "@/data/mockExpenses";

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onDelete }) => {
  if (expenses.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-16 text-center"
      >
        <div className="h-12 w-12 rounded-2xl bg-secondary/50 flex items-center justify-center mx-auto mb-4">
          <Receipt className="h-6 w-6 text-muted-foreground" />
        </div>
        <p className="text-sm text-muted-foreground">No expenses found.</p>
        <p className="text-xs text-muted-foreground/60 mt-1">Add your first expense to get started.</p>
      </motion.div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border/50">
            <th className="p-4 text-left text-xs uppercase tracking-[0.15em] text-muted-foreground font-medium">
              Title
            </th>
            <th className="p-4 text-right text-xs uppercase tracking-[0.15em] text-muted-foreground font-medium">
              Amount
            </th>
            <th className="p-4 text-left text-xs uppercase tracking-[0.15em] text-muted-foreground font-medium">
              Category
            </th>
            <th className="p-4 text-left text-xs uppercase tracking-[0.15em] text-muted-foreground font-medium">
              Date
            </th>
            <th className="p-4 w-12"></th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {expenses.map((expense, index) => (
              <ExpenseItem key={expense.id} expense={expense} onDelete={onDelete} index={index} />
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;
