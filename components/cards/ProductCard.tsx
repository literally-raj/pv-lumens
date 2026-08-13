import { Download, ImageIcon } from "lucide-react";
import Image from "next/image";
import type { Product } from "@/lib/data/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-200">
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          // ponytail: image placeholder — swap for real product photography once provided
          <div className="flex h-full items-center justify-center text-slate-300">
            <ImageIcon className="h-8 w-8" aria-hidden="true" />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-5">
        <span className="text-xs font-medium text-slate-500">{product.brand}</span>
        <h3 className="text-base font-semibold text-slate-900">{product.name}</h3>
        {/* ponytail: dummy PDF — swap href for the real brochure asset once provided */}
        <a
          href="/dummy-brochure.pdf"
          download
          className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-brand-dark hover:text-brand"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          Download Brochure
        </a>
      </div>
    </div>
  );
}
