"use client";

import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { SOLUTIONS } from "@/lib/data/solutions";
import MegaMenu, { type MegaMenuItem } from "./MegaMenu";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const mobileNavContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};

const mobileNavItem = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE_OUT_EXPO } },
};

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about-us" },
  { label: "Solutions", href: "/solutions", menu: "solutions" },
  { label: "Brands", href: "/brands" },
  { label: "Products", href: "/products" },
] as const;

const SOLUTIONS_ITEMS: MegaMenuItem[] = SOLUTIONS.map(({ category, icon, items, slug }) => ({
  icon,
  title: `${category}.`,
  description: `${items.length} solutions available.`,
  href: `/solutions/${slug}`,
  subItems: items.map(({ name, url }) => ({ name, url })),
}));

const MEGA_MENUS = {
  solutions: { items: SOLUTIONS_ITEMS, viewAllLabel: "View all solutions", viewAllHref: "/solutions" },
} as const;

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [openMenu, setOpenMenu] = useState<keyof typeof MEGA_MENUS | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const solid = !isHome || scrolled;
  const activeMenu = openMenu ? MEGA_MENUS[openMenu] : null;
  const drawerRef = useFocusTrap<HTMLDivElement>(mobileOpen);

  useEffect(() => {
    const heroHeight = { current: window.innerHeight };
    const updateHeroHeight = () => {
      const hero = document.getElementById("hero");
      heroHeight.current = hero?.offsetHeight ?? window.innerHeight;
    };
    const handleScroll = () => setScrolled(window.scrollY > heroHeight.current - 88);

    updateHeroHeight();
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", updateHeroHeight);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateHeroHeight);
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setMobileSolutionsOpen(false);
  };

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 w-full transition-colors duration-300 ${
        solid ? "bg-white/95 shadow-sm backdrop-blur-sm" : "bg-black/5 backdrop-blur-sm"
      }`}
      onMouseLeave={() => setOpenMenu(null)}
    >
      <div className="mx-auto grid w-full max-w-375 grid-cols-3 items-center py-8 px-8 sm:px-6 lg:pl-4 lg:pr-8">
        <Link
          href="/"
          aria-label="PV Lumens home"
          className="shrink-0 justify-self-start rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          <Image
            src="/logo.svg"
            alt="PV Lumens"
            width={132}
            height={21}
            className={`h-5 w-auto transition-[filter] duration-300 ${solid ? "brightness-0" : ""}`}
            priority
          />
        </Link>

        <ul className="hidden items-center justify-self-center gap-10 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

            return (
              <li
                key={link.href}
                onMouseEnter={() => setOpenMenu("menu" in link ? link.menu : null)}
              >
                <Link
                  href={link.href}
                  className={`flex items-center gap-1 rounded-sm text-md underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                    isActive ? "font-bold underline" : "font-medium"
                  } ${
                    solid
                      ? "text-slate-600 hover:text-slate-900 focus-visible:ring-slate-900 focus-visible:ring-offset-white"
                      : "text-white hover:text-white focus-visible:ring-white focus-visible:ring-offset-black"
                  }`}
                >
                  {link.label}
                  {"menu" in link && (
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform ${
                        openMenu === link.menu ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="col-start-3 flex items-center justify-self-end gap-3">
          <Link
            href="/contact"
            className={`hidden items-center justify-center rounded-md px-8 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 sm:inline-flex ${
              solid
                ? "border border-slate-300 text-slate-900 hover:bg-slate-50 focus-visible:ring-slate-900 focus-visible:ring-offset-white"
                : "bg-white text-black hover:bg-white/90 focus-visible:ring-white focus-visible:ring-offset-black"
            }`}
          >
            Contact Us
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            className={`flex h-10 w-10 items-center justify-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 md:hidden ${
              solid
                ? "text-slate-900 focus-visible:ring-slate-900 focus-visible:ring-offset-white"
                : "text-white focus-visible:ring-white focus-visible:ring-offset-black"
            }`}
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {activeMenu && (
          <MegaMenu
            key={openMenu}
            items={activeMenu.items}
            viewAllLabel={activeMenu.viewAllLabel}
            viewAllHref={activeMenu.viewAllHref}
            direction={0}
          />
        )}
      </AnimatePresence>
    </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-drawer"
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
            className="fixed inset-0 z-50 flex w-full flex-col overflow-y-auto bg-white px-6 pt-[max(1.5rem,env(safe-area-inset-top))] md:hidden"
          >
            <div className="flex shrink-0 items-center justify-between">
              <Image src="/logo.svg" alt="PV Lumens" width={132} height={21} className="h-5 w-auto" />
              <button
                type="button"
                onClick={closeMobileMenu}
                aria-label="Close menu"
                className="flex h-11 w-11 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <motion.ul
              initial="hidden"
              animate="show"
              variants={mobileNavContainer}
              className="mt-6 flex flex-1 flex-col gap-1"
            >
              {NAV_LINKS.map((link) => {
                const isActive =
                  link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                const hasSubmenu = "menu" in link;

                return (
                  <motion.li key={link.href} variants={mobileNavItem}>
                    {hasSubmenu ? (
                      <button
                        type="button"
                        onClick={() => setMobileSolutionsOpen((current) => !current)}
                        aria-expanded={mobileSolutionsOpen}
                        className={`flex w-full items-center justify-between rounded-lg px-4 py-4 text-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                          isActive || mobileSolutionsOpen
                            ? "bg-slate-100 font-semibold text-slate-900"
                            : "font-medium text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {link.label}
                        <ChevronDown
                          className={`h-5 w-5 transition-transform ${
                            mobileSolutionsOpen ? "rotate-180" : ""
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={closeMobileMenu}
                        className={`flex items-center justify-between rounded-lg px-4 py-4 text-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                          isActive
                            ? "bg-slate-100 font-semibold text-slate-900"
                            : "font-medium text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {link.label}
                        <ArrowRight className="h-4 w-4 text-slate-300" aria-hidden="true" />
                      </Link>
                    )}

                    {hasSubmenu && (
                      <AnimatePresence initial={false}>
                        {mobileSolutionsOpen && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
                            className="ml-4 flex flex-col gap-1 overflow-hidden border-l border-slate-200 py-1 pl-4"
                          >
                            {SOLUTIONS_ITEMS.map(({ icon: Icon, title, href }) => (
                              <li key={href}>
                                <Link
                                  href={href}
                                  onClick={closeMobileMenu}
                                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium text-slate-600 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                                >
                                  <Icon className="h-4 w-4 shrink-0 text-indigo-600" aria-hidden="true" />
                                  {title.replace(/\.$/, "")}
                                </Link>
                              </li>
                            ))}
                            <li>
                              <Link
                                href={MEGA_MENUS.solutions.viewAllHref}
                                onClick={closeMobileMenu}
                                className="flex items-center gap-2 rounded-lg px-3 py-3 text-base font-semibold text-slate-900 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                              >
                                {MEGA_MENUS.solutions.viewAllLabel}
                                <ArrowRight className="h-4 w-4" aria-hidden="true" />
                              </Link>
                            </li>
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    )}
                  </motion.li>
                );
              })}
            </motion.ul>

            <div className="shrink-0 border-t border-slate-200 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
              <Link
                href="/contact"
                onClick={closeMobileMenu}
                className="flex items-center justify-center rounded-md bg-slate-900 px-6 py-4 text-base font-semibold text-white transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
