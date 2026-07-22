<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know
# AGENTS.md

# PV Lumens Website

**Project Type**

* Next.js 15
* React 19
* TypeScript
* Tailwind CSS
* App Router

---

# Objective

Build a premium, enterprise-grade B2B website for **PV Lumens India Pvt Ltd**, one of India's leading Value Added Distributors (VAD).

The website should communicate trust, scale, technical expertise, and reliability while remaining extremely fast, accessible, and easy to maintain.

Every implementation should prioritize:

* Performance
* Scalability
* Accessibility
* Maintainability
* Reusability
* Clean architecture

---

# Design Philosophy

The website should feel like:

* Cisco
* Schneider Electric
* Honeywell
* Siemens
* IBM

NOT like:

* Consumer ecommerce
* Startup landing pages
* Heavy SaaS dashboards

Visual language should communicate:

* Trust
* Engineering
* Infrastructure
* Enterprise
* Precision

---

# Development Principles

## Rule 1

Never create large files.

Target:

* Components <250 lines
* Hooks <150 lines
* Pages <80 lines

Split when necessary.

---

## Rule 2

Pages never contain UI.

Pages compose fragments only.

Example

app/about/page.tsx

↓

imports

* Hero
* Story
* VisionMission
* Leadership
* CTA

Nothing else.

---

## Rule 3

Every page owns a fragments folder.

Example

app/about/

page.tsx

fragments/

Hero.tsx

Stats.tsx

Vision.tsx

Awards.tsx

CTA.tsx

---

## Rule 4

Shared components belong inside

components/

Never duplicate UI.

---

## Rule 5

Every feature should have a single responsibility.

Never create "God Components."

---

## Rule 6

Always prefer composition over complexity.

Small reusable blocks are preferred over one massive component.

---

# Folder Structure

```
app/
    layout.tsx
    page.tsx

    about/
        page.tsx
        fragments/

    industry/
        page.tsx
        fragments/

    solutions/
        page.tsx
        fragments/

    brands/
        page.tsx
        fragments/

    products/
        page.tsx
        fragments/

    resources/
        page.tsx
        fragments/

    contact/
        page.tsx
        fragments/

components/
    ui/
    layout/
    cards/
    sections/
    forms/
    navigation/

lib/
    constants/
    data/
    utils/

hooks/

types/

styles/

public/
    images/
    icons/
    logos/
```

---

# Naming Rules

Components

PascalCase

```
Hero.tsx
PartnerGrid.tsx
BrandCard.tsx
```

Hooks

```
useScroll.ts
useCounter.ts
```

Utilities

```
formatDate.ts
cn.ts
```

---

# Styling Rules

* Tailwind only
* No inline styles
* No !important
* Use design tokens
* Mobile first
* Semantic spacing
* Consistent radius
* Consistent shadows

---

# Performance Rules

* Lazy load heavy sections
* Optimize every image
* Use next/image
* Use next/font
* Avoid unnecessary client components
* Prefer Server Components
* Dynamic import when appropriate
* No unnecessary re-renders

---

# Accessibility

Every component must include:

* keyboard support
* focus states
* semantic HTML
* aria labels where needed
* alt text
* sufficient color contrast

---

# Animations

Use Framer Motion sparingly.

Animations should feel:

* premium
* smooth
* subtle

Avoid:

* bouncing
* spinning
* flashy effects

Motion should support the content, not distract from it.

---

# Code Standards

Always

* TypeScript
* Strict typing
* No any
* Functional components
* Reusable logic
* Early returns
* Descriptive names

---

# Data

Static content should live in

```
lib/data
```

Never hardcode repeated content inside components.

---

# Images

Organize assets by category.

```
public/

logos/

brands/

industries/

awards/

hero/

icons/
```

---

# SEO

Every page must include:

* title
* description
* Open Graph
* Twitter metadata
* canonical URL where applicable

---

# Quality Checklist

Before marking any task complete:

* No TypeScript errors
* No ESLint warnings
* Responsive
* Accessible
* Optimized
* Reusable
* Clean imports
* No duplicate code
* No console logs
* Production ready

---

# AI Instructions

When making changes:

1. Understand existing architecture first.
2. Reuse components whenever possible.
3. Never rewrite unrelated code.
4. Keep commits focused.
5. Preserve consistency across all pages.
6. Prefer maintainability over cleverness.
7. If a component becomes too large, split it.
8. Do not introduce unnecessary dependencies.
9. Follow this document before generating code.
10. Treat this repository as production software.

<!-- END:nextjs-agent-rules -->
