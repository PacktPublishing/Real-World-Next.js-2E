# Chapter 9 — Tailwind CSS

The Tailwind examples from *Chapter 9, CSS and Built-in Styling Methods*.

## Routes

| Route | Shows |
|---|---|
| `/` | The landing page rebuilt with utility classes |
| `/card` | The product card the chapter builds up section by section: responsive prefixes, `dark:` variants, a `clsx` status badge, and both ways of reusing a class list |

## Where the chapter's configuration lives

Tailwind v4 has no `tailwind.config` file. Everything the chapter configures is
in `app/globals.css`:

- `@custom-variant dark (&:where(.dark, .dark *))` — rekeys the `dark:` variant
  off a class so `ThemeToggle` can drive it, replacing v3's `darkMode: 'class'`
- `@theme { --color-brand: ... }` — generates `bg-brand`, `text-brand-light`,
  `font-display` and friends
- `@layer components { .btn-primary { @apply ... } }` — the `@apply` escape
  hatch, shown next to `PrimaryButton`, the React component the chapter argues
  is the better abstraction

## Running it

From the repository root:

```bash
pnpm install
pnpm --filter 09-tailwind-css dev
```

## Notes on this repository copy

- **`app/card/page.tsx`** is not a listing in the chapter. It exists so the
  card, the badge, the two button approaches and the theme toggle render
  together on one route.
- **`ProductCard`** is kept in its final state, with both the responsive
  prefixes and the `dark:` variants the chapter adds in successive listings.
