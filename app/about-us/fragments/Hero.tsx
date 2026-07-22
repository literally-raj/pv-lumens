export default function Hero() {
  return (
    <section className="bg-white pt-32 pb-12 sm:pt-40 sm:pb-16">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <span className="inline-flex items-center rounded-full bg-slate-100 px-4 py-1 text-xs font-semibold tracking-wide text-slate-600">
          ABOUT US
        </span>
        <h1 className="mt-5 text-3xl font-semibold leading-snug tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
          {/* ponytail: placeholder heading, swap for final copy */}
          Engineering Trust Across India&apos;s Technology Infrastructure
        </h1>
        <p className="mt-5 text-lg text-slate-500">
          {/* ponytail: placeholder subheading, swap for final copy */}
          For over two decades, PV Lumens has partnered with global OEMs to
          deliver networking, security and enterprise infrastructure solutions
          built for scale, reliability and long-term performance.
        </p>
      </div>
    </section>
  );
}
