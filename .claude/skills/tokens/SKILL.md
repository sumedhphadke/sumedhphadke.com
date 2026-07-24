---
name: tokens
description: Design token and motion rules for sumedhphadke.com. Use before writing or editing any CSS — in .css files, in Astro <style> blocks, or inline — and whenever adding a colour, spacing, font-size, line-height, radius, or transition.
---

# tokens

## Read first

Read `src/styles/tokens.css` before writing any styles. It is the whole
vocabulary. Do not guess a token name.

## No literals

No hardcoded colour, spacing, font-size, line-height, or radius anywhere
outside `src/styles/tokens.css`. Every one of those is `var(--token)`.

If a value you need doesn't exist:

1. Add the token to `:root` in `tokens.css`.
2. If it's a colour, add the light-mode value under `html.light` in the same
   file. A colour token without a light-mode counterpart is a bug.
3. Then use it.

Fit the existing scales — spacing is a 4px grid (`--space-1` … `--space-16`),
type is a named ramp (`--font-size-xs` … `--font-size-2xl`). A new value that
doesn't land on a scale usually means the design is wrong, not the scale.

Exempt: `0`, `1px` hairline borders, `100%`/`auto`/`none` and other keywords,
and layout numbers with no design meaning (`z-index`, `flex`, `grid-template`).

## Motion

Motion exists to explain a state change. That's the only reason.

- Only on a state change, or to show where something came from.
- Never on page load. Never on scroll. Never to draw attention.
- ≤150ms, `ease-out`.
- Always paired with a `@media (prefers-reduced-motion: reduce)` block that
  degrades it to nothing.
- If you can't say in one sentence what the transition explains, delete it.

```css
.thing {
  transition: opacity 120ms ease-out;
}

@media (prefers-reduced-motion: reduce) {
  .thing {
    transition: none;
  }
}
```

## Never

Tailwind or any utility CSS framework. Component libraries. A CSS dependency
for something 20 lines of plain CSS covers.
