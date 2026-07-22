import { ChevronRight, Globe, Mail, MapPin, Phone, Play, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CONTACT_DETAILS = [
  { icon: Phone, text: "022-41700000", href: "tel:+912241700000" },
  { icon: Mail, text: "info@pvlumens.com", href: "mailto:info@pvlumens.com" },
  {
    icon: MapPin,
    text: "Office No. 1-2, 8th Floor, Times Tower, Kamla Mills Compound, Lower Parel, Mumbai — 400013",
    href: undefined,
  },
];

// ponytail: routes pending — swap in real paths once these pages exist
const QUICK_LINKS = [
  { label: "Career", href: "/careers" },
  { label: "Newsletter", href: "/resources/newsletter" },
  { label: "Blogs", href: "/resources/blogs" },
  { label: "Events", href: "/resources/events" },
  { label: "E-Waste Management", href: "/e-waste-management" },
];

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.024-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.114 20.452H3.558V9h3.556v11.452z" />
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M13.5 21v-8.25h2.75l.5-3.25h-3.25V7.5c0-.9.25-1.5 1.55-1.5H17V3.14C16.7 3.1 15.7 3 14.5 3c-2.5 0-4.25 1.53-4.25 4.32v2.18H8v3.25h2.25V21h3.25z" />
  </svg>
);

// ponytail: hrefs are placeholders — swap in real social profile URLs once provided
const SOCIAL_LINKS = [
  { label: "LinkedIn", icon: LinkedInIcon, href: "#" },
  { label: "Facebook", icon: FacebookIcon, href: "#" },
  { label: "Twitter / X", icon: X, href: "#" },
  { label: "YouTube", icon: Play, href: "#" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Use", href: "/terms-of-use" },
  { label: "Sitemap", href: "/sitemap" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-white">
      <div className="mx-auto max-w-375 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <Image src="/logo.svg" alt="PV Lumens" width={132} height={21} className="h-5 w-auto" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/50">
              India&apos;s leading value-added technology distributor,
              delivering trusted infrastructure solutions across South Asia.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-wide text-white/50">CONTACT US</h3>
            <ul className="mt-5 space-y-4">
              {CONTACT_DETAILS.map(({ icon: Icon, text, href }) => (
                <li key={text} className="flex items-start gap-3">
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400" aria-hidden="true" />
                  {href ? (
                    <a
                      href={href}
                      className="text-sm text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                    >
                      {text}
                    </a>
                  ) : (
                    <span className="text-sm text-white/70">{text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-wide text-white/50">QUICK LINKS</h3>
            <ul className="mt-5 space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1 text-sm text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                  >
                    {link.label}
                    <ChevronRight
                      className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-wide text-white/50">FOLLOW US</h3>
            <div className="mt-5 flex items-center gap-3">
              {SOCIAL_LINKS.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
            <a
              href="https://pvlumens.com"
              className="mt-5 inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              <Globe className="h-4 w-4" aria-hidden="true" />
              pvlumens.com
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm text-white/50">
            © {year} PV Lumens. All rights reserved.
          </p>
          <ul className="flex items-center gap-6">
            {LEGAL_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-white/50 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
