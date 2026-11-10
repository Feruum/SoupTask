import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const css = readFileSync(new URL('./theme.css', import.meta.url), 'utf8')

function luminance(hex: string) {
  const channels = hex.match(/[a-f\d]{2}/gi)!.map(part => parseInt(part, 16) / 255).map(value => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4)
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722
}

for (const theme of ['light', 'dark']) {
  describe(`${theme} semantic theme contrast`, () => {
    const body = css.split(`:root[data-theme="${theme}"][data-accent] {`)[1].split('}')[0]
    const tokens = Object.fromEntries([...body.matchAll(/--([a-z-]+):\s*(#[a-f\d]{6})/g)].map(match => [match[1], match[2]]))
    const pairs: [string, string, number][] = [
      ['foreground', 'background', 4.5], ['text-secondary', 'surface', 4.5], ['text-muted', 'surface', 4.5],
      ['accent', 'accent-subtle', 4.5], ['accent-foreground', 'accent-strong', 4.5],
      ['chart-line', 'surface', 3], ['border-strong', 'surface', 3], ['focus-outline', 'background', 3],
      ['chart-teal', 'surface', 3], ['chart-ochre', 'surface', 3],
    ]
    for (const [foreground, background, minimum] of pairs) {
      it(`${foreground} against ${background} reaches ${minimum}:1`, () => {
        expect(tokens[foreground]).toBeDefined()
        expect(tokens[background]).toBeDefined()
        const a = luminance(tokens[foreground].slice(1))
        const b = luminance(tokens[background].slice(1))
        expect((Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)).toBeGreaterThanOrEqual(minimum)
      })
    }
  })
}
