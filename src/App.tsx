import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Lenis from 'lenis'
import Intro from './components/Intro'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import YouTube from './components/YouTube'
import Chapters from './components/Chapters'
import Work from './components/Work'
import Experience from './components/Experience'
import Testimonials from './components/Testimonials'
import Latest from './components/Latest'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { setLenis } from './lib/scroll'
import { useReducedMotion } from './lib/useMediaQuery'

// The title card plays once per visit (per browser tab), not on every reload.
const INTRO_KEY = 'ls-intro-seen'
const introSeen = () => {
  try {
    return window.sessionStorage.getItem(INTRO_KEY) === '1'
  } catch {
    return false
  }
}

export default function App() {
  const [ready, setReady] = useState(introSeen)
  const reduced = useReducedMotion()
  const done = useCallback(() => {
    try {
      window.sessionStorage.setItem(INTRO_KEY, '1')
    } catch {
      /* private mode: the intro simply plays again next time */
    }
    setReady(true)
  }, [])

  useEffect(() => {
    if (reduced) return
    const lenis = new Lenis({ lerp: 0.16, wheelMultiplier: 0.9 })
    setLenis(lenis)
    let raf = requestAnimationFrame(function loop(t) {
      lenis.raf(t)
      raf = requestAnimationFrame(loop)
    })
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      setLenis(null)
    }
  }, [reduced])

  return (
    <>
      <a className="skip eyebrow" href="#services">
        Skip to the work
      </a>
      <AnimatePresence>{!ready && <Intro onDone={done} />}</AnimatePresence>
      <Nav ready={ready} />
      <main>
        <Hero ready={ready} />
        <About />
        <Services />
        <YouTube />
        <Chapters />
        <Work />
        <Experience />
        <Testimonials />
        <Latest />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
