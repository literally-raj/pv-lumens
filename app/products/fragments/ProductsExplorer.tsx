"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useMemo, useState } from "react";
import { BRANDS } from "@/lib/data/brands";
import { PRODUCTS } from "@/lib/data/products";
import { SOLUTIONS } from "@/lib/data/solutions";
import BrandStrip from "./BrandStrip";
import Filters from "./Filters";
import ProductGrid from "./ProductGrid";
import ProductsHeader from "./ProductsHeader";
import Toolbar, { type SortOption } from "./Toolbar";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const CATEGORIES = SOLUTIONS.map(({ category }) => category);
const BRAND_NAMES = BRANDS.map(({ name }) => name);

function toggle(list: string[], value: string) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

export default function ProductsExplorer() {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sort, setSort] = useState<SortOption>("name");
  // ponytail: starts closed on every breakpoint — avoids a hydration mismatch from
  // reading window.matchMedia to default it open on desktop only.
  const [filtersOpen, setFiltersOpen] = useState(false);

  const products = useMemo(() => {
    const query = search.trim().toLowerCase();

    return PRODUCTS.filter((product) => {
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query);
      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);

      return matchesSearch && matchesCategory && matchesBrand;
    }).sort((a, b) => a[sort].localeCompare(b[sort]));
  }, [search, selectedCategories, selectedBrands, sort]);

  const toggleBrand = (brand: string) => setSelectedBrands((current) => toggle(current, brand));

  return (
    <>
      <ProductsHeader search={search} onSearchChange={setSearch} />
      <BrandStrip brands={BRANDS} selectedBrands={selectedBrands} onToggleBrand={toggleBrand} />

      <section className="bg-white pb-20 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
          <Toolbar
            resultCount={products.length}
            sort={sort}
            onSortChange={setSort}
            filtersOpen={filtersOpen}
            onToggleFilters={() => setFiltersOpen((current) => !current)}
          />

          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:gap-10">
            <AnimatePresence>
              {filtersOpen && (
                <>
                  <motion.div
                    key="backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setFiltersOpen(false)}
                    className="fixed inset-0 z-40 bg-black/40 lg:hidden"
                    aria-hidden="true"
                  />
                  <motion.div
                    key="filters"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
                    className="fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] overflow-y-auto bg-white p-6 shadow-xl lg:sticky lg:inset-y-auto lg:top-24 lg:z-auto lg:w-60 lg:max-w-none lg:max-h-[calc(100vh-7rem)] lg:shrink-0 lg:self-start lg:bg-transparent lg:p-0 lg:shadow-none"
                  >
                    <button
                      type="button"
                      onClick={() => setFiltersOpen(false)}
                      aria-label="Close filters"
                      className="mb-4 flex items-center gap-2 text-sm font-medium text-slate-500 lg:hidden"
                    >
                      <X className="h-4 w-4" aria-hidden="true" />
                      Close
                    </button>
                    <Filters
                      categories={CATEGORIES}
                      selectedCategories={selectedCategories}
                      onToggleCategory={(category) =>
                        setSelectedCategories((current) => toggle(current, category))
                      }
                      brands={BRAND_NAMES}
                      selectedBrands={selectedBrands}
                      onToggleBrand={toggleBrand}
                      onClear={() => {
                        setSelectedCategories([]);
                        setSelectedBrands([]);
                      }}
                    />
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            <div className="min-w-0 flex-1">
              <ProductGrid products={products} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
