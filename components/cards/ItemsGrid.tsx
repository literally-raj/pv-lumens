import { ArrowUpRight, ImageIcon } from "lucide-react";
import Image from "next/image";

export interface ItemLink {
  name: string;
  url: string;
  image?: string;
}

interface ItemsGridProps {
  items: ItemLink[];
}

export default function ItemsGrid({ items }: ItemsGridProps) {
  return (
    <section className="bg-white pb-20 sm:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ name, url, image }) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2"
            >
              <div className="relative aspect-video overflow-hidden bg-slate-100">
                {image ? (
                  <Image
                    src={image}
                    alt={name}
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
              <div className="flex flex-1 items-center justify-between gap-4 p-6">
                <h3 className="text-base font-semibold text-slate-900">{name}</h3>
                <ArrowUpRight
                  className="h-4 w-4 shrink-0 text-indigo-600 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
