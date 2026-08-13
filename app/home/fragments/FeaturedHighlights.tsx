"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// ---------------------------------------------------------------------------
// Data — swap in real content / real imagery once available
// ---------------------------------------------------------------------------
interface HighlightCard {
  /** Visual block type */
  type: "image" | "branded";
  /** Background image URL (for "image" type) */
  image?: string;
  /** Gradient classes for branded card */
  gradient?: string;
  /** Large heading shown over the visual block */
  heading?: string;
  /** Subtext grouped directly under the heading (branded cards) */
  eyebrow?: string;
  /** Bottom-pinned caption (image cards with a top heading) */
  caption?: { label?: string; text: string };
  /** Renders the TIME / Statista style recognition badge */
  awardBadge?: boolean;
  /** Title below the visual block */
  title: string;
  /** Short description / tagline below the title */
  tagline: string;
  /** Link destination */
  href: string;
}

const HIGHLIGHTS: HighlightCard[] = [
  {
    type: "branded",
    gradient: "from-emerald-900 via-emerald-800 to-emerald-700",
    heading: "Advancing\nEnergy Tech",
    eyebrow: "Half Year 2026 Results",
    title: "2026 Half Year Results",
    tagline: "The report is available",
    href: "/resources",
  },
  {
    type: "image",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    heading: "Ranked #1",
    awardBadge: true,
    title:
      "Named World's Most Sustainable Company 2026 by TIME Magazine and Statista",
    tagline: "Learn more on this milestone",
    href: "/about",
  },
  {
    type: "image",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
    title: "McLaren Racing: Where data meets drive",
    tagline: "Turning raw data into competitive advantage and unleashed performance",
    href: "/solutions",
  },
  {
    type: "image",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    heading: "Bloomberg New Economy Energy Technology Coalition",
    caption: { label: "Case study:", text: "Decisions that pay dividends" },
    title: "A Blueprint for Energy-Efficient Buildings",
    tagline: "Overcoming barriers to cut energy costs 5x",
    href: "/resources",
  },
];

// ---------------------------------------------------------------------------
// Animation
// ---------------------------------------------------------------------------
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT_EXPO } },
};

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------
function AwardBadge() {
  return (
    <div className="absolute right-3 top-1/3 w-24 overflow-hidden rounded-md bg-white shadow-lg">
      <div className="bg-red-600 py-1 text-center text-[11px] font-bold italic text-white">
        TIME
      </div>
      <div className="px-2 py-1.5">
        <p className="text-center text-[8.5px] font-bold uppercase leading-tight text-slate-900">
          World&apos;s Most
          <br />
          Sustainable
          <br />
          Companies
        </p>
        <div className="mt-1.5 flex items-center justify-center gap-1 border-t border-slate-200 pt-1">
          <span className="text-[8px] font-semibold text-slate-600">statista</span>
          <span className="text-[9px] font-bold text-red-600">2026</span>
        </div>
      </div>
    </div>
  );
}

function VisualBlock({ card }: { card: HighlightCard }) {
  if (card.type === "branded") {
    return (
      <div
        className={`relative flex aspect-[4/3.6] w-full flex-col justify-center overflow-hidden rounded-2xl bg-gradient-to-br ${card.gradient} p-6`}
      >
        {/* Diagonal technical line pattern */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "repeating-linear-gradient(115deg, transparent 0px, transparent 34px, rgba(255,255,255,0.16) 35px, rgba(255,255,255,0.16) 36px)",
          }}
        />
        {/* Soft light beam */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.16) 50%, transparent 60%)",
          }}
        />
        <p className="relative whitespace-pre-line text-2xl font-bold leading-tight text-white sm:text-3xl">
          {card.heading}
        </p>
        {card.eyebrow && (
          <p className="relative mt-2 text-sm font-medium text-white/80">
            {card.eyebrow}
          </p>
        )}
      </div>
    );
  }

  const hasOverlayContent = Boolean(card.heading || card.caption);

  return (
    <div className="relative aspect-[4/3.6] w-full overflow-hidden rounded-2xl">
      <Image
        src={card.image!}
        alt={card.title}
        fill
        sizes="(min-width: 1024px) 25vw, 100vw"
        className="object-cover"
      />
      {hasOverlayContent && (
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/5 to-black/50"
        />
      )}
      {hasOverlayContent && (
        <div className="absolute inset-0 flex flex-col justify-between p-6">
          {card.heading && (
            <p className="whitespace-pre-line text-2xl font-bold leading-tight text-white sm:text-3xl">
              {card.heading}
            </p>
          )}
          {card.caption && (
            <p className="text-sm text-white">
              {card.caption.label && (
                <span className="font-semibold">{card.caption.label} </span>
              )}
              <span className="text-white/90">{card.caption.text}</span>
            </p>
          )}
        </div>
      )}
      {card.awardBadge && <AwardBadge />}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Section
// ---------------------------------------------------------------------------
export default function FeaturedHighlights() {
  return (
    <section
      aria-labelledby="featured-highlights-heading"
      className="bg-white py-10"
    >
      <div className="mx-auto max-w-[96rem] px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-brand">
          Featured Highlights
        </p>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={containerVariants}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {HIGHLIGHTS.map((card) => (
            <motion.div key={card.title} variants={itemVariants}>
              <Link
                href={card.href}
                className="group flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                aria-label={card.title}
              >
                {/* Visual block */}
                <VisualBlock card={card} />

                {/* Text block below the visual */}
                <div className="mt-4 flex flex-col gap-1">
                  <h3 className="text-base font-bold leading-snug text-navy transition-colors group-hover:text-brand">
                    {card.title}
                  </h3>
                  <div className="flex items-center gap-1">
                    <p className="text-sm text-slate-500">{card.tagline}</p>
                    <ArrowUpRight
                      className="h-3 w-3 shrink-0 text-brand opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
