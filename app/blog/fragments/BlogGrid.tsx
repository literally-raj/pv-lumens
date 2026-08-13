import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/data/blog";

export default function BlogGrid() {
  return (
    <section className="bg-white pb-20 sm:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map(({ slug, title, excerpt, image }) => (
            <Link
              key={slug}
              href={`/blog/${slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              <div className="relative aspect-video overflow-hidden bg-slate-100">
                <Image
                  src={image}
                  alt={title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6 sm:p-8">
                <h2 className="text-lg font-semibold text-navy transition-colors group-hover:text-brand-dark">
                  {title}
                </h2>
                <p className="text-sm text-slate-500">{excerpt}</p>
                <span className="mt-auto inline-flex items-center gap-2 pt-2 text-sm font-semibold text-brand-dark">
                  Read Now
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
