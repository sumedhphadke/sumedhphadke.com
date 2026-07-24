---
name: new-content
description: Create a new blog post, garden note, or now entry for sumedhphadke.com. Use whenever the user wants to write, start, draft, or add a post, note, or entry — or says something like "new blog post", "add a garden note", "log a now update".
---

# new-content

Turn a thought into a file. One question, then the file exists.

## Step 1 — ask once

If the user hasn't already said which collection, ask: **blog, garden, or now?**
Also take the title in the same question if you don't have it. That is the only
question you get. Everything else is derived or defaulted.

## Step 2 — derive

- **Slug**: lowercase the title, strip anything that isn't a letter, number or
  space, collapse spaces to `-`. Drop leading articles only if the title starts
  with one and the slug reads better without it.
- **Dates**: today, `YYYY-MM-DD`, unquoted.
- If the target path already exists, append `-2`, `-3`, … rather than
  overwriting. Never overwrite.
- **Blog slugs must be unique across all dates.** The date prefix is stripped
  to build the URL, so `2025-04-10-hello.mdx` and `2026-01-02-hello.mdx` both
  want `/blog/hello` and the build will fail on the duplicate route. Check the
  existing filenames with their dates stripped before settling on a slug.

## Step 3 — write the file

Frontmatter must match `src/content.config.ts` exactly. Read it if unsure —
the schema is the contract, this table is a summary.

**blog** → `src/content/blog/YYYY-MM-DD-slug.mdx`, served at `/blog/slug`
(the date sorts the files on disk; `src/lib/slug.ts` strips it from the URL)

```
---
title: "<title>"
date: <today>
description: ""
tags: []
draft: true
---
```

**garden** → `src/content/garden/slug.md`

```
---
title: "<title>"
planted: <today>
tended: <today>
stage: seed
tags: []
---
```

**now** → `src/content/now/YYYY-MM-DD.md`

```
---
title: "<title>"
date: <today>
category: <ask only if not obvious: professional | personal | health | learning>
---
```

## Rules

- **Never invent body content.** The file ends after the closing `---` and a
  single newline. No headings, no lorem, no "TODO", no outline. The writing is
  the user's job; the file is yours.
- `description` stays empty for blog — the user writes it. Don't guess a
  one-liner from the title.
- New blog posts start `draft: true`. Garden notes have no draft state; `stage`
  carries maturity and starts at `seed`.
- `category` is a fixed enum on `now`. If the title makes it obvious, pick it;
  otherwise it's the one follow-up you're allowed.
- Report the path you created. Nothing else.
