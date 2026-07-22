"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
};

// ponytail: Unsplash stock imagery — swap in real partner photography once provided
const PARTNER_TYPES = [
  {
    heading: "System Integrators",
    content:
      "Large-scale System Integrators and Master SIs who design, deploy and manage multi-vendor technology environments for enterprise and government.",
    image: "https://images.unsplash.com/photo-1680691257251-5fead813b73e?w=800&q=80",
  },
  {
    heading: "Sub Distributors",
    content:
      "Regional and city-level sub-distributors extending our reach into Tier 2 and Tier 3 markets across the country.",
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80",
  },
  {
    heading: "Solutions Providers",
    content:
      "Solution providers and large enterprise accounts building complete, integrated technology deployments for their end customers.",
    image: "https://images.unsplash.com/photo-1758518730037-a16581a040e8?w=800&q=80",
  },
  {
    heading: "Resellers",
    content:
      "Dealers and retail partners bringing our OEM portfolio to local and regional end customers across every market segment.",
    image: "https://images.unsplash.com/photo-1697545806136-92d30cb7081e?w=800&q=80",
  },
  {
    heading: "Industrial Partners",
    content:
      "Partners serving manufacturing, infrastructure and industrial facilities with rugged, mission-critical technology deployments.",
    image: "https://images.unsplash.com/photo-1741176508062-a79aa6b48bdc?w=800&q=80",
  },
  {
    heading: "Consultants / Specifiers",
    content:
      "Consultants, specifiers and project management firms who design and specify technology infrastructure for large-scale projects.",
    image: "https://images.unsplash.com/photo-1762146828422-50a8bd416d3c?w=800&q=80",
  },
];

export default function PartnerEcosystem() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: 1 | -1) => {
    scrollerRef.current?.scrollBy({ left: direction * 490, behavior: "smooth" });
  };

  return (
    <section className="bg-white py-16 sm:py-20">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={containerVariants}
        className="mx-auto flex max-w-370 items-end justify-between gap-6 px-4 sm:px-6 lg:px-8"
      >
        <div>
          <motion.span
            variants={itemVariants}
            className="inline-flex items-center rounded-full bg-slate-100 px-4 py-1 text-xs font-semibold tracking-wide text-slate-600"
          >
            OUR REACH
          </motion.span>

          <motion.h2
            variants={itemVariants}
            className="mt-5 text-3xl font-semibold leading-snug tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
          >
            Serving the Full Partner Ecosystem
          </motion.h2>

          <motion.p variants={itemVariants} className="mt-4 max-w-xl text-lg text-slate-500">
            From system integrators to regional distributors — we work
            alongside every layer of the channel to bring the right
            technology to market.
          </motion.p>
        </div>

        <motion.div variants={itemVariants} className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            aria-label="Scroll left"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            aria-label="Scroll right"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </motion.div>
      </motion.div>

      <div className="mx-auto mt-14 max-w-370 px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={scrollerRef}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {PARTNER_TYPES.map(({ heading, content, image }) => (
            <motion.div
              key={heading}
              variants={itemVariants}
              className="group w-116 shrink-0 snap-start overflow-hidden rounded-2xl border border-slate-200 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-4"
            >
              <div className="relative aspect-video overflow-hidden bg-slate-100">
                <Image
                  src={image}
                  alt={heading}
                  fill
                  sizes="(min-width: 1024px) 464px, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-slate-900 transition-colors group-hover:text-indigo-600">
                  {heading}
                </h3>
                <p className="mt-2 text-sm text-slate-500">{content}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
