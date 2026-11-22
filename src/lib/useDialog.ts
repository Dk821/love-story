import { useEffect, type RefObject } from 'react'

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Focus management for a modal dialog.
 * - on open: remembers what had focus, then moves focus into the dialog
 * - while `trap` is true: Tab / Shift+Tab stay inside the dialog
 * - on close: gives focus back to where it was
 * The dialog element needs tabIndex={-1} so it can receive focus.
 */
export function useDialog(ref: RefObject<HTMLElement>, trap = true) {
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    ref.current?.focus({ preventScroll: true })
    return () => previous?.focus?.({ preventScroll: true })
  }, [ref])

  useEffect(() => {
    if (!trap) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      const root = ref.current
      if (!root) return
      const items = Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.getClientRects().length > 0,
      )
      if (!items.length) {
        e.preventDefault()
        return
      }
      const first = items[0]
      const last = items[items.length - 1]
      const active = document.activeElement
      if (!root.contains(active) || (e.shiftKey && (active === first || active === root))) {
        e.preventDefault()
        ;(e.shiftKey ? last : first).focus()
      } else if (!e.shiftKey && active === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [ref, trap])
}
