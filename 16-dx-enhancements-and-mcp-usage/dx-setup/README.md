# Chapter 16 — DX Enhancements and MCP Usage

The developer-experience tooling from *Chapter 16, DX Enhancements and MCP
Usage*. The `app/` directory here is a placeholder; everything worth reading is
configuration at the project root.

## Files

| File | From the chapter |
|---|---|
| `.husky/pre-commit` | `pnpm exec lint-staged` — formatting and linting on staged files only |
| `.husky/pre-push` | `pnpm exec tsc --noEmit && pnpm test` — the slower tier |
| `package.json` → `lint-staged` | Which commands run against which file patterns |
| `dangerfile.ts` | The four starter rules: PR size, description, lockfile drift, tests |
| `.github/workflows/test.yml` | The Danger job, alongside the test job from Chapter 11 |
| `CLAUDE.md` | Persistent agent context |
| `.mcp.json` | Registering the Next.js DevTools MCP connector |

## Activating the hooks

The `.husky/` directory is committed, but the hooks are not wired into Git
until husky is initialised. The chapter's setup is:

```bash
pnpm add -D husky lint-staged
pnpm exec husky init
```

`husky init` adds a `prepare` script to `package.json` that runs after every
install, which is how teammates get the hooks for free. **That script is
deliberately not committed here**: this example lives inside the book's
monorepo, and a `prepare` script would repoint `core.hooksPath` for the whole
repository on `pnpm install`. Add it when you lift this setup into a project of
its own.

The escape hatches are worth knowing before you need them: `git commit
--no-verify` skips a hook once, and `HUSKY=0` disables them for a session.

## `pnpm test` in the pre-push hook

This example has no test suite of its own. The `pnpm test` in `.husky/pre-push`
refers to the Vitest suite built in Chapter 11 — see
`../../11-testing-nextjs/article-app`. As the chapter notes, any command that
exits non-zero on failure works in its place.

## Running Danger

Danger runs in CI against a pull request. To iterate on rules locally without
pushing:

```bash
pnpm exec danger pr <PR-url>
```

Two things the chapter flags that fail silently otherwise: the `permissions`
block is required because many repositories default `GITHUB_TOKEN` to
read-only, and Danger cannot comment on pull requests opened from forks because
GitHub forces the token read-only there.

## The MCP connector

`.mcp.json` registers the connector for the whole team. The one-command
equivalent is:

```bash
claude mcp add next-devtools -- npx -y next-devtools-mcp@latest
```

The `--` separator matters: everything after it is the command to run.

The runtime tools (`nextjs_index`, `nextjs_call`) need Next.js 16 or later with
a dev server running; the gateway tools (`nextjs_docs`, `browser_eval`) work
regardless. The chapter is explicit that this package's tool inventory moves
between versions, so check it against whatever `@latest` resolves to on the
day.

`/_next/mcp` is development-only and never present in a production build, but
it is unauthenticated. Keep the dev server bound to localhost.
