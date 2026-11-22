import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Photo from './Photo'
import Split from './Split'
import Reveal from './Reveal'
import { ArrowUpRight } from './Icons'
import { sectionPhotos, stories } from '../data/site'
import { originOf, type Origin } from '../lib/gesture'

/**
 * Signature of the page: hovering a couple washes their photograph across the
 * whole section behind the list, so the work itself is the background.
 */
export default function Stories({ onOpen }: { onOpen: (index: number, origin: Origin) => void }) {
  const [active, setActive] = useState(0)
  const current = stories[active]

  return (
    <section id="stories" className="section theme-dark stories">
      <div className="stories__wash" aria-hidden="true">
        <AnimatePresence initial={false}>
          <motion.div
            key={current.id}
            className="stories__washimg"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Photo src={current.cover.src} tone={current.cover.tone} alt="" />
          </motion.div>
        </AnimatePresence>
      </div>

      <header className="stories__head">
        <Reveal className="eyebrow">Selected work</Reveal>
        <Split as="h2" className="display" text="Stories we have been *trusted with*" />
        <Reveal as="p" className="lede" delay={0.1}>
          Every wedding is its own film. Open a story to see the whole day, frame by frame.
        </Reveal>
      </header>

      <Reveal className="stories__banner" duration={1}>
        <Photo src={sectionPhotos.stories.src} tone={sectionPhotos.stories.tone} alt={sectionPhotos.stories.alt} />
      </Reveal>

      <ul className="stories__list">
        {stories.map((s, i) => (
          <Reveal as="li" key={s.id} className={active === i ? 'is-active' : ''} delay={i * 0.06}>
            <button
              className="story-row"
              onClick={(e) => onOpen(i, originOf(e))}
              onPointerDown={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              aria-label={`Open the story of ${s.couple}, ${s.place}, ${s.date}`}
            >
              <span className="story-row__num eyebrow">{String(i + 1).padStart(2, '0')}</span>
              <span className="story-row__thumb">
                <Photo src={s.cover.src} tone={s.cover.tone} alt={s.cover.alt} />
              </span>
              <span className="story-row__body">
                <span className="story-row__couple">{s.couple}</span>
                <span className="story-row__meta">
                  {s.place} · {s.date} · {s.kind}
                </span>
              </span>
              <span className="story-row__cta" aria-hidden="true">
                View story <ArrowUpRight />
              </span>
            </button>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}
