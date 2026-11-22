import type { MouseEvent } from 'react'

export type Origin = { x: number; y: number }

/**
 * Where a click came from, in viewport pixels: the pointer position for a
 * mouse/touch click, or the element's centre when activated by keyboard.
 * Panels use it as their transform-origin so they open from what you touched.
 */
export function originOf(e: MouseEvent<HTMLElement>): Origin {
  const r = e.currentTarget.getBoundingClientRect()
  return e.detail > 0
    ? { x: e.clientX, y: e.clientY }
    : { x: r.left + r.width / 2, y: r.top + r.height / 2 }
}

export const originStyle = (o: Origin | null) => ({
  transformOrigin: o ? `${o.x}px ${o.y}px` : '50% 50%',
})

/**
 * Momentum projection: where a gesture would come to rest, in px, given its
 * release velocity (px/s). Exponential-decay form, as in Apple's sample code.
 * 0.998 is normal scroll feel, 0.99 is snappier (used for swipe decisions).
 */
export function project(velocity: number, deceleration = 0.99) {
  return ((velocity / 1000) * deceleration) / (1 - deceleration)
}

/** Critically damped spring: smooth settle, no overshoot. The default for UI. */
export const spring = { type: 'spring', bounce: 0, duration: 0.5 } as const
