export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string; // ISO string
}

export const CATEGORIES = [
  "Food & Dining",
  "Transportation",
  "Entertainment",
  "Shopping",
  "Utilities",
  "Healthcare",
  "Education",
  "Other",
] as const;

export const mockExpenses: Expense[] = [
  { id: "1", title: "Grocery shopping", amount: 84.50, category: "Food & Dining", date: "2026-03-01" },
  { id: "2", title: "Metro pass", amount: 120.00, category: "Transportation", date: "2026-03-02" },
  { id: "3", title: "Netflix subscription", amount: 15.99, category: "Entertainment", date: "2026-03-03" },
  { id: "4", title: "New headphones", amount: 249.00, category: "Shopping", date: "2026-03-04" },
  { id: "5", title: "Electric bill", amount: 67.30, category: "Utilities", date: "2026-03-05" },
  { id: "6", title: "Dentist visit", amount: 150.00, category: "Healthcare", date: "2026-03-06" },
  { id: "7", title: "Online course", amount: 29.99, category: "Education", date: "2026-03-07" },
  { id: "8", title: "Coffee & pastries", amount: 12.40, category: "Food & Dining", date: "2026-03-08" },
  { id: "9", title: "Uber ride", amount: 23.50, category: "Transportation", date: "2026-03-09" },
  { id: "10", title: "Book purchase", amount: 18.95, category: "Shopping", date: "2026-03-10" },
];
