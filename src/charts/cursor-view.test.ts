import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { expect, it } from 'vitest'
import { CursorReadout, type Workspace } from '@/features/shared/Workspace'

const workspace = { state: { workspaceEpoch: 1, view: { viewSeq: 3 }, runs: { A: { run: { id: 'A', revision: 'test' } } } } } as unknown as Workspace
const observation = { sourceIndex: 900, step: 900, loss: 100, lr: .00002, grad_norm: .2 }
function readout(workspaceEpoch: number, viewSeq: number) {
  const view = workspaceEpoch === 1 && viewSeq === 3 ? workspace.state.view! : { ...workspace.state.view!, viewSeq }
  const cursor = { view, workspaceEpoch, viewSeq, hoverSeq: 7, hoverStep: 900, hover: { A: [observation] } }
  return renderToStaticMarkup(createElement(CursorReadout, { workspace, cursor, ids: ['A'], metric: 'loss', slots: { A: 0 }, onPin: () => {} }))
}
it('does not display a fast new-view hover against axes whose parent commit is still pending', () => {
  const html = readout(1, 4)
  expect(html).toContain('Original source values')
  expect(html).not.toContain('Cursor step 900')
  expect(html).not.toContain('Pin row 900')
})
it('does not reuse a cursor when an activation restarts with the same view sequence', () => {
  expect(readout(2, 3)).not.toContain('Cursor step 900')
})
it('keeps exact original observations for the displayed workspace and view', () => {
  const html = readout(1, 3)
  expect(html).toContain('Cursor step 900')
  expect(html).toContain('title="Exact source value 100"')
  expect(html).toContain('Pin row 900')
})
