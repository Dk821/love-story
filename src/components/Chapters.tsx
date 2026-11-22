import { useLayoutEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import Photo from './Photo'
import Split from './Split'
import Reveal from './Reveal'
import { chapters } from '../data/site'
import { useMediaQuery, useReducedMotion } from '../lib/useMediaQuery'

export default function Chapters() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [dist, setDist] = useState(0)

  const wide = useMediaQuery('(min-width: 901px)')
  const reduced = useReducedMotion()
  // Phones and reduced-motion users scroll the chapters normally — no hijacking.
  const horizontal = wide && !reduced

  useLayoutEffect(() => {
    if (!horizontal) {
      setDist(0)
      return
    }
    const measure = () => {
      const t = trackRef.current
      if (!t) return
      setDist(Math.max(0, t.scrollWidth - window.innerWidth))
    }
    measure()
    window.addEventListener('resize', measure)
    const ro = new ResizeObserver(measure)
    if (trackRef.current) ro.observe(trackRef.current)
    return () => {
      window.removeEventListener('resize', measure)
      ro.disconnect()
    }
  }, [horizontal])

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist])
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })

  return (
    <section
      id="chapters"
      ref={sectionRef}
      className={`chapters theme-deep${horizontal ? '' : ' is-stacked'}`}
      style={horizontal ? { height: `calc(100svh + ${dist}px)` } : undefined}
    >
      <div className="chapters__sticky has-arcs">
        <motion.div
          className="chapters__track"
          ref={trackRef}
          style={horizontal ? { x } : undefined}
        >
          <div className="chapters__intro">
            <Reveal className="eyebrow">{chapters.eyebrow}</Reveal>
            <Split as="h2" className="display" text={chapters.title} />
            <Reveal as="p" className="lede" delay={0.1}>
              {chapters.text}
            </Reveal>
          </div>

          {chapters.items.map((c, i) => (
            <article className="chapter" key={c.title}>
              <div className="chapter__photo">
                <Photo src={c.photo.src} tone={c.photo.tone} alt={c.photo.alt} />
              </div>
              <div className="chapter__shade" aria-hidden="true" />
              <div className="chapter__meta">
                <span className="chapter__num eyebrow">{String(i + 1).padStart(2, '0')}</span>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
                <span className="chapter__frames eyebrow">{c.frames} frames</span>
              </div>
            </article>
          ))}
        </motion.div>

        {horizontal && (
          <div className="chapters__progress" aria-hidden="true">
            <motion.span style={{ scaleX: bar }} />
          </div>
        )}
      </div>
    </section>
  )
}
