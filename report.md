# UX Audit & Rethink Report — PV Lumens Website

**Product**: PV Lumens India Pvt Ltd — B2B distributor marketing site
**Scope audited**: `/` (home), `/about-us`, `/solutions` + `/solutions/[slug]`, `/brands` + `/brands/[slug]`, `/products`, global nav/footer
**Methodology**: IxDF UX Framework — 7 Factors, 5 Usability Characteristics, 5 Interaction Dimensions
**Auditor stance**: senior frontend developer + product designer, evidence-based (every finding below is tied to a real file/line in this codebase, not a hypothetical)

---

## Who this site is actually for

Reading `AGENTS.md` and the built pages, the real users are:

- **Procurement / IT managers** at enterprises, data centres, retail chains — evaluating PV Lumens as a distributor before an RFQ.
- **System integrators, resellers, sub-distributors** — checking brand/solution coverage before onboarding as a channel partner.
- **OEM brand managers** — sanity-checking how their brand is represented.

None of these users are browsing casually. They arrive with an intent ("does this distributor carry Axis + Fluke Networks in Mumbai", "who do I email an RFQ to") and will bounce hard on friction — which makes the findings below (especially the broken contact path and dead mobile nav) disproportionately costly for this specific audience.

---

## Executive Summary

### Overall UX Health Score: **46 / 85 (D — Poor, needs a focused fix sprint, not a rebuild)**

The visual design system is genuinely strong — consistent badge/heading pattern, restrained motion, coherent enterprise tone matching the Cisco/Schneider/Honeywell reference bar set in `AGENTS.md`. The problem is not taste, it's **three load-bearing gaps that undercut everything built on top of them**:

1. **Every primary CTA on the site ("Contact Us", "Enquire Now") points at a page that doesn't exist.**
2. **There is no mobile navigation.** Below the `md` breakpoint, the nav links simply disappear — no hamburger, no drawer, nothing.
3. **The homepage hero loads a 34 MB PNG** as its `priority` background image.

Fix those three and the score jumps from a D to a B without touching a single pixel of the visual design.

| Framework | Score | Status |
|---|---|---|
| 7 UX Factors | 19/35 | ❌ Poor |
| 5 Usability Characteristics | 13/25 | ❌ Poor |
| 5 Interaction Dimensions | 14/25 | ⚠️ Needs work |

---

## 1. The 7 UX Factors

| Factor | Score | Why |
|---|---|---|
| **Useful** | 4/5 | Real content: 27 real brands, 6 real solution categories with actual scraped product URLs, real HQ address/phone. The information a buyer needs is genuinely here. |
| **Usable** | 2/5 | No mobile nav (see 2.1). Products page has real filtering, but it's the only page with any interaction depth — everything else is scroll-and-read. |
| **Findable** | 2/5 | No page has a `<title>` beyond the root layout's literal `"Create Next App"` (see 2.3). A user who opens a `/solutions/vertiv` link in a new tab sees "Create Next App" in the tab — zero orientation. No sitemap, no breadcrumbs on deep pages (`/solutions/[slug]`, `/brands/[slug]`). |
| **Credible** | 2/5 | Broken primary CTAs (2.2) are the single biggest credibility killer for a B2B site — a buyer who clicks "Contact Us" and hits a 404 will assume the company is unreachable, not that it's a dev oversight. Duplicate homepage at `/` and `/home` (2.4) is a technical red flag if a search engine indexes both. |
| **Desirable** | 4/5 | Genuinely the strongest area — consistent Tailwind design tokens, restrained Framer Motion, the tilted network-map hero, badge+heading pattern repeated correctly across every page. |
| **Accessible** | 2/5 | Good instincts in places (focus-visible rings almost everywhere, `BottomSheet` has `role="dialog"`, `aria-modal`, Escape-to-close, body-scroll lock). But: no mobile nav means keyboard/assistive-tech users on mobile have **no way to reach 4 of 5 top-level sections**. No focus trap in `BottomSheet`. Several content images (Divisions, PartnerEcosystem, Solutions/Brands cards) use `alt=""` on non-decorative photography. |
| **Valuable** | 3/5 | Undermined less by design and more by the broken funnel: real content exists (brands, solutions, products) but the two paths that turn a visitor into a lead — "Enquire Now" and the contact form — are either 404 or silently fake (2.5). |

**Total: 19/35**

---

## 2. Critical Issues (fix this week — these are the ones actually costing leads)

### 2.1 — No mobile navigation exists at all
**File**: `components/navigation/Navbar.tsx:80`
```tsx
<ul className="hidden items-center justify-self-center gap-10 md:flex">
```
The entire nav list is `hidden` below `md` (768px) with **no alternative rendering path** — no hamburger icon, no drawer, no `Sheet`. On any phone, a visitor can see the logo and the "Contact Us" button and nothing else. They cannot get to About, Solutions, Brands, or Products from the header.

- **Impact**: On a B2B site where the buyer persona is "researching before an RFQ," most first visits are from a shared email/LinkedIn link opened on a phone. This is not a nice-to-have — it silently removes ~4 of 5 top-level destinations for mobile traffic.
- **Fix**: Add a mobile drawer following the exact pattern already built and proven in this codebase for `app/products/fragments/ProductsExplorer.tsx` (fixed-position panel + backdrop, `AnimatePresence`, Escape-to-close via the same approach as `components/ui/BottomSheet.tsx`). Trigger with a `Menu` icon button shown only `md:hidden`, mirroring the existing `SlidersHorizontal` filter-toggle pattern in `app/products/fragments/Toolbar.tsx`. Reuse `NAV_LINKS` — no new data needed.
- **Effort**: ~half a day; every piece of the pattern (drawer, backdrop, focus-visible styling) already exists elsewhere in this repo.

### 2.2 — Every "Contact"/"Enquire" CTA links to a page that returns 404
**Evidence**:
```
$ find app/contact -type f    →  (nothing — the route doesn't exist)
$ grep -rl '"/contact"' app components  →  3 files reference it
```
`components/navigation/Navbar.tsx` (Contact Us button), `app/home/fragments/Hero.tsx` / `HeroMap.tsx` ("Enquire Now"), and `components/cards/ProductCard.tsx` / `ProductListRow.tsx` ("Download Brochure" fallback) all point at `/contact`. There is no `app/contact/page.tsx`.

- **Impact**: This is the literal conversion path for a distributor site. Right now it 404s. Every single "talk to sales" click on the entire site is broken.
- **Fix**: There's already a fully-built contact section sitting unused — `app/home/fragments/FinalCTA.tsx` has real phone (`022-41700000`), email, Mumbai HQ address, and a working (client-side) contact form. Promote it: create `app/contact/page.tsx` composing a `Hero` fragment + the `FinalCTA` content (move/reuse it as a shared fragment rather than duplicating), and point all three CTA sources at the new route.
- **Effort**: ~1 hour — the hard part (the form UI) is already written.

### 2.3 — No page has real `<title>`/metadata
**Evidence**: `grep -rn "export const metadata" app` returns exactly one hit — the root `app/layout.tsx`, and it's the CRA boilerplate:
```tsx
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
```
No page — not home, not `/about-us`, not any `/solutions/[slug]`, not any `/brands/[slug]` — overrides this. `AGENTS.md`'s own SEO checklist ("Every page must include: title, description, Open Graph...") is unmet on every single route.
- **Impact**: Every browser tab reads "Create Next App." Every shared link preview (Slack, WhatsApp, LinkedIn — exactly where a B2B buyer would forward a `/brands/axis-communications` link) shows no title, no description, no OG image. Google indexes 40+ pages (6 solution categories, 27 brands) all fighting for the identical title.
- **Fix**: Add `generateMetadata` to the two dynamic routes (`app/solutions/[slug]/page.tsx`, `app/brands/[slug]/page.tsx`) deriving title/description from the existing `category`/`brand.blurb` data already in `lib/data/solutions.ts` and `lib/data/brands.ts` — no new content needed, just wiring. Add static `metadata` exports to `page.tsx` in `/about-us`, `/solutions`, `/brands`, `/products`.
- **Effort**: ~2 hours for all routes combined, since the copy already exists in the data files.

### 2.4 — Duplicate homepage at two URLs
**File**: `app/page.tsx`
```tsx
import Home from './home/page'
export default function page() {
  return <Home/>
}
```
`app/home/page.tsx` is a real Next.js route file, so it is independently reachable at **`/home`** — the exact same content as `/`, rendered twice under two URLs. `app/page.tsx` importing another route's `page.tsx` module and rendering it as a component works, but it's an anti-pattern that produces duplicate content for search engines and confuses anyone who bookmarks `/home`.
- **Fix**: Move the JSX out of `app/home/page.tsx` into a plain fragment/component (e.g. `app/home/HomeContent.tsx`, no route semantics), have `app/page.tsx` render that directly, and delete `app/home/page.tsx` so `/home` 404s instead of duplicating `/`.
- **Effort**: 15 minutes.

### 2.5 — The homepage hero background is a 34 MB PNG, loaded with `priority`
**Evidence**:
```
$ ls -la public/hero.png
-rw-r--r--  33938443 Jul 21 15:54 public/hero.png
```
`app/home/fragments/Hero.tsx` renders this via `next/image fill priority`. `next/image` will resize the *served* bytes down, but the **source** file is still 34 MB that Next has to read and re-encode on first request (and on every build in a serverless/edge deploy where the image cache is cold) — this is exactly the kind of asset that produces multi-second TTFB spikes and blows out build/deploy time. This was already flagged in an earlier session pass (dev-server log noted "Hero background image is large unoptimized PNG asset") and never actioned.
- **Impact**: Directly hits the **Time** interaction dimension and Core Web Vitals (LCP) — the hero image is explicitly `priority`, i.e. it's the LCP candidate on the highest-traffic page.
- **Fix**: Re-export the source at a sane resolution (2000px wide is plenty for a `fill` hero) and re-compress — should land under 500 KB. No code changes needed, just replace the file.
- **Effort**: 10 minutes.

### 2.6 — The homepage contact form has no backend; "success" is fake
**File**: `app/home/fragments/FinalCTA.tsx:33`
```tsx
// ponytail: no backend wired yet — swap for a real submit handler once an endpoint exists
const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  setSubmitted(true);
};
```
The form shows a success state (`submitted`) on every single submit, regardless of whether any data went anywhere. A user who fills this in believes they've reached PV Lumens. They haven't.
- **Impact**: Worse than a visible error — it's a **false positive**. Combined with 2.2 (no `/contact` page), a determined lead currently has *zero* working way to reach the company through the website.
- **Fix**: Wire to a real endpoint (API route + email service, or a form provider like Formspree/Resend) before this form is the only thing standing between a lead and a 404.
- **Effort**: Depends on backend choice — flag as a blocker for launch regardless of effort.

---

## 3. High-Priority Issues (fix this sprint)

### 3.1 — `BottomSheet` (used by `Divisions`) has no focus trap
**File**: `components/ui/BottomSheet.tsx`
Escape-to-close ✅, body-scroll lock ✅, `role="dialog"` + `aria-modal="true"` ✅ — genuinely above-average modal hygiene already. Missing: focus isn't moved into the sheet on open, and `Tab` isn't trapped inside it, so a keyboard user can tab straight into the page content sitting behind the (still open) modal.
- **Fix**: On open, `ref.current?.focus()` the close button; on `Tab`/`Shift+Tab` at the panel boundary, wrap focus back inside. A small `useFocusTrap` hook (~20 lines) covers this and can be reused by the new mobile nav drawer (2.1) too.

### 3.2 — Decorative-vs-content images conflated via blanket `alt=""`
**Evidence**: 11 instances of `alt=""` across `app/**/*.tsx`. Some are correctly decorative (partner logo strips, background textures). Others are the *entire visual content of the card* — e.g. `Divisions.tsx`, `PartnerEcosystem.tsx`, `SolutionsGrid`/`ItemsGrid` placeholder boxes, brand headshots in `app/about-us/fragments/Leadership.tsx`.
- **Fix**: Audit each `alt=""` individually: partner-logo marquees stay `alt=""` (redundant with visible text), but `LEADERSHIP.map(...)` headshots in `Leadership.tsx` and the division photography in `Divisions.tsx` need real `alt={name}` / `alt={card.title}` — screen-reader users currently get nothing for "who is on the leadership team" or "what does the Network Infrastructure division look like."

### 3.3 — Deep pages have no breadcrumb / "you are here" signal
`/solutions/[slug]` (`CategoryHero.tsx`) and `/brands/[slug]` (`BrandHero.tsx`) both do have a "← All solutions" / "← All brands" back-link, which is good — but there's no breadcrumb trail (`Home / Solutions / Network Infrastructure`) and no indication in the page which top-level nav item is "active" once you're two levels deep, since `Navbar.tsx`'s active-state check is `pathname.startsWith(link.href)` — that part is actually correct and does bold/underline "Solutions" correctly on `/solutions/vertiv`. The gap is purely visual hierarchy on the page itself, not the nav.
- **Fix**: Low priority given the back-link already exists; a breadcrumb component would be a polish item, not a blocker.

### 3.4 — Dead imports / orphaned code
- `app/home/page.tsx` imports `FAQ` (line: `import FAQ from "./fragments/FAQ";`) but never renders `<FAQ />` — the whole FAQ section built earlier this session is unreachable dead code.
- Same file also imports `HeroMap` while its usage is commented out (`{/* <HeroMap/> */}`).
- **Fix**: Either render `<FAQ />` (it's a complete, working, accessible `<details>`-based accordion — seems like an accidental removal) or delete the import. Delete the `HeroMap` import if the map hero is staying retired, or restore the swap if it's meant to replace the current hero.

### 3.5 — `app/dummy/` sits inside the App Router tree
`app/dummy/image.png`, `image copy.png`, `image copy 2.png` are reference screenshots (used earlier for the products-page redesign) living inside `app/`. They don't produce a route (no `page.tsx`), so there's no live-site impact, but it's App Router clutter that a future contributor could mistake for a real segment.
- **Fix**: Move to a `design-references/` folder outside `app/`, or delete once no longer needed.

---

## 4. Medium-Priority Issues (next release)

| Issue | File | Fix |
|---|---|---|
| Brochure CTA (`Download Brochure`) links to `href="#"` on every product card | `components/cards/ProductCard.tsx`, `ProductListRow.tsx` | Already marked `ponytail:` for later — fine as a placeholder, but ship a real PDF (or hide the CTA) before this reaches real buyers; a dead download link on every single product card is a credibility hit at scale (12 products × broken link). |
| Brand pages show a generic 6-item "solutions preview" identical for every one of 27 brands | `app/brands/[slug]/fragments/BrandSolutions.tsx` | Already flagged in-code as `ponytail:` placeholder — correct call for now, but this is the kind of thing that reads as an obvious template gap to a channel partner checking their own brand page. |
| Two unfamiliar brands (Hamina, Heinrich) show no category badge and generic copy | `lib/data/brands.ts` | Same — correctly flagged rather than fabricated, just needs real copy before launch. |
| `Filters` sidebar on `/products` defaults closed on **every** screen size (a recent tradeoff to dodge a hydration-mismatch/lint error) | `app/products/fragments/ProductsExplorer.tsx` | Acceptable simplification, but worth reconsidering: a CSS-only approach (render the sidebar always in the DOM, control visibility purely via `hidden lg:block` + a separate mobile-only overlay state) would let desktop default to open without any JS media-query read, avoiding the hydration issue entirely. |
| Toolbar's "Sort by" has no default indicated (`name` A-Z) but no visual affordance that sorting is active | `app/products/fragments/Toolbar.tsx` | Minor — a small "Sorted by Name" chip would close the loop, but not blocking. |

---

## 5. What's actually working well (don't touch these)

- **Design system consistency** — the badge (`inline-flex ... rounded-full bg-slate-100`) + heading + subheading pattern is applied identically across `Hero`, `SolutionsGrid`, `BrandsGrid`, `Leadership`, `AboutContent`, `FAQ`. This is exactly the kind of repeatable system `AGENTS.md` asks for, and it's been followed correctly throughout.
- **Data modeling** — `lib/data/solutions.ts`, `lib/data/brands.ts`, `lib/data/products.ts` are clean, typed, single-source-of-truth, and actively reused across the mega menu, filters, and detail pages instead of being duplicated per page. This is the right call and will make the eventual real-content swap (real brochures, real brand copy) mechanical rather than a rewrite.
- **Motion restraint** — Framer Motion is used for `pathLength` draws, subtle fades, and the interactive parallax tilt on the network map, never for anything bouncy/flashy. Matches the "premium, smooth, subtle" instruction in `AGENTS.md` exactly.
- **Accessibility instincts, where applied** — `focus-visible:ring-2` is present on nearly every interactive element across the entire codebase, `BottomSheet` has real dialog semantics, and native `<details>`/`<summary>` was correctly chosen for the FAQ accordion over a hand-rolled JS one (zero-JS, fully keyboard-accessible by default).

---

## 6. 5 Usability Characteristics

| Characteristic | Score | Evidence |
|---|---|---|
| Effectiveness | 3/5 | Users *can* browse brands/solutions/products successfully — but cannot complete the one task that matters most (contact sales) on any device. |
| Efficiency | 3/5 | Products page filtering/search is fast and real; everything else is a single scroll, which is efficient by default but only because there's nothing to be inefficient *at*. |
| Engagement | 3/5 | Visual polish is engaging; broken CTAs actively work against it — nothing kills engagement faster than a 404 on the button you just got excited about. |
| Error Tolerance | 1/5 | The contact form's fake-success state (2.6) is a textbook error-tolerance failure: the system actively tells the user they succeeded when they didn't, with no path to discover or recover from that. |
| Ease of Learning | 3/5 | Navigation patterns are conventional (badge/heading/grid, mega menu, filter sidebar) — nothing here requires learning, when it's reachable at all (mobile nav gap aside). |

**Total: 13/25**

---

## 7. 5 Interaction Dimensions

| Dimension | Score | Notes |
|---|---|---|
| Words | 4/5 | Copy is consistently professional B2B tone throughout; placeholder copy is honestly marked `ponytail:` in-code rather than left ambiguous — genuinely good practice for a pre-launch site. |
| Visual Representations | 4/5 | Consistent icon language (Lucide throughout), consistent card/badge shapes, real brand logos. |
| Physical Objects/Space | 3/5 | Products page is properly responsive (drawer on mobile, sidebar on desktop) after recent fixes; the rest of the site is standard responsive Tailwind and holds up — the one real gap is 2.1 (nav). |
| Time | 1/5 | The 34 MB hero image (2.5) alone drags this down independent of anything else; no loading/skeleton states anywhere, but that matters less since most content is static. |
| Behavior | 3/5 | Hover/focus feedback is consistent and immediate; the fake form-success (2.6) is the one place behavior actively lies to the user. |

**Total: 14/25**

---

## 8. Prioritized Fix List

| # | Issue | Impact | Effort | Priority |
|---|---|---|---|---|
| 1 | `/contact` page missing, all CTAs 404 | Critical | ~1 hr | **P0** |
| 2 | No mobile navigation | Critical | ~half day | **P0** |
| 3 | Hero image is 34 MB | Critical (perf/LCP) | ~10 min | **P0** |
| 4 | Contact form fakes success with no backend | Critical | Depends on backend | **P0** |
| 5 | No per-page metadata (title/description) | High (SEO/credibility) | ~2 hrs | **P1** |
| 6 | Duplicate homepage at `/` and `/home` | High (SEO) | ~15 min | **P1** |
| 7 | `BottomSheet` has no focus trap | Medium (a11y) | ~1 hr | **P1** |
| 8 | Content images using blanket `alt=""` | Medium (a11y) | ~1 hr | **P2** |
| 9 | Dead `FAQ`/`HeroMap` imports on home page | Low (hygiene) | 5 min | **P2** |
| 10 | `app/dummy/` clutter in App Router tree | Low (hygiene) | 5 min | **P3** |
| 11 | "Download Brochure" links to `#` on every product | Medium (credibility at scale) | Depends on assets | **P2** |
| 12 | Generic brand-solutions preview repeated for all 27 brands | Low (already flagged in-code) | Depends on content | **P3** |

---

## 9. Suggested Sequence

**Day 1 (P0 sweep — ~1 day total, unblocks the entire funnel):**
1. Swap in a compressed `hero.png` (#3)
2. Delete `app/home/page.tsx` route duplication (#6, do this alongside #2 since the mobile nav touches the same navbar/home wiring)
3. Build `/contact` from the existing `FinalCTA` fragment, repoint all three CTA sources (#1)
4. Build the mobile nav drawer, reusing the `BottomSheet`/`ProductsExplorer` drawer pattern (#2)

**Week 1 (P1):**
5. Wire the contact form to a real endpoint (#4)
6. Add `generateMetadata` to both dynamic routes + static `metadata` to remaining pages (#5)
7. Add a focus trap to `BottomSheet`, reuse for the new mobile drawer (#7)

**Before launch (P2/P3):**
8. Fix `alt` text on real content images (#8)
9. Clean up dead imports and `app/dummy/` (#9, #10)
10. Replace placeholder brochure links and generic brand-solutions previews once real assets/content exist (#11, #12)

---

## Methodology Notes

Every finding above was verified against the actual source in this repository (`grep`/file reads), not inferred from the framework template alone — file paths and line references are given so each item can be checked or fixed directly. No user testing, analytics, or real traffic data was available for this pass; the "Impact" ratings are expert-judgment based on the stated target personas in `AGENTS.md`, not measured behavior. Recommend a short usability pass (5 users matching the procurement/SI persona, task: "find PV Lumens' Mumbai phone number" and "check if they carry Axis Communications") once the P0 fixes above ship, to validate before investing further in P2/P3 polish.
