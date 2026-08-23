// Repository scaffolding, not printed in the chapter.
//
// Stands in for the data access behind DashboardMetrics. It fails the first
// time it is called and succeeds afterwards, which is what makes the retry()
// callback demonstrable: the chapter's point is that retry() re-runs the fetch
// on the server, so a transient failure recovers with fresh data, where the
// older reset() would only re-render the same failed result.
let attempts = 0

export type Metrics = {
  orders: number
  revenue: number
  generatedAt: string
}

export async function loadMetrics(): Promise<Metrics> {
  attempts += 1

  if (attempts === 1) {
    throw new Error('Metrics database timed out')
  }

  return {
    orders: 128,
    revenue: 8214.5,
    generatedAt: new Date().toISOString(),
  }
}
