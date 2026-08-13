import { ChevronDown } from "lucide-react";

const FAQ_ITEMS = [
  {
    question: "What products and solutions does PV Lumens distribute?",
    answer:
      "We distribute Network Infrastructure, Safety and Security, Productivity, Drones, and Test and Measurement solutions from leading global OEMs.",
  },
  {
    question: "Which regions does PV Lumens serve?",
    answer:
      "We maintain a pan-India presence across 18 locations, serving channel partners and customers throughout South Asia Pacific.",
  },
  {
    question: "How can I become a channel partner?",
    answer:
      "Reach out through our Contact page — our team evaluates and onboards resellers, system integrators, and sub-distributors on an ongoing basis.",
  },
  {
    question: "Does PV Lumens provide pre-sales and post-sales support?",
    answer:
      "Yes. We offer technical pre-sales consultation, post-sales support, and warranty and RMA services for every brand we represent.",
  },
  {
    question: "Which brands do you represent?",
    answer:
      "Our portfolio includes Zebra, Honeywell, Panduit, Vertiv, Fluke Networks, Axis Communications, and more — see our Brands page for the full list.",
  },
  {
    question: "How do I request a product quote or demo?",
    answer:
      "Use the Enquire Now button on our homepage or visit the Contact page to reach our sales team directly.",
  },
];

export default function FAQ() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <span className="inline-flex items-center rounded-full bg-slate-100 px-4 py-1 text-xs font-semibold tracking-wide text-slate-600">
          FAQ
        </span>
        <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
          Frequently Asked Questions
        </h2>
        <p className="mt-5 text-lg text-slate-500">
          Answers to the questions we hear most from partners and customers.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-3xl space-y-4 px-4 sm:px-6 lg:px-8">
        {FAQ_ITEMS.map(({ question, answer }, index) => (
          <details
            key={question}
            className="group rounded-2xl border border-slate-200 p-6"
            open={index === 0}
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand [&::-webkit-details-marker]:hidden">
              {question}
              <ChevronDown
                className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <p className="mt-4 text-sm leading-relaxed text-slate-500">{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
