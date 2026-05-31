# Dark Forge Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reskin the vibe-code-tours-site from light theme to Dark Forge (dark #09090b, amber glow accents, dot grid, Vercel-style) while preserving all content, i18n, and page structure.

**Architecture:** In-place reskin of existing Astro + Tailwind site. No new pages, no new data sources, no structural changes. Update tailwind config tokens, global CSS, then each component. All changes are visual — Tailwind classes swap from light to dark equivalents.

**Tech Stack:** Astro, Tailwind CSS, Inter + JetBrains Mono (Google Fonts), Pyidaungsu/Noto Sans Myanmar (self-hosted)

---

## File Map

| Action | File                                     | Responsibility                                                 |
| ------ | ---------------------------------------- | -------------------------------------------------------------- |
| Modify | `tailwind.config.mjs`                    | Add dark color tokens, JetBrains Mono font family              |
| Modify | `src/styles/global.css`                  | Dark base styles, new component classes, JetBrains Mono import |
| Modify | `src/layouts/Base.astro`                 | Dark body class, Google Fonts link tag                         |
| Modify | `src/components/Header.astro`            | Dark nav with amber CTA                                        |
| Modify | `src/components/Footer.astro`            | Dark footer with ai@vibecode.tours                             |
| Modify | `src/components/HomeBody.astro`          | Full redesign: hero + features + roadmap + proof + CTA         |
| Modify | `src/components/ChapterCard.astro`       | Dark card with amber accents                                   |
| Modify | `src/components/CurriculumBody.astro`    | Dark curriculum page                                           |
| Modify | `src/components/AboutBody.astro`         | Dark about page                                                |
| Modify | `src/components/FaqBody.astro`           | Dark FAQ page                                                  |
| Modify | `src/components/ApplyBody.astro`         | Dark apply page                                                |
| Modify | `src/components/TeamBody.astro`          | Dark team page                                                 |
| Modify | `src/components/SponsorsBody.astro`      | Dark sponsors page                                             |
| Modify | `src/components/ContactBody.astro`       | Dark contact page                                              |
| Modify | `src/components/SetupBody.astro`         | Dark setup page                                                |
| Modify | `src/components/ChapterDetailBody.astro` | Dark chapter detail page                                       |
| Modify | `src/components/CocBody.astro`           | Dark CoC page                                                  |
| Modify | `src/components/TermsBody.astro`         | Dark terms page                                                |
| Modify | `src/components/PrivacyBody.astro`       | Dark privacy page                                              |
| Modify | `src/components/LegalNotice.astro`       | Dark legal notice banner                                       |

---

### Task 1: Tailwind Config — Dark Tokens + JetBrains Mono

**Files:**

- Modify: `tailwind.config.mjs`

- [ ] **Step 1: Update tailwind.config.mjs with dark color tokens and mono font**

Replace the entire `tailwind.config.mjs` with:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}"],
  theme: {
    extend: {
      colors: {
        accent: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },
        surface: {
          base: "#09090b",
          card: "#0f0f11",
          elevated: "#18181b",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "Pyidaungsu",
          "Noto Sans Myanmar",
          "sans-serif",
        ],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
        my: ["Pyidaungsu", "Noto Sans Myanmar", "system-ui", "sans-serif"],
      },
      maxWidth: {
        prose: "70ch",
      },
      borderColor: {
        subtle: "#ffffff0a",
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 2: Verify config is valid**

Run: `cd /home/kokoye2007/projects/git/ai/bootcamp-tour-curriculum/vibe-code-tours-site && npx tailwindcss --help > /dev/null 2>&1 && echo "OK"`
Expected: OK (no parse errors)

- [ ] **Step 3: Commit**

```bash
git add tailwind.config.mjs
git commit -m "feat: add dark color tokens and JetBrains Mono to tailwind config"
```

---

### Task 2: Global CSS — Dark Base Styles

**Files:**

- Modify: `src/styles/global.css`

- [ ] **Step 1: Replace global.css with dark theme base styles**

Replace the entire `src/styles/global.css` with:

```css
@import "@fontsource/noto-sans-myanmar/400.css";
@import "@fontsource/noto-sans-myanmar/600.css";
@import "@fontsource/noto-sans-myanmar/700.css";

@font-face {
  font-family: "Pyidaungsu";
  src:
    local("Pyidaungsu"),
    url("/fonts/pyidaungsu/Pyidaungsu-Regular.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "Pyidaungsu";
  src:
    local("Pyidaungsu Book"),
    local("Pyidaungsu"),
    url("/fonts/pyidaungsu/Pyidaungsu-Bold.woff2") format("woff2");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    color-scheme: dark;
  }
  html {
    scroll-behavior: smooth;
  }
  body {
    @apply bg-surface-base text-gray-300 antialiased;
    background-image: radial-gradient(
      circle at 1px 1px,
      #ffffff08 1px,
      transparent 0
    );
    background-size: 24px 24px;
  }
  html[lang="my"] body {
    @apply font-my leading-relaxed;
  }
  a {
    @apply text-accent-500 underline-offset-2 hover:text-accent-400;
  }
  h1,
  h2,
  h3 {
    @apply font-bold tracking-tight text-white;
  }
  :where(
    a,
    button,
    [role="button"],
    summary,
    .card,
    input,
    select,
    textarea
  ):focus-visible {
    @apply rounded-md outline-none ring-2 ring-accent-500 ring-offset-2 ring-offset-surface-base;
  }
}

@layer components {
  .container-prose {
    @apply mx-auto w-full max-w-3xl px-5 sm:px-6;
  }
  .btn {
    @apply inline-flex items-center justify-center rounded-lg px-5 py-3 text-base font-semibold no-underline transition;
  }
  .btn-primary {
    @apply bg-accent-500 font-bold text-black hover:bg-accent-600;
    box-shadow: 0 0 30px #f59e0b22;
  }
  .btn-primary:hover {
    box-shadow: 0 0 40px #f59e0b33;
  }
  .btn-secondary {
    @apply border border-white/10 bg-transparent text-gray-300 hover:border-accent-500/30 hover:text-white;
  }
  .card {
    @apply block rounded-xl border border-white/5 bg-surface-card p-6 no-underline transition;
  }
  .card:hover {
    @apply -translate-y-0.5 border-accent-500/20;
  }
  .tier {
    @apply inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold;
  }
  .tier-a {
    @apply bg-white/5 text-gray-500;
  }
  .tier-b {
    background: #3b82f611;
    @apply text-blue-400;
    border: 1px solid #3b82f622;
  }
  .tier-c {
    background: #f59e0b11;
    @apply text-accent-500;
    border: 1px solid #f59e0b22;
  }
  .section-label {
    @apply text-center text-xs font-bold uppercase tracking-widest text-accent-500;
  }
}
```

- [ ] **Step 2: Verify CSS compiles**

Run: `cd /home/kokoye2007/projects/git/ai/bootcamp-tour-curriculum/vibe-code-tours-site && npx astro build 2>&1 | tail -5`
Expected: Build succeeds (may show warnings, but no errors)

- [ ] **Step 3: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: dark theme global CSS with dot grid and amber accents"
```

---

### Task 3: Base Layout — Dark Body + Font Import

**Files:**

- Modify: `src/layouts/Base.astro`

- [ ] **Step 1: Update Base.astro**

Replace the entire `src/layouts/Base.astro` with:

```astro
---
import "../styles/global.css";
import Header from "../components/Header.astro";
import Footer from "../components/Footer.astro";
import { getLocale, type Locale } from "../i18n/utils";

interface Props {
  title: string;
  description: string;
  ogImage?: string;
}

const { title, description, ogImage } = Astro.props;
const locale: Locale = getLocale(Astro.url.pathname);
const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, "") + "/";

const canonical = new URL(Astro.url.pathname, Astro.site ?? Astro.url).href;
const ogImageUrl = new URL(
  ogImage ?? `${baseUrl}og-default.png`,
  Astro.site ?? Astro.url,
).href;
---

<!doctype html>
<html lang={locale}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href={`${baseUrl}favicon.svg`} type="image/svg+xml" />
    <link rel="canonical" href={canonical} />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap"
      rel="stylesheet"
    />

    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="theme-color" content="#09090b" />

    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={ogImageUrl} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={canonical} />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={ogImageUrl} />
  </head>
  <body class="flex min-h-screen flex-col">
    <Header />
    <main class="flex-1">
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add src/layouts/Base.astro
git commit -m "feat: dark base layout with Google Fonts and theme-color meta"
```

---

### Task 4: Header — Dark Nav

**Files:**

- Modify: `src/components/Header.astro`

- [ ] **Step 1: Replace Header.astro with dark nav**

Replace the entire `src/components/Header.astro` with:

```astro
---
import {
  t,
  getLocale,
  localizedPath,
  altLocaleHref,
  type Locale,
} from "../i18n/utils";

const locale: Locale = getLocale(Astro.url.pathname);
const s = t(locale);
const altHref = altLocaleHref(Astro.url.pathname);
const altLabel = s.meta.altLangLabel;

const nav = [
  { href: "/curriculum", label: s.nav.curriculum },
  { href: "/about", label: s.nav.about },
  { href: "/team", label: s.nav.team },
  { href: "/faq", label: s.nav.faq },
];
---

<header class="border-b border-white/5">
  <div
    class="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-6"
  >
    <a
      href={localizedPath("/", locale)}
      class="flex items-center gap-2 text-lg font-black tracking-tight text-white no-underline hover:text-accent-500"
    >
      <img
        src={`${import.meta.env.BASE_URL}favicon.svg`}
        alt=""
        width="28"
        height="28"
        class="rounded-md"
      />
      <span>vibe<span class="text-accent-500">code</span>.tours</span>
    </a>

    <nav aria-label="Primary" class="order-3 w-full sm:order-2 sm:w-auto">
      <ul class="-mx-1 flex flex-wrap gap-x-4 gap-y-1 text-sm">
        {
          nav.map((item) => (
            <li>
              <a
                href={localizedPath(item.href, locale)}
                class="inline-flex min-h-[44px] items-center px-1 text-gray-400 no-underline hover:text-white sm:min-h-0 sm:py-2"
              >
                {item.label}
              </a>
            </li>
          ))
        }
      </ul>
    </nav>

    <div class="order-2 flex items-center gap-3 sm:order-3">
      <a
        href={altHref}
        class="inline-flex min-h-[44px] items-center rounded-md border border-white/10 px-3 py-1 text-sm font-semibold text-gray-400 no-underline hover:border-accent-500/30 hover:text-white sm:min-h-0 sm:py-1.5"
        lang={locale === "en" ? "my" : "en"}
      >
        {altLabel}
      </a>
      <a
        href={localizedPath("/apply", locale)}
        class="inline-flex min-h-[44px] items-center rounded-lg bg-accent-500 px-4 py-1.5 text-sm font-bold text-black no-underline hover:bg-accent-600 sm:min-h-0"
      >
        {s.nav.apply} →
      </a>
    </div>
  </div>
</header>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Header.astro
git commit -m "feat: dark nav with amber Apply CTA and vibecode.tours logo"
```

---

### Task 5: Footer — Dark Footer

**Files:**

- Modify: `src/components/Footer.astro`

- [ ] **Step 1: Replace Footer.astro with dark footer**

Replace the entire `src/components/Footer.astro` with:

```astro
---
import { t, getLocale, localizedPath, type Locale } from "../i18n/utils";

const locale: Locale = getLocale(Astro.url.pathname);
const s = t(locale);

const links = [
  { href: "/legal/terms", label: s.footer.terms },
  { href: "/legal/code-of-conduct", label: s.footer.coc },
  { href: "/legal/privacy", label: s.footer.privacy },
  { href: "/contact", label: s.footer.contact },
];
---

<footer class="mt-16 border-t border-white/5">
  <div
    class="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-5 py-8 sm:px-6"
  >
    <div>
      <p class="text-sm text-gray-500">{s.footer.rights}</p>
      <p class="mt-1 text-xs text-gray-600">ai@vibecode.tours</p>
    </div>
    <nav aria-label="Legal">
      <ul class="flex flex-wrap gap-x-4 gap-y-1 text-sm">
        {
          links.map((item) => (
            <li>
              <a
                href={localizedPath(item.href, locale)}
                class="text-gray-500 no-underline hover:text-accent-500"
              >
                {item.label}
              </a>
            </li>
          ))
        }
      </ul>
    </nav>
  </div>
</footer>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Footer.astro
git commit -m "feat: dark footer with ai@vibecode.tours"
```

---

### Task 6: HomeBody — Full Dark Forge Hero Redesign

**Files:**

- Modify: `src/components/HomeBody.astro`

- [ ] **Step 1: Replace HomeBody.astro with full Dark Forge homepage**

Replace the entire `src/components/HomeBody.astro` with:

```astro
---
import { t, getLocale, localizedPath, type Locale } from "../i18n/utils";
import { chapters } from "../data/chapters";
import ChapterCard from "./ChapterCard.astro";

const locale: Locale = getLocale(Astro.url.pathname);
const s = t(locale).home;

const features = [
  {
    icon: "⌨️",
    title: "Claude Code Deep Dive",
    desc: "Permission modes, CLAUDE.md, cost control, prompting patterns",
  },
  {
    icon: "🔌",
    title: "MCP Ecosystem",
    desc: "Context7, claude-mem, custom MCP servers for your workflow",
  },
  {
    icon: "🤖",
    title: "Agents & Skills",
    desc: "Subagents, hooks, SDK, methodologies that multiply output",
  },
  {
    icon: "🚀",
    title: "Ship to Production",
    desc: "Real URLs, security audits, deployment — not toy projects",
  },
  {
    icon: "🧭",
    title: "Tool Landscape",
    desc: "Beyond Claude: Cursor, Copilot, Aider, Windsurf",
  },
  {
    icon: "👥",
    title: "Team Build Sprint",
    desc: "Form squads, build together, Demo Day showcase",
  },
];

const tags = ["#VibeCode", "#AI", "#DEV", "#MCP", "#AGENT", "#SKILL"];
const highlightTags = new Set(["#VibeCode", "#MCP"]);
---

<!-- Hero -->
<section class="relative overflow-hidden py-20 text-center sm:py-28">
  <div
    class="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full"
    style="background: radial-gradient(circle, #f59e0b0d, transparent 70%)"
  >
  </div>
  <div class="relative mx-auto max-w-3xl px-5 sm:px-6">
    <div
      class="mb-6 inline-flex items-center gap-2 rounded-full border border-accent-500/30 bg-accent-500/10 px-4 py-1.5 text-sm font-semibold text-accent-500"
    >
      <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-500"></span>
      Cohort 1 in progress · Cohort 2 opening soon
    </div>
    <h1
      class="text-4xl font-black leading-tight sm:text-6xl"
      style="background: linear-gradient(135deg, #fff 0%, #f59e0b 80%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;"
    >
      Master AI-First Development
    </h1>
    <p class="mt-4 text-lg font-bold text-accent-500">{s.heroStat}</p>
    <p class="mx-auto mt-4 max-w-xl text-lg text-gray-400">{s.heroSub}</p>
    <div
      class="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
    >
      <a href={localizedPath("/apply", locale)} class="btn btn-primary"
        >{s.ctaApply}</a
      >
      <a href={localizedPath("/curriculum", locale)} class="btn btn-secondary"
        >{s.ctaWork}</a
      >
    </div>
    <div class="mt-6 flex flex-wrap justify-center gap-2">
      {
        tags.map((tag) => (
          <span
            class:list={[
              "rounded-full px-3 py-1 font-mono text-xs font-semibold transition",
              highlightTags.has(tag)
                ? "border border-accent-500/30 bg-accent-500/10 text-accent-500"
                : "border border-white/10 bg-white/5 text-gray-500 hover:border-accent-500/30 hover:text-accent-500",
            ]}
          >
            {tag}
          </span>
        ))
      }
    </div>
  </div>
</section>

<!-- Features -->
<section class="mx-auto max-w-5xl px-5 py-12 sm:px-6">
  <p class="section-label">What You'll Master</p>
  <h2 class="mt-2 text-center text-3xl font-extrabold sm:text-4xl">
    Build with AI, Not Just About AI
  </h2>
  <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {
      features.map((f) => (
        <div class="group relative overflow-hidden rounded-xl border border-white/5 bg-surface-card p-6 transition hover:-translate-y-0.5 hover:border-accent-500/20">
          <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-500/20 to-transparent opacity-0 transition group-hover:opacity-100" />
          <div class="mb-3 flex h-10 w-10 items-center justify-center rounded-lg border border-accent-500/20 bg-accent-500/10 text-xl">
            {f.icon}
          </div>
          <h3 class="text-base font-bold">{f.title}</h3>
          <p class="mt-2 text-sm text-gray-500">{f.desc}</p>
        </div>
      ))
    }
  </div>
</section>

<!-- Curriculum Roadmap -->
<section class="mx-auto max-w-5xl px-5 py-16 sm:px-6">
  <p class="section-label">The Journey</p>
  <h2 class="mt-2 text-center text-3xl font-extrabold sm:text-4xl">
    9 Chapters · Zero to Ship
  </h2>
  <div class="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
    {
      chapters.map((ch) => (
        <a
          href={localizedPath(`/curriculum/ch-${ch.num}`, locale)}
          class="group rounded-xl border border-white/5 bg-surface-card p-5 no-underline transition hover:border-accent-500/20"
        >
          <div class="font-mono text-xs font-bold text-accent-500/70">
            CH {ch.num}
          </div>
          <h4 class="mt-1 text-sm font-bold text-white">{ch.title}</h4>
          <p class="mt-1 text-xs text-gray-600">{ch.outcome}</p>
          <div class="mt-3 flex gap-1">
            {ch.tiers.map((tier) => (
              <span
                class:list={["tier", `tier-${tier.toLowerCase()}`]}
                title={`Tier ${tier}`}
              >
                {tier}
              </span>
            ))}
          </div>
        </a>
      ))
    }
  </div>
</section>

<!-- Social Proof -->
<section class="mx-auto max-w-4xl px-5 py-12 sm:px-6">
  <div
    class="flex flex-wrap justify-center gap-12 rounded-xl border border-white/5 bg-surface-card px-8 py-8 sm:gap-16"
  >
    <div class="text-center">
      <div class="text-3xl font-black text-white">
        185<span class="text-accent-500">+</span>
      </div>
      <div class="mt-1 text-xs text-gray-500">Cohort 1 Builders</div>
    </div>
    <div class="text-center">
      <div class="text-3xl font-black text-white">9</div>
      <div class="mt-1 text-xs text-gray-500">Chapters</div>
    </div>
    <div class="text-center">
      <div class="text-3xl font-black text-white">
        36<span class="text-accent-500">h</span>
      </div>
      <div class="mt-1 text-xs text-gray-500">Hands-on Hours</div>
    </div>
    <div class="text-center">
      <div class="text-3xl font-black text-white">$0</div>
      <div class="mt-1 text-xs text-gray-500">Cost to Join</div>
    </div>
  </div>
</section>

<!-- Final CTA -->
<section class="mx-auto max-w-3xl px-5 py-16 sm:px-6">
  <div
    class="relative overflow-hidden rounded-2xl border border-accent-500/20 p-12 text-center"
    style="background: linear-gradient(135deg, #f59e0b0d, #09090b)"
  >
    <div
      class="pointer-events-none absolute inset-0"
      style="background: radial-gradient(circle at center, #f59e0b08, transparent 50%)"
    >
    </div>
    <h2 class="relative text-3xl font-extrabold">Ready to Vibe Code?</h2>
    <p class="relative mt-3 text-gray-500">
      Join the next cohort and build with AI, not just about it.
    </p>
    <div class="relative mt-6">
      <a href={localizedPath("/apply", locale)} class="btn btn-primary text-lg"
        >{s.ctaApply}</a
      >
    </div>
  </div>
</section>
```

- [ ] **Step 2: Verify homepage builds**

Run: `cd /home/kokoye2007/projects/git/ai/bootcamp-tour-curriculum/vibe-code-tours-site && npx astro build 2>&1 | tail -5`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/components/HomeBody.astro
git commit -m "feat: Dark Forge homepage with hero, features, roadmap, social proof, CTA"
```

---

### Task 7: ChapterCard — Dark Card Style

**Files:**

- Modify: `src/components/ChapterCard.astro`

- [ ] **Step 1: Replace ChapterCard.astro with dark card**

Replace the entire `src/components/ChapterCard.astro` with:

```astro
---
import type { Chapter } from "../data/chapters";

interface Props {
  chapter: Chapter;
  readMore: string;
  href: string;
}

const { chapter, readMore, href } = Astro.props;
const { num, tag, title, outcome, tiers, duration, hero = false } = chapter;
---

<article class:list={["card", hero && "border-accent-500/30 bg-accent-500/5"]}>
  <div class="flex items-center gap-3">
    <span
      class="rounded-md bg-white/10 px-2.5 py-1 font-mono text-sm font-bold text-accent-500"
      >Ch{num}</span
    >
    {
      tag && (
        <span class="rounded-full border border-accent-500/20 bg-accent-500/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-accent-500">
          {tag}
        </span>
      )
    }
    <span class="ml-auto text-xs text-gray-600">{duration}</span>
  </div>

  <h3 class="mt-3 text-lg">{title}</h3>
  <p class="mt-1 text-sm text-gray-500">{outcome}</p>

  <div class="mt-4 flex items-center gap-2">
    {
      tiers.map((tier) => (
        <span
          class:list={["tier", `tier-${tier.toLowerCase()}`]}
          title={`Tier ${tier}`}
        >
          {tier}
        </span>
      ))
    }
  </div>

  <a
    href={href}
    class="mt-4 inline-block text-xs font-semibold uppercase tracking-wide text-accent-500 no-underline hover:text-accent-400"
    >{readMore}</a
  >
</article>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ChapterCard.astro
git commit -m "feat: dark ChapterCard with amber accents"
```

---

### Task 8: CurriculumBody — Dark Curriculum Page

**Files:**

- Modify: `src/components/CurriculumBody.astro`

- [ ] **Step 1: Replace CurriculumBody.astro with dark version**

Replace the entire `src/components/CurriculumBody.astro` with:

```astro
---
import { t, getLocale, localizedPath, type Locale } from "../i18n/utils";
import { chapters } from "../data/chapters";
import ChapterCard from "./ChapterCard.astro";

const locale: Locale = getLocale(Astro.url.pathname);
const s = t(locale).curriculum;

const hero = chapters.find((c) => c.hero);
const rest = chapters.filter((c) => !c.hero);
const chHref = (num: number) => localizedPath(`/curriculum/ch-${num}`, locale);
---

<section class="mx-auto max-w-4xl px-5 py-12 sm:px-6">
  <h1 class="text-3xl sm:text-4xl">{s.heading}</h1>
  <p class="mt-3">
    <span
      class="inline-block rounded-full border border-accent-500/20 bg-accent-500/10 px-3 py-1 text-sm font-semibold text-accent-500"
      >{s.startDate}</span>
  </p>
  <p class="mt-4 max-w-prose text-lg text-gray-400">{s.intro}</p>
  <div class="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
    <a href="#curriculum-grid">{s.ctaSample}</a>
  </div>

  <div id="curriculum-grid" class="mt-10">
    {
      hero && (
        <div class="mb-4">
          <p class="mb-2 text-xs font-bold uppercase tracking-widest text-accent-500">
            {s.startHere}
          </p>
          <ChapterCard
            chapter={hero}
            readMore={s.readMore}
            href={chHref(hero.num)}
          />
        </div>
      )
    }

    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      {
        rest.map((chapter) => (
          <ChapterCard
            chapter={chapter}
            readMore={s.readMore}
            href={chHref(chapter.num)}
          />
        ))
      }
    </div>
  </div>

  <h2 class="mt-14 text-2xl">{s.tierHeading}</h2>
  <p class="mt-3 max-w-prose text-gray-400">{s.tierIntro}</p>
  <ul class="mt-4 space-y-3">
    <li class="flex items-start gap-3">
      <span class="tier tier-a mt-0.5">A</span>
      <span class="text-gray-400">{s.tierA}</span>
    </li>
    <li class="flex items-start gap-3">
      <span class="tier tier-b mt-0.5">B</span>
      <span class="text-gray-400">{s.tierB}</span>
    </li>
    <li class="flex items-start gap-3">
      <span class="tier tier-c mt-0.5">C</span>
      <span class="text-gray-400">{s.tierC}</span>
    </li>
  </ul>
  <p class="mt-4 max-w-prose text-sm text-gray-600">{s.tierNote}</p>

  <div class="mt-12 grid gap-6 sm:grid-cols-2">
    <div>
      <h2 class="text-xl">{s.getHeading}</h2>
      <ul class="mt-3 list-disc space-y-1 pl-5 text-gray-400">
        {s.get.map((item) => <li>{item}</li>)}
      </ul>
    </div>
    <div>
      <h2 class="text-xl">{s.commitHeading}</h2>
      <ul class="mt-3 list-disc space-y-1 pl-5 text-gray-400">
        {s.commit.map((item) => <li>{item}</li>)}
      </ul>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/CurriculumBody.astro
git commit -m "feat: dark CurriculumBody"
```

---

### Task 9: Content Pages — Dark Reskin (About, FAQ, Apply, Team, Sponsors, Contact)

**Files:**

- Modify: `src/components/AboutBody.astro`
- Modify: `src/components/FaqBody.astro`
- Modify: `src/components/ApplyBody.astro`
- Modify: `src/components/TeamBody.astro`
- Modify: `src/components/SponsorsBody.astro`
- Modify: `src/components/ContactBody.astro`

All these follow the same pattern: swap `text-gray-700` → `text-gray-400`, `text-gray-900` → `text-white`, `text-gray-500` → `text-gray-600`, `border-gray-200` → `border-white/10`, `bg-gray-50` → `bg-surface-card`, `bg-gray-200` → `bg-white/10`, `bg-accent-50` → `bg-accent-500/10`, `text-accent-800` → `text-accent-500`, `text-accent-700` → `text-accent-500`, `bg-white` → `bg-surface-card`.

- [ ] **Step 1: Replace AboutBody.astro**

```astro
---
import { t, getLocale, type Locale } from "../i18n/utils";

const locale: Locale = getLocale(Astro.url.pathname);
const s = t(locale).about;
---

<article class="container-prose py-12">
  <h1 class="text-3xl sm:text-4xl">{s.heading}</h1>
  <p class="mt-6 text-lg text-gray-400">{s.intro1}</p>
  <p class="mt-4 text-lg text-gray-400">{s.intro2}</p>

  <h2 class="mt-10 text-2xl">{s.believeHeading}</h2>
  <ul class="mt-4 space-y-4">
    {
      s.beliefs.map((b) => (
        <li class="rounded-lg border border-white/10 bg-surface-card p-5">
          <p class="font-semibold text-white">{b.title}</p>
          <p class="mt-1 text-gray-400">{b.body}</p>
        </li>
      ))
    }
  </ul>

  <h2 class="mt-10 text-2xl">{s.notHeading}</h2>
  <ul class="mt-4 list-disc space-y-2 pl-6 text-gray-400">
    {s.notList.map((item) => <li>{item}</li>)}
  </ul>
</article>
```

- [ ] **Step 2: Replace FaqBody.astro**

```astro
---
import { t, getLocale, type Locale } from "../i18n/utils";

const locale: Locale = getLocale(Astro.url.pathname);
const s = t(locale).faq;
---

<article class="container-prose py-12">
  <h1 class="text-3xl sm:text-4xl">{s.heading}</h1>
  <dl class="mt-8 space-y-6">
    {
      s.items.map((item) => (
        <div class="border-b border-white/10 pb-6">
          <dt class="text-lg font-semibold text-white">{item.q}</dt>
          <dd class="mt-2 text-gray-400">{item.a}</dd>
        </div>
      ))
    }
  </dl>
</article>
```

- [ ] **Step 3: Replace ApplyBody.astro**

```astro
---
import { t, getLocale, type Locale } from "../i18n/utils";

const locale: Locale = getLocale(Astro.url.pathname);
const s = t(locale).apply;
---

<article class="container-prose py-12">
  <div
    class="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-400"
  >
    Cohort 1
  </div>
  <h1 class="mt-4 text-3xl sm:text-4xl">{s.heading}</h1>
  <p class="mt-3 text-lg font-semibold text-accent-500">{s.startsBody}</p>
  <p class="mt-4 text-lg text-gray-400">{s.closedBody}</p>
  <p class="mt-4 font-semibold text-accent-500">{s.nextCohort}</p>

  <h2 class="mt-8 text-xl">{s.notifyHeading}</h2>
  <ul class="mt-3 list-disc space-y-1 pl-5 text-gray-400">
    {s.notifyList.map((item) => <li>{item}</li>)}
  </ul>

  <h2 class="mt-10 text-2xl">{s.lookHeading}</h2>
  <p class="mt-2 text-sm text-gray-600">{s.lookIntro}</p>
  <ul class="mt-3 list-disc space-y-1 pl-5 text-gray-400">
    {s.lookList.map((item) => <li>{item}</li>)}
  </ul>
</article>
```

- [ ] **Step 4: Replace TeamBody.astro**

```astro
---
import { t, getLocale, localizedPath, type Locale } from "../i18n/utils";

const locale: Locale = getLocale(Astro.url.pathname);
const s = t(locale).team;
---

<article class="container-prose py-12">
  <h1 class="text-3xl sm:text-4xl">{s.heading}</h1>

  <h2 class="mt-8 text-2xl">{s.leadHeading}</h2>
  <div class="mt-4 flex flex-col gap-5 sm:flex-row sm:items-start">
    <div
      class="flex h-40 w-40 shrink-0 items-center justify-center rounded-xl border border-dashed border-white/20 bg-surface-card text-center text-xs text-gray-600"
      role="img"
      aria-label={s.photoAlt}
    >
      {s.photoCaption}
    </div>
    <div>
      <p class="text-xl font-bold text-white">{s.name}</p>
      <p class="mt-2 text-gray-400">{s.bio}</p>
      <ul class="mt-4 space-y-1 text-sm">
        <li class="text-gray-400">
          {s.github}: <a href={s.githubUrl}>{s.githubHandle}</a>
        </li>
        <li class="text-gray-400">{s.x}: <a href={s.xUrl}>{s.xHandle}</a></li>
        <li class="text-gray-400">
          {s.emailLabel}: <a href={`mailto:${s.email}`}>{s.email}</a>
        </li>
      </ul>
    </div>
  </div>

  <h2 class="mt-10 text-2xl">{s.advisorsHeading}</h2>
  <p class="mt-2 italic text-gray-600">{s.advisorsBody}</p>

  <h2 class="mt-10 text-2xl">{s.helpHeading}</h2>
  <p class="mt-2 text-gray-400">{s.helpBody}</p>
</article>
```

- [ ] **Step 5: Replace SponsorsBody.astro**

```astro
---
import { t, getLocale, type Locale } from "../i18n/utils";

const locale: Locale = getLocale(Astro.url.pathname);
const s = t(locale).sponsors;
---

<article class="container-prose py-12">
  <h1 class="text-3xl sm:text-4xl">{s.heading}</h1>
  <p class="mt-6 text-lg text-gray-400">{s.intro}</p>

  <h2 class="mt-10 text-2xl">{s.cohort1Heading}</h2>
  <ul class="mt-3 list-disc space-y-1 pl-5 text-gray-400">
    {s.cohort1List.map((item) => <li>{item}</li>)}
  </ul>

  <h2 class="mt-10 text-2xl">{s.howHeading}</h2>

  <h3 class="mt-6 text-xl">{s.orgHeading}</h3>
  <p class="mt-2 text-gray-400">{s.orgIntro}</p>
  <ul class="mt-3 list-disc space-y-1 pl-5 text-gray-400">
    {s.orgList.map((item) => <li>{item}</li>)}
  </ul>
  <p class="mt-3 text-gray-400">{s.orgContact}</p>

  <h3 class="mt-6 text-xl">{s.indHeading}</h3>
  <p class="mt-2 text-gray-400">{s.indIntro}</p>
  <ul class="mt-3 list-disc space-y-1 pl-5 text-gray-400">
    {s.indList.map((item) => <li>{item}</li>)}
  </ul>

  <h3 class="mt-6 text-xl">{s.getHeading}</h3>
  <ul class="mt-3 list-disc space-y-1 pl-5 text-gray-400">
    {s.getList.map((item) => <li>{item}</li>)}
  </ul>

  <p
    class="mt-6 rounded-lg border border-accent-500/20 bg-accent-500/10 px-5 py-4 font-semibold text-accent-500"
  >
    {s.noSell}
  </p>
</article>
```

- [ ] **Step 6: Replace ContactBody.astro**

```astro
---
import { t, getLocale, type Locale } from "../i18n/utils";

const locale: Locale = getLocale(Astro.url.pathname);
const s = t(locale).contact;
---

<article class="container-prose py-12">
  <h1 class="text-3xl sm:text-4xl">{s.heading}</h1>

  <dl class="mt-8 space-y-5">
    <div>
      <dt class="font-semibold text-white">{s.applicants}</dt>
      <dd class="mt-1">
        <a href={`mailto:${s.applicantsEmail}`}>{s.applicantsEmail}</a>
      </dd>
    </div>
    <div>
      <dt class="font-semibold text-white">{s.sponsorship}</dt>
      <dd class="mt-1">
        <a href={`mailto:${s.sponsorshipEmail}`}>{s.sponsorshipEmail}</a>
        <span class="text-gray-500"> {s.sponsorshipNote}</span>
      </dd>
    </div>
    <div>
      <dt class="font-semibold text-white">{s.privacy}</dt>
      <dd class="mt-1">
        <a href={`mailto:${s.privacyEmail}`}>{s.privacyEmail}</a>
      </dd>
    </div>
    <div>
      <dt class="font-semibold text-white">{s.coc}</dt>
      <dd class="mt-1"><a href={`mailto:${s.cocEmail}`}>{s.cocEmail}</a></dd>
    </div>
  </dl>

  <h2 class="mt-10 text-2xl">{s.channelsHeading}</h2>
  <ul class="mt-3 list-disc space-y-1 pl-5 text-gray-400">
    <li>{s.github}: <a href={s.githubUrl}>{s.githubLabel}</a></li>
  </ul>

  <p class="mt-6 text-sm text-gray-600">{s.forwardNote}</p>
</article>
```

- [ ] **Step 7: Commit all content pages**

```bash
git add src/components/AboutBody.astro src/components/FaqBody.astro src/components/ApplyBody.astro src/components/TeamBody.astro src/components/SponsorsBody.astro src/components/ContactBody.astro
git commit -m "feat: dark reskin for About, FAQ, Apply, Team, Sponsors, Contact pages"
```

---

### Task 10: Setup + Legal Pages — Dark Reskin

**Files:**

- Modify: `src/components/SetupBody.astro`
- Modify: `src/components/ChapterDetailBody.astro`
- Modify: `src/components/CocBody.astro`
- Modify: `src/components/TermsBody.astro`
- Modify: `src/components/PrivacyBody.astro`
- Modify: `src/components/LegalNotice.astro`

These pages use Tailwind arbitrary variants in class strings (e.g. `[&_p]:text-gray-700`). The dark reskin swaps those color references.

- [ ] **Step 1: Update SetupBody.astro**

In `SetupBody.astro`, make these replacements in the opening `<article>` class:

- `[&_p]:text-gray-700` → `[&_p]:text-gray-400`
- `[&_li]:text-gray-700` → `[&_li]:text-gray-400`
- `[&_a]:text-accent-800` → `[&_a]:text-accent-500`

And update `<pre>` blocks: `bg-gray-900` → `bg-surface-elevated` (these were already dark, so this is minor)

- [ ] **Step 2: Update ChapterDetailBody.astro**

Swap all light references:

- `text-gray-700` → `text-gray-400`
- `text-gray-900` → `text-white`
- `bg-gray-900` → `bg-white/10` (chapter number badge)
- `text-gray-300` → `text-gray-600` (duration)
- `border-accent-300 bg-accent-50` → `border-accent-500/30 bg-accent-500/10`
- `text-accent-800` → `text-accent-500`
- `text-gray-500` → `text-gray-600`

- [ ] **Step 3: Update CocBody.astro**

In the opening `<article>` class:

- `[&_p]:text-gray-700` → `[&_p]:text-gray-400`
- `[&_li]:text-gray-700` → `[&_li]:text-gray-400`

- [ ] **Step 4: Update TermsBody.astro**

Same pattern as CocBody:

- `[&_p]:text-gray-700` → `[&_p]:text-gray-400`
- `[&_li]:text-gray-700` → `[&_li]:text-gray-400`

- [ ] **Step 5: Update PrivacyBody.astro**

Same pattern:

- `[&_p]:text-gray-700` → `[&_p]:text-gray-400`
- `[&_li]:text-gray-700` → `[&_li]:text-gray-400`

- [ ] **Step 6: Update LegalNotice.astro**

Replace the banner:

```astro
{
  locale === "my" && (
    <p class="mb-6 rounded-lg border border-accent-500/30 bg-accent-500/10 px-4 py-3 text-sm text-accent-500">
      [MY] Burmese translation pending. The English text below is authoritative
      until translated.
    </p>
  )
}
```

- [ ] **Step 7: Commit**

```bash
git add src/components/SetupBody.astro src/components/ChapterDetailBody.astro src/components/CocBody.astro src/components/TermsBody.astro src/components/PrivacyBody.astro src/components/LegalNotice.astro
git commit -m "feat: dark reskin for Setup, ChapterDetail, and legal pages"
```

---

### Task 11: Build Verification + Dev Server Check

- [ ] **Step 1: Full build**

Run: `cd /home/kokoye2007/projects/git/ai/bootcamp-tour-curriculum/vibe-code-tours-site && npx astro build 2>&1 | tail -10`
Expected: Build completes without errors

- [ ] **Step 2: Start dev server and visually verify**

Run: `cd /home/kokoye2007/projects/git/ai/bootcamp-tour-curriculum/vibe-code-tours-site && npx astro dev`

Check in browser:

- Homepage: dark bg, dot grid, gradient hero text, amber CTAs, feature cards, roadmap, proof bar
- `/curriculum`: dark cards with tier pills
- `/about`: dark belief cards
- `/faq`: dark dividers
- `/apply`: dark with amber accent text
- `/my/` pages: same but with Burmese text
- Verify WCAG AA contrast on key text (white on #09090b = 18.4:1, gray-400 on #09090b = 5.7:1)

- [ ] **Step 3: Fix any issues found during visual check**

- [ ] **Step 4: Final commit if any fixes**

```bash
git add -u
git commit -m "fix: visual polish from dev server review"
```
