import { SlidersHorizontal } from "lucide-react";

export type SortOption = "name" | "brand" | "category";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "name", label: "Name (A-Z)" },
  { value: "brand", label: "Brand" },
  { value: "category", label: "Category" },
];

interface ToolbarProps {
  resultCount: number;
  sort: SortOption;
  onSortChange: (value: SortOption) => void;
  filtersOpen: boolean;
  onToggleFilters: () => void;
}

export default function Toolbar({
  resultCount,
  sort,
  onSortChange,
  filtersOpen,
  onToggleFilters,
}: ToolbarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
        <label className="flex items-center gap-2 text-sm text-slate-500">
          Sort by
          <select
            value={sort}
            onChange={(event) => onSortChange(event.target.value as SortOption)}
            className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <button
          type="button"
          onClick={onToggleFilters}
          aria-pressed={filtersOpen}
          className={`inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors ${
            filtersOpen
              ? "border-slate-900 bg-slate-900 text-white"
              : "border-slate-300 text-slate-600 hover:bg-slate-50"
          }`}
        >
          <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
          Filters
        </button>
      </div>

      <p className="text-sm text-slate-500">
        <span className="font-semibold text-slate-900">{resultCount}</span> products found
      </p>
    </div>
  );
}
