---
name: format-post
description: Format and check a blog post, garden note, or now entry for sumedhphadke.com without touching the writing. Use when the user says "format this post", "clean up this note", "check my post", "I wrote a post" — or after they hand-write or paste content into src/content/.
---

# format-post

The user writes. You handle the mechanical layer around the writing.

## The rule that outranks everything else in this file

**Never change a word of the writing.** Not a sentence, not a heading, not a
link's text, not a comma, not a capital letter. Not "just" a typo. Not to fix
grammar. Not to tighten a line you think is loose.

If something in the prose is wrong, **say so and leave it**. The user fixes it,
or asks you to. A skill that quietly rewrites someone's sentences is worse than
no skill.

`title` and `description` are writing too. So are tags.

When in doubt about whether something counts as writing: it does. Report it.

## What you may change without asking

This is the whole list. Nothing is implied by it.

- **Frontmatter shape** — add a missing field the schema requires, drop one it
  doesn't define, order the fields to match `src/content.config.ts`. Field
  *values* are the user's, except to add YAML quoting where a value would
  otherwise mis-parse (a bare `:` or leading `#`).
- **Trailing whitespace**, with one exception below.
- **A missing final newline.**
- **Tabs used as indentation in frontmatter** → spaces.

The exception: a line ending in exactly two spaces is a markdown hard line
break. Stripping it deletes a `<br>` the user asked for. Leave those alone.

## What you may never change without being asked

- Any character of the body prose, including headings and link text
- `title`, `description`, `tags` values
- Line wrapping. The two existing posts wrap at 71 and 372 characters — the
  repo has no convention, so there is nothing to normalise toward. Reflowing
  also produces a diff where every line looks edited, which buries anything
  that was.
- Straight quotes ↔ smart quotes, `--` ↔ `—`, any punctuation substitution
- `date` / `planted` / `tended` values. `z.coerce.date()` accepts a full
  timestamp; rewriting `2024-07-06T08:00:00+05:30` to `2024-07-06` silently
  discards data and can reorder the index.
- The slug half of a filename — that is the post's URL. Renaming it breaks
  every existing link to the post.
- `draft: false` → the user publishes, not you.

## Report, don't fix

Run these, then tell the user what you found. Fix nothing here unasked.

- **Slug collisions.** The date prefix is stripped to build the URL, so two
  posts whose names differ only by date fight over one route and the build
  fails. Empty output is good:
  ```
  ls src/content/blog/*.mdx | sed 's#.*/##; s/\.mdx$//; s/^[0-9]\{4\}-[0-9]\{2\}-[0-9]\{2\}-//' | sort | uniq -d
  ```
- **Filename date ≠ frontmatter date.** The site sorts on frontmatter
  (`src/pages/blog/index.astro:7`); the filename only sorts the directory.
  Nothing checks they agree, so they drift silently.
- **A `# H1` in the body.** `blog/[...slug].astro:29` already renders the title
  as the page's `h1`. A second one is a document-outline bug, not a style
  preference. Body headings start at `##`.
- **MDX hazards.** A bare `{` or `<` in prose is a JSX expression to MDX and
  fails the build. Report the line. Escaping it edits the prose — ask first.
- **Filename characters.** `github-slugger` deletes dots and `&` rather than
  converting them, and keeps underscores and accents: `notes.v2.mdx` becomes
  `/blog/notesv2`. Surprising, not broken — flag it and let the user rename.
- **Empty `description` on a post with `draft: false`.** It ships as the
  `<meta name="description">` and the og:description.
- **CRLF line endings.** `hello.mdx` is CRLF, `leaving-linedata.mdx` is LF.
  Don't rewrite the file to fix this — the real fix is one line in
  `.gitattributes` covering `*.mdx`/`*.md`, which fixes it for every file at
  once and for every future clone. Suggest that instead.

## Verify

`astro check` only covers types. MDX bodies compile during the build, so a
post with a stray brace passes check and fails the build. Run `npm run build`
when you have touched a content file.

## Output

Report as two lists, in this order:

1. **Changed** — each edit, one line each. If nothing, say "nothing to change".
2. **Found** — everything from *Report, don't fix*, each with the file and line.

No summary paragraph. No praise for the writing. If both lists are empty, say
the post is clean and stop.
