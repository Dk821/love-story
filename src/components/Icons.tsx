import type { SVGProps } from 'react'

// Inline icons, so arrows and glyphs look the same on every platform
// (text characters like ▶ can turn into emoji on phones).
const base: SVGProps<SVGSVGElement> = {
  width: '1em',
  height: '1em',
  viewBox: '0 0 16 16',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.25,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
  style: { display: 'inline-block', flex: 'none', verticalAlign: '-0.125em' },
}

export const ArrowUpRight = () => (
  <svg {...base}>
    <path d="M4.5 11.5l7-7M5.5 4.5h6v6" />
  </svg>
)

export const ArrowLeft = () => (
  <svg {...base}>
    <path d="M13 8H3M7 4L3 8l4 4" />
  </svg>
)

export const ArrowRight = () => (
  <svg {...base}>
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
)

export const Close = () => (
  <svg {...base}>
    <path d="M4 4l8 8M12 4l-8 8" />
  </svg>
)

export const Play = () => (
  <svg {...base} fill="currentColor" stroke="none">
    <path d="M5 3.2v9.6L13 8z" />
  </svg>
)

const thick = { strokeWidth: 1.3 }

export const Camera = () => (
  <svg {...base} {...thick}>
    <path d="M2 5.6h2.1l1-1.6h5.8l1 1.6H14v7.2H2z" />
    <circle cx="8" cy="8.9" r="2.3" />
  </svg>
)

export const Users = () => (
  <svg {...base} {...thick}>
    <circle cx="8" cy="5.4" r="2.1" />
    <path d="M4.2 13c.3-2.1 1.8-3.3 3.8-3.3s3.5 1.2 3.8 3.3" />
    <path d="M3.6 4.2a1.4 1.4 0 0 0 0 2.6M12.4 4.2a1.4 1.4 0 0 1 0 2.6" />
    <path d="M2 11.2c.1-1 .7-1.7 1.6-2M14 11.2c-.1-1-.7-1.7-1.6-2" />
  </svg>
)

export const Calendar = () => (
  <svg {...base} {...thick}>
    <rect x="2.4" y="3.4" width="11.2" height="10" rx="1.6" />
    <path d="M2.4 6.6h11.2M5.4 2.2v2.4M10.6 2.2v2.4" />
    <path d="M5.5 9.2h.01M8 9.2h.01M10.5 9.2h.01M5.5 11.4h.01M8 11.4h.01" strokeWidth="1.8" />
  </svg>
)

export const Plus = () => (
  <svg {...base} strokeWidth={1.5}>
    <path d="M8 3v10M3 8h10" />
  </svg>
)

export const Sparkle = () => (
  <svg {...base} fill="currentColor" stroke="none">
    <path d="M8 1.2c.5 3.4 1.4 4.8 6.8 6.8-5.4 2-6.3 3.4-6.8 6.8-.5-3.4-1.4-4.8-6.8-6.8C6.6 6 7.5 4.6 8 1.2z" />
  </svg>
)

export const Rings = () => (
  <svg {...base} {...thick}>
    <circle cx="5.9" cy="8.6" r="3.5" />
    <circle cx="10.1" cy="8.6" r="3.5" />
  </svg>
)

export const Heart = () => (
  <svg {...base} {...thick}>
    <path d="M8 13.4S2.3 10 2.3 6.1A2.9 2.9 0 0 1 8 5a2.9 2.9 0 0 1 5.7 1.1C13.7 10 8 13.4 8 13.4z" />
  </svg>
)

export const FilmIcon = () => (
  <svg {...base} {...thick}>
    <rect x="2" y="3.4" width="12" height="9.2" rx="1.7" />
    <path d="M6.9 6.1v3.8l3.3-1.9z" />
  </svg>
)

export const Smile = () => (
  <svg {...base} {...thick}>
    <circle cx="8" cy="8" r="5.6" />
    <path d="M6 6.8h.01M10 6.8h.01" strokeWidth="1.8" />
    <path d="M5.8 9.3c.6 1.3 1.4 1.9 2.2 1.9s1.6-.6 2.2-1.9" />
  </svg>
)


// Social icons (used by the footer)
export const Instagram = () => (
  <svg {...base} strokeWidth={1.2}>
    <rect x="2.5" y="2.5" width="11" height="11" rx="3.2" />
    <circle cx="8" cy="8" r="2.5" />
    <circle cx="11.4" cy="4.6" r="0.5" fill="currentColor" />
  </svg>
)

export const Facebook = () => (
  <svg {...base} strokeWidth={1.2}>
    <path d="M9.5 14V8.4h1.9l.3-2.1H9.5V5c0-.6.2-1 1-1h1.2V2.1C11.4 2 10.8 2 10.1 2 8.5 2 7.4 3 7.4 4.7v1.6H5.5v2.1h1.9V14" />
  </svg>
)

export const YouTubeIcon = () => (
  <svg {...base} strokeWidth={1.2}>
    <rect x="1.8" y="3.6" width="12.4" height="8.8" rx="2.6" />
    <path d="M6.9 6v4l3.4-2z" fill="currentColor" />
  </svg>
)

export const TikTok = () => (
  <svg {...base} strokeWidth={1.2}>
    <path d="M9.4 2.2v7.4a2.5 2.5 0 11-2.5-2.5M9.4 2.2c.2 1.5 1.2 2.5 2.8 2.7" />
  </svg>
)

export const Globe = () => (
  <svg {...base} strokeWidth={1.2}>
    <circle cx="8" cy="8" r="5.6" />
    <path d="M2.4 8h11.2M8 2.4c1.6 1.7 2.3 3.5 2.3 5.6S9.6 11.9 8 13.6C6.4 11.9 5.7 10 5.7 8S6.4 4.1 8 2.4z" />
  </svg>
)

export const Mail = () => (
  <svg {...base} strokeWidth={1.2}>
    <rect x="2" y="3.4" width="12" height="9.2" rx="1.6" />
    <path d="M2.6 4.6L8 8.8l5.4-4.2" />
  </svg>
)

export const Phone = () => (
  <svg {...base} strokeWidth={1.2}>
    <path d="M3.4 2.6h2.4l1 2.8-1.5 1a7.4 7.4 0 003.3 3.3l1-1.5 2.8 1v2.4a1.2 1.2 0 01-1.3 1.2A9.9 9.9 0 012.2 3.9a1.2 1.2 0 011.2-1.3z" />
  </svg>
)

export const MapPin = () => (
  <svg {...base} strokeWidth={1.2}>
    <path d="M8 14s4.4-3.7 4.4-7.1a4.4 4.4 0 10-8.8 0C3.6 10.3 8 14 8 14z" />
    <circle cx="8" cy="6.9" r="1.5" />
  </svg>
)

export const Expand = () => (
  <svg {...base} strokeWidth={1.4}>
    <path d="M9.5 2.5h4v4M6.5 13.5h-4v-4M13.5 2.5L9 7M2.5 13.5L7 9" />
  </svg>
)
