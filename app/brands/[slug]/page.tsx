import { notFound } from "next/navigation";
import { BRANDS } from "@/lib/data/brands";
import BrandHero from "./fragments/BrandHero";
import BrandSolutions from "./fragments/BrandSolutions";

interface BrandPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return BRANDS.map(({ slug }) => ({ slug }));
}

export default async function BrandPage({ params }: BrandPageProps) {
  const { slug } = await params;
  const brand = BRANDS.find((entry) => entry.slug === slug);

  if (!brand) {
    notFound();
  }

  return (
    <>
      <BrandHero brand={brand} />
      <BrandSolutions />
    </>
  );
}
