"use client";

import { Quote } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
};

// ponytail: placeholder quotes & logos — swap in real partner testimonials once provided
const TESTIMONIALS = [
  {
    quote: "PV Lumens has been the backbone of our distribution strategy. From first enquiry to final delivery, their team is responsive, technically sharp, and always a step ahead of demand — exactly what we need from a national-scale partner.",
    title: "VP, Channel Sales",
    company: "National System Integrator",
    logo: "/clients/logoipsum-327.svg",
  },
  {
    quote: "Their pre-sales engineers know the products as well as the OEMs do. That technical depth, paired with fast turnarounds on quotes and financing, makes closing enterprise deals significantly faster for our team.",
    title: "Head of Networking Practice",
    company: "Regional Distributor",
    logo: "/clients/logoipsum-368.svg",
  },
  {
    quote: "Every one of our 18 branch touchpoints runs on the same SAP backbone, so order status is never a mystery. We always know exactly where a shipment stands, in real time, without chasing anyone down.",
    title: "Operations Director",
    company: "IT Infrastructure Reseller",
    logo: "/clients/logoipsum-389.svg",
  },
  {
    quote: "A genuine value-added distributor, not just a box mover. Their in-house marketing team runs roadshows and campaigns that generate real, qualified pipeline for us — support most distributors simply don't offer.",
    title: "Regional Sales Manager",
    company: "Cybersecurity Solutions Provider",
    logo: "/clients/logoipsum-393.svg",
  },
  {
    quote: "Scheme management and promotions are handled end-to-end by their team, down to the paperwork. That frees up our people to focus entirely on selling instead of chasing claims and reconciliations.",
    title: "Business Head",
    company: "Surveillance & Security Dealer",
    logo: "/clients/logoipsum-411.svg",
  },
  {
    quote: "Their promoters bring 35 years of distribution relationships to the table. That depth, combined with real financial strength, gives us confidence taking on even the largest data center projects.",
    title: "Principal Consultant",
    company: "Data Center Infrastructure Practice",
    logo: "/clients/logoipsum-434.svg",
  },
];

function TestimonialCard({ quote, title, company, logo }: (typeof TESTIMONIALS)[number]) {
  return (
    <div className="flex w-125 shrink-0 flex-col rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <Quote className="h-8 w-8 text-brand/30" aria-hidden="true" />

      <p className="mt-5 flex-1 text-base leading-relaxed text-slate-700">
        {quote}
      </p>

      <div className="mt-8 flex items-center justify-between gap-4 border-t border-slate-100 pt-6">
        <div>
          <p className="text-sm font-semibold text-navy">{title}</p>
          <p className="text-xs text-slate-500">{company}</p>
        </div>
        <Image
          src={logo}
          alt=""
          width={90}
          height={28}
          className="h-6 w-auto shrink-0 opacity-60 grayscale"
        />
      </div>
    </div>
  );
}

export default function TestimonialMarquee() {
  return (
    <section className="bg-surface py-16 sm:py-20">
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
          WHAT PARTNERS SAY
        </motion.span>

        <motion.h2
          variants={itemVariants}
          className="mt-5 text-3xl font-semibold leading-snug tracking-tight text-navy sm:text-4xl lg:text-5xl"
        >
          Trusted Across the Channel
        </motion.h2>
      </motion.div>

      <div className="relative mt-14 overflow-hidden mask-[linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
        <div className="flex w-max items-stretch gap-8 animate-marquee hover:[animation-play-state:paused]">
          {[...TESTIMONIALS, ...TESTIMONIALS].map((testimonial, index) => (
            <TestimonialCard key={`${testimonial.company}-${index}`} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
