import ItemsGrid from "@/components/cards/ItemsGrid";
import { SOLUTIONS, type SolutionItem } from "@/lib/data/solutions";

const ALL_ITEMS = SOLUTIONS.flatMap(({ items }) => items);

// ponytail: no per-brand solution mapping in the scraped data yet — preview a random
// sample of real solutions until brand-specific items are provided.
function pickRandomItems(items: SolutionItem[], count: number) {
  return [...items].sort(() => Math.random() - 0.5).slice(0, count);
}

export default function BrandSolutions() {
  const randomSolutions = pickRandomItems(ALL_ITEMS, 6);

  return (
    <>
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          Solutions Featuring This Brand
        </h2>
      </div>
      <div className="mt-10">
        <ItemsGrid items={randomSolutions} />
      </div>
    </>
  );
}
