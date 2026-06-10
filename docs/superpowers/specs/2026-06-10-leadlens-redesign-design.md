# LeadLens Redesign — Design Spec

**Date:** 2026-06-10
**Status:** Approved (visual brainstorming complete)

## Product positioning (must inform all copy)

LeadLens is a **diagnostic** tool. It **tells users what to fix** to improve conversion — it does **not** build, change, or execute anything for them. The user stays in control of what to change.

- **Primary surface:** websites (landing pages).
- **Also supported:** YouTube pages and Instagram pages. Input auto-detects platform (`platform-detector.ts`, `youtube-scraper.ts`, `instagram-scraper.ts` already exist).
- **Voice:** calm, confident, human, editorial. No "cyber"/aggressive language. Banned phrases: "Decrypt Report", "Agent Executing Protocol", "Audit Locked", "execute plays", "ships the fixes". Prefer: "See what's costing you conversions", "ranked by impact", "you decide what to change", "View full report".

## Visual direction — "Editorial Beige" (approved option B)

Light-first, magazine-like, premium. Derived from the LockIn2 palette + Arcade.software spacing/structure.

### Palette
| Token | Light (default) | Dark (toggle) |
|---|---|---|
| background | `#FDFBF7` beige | `#0A1128` midnight |
| foreground (ink) | `#111827` | `#FFFFFF` |
| card | `#FFFFFF` | `#121A38` |
| border | `#E8E4DB` | `rgba(255,255,255,0.08)` |
| muted surface | `#F3EFE7` | `#0E1730` |
| muted text | `#6B7280` | `#8B9BB4` |
| primary (buttons) | `#111827` ink | `#007BFF` blue |
| accent / brand | `#007BFF` | `#4DA3FF` |

Keep a tasteful dark theme so the existing `next-themes` toggle still works; **light is the default**.

### Typography (next/font/google)
- **Serif headlines:** Playfair Display (with italic accent word) → `--font-serif`.
- **Body / UI:** Inter → `--font-sans`.
- **Display/UI accent (labels, numerals):** Space Grotesk → `--font-display`.

### Shape & feel
- Cards: `rounded-3xl` (24px), 1px `border`, soft shadow, optional mouse-follow radial glow (port from LockIn2 `.card`).
- Primary CTAs: **pill** buttons (`rounded-full`), ink on light / blue on dark.
- Generous whitespace: 80–120px section rhythm. Subtle, polished motion (framer-motion already present) — no loud color-cycling gradients.
- **Remove** the rainbow `animate-cycle-colors` / `from-orange-400 via-pink-500 to-blue-500` treatments everywhere.

## Component approach

- Reuse existing shadcn primitives (`ui/button`, `ui/card`, `ui/input`, etc.); retune their tokens/variants to the new system rather than replacing the library.
- Pull marketing blocks (hero, logo cloud, feature rows, testimonial, pricing, CTA, footer) styled to match; where a 21st.dev block accelerates a section, adapt it into our token system (shadcn-compatible). No new heavy dependencies.
- Add a shared **Footer** component (none exists today) and a reusable **AuditInput** (URL field + platform affordances) used by hero and elsewhere.

## Homepage flow (approved)

1. Sticky minimal **Nav** (serif wordmark, Platform/Pricing/Solutions, "Start free" pill).
2. **Hero** — split: copy + `AuditInput` (Website/YouTube/Instagram, auto-detected) left; live "Conversion Score + Top fixes by impact" card right.
3. **Social proof** logo strip.
4. **Problem** — short editorial narrative ("most pages lose money where you can't see it").
5. **How it works** — 3 steps: Paste a link → AI audits → Ranked fixes.
6. **Features** — alternating text/screenshot rows (Arcade-style): revenue-ranked findings; fix-it guidance; multi-platform (web/YouTube/IG).
7. **Proof** — metrics + a testimonial quote.
8. **Pricing peek** — Free / Starter / Pro teaser (links to /pricing).
9. **Final CTA** — big serif "Run your first audit free".
10. **Footer** — rich (Product/Company/Resources/Legal).

## Scope — entire site, applied in waves

Same design system applied to every route. The existing flows/routes/data are preserved; structure/IA may improve where it clearly helps.

- **Wave 1 — Foundations:** tokens + fonts (`globals.css`, `layout.tsx`), retune `ui/button`/`ui/card`/`ui/input`, `Navigation`, new `Footer`, `ThemeToggle`, `AuditInput`.
- **Wave 2 — Homepage:** `HeroSection`, new `SocialProof`, `ProblemSolutionSection`, new `HowItWorks`, `FeaturesSection`, `ResultsSection`, new `PricingPeek`, `CTASection`.
- **Wave 3 — Marketing pages:** `/platform`, `/pricing`, `/solutions`, `/resources`, `/contact`.
- **Wave 4 — Auth:** `/auth`, `/login` (calm split layout; keep email-gate + signup flow).
- **Wave 5 — App:** `/results`, dashboard shell (`Sidebar`, `DashboardLayout`), `/dashboard`, `/dashboard/analytics`, `/dashboard/audits`, `/dashboard/help`, `/settings`, `ProfileDisplay` (recharts retinted to brand).

## Verification

- `npm run build` stays green after each wave.
- Visual check via Playwright screenshots of key routes (`/`, `/pricing`, `/auth`, `/dashboard`) at desktop + mobile widths.

## Non-goals

- No backend/API/data-model changes. No new auth. No copy that implies done-for-you execution.
