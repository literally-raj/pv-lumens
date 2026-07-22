import type { Brand } from "@/lib/data/brands";

interface BrandStripProps {
  brands: Brand[];
  selectedBrands: string[];
  onToggleBrand: (brand: string) => void;
}

export default function BrandStrip({ brands, selectedBrands, onToggleBrand }: BrandStripProps) {
  return (
    <div className="border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold tracking-wide text-slate-500">AVAILABLE BRANDS</p>
        <div className="mt-3 flex gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {brands.map(({ name, logo }) => {
            const active = selectedBrands.includes(name);
            return (
              <button
                key={name}
                type="button"
                onClick={() => onToggleBrand(name)}
                aria-pressed={active}
                className={`flex shrink-0 items-center gap-2 rounded-full border px-5 py-1.5 text-xs font-medium transition-colors ${
                  active
                    ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                {/* ponytail: third-party logos, plain img — see BrandsGrid note */}
                <img src={logo} alt="" className="h-auto w-15  object-contain" />
              
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
