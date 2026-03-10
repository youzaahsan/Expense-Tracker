import React, { useRef, useState, useCallback } from "react";
import { format } from "date-fns";
import { CalendarIcon, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { CATEGORIES, type Expense } from "@/data/mockExpenses";

interface ExpenseFormProps {
  onAdd: (expense: Omit<Expense, "id">) => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onAdd }) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());

  React.useEffect(() => {
    titleRef.current?.focus();
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!title.trim() || !amount || !category || !date) return;

      onAdd({
        title: title.trim(),
        amount: parseFloat(amount),
        category,
        date: format(date, "yyyy-MM-dd"),
      });

      setTitle("");
      setAmount("");
      setCategory("");
      setDate(new Date());
      titleRef.current?.focus();
    },
    [title, amount, category, date, onAdd]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="p-6 lg:p-8"
    >
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-5 font-medium flex items-center gap-2">
        <Plus className="h-3.5 w-3.5 text-primary" />
        New Expense
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block font-medium">Title</label>
          <Input
            ref={titleRef}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What did you spend on?"
            className="border-border/50 bg-secondary/50 h-11 rounded-xl glow-ring transition-all focus-visible:ring-primary/30"
          />
        </div>

        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block font-medium">Amount</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary font-mono text-sm font-semibold">$</span>
            <Input
              type="number"
              step="0.01"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="border-border/50 bg-secondary/50 h-11 pl-7 font-mono rounded-xl glow-ring transition-all focus-visible:ring-primary/30"
            />
          </div>
        </div>

        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block font-medium">Category</label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="border-border/50 bg-secondary/50 h-11 rounded-xl">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="rounded-xl bg-card border-border/50">
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat} className="rounded-lg">
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block font-medium">Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal h-11 border-border/50 bg-secondary/50 rounded-xl",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                {date ? (
                  <span className="font-mono text-sm">{format(date, "yyyy-MM-dd")}</span>
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 rounded-xl border-border/50" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>

        <Button
          type="submit"
          className="w-full h-11 text-xs uppercase tracking-[0.15em] font-semibold mt-2 rounded-xl relative overflow-hidden group"
          style={{ background: 'var(--gradient-primary)' }}
        >
          <span className="relative z-10 flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Expense
          </span>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'var(--gradient-accent)' }} />
        </Button>
      </form>
    </motion.div>
  );
};

export default ExpenseForm;
