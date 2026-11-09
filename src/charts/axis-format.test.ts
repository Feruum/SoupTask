import { expect, it } from 'vitest'
import { scientificAxisLabels } from './axis-format'

it('never labels distinct scientific-axis ticks with the same text', () => {
  const ticks = [0, 5e-6, 1e-5, 1.5e-5, 2e-5]
  const labels = scientificAxisLabels(ticks)
  expect(new Set(labels).size).toBe(ticks.length)
  expect(labels[0]).toBe('0')
  expect(labels.map(Number)).toEqual(ticks)
})
