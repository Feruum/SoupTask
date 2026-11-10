/** Retained members keep their visual identity when another run is added, removed or reordered. */
export function assignSeriesSlots(previous: Readonly<Record<string, number>>, ids: readonly string[]): Record<string, number> {
  const next: Record<string, number> = {},
    used = new Set<number>();
  for (const id of ids) {
    const slot = previous[id];
    if (Number.isInteger(slot) && slot >= 0 && slot < 4 && !used.has(slot)) {
      next[id] = slot;
      used.add(slot);
    }
  }
  for (const id of ids) if (next[id] === undefined) {
    const slot = [0, 1, 2, 3].find(value => !used.has(value));
    if (slot === undefined) throw new RangeError('At most four series are supported.');
    next[id] = slot;
    used.add(slot);
  }
  return next;
}
