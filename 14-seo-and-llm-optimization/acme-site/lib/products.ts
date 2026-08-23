import { db } from '@/lib/db'

export async function getProductsPage({
  page,
  pageSize,
}: {
  page: number
  pageSize: number
}) {
  return db.products.findMany({ skip: page * pageSize, take: pageSize })
}
