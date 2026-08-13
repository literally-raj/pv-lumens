import { ArrowRight, ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SOLUTIONS } from "@/lib/data/solutions";

export default function SolutionsGrid() {
  return (
    <section className="bg-white pb-20 sm:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SOLUTIONS.map(({ category, slug, icon: Icon, items, image }) => (
            <Link
              key={category}
              href={`/solutions/${slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              <div className="relative aspect-video overflow-hidden bg-slate-100">
                {image ? (
                  <Image
                    src={image}
                    alt={category}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  // ponytail: image placeholder — swap for real photography once provided
                  <div className="flex h-full items-center justify-center text-slate-300">
                    <ImageIcon className="h-8 w-8" aria-hidden="true" />
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col gap-4 p-6 sm:p-8">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand/15 text-brand-dark">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{category}</h3>
                  <p className="mt-1 text-sm text-slate-500">{items.length} solutions</p>
                </div>
                <span className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-brand-dark">
                  Click to know about the solutions
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
