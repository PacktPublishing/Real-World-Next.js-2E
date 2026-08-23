CREATE EXTENSION IF NOT EXISTS btree_gist;

ALTER TABLE booking
ADD CONSTRAINT booking_no_overlap
EXCLUDE USING gist (
  listing_id WITH =,
  daterange(check_in, check_out) WITH &&
)
WHERE (status IN ('pending', 'confirmed'));
