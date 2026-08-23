import {
  pgTable,
  text,
  integer,
  uuid,
  date,
  timestamp,
} from 'drizzle-orm/pg-core'
import { user } from './auth-schema'

export const listing = pgTable('listing', {
  id: uuid('id').primaryKey().defaultRandom(),
  hostId: text('host_id')
    .notNull()
    .references(() => user.id), // foreign key: this ID must exist in user
  title: text('title').notNull(),
  description: text('description').notNull(),
  location: text('location').notNull(),
  pricePerNight: integer('price_per_night').notNull(), // in cents
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export const booking = pgTable('booking', {
  id: uuid('id').primaryKey().defaultRandom(),
  listingId: uuid('listing_id')
    .notNull()
    .references(() => listing.id),
  guestId: text('guest_id')
    .notNull()
    .references(() => user.id),
  checkIn: date('check_in').notNull(),
  checkOut: date('check_out').notNull(),
  totalAmount: integer('total_amount').notNull(), // in cents
  status: text('status', {
    enum: ['pending', 'confirmed', 'canceled', 'expired'],
  })
    .notNull()
    .default('pending'),
  stripeSessionId: text('stripe_session_id'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})
