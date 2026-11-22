import { Fragment } from 'react'
import { motion, useWillChange } from 'framer-motion'

type Props = {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'p'
  className?: string
  delay?: number
  immediate?: boolean // animate on mount instead of on scroll
}

const ease = [0.22, 1, 0.36, 1] as const

/** Masked word-by-word reveal. Wrap words in *asterisks* to set them in italics. */
export default function Split({ text, as = 'h2', className = '', delay = 0, immediate }: Props) {
  const Tag = motion[as] as typeof motion.h2
  // Promote words to their own layer only while they are moving.
  const willChange = useWillChange()
  const parts = text.split(/(\*[^*]+\*)/g).filter(Boolean)

  const words: { word: string; italic: boolean }[] = []
  parts.forEach((part) => {
    const italic = part.startsWith('*') && part.endsWith('*')
    const clean = italic ? part.slice(1, -1) : part
    clean
      .split(' ')
      .filter(Boolean)
      .forEach((word) => words.push({ word, italic }))
  })

  const trigger = immediate
    ? { animate: 'show' as const }
    : { whileInView: 'show' as const, viewport: { once: true, margin: '0px 0px -12% 0px' } }

  return (
    <Tag
      className={className}
      initial="hidden"
      {...trigger}
      variants={{ show: { transition: { staggerChildren: 0.04, delayChildren: delay } } }}
      aria-label={words.map((w) => w.word).join(' ')}
    >
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="split__mask" aria-hidden="true">
            <motion.span
              className={`split__word${w.italic ? ' is-italic' : ''}`}
              style={{ willChange }}
              variants={{ hidden: { y: '115%' }, show: { y: '0%', transition: { duration: 0.8, ease } } }}
            >
              {w.word}
            </motion.span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </Tag>
  )
}
