import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import Photo from './Photo'
import { heroSlides, studio } from '../data/site'
import { scrollToId } from '../lib/scroll'
import { useReducedMotion } from '../lib/useMediaQuery'

const ease = [0.22, 1, 0.36, 1] as const

export default function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduced = useReducedMotion()

  // Parallax is movement, so it stays still for people who asked for less.
  const travel = (px: number) => (reduced ? 0 : px)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const yPlate = useTransform(scrollYProgress, [0, 1], [0, travel(120)])
  const yLeft = useTransform(scrollYProgress, [0, 1], [0, travel(-60)])
  const yRight = useTransform(scrollYProgress, [0, 1], [0, travel(-130)])
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0.12])

  useEffect(() => {
    if (!ready || reduced || paused || heroSlides.length < 2) return
    const id = window.setInterval(() => setI((v) => (v + 1) % heroSlides.length), 5400)
    return () => window.clearInterval(id)
  }, [ready, reduced, paused])

  const slide = heroSlides[i]

  return (
    <section id="top" ref={ref} className="hero theme-dark">
      <motion.div className="hero__top" style={{ opacity: fade }}>
        <motion.p
          className="hero__regions eyebrow"
          initial={{ opacity: 0, y: 14 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.45, ease }}
        >
          {studio.regions}
        </motion.p>
        <motion.p
          className="hero__intro"
          initial={{ opacity: 0, y: 18 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.6, ease }}
        >
          {studio.intro}
        </motion.p>
      </motion.div>

      <motion.div className="hero__stage" style={{ opacity: fade }}>
        <motion.div
          className="hero__plate"
          style={{ y: yPlate }}
          initial={{ clipPath: reduced ? 'inset(0% 0% 0% 0%)' : 'inset(42% 0% 0% 0%)' }}
          animate={ready ? { clipPath: 'inset(0% 0% 0% 0%)' } : {}}
          transition={{ duration: 1.5, ease, delay: 0.05 }}
        >
          <AnimatePresence initial={false}>
            <motion.div
              key={i}
              className="hero__slide"
              initial={{ opacity: 0, scale: 1.09 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ opacity: { duration: 1.5 }, scale: { duration: 7, ease: 'linear' } }}
            >
              <Photo
                src={slide.src}
                tone={slide.tone}
                alt={`${slide.couple}, ${slide.place}`}
                eager={i === 0}
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <h1 className="hero__title" aria-label={studio.name}>
          <motion.span className="hero__name hero__name--l" style={{ y: yLeft }} aria-hidden="true">
            <span className="split__mask">
              <motion.span
                className="hero__word"
                initial={{ y: '112%' }}
                animate={ready ? { y: 0 } : {}}
                transition={{ duration: 1.25, delay: 0.5, ease }}
              >
                Love
              </motion.span>
            </span>
          </motion.span>
          <motion.span className="hero__name hero__name--r" style={{ y: yRight }} aria-hidden="true">
            <span className="split__mask">
              <motion.span
                className="hero__word"
                initial={{ y: '112%' }}
                animate={ready ? { y: 0 } : {}}
                transition={{ duration: 1.25, delay: 0.66, ease }}
              >
                Story
              </motion.span>
            </span>
          </motion.span>
        </h1>
      </motion.div>

      <motion.div
        className="hero__base"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 1.15, duration: 1 }}
      >
        <button className="hero__scroll eyebrow" onClick={() => scrollToId('about')}>
          <span className="hero__rule" aria-hidden="true" /> Scroll to begin
        </button>
        <p className="hero__count eyebrow">
          {heroSlides.length > 1 && !reduced && (
            <button
              type="button"
              className="hero__pause"
              aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}
              onClick={() => setPaused((v) => !v)}
            >
              {paused ? 'Play' : 'Pause'}
            </button>
          )}
          <span>
            {String(i + 1).padStart(2, '0')} / {String(heroSlides.length).padStart(2, '0')}
          </span>
          <span className="hero__who">
            {slide.couple} — {slide.place}
          </span>
        </p>
      </motion.div>
    </section>
  )
}
