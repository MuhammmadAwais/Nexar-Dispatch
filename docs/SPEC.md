# Nexar Dispatch — Final Build Specifications

This document captures the final technical decisions, build order, and remaining open questions for the Nexar Dispatch marketing site. This bridges the gap between the initial design brief and the actual build execution.

## 1. Technical Decisions & Refinements

Based on our consultation, we have solidified the following architectural and design behaviors:

*   **Hero Scroll Behavior:** The hero will **not** use harsh scroll-jacking (pinning). Instead, it will scroll away naturally as the user moves down the page, while the parallax layers (sky, clouds, road, truck, grain) move at their distinct speeds. This delivers a premium, cinematic feel without frustrating the user's scroll intent.
*   **Mobile Steppers (Solution & How It Works):** To maintain elegance on small viewports, the desktop truck marker is removed on mobile. We will fall back to a clean, vertical line that fills on scroll alongside numbered steps, ensuring readability over gimmicks.
*   **Left Rail Positioning:** The persistent left rail (desktop ≥1280px) is integrated directly into the `max-width: 1280px` 12-column grid. It will occupy Column 1, leaving the remaining 11 columns for the asynchronous 7/5 or 5/7 content splits.
*   **Form Submissions:** The 3-step carrier consultation form (react-hook-form + zod) will post to a Next.js App Router API endpoint. This endpoint will route the lead via email (e.g., Resend) and store the submission in a lightweight database (Vercel Postgres).
*   **Hosting & Analytics:** The site will be deployed on Vercel. We will use Vercel Web Analytics (or Plausible) for lightweight, privacy-friendly visitor tracking without the overhead of GA4.
*   **Route Map (D3 & TopoJSON):** We will adhere to the `us-atlas` and `d3-geo` spec, but the map component will be dynamically imported on the client-side (`next/dynamic` with `ssr: false`). This guarantees we avoid SSR hydration errors and bundle bloat on initial page load.

## 2. Build Order

The project must be built in logical layers to ensure animations and layouts stack predictably. 

### Phase 1: Foundation (Design System)
1. Initialize Tailwind config (custom colors, radius, typographies: Geist Sans, Inter, Geist Mono).
2. Setup the global layout wrapper: 12-column grid, persistent left rail, and the background noise/grain SVG overlay.
3. Configure GSAP and ScrollTrigger, including the global `prefers-reduced-motion` hook.

### Phase 2: The Signature & Trust
1. **Nav:** Build the transparent-to-solid navigation header.
2. **Hero:** Implement the sequential entry animation (eyebrow → h1 → paragraphs → scene fades up) and the HUD cards. Construct the parallax scroll behavior.
3. **Trust Bar:** Build the scrolling marquee (mobile) / static stagger (desktop) immediately below the hero.

### Phase 3: The Core Flow
1. **Problem:** Horizontal split, scroll-triggered reveals, idle truck asset.
2. **Solution:** 5-stage horizontal flow with ScrollTrigger pinning (desktop) and vertical stepper (mobile).
3. **How it Works:** 8-step timeline with the animated truck marker following the path.

### Phase 4: Data & Geography
1. **Services & Equipment:** Build the 8-up and 6-up card grids with exact hover states (border brightening, background step).
2. **Load Board:** Build the simulated rate con table with the moving truck glyph and "LOAD MATCHED" state chips.
3. **Route Map:** Implement the client-side D3 US map and animate the three distinct lanes sequentially.

### Phase 5: Authority & Footer
1. **Why Nexar & Metrics:** Implement the 7/5 split and count-up animations (tied to `data/metrics.ts`).
2. **Testimonials & FAQ:** Build the headless disclosure accessible accordion.
3. **Final CTA:** Construct the vector night-highway approaching headlights scene.
4. **Form & Footer:** Build the 3-step validation form, confirmation state, and final footer structure.

### Phase 6: Polish
1. Comprehensive cross-browser and responsive testing (390, 768, 1280, 1440).
2. Keyboard accessibility sweep and semantic HTML check.
3. Final visual polish ensuring the "hero scene is the loudest moment" rule holds true.

## 3. Open Questions

While the path is clear, a few minor questions remain open for when we reach specific milestones:

*   **Email Templates:** When configuring Resend/SendGrid, do we need to build a branded HTML email template for the internal dispatcher notification, or is plain text sufficient?
*   **Vercel Postgres Schema:** Should the database capture analytics properties (like referrer URL or UTM parameters) alongside the form submission, or just the explicit form fields?
*   **Contact Form Edge Cases:** If an Owner-Operator selects "Other Equipment" in the form, do we require a free-text input field to specify the equipment type?

*(End of spec. Await instruction before beginning Phase 1).*
