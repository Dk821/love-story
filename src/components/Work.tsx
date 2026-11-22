import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Photo from './Photo'
import Reveal from './Reveal'
import { ArrowLeft, ArrowRight, Close, Expand } from './Icons'
import { studio, work } from '../data/site'
import { startScroll, stopScroll } from '../lib/scroll'
import { useMediaQuery } from '../lib/useMediaQuery'

type Shot = (typeof work.photos)[number]

// Deals the photos into columns, each one going to the currently shortest column, so the wall stays level.
function deal(shots: Shot[], cols: number) {
  const out: { shot: Shot; n: number }[][] = Array.from({ length: cols }, () => [])
  const heights = Array(cols).fill(0)
  shots.forEach((shot, n) => {
    const k = heights.indexOf(Math.min(...heights))
    out[k].push({ shot, n })
    heights[k] += 1 / shot.ratio
  })
  return out
}

export default function Work() {
  const fallback = studio.social[0].url
  const [filter, setFilter] = useState<string>(work.allLabel)
  const [open, setOpen] = useState<number | null>(null)

  const four = useMediaQuery('(min-width: 1000px)')
  const three = useMediaQuery('(min-width: 640px)')
  const cols = four ? 4 : three ? 3 : 2

  const shown = useMemo(
    () => (filter === work.allLabel ? work.photos : work.photos.filter((p) => p.category === filter)),
    [filter],
  )
  const columns = useMemo(() => deal(shown, cols), [shown, cols])

  // The large view: keys move between photos, Esc closes. The page behind stops scrolling while it is open.
  useEffect(() => {
    if (open === null) return
    stopScroll()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null)
      else if (e.key === 'ArrowRight') setOpen((v) => (v === null ? v : (v + 1) % shown.length))
      else if (e.key === 'ArrowLeft') setOpen((v) => (v === null ? v : (v - 1 + shown.length) % shown.length))
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      startScroll()
    }
  }, [open, shown.length])

  const current = open === null ? null : shown[open]

  return (
    <section id="work" className="section theme-light work" aria-labelledby="work-title">
      <header className="work__head">
        <div>
          <Reveal className="eyebrow work__eyebrow">{work.eyebrow}</Reveal>
          <Reveal delay={0.06}>
            <h2 id="work-title" className="work__title">
              {work.title}
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <a className="work__btn" href={work.allHref || fallback} target="_blank" rel="noreferrer">
            {work.button} <ArrowRight />
          </a>
        </Reveal>
      </header>

      <div className="work__filters" role="group" aria-label="Filter photographs by category">
        {[work.allLabel, ...work.categories].map((name) => (
          <button
            key={name}
            type="button"
            className={`work__chip${filter === name ? ' is-on' : ''}`}
            aria-pressed={filter === name}
            onClick={() => {
              setFilter(name)
              setOpen(null)
            }}
          >
            {name}
          </button>
        ))}
      </div>

      {/* Remounted on each filter change, so the new set of photos settles in one after another. */}
      <div className="work__wall" key={`${filter}-${cols}`}>
        {columns.map((col, k) => (
          <div className="work__col" key={k}>
            {col.map(({ shot, n }, j) => (
              <motion.button
                type="button"
                key={shot.src}
                className="work__shot"
                style={{ aspectRatio: shot.ratio }}
                initial={{ opacity: 0, scale: 0.96, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.55, delay: (j * cols + k) * 0.045, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setOpen(n)}
                aria-label={`Open photo: ${shot.alt}`}
              >
                <Photo src={shot.src} tone={shot.tone} alt={shot.alt} />
                <span className="work__badge" aria-hidden="true">
                  <Expand />
                </span>
                <span className="work__tag" aria-hidden="true">
                  {shot.category}
                </span>
              </motion.button>
            ))}
          </div>
        ))}
      </div>

      <AnimatePresence>
        {current && (
          <motion.div
            className="wlight"
            role="dialog"
            aria-modal="true"
            aria-label={current.alt}
            data-lenis-prevent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen(null)}
          >
            <button type="button" className="wlight__close" onClick={() => setOpen(null)} aria-label="Close">
              <Close />
            </button>
            <div
              className="wlight__frame"
              style={{ width: `min(92vw, calc(74vh * ${current.ratio}))` }}
              onClick={(e) => e.stopPropagation()}
            >
              <Photo key={current.src} src={current.src} tone={current.tone} alt={current.alt} ratio={current.ratio} eager />
            </div>
            <div className="wlight__bar" onClick={(e) => e.stopPropagation()}>
              <button type="button" onClick={() => setOpen((open! - 1 + shown.length) % shown.length)} aria-label="Previous photo">
                <ArrowLeft />
              </button>
              <span className="eyebrow">
                {current.category} · {open! + 1} / {shown.length}
              </span>
              <button type="button" onClick={() => setOpen((open! + 1) % shown.length)} aria-label="Next photo">
                <ArrowRight />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
