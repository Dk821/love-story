import { useEffect, useState } from 'react'
import Photo from './Photo'
import Reveal from './Reveal'
import { ArrowUpRight, Play } from './Icons'
import { studio, youtube } from '../data/site'
import { youtubeId } from '../lib/youtube'

type Video = (typeof youtube.videos)[number]

/**
 * The picture for a card: YouTube's own thumbnail for the link, the sharpest one
 * that exists. Without a link (or if YouTube has no picture), the card's own photo.
 */
function Thumb({ id, photo }: { id: string; photo: Video['photo'] }) {
  // 0 = widescreen thumbnail, 1 = standard thumbnail, 2 = the card's own photo
  const [stage, setStage] = useState<0 | 1 | 2>(id ? 0 : 2)
  useEffect(() => setStage(id ? 0 : 2), [id])

  if (stage === 2) return <Photo src={photo.src} tone={photo.tone} alt={photo.alt} />

  const next = () => setStage((v) => (v === 0 ? 1 : 2))
  return (
    <img
      className="yt__thumb"
      src={`https://i.ytimg.com/vi/${id}/${stage === 0 ? 'maxresdefault' : 'hqdefault'}.jpg`}
      alt=""
      loading="lazy"
      decoding="async"
      draggable={false}
      onError={next}
      // A missing widescreen thumbnail can come back as a tiny grey stand-in rather than an error.
      onLoad={(e) => e.currentTarget.naturalWidth <= 120 && next()}
    />
  )
}

export default function YouTube() {
  const [playing, setPlaying] = useState<number | null>(null)
  const channelUrl = studio.social.find((s) => s.label === 'YouTube')?.url ?? 'https://youtube.com/'

  return (
    <section id="youtube" className="section theme-light yt" aria-labelledby="yt-title">
      <header className="yt__head">
        <div>
          <Reveal className="eyebrow yt__eyebrow">{youtube.eyebrow}</Reveal>
          <h2 id="yt-title" className="yt__title" aria-label={`${youtube.title} ${youtube.accent}`}>
            <span className="yt__line" aria-hidden="true">
              <Reveal as="span" delay={0.05}>
                {youtube.title}
              </Reveal>
            </span>
            <span className="yt__line" aria-hidden="true">
              <Reveal as="span" delay={0.14} className="yt__accent">
                {youtube.accent}
              </Reveal>
            </span>
          </h2>
        </div>
        <Reveal delay={0.2}>
          <a className="yt__btn" href={channelUrl} target="_blank" rel="noreferrer">
            {youtube.button} <ArrowUpRight />
          </a>
        </Reveal>
      </header>

      <ul className="yt__grid">
        {youtube.videos.map((v, i) => {
          const id = youtubeId(v.url)
          const isPlaying = playing === i && Boolean(id)
          return (
            <Reveal as="li" key={`${i}-${v.title}`} className="yt__card" delay={i * 0.08} duration={0.9}>
              <div className={`yt__media${isPlaying ? ' is-playing' : ''}`}>
                {isPlaying ? (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`}
                    title={v.title}
                    allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                    allowFullScreen
                  />
                ) : (
                  <>
                    <button
                      type="button"
                      className="yt__poster"
                      disabled={!id}
                      onClick={() => setPlaying(i)}
                      aria-label={id ? `Play ${v.title}` : `${v.title} — video coming soon`}
                    >
                      <Thumb id={id} photo={v.photo} />
                      <span className="yt__shade" aria-hidden="true" />
                      <span className="yt__play" aria-hidden="true">
                        <Play />
                      </span>
                      <span className="yt__name">{v.title}</span>
                    </button>
                    <a className="yt__channel eyebrow" href={channelUrl} target="_blank" rel="noreferrer">
                      {youtube.channelLabel} <ArrowUpRight />
                    </a>
                  </>
                )}
              </div>
            </Reveal>
          )
        })}
      </ul>
    </section>
  )
}
