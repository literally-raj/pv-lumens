import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Brand } from "@/lib/data/brands";
import { SOLUTIONS } from "@/lib/data/solutions";

interface BrandHeroProps {
  brand: Brand;
}

export default function BrandHero({ brand }: BrandHeroProps) {
  const categorySlug = SOLUTIONS.find((solution) => solution.category === brand.category)?.slug;

  return (
    <section className="bg-white pt-32 pb-12 sm:pt-40 sm:pb-16">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <Link
          href="/brands"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          All brands
        </Link>

        <div className="mx-auto mt-8 flex h-20 w-48 items-center justify-center">
          {/* ponytail: third-party logo from the legacy site — plain img, see BrandsGrid note */}
          <img src={brand.logo} alt={brand.name} className="max-h-full max-w-full object-contain" />
        </div>

        {categorySlug && (
          <Link
            href={`/solutions/${categorySlug}`}
            className="mt-6 inline-flex items-center rounded-full bg-slate-100 px-4 py-1 text-xs font-semibold tracking-wide text-slate-600 hover:bg-slate-200"
          >
            {brand.category}
          </Link>
        )}

        <h1 className="mt-5 text-3xl font-semibold leading-snug tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
          {brand.name}
        </h1>
        <p className="mt-5 text-lg text-slate-500">{brand.blurb}</p>

        <a
          href={brand.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-500"
        >
          Visit brand page
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
