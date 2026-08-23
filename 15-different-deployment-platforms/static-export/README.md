# Chapter 15 — Static export

`output: 'export'` from *Chapter 15, Different Deployment Platforms*.

```bash
pnpm install
pnpm --filter 15-static-export build
```

The build writes a fully static site to `out/` — plain HTML, CSS and
JavaScript, deployable to any static host.

## What is given up

No Server Actions, no dynamic Route Handlers, no Proxy, no ISR, and no
on-demand image optimization. `next/image` fails the build here unless
`images.unoptimized: true` is set or a third-party loader is configured.
Server Components still work, but only at build time, and dynamic routes need
`generateStaticParams` to enumerate every value.

## Deploying it

Cloudflare Pages:

```bash
pnpm dlx wrangler pages deploy out
```

AWS S3 and CloudFront — the invalidation is the step teams forget, and the
symptom is the bucket holding the new site while visitors keep seeing the old:

```bash
aws s3 sync out/ s3://acme-site --delete
aws cloudfront create-invalidation \
  --distribution-id ABCD1234 --paths "/*"
```
