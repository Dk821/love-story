import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { navLinks } from '../data/site'
import { scrollToId, startScroll, stopScroll } from '../lib/scroll'
import { useReducedMotion } from '../lib/useMediaQuery'
import { ArrowUpRight } from './Icons'

export default function Nav({ ready }: { ready: boolean }) {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState('')
  const reduced = useReducedMotion()
  const burgerRef = useRef<HTMLButtonElement>(null)

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(y > prev && y > 180 && !open)
  })

  // Marks the section you are reading, so the nav says where you are.
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => Boolean(el))
    if (!sections.length) return

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setCurrent(visible.target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] },
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // While the menu is open the page behind it stays put, focus moves into the
  // menu, and closing hands focus back to the burger.
  useEffect(() => {
    if (!open) return
    stopScroll()
    document.querySelector<HTMLElement>('.menu a')?.focus({ preventScroll: true })
    return () => {
      startScroll()
      burgerRef.current?.focus({ preventScroll: true })
    }
  }, [open])

  const go = (id: string) => {
    const wasOpen = open
    setOpen(false)
    window.setTimeout(() => scrollToId(id), wasOpen ? 380 : 0)
  }

  return (
    <>
      <motion.header
        className="nav"
        initial={{ y: '-120%' }}
        animate={{ y: ready && !hidden ? 0 : '-120%' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <a
          href="#top"
          className="nav__logo"
          onClick={(e) => {
            e.preventDefault()
            setOpen(false)
            scrollToId('top')
          }}
        >
          Love <em>Story</em>
          <span className="nav__sub">Photography &amp; Film</span>
        </a>

        <nav className="nav__links" aria-label="Primary">
          {navLinks.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              aria-current={current === l.id ? 'true' : undefined}
              onClick={(e) => {
                e.preventDefault()
                go(l.id)
              }}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="nav__right">
          <a
            href="#contact"
            className="btn btn--small"
            onClick={(e) => {
              e.preventDefault()
              go('contact')
            }}
          >
            Enquire <ArrowUpRight />
          </a>
          <button
            ref={burgerRef}
            className={`nav__burger${open ? ' is-open' : ''}`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="menu"
            initial={reduced ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
            animate={reduced ? { opacity: 1 } : { clipPath: 'inset(0 0 0% 0)' }}
            exit={reduced ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
            transition={
              reduced ? { duration: 0.2 } : { type: 'spring', bounce: 0, duration: 0.7 }
            }
          >
            <ul>
              {navLinks.map((l, i) => (
                <motion.li
                  key={l.id}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.22 + i * 0.07, duration: 0.6 }}
                >
                  <a
                    href={`#${l.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      go(l.id)
                    }}
                  >
                    <span className="menu__dot" aria-hidden="true" />
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
