import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { nextCookies } from 'better-auth/next-js'
import { db } from '@/lib/db'
import * as authSchema from '@/lib/db/auth-schema'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    // The chapter passes only { provider: 'pg' }. Because lib/db/index.ts
    // deliberately calls drizzle() without a schema object — which the chapter
    // explains, and which is right — the adapter has no way to find the user,
    // session, account and verification models, and every auth call fails at
    // runtime with:
    //   [# Drizzle Adapter]: The model "user" was not found in the schema
    //   object. Please pass the schema directly to the adapter options.
    // The build succeeds either way, so this only shows up on first use.
    // See this project's README.
    schema: authSchema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [nextCookies()], // keep this last in the plugins array
})
