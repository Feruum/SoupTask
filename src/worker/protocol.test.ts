import { expect, it } from 'vitest'
import { matchesSession } from './protocol'

it('rejects an old activation of A after A to B to A, including error identities', () => {
  const current = { runId: 'A', revision: 'same', activationEpoch: 3 }
  expect(matchesSession(current, { ...current, activationEpoch: 1 })).toBe(false)
  expect(matchesSession(current, { ...current, runId: 'B' })).toBe(false)
  expect(matchesSession(current, { ...current, revision: 'old' })).toBe(false)
  expect(matchesSession(current, { ...current })).toBe(true)
})
