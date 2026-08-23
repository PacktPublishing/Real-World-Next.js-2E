# Chapter 14 — SEO and LLM Optimization

The Acme site from *Chapter 14, SEO and LLM Optimization*.

Every listing in the chapter belongs to one site (`acme.com`) and shares the
same content helpers, so this is a single project rather than one folder per
topic.

## What to look at

| Path | Shows |
|---|---|
| `app/layout.tsx` | `metadataBase`, `title.template`, and the environment-aware `robots` field |
| `app/blog/[slug]/page.tsx` | `generateMetadata` with canonical, article timestamps and the repeated `siteName`, plus the JSON-LD `Article` block |
| `app/blog/[slug]/opengraph-image.tsx` | `ImageResponse` with a real font loaded from disk |
| `app/dashboard/layout.tsx` | `noindex` cascading to a whole route tree |
| `app/not-found.tsx` | Explicit `robots` on a 404 |
| `app/robots.ts` | Per-category rules for AI crawlers |
| `app/sitemap.ts` | Typed sitemap with hourly `revalidate` |
| `app/products/sitemap.ts` | `generateSitemaps` chunking past the 50,000-URL limit |
| `app/llms.txt/route.ts` | The llms.txt convention served from a Route Handler |

## Verified behaviour

Running the built app confirms the chapter's claims:

- `<title>` renders as `Edge caching explained | Acme` — the template applied
- `<link rel="canonical">` and every `og:*` URL resolve against `metadataBase`
- `og:image` points at the generated `opengraph-image` route, with
  `og:image:width`, `og:image:height` and `og:image:alt` taken from the
  `size`, `contentType` and `alt` exports — this is why `generateMetadata`
  deliberately leaves `openGraph.images` unset
- the OG route returns a real `1200 x 630` PNG
- `/products/sitemap/0.xml` through `/3.xml` are generated, and
  `/products/sitemap.xml` returns 404, exactly as the chapter warns

Because `VERCEL_ENV` is unset locally, `isProduction` is false and URLs
resolve against `https://staging.acme.com` with `noindex` set. That is the
staging behaviour the chapter describes, not a bug.

## The three robots.txt variants

`app/robots.ts` and `public/robots.txt` both serve `/robots.txt`, so only one
can exist. The live file is the per-bot AI-crawler policy the chapter builds up
to. The two earlier listings and the Content Signals static file are kept in
`reference/`, which is not a route directory:

- `reference/robots-basic.ts` — the first simple listing
- `reference/robots-per-user-agent.ts` — the Googlebot / Applebot listing
- `reference/robots-content-signals.txt` — move to `public/robots.txt` and
  delete `app/robots.ts` to adopt it

## Notes on this repository copy

- **`assets/Inter-SemiBold.ttf`** is required by the OG image route, which
  reads it from disk. The chapter references the file but cannot ship it.
  This is Inter, licensed under the SIL Open Font License. The chapter's
  listing declares it at `weight: 700` while the file is SemiBold (600); that
  is harmless and left as printed.
- **`lib/db.ts`** is an in-memory stand-in with the `findFirst`/`findMany`
  shape the chapter's helpers call.
- **`lib/posts.ts`, `lib/docs.ts`, `lib/products.ts`** are the helper modules
  the listings import. `getPostBySlug` is wrapped in React's `cache`, which is
  the memoization the chapter describes for non-`fetch` data access.
- **`app/page.tsx`** and the blog post body are not listings; they exist so the
  routes are reachable.

## Running it

```bash
pnpm install
pnpm --filter 14-acme-site dev
```
