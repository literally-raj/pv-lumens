"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
};

const CONTACT_DETAILS = [
  { icon: Phone, text: "022-41700000", href: "tel:+912241700000" },
  { icon: Mail, text: "info@pvlumens.com", href: "mailto:info@pvlumens.com" },
  {
    icon: MapPin,
    text: "Office No. 1-2, 8th Floor, Times Tower, Kamla Mills Compound, Lower Parel, Mumbai — 400013",
    href: undefined,
  },
];

interface ContactFormProps {
  heading?: string;
  description?: string;
}

export default function ContactForm({
  heading = "Let's Build Your Infrastructure Roadmap",
  description = "Tell us about your requirement and our team will get back to you with the right technology partner for the job.",
}: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);

  // ponytail: no backend wired yet — swap for a real submit handler once an endpoint exists
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="bg-navy py-16 sm:py-24">
      <div className="mx-auto grid max-w-370 grid-cols-1 gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={containerVariants}
        >
          <motion.span
            variants={itemVariants}
            className="inline-flex items-center rounded-full bg-white/10 px-4 py-1 text-xs font-semibold tracking-wide text-white/70"
          >
            GET IN TOUCH
          </motion.span>

          <motion.h2
            variants={itemVariants}
            className="mt-5 text-3xl font-semibold leading-snug tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            {heading}
          </motion.h2>

          <motion.p variants={itemVariants} className="mt-5 max-w-md text-lg text-white/60">
            {description}
          </motion.p>

          <ul className="mt-10 space-y-5">
            {CONTACT_DETAILS.map(({ icon: Icon, text, href }) => (
              <motion.li key={text} variants={itemVariants} className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white/70">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                {href ? (
                  <a
                    href={href}
                    className="mt-2 text-sm text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                  >
                    {text}
                  </a>
                ) : (
                  <span className="mt-2 text-sm text-white/70">{text}</span>
                )}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={itemVariants}
          className="rounded-2xl bg-white p-8 shadow-lg sm:p-10"
        >
          {submitted ? (
            <div className="flex h-full min-h-64 flex-col items-center justify-center text-center">
              <h3 className="text-xl font-semibold text-slate-900">Thank you</h3>
              <p className="mt-2 max-w-xs text-sm text-slate-500">
                We&apos;ve received your enquiry and will be in touch shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="cta-name" className="text-sm font-medium text-slate-700">
                  Full name
                </label>
                <input
                  id="cta-name"
                  name="name"
                  type="text"
                  required
                  className="mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition-colors focus:border-brand focus-visible:ring-2 focus-visible:ring-brand"
                />
              </div>

              <div>
                <label htmlFor="cta-email" className="text-sm font-medium text-slate-700">
                  Work email
                </label>
                <input
                  id="cta-email"
                  name="email"
                  type="email"
                  required
                  className="mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition-colors focus:border-brand focus-visible:ring-2 focus-visible:ring-brand"
                />
              </div>

              <div>
                <label htmlFor="cta-phone" className="text-sm font-medium text-slate-700">
                  Phone
                </label>
                <input
                  id="cta-phone"
                  name="phone"
                  type="tel"
                  className="mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition-colors focus:border-brand focus-visible:ring-2 focus-visible:ring-brand"
                />
              </div>

              <div>
                <label htmlFor="cta-message" className="text-sm font-medium text-slate-700">
                  How can we help?
                </label>
                <textarea
                  id="cta-message"
                  name="message"
                  rows={4}
                  required
                  className="mt-2 w-full resize-none rounded-md border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition-colors focus:border-brand focus-visible:ring-2 focus-visible:ring-brand"
                />
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-semibold text-navy transition-colors hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
              >
                Submit Enquiry
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
