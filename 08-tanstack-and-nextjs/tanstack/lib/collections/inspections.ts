'use client'

import { createCollection } from '@tanstack/react-db'
import { queryCollectionOptions } from '@tanstack/query-db-collection'
import { getQueryClient } from '@/app/get-query-client'

export type Inspection = {
  id: string
  site: string
  status: 'pending' | 'passed' | 'failed'
  notes: string
}

export const inspectionsCollection = createCollection(
  queryCollectionOptions<Inspection>({
    queryKey: ['inspections'],
    queryClient: getQueryClient(),
    queryFn: async (): Promise<Inspection[]> => {
      const response = await fetch('/api/inspections')
      if (!response.ok) throw new Error('Failed to load inspections')
      return response.json()
    },
    getKey: (item) => item.id,
    // Called after a local insert — this is where the write syncs
    onInsert: async ({ transaction }) => {
      const { modified } = transaction.mutations[0]
      const response = await fetch('/api/inspections', {
        method: 'POST',
        body: JSON.stringify(modified),
      })
      if (!response.ok) throw new Error('Sync failed')
    },
    // Called after a local update
    onUpdate: async ({ transaction }) => {
      const { original, modified } = transaction.mutations[0]
      const response = await fetch(`/api/inspections/${original.id}`, {
        method: 'PUT',
        body: JSON.stringify(modified),
      })
      if (!response.ok) throw new Error('Sync failed')
    },
  })
)
