import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'
import Reveal from './Reveal'
import Photo from './Photo'
import { sectionPhotos, stats, ticker } from '../data/site'
import { useReducedMotion } from '../lib/useMediaQuery'

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const reduced = useReducedMotion()
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    // Asked for less motion: show the number, do not count up to it.
    if (reduced) {
      setN(value)
      return
    }
    const controls = animate(0, value, {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setN(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, value, reduced])

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  )
}

export default function Stats() {
  const loop = [...ticker, ...ticker]
  // The word ticker only runs while it is on screen.
  const tickerRef = useRef<HTMLDivElement>(null)
  const tickerVisible = useInView(tickerRef)
  return (
    <section className="stats theme-dark" aria-label="Studio at a glance">
      <div className="stats__bg" aria-hidden="true">
        <Photo src={sectionPhotos.stats.src} tone={sectionPhotos.stats.tone} alt="" />
      </div>
      <div ref={tickerRef} className={`ticker${tickerVisible ? '' : ' is-offscreen'}`} aria-hidden="true">
        <div className="ticker__track">
          {[0, 1].map((dup) => (
            <div className="ticker__group" key={dup}>
              {loop.map((t, i) => (
                <span key={`${dup}-${i}`} className={i % 2 ? 'is-italic' : ''}>
                  {t}
                  <i>·</i>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <dl className="stats__grid">
        {stats.map((s, i) => (
          <Reveal key={s.label} className="stats__item" delay={i * 0.08}>
            <dt>
              <Counter value={s.value} suffix={s.suffix} />
            </dt>
            <dd>{s.label}</dd>
          </Reveal>
        ))}
      </dl>
    </section>
  )
}
