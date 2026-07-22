import Image from "next/image";
import { LEADERSHIP } from "@/lib/data/leadership";

export default function Leadership() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <span className="inline-flex items-center rounded-full bg-slate-100 px-4 py-1 text-xs font-semibold tracking-wide text-slate-600">
          LEADERSHIP
        </span>
        <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
          Meet Our Leadership
        </h2>
        <p className="mt-5 text-lg text-slate-500">
          {/* ponytail: placeholder subheading, swap for final copy */}
          The team steering PV Lumens&apos; growth, partner relationships, and technical direction.
        </p>
      </div>

      <div className="mx-auto mt-14 flex max-w-7xl flex-wrap justify-center gap-8 px-4 sm:px-6 lg:px-8">
        {LEADERSHIP.map(({ name, designation, image }) => (
          <div
            key={name}
            className="w-full shrink-0 sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.334rem)]"
          >
            <div className="relative aspect-square overflow-hidden rounded-md bg-slate-200">
              <Image
                src={image}
                alt={name}
                fill
                sizes="(min-width: 1024px) 280px, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-slate-900">{name}</h3>
            <p className="mt-1 text-sm text-slate-500">{designation}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
