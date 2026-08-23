'use client'

import { useLiveQuery, eq } from '@tanstack/react-db'
import { inspectionsCollection } from '@/lib/collections/inspections'

export function InspectionList() {
  const { data: pending } = useLiveQuery((q) =>
    q
      .from({ inspection: inspectionsCollection })
      .where(({ inspection }) => eq(inspection.status, 'pending'))
  )

  const markPassed = (id: string) => {
    // Applies to the local collection instantly; onUpdate syncs it
    inspectionsCollection.update(id, (draft) => {
      draft.status = 'passed'
    })
  }

  return (
    <ul>
      {pending.map((inspection) => (
        <li key={inspection.id}>
          <strong>{inspection.site}</strong> — {inspection.notes}
          <button onClick={() => markPassed(inspection.id)}>
            Mark passed
          </button>
        </li>
      ))}
    </ul>
  )
}
