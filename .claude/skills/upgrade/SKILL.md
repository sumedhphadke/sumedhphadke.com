---
name: upgrade
description: Upgrade Astro, its integrations, or Node on sumedhphadke.com — especially across a major version. Use when the user wants to update dependencies, bump a package, adopt a new Astro release, or asks what's out of date.
---

# upgrade

This site tracks latest stable. Astro, its integrations, and Node all move up
as releases land, including majors. Nothing is pinned — pinned majors in a
doc go stale and then contradict the repo.

That policy is only safe because the site is small and verifiable, which is
why majors follow this order rather than an upgrade-when-convenient rhythm.

## The order

1. **Read the official migration guide first.** Never infer breaking changes
   from a diff or a changelog summary.
2. **Upgrade on a branch.** Bump integrations to their matching majors in the
   same commit — `@astrojs/mdx` and `@astrojs/cloudflare` release in lockstep
   with core, and a mismatched pair fails in ways that look like your code.
3. **`astro check` clean, then `npm run build`, then compare rendered output
   against `main`.** Check passes on plenty of things that break at build:
   MDX bodies only compile during the build.
4. **Merge, or revert.** Don't leave a half-migrated branch alive.

## Comparing rendered output

Step 3's diff is the actual gate — see the Verification section of
`.claude/CLAUDE.md` for how output gets checked, and use `agent-browser`
from bash. Both themes. A major that changes CSS ordering or hydration will
show up there and nowhere else.

## If a release can't be adopted

Record why, with a date, in the Current state section of `.claude/CLAUDE.md`.
An unexplained lag is how a site quietly becomes unmaintainable.
