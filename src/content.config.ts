import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Builders = students. One Markdown file per builder in src/content/builders/.
// Files starting with `_` (e.g. _example.md) are ignored by the [^_] pattern.
// Students add themselves via fork -> add builders/<github>.md -> PR.
//
// The schema is intentionally TOLERANT: student PRs often leave optional fields
// blank or with template placeholders. Rather than crash the build, we clean
// those to `undefined` so the site always builds. Invalid values are dropped,
// not errored. Only name/github/cohort are truly required.

// Substrings that mark a value as an unfilled template placeholder.
const PLACEHOLDERS = [
  "your-github-username",
  "your-linkedin-username",
  "your-x-handle",
  "your-username",
  "your-project",
  "your-site.com",
  "your-handle",
  "example.com",
  "yourusername",
];

const isPlaceholder = (s: string) =>
  PLACEHOLDERS.some((p) => s.toLowerCase().includes(p));

// Trim; treat empty / null / placeholder as "not provided" (undefined).
const cleanStr = (v: unknown): string | undefined => {
  if (typeof v !== "string") return v == null ? undefined : String(v);
  const t = v.trim();
  if (!t || isPlaceholder(t)) return undefined;
  return t;
};

// Optional free-text string (x / linkedin). Markdown links -> inner text.
const optText = z.preprocess((v) => {
  const t = cleanStr(v);
  if (t == null) return undefined;
  const link = t.match(/^\[([^\]]*)\]\(([^)]*)\)$/);
  return link ? link[1] || link[2] : t;
}, z.string().optional());

// Optional URL (repo / website). Drop anything that isn't a real http(s) URL
// instead of failing the build.
const optUrl = z.preprocess((v) => {
  let t = cleanStr(v);
  if (t == null) return undefined;
  const link = t.match(/^\[[^\]]*\]\(([^)]*)\)$/);
  if (link) t = link[1];
  return /^https?:\/\//.test(t) ? t : undefined;
}, z.string().url().optional());

// github: required, but normalize URL / @handle / markdown-link to a bare handle.
const githubHandle = z.preprocess((v) => {
  let t = cleanStr(v);
  if (t == null) return v; // let required check fail with a clear message
  const link = t.match(/^\[([^\]]*)\]\(([^)]*)\)$/);
  if (link) t = link[2] || link[1];
  t = t.replace(/^@/, "").replace(/^https?:\/\/(www\.)?github\.com\//i, "");
  return t.replace(/\/+$/, "").split("/")[0] || t;
}, z.string().min(1));

// skills: accept an array, or a comma/space separated string, or drop if blank.
const optSkills = z.preprocess((v) => {
  if (Array.isArray(v)) return v.map((s) => String(s).trim()).filter(Boolean);
  if (typeof v === "string") {
    const parts = v.split(/[,;]/).map((s) => s.trim()).filter(Boolean);
    return parts.length ? parts : undefined;
  }
  return undefined;
}, z.array(z.string()).optional());

const builders = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/builders" }),
  schema: z.object({
    name: z.preprocess(cleanStr, z.string().min(1)),
    github: githubHandle,
    cohort: z.coerce.number(),
    role: z.enum(["builder", "mentor", "instructor"]).default("builder"),
    skills: optSkills,
    repo: optUrl, // personal / project repo
    x: optText, // X/Twitter handle or URL
    linkedin: optText, // LinkedIn handle or URL
    website: optUrl, // personal site
  }),
});

export const collections = { builders };
