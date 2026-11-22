import { useEffect, useState, type CSSProperties } from 'react'

// Placeholder plates shown until a real photo exists: [highlight, glow, shadow]
const TONES: [string, string, string][] = [
  ['#8a2a36', '#efb06a', '#2a1014'], // garnet & amber
  ['#35505c', '#d6c4a2', '#101b20'], // sea & sand
  ['#a4562c', '#f3cd8a', '#2b140a'], // terracotta
  ['#4a3a63', '#e6a5a0', '#150f20'], // dusk
  ['#3f5a3c', '#e5d59c', '#0f1a0f'], // garden
  ['#7a3b52', '#f0c4b2', '#220f19'], // blush
  ['#2f4660', '#c7d3e4', '#0c141d'], // mist
  ['#8f6a2d', '#f4dea4', '#23180a'], // brass
]

/**
 * Until a slot has its own picture, it borrows this one — a different part of it
 * per `tone`, so the page does not repeat the same crop. Add the real file named
 * in site.ts and it replaces the borrowed one automatically.
 */
const FALLBACK = '/photos/Photo1.jpg'
// [focus x %, focus y %, zoom]
const CROPS: [number, number, number][] = [
  [50, 50, 1], //     the whole scene
  [52, 38, 1.7], //   both faces
  [55, 85, 1.6], //   the embroidered blouse and gold
  [88, 30, 1.5], //   leaves, top right
  [22, 85, 1.5], //   the suit
  [40, 35, 1.6], //   the groom, in profile
  [62, 42, 1.6], //   the bride
  [10, 40, 1.4], //   foliage, left
]

type Props = {
  src?: string
  tone?: number
  alt: string
  className?: string
  ratio?: number
  eager?: boolean
  style?: CSSProperties
}

export default function Photo({ src, tone = 0, alt, className = '', ratio, eager, style }: Props) {
  // 0 = the slot's own file, 1 = the borrowed sample photo, 2 = nothing found
  const [stage, setStage] = useState<0 | 1 | 2>(src ? 0 : 1)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setStage(src ? 0 : 1)
    setLoaded(false)
  }, [src])

  const t = ((tone % TONES.length) + TONES.length) % TONES.length
  const [a, b, c] = TONES[t]
  const [fx, fy, zoom] = CROPS[t]
  const url = stage === 0 ? src : stage === 1 ? FALLBACK : undefined
  const borrowed = stage === 1

  const vars = {
    '--a': a,
    '--b': b,
    '--c': c,
    ...(borrowed ? { '--fx': `${fx}%`, '--fy': `${fy}%`, '--zoom': zoom } : null),
    aspectRatio: ratio,
    ...style,
  } as CSSProperties

  return (
    <div
      className={`photo${loaded ? ' is-loaded' : ''}${borrowed ? ' is-borrowed' : ''} ${className}`}
      style={vars}
      role="img"
      aria-label={alt}
    >
      {url && (
        <img
          key={url}
          // Cached images can finish before React attaches onLoad, so check here too.
          ref={(el) => {
            if (el?.complete && el.naturalWidth > 0) setLoaded(true)
          }}
          onLoad={() => setLoaded(true)}
          src={url}
          alt=""
          loading={eager ? 'eager' : 'lazy'}
          fetchPriority={eager ? 'high' : 'auto'}
          decoding="async"
          draggable={false}
          onError={() => setStage(stage === 0 && src !== FALLBACK ? 1 : 2)}
        />
      )}
      {/* Only while developing, so you can see which slots are still waiting for a photo. */}
      {import.meta.env.DEV && borrowed && src && src !== FALLBACK && (
        <span className="photo__hint">{src.replace('/photos/', '')}</span>
      )}
    </div>
  )
}
