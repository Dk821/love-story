import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal from './Reveal'
import { Plus, Sparkle } from './Icons'
import { faq } from '../data/site'

export default function FAQ() {
  // One answer open at a time; the first starts open.
  const [open, setOpen] = useState<number | null>(0)
  const uid = useId()

  return (
    <section id="faq" className="section theme-light faq" aria-labelledby={`${uid}-title`}>
      <header className="faq__head">
        <Reveal as="p" className="faq__badge">
          <Sparkle /> {faq.eyebrow}
        </Reveal>
        <h2 id={`${uid}-title`} className="faq__title" aria-label={faq.title.join(' ')}>
          {faq.title.map((line, i) => (
            <span className="faq__line" key={line} aria-hidden="true">
              <Reveal
                as="span"
                delay={0.05 + i * 0.1}
                className={i === faq.title.length - 1 ? 'faq__accent' : undefined}
              >
                {line}
              </Reveal>
            </span>
          ))}
        </h2>
      </header>

      <ul className="faq__list">
        {faq.items.map((item, i) => {
          const isOpen = open === i
          return (
            <Reveal as="li" key={item.q} className={`faq__item${isOpen ? ' is-open' : ''}`} delay={Math.min(i, 4) * 0.05}>
              <h3>
                <button
                  type="button"
                  className="faq__q"
                  aria-expanded={isOpen}
                  aria-controls={`${uid}-a${i}`}
                  id={`${uid}-q${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span>{item.q}</span>
                  <span className="faq__icon" aria-hidden="true">
                    <Plus />
                  </span>
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="answer"
                    id={`${uid}-a${i}`}
                    role="region"
                    aria-labelledby={`${uid}-q${i}`}
                    className="faq__a"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p>{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </Reveal>
          )
        })}
      </ul>
    </section>
  )
}
