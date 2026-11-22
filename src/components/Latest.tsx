import { useRef } from 'react'
import { useInView } from 'framer-motion'
import Photo from './Photo'
import Split from './Split'
import Reveal from './Reveal'
import { latest } from '../data/site'

export default function Latest() {
  // The loop only runs while it is on screen.
  const loopRef = useRef<HTMLDivElement>(null)
  const visible = useInView(loopRef)

  return (
    <section className="section theme-dark latest has-arcs has-arcs--flip">
      <header className="latest__head">
        <div>
          <Reveal className="eyebrow">{latest.eyebrow}</Reveal>
          <Split as="h2" className="display" text="Fresh from the *field*" />
        </div>
        <Reveal as="p" className="latest__note" delay={0.1}>
          {latest.note}
        </Reveal>
      </header>

      {/* Two identical groups side by side; the track slides left by exactly one group, then starts over — so it never ends. */}
      <div ref={loopRef} className={`latest__loop${visible ? '' : ' is-offscreen'}`}>
        <div className="latest__track">
          {[0, 1].map((copy) => (
            <div className="latest__group" key={copy} aria-hidden={copy === 1 ? true : undefined}>
              {latest.items.map((p, i) => (
                <figure key={`${copy}-${p.src}`} className={`latest__item latest__item--${i % 3}`}>
                  <div className="latest__photo">
                    <Photo src={p.src} tone={p.tone} alt={copy === 0 ? p.alt : ''} eager={copy === 0} />
                  </div>
                  <figcaption className="eyebrow">{p.caption}</figcaption>
                </figure>
              ))}
            </div>
          ))}
        </div>
      </div>

     
    </section>
  )
}
