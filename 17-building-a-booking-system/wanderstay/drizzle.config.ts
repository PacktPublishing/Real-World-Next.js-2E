import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  // The chapter writes this as a single path, './lib/db/schema.ts'.
  // drizzle-kit only collects tables from the files it is pointed at; it does
  // not follow the `import { user } from './auth-schema'` in schema.ts. With
  // only that one path, the migration creates `listing` and `booking` with
  // foreign keys to a `user` table that is never created, and
  // `drizzle-kit migrate` fails. Both files have to be listed for the six
  // tables the chapter describes to exist. See this project's README.
  schema: ['./lib/db/schema.ts', './lib/db/auth-schema.ts'],
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})
