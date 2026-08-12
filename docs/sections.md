# Nexar Dispatch — section specs

One block per section. Reference a single block per session with `@docs/sections.md#hero`
style pointers in your prompt — never ask for two blocks at once.

Global copy rules: plain operational language, no invented numbers, every illustrative
figure labelled. CTAs are always "Get Started" (primary) and "Talk to a Dispatcher"
(secondary), in that order.

---

## nav

Transparent over hero, `--surface` + 1px bottom `--line` + backdrop blur after 80px scroll.
Links: Services, How It Works, Equipment, About, FAQ. Right: "Get Started" button.
Mobile: full-screen panel, links stagger in at 40ms, CTA pinned to the bottom safe area.
Sticky mobile CTA bar appears after the hero leaves the viewport and hides at the footer.
Done when: no layout shift on the scroll-state change, menu traps focus and closes on Esc.

## hero

The signature. Left column (7 cols): mono eyebrow `TRUCK DISPATCHING • BUILT FOR
OWNER-OPERATORS`, h1 "Keep Your Trucks Moving. / We Handle the Rest.", one supporting
paragraph, two CTAs, and a thin trust strip of equipment types in mono.
Right/behind: the parallax truck scene (see `docs/truck-scene.md` once written).
Staging on load: eyebrow → h1 lines (clip-reveal per line, 90ms apart) → paragraph → CTAs →
scene fades up. Total under 1.4s. Scene renders first paint static; motion starts after.
Floating HUD cards over the scene, appearing at 1.1s: `LOAD FOUND`, `$3,250`, `1,012 MI`,
`$3.21/MI`, each with the label `Example load`.
Done when: LCP element is the h1, hero is legible with JS disabled, reduced-motion shows
the final composed frame.

## trust-bar

Full-bleed strip directly under the hero, `--surface`, hairlines top and bottom.
Mono label: `BUILT FOR CARRIERS WHO WANT TO KEEP MOVING`. Then six items: Owner Operators,
Small Fleets, Dry Van, Reefer, Flatbed, Step Deck — each a 20px lucide icon plus label.
Motion: opacity stagger only, 40ms. On mobile it becomes a slow marquee, paused for
reduced motion and on hover.

## problem

Headline: "Your Truck Should Be Moving. / Not Sitting While You Search for Loads."
5/7 split. Left: a still, dimmed variant of the truck asset with a slow idle exhaust shimmer
and a mono counter reading `TIME SPENT NOT DRIVING`. Right: seven friction lines — load
board hours, broker calls, rate negotiation, deadhead miles, paperwork, route planning,
missed loads — each a row with a hairline divider, not a card.
Motion: rows reveal on scroll with the standard pattern. Nothing else moves.

## solution

Headline: "We Keep Your Operation Moving."
Horizontal five-stage flow: Load Search → Rate Negotiation → Booking → Paperwork → Delivery.
Desktop: pinned section, the stages advance as a small truck marker travels the connector
line on scrub. Mobile: vertical stepper, no pin, reveal per stage.
Each stage: mono index, title, one sentence. Done when the pin releases cleanly with no
scroll jump and the section is fully readable when reduced motion is on.

## services

Eight cards, 4-up desktop / 2-up tablet / 1-up mobile. Load Search, Rate Negotiation,
Broker Communication, Load Booking, Route Planning, Document Management, Detention &
Layover Assistance, Back-Office Dispatch Support.
Card: lucide icon at 20px in `--accent`, title, two-line explanation. Hover per the design
system only. Do not number these cards — the left rail already carries the page numbering.

## equipment

"Dispatching Built Around Your Equipment". Six cards: Dry Van, Reefer, Flatbed, Step Deck,
Box Truck, Other Equipment. Each shows a side-elevation SVG silhouette of that trailer type
drawn from the same asset family as the hero truck.
Hover: silhouette translates +8px on X, border brightens, background steps to `--surface-2`.
That is the entire interaction. Done when all six silhouettes share one visual weight and
line width.

## how-it-works

Eight-step interactive timeline: Tell Us About Your Truck / We Understand Your Lanes / We
Search Available Freight / We Negotiate the Rate / You Approve the Load / We Handle the
Paperwork / You Deliver / We Keep You Moving.
Desktop: vertical timeline with a progress line that fills on scrub and a truck marker that
rides it. Step content activates as the marker passes. Mobile: plain numbered list with
reveals. Steps are keyboard-focusable and readable without scroll.

## load-board

Label the section "How We Find the Right Freight". Simulated board in `--paper` for
contrast, styled like a real load board: mono columns, hairline rows, sticky header.
Rows: Dallas TX → Chicago IL / Dry Van / 1,012 mi / $3,250 / $3.21 per mi; Atlanta GA →
Charlotte NC / Reefer / 245 mi / $1,050 / $4.29 per mi; Phoenix AZ → Denver CO / Dry Van /
865 mi / $2,750 / $3.18 per mi.
Motion: rows enter 80ms apart, then one row gets a `LOAD MATCHED` chip in `--ok` and a small
truck glyph animates origin → destination on that row. Loop with a 6s pause; stop when the
section is off-screen.
Persistent disclaimer directly under the table: "Example loads for illustration. Not live
freight data."

## route-map

Accurate US map — TopoJSON from `us-atlas`, rendered with `d3-geo` `geoAlbersUsa`. Never
hand-draw state paths and never let coordinates be guessed; city lat/lng live in
`data/lanes.ts`.
Three example lanes animate in sequence: Texas → Midwest, Florida → Northeast,
California → Arizona. Each draws with a stroke-dashoffset tween in `--accent` fading to
`--accent-2` at the head, with a dot marker travelling the path and pickup / in transit /
delivery labels appearing at the right moments.
Only two lanes animate concurrently. Pause when off-screen. Reduced motion: all three lanes
drawn statically with their labels visible.

## why-nexar

"More Than a Dispatcher. / Your Operations Partner." Seven benefits: Dedicated Support,
Load Research, Rate Negotiation, Broker Communication, Transparent Communication, Flexible
Dispatching, Carrier-First Approach.
Layout: 7/5 split, benefits as a hairline-divided list on one side, a single quiet visual on
the other. No card grid here — the page already has two.

## metrics

Three figures, count-up on first view only, values imported from `data/metrics.ts` so they
are configurable in one place: `500+` Carrier Prospects, `24/7` Operational Support,
`100%` Focus on Carrier Growth.
These are placeholders. Keep them in a file with a comment saying so. Do not add any figure
that implies delivered revenue, load volume, or customer count.

## testimonials

Three cards, each containing placeholder body copy and the literal line
"Sample testimonial — replace with verified customer testimonial." No names, no photos, no
company logos, no star ratings. Attribution shows equipment type and lane only, e.g.
"Owner-operator · Dry Van · TX–IL".

## faq

Nine questions from the brief, accordion built on native `<details>`/`<summary>` or a
headless disclosure with correct `aria-expanded`. One open at a time, 220ms height
transition, chevron rotates 180°.
Answers are 2–4 sentences, honest, and never quote a price — the pricing answer explains the
commission model in general terms and routes to the consultation.

## cta

"Ready to Keep Your Truck Moving?" plus the two buttons. Background: dark highway at night,
built as layered vector — road, lane markings, and two headlight cones approaching the
viewer with a slow additive glow bloom. No photograph.
This is the second loudest moment on the page and still quieter than the hero.

## contact-form

Three steps, progress indicator in mono. Step 1 Your Information: name, company, phone,
email. Step 2 Your Operation: USDOT, MC, number of trucks, equipment (multi-select chips).
Step 3 Your Goals: preferred lanes, current challenges, message.
react-hook-form + zod, validation per step, state preserved when moving back, inline errors
tied with `aria-describedby`, focus moves to the step heading on advance. Submit button
reads "Request Dispatch Consultation". Confirmation state replaces the form and states what
happens next and when.

## footer

Logo, one-paragraph description, columns for Services / Equipment / Company (About,
Contact, FAQ) / Legal (Privacy Policy, Terms, Carrier Agreement). Email, phone, socials,
copyright. Note that Nexar Dispatch is a dispatch service, not a broker or carrier.
