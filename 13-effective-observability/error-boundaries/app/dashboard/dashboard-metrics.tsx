// Repository scaffolding, not printed in the chapter.
import { loadMetrics } from '@/lib/metrics'

export async function DashboardMetrics() {
  const metrics = await loadMetrics()

  return (
    <dl>
      <dt>Orders</dt>
      <dd>{metrics.orders}</dd>
      <dt>Revenue</dt>
      <dd>${metrics.revenue.toFixed(2)}</dd>
      <dt>Generated at</dt>
      <dd>{metrics.generatedAt}</dd>
    </dl>
  )
}

export function MetricsSkeleton() {
  return <p>Loading metrics…</p>
}
