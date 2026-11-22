import { useId } from 'react'
import Reveal from './Reveal'

/** The gold brush-stroke that sits under a section heading. */
export default function Swoosh({ className = '', delay = 0.3 }: { className?: string; delay?: number }) {
  const id = `swoosh-${useId().replace(/:/g, '')}`
  return (
    <Reveal className={`swoosh ${className}`.trim()} delay={delay} duration={1}>
      <svg viewBox="0 0 220 14" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id={id} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#c9a463" stopOpacity="0" />
            <stop offset="0.3" stopColor="#e6c88a" />
            <stop offset="1" stopColor="#c9a463" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <path d="M2 10C40 3 120 2 218 8" fill="none" stroke={`url(#${id})`} strokeWidth="2" strokeLinecap="round" />
      </svg>
    </Reveal>
  )
}
