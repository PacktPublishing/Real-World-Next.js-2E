# Chapter 8 — TanStack and Next.js

The worked examples from *Chapter 8, TanStack and Next.js*.

The chapter's listings are focused excerpts rather than one continuous build,
so this is the complete, runnable project they are excerpted from. Every
section shares one app: one `QueryClient`, one set of data modules, one layout.

## The examples

| Route | Library | Files |
|---|---|---|
| `/posts` | TanStack Query | `app/posts/`, `components/new-post-form.tsx`, `components/post-link.tsx` |
| `/posts/[id]` | Query + Server Components | `app/posts/[id]/` |
| `/inspections` | TanStack DB | `lib/collections/inspections.ts`, `app/inspections/` |
| `/profile` | TanStack Form + Zod | `lib/schemas/profile.ts`, `app/profile/` |
| `/products` | TanStack Virtual | `app/products/product-list.tsx` |
| `/products/infinite` | Virtual + Query | `app/products/infinite-product-list.tsx` |
| `/products/search` | TanStack Pacer | `app/products/product-search.tsx` |

## Running it

From the repository root:

```bash
pnpm install
pnpm --filter 08-tanstack dev
```

Then open <http://localhost:3000>.

## Notes on this repository copy

A few things exist here that the chapter does not print, because a runnable
project needs them:

- **Route Handlers** under `app/api/` back the components that fetch from
  `/api/posts`, `/api/products`, `/api/products/search` and `/api/inspections`.
  Each file says so at the top.
- **`lib/products.ts`** carries a working `getProducts` implementation. The
  chapter describes it as standing in for a database query; here it builds a
  deterministic 10,000-row catalogue, which is what makes the virtualization
  example worth looking at.
- **`lib/inspections-store.ts`** is an in-memory stand-in for the inspections
  backend. It resets when the server restarts.
- **`app/products/product-list-measured.tsx`** is the variable-height
  virtualizer variant the chapter shows as a follow-up to the fixed-height
  listing. Both are kept so each listing in the text has a file here.
- **`app/posts/posts-overview.tsx`** is the client-only `useQuery` shape the
  chapter shows first, before replacing it with the prefetching version. The
  `/posts` route uses the prefetching version; this file is kept for reference.
- The `/posts` examples fetch from `https://jsonplaceholder.typicode.com`, so
  they need network access.

## Version sensitivity

The chapter notes that several of these APIs are version-sensitive. The
versions this project is pinned to are in `package.json`; TanStack DB and
TanStack Pacer had not reached 1.0 at the time of writing, so treat their
APIs as the most likely to shift.
