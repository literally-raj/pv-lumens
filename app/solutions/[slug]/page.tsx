import { notFound } from "next/navigation";
import ItemsGrid from "@/components/cards/ItemsGrid";
import { SOLUTIONS } from "@/lib/data/solutions";
import CategoryHero from "./fragments/CategoryHero";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return SOLUTIONS.map(({ slug }) => ({ slug }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = SOLUTIONS.find((solution) => solution.slug === slug);

  if (!category) {
    notFound();
  }

  return (
    <>
      <CategoryHero category={category} />
      <ItemsGrid items={category.items} />
    </>
  );
}
