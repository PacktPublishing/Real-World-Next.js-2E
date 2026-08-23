import ErrorBoundary from '@/components/ErrorBoundary'
import { Suspense } from 'react'
import { DashboardMetrics, MetricsSkeleton } from './dashboard-metrics'

// Repository scaffolding, not in the chapter's listing. The metrics stand-in
// throws on its first call so the boundary and its retry() are demonstrable,
// and a prerendered route would hit that throw at build time. Rendering on
// demand keeps the failure where the example wants it: at request time.
export const dynamic = 'force-dynamic'

export default function DashboardPage() {
  return (
    <ErrorBoundary title="Failed to load metrics">
      <Suspense fallback={<MetricsSkeleton />}>
        <DashboardMetrics />
      </Suspense>
    </ErrorBoundary>
  )
}
