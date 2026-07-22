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
    <section id="hero" className="relative flex min-h-[95vh] items-center overflow-hidden bg-black lg:min-h-screen">
      <Image
        src="/bg.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/1" />
      <div className="relative mx-auto w-full max-w-7xl px-8 sm:px-6 lg:pl-4 lg:pr-8">
        <motion.div
          initial="hidden"
          animate="show"
          variants={containerVariants}
          className="max-w-4xl overflow-hidden lg:-ml-22.5"
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl font-semibold leading-tight tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl"
          >
            India&apos;s Leading Value-Added Technology Distributor
          </motion.h1>
          <motion.p variants={itemVariants} className="mt-6 text-md md:text-lg max-w-xl text-white/70">
            Delivering cybersecurity, networking, cloud, data center, and
            enterprise infrastructure solutions through trusted global
            technology partners.
          </motion.p>
          <motion.div variants={itemVariants} className="mt-10 flex flex-wrap items-center gap-6">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-white px-8 py-4 text-sm font-semibold text-black transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Enquire Now
            </Link>
            <Link
              href="/solutions"
              className="group inline-flex items-center gap-2 rounded-sm text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Exoplore Solutions
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </motion.div>

          {showLogoStrip && (
            <div className="mt-16 max-w-xl">
              <p className="text-md text-gray-400 font-medium">Companies we&apos;ve worked with</p>
              <div className="relative mt-7 overflow-hidden mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                <div className="flex w-max items-center gap-12 animate-marquee">
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
