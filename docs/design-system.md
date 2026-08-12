# Nexar Dispatch — design system

Read this before writing any UI. Everything below is law; if a section spec conflicts with
this file, this file wins.

## The direction in one line

A dispatch console rendered as a brand site: night-highway dark, hairline structure, and
data set in mono the way it appears on a rate confirmation. Restraint everywhere except one
signature moment — the hero truck scene.

## Color

Tokens, not decoration. Each has one job.

| Token | Hex | Job |
|---|---|---|
| `--bg` | `#07111F` | Page base. The default. |
| `--surface` | `#0D1B2A` | Cards, panels, nav after scroll. |
| `--surface-2` | `#132436` | Hover/raised state of a surface. Derived, not from brief. |
| `--line` | `#1E3348` | Hairline borders. 1px. Never thicker. |
| `--line-bright` | `#2A4A68` | Border on hover/focus containers. |
| `--text` | `#FFFFFF` | Headings only. |
| `--text-body` | `#C7D3E0` | Body copy. Never pure white at body size. |
| `--text-muted` | `#7D8FA3` | Labels, captions, eyebrows, table headers. |
| `--paper` | `#F5F7FA` | The one light section (load board or FAQ) for rhythm. |
| `--accent` | `#2F80ED` | Primary action, active state, route line. |
| `--accent-2` | `#22D3EE` | Motion only — trailing edge of the route, moving indicators. |
| `--ok` | `#22C55E` | Status chips: matched, booked, delivered. |

Rules:

- Accent is used on **less than 5% of pixels** in any viewport. If a screenshot looks blue,
  it is wrong.
- No gradient may span more than one section, and no gradient may use two hues. The only
  allowed gradients are `--bg → --surface` vertical fades and a single radial glow behind
  the truck.
- Grain: one 2–3% opacity noise PNG or SVG turbulence over `--bg`, `pointer-events: none`,
  applied once at the layout level. Not per section.

## Type

Three roles. Assign them and never blur them.

- **Display** — Geist Sans (fallback Inter). Weights 600/700. Headings `h1`–`h3`.
  Tracking: `-0.03em` at 48px+, `-0.02em` at 32–48px, `0` below.
- **Body** — Inter. Weight 400/500. Max measure **62ch**. Line height 1.6.
- **Data** — Geist Mono (fallback JetBrains Mono). Weight 500. Used for **every number the
  business runs on**: rates, miles, $/mi, weights, DOT/MC numbers, step numbers, timestamps.
  Uppercase, `tracking-[0.08em]`, at 11–13px for eyebrows and table headers.

The mono is the personality of the page. A carrier reads rate cons all day; the numbers
should feel like they came off one.

Scale (clamp, mobile → desktop):

```
display-xl  clamp(2.75rem, 6vw, 5.25rem)   hero h1
display-l   clamp(2rem, 4vw, 3.25rem)      section h2
display-m   clamp(1.5rem, 2.4vw, 2rem)     card h3
body-l      1.125rem                        hero sub, section intro
body        1rem                             default
label       0.75rem  mono, uppercase, 0.08em tracking
```

## Layout

- 12-column grid, `max-width: 1280px`, gutters `clamp(1.25rem, 4vw, 4rem)`.
- **Asymmetry is the structure.** Sections alternate a 7/5 or 5/7 split. Do not center a
  section unless it is the final CTA.
- Persistent left rail on desktop ≥1280px: a 1px vertical hairline in `--line` with the
  section index set in mono (`01 / SERVICES`) pinned beside it. This is the numbering device
  — it earns its place because the page is a sequence: truck → load → route → delivery.
  Do not also number the service cards; one numbering system per page.
- Vertical rhythm: sections are `py-[clamp(5rem,10vw,9rem)]`. Never smaller — the page
  should breathe like a premium SaaS site, not a template.

## Surfaces

- Cards: `bg-surface`, `border border-line`, `rounded-[20px]`, no shadow at rest.
- Hover: border → `--line-bright`, background → `--surface-2`, `translateY(-2px)`,
  180ms. That is the whole hover language. No scale, no glow, no shadow bloom.
- Glass is allowed in exactly one place: the floating HUD cards over the hero scene.
  Everywhere else it is banned.

## Motion grammar

Durations and easings are fixed. Do not invent new ones per component.

```
instant   120ms   ease-out          focus rings, chip toggles
quick     180ms   cubic-bezier(.2,.7,.3,1)   hover, button press
base      420ms   cubic-bezier(.16,1,.3,1)   reveals, card enters
slow      900ms   cubic-bezier(.16,1,.3,1)   hero staging, route draw
```

- **Reveal pattern (the only one):** `opacity 0→1`, `translateY 16px→0`, stagger 60ms,
  triggered once at 75% viewport. No blur-in, no scale-in, no rotate-in.
- **Scroll-driven** work uses ScrollTrigger with `scrub: 0.6`. Never `scrub: true` (jitter).
- Parallax factors — sky 0.05, clouds 0.15, ridgeline 0.25, industrial silhouettes 0.40,
  road 0.70, truck 1.00, foreground grain 1.20.
- Under `prefers-reduced-motion: reduce`: parallax off, truck static in its end position,
  route line drawn instantly, reveals become plain opacity fades at 120ms. The page must
  still tell the whole story with zero movement.
- Mobile ≤768px: parallax layers collapse to sky + road + truck. No 3D. No mouse effects.

## Signature element

The hero truck scene, and nothing else competes with it. Every other section is deliberately
quieter than it. If a later section starts to feel as loud as the hero, cut something from
the later section.

## Quality floor (a section is not done until all of these hold)

- `npm run build` passes, `npx tsc --noEmit` clean.
- Renders correctly at 390 / 768 / 1280 / 1440 / 1920.
- Keyboard tab order is sane, focus visible on `--bg`.
- Text contrast ≥ 4.5:1 for body, ≥ 3:1 for large display.
- Reduced-motion path tested by toggling the OS setting, not by reading the code.
- No layout shift on load (reserve height for the scene and any media).
