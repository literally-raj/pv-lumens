"use client";

import { animate, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: 2500, suffix: "+", description: "Trusted channel partners across India" },
  { value: 21, suffix: "", description: "Pan-India locations for nationwide coverage" },
  { value: 10, suffix: "+", description: "Years of rapid growth since inception (2012)" },
  { value: 30, suffix: "+", description: "Global technology brand partnerships" },
];

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT_EXPO } },
};

function StatValue({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(target);
      return;
    }

    const controls = animate(0, target, {
      duration: 1.8,
      ease: EASE_OUT_EXPO,
      onUpdate: (value) => setCount(Math.round(value)),
    });
    return () => controls.stop();
  }, [inView, target]);

  return (
    <p
      ref={ref}
      className="text-5xl font-semibold tracking-tight text-slate-900 tabular-nums sm:text-6xl"
    >
      {count}
      {suffix}
    </p>
  );
}

export default function Stats() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="mx-auto grid max-w-7xl grid-cols-2 gap-x-12 gap-y-12 px-4 sm:grid-cols-4 sm:px-6 lg:px-8"
      >
        {STATS.map((stat, index) => (
          <motion.div
            key={stat.description}
            variants={itemVariants}
            className={`text-center sm:text-left ${
              index > 0 ? "sm:border-l sm:border-slate-200 sm:pl-12" : ""
            }`}
          >
            <StatValue target={stat.value} suffix={stat.suffix} />
            <p className="mt-5 text-sm leading-relaxed text-slate-500">
              {stat.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
