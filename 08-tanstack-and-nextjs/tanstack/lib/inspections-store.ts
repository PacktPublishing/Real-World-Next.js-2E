// Repository scaffolding, not printed in the chapter.
//
// An in-memory stand-in for the backend the inspections collection syncs
// with, so the TanStack DB example runs without any external service. State
// lives in the server process and resets whenever it restarts.
import { type Inspection } from '@/lib/collections/inspections'

const inspections: Inspection[] = [
  {
    id: '1',
    site: 'Bay 4 — Conveyor A',
    status: 'pending',
    notes: 'Belt tension and guard rails',
  },
  {
    id: '2',
    site: 'Bay 7 — Pallet racking',
    status: 'pending',
    notes: 'Upright damage after forklift contact',
  },
  {
    id: '3',
    site: 'Loading dock — Leveller 2',
    status: 'pending',
    notes: 'Hydraulic seal weep',
  },
  {
    id: '4',
    site: 'Bay 1 — Fire door',
    status: 'passed',
    notes: 'Closes and latches cleanly',
  },
]

export function listInspections(): Inspection[] {
  return inspections
}

export function addInspection(inspection: Inspection): Inspection {
  inspections.push(inspection)
  return inspection
}

export function updateInspection(
  id: string,
  patch: Partial<Inspection>
): Inspection | undefined {
  const index = inspections.findIndex((inspection) => inspection.id === id)
  if (index === -1) return undefined
  inspections[index] = { ...inspections[index], ...patch, id }
  return inspections[index]
}
