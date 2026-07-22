"use client";

import {
  Award,
  Cpu,
  Globe,
  Layers,
  UserCheck,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
};

const WHY_CHOOSE_ITEMS = [
  {
    icon: Globe,
    title: "Pan-India & South Asia Reach.",
    description:
      "18 branch offices across 300+ cities. Billing from Singapore for SAARC markets (USD) — a true national and regional footprint.",
  },
  {
    icon: Layers,
    title: "Value Added Distribution.",
    description:
      "Dedicated BDM team, technical pre-sales & post-sales support, plus a strong in-house marketing function — Events, Roadshows, EDMs & Social.",
  },
  {
    icon: Cpu,
    title: "Technology-Driven Operations.",
    description:
      "All 18 locations live on SAP 24x7. A robust CRM tracks every lead from generation to order closure with real-time reporting & analytics.",
  },
  {
    icon: Users,
    title: "Rich Partner Ecosystem.",
    description:
      "Preferred distributor for 2,500+ resellers & SIs. Channel-friendly policies, deep relationships, and end-to-end management of schemes & promotions.",
  },
  {
    icon: Award,
    title: "25+ Global Brand Partnerships.",
    description:
      "Authorised distributor for world-class OEMs across LAN, Surveillance, Fire Safety, AIDC, and Test & Measurement — exclusive access and backend support.",
  },
  {
    icon: UserCheck,
    title: "Rich Promoter Experience.",
    description:
      "Led by promoters with 35+ years in distribution. Deep OEM relationships, financial strength, and robust operational infrastructure.",
  },
];

export default function WhyChooseUs() {
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
          WHY CHOOSE PV LUMENS
        </motion.span>

        <motion.h2
          variants={itemVariants}
          className="mt-5 text-3xl font-semibold leading-snug tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
        >
          Built for Scale, Trusted for Delivery
        </motion.h2>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="mx-auto mt-14 grid max-w-370 grid-cols-1 gap-x-6 gap-y-6 px-4 sm:px-6 sm:grid-cols-2 lg:grid-cols-3 lg:px-8"
      >
        {WHY_CHOOSE_ITEMS.map(({ icon: Icon, title, description }) => (
          <motion.div
            key={title}
            variants={itemVariants}
            className="rounded-2xl border-2 border-slate-250 hover:bg-slate-100 transition-all hover:shadow-md hover:cursor-pointer   p-6"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-lg border border-slate-200 text-indigo-600">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <h3 className="mt-5 text-base font-semibold text-slate-900">{title}</h3>
            <p className="mt-2 text-base leading-relaxed text-slate-600">
              {description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
