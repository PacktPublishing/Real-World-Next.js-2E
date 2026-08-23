// Repository scaffolding, not printed in the chapter.
//
// The chapter's tracing examples call db.orders.findUnique and
// db.customers.findUnique, in the shape an ORM such as Prisma exposes. This is
// an in-memory stand-in with that shape, so the spans in lib/orders.ts wrap
// something real.
type Order = {
  id: string
  customerId: string
  total: number
}

type Customer = {
  id: string
  name: string
  email: string | null
}

const orders: Order[] = [
  { id: '1001', customerId: 'c-1', total: 82.4 },
  { id: '1002', customerId: 'c-2', total: 145.0 },
]

const customers: Customer[] = [
  { id: 'c-1', name: 'John Doe', email: 'john@example.com' },
  // The null email is the field the chapter's warning log exists to catch
  { id: 'c-2', name: 'Jane Roe', email: null },
]

export const db = {
  orders: {
    async findUnique({ where }: { where: { id: string } }) {
      const order = orders.find((o) => o.id === where.id)
      if (!order) throw Object.assign(new Error('Order not found'), {
        code: 'ORDER_NOT_FOUND',
      })
      return order
    },
  },
  customers: {
    async findUnique({ where }: { where: { id: string } }) {
      const customer = customers.find((c) => c.id === where.id)
      if (!customer) throw Object.assign(new Error('Customer not found'), {
        code: 'CUSTOMER_NOT_FOUND',
      })
      return customer
    },
  },
}
