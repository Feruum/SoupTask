export function displayLocale(locale = typeof navigator === 'undefined' ? 'en-US' : navigator.language): string {
  return locale.startsWith('de') ? 'de-DE' : locale.startsWith('ru') ? 'ru-RU' : 'en-US'
}

export function formatStep(value: number, locale = displayLocale()): string {
  return new Intl.NumberFormat(locale, { maximumFractionDigits: 6 }).format(value)
}

export function formatValue(value: number | null | undefined, scientific = false, locale = displayLocale()): string {
  if (value === null || value === undefined) return 'Unavailable'
  if (Number.isNaN(value)) return 'NaN'
  if (value === Infinity) return '+Infinity'
  if (value === -Infinity) return '-Infinity'
  if (Object.is(value, -0)) return '-0'
  return new Intl.NumberFormat(locale, scientific || (value !== 0 && Math.abs(value) < 0.001)
    ? { notation: 'scientific', maximumSignificantDigits: 6 }
    : { minimumFractionDigits: 3, maximumFractionDigits: 6 }).format(value)
}

export function formatTimestamp(instant: string, locale = displayLocale(), timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone): string {
  return new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeStyle: 'short', timeZone }).format(new Date(instant)) + ` (${timeZone})`
}

export function sourceAge(instant: string | undefined, now = Date.now()): { stale: boolean; hours: number | null } {
  const timestamp = instant ? Date.parse(instant) : NaN
  if (!Number.isFinite(timestamp)) return { stale: false, hours: null }
  const hours = Math.max(0, (now - timestamp) / 3_600_000)
  return { stale: hours >= 24, hours }
}
