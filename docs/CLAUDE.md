# Nexar Dispatch — project memory

Marketing site for a US truck dispatching company. One long-form landing page plus
/privacy, /terms, /carrier-agreement. Audience: US owner-operators and 1–5 truck fleets
(dry van, reefer, flatbed, step deck). The single conversion goal is a submitted
multi-step carrier consultation form.

## Commands

- `npm run dev` — dev server on :3000
- `npm run build` — MUST pass before any section counts as done
- `npm run lint` and `npx tsc --noEmit` — run both after a series of edits

## Stack rules

- Next.js App Router, TypeScript strict, Tailwind. No CSS-in-JS, no styled-components.
- Animation: **GSAP + ScrollTrigger** for anything scroll-driven. **Framer Motion** only for
  mount/exit transitions and hover micro-interactions. Never both on the same element.
- Icons: `lucide-react` only. No emoji in UI.
- Forms: react-hook-form + zod.
- Do not add a dependency without asking me first.

## Design law

Read `docs/design-system.md` before writing any UI. Then:

- Every color, radius, spacing and type value comes from the tokens. Never hardcode a hex
  in a component.
- Dark, restrained, industrial. The accent blue is a highlight, never a fill.
- **Banned — these read as generic AI output:** purple→blue gradient backgrounds, frosted
  glass on every card, cartoon or isometric truck illustrations, floating 3D blobs, cream +
  terracotta palettes, emoji icons, `shadow-2xl` everywhere, everything centered, three
  identical feature cards with a circle icon on top.
- Radius: 16–24px on cards and media, 8–10px on buttons and inputs. Never fully round.

## Content law

- **Never invent** statistics, testimonials, client names, ratings, or results. Metrics live
  in `data/metrics.ts` as clearly-marked placeholders. Testimonials read
  "Sample testimonial — replace with verified customer testimonial."
- Load board rows and route maps are illustrative. Each must carry a visible
  "Example load — not live freight data" label. Never imply a DAT or live integration.
- Copy is plain and operational, written for a driver, not for a VC. Short verbs, no
  "revolutionize", no "seamless", no "empower".

## Accessibility and motion — non-negotiable

- Semantic landmarks, visible focus rings, alt text, everything keyboard-operable.
- Every animation must be disabled or reduced under `prefers-reduced-motion: reduce`.
  Use the `useReducedMotion` hook — never a bare GSAP timeline.
- Animate `transform` and `opacity` only. Never animate width/height/top/left/box-shadow.
- Pause off-screen animations with IntersectionObserver. One GSAP ticker, no stray rAF loops.

## Workflow

- Work on ONE section per session. Do not touch files outside the section I named.
- For anything non-trivial, show me the plan before implementing.
- After edits: typecheck, build, then screenshot at 1440px and 390px and tell me what is
  wrong with the result before I ask.
- Commit after each section: `feat(hero): cinematic parallax scene`.

## Compact instructions

When compacting, preserve: the section being built, the tokens in use, the list of files
modified, and any decision I made about motion, copy, or asset strategy.
