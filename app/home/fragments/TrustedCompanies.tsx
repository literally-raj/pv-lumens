"use client";

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

// ponytail: Logoipsum stock placeholders, swap for real client logos when available
const PARTNER_LOGOS = [
  "/clients/logoipsum-327.svg",
  "/clients/logoipsum-368.svg",
  "/clients/logoipsum-389.svg",
  "/clients/logoipsum-393.svg",
  "/clients/logoipsum-411.svg",
  "/clients/logoipsum-434.svg",
  "/clients/logoipsum-435.svg",
];

export default function TrustedCompanies() {
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
          TRUSTED BY
        </motion.span>

        <motion.h2
          variants={itemVariants}
          className="mt-5 text-3xl font-semibold leading-snug tracking-tight text-navy sm:text-4xl lg:text-5xl"
        >
          Companies We&apos;ve Worked With
        </motion.h2>

        <motion.p variants={itemVariants} className="mt-5 text-lg text-slate-500">
          From system integrators to Fortune 500 enterprises, our partner
          network spans every corner of the channel.
        </motion.p>
      </motion.div>

      <div className="relative mt-16 overflow-hidden mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max items-center gap-20 animate-marquee hover:[animation-play-state:paused]">
          {[...PARTNER_LOGOS, ...PARTNER_LOGOS].map((src, index) => (
            <Image
              key={`${src}-${index}`}
              src={src}
              alt=""
              width={160}
              height={56}
              className="h-8 w-auto shrink-0 opacity-50 grayscale transition-opacity hover:opacity-90 sm:h-10"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
