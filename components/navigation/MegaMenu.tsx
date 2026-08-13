"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight, type LucideIcon } from "lucide-react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const slideVariants: Variants = {
  enter: (direction: number) => ({ opacity: 0, x: direction * 24 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.25, ease: EASE_OUT_EXPO } },
  exit: (direction: number) => ({
    opacity: 0,
    x: -direction * 24,
    transition: { duration: 0.2, ease: EASE_OUT_EXPO },
  }),
};

export type MegaMenuItem = {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  subItems: { name: string; url: string }[];
};

interface MegaMenuProps {
  items: MegaMenuItem[];
  viewAllLabel: string;
  viewAllHref: string;
  direction: number;
}

export default function MegaMenu({ items, viewAllLabel, viewAllHref, direction }: MegaMenuProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeCategory = activeIndex !== null ? items[activeIndex] : null;

  return (
    <motion.div
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      className="absolute left-1/2 top-full z-40 w-full max-w-5xl -translate-x-1/2 overflow-hidden rounded-b-2xl bg-white shadow-2xl shadow-navy/10 ring-1 ring-slate-200"
    >
      <AnimatePresence mode="wait">
        {activeCategory ? (
          <motion.div
            key="detail"
            custom={1}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="px-10 py-10"
          >
            <button
              type="button"
              onClick={() => setActiveIndex(null)}
              className="inline-flex items-center gap-1 rounded-sm text-sm font-medium text-slate-500 transition-colors hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              Back to all solutions
            </button>

            <div className="mt-5 flex items-center gap-4 border-b border-slate-100 pb-6">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand/15 text-brand-dark">
                <activeCategory.icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-xl font-semibold text-navy">{activeCategory.title.replace(/\.$/, "")}</h3>
                <p className="text-sm text-slate-500">
                  {activeCategory.subItems.length} product families available
                </p>
              </div>
            </div>

            <ul className="mt-6 grid grid-cols-2 gap-x-10 gap-y-2.5">
              {activeCategory.subItems.map(({ name, url }) => (
                <li key={name}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 rounded-sm py-1.5 text-sm text-slate-600 transition-colors hover:text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                  >
                    <span className="h-1 w-1 rounded-full bg-slate-300 transition-colors group-hover:bg-brand" />
                    {name}
                    <ArrowUpRight
                      className="h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>

            <Link
              href={activeCategory.href}
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-navy px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              Explore {activeCategory.title.replace(/\.$/, "")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            custom={-1}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="grid grid-cols-[1fr_1fr_1fr_1.1fr] gap-0"
          >
            <div className="col-span-3 grid grid-cols-3 gap-x-8 gap-y-2 px-10 py-10">
              <div className="col-span-3 mb-2">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-dark">
                  Solutions
                </p>
              </div>
              {items.map(({ icon: Icon, title, description }, index) => (
                <button
                  key={title}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className="group rounded-xl p-4 text-left transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand/15 text-brand-dark transition-colors group-hover:bg-brand group-hover:text-navy">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <p className="mt-3.5 text-sm font-semibold text-navy">
                    {title.replace(/\.$/, "")}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500">{description}</p>
                  <span className="mt-2.5 inline-flex items-center gap-1 text-xs font-semibold text-brand-dark opacity-0 transition-opacity group-hover:opacity-100">
                    Explore
                    <ArrowRight className="h-3 w-3" aria-hidden="true" />
                  </span>
                </button>
              ))}
            </div>

            {/* Featured panel */}
            <div className="relative flex flex-col justify-end overflow-hidden bg-navy p-8 text-white">
              <Image
                src="/bg.jpg"
                alt=""
                fill
                sizes="280px"
                className="object-cover opacity-40"
              />
              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
                  Partner with us
                </p>
                <h4 className="mt-3 text-xl font-semibold leading-snug">
                  30+ global technology brands, one trusted distributor.
                </h4>
                <Link
                  href="/brands"
                  className="mt-5 inline-flex items-center gap-2 rounded-md bg-brand px-5 py-2.5 text-sm font-semibold text-navy transition-all hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
                >
                  Browse brands
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="border-t border-slate-100 px-10 py-4">
        <Link
          href={viewAllHref}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy transition-colors hover:text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
        >
          {viewAllLabel}
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </motion.div>
  );
}
