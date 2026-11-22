import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Photo from './Photo'
import Split from './Split'
import Reveal from './Reveal'
import Floral from './Floral'
import { ArrowLeft, ArrowRight } from './Icons'
import { testimonials, testimonialsIntro } from '../data/site'
import { project } from '../lib/gesture'
import { useReducedMotion } from '../lib/useMediaQuery'

type Item = (typeof testimonials)[number]

const n = testimonials.length
const AUTO_MS = 5200

// Where card `j` sits relative to the current card `i`: 0 = centre, -1 = left, 1 = right.
// It wraps around, so the loop never has an end.
const offset = (j: number, i: number) => {
  const half = Math.floor(n / 2)
  return ((j - i + n + half) % n) - half
}

function Card({ t, d, reduced }: { t: Item; d: number; reduced: boolean }) {
  // A card that wraps from one side to the other jumps there unseen instead of sliding across the middle.
  const prev = useRef(d)
  const wrapped = Math.abs(d - prev.current) > 1
  useEffect(() => {
    prev.current = d
  })
  const centre = d === 0

  return (
    <motion.figure
      className={`tcard${centre ? ' is-centre' : ''}`}
      aria-hidden={!centre}
      initial={false}
      animate={{
        x: `${d * 104}%`,
        scale: centre ? 1 : 0.88,
        opacity: centre ? 1 : Math.abs(d) === 1 ? 0.38 : 0,
        filter: centre ? 'blur(0px)' : 'blur(2.5px)',
      }}
      transition={wrapped || reduced ? { duration: 0 } : { type: 'spring', bounce: 0, duration: 0.75 }}
      style={{ zIndex: centre ? 2 : 1, pointerEvents: centre ? 'auto' : 'none' }}
    >
      <div className="tcard__avatar">
        <Photo src={t.photo.src} tone={t.photo.tone} alt={t.photo.alt} ratio={1} />
      </div>
      <figcaption className="tcard__who">
        <strong>{t.name}</strong>
        <span>{t.meta}</span>
      </figcaption>
      <blockquote>“{t.quote}”</blockquote>
    </motion.figure>
  )
}

export default function Testimonials() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduced = useReducedMotion()
  const go = (d: 1 | -1) => setI((v) => (v + d + n) % n)

  // Plays on its own, one card at a time. Any click or swipe restarts the wait; hovering pauses it.
  useEffect(() => {
    if (reduced || paused || n < 2) return
    const id = window.setTimeout(() => setI((v) => (v + 1) % n), AUTO_MS)
    return () => window.clearTimeout(id)
  }, [i, paused, reduced])

  return (
    <section className="section theme-light testimonials" aria-label="Kind words">
      <Floral className="testimonials__floral" />

      <Reveal className="eyebrow testimonials__eyebrow">{testimonialsIntro.eyebrow}</Reveal>
      <Split as="h2" className="display testimonials__title" text={testimonialsIntro.title} />

      <div
        className="testimonials__carousel"
        role="group"
        aria-roledescription="carousel"
        aria-label="Testimonials"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <motion.div
          className="testimonials__stage"
          // Swipe: a flick sideways moves one card, judged by where the gesture would come to rest.
          onPanEnd={(_, info) => {
            const px = info.offset.x + project(info.velocity.x)
            if (px < -70) go(1)
            else if (px > 70) go(-1)
          }}
        >
          {testimonials.map((t, j) => (
            <Card key={t.name} t={t} d={offset(j, i)} reduced={reduced} />
          ))}
        </motion.div>

        <button className="testimonials__arrow testimonials__arrow--prev" onClick={() => go(-1)} aria-label="Previous testimonial">
          <ArrowLeft />
        </button>
        <button className="testimonials__arrow testimonials__arrow--next" onClick={() => go(1)} aria-label="Next testimonial">
          <ArrowRight />
        </button>
      </div>

      <div className="testimonials__dots" role="group" aria-label="Choose a testimonial">
        {testimonials.map((t, j) => (
          <button
            key={t.name}
            type="button"
            className={j === i ? 'is-on' : undefined}
            aria-label={`Show testimonial from ${t.name}`}
            aria-current={j === i ? 'true' : undefined}
            onClick={() => setI(j)}
          />
        ))}
      </div>
    </section>
  )
}
