import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/data/blog";

interface BlogPostHeroProps {
  post: BlogPost;
}

export default function BlogPostHero({ post }: BlogPostHeroProps) {
  return (
    <section className="bg-white pt-32 pb-12 sm:pt-40 sm:pb-16">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          All posts
        </Link>

        <span className="mx-auto mt-6 inline-flex items-center rounded-full bg-slate-100 px-4 py-1 text-xs font-semibold tracking-wide text-slate-600">
          {post.category}
        </span>

        <h1 className="mt-5 text-3xl font-semibold leading-snug tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
          {post.title}
        </h1>
      </div>

      <div className="mx-auto mt-10 max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative aspect-video overflow-hidden rounded-2xl bg-slate-100">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
