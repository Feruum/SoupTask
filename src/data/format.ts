export function displayLocale(locale = typeof navigator === 'undefined' ? 'en-US' : navigator.language): string {
  return locale.startsWith('de') ? 'de-DE' : locale.startsWith('ru') ? 'ru-RU' : 'en-US'
}

type NumberStyle = 'step' | 'value' | 'scientific'
const numberFormats = new Map<string, Intl.NumberFormat>()
function numberFormat(locale: string, style: NumberStyle): Intl.NumberFormat {
  const key = `${locale}:${style}`
  const existing = numberFormats.get(key)
  if (existing) return existing
  const formatter = new Intl.NumberFormat(locale, style === 'step'
    ? { maximumFractionDigits: 6 }
    : style === 'scientific'
      ? { notation: 'scientific', maximumSignificantDigits: 6 }
      : { minimumFractionDigits: 3, maximumFractionDigits: 6 })
  // Explicit locale arguments remain supported without allowing an unbounded global cache.
  if (numberFormats.size >= 32) numberFormats.delete(numberFormats.keys().next().value!)
  numberFormats.set(key, formatter)
  return formatter
}

export function formatStep(value: number, locale = displayLocale()): string {
  return numberFormat(locale, 'step').format(value)
}

export function formatValue(value: number | null | undefined, scientific = false, locale = displayLocale()): string {
  if (value === null || value === undefined) return 'Unavailable'
  if (Number.isNaN(value)) return 'NaN'
  if (value === Infinity) return '+Infinity'
  if (value === -Infinity) return '-Infinity'
  if (Object.is(value, -0)) return '-0'
  return numberFormat(locale, scientific || (value !== 0 && Math.abs(value) < 0.001) ? 'scientific' : 'value').format(value)
}

const timestampFormats = new Map<string, Intl.DateTimeFormat>()
export function formatTimestamp(instant: string, locale = displayLocale(), timeZone?: string): string {
  const key = `${locale}:${timeZone ?? 'system'}`
  let formatter = timestampFormats.get(key)
  if (!formatter) {
    formatter = new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeStyle: 'short', ...(timeZone === undefined ? {} : { timeZone }) })
    if (timestampFormats.size >= 32) timestampFormats.delete(timestampFormats.keys().next().value!)
    timestampFormats.set(key, formatter)
  }
  return formatter.format(new Date(instant)) + ` (${timeZone ?? formatter.resolvedOptions().timeZone})`
}

export function sourceAge(instant: string | undefined, now = Date.now()): { stale: boolean; hours: number | null } {
  const timestamp = instant ? Date.parse(instant) : NaN
  if (!Number.isFinite(timestamp)) return { stale: false, hours: null }
  const hours = Math.max(0, (now - timestamp) / 3_600_000)
  return { stale: hours >= 24, hours }
}
