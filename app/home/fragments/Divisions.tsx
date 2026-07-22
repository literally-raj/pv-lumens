"use client";

import { ArrowRight, Check, Expand, Gauge, ShieldCheck, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import BottomSheet from "@/components/ui/BottomSheet";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
};

// ponytail: Unsplash stock imagery — swap in real division photography once provided
const DIVISION_CARDS = [
  {
    title: "Network Infrastructure",
    solutionsSlug: "network-infrastructure",
    subheading: "Structured cabling, switching, wireless & data centre connectivity.",
    detail:
      "End-to-end structured cabling, enterprise switching and wireless infrastructure, engineered for always-on connectivity across every floor, campus and data centre.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    images: {
      small1: "https://images.unsplash.com/photo-1680691257251-5fead813b73e?w=800&q=80",
      small2: "https://images.unsplash.com/photo-1516044734145-07ca8eef8731?w=800&q=80",
    },
    colSpan: "lg:col-span-2",
    minHeight: "min-h-105",
    checklist: [
      "Structured cabling & fibre backbone",
      "Enterprise & industrial-grade switching",
      "Enterprise Wi-Fi & wireless mesh",
      "Data centre racks & connectivity",
    ],
    features: [
      { icon: TrendingUp, description: "Built to scale across campuses and branch offices." },
      { icon: Gauge, description: "Low-latency backbone for mission-critical traffic." },
      { icon: ShieldCheck, description: "Certified installation with lifetime support." },
    ],
  },
  {
    title: "Safety & Security",
    solutionsSlug: "safety-and-security",
    subheading: "Surveillance, access control, fire detection & integrated systems.",
    detail:
      "Integrated surveillance, access control and fire detection systems that keep people, assets and facilities protected around the clock.",
    image: "https://images.unsplash.com/photo-1549109926-58f039549485?w=800&q=80",
    images: {
      small1: "https://images.unsplash.com/photo-1585367437379-e0b71bb18156?w=800&q=80",
      small2: "https://images.unsplash.com/photo-1743698205310-cd814a95afab?w=800&q=80",
    },
    colSpan: "lg:col-span-1",
    minHeight: "min-h-105",
    checklist: [
      "IP & analog surveillance (CCTV)",
      "Access control & biometric entry",
      "Fire detection & alarm systems",
      "Centralised monitoring & integration",
    ],
    features: [
      { icon: ShieldCheck, description: "Round-the-clock protection across every site." },
      { icon: Gauge, description: "Real-time alerts and centralised monitoring." },
      { icon: TrendingUp, description: "Scales from single sites to nationwide deployments." },
    ],
  },
  {
    title: "Productivity Solutions",
    solutionsSlug: "productivity-solutions",
    subheading: "Enterprise mobility, barcode, RFID & workplace automation.",
    detail:
      "Enterprise mobility, barcode and RFID technology that streamlines workflows and automates data capture across the shop floor and warehouse.",
    image: "https://images.unsplash.com/photo-1758543102397-e14b5dfdd8bd?w=800&q=80",
    images: {
      small1: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80",
      small2: "https://images.unsplash.com/photo-1586528116022-aeda1613c63d?w=800&q=80",
    },
    colSpan: "lg:col-span-1",
    minHeight: "min-h-90",
    checklist: [
      "Rugged barcode & QR scanning",
      "RFID tagging & tracking",
      "Enterprise mobile computers",
      "Workplace automation software",
    ],
    features: [
      { icon: Gauge, description: "Faster, more accurate data capture on the floor." },
      { icon: TrendingUp, description: "Improves throughput across warehouse operations." },
      { icon: ShieldCheck, description: "Rugged devices built for industrial environments." },
    ],
  },
  {
    title: "Drones / UAS",
    solutionsSlug: "uav-unmanned-aerial-vehicle",
    subheading: "Commercial UAV solutions for surveying & industrial inspection.",
    detail:
      "Commercial-grade UAV platforms built for surveying, mapping and industrial inspection — cutting inspection time and reaching sites that are hard to access.",
    image: "https://images.unsplash.com/photo-1753781467329-416d05e7e477?w=800&q=80",
    images: {
      small1: "https://images.unsplash.com/photo-1657093114835-031e7cf9520c?w=800&q=80",
      small2: "https://images.unsplash.com/photo-1499260126922-fbb24624a4e8?w=800&q=80",
    },
    colSpan: "lg:col-span-1",
    minHeight: "min-h-90",
    checklist: [
      "Aerial surveying & mapping",
      "Industrial & infrastructure inspection",
      "Thermal & multispectral imaging",
      "Flight planning & data analytics software",
    ],
    features: [
      { icon: Gauge, description: "Cuts inspection time from days to hours." },
      { icon: ShieldCheck, description: "Reaches sites that are hard or unsafe to access." },
      { icon: TrendingUp, description: "Analytics-ready data for faster decisions." },
    ],
  },
  {
    title: "Test & Measurement",
    solutionsSlug: "testing-and-measurement",
    subheading: "Precision instruments for installation, commissioning & diagnostics.",
    detail:
      "Precision test and measurement instruments for installation, commissioning and ongoing diagnostics — built for accuracy in the field and the lab.",
    image: "https://images.unsplash.com/photo-1758101755915-462eddc23f57?w=800&q=80",
    images: {
      small1: "https://images.unsplash.com/photo-1650530415027-dc9199f473ec?w=800&q=80",
      small2: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
    },
    colSpan: "lg:col-span-1",
    minHeight: "min-h-90",
    checklist: [
      "Cable & network certification",
      "Power quality & electrical testing",
      "RF & signal analysis",
      "Calibration & commissioning support",
    ],
    features: [
      { icon: ShieldCheck, description: "Accuracy you can rely on, on-site and in the lab." },
      { icon: Gauge, description: "Faster commissioning and fault diagnosis." },
      { icon: TrendingUp, description: "Instruments backed by certified calibration." },
    ],
  },
];

export default function Divisions() {
  const [activeCard, setActiveCard] = useState<(typeof DIVISION_CARDS)[number] | null>(null);

  return (
    <section className="bg-white py-16 sm:py-20">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={containerVariants}
        className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8"
      >
        <motion.span
          variants={itemVariants}
          className="inline-flex items-center rounded-full bg-slate-100 px-4 py-1 text-xs font-semibold tracking-wide text-slate-600"
        >
          OUR DIVISION
        </motion.span>

        <motion.h2
          variants={itemVariants}
          className="mt-5 text-3xl font-semibold leading-snug tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
        >
          {/* ponytail: placeholder heading, swap for final copy */}
          One Distributor, Every Layer of Enterprise Technology
        </motion.h2>

        <motion.p variants={itemVariants} className="mt-5 text-lg text-slate-500">
          From cybersecurity to cloud, networking to data center — our
          specialized divisions bring the right technology partners to every
          part of your infrastructure.
        </motion.p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="mx-auto mt-12 grid max-w-370 grid-cols-1 gap-6 px-4 sm:px-6 lg:grid-cols-3 lg:px-8"
      >
        {DIVISION_CARDS.map((card) => (
          <motion.button
            key={card.title}
            type="button"
            variants={itemVariants}
            onClick={() => setActiveCard(card)}
            className={`group relative flex cursor-pointer flex-col overflow-hidden rounded-3xl bg-slate-100 text-left transition-colors hover:bg-slate-200/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 ${card.colSpan} ${card.minHeight}`}
          >
            <div className="flex h-full flex-col p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500">{card.subheading}</p>
                </div>
                <span
                  aria-hidden="true"
                  className="shrink-0 rounded-lg bg-indigo-100 p-2 text-indigo-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white"
                >
                  <Expand className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
                </span>
              </div>

              <div className="relative mt-4 flex-1 overflow-hidden rounded-2xl">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </motion.button>
        ))}
      </motion.div>

      <BottomSheet open={activeCard !== null} onClose={() => setActiveCard(null)}>
        {activeCard && (
          <div className="mx-auto max-w-5xl pt-2">
            <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
              <div>
                <h3 className="text-4xl font-semibold leading-snug tracking-tight text-slate-900 sm:text-4xl">
                  {activeCard.title}
                </h3>
                <p className="mt-4 max-w-xl text-base text-slate-500">
                  {activeCard.detail}
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    href={`/solutions/${activeCard.solutionsSlug}`}
                    className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2"
                  >
                    Explore Division
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link
                    href="/products"
                    className="inline-flex items-center rounded-md border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2"
                  >
                    See details
                  </Link>
                </div>
              </div>

              <ul className="space-y-4">
                {activeCard.checklist.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-sm text-slate-700"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 rounded-full bg-orange-100 p-0.5 text-orange-500"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 grid gap-4 lg:grid-cols-[1.3fr_1fr]">
              <div className="relative min-h-90 overflow-hidden rounded-2xl bg-slate-100">
                <Image
                  src={activeCard.image}
                  alt={activeCard.title}
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="grid gap-4">
                <div className="relative min-h-42 overflow-hidden rounded-2xl bg-slate-100">
                  <Image
                    src={activeCard.images.small1}
                    alt={`${activeCard.title} detail`}
                    fill
                    sizes="(min-width: 1024px) 30vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative min-h-42 overflow-hidden rounded-2xl bg-slate-100">
                  <Image
                    src={activeCard.images.small2}
                    alt={`${activeCard.title} detail`}
                    fill
                    sizes="(min-width: 1024px) 30vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="mt-12 grid gap-8 border-t border-slate-200 pt-10 sm:grid-cols-3">
              {activeCard.features.map(({ icon: Icon, description }, index) => (
                <div key={index}>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <p className="mt-4 text-sm text-slate-600">{description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </BottomSheet>
    </section>
  );
}
