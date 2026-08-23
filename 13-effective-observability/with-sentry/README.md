# Chapter 13 — Observability with Sentry

The Sentry setup from *Chapter 13, Effective Observability*, as the wizard
(`pnpm dlx @sentry/wizard@latest -i nextjs`) leaves it, plus the context,
tracing and structured-logging examples the chapter builds on top.

## The files the chapter walks through

| File | Purpose |
|---|---|
| `instrumentation.ts` | Loads the server configs per runtime, and exports `onRequestError` — the hook that captures Server Component, Route Handler, Server Action and Proxy errors |
| `instrumentation-client.ts` | Browser init, replay integration, and the `onRouterTransitionStart` export that makes client navigations visible to tracing |
| `sentry.server.config.ts` | Node.js runtime config, with `enableLogs` |
| `sentry.edge.config.ts` | Edge runtime config |
| `next.config.ts` | Wrapped in `withSentryConfig` for source map uploads |
| `app/global-error.tsx` | Last-resort boundary; only fires when the root layout itself fails |
| `lib/orders.ts` | Custom spans with `Sentry.startSpan`, and the `logger.info` / `logger.warn` calls |
| `app/layout.tsx` | `Sentry.setUser` from the session |

## This will not send anything anywhere

The DSN is the chapter's placeholder,
`https://examplePublicKey@o0.ingest.sentry.io/0`. To point it at a real
project, run the wizard, or replace the DSN in the three config files and set
`org` and `project` in `next.config.ts`.

Source map upload needs a `SENTRY_AUTH_TOKEN`. Without one the build still
succeeds; it just skips the upload.

## On PII

The chapter is emphatic about this and it bears repeating here: the wizard
often sets `sendDefaultPii: true`, which attaches IP addresses, request headers
and request bodies to events, and the `setUser` call in `app/layout.tsx` adds
an email address on top. `sendDefaultPii` is **not** set in this project. Turn
it on deliberately or not at all.

## Notes on this repository copy

- **`lib/db.ts`** is an in-memory stand-in with the `findUnique` shape the
  chapter's tracing examples call. The second customer has a `null` email,
  which is the exact condition the chapter's warning log exists to catch.
- **`lib/session.ts`** stands in for the auth library's `getSession()`.
  Chapter 17 builds the real thing with Better Auth.
- **`app/orders/page.tsx`** gives the traced function a route to run on.
- The chapter mentions the wizard also generates `app/sentry-example-page/`.
  It is deliberately not included: it exists to be deleted once the setup is
  verified.

## Running it

```bash
pnpm install
pnpm --filter 13-with-sentry dev
```
