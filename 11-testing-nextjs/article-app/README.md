# Chapter 11 — Testing Next.js

The article application from *Chapter 11, Testing Next.js*.

The chapter states that everything it tests "belongs to one small article
application", so this is a single project rather than one folder per tool.
Vitest, React Testing Library, MSW, Playwright and Storybook all point at the
same codebase.

## Running the tests

From the repository root:

```bash
pnpm install
pnpm --filter 11-article-app test          # Vitest: 26 tests, all passing
pnpm --filter 11-article-app test:coverage # with a coverage report
```

For the end-to-end suite, install the browsers first:

```bash
pnpm --filter 11-article-app exec playwright install
pnpm --filter 11-article-app test:e2e      # 5 of 7 passing — see below
```

Playwright's `webServer` block builds and starts the app itself, and sets
`NEXT_PUBLIC_API_MOCKING=enabled` so `instrumentation.ts` starts MSW inside the
Next.js server process. If a `pnpm dev` server is already running without that
variable, Playwright reuses it, MSW never starts, and the article tests fail
locally while passing in CI. Stop the dev server first.

## Two tests that cannot pass as written

Both are faithful transcriptions of the chapter, and both fail. They are
recorded here rather than quietly patched, because fixing them means changing
a listing the book prints.

### 1. `e2e/navigation.spec.ts` — "should open an article from the list"

The test locates the article link by accessible name:

```ts
page.getByRole('link', { name: /Healthy summer melon-carrot soup/ })
```

`ArticleCard` renders `<Link><article><h2>{title}</h2>…</article></Link>`.
Under the accessible-name computation, `article` is not a name-from-content
role, so its subtree is excluded when the link's name is derived from its
contents. The link's `textContent` contains the title, but its **accessible
name is empty**, and the locator matches zero elements.

Verified against the running page: two links render, both with the expected
`textContent`, and `getByRole('link', { name: /Healthy/ })` resolves to 0.

Either side can be changed to fix it:

- add `aria-label={title}` to the `Link` in `ArticleCard`, or move `<article>`
  outside the `Link` — this also makes the component genuinely accessible,
  which is what the chapter argues role-based queries are for; or
- change the locator to `page.getByRole('link').filter({ hasText: /…/ })`.

### 2. `e2e/article-creation.spec.ts` — "should publish a valid article and redirect to it"

The test fills in the title "Testing Next.js end to end", submits, follows the
redirect, and asserts the new title appears in the `h1`.

It cannot. `createArticle` does not persist anything ("In a real app, this
would save to a database"), and the MSW handler for
`https://api.example.com/articles/:id` returns a hardcoded
`'Healthy summer melon-carrot soup'` for every id. The redirect lands on
`/articles/<timestamp>`, the page fetches that id, and MSW answers with the
fixture title.

The other half of the test — the short-title validation case — passes, because
it never leaves the form.

Fixing it needs the created article to be readable afterwards: an in-memory
store that `createArticle` writes to and the MSW handler reads from, which
works because `instrumentation.ts` runs MSW in the same process as the action.

## Notes on this repository copy

Files the chapter describes but does not print, supplied so the app runs:

- **`app/articles/page.tsx`** and **`app/articles/articles.ts`** — the article
  list the e2e navigation test clicks through. The first entry's id and title
  are chosen to match the slug the `ArticleCard` unit test asserts.
- **`app/articles/new/article-form.tsx`** — the creation form. The chapter unit
  tests `createArticle` and e2e tests the form, but never prints it. It uses
  `useActionState` so the action's `{ error }` return renders.
- **`app/page.tsx`** and **`app/layout.tsx`** — the shell.
- The `All articles` link on the article page, which `navigation.spec.ts`
  requires.

Storybook is installed only far enough for `ArticleCard.stories.tsx` to
typecheck. The chapter is explicit that Storybook is a second build to
configure and maintain; to actually run it, initialise it in this project with
`pnpm dlx storybook@latest init`.
