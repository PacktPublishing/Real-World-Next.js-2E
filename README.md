# Real-World Next.js, Second Edition

Code examples for *Real-World Next.js, Second Edition*, published by Packt.

The second edition is built on the **App Router**, **TypeScript**, **Tailwind CSS**,
and **pnpm**, targeting Next.js 16. The first-edition examples (Pages Router,
JavaScript, Yarn) remain available in this repository's git history and on the
first-edition repository:
<https://github.com/PacktPublishing/Real-World-Next.js>.

## Repository layout

Each chapter has its own folder, numbered to match the book. Inside it, every
worked example is a standalone, runnable Next.js application:

```
NN-chapter-slug/
└── example-slug/
    ├── app/
    ├── package.json
    └── ...
```

## Running an example

The repository is a pnpm workspace, so a single install at the root covers
every example:

```bash
pnpm install
```

Then run whichever example you're reading about:

```bash
pnpm --filter <example-slug> dev
```

Each example also carries its own `README.md` describing what it demonstrates
and any setup it needs (environment variables, a database, third-party keys).

## Requirements

- Node.js 20 or later
- pnpm 9 or later

## License

See [LICENSE](./LICENSE).
