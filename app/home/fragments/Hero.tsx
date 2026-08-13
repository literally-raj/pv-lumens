"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 60 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT_EXPO } },
};

// ponytail: Logoipsum stock placeholders, swap for real client logos when available
const PARTNER_LOGOS = [
  "/clients/logoipsum-327.svg",
  "/clients/logoipsum-393.svg",
  "/clients/logoipsum-389.svg",
  "/clients/logoipsum-411.svg",
  "/clients/logoipsum-435.svg",
];

interface HeroProps {
  showLogoStrip?: boolean;
}

export default function Hero({ showLogoStrip = true }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative flex h-[95vh] items-center overflow-hidden bg-navy pt-28 md:pt-36"
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>
      {/* Schneider-style legibility gradient — darker on the content side */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/75 to-navy/30" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy/80 to-transparent" />

      <div className="relative mx-auto w-full max-w-375 px-8 text-center sm:px-6 lg:pl-4 lg:pr-8">
        <motion.div
          initial="hidden"
          animate="show"
          variants={containerVariants}
          className="mx-auto flex max-w-3xl -translate-y-2.5 flex-col items-center"
        >
          <motion.span
            variants={itemVariants}
            className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[-0.01em] text-brand"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true" />
            India&apos;s Value-Added Distributor
          </motion.span>

          <motion.h1
            variants={itemVariants}
            className="mt-6 text-4xl font-semibold leading-tight tracking-[-0.04em] text-white sm:text-5xl lg:text-[3.75rem] lg:leading-[1.08]"
          >
            India&apos;s Leading Value-Added Technology Distributor
          </motion.h1>

          <motion.p variants={itemVariants} className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/75">
            Delivering cybersecurity, networking, cloud, data center, and
            enterprise infrastructure solutions through trusted global
            technology partners.
          </motion.p>

          <motion.div variants={itemVariants} className="mt-10 flex flex-wrap items-center justify-center gap-6">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-white px-8 py-4 text-sm font-semibold text-navy transition-colors hover:bg-brand hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
            >
              Enquire Now
            </Link>
            <Link
              href="/solutions"
              className="group inline-flex items-center gap-2 rounded-sm text-sm font-semibold text-white transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
            >
              Explore Solutions
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </motion.div>

          {showLogoStrip && (
            <div className="mx-auto mt-8 max-w-xl text-center">
              <p className="text-sm font-medium text-white/60">
                Companies we&apos;ve worked with
              </p>
              <div className="relative mx-auto mt-6 overflow-hidden mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                <div className="flex w-max items-center justify-center gap-12 animate-marquee">
                  {[...PARTNER_LOGOS, ...PARTNER_LOGOS].map((src, index) => (
                    <Image
                      key={`${src}-${index}`}
                      src={src}
                      alt=""
                      width={40}
                      height={40}
                      className="h-6 w-auto shrink-0 brightness-0 invert opacity-40"
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
