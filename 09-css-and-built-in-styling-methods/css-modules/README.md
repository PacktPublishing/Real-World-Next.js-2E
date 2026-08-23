# Chapter 9 — CSS Modules

The CSS Modules examples from *Chapter 9, CSS and Built-in Styling Methods*,
including the Sass subsection.

Tailwind is deliberately **not** installed here. The chapter's CSS Modules
listings use a plain `app/globals.css` reset, so this project is the
create-next-app scaffold with the Tailwind pipeline removed.

## Routes

| Route | Shows |
|---|---|
| `/` | Scoped class names via `Home.module.css`, plus a `:global()` escape hatch |
| `/buttons` | `composes` within a file, and across files from `base.module.css` |
| `/scss` | The same buttons in SCSS: `@extend` and selector nesting |

## Running it

From the repository root:

```bash
pnpm install
pnpm --filter 09-css-modules dev
```

## Notes on this repository copy

- **`styles/_variables.scss`** exists because `next.config.ts` sets
  `sassOptions.additionalData` to `@use "@/styles/variables" as *`. The chapter
  shows the config but not the variables file it points at, so this supplies
  one; the SCSS listings then use `$radius` and the colour variables rather
  than repeating literals.
- **`app/scss/Button.module.scss`** holds the nesting version and
  `Buttons.module.scss` the `@extend` version. The chapter shows both as
  alternatives for the same result, so both are kept as separate files.
- The chapter's `postcss.config.mjs` listing belongs to the Tailwind example
  next door; see `../tailwind-css`.
