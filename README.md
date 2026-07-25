# sumedhphadke.com

Personal website. Resume, now log, blog, and digital garden.

## Quick start

```bash
npm install
git config core.hooksPath .githooks   # once per clone — see below
npm run dev        # http://localhost:4321
npm run build      # production build to dist/
npx astro check    # type check — must pass before committing
```

### The commit gate

`.githooks/pre-commit` runs `astro check` and aborts the commit if it fails.
Git will not use a checked-in hooks directory on its own, so **a fresh clone
needs `git config core.hooksPath .githooks`** or the gate silently does
nothing. `git commit --no-verify` skips it; that should feel like a decision.

## Publishing content

### Blog post

Create a new `.mdx` file in `src/content/blog/`:

```
src/content/blog/2025-04-15-my-post-slug.mdx
```

Frontmatter:

```yaml
---
title: "Your post title"
date: 2025-04-15
description: "One-line summary shown in the blog list."
tags: ["tag-one", "tag-two"]
draft: false
---
```

- Set `draft: true` to hide it from the blog listing and index
- Tags are optional (defaults to `[]`)
- The date prefix sorts the directory and is **stripped from the URL**:
  `2025-04-15-my-post-slug.mdx` is served at `/blog/my-post-slug`
- Because the date is stripped, slugs must be unique across all dates — two
  posts differing only by date collide on one route and the build fails
- Uses MDX — you can import and use Astro components if needed

### Garden note

Create a new `.md` file in `src/content/garden/`:

```
src/content/garden/my-note-slug.md
```

Frontmatter:

```yaml
---
title: "Note title"
planted: 2025-04-15
tended: 2025-04-15
stage: seed
tags: ["topic"]
---
```

- `planted` — the date you first wrote it
- `tended` — update this date every time you edit the note
- `stage` — one of `seed`, `growing`, or `evergreen`
- Tags are optional
- The filename becomes the URL slug: `/garden/my-note-slug`
- **Backlinks**: if another garden note's body contains this note's slug (e.g. `my-note-slug`), it will appear in the "Referenced by" section automatically
- Garden notes have no draft state — use `stage: seed` for early ideas

### Now entry

Create a new `.md` file in `src/content/now/`:

```
src/content/now/2025-04-15.md
```

Frontmatter:

```yaml
---
title: "What you're doing"
date: 2025-04-15
category: professional
---
```

- `category` — one of `professional`, `personal`, `health`, or `learning`
- `ended` — optional date; add it when the activity is no longer current
- Name the file by date for easy sorting, but any name works
- Entries are listed newest-first on `/now`

### Work / resume

Edit the single file:

```
src/content/work/index.md
```

Write your resume as prose. There is deliberately no PDF download — `/work` is
the resume. The old site's `/files/resume.pdf` is a 404 and stays one.

## Drafts

Two ways to keep content out of production:

1. **Blog only**: set `draft: true` in frontmatter
2. **Any content**: put files in `content/drafts/` (gitignored, never published)

## Updating content

| What you want to do          | What to change                              |
|------------------------------|---------------------------------------------|
| Publish a new blog post      | Add `.mdx` file to `src/content/blog/`      |
| Edit a blog post             | Edit the `.mdx` file, update `date` if relevant |
| Publish a garden note        | Add `.md` file to `src/content/garden/`      |
| Tend a garden note           | Edit the `.md` file, update `tended` date and `stage` |
| Add a now entry              | Add `.md` file to `src/content/now/`         |
| End a now entry              | Add `ended: YYYY-MM-DD` to its frontmatter  |
| Update your resume           | Edit `src/content/work/index.md`             |
| Update homepage intro        | Edit `src/pages/index.astro` (the TODO section) |

## Deploying

Cloudflare Pages. Push to `main` and it builds automatically.

- Build command: `npm run build`
- Output directory: `dist/`

## Giscus (blog comments)

Comments are disabled until you configure Giscus. Edit `src/components/Giscus.astro` and replace the four `TODO` values with your GitHub repo and discussion category IDs. See [giscus.app](https://giscus.app) to generate them.
