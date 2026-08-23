# Chapter 9 — styled-jsx

The styled-jsx example from *Chapter 9, CSS and Built-in Styling Methods*,
in the "State of CSS-in-JS" section.

styled-jsx is a CSS-in-JS library created by Vercel and historically built into
Next.js, so it needs no extra dependency. It scopes rules to the component
automatically; `<style jsx global>` opts a block out of that scoping.

The `'use client'` on the first line of `components/button.tsx` is not
optional. Without it the build fails, because styled-jsx cannot be used in a
Server Component — which is the section's whole argument in one directive.

## Running it

From the repository root:

```bash
pnpm install
pnpm --filter 09-styled-jsx dev
```

## Notes on this repository copy

- **`app/page.tsx`** is not a listing in the chapter; it renders the `Button`
  so the example has a route.
- The chapter recommends CSS Modules or Tailwind over styled-jsx for new App
  Router projects. This example exists to show the runtime constraint, not as
  a pattern to copy.
