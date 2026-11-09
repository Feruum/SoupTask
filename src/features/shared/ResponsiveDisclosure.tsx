import { useCallback, useState, useSyncExternalStore } from 'react'
import type { ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'

export function useCompactLayout(breakpoint = 760) {
  const query = `(max-width: ${breakpoint}px), (max-height: 500px) and (pointer: coarse)`
  const subscribe = useCallback((notify: () => void) => {
    const media = window.matchMedia(query)
    media.addEventListener('change', notify)
    return () => media.removeEventListener('change', notify)
  }, [query])
  const snapshot = useCallback(() => window.matchMedia(query).matches, [query])
  return useSyncExternalStore(subscribe, snapshot, () => false)
}

/** Keep secondary tools available on phones and fully expanded on desktop. */
export function ResponsiveDisclosure({ label, meta, children, className = '', breakpoint = 760, mobileOpen, onMobileToggle }: {
  label: string
  meta?: string
  children: ReactNode
  className?: string
  breakpoint?: number
  mobileOpen?: boolean
  onMobileToggle?: (open: boolean) => void
}) {
  const compact = useCompactLayout(breakpoint)
  const [expanded, setExpanded] = useState(false)
  return <details className={`responsive-disclosure ${className}`} data-compact={compact} open={!compact || (mobileOpen ?? expanded)} onToggle={event => {
    if (!compact) return
    const open = event.currentTarget.open
    setExpanded(open)
    onMobileToggle?.(open)
  }}>
    <summary><span><strong>{label}</strong>{meta && <small>{meta}</small>}</span><ChevronDown size={18} aria-hidden="true" /></summary>
    <div className="responsive-disclosure-body">{children}</div>
  </details>
}
