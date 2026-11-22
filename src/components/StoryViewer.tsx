import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useDragControls } from 'framer-motion'
import Photo from './Photo'
import { ArrowLeft, ArrowRight, Close } from './Icons'
import type { Story } from '../data/site'
import { originOf, originStyle, project, spring, type Origin } from '../lib/gesture'
import { startScroll, stopScroll } from '../lib/scroll'
import { useDialog } from '../lib/useDialog'

type Frame = Story['frames'][number]

const slide = {
  // dir 0 = opening (grows from the frame you tapped); ±1 = stepping (slides in from that side)
  enter: (dir: number) => (dir === 0 ? { opacity: 0, scale: 0.9 } : { opacity: 0, x: dir * 48 }),
  center: { opacity: 1, scale: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: -dir * 48 }),
}

function Lightbox({
  frames,
  index,
  dir,
  origin,
  onStep,
  onClose,
}: {
  frames: Frame[]
  index: number
  dir: number
  origin: Origin | null
  onStep: (dir: 1 | -1) => void
  onClose: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  useDialog(ref)
  const frame = frames[index]
  const total = frames.length

  return (
    <motion.div
      ref={ref}
      tabIndex={-1}
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <AnimatePresence initial custom={dir} mode="popLayout">
        <motion.div
          key={index}
          className="lightbox__stage"
          style={{
            width: `min(92vw, calc(78vh * ${frame.ratio ?? 1}))`,
            aspectRatio: frame.ratio ?? 1,
            ...originStyle(origin),
          }}
          custom={dir}
          variants={slide}
          initial="enter"
          animate="center"
          exit="exit"
          transition={spring}
          // The photo follows the finger 1:1, then a release is judged by where
          // its momentum would carry it: sideways steps, downward/upward closes.
          drag
          dragDirectionLock
          dragSnapToOrigin
          dragElastic={0.6}
          dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
          onDragEnd={(_, info) => {
            const px = info.offset.x + project(info.velocity.x)
            const py = info.offset.y + project(info.velocity.y)
            if (Math.abs(px) > Math.abs(py)) {
              if (px < -90) onStep(1)
              else if (px > 90) onStep(-1)
            } else if (Math.abs(py) > 110) {
              onClose()
            }
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <Photo src={frame.src} tone={frame.tone} alt={frame.alt} eager />
        </motion.div>
      </AnimatePresence>
      <div className="lightbox__bar eyebrow" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => onStep(-1)} aria-label="Previous frame">
          <ArrowLeft />
        </button>
        <span>
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
        <button onClick={() => onStep(1)} aria-label="Next frame">
          <ArrowRight />
        </button>
        <button onClick={onClose} aria-label="Close viewer" className="lightbox__x">
          <Close />
        </button>
      </div>
    </motion.div>
  )
}

export default function StoryViewer({
  story,
  origin,
  onClose,
}: {
  story: Story
  origin: Origin
  onClose: () => void
}) {
  const [lb, setLb] = useState<number | null>(null)
  const [lbOrigin, setLbOrigin] = useState<Origin | null>(null)
  const [dir, setDir] = useState(0)
  const [dragClosed, setDragClosed] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const dragControls = useDragControls()
  const total = story.frames.length

  // The viewer's own focus trap pauses while the photo viewer on top is open.
  useDialog(ref, lb === null)

  const step = useCallback(
    (d: 1 | -1) => {
      setDir(d)
      setLb((v) => (v === null ? v : (v + d + total) % total))
    },
    [total],
  )

  useEffect(() => {
    stopScroll()
    return () => startScroll()
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lb !== null) setLb(null)
        else onClose()
      } else if (e.key === 'ArrowRight') step(1)
      else if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lb, onClose, step])

  return (
    <motion.div
      ref={ref}
      tabIndex={-1}
      className="viewer"
      role="dialog"
      aria-modal="true"
      aria-label={`${story.couple} — story`}
      data-lenis-prevent
      style={originStyle(origin)}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      // Closed by dragging down? It leaves the way it was pulled. Otherwise it
      // shrinks back toward the story you opened it from.
      exit={
        dragClosed
          ? { y: typeof window === 'undefined' ? 800 : window.innerHeight }
          : { opacity: 0, scale: 0.94 }
      }
      transition={spring}
      drag="y"
      dragListener={false}
      dragControls={dragControls}
      dragSnapToOrigin
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={{ top: 0, bottom: 0.5 }}
      onDragEnd={(_, info) => {
        if (info.offset.y + project(info.velocity.y) > 180) {
          setDragClosed(true)
          onClose()
        }
      }}
    >
      {/* Grab here and pull down to close, like a sheet. */}
      <div className="viewer__grab" aria-hidden="true" onPointerDown={(e) => dragControls.start(e)}>
        <span />
      </div>

      <button className="viewer__close eyebrow" onClick={onClose}>
        Close <Close />
      </button>

      <div className="viewer__inner">
        <header className="viewer__head">
          <p className="eyebrow">
            {story.kind} · {story.place} · {story.date}
          </p>
          <h2 className="display">{story.couple}</h2>
          <div className="viewer__cols">
            <p className="viewer__blurb">{story.blurb}</p>
            <blockquote className="viewer__quote">{story.quote}</blockquote>
          </div>
        </header>

        <div className="viewer__hero">
          <Photo src={story.cover.src} tone={story.cover.tone} alt={story.cover.alt} ratio={1.6} />
        </div>

        <div className="viewer__grid">
          {story.frames.map((f, i) => (
            <button
              key={f.src}
              className="viewer__frame"
              onClick={(e) => {
                setDir(0)
                setLbOrigin(originOf(e))
                setLb(i)
              }}
              aria-label={`Open frame ${i + 1}`}
            >
              <Photo src={f.src} tone={f.tone} alt={f.alt} ratio={f.ratio} />
            </button>
          ))}
        </div>

        <footer className="viewer__foot">
          <p className="eyebrow">{total} frames shown</p>
          <button className="btn" onClick={onClose}>
            Back to all stories
          </button>
        </footer>
      </div>

      <AnimatePresence>
        {lb !== null && (
          <Lightbox
            frames={story.frames}
            index={lb}
            dir={dir}
            origin={lbOrigin}
            onStep={step}
            onClose={() => setLb(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}
