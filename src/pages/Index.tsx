import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import ExpenseSummary from "@/components/ExpenseSummary";
import ExpenseForm from "@/components/ExpenseForm";
import FilterBar from "@/components/FilterBar";
import ExpenseList from "@/components/ExpenseList";
import { mockExpenses, type Expense } from "@/data/mockExpenses";
import { Wallet } from "lucide-react";

const Index = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [activeCategory, setActiveCategory] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setExpenses(mockExpenses);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const addExpense = useCallback((data: Omit<Expense, "id">) => {
    setExpenses((prev) => [
      { ...data, id: crypto.randomUUID() },
      ...prev,
    ]);
  }, []);

  const deleteExpense = useCallback((id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const filterByCategory = useCallback((category: string) => {
    setActiveCategory(category);
  }, []);

  const filteredExpenses = useMemo(() => {
    if (!activeCategory) return expenses;
    return expenses.filter((e) => e.category === activeCategory);
  }, [expenses, activeCategory]);

  const total = useMemo(() => {
    return filteredExpenses.reduce((sum, e) => sum + e.amount, 0);
  }, [filteredExpenses]);

  return (
    <div className="min-h-screen bg-background grid-pattern">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="border-b border-border/50 glass sticky top-0 z-50"
      >
        <div className="px-6 lg:px-8 py-4 flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Wallet className="h-4 w-4 text-primary" />
          </div>
          <h1 className="text-sm font-semibold tracking-wide text-foreground" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Expense Tracker
          </h1>
        </div>
      </motion.header>

      {/* Main Layout */}
      <div className="lg:flex">
        {/* Left Column — Control Center */}
        <aside className="lg:w-[38%] lg:min-h-[calc(100vh-57px)] lg:sticky lg:top-[57px] lg:border-r border-border/50">
          <ExpenseSummary total={total} count={filteredExpenses.length} />
          <ExpenseForm onAdd={addExpense} />
        </aside>

        {/* Right Column — Ledger */}
        <main className="lg:w-[62%] border-t lg:border-t-0 border-border/50">
          <FilterBar activeCategory={activeCategory} onCategoryChange={filterByCategory} />
          <ExpenseList expenses={filteredExpenses} onDelete={deleteExpense} />
        </main>
      </div>
    </div>
  );
};

export default Index;
