import Link from "next/link";
import { BRANDS } from "@/lib/data/brands";

export default function BrandsGrid() {
  return (
    <section className="bg-white pb-20 sm:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {BRANDS.map(({ name, slug, logo }) => (
            <Link
              key={slug}
              href={`/brands/${slug}`}
              className="group flex h-32 flex-col items-center justify-center gap-3 rounded-2xl border border-slate-200 p-6 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 hover:shadow-sm group-hover:filter group-hover:grayscale-0 group-hover:contrast-200"
            >
              {/* ponytail: third-party logos of mixed formats (svg/jpg/webp) served from the legacy site — plain img avoids next/image's SVG allowlist config for one external domain */}
              <img
                src={logo}
                alt={name}
                loading="lazy"
                className="max-h-10 max-w-full object-contain  transition-[filter] "
              />
              <span className="text-center text-xs font-medium text-slate-500">{name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
