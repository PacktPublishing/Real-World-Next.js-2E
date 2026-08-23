# Chapter 17 — Wanderstay

The booking system built in *Chapter 17, Building a Booking System*: Better
Auth for identity, Drizzle and PostgreSQL for data, a transaction plus a
PostgreSQL exclusion constraint against double bookings, and Stripe Checkout
with a webhook as the source of truth.

## Running it

```bash
cp .env.example .env      # then fill in the values
pnpm install
pnpm --filter 17-wanderstay db:migrate
pnpm --filter 17-wanderstay db:seed
pnpm --filter 17-wanderstay dev
```

The seed creates a host account (`host@wanderstay.test` /
`wanderstay-demo-password`) and three listings. Sign up as a *different* user to
book one.

For the payment loop, forward Stripe's test-mode events to the dev server and
put the `whsec_…` it prints into `.env`:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Then pay with `4242 4242 4242 4242`, and watch the trips page flip the booking
from pending to confirmed. `stripe trigger checkout.session.expired` exercises
the other branch.

## Verified against a real database

The concurrency design is the heart of this chapter, so it was checked rather
than assumed. Against PostgreSQL 16, with the migrations applied:

1. A second booking overlapping a `pending` one is **rejected** by
   `booking_no_overlap`.
2. `isOverlapViolation()` **recognises** the rejection — Drizzle wraps the
   driver error, so `23P01` arrives on `err.cause.code`, which is exactly the
   shape that function checks for.
3. A booking starting on another's check-out day is **accepted**, so the strict
   inequalities are right.
4. A booking overlapping an `expired` one is **accepted**, so the constraint's
   `WHERE (status IN ('pending','confirmed'))` clause releases dates correctly.

## Four corrections to the chapter

Each of these blocks the build or the app, and each is committed here in fixed
form with a comment at the site.

### 1. `drizzle.config.ts` must list both schema files

The chapter sets `schema: './lib/db/schema.ts'`. drizzle-kit only collects
tables from the files it is pointed at — it does not follow the
`import { user } from './auth-schema'` inside `schema.ts`. With one path,
`drizzle-kit generate` reports **2 tables** and produces a migration that
creates `listing` and `booking` with foreign keys to a `user` table that is
never created, so `drizzle-kit migrate` fails.

Listing both files reports **6 tables**, which is the number the chapter says
the database should hold.

### 2. `drizzleAdapter` needs the schema passed explicitly

The chapter calls `drizzleAdapter(db, { provider: 'pg' })`. Because
`lib/db/index.ts` deliberately calls `drizzle()` without a schema object —
which the chapter explains well, and which is the right call — the adapter has
no way to find the models, and every auth call fails at runtime:

```
[# Drizzle Adapter]: The model "user" was not found in the schema object.
Please pass the schema directly to the adapter options.
```

`next build` succeeds either way, so this only appears on first use.
`lib/auth.ts` here passes `schema: authSchema`.

### 3. `startCheckout` cannot be a form action as written

The chapter's pay page does:

```tsx
<form action={startCheckout.bind(null, row.id)}>
```

`startCheckout` returns `{ error: string }` on its two defensive branches, and
a form `action` must return `void | Promise<void>`, so this fails typechecking:

```
Type '{ error: string; }' is not assignable to type 'void'.
```

Beyond the type, a returned object has nowhere to go in a plain no-JavaScript
form — nothing would render the message. `startCheckout` is kept exactly as
printed; the page wraps it in a small server action that handles the result.

### 4. `@better-auth/cli@latest` does not match `better-auth@latest`

The chapter installs `better-auth` and then generates the schema with
`pnpm dlx @better-auth/cli@latest generate`. Those two packages version
independently, and at the time of writing `@better-auth/cli` was at **1.4.21**
while `better-auth` was at **1.7.1**. The schema the older CLI generates is
missing fields the newer runtime expects, and auth fails with:

```
The field "issuer" does not exist in the "account" Drizzle schema.
```

This project therefore pins `better-auth@1.4.21` so the chapter's generate
command produces a matching schema. When the CLI catches up, unpin both. The
general rule worth adding to the text: the CLI version and the `better-auth`
version have to match.

## Notes on this repository copy

- **`app/sign-in/page.tsx`** — the chapter says this page is "nearly
  identical … it's in the chapter's repository". This is it, including reading
  the `?from=` parameter the proxy sets.
- **`scripts/seed.ts`** — likewise referenced but not printed. It creates the
  host through Better Auth rather than inserting a `user` row directly, so the
  password is hashed the same way a real sign-up would be.
- **`app/layout.tsx`**, **`app/page.tsx`** — the shell and a redirect to
  `/listings`; not listings in the chapter.
- **`.env.example`** — the four variables the chapter introduces.
- **`lib/db/auth-schema.ts`** is generated output, committed because
  `lib/db/schema.ts` imports from it and nothing compiles without it.

## A reminder from the chapter worth repeating

`proxy.ts` calls `getSessionCookie`, which checks that a cookie *exists*. It
does not validate the session, and anyone can forge a cookie with the right
name. That is deliberate: the proxy is a redirect for signed-out visitors, kept
cheap so it adds no database query per request. Every page, Server Action and
Route Handler that touches protected data calls `auth.api.getSession` itself.
The proxy is a doormat, not a lock.
