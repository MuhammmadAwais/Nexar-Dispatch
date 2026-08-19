# Performance Optimization Plan

Based on the static analysis of the Nexar Dispatch repository, here is the strict, sequential plan to achieve lightning-fast Core Web Vitals (LCP, INP, CLS) without altering the visual design or functionality.

## Phase 1: Asset Cleanup & Dead Code Removal

**1. Remove Unused React Components & Hooks**
The following files are defined but never imported or used in the application. They can be safely deleted to reduce repository bloat:
- `src/components/TruckScene.tsx`
- `src/hooks/useInView.ts` (Note: `MobileProcessStack` imports `useInView` from `framer-motion`, making this custom hook redundant)
- `src/hooks/useParallax.ts`
- `src/hooks/useScrollProgress.ts`

**2. Optimize High-Impact Static Assets**
The following images are massive and will severely impact LCP (Largest Contentful Paint) and overall load times:
- `public/road-bg.png` (7.7 MB)
- `public/truck-sideView.png` (1.9 MB)
- `public/new-hero.webp` (1.8 MB)
- `public/text-bg-image.png` (1.6 MB)
*Action:* Compress these assets aggressively and ensure Next.js `<Image>` components are loading them with proper `sizes` and `priority` attributes where needed. Convert PNGs to modern formats (WebP/AVIF).

**3. Remove Unused Dependencies**
The following packages are installed but not utilized in the codebase. Removing them will speed up install times and reduce the chance of bundle inclusion:
- `zod`, `react-hook-form`, `@hookform/resolvers`
- `d3-geo`, `topojson-client`, `us-atlas`
- `geist`

---

## Phase 2: Next.js Bundle Splitting

**1. Dynamic Imports for Heavy Sections**
- Lazily load the 3D `<Canvas>` (e.g., `ContactExperience.tsx` and `Computer.tsx`) using `next/dynamic` so the Three.js library doesn't block the main thread on initial page load.
- Dynamically import "below the fold" sections like `ServicesShowcase`, `RoadJourney`, and mobile equivalents.

---

## Phase 3: GSAP Render Optimization

**1. Standardize and Scope GSAP Instances**
- In `src/components/sections/Hero.tsx`, GSAP is manually scoped using `gsap.context(...)` and cleaned up with `ctx.revert()`. This should be migrated to `@gsap/react`'s `useGSAP()` hook for better React 18+ strict mode safety and consistency across the app.
- In mobile components like `MobileHowItWorks.tsx` and `MobileRoadJourney.tsx`, multiple `ScrollTrigger` instances are created inside `useGSAP`. We will verify their dependency arrays and ensure they don't cause memory leaks upon re-renders.

**2. Composite Layer Animations**
- Ensure all GSAP animations strictly animate `transform` and `opacity` properties (using `x`, `y`, `scale`) to leverage GPU acceleration, preventing layout thrashing and main-thread blocking.

---

## Phase 4: 3D WebGL Optimization

**1. Main Thread Blocking in Canvas**
- The `<Canvas>` in `src/components/sections/contact/ContactExperience.tsx` lacks a `frameloop` property, meaning it defaults to rendering 60 times a second even when nothing is animating.
*Action:* Add `frameloop="demand"` to the Canvas so it only renders when the `OrbitControls` are interacted with. This will massively improve INP (Interaction to Next Paint) and battery life.

**2. Redundant Cleanup**
- `ContactExperience.tsx` contains a custom `<WebGLCleaner />` component that manually traverses the scene to call `.dispose()` on geometries and materials on unmount. React Three Fiber already handles memory disposal for non-cached elements when the Canvas is unmounted. We will remove this to prevent race conditions or unexpected crashes.

---

**Please review this plan. Once approved, I will proceed with Phase 1.**
