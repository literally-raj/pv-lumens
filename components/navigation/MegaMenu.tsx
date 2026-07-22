"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight, type LucideIcon } from "lucide-react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
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
      className="absolute left-1/2 top-full z-40 w-full max-w-3xl -translate-x-1/2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg"
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
            className="px-8 py-8"
          >
            <button
              type="button"
              onClick={() => setActiveIndex(null)}
              className="inline-flex items-center gap-1 rounded-sm text-sm font-medium text-slate-500 transition-colors hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              Back
            </button>

            <div className="mt-4 flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-indigo-600">
                <activeCategory.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="text-base font-semibold text-slate-900">{activeCategory.title}</h3>
            </div>

            <ul className="mt-5 grid grid-cols-2 gap-x-8 gap-y-2">
              {activeCategory.subItems.map(({ name, url }) => (
                <li key={name}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 rounded-sm py-1 text-sm text-slate-600 transition-colors hover:text-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                  >
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
              className="mt-6 inline-flex items-center gap-1 rounded-sm text-sm font-semibold text-slate-900 transition-colors hover:text-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2"
            >
              View full category
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
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
            className="grid grid-cols-3 gap-8 px-8 py-8"
          >
            {items.map(({ icon: Icon, title, description }, index) => (
              <button
                key={title}
                type="button"
                onClick={() => setActiveIndex(index)}
                className="group rounded-lg text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-lg border border-slate-200 text-indigo-600">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">
                  <span className="font-semibold text-slate-900">{title}</span>{" "}
                  {description}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-indigo-600">
                  Explore solutions
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="border-t border-slate-100 px-8 py-4">
        <Link
          href={viewAllHref}
          className="inline-flex items-center gap-1 text-sm font-semibold text-slate-900 transition-colors hover:text-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2"
        >
          {viewAllLabel}
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </motion.div>
  );
}
