import React from "react";
import { CATEGORIES } from "@/data/mockExpenses";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ activeCategory, onCategoryChange }) => {
  return (
    <div className="border-b border-border p-4 lg:p-6">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
        Filter by Category
      </p>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCategoryChange("")}
          className={cn(
            "px-3 py-1.5 text-xs uppercase tracking-wider border transition-colors",
            activeCategory === ""
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-card text-muted-foreground border-border hover:text-foreground hover:border-foreground"
          )}
        >
          All
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={cn(
              "px-3 py-1.5 text-xs uppercase tracking-wider border transition-colors",
              activeCategory === cat
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card text-muted-foreground border-border hover:text-foreground hover:border-foreground"
            )}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
