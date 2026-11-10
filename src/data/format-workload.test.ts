import { expect, it } from 'vitest'
import { formatStep, formatValue } from './format'

it('keeps exact ICU output across a source-cell workload without allocating a formatter per cell', () => {
  const NativeFormatter = Intl.NumberFormat
  const values = [0, -0, 1e-9, .00002, .2, 1.23456789, -2.5, 100, 500001, Number.MIN_VALUE, Number.MAX_VALUE]
  const cases = ['en-US', 'de-DE', 'ru-RU'].flatMap(locale => Array.from({ length: 12 }, () => values).flat().flatMap(value => {
    const step = new NativeFormatter(locale, { maximumFractionDigits: 6 }).format(value)
    return [false, true].map(scientific => ({ locale, value, scientific, step, expected: Object.is(value, -0) ? '-0' : new NativeFormatter(locale, scientific || (value !== 0 && Math.abs(value) < .001) ? { notation: 'scientific', maximumSignificantDigits: 6 } : { minimumFractionDigits: 3, maximumFractionDigits: 6 }).format(value) }))
  }))
  let constructions = 0
  class CountedFormatter extends NativeFormatter {
    constructor(...args: ConstructorParameters<typeof Intl.NumberFormat>) { super(...args); constructions++ }
  }
  Intl.NumberFormat = CountedFormatter as typeof Intl.NumberFormat
  try {
    for (const entry of cases) {
      expect(formatStep(entry.value, entry.locale)).toBe(entry.step)
      expect(formatValue(entry.value, entry.scientific, entry.locale)).toBe(entry.expected)
    }
    // A bounded resource budget for hundreds of cells, without prescribing a cache implementation.
    expect(constructions).toBeLessThanOrEqual(32)
  } finally { Intl.NumberFormat = NativeFormatter }
})
