# vibecode.tours — Dark Forge Redesign

**Date:** 2026-05-30
**Scope:** Full redesign of vibe-code-tours-site (Astro + Tailwind)
**Approach:** Dark Forge — Vercel-style dark UI with amber glow accents

## Decision Summary

- **Replace** existing light-theme site in-place (same repo, same Astro stack)
- **Design:** Dark mode (#09090b), dot grid bg, amber gradient text, glow accents
- **Goal:** Marketing-first — attract new cohorts, conversion-focused
- **Language:** Bilingual EN/MY preserved
- **Email:** ai@vibecode.tours
- **Domain:** vibecode.tours

## Design System

### Colors

Dark base with amber accent ramp (existing brand tokens preserved):

| Token          | Hex         | Use                            |
| -------------- | ----------- | ------------------------------ |
| bg-base        | `#09090b`   | Page background                |
| bg-card        | `#0f0f11`   | Card/section backgrounds       |
| bg-elevated    | `#18181b`   | Nav, footer, elevated surfaces |
| border-subtle  | `#ffffff0a` | Default card/section borders   |
| border-hover   | `#f59e0b22` | Hover state borders            |
| accent-500     | `#f59e0b`   | Primary buttons, stat numbers  |
| accent-600     | `#d97706`   | Button hover                   |
| accent-700     | `#b45309`   | Links on dark                  |
| text-primary   | `#ffffff`   | Headings                       |
| text-secondary | `#888888`   | Body text, descriptions        |
| text-muted     | `#555555`   | Tertiary info                  |
| tier-a-bg      | `#ffffff0a` | Tier A pill                    |
| tier-a-text    | `#888888`   |                                |
| tier-b-bg      | `#3b82f611` | Tier B pill                    |
| tier-b-text    | `#60a5fa`   |                                |
| tier-c-bg      | `#f59e0b11` | Tier C pill                    |
| tier-c-text    | `#f59e0b`   |                                |

### Typography

- **Headings:** Inter (800/900 weight), gradient fill on hero
- **Body:** Inter (400/500)
- **Code/tags:** JetBrains Mono (monospace for hashtag pills, chapter numbers)
- **Burmese:** Pyidaungsu / Noto Sans Myanmar (unchanged from current)

### Effects

- Dot grid background: `radial-gradient(circle at 1px 1px, #ffffff08 1px, transparent 0)` at 24px
- Amber glow: `box-shadow: 0 0 30px #f59e0b22` on primary buttons
- Card top-line: `linear-gradient(90deg, transparent, #f59e0b22, transparent)` on hover
- Hero radial glow: subtle amber radial behind headline
- Pulse dot on cohort status badge
- Hover: `translateY(-2px)` + border-color transition on cards

## Page Structure

### Homepage (index)

1. **Nav** — Logo (`vibecode.tours`), links (Curriculum, About, Team, FAQ), EN/MY switch, Apply CTA button
2. **Hero** — Cohort status badge (pulse dot), gradient headline "Master AI-First Development", stats line, subtitle, dual CTA (Apply / View Curriculum), hashtag pills (#VibeCode #AI #DEV #MCP #AGENT #SKILL)
3. **Features** — 6 cards in 3-col grid: Claude Code, MCP Ecosystem, Agents & Skills, Ship to Production, Tool Landscape, Team Build Sprint
4. **Curriculum Roadmap** — 9 chapter cards in 3-col grid with chapter numbers (JetBrains Mono), tier pills
5. **Social Proof** — Stats bar: 185+ builders, 9 chapters, 36h hands-on, $0 cost
6. **Final CTA** — Gradient border box, "Ready to Vibe Code?" + Apply button
7. **Footer** — Copyright, ai@vibecode.tours, legal links

### Other Pages (existing, reskinned to dark)

- `/curriculum` — Card grid (restyled dark)
- `/curriculum/[chapter]` — Chapter detail (restyled dark)
- `/about` — Beliefs + "what we're NOT" (restyled dark)
- `/team` — Instructor card (restyled dark)
- `/apply` — Application form/status (restyled dark)
- `/faq` — FAQ accordion (restyled dark)
- `/contact` — Role-based emails (restyled dark)
- `/sponsors` — Sponsorship tiers (restyled dark)
- `/setup` — Pre-class setup guide (restyled dark)
- `/legal/*` — Terms, Privacy, CoC (restyled dark)
- `/my/*` — Myanmar language mirrors of all above

## Tech Stack

- **Framework:** Astro (existing, no change)
- **Styling:** Tailwind CSS (existing, config updated for dark tokens)
- **Fonts:** Inter + JetBrains Mono (Google Fonts) + Pyidaungsu/Noto Sans Myanmar (self-hosted)
- **i18n:** Existing EN/MY system preserved
- **Data:** `src/data/chapters.ts` (existing, no change)
- **Build:** Static output (existing)

## Implementation Approach

1. Update `tailwind.config.mjs` with dark color tokens
2. Restyle `Base.astro` layout — dark bg, dot grid, font imports
3. Redesign `Header.astro` — dark nav with amber CTA
4. Redesign `Footer.astro` — dark footer with ai@vibecode.tours
5. Rebuild `HomeBody.astro` — full new hero + features + roadmap + proof + CTA sections
6. Restyle all `*Body.astro` components for dark theme
7. Update `ChapterCard.astro` — dark card with amber accents + tier pills
8. Add JetBrains Mono font import
9. Test bilingual (EN/MY) rendering on dark backgrounds
10. Verify WCAG AA contrast on all text-on-dark combinations

## Constraints

- No client-side JavaScript frameworks (Astro static)
- Burmese text must remain readable (no monospace for body, adequate line-height)
- WCAG AA contrast minimum on all text
- Lighthouse-friendly (no heavy animations beyond CSS transitions)
- Existing i18n system and page routing preserved
- Existing `chapters.ts` data untouched

## Mockup Reference

Full homepage mockup at `.superpowers/brainstorm/291517-1780130293/content/homepage-layout.html`
