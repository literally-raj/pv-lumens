import Image from "next/image";
import { TextAnimate } from "@/components/ui/text-animate";

const PARAGRAPHS = [
  "PV Lumens India Pvt Ltd is a nation-wide distribution enterprise offering Network Infrastructure, Safety and Security, Drones, Productivity, and Instrumentation solutions from leading global brands — supporting sectors from Enterprise and Data Centres to Transport, Retail, and Power Generation, Transmission and Distribution.",
  "In under a decade, PVL has become one of India's leading distribution companies, representing globally respected brands such as Zebra, Honeywell, Panduit, CommScope, Vertiv, Fluke Networks, Axis Communications, ideaForge, and Megger — delivering value-added sales, pre- and post-sales support, and RMA services across South Asia Pacific.",
];

const STATS = [
  { value: "2,500+", label: "Channel Partners" },
  { value: "18", label: "Pan-India Locations" },
  { value: "35+", label: "Years of Leadership Experience" },
];

export default function AboutContent() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <span className="inline-flex items-center rounded-full bg-slate-100 px-4 py-1 text-xs font-semibold tracking-wide text-slate-600">
          WHO WE ARE
        </span>
        <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
          Two Decades of Trusted Distribution
        </h2>
      </div>

      <div className="mx-auto mt-14 grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
        <div>
          <div className="space-y-6">
            {PARAGRAPHS.map((paragraph, index) => (
              <TextAnimate
                key={index}
                as="p"
                by="word"
                animation="blurInUp"
                startOnView
                once
                className="text-lg leading-relaxed text-slate-600"
              >
                {paragraph}
              </TextAnimate>
            ))}
          </div>

          <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-slate-200 pt-8">
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <dd className="text-3xl font-semibold tracking-tight text-slate-900">{value}</dd>
                <dt className="mt-1 text-sm text-slate-500">{label}</dt>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative aspect-4/5 overflow-hidden rounded-2xl bg-slate-100 lg:aspect-square">
          <Image
            src="https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200&q=80"
            alt="Enterprise warehouse and distribution facility"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
