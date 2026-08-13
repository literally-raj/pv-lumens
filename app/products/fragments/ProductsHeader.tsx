import { Search } from "lucide-react";

interface ProductsHeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export default function ProductsHeader({ search, onSearchChange }: ProductsHeaderProps) {
  return (
    <section className="bg-white pt-32 pb-10 sm:pt-40">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <span className="inline-flex items-center rounded-full bg-slate-100 px-4 py-1 text-xs font-semibold tracking-wide text-slate-600">
          PRODUCTS
        </span>
        <h1 className="mt-5 text-3xl font-semibold leading-snug tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
          Browse Our Product Catalog
        </h1>

        <div className="relative mx-auto mt-8 max-w-xl">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
          <input
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search products or brands..."
            aria-label="Search products"
            className="w-full rounded-md border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          />
        </div>
      </div>
    </section>
  );
}
