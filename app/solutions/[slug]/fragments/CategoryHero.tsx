import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { SolutionCategory } from "@/lib/data/solutions";

interface CategoryHeroProps {
  category: SolutionCategory;
}

export default function CategoryHero({ category }: CategoryHeroProps) {
  return (
    <section className="bg-white pt-32 pb-12 sm:pt-40 sm:pb-16">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <Link
          href="/solutions"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          All solutions
        </Link>
        <h1 className="mt-5 text-3xl font-semibold leading-snug tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
          {category.category}
        </h1>
        <p className="mt-5 text-lg text-slate-500">
          {category.items.length} solutions available in this category.
        </p>
      </div>
    </section>
  );
}
