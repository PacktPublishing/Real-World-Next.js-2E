# Acme storefront

## Commands
- pnpm dev: start the dev server
- pnpm test: run Vitest once
- pnpm test:e2e: run Playwright tests (requires a build)

## Conventions
- App Router only; there are no pages/ directories
- Server Components by default; add 'use client' only when needed
- Tests live in __tests__ directories next to the source
- Styling is Tailwind; do not introduce CSS-in-JS
- Use pnpm, not npm or yarn

## Don't
- Don't edit anything under .next/
- Don't add new dependencies without asking first
- Don't disable ESLint rules to make errors go away
