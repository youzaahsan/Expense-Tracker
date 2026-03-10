import React, { useState, useEffect, useMemo, useCallback } from "react";
import ExpenseSummary from "@/components/ExpenseSummary";
import ExpenseForm from "@/components/ExpenseForm";
import FilterBar from "@/components/FilterBar";
import ExpenseList from "@/components/ExpenseList";
import { mockExpenses, type Expense } from "@/data/mockExpenses";

const Index = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [activeCategory, setActiveCategory] = useState("");

  // Simulate fetching from a mock API on mount
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="px-6 lg:px-8 py-5">
          <h1 className="text-xs uppercase tracking-[0.3em] font-semibold text-foreground">
            Expense Tracker
          </h1>
        </div>
      </header>

      {/* Main Layout */}
      <div className="lg:flex">
        {/* Left Column — Control Center */}
        <aside className="lg:w-[35%] lg:min-h-[calc(100vh-57px)] lg:sticky lg:top-0 lg:border-r border-border">
          <ExpenseSummary total={total} count={filteredExpenses.length} />
          <ExpenseForm onAdd={addExpense} />
        </aside>

        {/* Right Column — Ledger */}
        <main className="lg:w-[65%] border-t lg:border-t-0 border-border">
          <FilterBar activeCategory={activeCategory} onCategoryChange={filterByCategory} />
          <ExpenseList expenses={filteredExpenses} onDelete={deleteExpense} />
        </main>
      </div>
    </div>
  );
};

export default Index;
