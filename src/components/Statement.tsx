import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Photo from './Photo'
import Split from './Split'
import Reveal from './Reveal'
import { statement } from '../data/site'
import { useReducedMotion } from '../lib/useMediaQuery'

export default function Statement() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  // The two photographs drift at different speeds, which is what gives the pair its depth.
  const yMain = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [50, -50])
  const yInset = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-30, 30])

  return (
    <section id="approach" ref={ref} className="section theme-light statement">
      <Reveal className="eyebrow statement__eyebrow">{statement.eyebrow}</Reveal>
      <Split as="h2" className="statement__text" text={statement.text} />

      <div className="statement__body">
        <div className="statement__copy">
          <ol className="statement__points">
            {statement.points.map((point, i) => (
              <Reveal as="li" key={point.title} className="statement__point" delay={i * 0.08}>
                <span className="statement__num" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="statement__title">{point.title}</h3>
                  <p className="statement__body-text">{point.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
          <Reveal as="p" className="statement__note" delay={0.1}>
            {statement.note}
          </Reveal>
        </div>

        <div className="statement__stage">
          <motion.div className="statement__fig statement__fig--main" style={{ y: yMain }}>
            <Reveal duration={1}>
              <Photo src="/photos/wedding/thaali-closeup.jpg" tone={2} alt="A bride and groom, foreheads touching, holding the thaali" ratio={0.8} />
            </Reveal>
          </motion.div>
          <motion.div className="statement__fig statement__fig--inset" style={{ y: yInset }}>
            <Reveal duration={1} delay={0.15}>
              <div className="statement__frame">
                <Photo src="/photos/wedding/candid-laugh.jpg" tone={5} alt="A couple laughing together" ratio={1.5} />
                <span className="statement__chip">{statement.caption}</span>
              </div>
            </Reveal>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
