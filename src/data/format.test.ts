import { expect, it, vi } from 'vitest'
import { formatStep, formatValue, formatTimestamp, sourceAge } from './format'

it('formats known locale tokens without modifying numeric source values', () => {
  expect(formatStep(12345.5, 'en-US')).toBe('12,345.5')
  expect(formatStep(12345.5, 'de-DE')).toBe('12.345,5')
  expect(formatStep(12345.5, 'ru-RU')).toBe('12\u00a0345,5')
  expect(formatValue(1.25, false, 'de-DE')).toBe('1,250')
  expect(formatValue(0.00002, true, 'en-US')).toBe('2E-5')
  expect(formatValue(0, false, 'en-US')).toBe('0.000')
  expect(formatValue(-0)).toBe('-0')
  expect(formatValue(NaN)).toBe('NaN')
  expect(formatValue(Infinity)).toBe('+Infinity')
})

it('time zones affect metadata, never numeric step, including DST boundary instants', () => {
  expect(formatTimestamp('2026-11-01T09:30:00Z', 'en-US', 'UTC')).toContain('9:30 AM')
  expect(formatTimestamp('2026-11-01T09:30:00Z', 'en-US', 'America/Los_Angeles')).toContain('1:30 AM')
  expect(formatTimestamp('2026-11-01T09:30:00Z', 'en-US', 'Asia/Qyzylorda')).toContain('2:30 PM')
  expect(formatTimestamp('2026-11-01T08:30:00Z', 'en-US', 'America/Los_Angeles')).toContain('1:30 AM')
  expect(formatStep(500001, 'en-US')).toBe('500,001')
})

it('uses source timestamps and a frozen clock for staleness', () => {
  expect(sourceAge('2026-11-09T00:00:00Z', Date.parse('2026-11-10T00:00:00Z'))).toEqual({ stale: true, hours: 24 })
  expect(sourceAge(undefined)).toEqual({ stale: false, hours: null })
})

it('reuses bounded timestamp formatters for repeated explicit and system-zone snapshot rendering',()=>{
  const locale='en-US-u-ca-iso8601',instant='2026-11-01T09:30:00Z',date=new Date(instant)
  const local=new Intl.DateTimeFormat(locale,{dateStyle:'medium',timeStyle:'short'})
  const expectedLocal=local.format(date)+` (${local.resolvedOptions().timeZone})`
  const expectedUtc=new Intl.DateTimeFormat(locale,{dateStyle:'medium',timeStyle:'short',timeZone:'UTC'}).format(date)+' (UTC)'
  const constructors=vi.spyOn(Intl,'DateTimeFormat')
  try{
    for(let i=0;i<500;i++){
      expect(formatTimestamp(instant,locale,'UTC')).toBe(expectedUtc)
      expect(formatTimestamp(instant,locale)).toBe(expectedLocal)
    }
    expect(constructors.mock.calls.length,'repeated snapshot rendering must not allocate new ICU formatters per row').toBeLessThanOrEqual(2)
    const zones=Intl.supportedValuesOf('timeZone').slice(0,40)
    for(const zone of zones)formatTimestamp(instant,locale,zone)
    const previous=constructors.mock.calls.length
    formatTimestamp(instant,locale,zones[0])
    expect(constructors.mock.calls.length,'old timezone entries must be evicted from the bounded cache').toBe(previous+1)
  }finally{constructors.mockRestore()}
})
