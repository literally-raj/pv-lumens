import { Quote, User } from "lucide-react";
import { TextAnimate } from "@/components/ui/text-animate";

const TESTIMONIAL_QUOTE =
  "At PV Lumens, we don't just distribute products — we build partnerships. Our mission is to empower every channel partner, system integrator, and end customer with the right technology, the right support, and the right expertise. In a rapidly evolving landscape, we are committed to being the most trusted and value-adding distribution partner across South Asia.";

export default function MainTestimonial() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <span className="inline-flex items-center rounded-full bg-indigo-50 px-4 py-1 text-xs font-semibold tracking-wide text-indigo-600">
          FROM OUR LEADERSHIP
        </span>

        <Quote className="mt-8 h-10 w-10 text-indigo-600/30" aria-hidden="true" />

        <blockquote className="mt-6">
          <TextAnimate
            as="p"
            animation="blurInUp"
            by="word"
            duration={1.4}
            once
            className="text-2xl font-medium leading-relaxed tracking-tight text-slate-900 sm:text-3xl lg:text-4xl"
          >
            {TESTIMONIAL_QUOTE}
          </TextAnimate>
        </blockquote>

        <footer className="mt-10 flex items-center justify-end gap-4 pt-8">
          <div className="text-right">
            {/* ponytail: swap in the CEO's name once provided */}
            <p className="text-sm font-semibold text-slate-900">Managing Director &amp; CEO</p>
            <p className="text-sm text-slate-500">PV Lumens India Pvt Ltd</p>
          </div>
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-400">
            <User className="h-6 w-6" aria-hidden="true" />
          </span>
        </footer>
      </div>
    </section>
  );
}
