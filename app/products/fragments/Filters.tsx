interface FiltersProps {
  categories: string[];
  selectedCategories: string[];
  onToggleCategory: (category: string) => void;
  brands: string[];
  selectedBrands: string[];
  onToggleBrand: (brand: string) => void;
  onClear: () => void;
}

export default function Filters({
  categories,
  selectedCategories,
  onToggleCategory,
  brands,
  selectedBrands,
  onToggleBrand,
  onClear,
}: FiltersProps) {
  const hasActiveFilters = selectedCategories.length > 0 || selectedBrands.length > 0;

  return (
    <aside className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-900">Filters</h2>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClear}
            className="text-xs font-medium text-brand-dark hover:text-brand"
          >
            Clear all
          </button>
        )}
      </div>

      <fieldset>
        <legend className="text-xs font-semibold tracking-wide text-slate-500">CATEGORY</legend>
        <div className="mt-3 space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center gap-2 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => onToggleCategory(category)}
                className="h-4 w-4 rounded border-slate-300 text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              />
              {category}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-xs font-semibold tracking-wide text-slate-500">BRAND</legend>
        <div className="mt-3 space-y-2">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center gap-2 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => onToggleBrand(brand)}
                className="h-4 w-4 rounded border-slate-300 text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              />
              {brand}
            </label>
          ))}
        </div>
      </fieldset>
    </aside>
  );
}
