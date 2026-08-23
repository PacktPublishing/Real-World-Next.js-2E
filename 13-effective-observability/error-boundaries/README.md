# Chapter 13 — Error boundaries

The error boundary examples from *Chapter 13, Effective Observability*: the
segment-level `error.tsx` with its `retry` callback, and the component-level
boundary built with `catchError`.

## Routes

| Route | Shows |
|---|---|
| `/dashboard` | A `catchError` boundary around a `Suspense` boundary around an async Server Component. The metrics stand-in fails on first load; pressing "Try again" calls `retry()`, which re-runs the fetch **on the server** and recovers. |

`app/dashboard/error.tsx` is the segment-level boundary. It only renders for
errors the component-level boundary does not catch first.

## One deviation from the chapter's listing

The chapter writes the import in `components/ErrorBoundary.tsx` as:

```ts
import {
  unstable_catchError as catchError,
  type ErrorInfo,
} from 'next/error'
```

and says the API is "still behind the `unstable_` prefix as of 16.3". In
Next.js **16.3.2**, which is the version this repository pins, that is no
longer true: `next/error` exports `catchError` directly and there is no
`unstable_catchError` binding at all, so the chapter's import does not
compile. Next's own bundled documentation
(`node_modules/next/dist/docs/.../catchError.md`) uses:

```ts
import { catchError, type ErrorInfo } from 'next/error'
```

This project uses the working form. Because the chapter aliases the import to
`catchError` anyway, the rest of the listing is unchanged. The section heading
"Component-level boundaries with unstable_catchError (aliased to catchError)"
needs the same correction.

The `ErrorInfo` shape the chapter describes is accurate:
`{ error: unknown; reset: () => void; retry: () => void }`.

## Notes on this repository copy

- **`lib/metrics.ts`** fails on its first call and succeeds afterwards. That is
  what makes `retry()` demonstrable — the chapter's point is that `retry()`
  re-fetches on the server, where the older `reset()` would only re-render the
  same failed result.
- **`export const dynamic = 'force-dynamic'`** on the dashboard page, so the
  deliberate first-call failure happens at request time rather than breaking
  the build during prerendering.
- **`app/dashboard/dashboard-metrics.tsx`** supplies the `DashboardMetrics` and
  `MetricsSkeleton` components the chapter's page listing references.

## Running it

```bash
pnpm install
pnpm --filter 13-error-boundaries dev
```
