import Link from 'next/link'

const examples = [
  { href: '/posts', label: 'TanStack Query — prefetch, hydrate, mutate' },
  { href: '/inspections', label: 'TanStack DB — optimistic local-first writes' },
  { href: '/profile', label: 'TanStack Form — Zod schema and a Server Action' },
  { href: '/products', label: 'TanStack Virtual — 10,000 rows' },
  { href: '/products/infinite', label: 'Virtual + Query — infinite scroll' },
  { href: '/products/search', label: 'TanStack Pacer — debounced search' },
]

export default function Home() {
  return (
    <main>
      <h1>Chapter 8 — TanStack and Next.js</h1>
      <ul>
        {examples.map((example) => (
          <li key={example.href}>
            <Link href={example.href}>{example.label}</Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
