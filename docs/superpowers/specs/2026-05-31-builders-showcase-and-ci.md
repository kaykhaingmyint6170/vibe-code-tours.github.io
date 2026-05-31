# Builders Showcase + Tour Repo + Site CI/CD — Plan

**Date:** 2026-05-31
**Status:** Draft for review
**Term decided:** Students = **Builders** (matches existing "185 builders" stat)

## Goals

1. **Student task** — a real fork→branch→intro.md→PR workflow (open-source muscle memory)
2. **Showcase** — `/cohort/1` on vibecode.tours: cohort → teams → builders → projects, each builder links to personal repo
3. **Learn from** `fossmyanmar/fossmyanmar.github.io` (file-per-person, auto-discovered cards)
4. **Site CI** — GitHub Action gate: format + syntax check on every PR/push
5. **CI/CD stack handoff** — documented, reusable

---

## Architecture: Single Repo (DECIDED — Option A)

ONE repo. The site repo IS the Tour Repo. No separate repo.

**The flow (the student task = real open-source PR):**

```
site repo → student forks → adds src/content/builders/{username}.md → push to fork
  → opens Pull Request
  → CI check (ci.yml: format + schema validate + build)
  → admin review
  → merge to main
  → GitHub Pages auto-deploys → builder card live on site
```

**Why single repo is safe for beginners:**

- Builder PRs isolated to `src/content/builders/` (one folder)
- CODEOWNERS flags any PR touching other paths for extra review
- CI validates frontmatter schema + build before merge — bad PR cannot break the site
- Admin (instructor) is the merge gate

This teaches the exact workflow open source runs on, on the actual production site, with guardrails.

---

## Builder Data Model

**Format:** Markdown + frontmatter (Astro content collection — native, beginner-friendly, holds both structured card data AND a written intro).

**Location:** `src/content/builders/{github-username}.md`

**Schema:**

```markdown
---
name: Ko Ko Ye
github: kokoye2007 # required, must match filename
cohort: 1 # required
role: builder # builder | mentor | instructor
repo: https://github.com/kokoye2007/my-project # optional, personal repo
# team: team-3                # COMMENTED OUT — students don't know team yet
# project: vibecode.tours     # COMMENTED OUT — no project yet
---

Hi, I'm learning to vibe-code. My goal is to ship X.
(2-3 sentence intro — free text, this is the body)

# PHOTO: no upload needed. Avatar auto-fetched from GitHub:

# https://github.com/{github}.png?size=200

# Gravatar-style — keyed by username. Zero image PRs.
```

**Astro content collection config** (`src/content/config.ts`):

```typescript
import { defineCollection, z } from "astro:content";

const builders = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    github: z.string(),
    cohort: z.number(),
    role: z.enum(["builder", "mentor", "instructor"]).default("builder"),
    repo: z.string().url().optional(),
    // team: z.string().optional(),     // COMMENTED OUT — unknown yet
    // project: z.string().optional(),  // COMMENTED OUT — unknown yet
  }),
});

export const collections = { builders };
```

Zod schema = free validation at build time. Bad PR → build fails → CI catches it.

---

## Site: Showcase Pages

| Route                          | Content                                           |
| ------------------------------ | ------------------------------------------------- |
| `/cohort/1` (+ `/my/cohort/1`) | Cohort 1 overview → team sections → builder cards |
| (future) `/cohort/2`           | Auto-works when cohort:2 builders added           |

**Builder card** (dark theme, matches existing ChapterCard style):

- GitHub avatar (`https://github.com/{github}.png?size=200`) — circular, amber ring
- Name + @github (links to github.com/username)
- Role pill (builder/mentor/instructor — amber tiers like A/B/C)
- "View repo →" link if `repo` set
- Intro text (the markdown body)
- Hover: amber border glow (existing `.card` pattern)
- (team badge + project — DEFERRED, commented out until known)

**Grouping (v1):** flat grid of all cohort-1 builders. Team grouping added later when teams form.

**Avatar fallback:** GitHub avatars always resolve (even default identicon), so no placeholder image needed. If `onerror`, swap to amber-initial CSS.

**New components:**

- `src/components/BuilderCard.astro`
- `src/components/CohortBody.astro`
- `src/pages/cohort/[num].astro` + `src/pages/my/cohort/[num].astro`

**Nav:** submenu — **Builders → Cohort 1** (dropdown in Header).

---

## Student Onboarding (in THIS repo)

Builders fork the site repo itself. Onboarding docs live in the repo:

```
vibe-code-tours.github.io/
  src/content/builders/
    _example.md          # template students copy (underscore = ignored by collection)
    kokoye2007.md        # real entries
  BUILDERS.md            # bilingual onboarding guide (the lesson)
  .github/
    PULL_REQUEST_TEMPLATE.md
    CODEOWNERS           # builders/ owned by instructor for review
```

**BUILDERS.md onboarding (the student task), bilingual EN + MY:**

```
1. Fork the site repo
2. Clone your fork
3. Branch: intro/yourname
4. Copy src/content/builders/_example.md → src/content/builders/<your-github>.md
5. Edit: name, github, cohort, your intro. (Photo auto-pulled from GitHub avatar.)
6. Commit, push to your fork
7. Open a Pull Request
→ A real PR. The workflow open source runs on.
```

**PR validation:** the existing `ci.yml` already validates (schema via zod + build). The Astro content collection schema rejects malformed frontmatter at build → CI red. Plus:

- `CODEOWNERS`: `src/content/builders/` → instructor auto-requested as reviewer
- `PULL_REQUEST_TEMPLATE.md`: checklist (one file, filename = github username, intro filled)
- (optional later) a path-guard action: flag PRs touching files outside `src/content/builders/`

---

## Site CI/CD

**Currently:** only `deploy.yml` (build → Pages). No checks.

**Add `ci.yml`** — format + type-check + build on PR/push:

```yaml
name: CI
on:
  pull_request:
  push:
    branches: [main]
permissions:
  contents: read
jobs:
  check:
    runs-on: ubuntu-latest
    timeout-minutes: 5
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }
      - run: npm ci
      - run: npm run format:check
      - run: npm run check
      - run: npm run build
```

**Deps to add:**

```bash
npm i -D prettier prettier-plugin-astro prettier-plugin-tailwindcss @astrojs/check typescript
```

**Config files:**

- `.prettierrc.mjs` — astro + tailwind plugins (tailwind plugin LAST)
- `.prettierignore` — dist/, .astro/, node_modules/, package-lock.json
- `tsconfig.json` — extends `astro/tsconfigs/strict` (fall back to `base` if too noisy)

**package.json scripts:**

```json
"check": "astro check",
"format": "prettier --write .",
"format:check": "prettier --check ."
```

**Pre-enable step:** run `npm run format` once, commit result, THEN enable CI (else first format:check fails on existing files).

**ESLint:** skipped — content site, near-zero hand-written JS. Prettier + astro check covers it.

---

## Implementation Phases

**Phase 1 — Site CI (low risk, ~20 min)**

1. Add prettier/astro-check deps + configs + tsconfig
2. `npm run format` once, commit
3. Add `ci.yml`
4. Verify green on a test PR

**Phase 2 — Builder showcase (this site)**

1. `src/content/config.ts` builders collection
2. `BuilderCard.astro`, `CohortBody.astro`, `cohort/[num].astro` (EN+MY)
3. Seed 2-3 example builders (instructor + sample)
4. Placeholder image
5. Nav link
6. Verify build + dark theme + bilingual

**Phase 3 — Onboarding (same repo)**

1. `src/content/builders/_example.md` template
2. `BUILDERS.md` bilingual onboarding guide
3. `.github/PULL_REQUEST_TEMPLATE.md` + `CODEOWNERS`
4. Test full fork→PR flow end-to-end as a student would
5. Link BUILDERS.md from /cohort/1 page ("Add yourself →")

---

## Decisions (RESOLVED)

1. ✅ **Single repo (Option A)** — site repo is the tour repo
2. ✅ **Builder files** at `src/content/builders/{github}.md`
3. ✅ **Photos = GitHub avatar auto-fetch** (`github.com/{user}.png`) — Gravatar-style, zero uploads
4. ✅ **Nav** — submenu Builders → Cohort 1
5. ✅ **team / project fields commented out** — students don't know yet

## Reference

- FOSS Myanmar: `github.com/fossmyanmar/fossmyanmar.github.io` — `_data/members/{slug}.yml` auto-discovered via Jekyll loop; README-as-onboarding; no CI (we add it)
- first-contributions: `github.com/firstcontributions/first-contributions` — canonical fork→PR teaching flow
- Astro content collections: native MD+frontmatter + zod validation
