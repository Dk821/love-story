import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import Photo from './Photo'
import Split from './Split'
import Reveal from './Reveal'
import { Close, Play } from './Icons'
import { film } from '../data/site'
import { originOf, originStyle, spring, type Origin } from '../lib/gesture'
import { startScroll, stopScroll } from '../lib/scroll'
import { useDialog } from '../lib/useDialog'
import { useReducedMotion } from '../lib/useMediaQuery'

function FilmModal({ origin, onClose }: { origin: Origin | null; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  useDialog(ref)

  return (
    <motion.div
      ref={ref}
      tabIndex={-1}
      className="film__modal"
      role="dialog"
      aria-modal="true"
      aria-label="Wedding film"
      style={originStyle(origin)}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={spring}
      onClick={onClose}
    >
      <button className="viewer__close eyebrow" onClick={onClose}>
        Close <Close />
      </button>
      <div className="film__video" onClick={(e) => e.stopPropagation()}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${film.youtubeId}?autoplay=1&rel=0`}
          title="Wedding film"
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      </div>
    </motion.div>
  )
}

export default function Film() {
  const ref = useRef<HTMLElement>(null)
  const [playing, setPlaying] = useState(false)
  const [origin, setOrigin] = useState<Origin | null>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], reduced ? [1, 1, 1] : [1.15, 1, 1.08])
  const hasFilm = film.youtubeId.trim().length > 0

  useEffect(() => {
    if (!playing) return
    stopScroll()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setPlaying(false)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      startScroll()
    }
  }, [playing])

  return (
    <section id="film" ref={ref} className="film theme-dark">
      <div className="film__poster">
        <motion.div className="film__img" style={{ scale }}>
          <Photo src={film.poster.src} tone={film.poster.tone} alt={film.poster.alt} />
        </motion.div>
        <div className="film__shade" />
      </div>

      <div className="film__content">
        <Reveal className="eyebrow">{film.eyebrow}</Reveal>
        <Split as="h2" className="display" text={film.title} />
        <Reveal as="p" className="film__text" delay={0.1}>
          {film.text}
        </Reveal>
        <Reveal delay={0.2}>
          <button
            className="film__play"
            onClick={(e) => {
              if (!hasFilm) return
              setOrigin(originOf(e))
              setPlaying(true)
            }}
            disabled={!hasFilm}
            aria-label={hasFilm ? 'Play wedding film' : 'Film coming soon'}
          >
            <span className="film__icon" aria-hidden="true">
              <Play />
            </span>
            <span className="eyebrow">{hasFilm ? 'Watch the film' : 'Film coming soon'}</span>
          </button>
        </Reveal>
      </div>

      <AnimatePresence>
        {playing && <FilmModal origin={origin} onClose={() => setPlaying(false)} />}
      </AnimatePresence>
    </section>
  )
}
