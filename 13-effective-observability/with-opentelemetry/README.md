# Chapter 13 — OpenTelemetry

The vendor-neutral half of *Chapter 13, Effective Observability*.

`lib/orders.ts` is deliberately the same `loadOrderSummary` function the Sentry
example traces, rewritten against the OpenTelemetry API. Comparing the two
files side by side is the point: OTel is more verbose and we manage the span's
lifecycle ourselves, and in exchange the function reports to any OTLP backend
without a rewrite.

## The files

| File | Purpose |
|---|---|
| `instrumentation.ts` | `registerOTel` for framework-level spans, plus `onRequestError` typed as `Instrumentation.onRequestError` |
| `lib/orders.ts` | Custom spans via `tracer.startActiveSpan`, with `setAttribute`, `addEvent`, `recordException` and `setStatus` |

The five packages in `package.json` are all required. `@vercel/otel` declares
`@opentelemetry/api`, `sdk-logs`, `api-logs` and `instrumentation` as peer
dependencies rather than bundling them, so a traces-only setup appears to work
without them and then fails at runtime the moment logs or metrics are touched.

For per-`fetch` spans rather than framework-level ones only, set
`NEXT_OTEL_VERBOSE=1`.

## This will not send anything anywhere

`registerOTel` is configured with a service name but no exporter, so spans are
generated and discarded. Point it at a Collector to see them.

The `onRequestError` hook POSTs to `https://our-collector.example.com/errors`,
which is the chapter's placeholder and does not resolve. It only runs when a
request errors.

## Notes on this repository copy

- **`lib/db.ts`** is the same in-memory stand-in as the Sentry example, so the
  two `loadOrderSummary` implementations wrap identical work.
- **`app/orders/page.tsx`** gives the traced function a route to run on.

## Running it

```bash
pnpm install
pnpm --filter 13-with-opentelemetry dev
```
