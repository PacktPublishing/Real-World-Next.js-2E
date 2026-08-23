# Real-World Next.js, Second Edition

Code examples for *Real-World Next.js, Second Edition*, published by Packt.

The second edition is built on the **App Router**, **TypeScript**, **Tailwind
CSS** and **pnpm**, targeting Next.js 16. The first-edition examples (Pages
Router, JavaScript, Yarn) remain in this repository's git history and on the
first-edition repository:
<https://github.com/PacktPublishing/Real-World-Next.js>.

## Chapters

| Chapter | Folder | Examples |
|---|---|---|
| 1 — A Brief Introduction to Next.js | `01-a-brief-introduction-to-nextjs` | `my-app` |
| 8 — TanStack and Next.js | `08-tanstack-and-nextjs` | `tanstack` |
| 9 — CSS and Built-in Styling Methods | `09-css-and-built-in-styling-methods` | `css-modules`, `tailwind-css`, `styled-jsx` |
| 11 — Testing Next.js | `11-testing-nextjs` | `article-app` |
| 13 — Effective Observability | `13-effective-observability` | `error-boundaries`, `with-sentry`, `with-opentelemetry` |
| 14 — SEO and LLM Optimization | `14-seo-and-llm-optimization` | `acme-site` |
| 15 — Different Deployment Platforms | `15-different-deployment-platforms` | `custom-adapter`, `docker`, `static-export`, `opennext-cloudflare`, `opennext-aws-sst` |
| 16 — DX Enhancements and MCP Usage | `16-dx-enhancements-and-mcp-usage` | `dx-setup` |
| 17 — Building a Booking System | `17-building-a-booking-system` | `wanderstay` |

Chapter 20 has no code. Chapters not listed above are not yet in this
repository.

Where a chapter builds one continuous application, it gets one folder;
where it demonstrates independent alternatives, each gets its own.

## Running an example

The repository is a pnpm workspace, so one install at the root covers
everything:

```bash
pnpm install
```

Each example is its own package, named `<chapter>-<example>`:

```bash
pnpm --filter 09-tailwind-css dev
pnpm --filter 11-article-app test
pnpm --filter 17-wanderstay build
```

**Every example has its own `README.md`** describing what it demonstrates, any
setup it needs (environment variables, a database, third-party keys), and any
place where the code here differs from the printed listing and why. Read it
before running the example.

Chapter 17 needs a PostgreSQL database and Stripe test keys; see
`17-building-a-booking-system/wanderstay/README.md`.

## Requirements

- Node.js 20 or later
- pnpm 9 or later

## License

See [LICENSE](./LICENSE).
