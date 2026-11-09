export function scientificAxisLabels(values: number[]): string[] {
  for (let precision = 0; precision <= 16; precision++) {
    const labels = values.map(value => value === 0 ? '0' : value.toExponential(precision))
    if (new Set(labels).size === new Set(values).size) return labels
  }
  return values.map(String)
}
