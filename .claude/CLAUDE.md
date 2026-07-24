# sumedhphadke.com

Personal website: resume, now log, blog, digital garden. Astro, static, on
Cloudflare Pages. Plain CSS, TypeScript strict, no client framework.

Intentionally crafted, not vibe-coded. Every decision must be justifiable.
Permanently WIP — clean code now prevents expensive rewrites later.

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

## URLs

Filenames sort. URLs don't have to carry what made them sort.

Blog files are `YYYY-MM-DD-slug.mdx` so the directory reads chronologically;
`src/lib/slug.ts` strips the date and the post is served at `/blog/slug`.
That function is the only definition of the rule — three places build post
links and all three call it. Garden and now filenames are already the slug.

Consequence: blog slugs must be unique across all dates, because two posts
whose names differ only by date collide on one route. The build fails loudly
if that happens, which is the right failure.

Top-level paths are deliberately unclaimed. `/money` and similar — a standing
page for a topic, pointing at the current thinking on it — is a wanted idea,
not yet designed. Don't spend a top-level route on anything else without
saying so; the collision is the whole cost.

## Content

Schemas in `src/content.config.ts` are the contract. Don't change one without
checking every page that consumes it. Collections: `blog` (MDX), `garden`
(MD), `now` (MD), plus a single `work/index.md`.

Drafts: `draft: true` in blog frontmatter, or the file lives in
`content/drafts/` (gitignored). Garden notes have no draft state — `stage`
communicates maturity.

Comments are Giscus, blog posts only.

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

Done: all five pages scaffolded and rendering. Dark/light toggle working.
Garden stage badges working. Astro 7.1.3 with matching majors on
@astrojs/mdx (7.0.3) and @astrojs/cloudflare (14.1.4). Blog posts serve at
clean URLs, date stripped.

Open:
- Homepage intro copy still placeholder — highest-priority item on the site
  (`src/pages/index.astro:33`)
- `/work` has real prose but no resume PDF at `public/resume.pdf`
- Garden contract line (principle 4) not yet added to the Garden layout
- "Now" and "Blog" page titles still read as labels, not descriptions
- Giscus not configured (repo + category IDs)

## Verification

There is no test suite and there shouldn't be one yet — a five-page static
site with no client logic has almost nothing a unit test would catch. What it
does have is rendered output, and that is what gets checked.

Use `agent-browser` (Vercel's CLI, installed globally). Not the Chrome
extension: this runs headless against `npm run dev` on localhost, needs no
open browser, and is the only option that can export a PDF.

Run it from bash, not PowerShell. The `.ps1` shim hangs without a TTY — it
launches Chrome and then never returns, which looks like a slow first run
rather than a hang. Cost an afternoon once; it won't again.

Any change that alters rendered output gets looked at before it's called done:

- Both themes. Dark is the default; light is `html.light`, one toggle away,
  and equally shipped. A colour token added without its light-mode value is a
  bug, and this is where that bug surfaces.
- `agent-browser pdf` when print styles are in scope. Principle 10 names how
  it prints — an untested print stylesheet is a claim, not a detail.
- `agent-browser snapshot` for focus order and accessible names. Focus rings
  are principle 10 too, and the accessibility tree shows them without
  squinting at screenshots.
- Mobile width, for anything with a layout change.

`astro check` only covers types — MDX bodies compile during the build, so a
post with a stray brace passes check and fails `npm run build`. Run the build
after touching content.

Screenshots go in the scratchpad, never in the repo.

## Skills

Specialised guidance lives in `.claude/skills/`, loaded when the work needs
it rather than every session:

| Skill         | Covers                                                            |
|---------------|-------------------------------------------------------------------|
| `tokens`      | Design tokens, no-literals rule, motion — read before any CSS      |
| `new-content` | Scaffolding a blog post, garden note, or now entry                |
| `format-post` | Formatting and checking written content — never edits the writing |
| `upgrade`     | Astro/Node version bumps, especially majors                       |
