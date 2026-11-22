import { useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import { studio } from '../data/site'
import { startScroll, stopScroll } from '../lib/scroll'
import { useReducedMotion } from '../lib/useMediaQuery'

export default function Intro({ onDone }: { onDone: () => void }) {
  const reduced = useReducedMotion()

  const finish = useCallback(() => {
    startScroll()
    onDone()
  }, [onDone])

  useEffect(() => {
    stopScroll()
    const t = window.setTimeout(finish, reduced ? 120 : 1500)
    const skip = () => finish()
    // Any way of reaching for the page skips the title card, touch included.
    window.addEventListener('keydown', skip)
    window.addEventListener('wheel', skip, { passive: true })
    window.addEventListener('touchmove', skip, { passive: true })
    return () => {
      window.clearTimeout(t)
      window.removeEventListener('keydown', skip)
      window.removeEventListener('wheel', skip)
      window.removeEventListener('touchmove', skip)
      startScroll()
    }
  }, [finish, reduced])

  return (
    <motion.div
      className="intro"
      role="presentation"
      onClick={finish}
      initial={{ y: 0 }}
      exit={reduced ? { opacity: 0 } : { y: '-100%' }}
      transition={{ duration: reduced ? 0.2 : 0.95, ease: [0.76, 0, 0.24, 1] }}
    >
      <motion.p
        className="eyebrow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 0.15, duration: 0.6 }}
      >
        {studio.descriptor}
      </motion.p>

      <p className="intro__word" aria-label={studio.name}>
        <span className="split__mask">
          <motion.span
            className="intro__love"
            initial={{ y: '112%' }}
            animate={{ y: 0 }}
            transition={{ delay: 0.22, duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
          >
            Love
          </motion.span>
        </span>
        <span className="split__mask">
          <motion.span
            className="intro__story"
            initial={{ y: '112%' }}
            animate={{ y: 0 }}
            transition={{ delay: 0.34, duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
          >
            Story
          </motion.span>
        </span>
      </p>

      <motion.span
        className="intro__rule"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.45, ease: 'easeInOut' }}
      />
      <motion.button
        type="button"
        className="intro__skip eyebrow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        onClick={(e) => {
          e.stopPropagation()
          finish()
        }}
      >
        Skip
      </motion.button>
    </motion.div>
  )
}
