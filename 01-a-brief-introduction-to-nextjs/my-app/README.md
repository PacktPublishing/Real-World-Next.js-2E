# Chapter 1 — my-app

The starting project from *Chapter 1, A Brief Introduction to Next.js*.

This is the application `create-next-app` generates with the recommended
defaults, which is the baseline every later chapter builds on:

- TypeScript
- ESLint
- Tailwind CSS
- App Router
- No `src/` directory
- No React Compiler
- An `AGENTS.md` file for AI coding agents

It was generated with:

```bash
pnpm create next-app
```

## What to look at

- `app/layout.tsx` — the root layout. It must contain `<html>` and `<body>`,
  and every Next.js application needs one.
- `app/page.tsx` — the home page, served at `/`.
- `app/globals.css` — global styles. Tailwind v4 is configured here through the
  PostCSS plugin; there is no `tailwind.config` file any more.
- `next.config.ts` — carries the custom configuration shown in the chapter, an
  `images.remotePatterns` entry allowing remote images from `example.com`.

## Running it

From the repository root:

```bash
pnpm install
pnpm --filter 01-my-app dev
```

Then open <http://localhost:3000>.

## A note on `pnpm-workspace.yaml`

The chapter lists `pnpm-workspace.yaml` among the files `create-next-app`
produces. In this repository that file lives at the root instead, because the
whole repository is a single pnpm workspace — a nested one here would make this
folder a separate workspace root.
