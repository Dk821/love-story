import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import Split from './Split'
import Reveal from './Reveal'
import Photo from './Photo'
import { ArrowUpRight } from './Icons'
import { experience, sectionPhotos, studio } from '../data/site'
import { useReducedMotion } from '../lib/useMediaQuery'

// A step lights up when its top crosses this line down the screen.
const LINE = '65%'

function Step({ index, title, text, reduced }: { index: number; title: string; text: string; reduced: boolean }) {
  const ref = useRef<HTMLLIElement>(null)
  const [reached, setReached] = useState(false)
  const { scrollYProgress } = useScroll({ target: ref, offset: [`start ${LINE}`, `end ${LINE}`] })

  useMotionValueEvent(scrollYProgress, 'change', (v) => setReached(v > 0))
  useEffect(() => setReached(scrollYProgress.get() > 0), [scrollYProgress])

  return (
    <motion.li
      ref={ref}
      className={`step${reached || reduced ? ' is-reached' : ''}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="step__node" aria-hidden="true" />
      <span className="step__num eyebrow">0{index + 1}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </motion.li>
  )
}

export default function Experience() {
  const listRef = useRef<HTMLOListElement>(null)
  const reduced = useReducedMotion()
  // How far down the list you are: this fills the line.
  const { scrollYProgress } = useScroll({ target: listRef, offset: [`start ${LINE}`, `end ${LINE}`] })

  return (
    <section id="experience" className="section theme-dark experience has-arcs has-arcs--flip">
      {/* The photograph fills the left side as a background; its edges are feathered into the dark. */}
      <motion.div
        className="experience__bg"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
      >
        <div className="experience__bgin">
          <Photo src={sectionPhotos.experience.src} tone={sectionPhotos.experience.tone} alt="" />
        </div>
      </motion.div>

      <div className="experience__left">
        <Reveal className="eyebrow">{experience.eyebrow}</Reveal>
        <Split as="h2" className="display" text={experience.title} />
        <Reveal delay={0.15}>
          <a className="btn" href={studio.clientGalleryUrl}>
            {experience.cta} <ArrowUpRight />
          </a>
        </Reveal>
      </div>

      <ol className="experience__steps" ref={listRef}>
        <span className="experience__track" aria-hidden="true">
          <motion.span className="experience__line" style={{ scaleY: reduced ? 1 : scrollYProgress }} />
        </span>
        {experience.steps.map((s, i) => (
          <Step key={s.title} index={i} title={s.title} text={s.text} reduced={reduced} />
        ))}
      </ol>
    </section>
  )
}
