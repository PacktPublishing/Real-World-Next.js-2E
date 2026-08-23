# Chapter 15 — A custom adapter

The Adapter API example from *Chapter 15, Different Deployment Platforms*.

Run the build and the adapter's hooks print what they receive:

```bash
pnpm install
pnpm --filter 15-custom-adapter build
```

## Two corrections to the chapter's listings

### 1. `adapterPath` needs an absolute path

The chapter writes:

```ts
const nextConfig: NextConfig = {
  adapterPath: './my-adapter.mjs',
}
```

Next.js resolves that value with `require.resolve()` from inside its own
package (`next/dist/server/config.js`), so a bare relative path is looked up
against `node_modules/next` and the build fails:

```
Error: Cannot find module './my-adapter.mjs'
Require stack:
- .../node_modules/next/dist/server/config.js
```

An absolute path resolves, and so does a package name — which is how the
OpenNext adapters are referenced. This project uses:

```ts
adapterPath: path.join(process.cwd(), 'my-adapter.mjs')
```

Next.js also reads a `NEXT_ADAPTER_PATH` environment variable as an
alternative to the config field.

### 2. The `onBuildComplete` argument shape

The chapter sketches the argument as `{ routes, prerenders }` and calls it
"lightly simplified", which is fair — but the `onBuildComplete` listing
destructures those two names, and on Next.js 16.3.2 both come back
`undefined`. The real top-level keys are:

```
routing, outputs, config, distDir, buildId, nextVersion, projectDir, repoRoot
```

Route information lives one level down:

- `outputs` → `pages`, `pagesApi`, `appPages`, `appRoutes`, `prerenders`,
  `staticFiles`
- `routing` → `beforeMiddleware`, `middlewareMatchers`, `beforeFiles`,
  `afterFiles`, `dynamicRoutes`, `onMatch`, `fallback`, `rsc`, …

`my-adapter.mjs` here reads the real shape and prints a summary, so the build
output shows the typed description the API actually hands over.
