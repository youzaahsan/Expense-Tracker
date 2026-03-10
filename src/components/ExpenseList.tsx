import React from "react";
import ExpenseItem from "./ExpenseItem";
import type { Expense } from "@/data/mockExpenses";

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onDelete }) => {
  if (expenses.length === 0) {
    return (
      <div className="p-12 text-center">
        <p className="text-sm text-muted-foreground">No expenses found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
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
          {expenses.map((expense) => (
            <ExpenseItem key={expense.id} expense={expense} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;
