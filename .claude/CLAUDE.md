# sumedhphadke.com

Personal website: resume, now log, blog, digital garden.
Intentionally crafted, not vibe-coded. Every decision must be justifiable.
Permanently WIP — clean code now prevents expensive rewrites later.

## Stack

| Concern   | Choice                                           |
|-----------|--------------------------------------------------|
| Framework | Astro — latest stable, always (see Versions)     |
| Language  | TypeScript, strict. No `any`, no suppressions.   |
| Node      | 22+ (`.nvmrc`)                                   |
| Styling   | Plain CSS + custom properties. No Tailwind.      |
| Font      | IBM Plex Mono via `@fontsource`, weights 400/500 |
| Content   | Astro Content Collections + Zod + MDX            |
| Comments  | Giscus, blog only                                |
| Hosting   | Cloudflare Pages, static output                  |
| Theme     | Dark by default, light via toggle (`html.light`) |

## Style principles

These are constraints, not preferences.

1. **Earn every pixel.** Nothing exists because it looks nice. Bytes count too — no library shipped for a feature 20 lines of vanilla would cover.
2. **Monospace as philosophy.** IBM Plex Mono doesn't perform elegance. It shows up and does the job.
3. **Not sterile — warmth lives in language.** The palette is cool and technical, deliberately. So every gram of human-ness comes from how things are written: page titles, section descriptions, empty states, the footer. Specific over generic. "Notes, growing in public" over "Garden."
4. **Separation by contract, not just density.** Blog and garden differ in what they promise the reader, not only in visual weight. Every garden note carries a line stating what the reader is getting.
5. **Density over whitespace fetish.** Minimal means no waste, not no content. Breathing room serves comprehension.
6. **No hero moments.** The homepage is a map, not a pitch.
7. **Visible WIP energy.** Now is first-class. The workshop has the lights on.
8. **Timestamps over polish.** Dates everywhere. Garden shows planted *and* tended.
9. **Don't perform, but do show up.** The rule is no tribe-signalling — not no self. Specifics are fine. Opinions are fine. Being wrong in public is the point of the garden.
10. **Detail rewards attention.** Care lives in the parts nobody specs: focus rings, selection colour, the 404 page, what an empty section says, how it prints. A reader who looks closely should find something. A reader who doesn't should never be interrupted.

## Motion

Principle 10 is the only reason motion exists here. It is not decoration.

- Animate only to explain a change of state, or where something came from.
- Never on page load. Never triggered by scroll. Never to draw attention.
- ≤150ms, `ease-out`. If it reads as an animation, it's too long.
- Everything inside `@media (prefers-reduced-motion: reduce)` degrades to nothing.
- If you can't state in one sentence what a transition explains, delete it.

Legitimate uses: theme toggle crossfade, focus ring appearance, link underline
on hover, stage badge on filter. That is close to the whole list.

## Versions

This site tracks latest stable. No pinned major versions in this file — they
go stale and then contradict the repo. Astro, its integrations, and Node all
move up as releases land, including majors.

That is only safe because the site is small and verifiable. So majors follow
this order, not an upgrade-when-convenient rhythm:

1. Read the official migration guide first. Never infer breaking changes.
2. Upgrade on a branch. Bump integrations to their matching majors together —
   they release in lockstep with core.
3. `astro check` clean, then build, then compare rendered output against main.
4. Merge, or revert. Don't leave a half-migrated branch alive.

If a release genuinely can't be adopted, record why here with a date. An
unexplained lag is how a site quietly becomes unmaintainable.

## Design tokens

All colour, spacing, type, and radius values live in `src/styles/tokens.css`.
Never hardcode one anywhere else. If a value is missing, add a token first,
then use it. Light mode overrides live under `html.light` in the same file.

## Content

Schemas in `src/content/config.ts`. Don't change one without checking every
page that consumes it.

| Collection | Format | Key frontmatter                       |
|------------|--------|---------------------------------------|
| blog       | MDX    | title, date, description, tags, draft |
| garden     | MD     | title, planted, tended, stage         |
| now        | MD     | title, date, category                 |

Drafts: `draft: true` in blog frontmatter, or the file lives in
`content/drafts/` (gitignored). Garden notes have no draft state — `stage`
communicates maturity.

## Pages

| Route          | Layout | Comments | Notes                     |
|----------------|--------|----------|---------------------------|
| /              | Base   | No       | 3-col snapshot, no hero   |
| /now           | Base   | No       | All entries, newest first |
| /work          | Base   | No       | Prose resume + PDF link   |
| /blog          | Base   | No       | List, no thumbnails       |
| /blog/[slug]   | Prose  | Giscus   | Tags at bottom            |
| /garden        | Base   | No       | Cards with stage badge    |
| /garden/[slug] | Garden | No       | Contract line + backlinks |

## Components

Props typed explicitly. One job each. Split past ~80 lines.
Components never fetch data — pages fetch, components receive props.

## Dependencies

Before adding one: could this be ~20 lines of plain TypeScript instead?
Is it maintained? Does it ship types? Does it add client JS, and is that
acceptable? This site should still build in five years.

## Never in this repo

Tailwind or any utility CSS framework. Component libraries. Analytics or
tracking of any kind. Newsletter signup. Skills grid or skill-percentage
visualisations. Social embeds. Scroll-triggered anything.

## Current state

<!-- Update as the build progresses. This section orients every session. -->

Done: all five pages scaffolded and rendering. Dark/light toggle working.
Garden stage badges working. Upgraded to Astro 7.1.3 (from 6.1.5) with matching
majors on @astrojs/mdx (7.0.3) and @astrojs/cloudflare (14.1.4) — astro check
clean, build output diffed against pre-upgrade main with no content or
structural regressions.

Open:
- Homepage intro copy still placeholder — highest-priority item on the site
- `/work` is placeholder text, no real resume content
- Garden contract line (principle 4) not yet added to the Garden layout
- "Now" and "Blog" page titles still read as labels, not descriptions
- Giscus not configured (repo + category IDs)

## Enforcement lives elsewhere

`astro check` must pass before commit — enforce with a hook, not this file.
Formatting is a formatter's job. Content scaffolding belongs in a skill
(`.claude/skills/`), not a prompt repeated every session.
