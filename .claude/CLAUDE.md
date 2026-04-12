# CLAUDE.md
# Engineering contract for sumedhphadke.com
# Every Claude Code session reads this first.

---

## What this site is

Personal website for Sumedh Phadke. Functions as: resume, now log, blog,
and digital garden. It is intentionally crafted, not vibe-coded.
Every decision — architecture or visual — must be justified.

This is a WIP product that will keep evolving. Clean code today prevents
expensive rewrites tomorrow.

---

## Stack

| Concern         | Choice                                |
|-----------------|---------------------------------------|
| Framework       | Astro 6.x (latest stable)             |
| Language        | TypeScript — strict mode throughout   |
| Node            | 22+ (see .nvmrc)                      |
| Styling         | Plain CSS with custom properties      |
| Fonts           | IBM Plex Mono via @fontsource         |
| Content         | Astro Content Collections + MDX       |
| Comments        | Giscus (blog only)                    |
| Hosting         | Cloudflare Pages (static output)      |

---

## Style principles

These are not aesthetic preferences. They are constraints.

1. **Earn every pixel** — nothing appears because it looks nice
2. **Monospace throughout** — IBM Plex Mono, weights 400 and 500 only
3. **Warmth through voice** — copy, not colour
4. **Separation that means something** — blog and garden have different
   visual contracts; do not homogenise them
5. **Information density over whitespace fetish** — breathe serves
   comprehension, not aesthetics
6. **No hero moments** — homepage is a map, not a pitch
7. **Visible WIP energy** — now section is first-class
8. **Timestamps over polish** — dates visible everywhere
9. **No performance of identity** — no tribe-signalling through aesthetics

---

## Design tokens

All design values live in `src/styles/tokens.css` as CSS custom properties.
Never hardcode a colour, spacing value, or font size outside of tokens.css.

If you need a new token, add it to tokens.css first, then use it.
Do not invent one-off values inline.

---

## TypeScript rules

- Strict mode. `noImplicitAny: true`. `strictNullChecks: true`.
- No `any`. If you're tempted, use `unknown` and narrow it.
- All collection entries typed via `CollectionEntry<'collection-name'>`
- No type suppressions (`// @ts-ignore`, `as any`)
- Run `npx astro check` before every commit. It must pass clean.

---

## CSS rules

- All styles scoped to components using Astro's `<style>` tags, OR
  in the global stylesheets in `src/styles/`
- No inline `style` attributes unless dynamically computed in TypeScript
- No Tailwind. No utility class frameworks. No CSS-in-JS.
- Custom properties only for values that need to be consistent
- Mobile-first. Test at 375px before 1280px.

---

## Content collections

Schemas live in `src/content/config.ts`. Do not change a schema without
understanding the impact on all pages that consume that collection.

| Collection | Type  | Key fields                              |
|------------|-------|-----------------------------------------|
| blog       | MDX   | title, date, description, tags, draft   |
| garden     | MD    | title, planted, tended, stage, tags     |
| now        | MD    | title, date, category, ended?           |

Drafts: set `draft: true` in blog frontmatter OR put the file in
`content/drafts/` (gitignored). Garden notes have no draft state —
the `stage` field communicates maturity.

---

## Page contract

| Route              | Layout  | Comments | Notes                        |
|--------------------|---------|----------|------------------------------|
| /                  | Base    | No       | 3-col snapshot, no hero      |
| /now               | Base    | No       | All entries, newest first    |
| /work              | Base    | No       | Prose resume, PDF link       |
| /blog              | Base    | No       | List, no thumbnails          |
| /blog/[slug]       | Prose   | Giscus   | Tags at bottom               |
| /garden            | Base    | No       | Cards with stage badge       |
| /garden/[slug]     | Garden  | No       | Backlinks at bottom          |

---

## Component rules

- Props must be typed. No implicit prop types.
- Components should do one thing.
- If a component exceeds ~80 lines, consider splitting.
- No component should fetch data — fetch in pages, pass as props.

---

## Git hygiene

- Commit messages: imperative mood, present tense, lowercase
  e.g. `add now page`, `fix garden backlinks`, `update now entry apr 2025`
- No WIP commits to main
- One logical change per commit

---

## What never goes in this repo

- Tailwind or any utility CSS framework
- Any component library (Shadcn, DaisyUI, etc.)
- Google Analytics or any third-party tracking
- A newsletter signup
- A skills grid or skill percentage visualisation
- Animations unless explicitly requested and justified
- Social media embeds

---

## Dependency policy

Before adding a dependency:
1. Can this be done in ~20 lines of plain TypeScript? If yes, do that.
2. Is this dependency actively maintained?
3. Does it have TypeScript types?
4. Does it add client-side JavaScript? If yes, is that acceptable?

The goal is a minimal dependency footprint. This site should be buildable
in 5 years without fighting outdated packages.

---

## When in doubt

Ask: does this serve the reader, or does it serve the builder's ego?
If the latter, remove it.
