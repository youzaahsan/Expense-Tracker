import React from "react";
import { motion } from "framer-motion";
import { Filter } from "lucide-react";
import { CATEGORIES } from "@/data/mockExpenses";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ activeCategory, onCategoryChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="border-b border-border/50 p-4 lg:p-6"
    >
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3 font-medium flex items-center gap-2">
        <Filter className="h-3.5 w-3.5 text-primary" />
        Filter
      </p>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCategoryChange("")}
          className={cn(
            "px-3.5 py-1.5 text-xs font-medium rounded-full border transition-all duration-200",
            activeCategory === ""
              ? "text-primary-foreground border-transparent shadow-lg"
              : "bg-secondary/50 text-muted-foreground border-border/50 hover:text-foreground hover:border-border"
          )}
          style={activeCategory === "" ? { background: 'var(--gradient-primary)', boxShadow: 'var(--shadow-glow)' } : undefined}
        >
          All
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={cn(
              "px-3.5 py-1.5 text-xs font-medium rounded-full border transition-all duration-200",
              activeCategory === cat
                ? "text-primary-foreground border-transparent shadow-lg"
                : "bg-secondary/50 text-muted-foreground border-border/50 hover:text-foreground hover:border-border"
            )}
            style={activeCategory === cat ? { background: 'var(--gradient-primary)', boxShadow: 'var(--shadow-glow)' } : undefined}
          >
            {cat}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default FilterBar;
