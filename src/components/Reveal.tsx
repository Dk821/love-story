import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  /** Text and UI settle quickly (0.7s); pass 1 for photographs, which can breathe. */
  duration?: number
  as?: 'div' | 'p' | 'span' | 'li' | 'figure'
}

export default function Reveal({ children, className, delay = 0, y = 16, duration = 0.7, as = 'div' }: Props) {
  const Tag = motion[as] as typeof motion.div
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  )
}
