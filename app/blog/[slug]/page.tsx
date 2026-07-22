import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/lib/data/blog";
import BlogPostBody from "./fragments/BlogPostBody";
import BlogPostHero from "./fragments/BlogPostHero";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return BLOG_POSTS.map(({ slug }) => ({ slug }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((entry) => entry.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <BlogPostHero post={post} />
      <BlogPostBody post={post} />
    </>
  );
}
