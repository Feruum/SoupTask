import { useLayoutEffect } from 'react'

/** Measures a committed source tooltip through a frame opportunity, never worker readiness alone. */
export function useHoverPaint(selectionKey: string, viewSeq: number, hoverSeq: number, hoverStep: number | null) {
  useLayoutEffect(() => {
    const evidence = window.__soupEvidence
    const timing = evidence?.hoverTiming
    if (!evidence || !timing || hoverStep === null || !hoverSeq || timing.hoverSeq !== hoverSeq || timing.viewSeq !== viewSeq) return
    const epoch = evidence.workspaceEpoch
    const detail = { workspaceEpoch: epoch, viewSeq, hoverSeq, step: hoverStep }
    performance.mark('soup:hover-dom-commit', { detail })
    let secondFrame = 0
    const firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => {
        const current = window.__soupEvidence
        if (current?.workspaceEpoch !== epoch || current.viewSeq !== viewSeq || current.acceptedHoverSeq !== hoverSeq) return
        const tooltips = [...document.querySelectorAll<HTMLElement>(`.chart-hover-value[data-hover-seq="${hoverSeq}"]`)]
        if (!tooltips.length || tooltips.some(node => !node.getClientRects().length || getComputedStyle(node).visibility === 'hidden')) return
        const requestToFrameMs = performance.now() - timing.requestStartedAt
        performance.mark('soup:hover-frame', { detail: { ...detail, requestToAcceptedMs: timing.acceptedAt - timing.requestStartedAt, requestToFrameMs, tooltipCount: tooltips.length } })
      })
    })
    return () => { cancelAnimationFrame(firstFrame); cancelAnimationFrame(secondFrame) }
  }, [selectionKey, viewSeq, hoverSeq, hoverStep])
}
