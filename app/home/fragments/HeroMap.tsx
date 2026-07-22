"use client";

import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const BASE_TILT = 26;

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

// Pixel coordinates on the 1536x1024 india-network-map.png (dot-matrix outline of India)
const NODES = {
  mumbai: { x: 424, y: 614, label: "Mumbai" },
  delhi: { x: 577, y: 315, label: "Delhi" },
  bengaluru: { x: 590, y: 805, label: "Bengaluru" },
  surat: { x: 422, y: 548, label: "Surat" },
  chennai: { x: 685, y: 802, label: "Chennai" },
  kolkata: { x: 970, y: 504, label: "Kolkata" },
  hyderabad: { x: 622, y: 667, label: "Hyderabad" },
} as const;

// Draw order tells the story: Bengaluru -> Mumbai -> Surat -> Delhi -> onward, one line at a time.
const LINKS: [keyof typeof NODES, keyof typeof NODES][] = [
  ["bengaluru", "mumbai"],
  ["mumbai", "surat"],
  ["surat", "delhi"],
  ["delhi", "kolkata"],
  ["mumbai", "delhi"],
  ["mumbai", "hyderabad"],
  ["mumbai", "chennai"],
  ["bengaluru", "chennai"],
  ["mumbai", "kolkata"],
];

// Bulges each connection into a tall arc that lifts off the map before landing on the next city.
function arcPath(a: { x: number; y: number }, b: { x: number; y: number }) {
  const dist = Math.hypot(b.x - a.x, b.y - a.y);
  const midX = (a.x + b.x) / 2;
  const midY = (a.y + b.y) / 2 - dist * 0.45;
  return { d: `M ${a.x} ${a.y} Q ${midX} ${midY} ${b.x} ${b.y}`, length: dist * 1.3 };
}

interface HeroMapProps {
  showLogoStrip?: boolean;
}

export default function HeroMap({ showLogoStrip = true }: HeroMapProps) {
  const [activeLink, setActiveLink] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveLink((current) => (current + 1) % LINKS.length);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  const [from, to] = LINKS[activeLink];
  const { d, length } = arcPath(NODES[from], NODES[to]);

  const rotateX = useMotionValue(BASE_TILT);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 60, damping: 15 });
  const springRotateY = useSpring(rotateY, { stiffness: 60, damping: 15 });

  const handlePointerMove = (event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 14);
    rotateX.set(BASE_TILT - py * 14);
  };

  const handlePointerLeave = () => {
    rotateY.set(0);
    rotateX.set(BASE_TILT);
  };

  return (
    <section
      id="hero-map"
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      className="relative flex min-h-[85vh] items-center overflow-hidden bg-black lg:min-h-screen"
    >
      <div
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-size-[44px_44px]"
        aria-hidden="true"
      />
      <div className="absolute inset-y-0 right-[-10%] w-[70%] sm:w-[60%] lg:w-[70%] perspective-[1400px]">
        <motion.div
          className="h-full w-full transform-3d"
          style={{ rotateX: springRotateX, rotateY: springRotateY }}
        >
          <svg
            viewBox="0 0 1536 1024"
            preserveAspectRatio="xMidYMid meet"
            className="h-full w-full"
            role="img"
            aria-label="Interconnected network map of India linking Mumbai, Delhi, Bengaluru, Surat, Chennai, Kolkata and Hyderabad"
          >
            <image
              href="/india-network-map.png"
              x={0}
              y={0}
              width={1536}
              height={1024}
              className="invert brightness-125"
              opacity={1}
            />
            <AnimatePresence mode="wait">
              <motion.g key={`${from}-${to}`} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
                <motion.path
                  d={d}
                  fill="none"
                  stroke="#93c5fd"
                  strokeWidth={2}
                  strokeLinecap="round"
                  className="filter-[drop-shadow(0_0_4px_#93c5fd)_drop-shadow(0_0_14px_#2563eb)]"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.35 }}
                  transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
                />
                <motion.path
                  d={d}
                  fill="none"
                  stroke="#dbeafe"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeDasharray={`${length * 0.16} ${length}`}
                  className="drop-shadow-[0_0_8px_#60a5fa]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, strokeDashoffset: [0, -length] }}
                  transition={{
                    opacity: { duration: 0.4, delay: 0.5 },
                    strokeDashoffset: { duration: 2.6, repeat: Infinity, ease: "linear", delay: 0.5 },
                  }}
                />
              </motion.g>
            </AnimatePresence>
            {Object.entries(NODES).map(([key, node], index) => (
              <g key={key}>
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={10}
                  fill="#38bdf8"
                  opacity={0.25}
                  initial={{ scale: 0 }}
                  animate={{ scale: [1, 1.8, 1] }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    delay: index * 0.3,
                    ease: "easeInOut",
                  }}
                  style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                />
                <circle cx={node.x} cy={node.y} r={4} fill="#e0f2fe" />
              </g>
            ))}
          </svg>
        </motion.div>
        <div className="absolute inset-0 bg-linear-to-r from-black/35 to-transparent" />
      </div>
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:pl-4 lg:pr-8">
        <motion.div
          initial="hidden"
          animate="show"
          variants={containerVariants}
          className="max-w-4xl overflow-hidden lg:-ml-22.5"
        >
          <motion.span
            variants={itemVariants}
            className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-1 text-xs font-semibold tracking-wide text-white/70 backdrop-blur-sm"
          >
            PAN-INDIA DELIVERY NETWORK
          </motion.span>
          <motion.h1
            variants={itemVariants}
            className="mt-5 text-3xl font-semibold max-w-2xl leading-tight tracking-[-0.03em] text-white sm:text-5xl lg:text-5xl"
          >
            India&apos;s Leading Value-Added Technology Distributor
          </motion.h1>
          <motion.p variants={itemVariants} className="mt-6 text-lg max-w-xl text-white/70">
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
              href="/about-us"
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
