# Chapter 15 — OpenNext on Cloudflare Workers

The Cloudflare adapter configuration from *Chapter 15, Different Deployment
Platforms*.

| File | Purpose |
|---|---|
| `wrangler.jsonc` | Worker entry point, compatibility flags, and the assets binding |
| `open-next.config.ts` | The three ISR mechanisms: `incrementalCache`, `queue`, `tagCache` |

`pnpm --filter 15-opennext-cloudflare build` runs a normal `next build` and
passes. The OpenNext build and deploy are separate commands, and they need a
Cloudflare account plus the R2 bucket, Durable Object and D1 database that the
three cache overrides bind to:

```bash
pnpm dlx @opennextjs/cloudflare build
pnpm dlx wrangler deploy
```

## Why all three cache settings matter

ISR is three mechanisms rather than one, and an empty configuration leaves them
unset so pages that should revalidate simply won't:

- `incrementalCache` — where rendered pages live (R2 here)
- `queue` — what triggers the background re-render when a page's window expires;
  without it, time-based revalidation never fires and pages stay stale forever
- `tagCache` — backs on-demand revalidation, so `revalidateTag` and
  `revalidatePath` need it and nothing else does

OpenNext's caching documentation lists the alternatives for each slot, and it
is worth checking before copying: this is the part of the adapter that moves
most.
