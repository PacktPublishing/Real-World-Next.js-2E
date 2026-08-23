import { db } from '@/lib/db'

export async function getAllDocPages() {
  return db.docPages.findMany()
}
