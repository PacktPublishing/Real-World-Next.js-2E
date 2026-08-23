// The chapter says "The chapter repository includes scripts/seed.ts, which
// inserts a host account and a handful of listings". This is that script.
//
// Run it after the migrations:
//   pnpm exec tsx scripts/seed.ts
import { auth } from '../lib/auth'
import { db } from '../lib/db'
import { listing } from '../lib/db/schema'
import { user } from '../lib/db/auth-schema'
import { eq } from 'drizzle-orm'

const HOST_EMAIL = 'host@wanderstay.test'
const HOST_PASSWORD = 'wanderstay-demo-password'

async function main() {
  // Create the host through Better Auth rather than inserting a user row
  // directly, so the password is hashed the same way a real sign-up would be
  // and the account row it needs exists.
  let [host] = await db.select().from(user).where(eq(user.email, HOST_EMAIL))

  if (!host) {
    await auth.api.signUpEmail({
      body: {
        name: 'Wanderstay Host',
        email: HOST_EMAIL,
        password: HOST_PASSWORD,
      },
    })
    ;[host] = await db.select().from(user).where(eq(user.email, HOST_EMAIL))
    console.log(`Created host ${HOST_EMAIL} / ${HOST_PASSWORD}`)
  } else {
    console.log(`Host ${HOST_EMAIL} already exists`)
  }

  const existing = await db.select().from(listing)
  if (existing.length > 0) {
    console.log(`${existing.length} listings already present; nothing to do.`)
    return
  }

  // Prices are integers in cents, per the rule from the chapter.
  await db.insert(listing).values([
    {
      hostId: host.id,
      title: 'Sunlit loft above the harbour',
      description:
        'A one-bedroom loft with west-facing windows, a small balcony, and a kettle that whistles louder than advertised.',
      location: 'Porto, Portugal',
      pricePerNight: 12_900,
    },
    {
      hostId: host.id,
      title: 'Cabin at the edge of the pine wood',
      description:
        'Wood stove, no wifi, and a footpath that reaches the lake in eleven minutes.',
      location: 'Dalarna, Sweden',
      pricePerNight: 8_450,
    },
    {
      hostId: host.id,
      title: 'Courtyard apartment near the market',
      description:
        'Ground floor, thick walls, and the fruit stalls open under the window at six.',
      location: 'Valencia, Spain',
      pricePerNight: 10_500,
    },
  ])

  console.log('Seeded 3 listings.')
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
