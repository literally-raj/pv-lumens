import type { BlogPost } from "@/lib/data/blog";

interface BlogPostBodyProps {
  post: BlogPost;
}

export default function BlogPostBody({ post }: BlogPostBodyProps) {
  return (
    <section className="bg-white pb-20 sm:pb-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-5 text-base leading-relaxed text-slate-600">
          {post.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
