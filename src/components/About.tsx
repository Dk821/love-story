import Reveal from './Reveal'
import Photo from './Photo'
import { ArrowRight, Calendar, Camera, Users } from './Icons'
import { about } from '../data/site'
import { scrollToId } from '../lib/scroll'

const icons = { camera: Camera, users: Users, calendar: Calendar }

// The photograph is cut into a cloud: a handful of overlapping circles in
// bounding-box units (0–1), so the shape scales with the picture.
const CLOUD: [number, number, number][] = [
  [0.46, 0.27, 0.27],
  [0.2, 0.56, 0.2],
  [0.76, 0.42, 0.21],
  [0.74, 0.72, 0.26],
  [0.32, 0.72, 0.22],
  [0.5, 0.5, 0.32],
]

export default function About() {
  const lines = [...about.title, about.accent]

  return (
    <section id="about" className="about" aria-labelledby="about-title">
      <svg className="about__defs" width="0" height="0" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id="about-cloud" clipPathUnits="objectBoundingBox">
            {CLOUD.map(([cx, cy, r]) => (
              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} />
            ))}
          </clipPath>
        </defs>
      </svg>

      <div className="about__grid">
        <Reveal className="about__visual" duration={1}>
          <span className="about__halo" aria-hidden="true" />
          <span className="about__ring about__ring--a" aria-hidden="true" />
          <span className="about__ring about__ring--b" aria-hidden="true" />
          <div className="about__cloudwrap">
            <div className="about__cloud">
              <Photo src={about.photo.src} tone={about.photo.tone} alt={about.photo.alt} />
            </div>
          </div>
        </Reveal>

        <div className="about__copy">
          <Reveal className="eyebrow about__eyebrow">{about.eyebrow}</Reveal>
          <h2 id="about-title" className="about__title" aria-label={lines.join(' ')}>
            {lines.map((line, i) => (
              <span className="about__line" key={line} aria-hidden="true">
                <Reveal
                  as="span"
                  delay={0.05 + i * 0.09}
                  className={i === lines.length - 1 ? 'about__accent' : undefined}
                >
                  {line}
                </Reveal>
              </span>
            ))}
          </h2>
          <Reveal as="p" className="about__text" delay={0.3}>
            {about.text}
          </Reveal>
          <Reveal delay={0.4}>
            <a
              className="about__btn"
              href={`#${about.ctaTarget}`}
              onClick={(e) => {
                e.preventDefault()
                scrollToId(about.ctaTarget)
              }}
            >
              {about.cta} <ArrowRight />
            </a>
          </Reveal>
        </div>

        <ul className="about__stats">
          {about.stats.map((s, i) => {
            const Icon = icons[s.icon]
            return (
              <Reveal as="li" key={s.label} className="about__stat" delay={0.1 + i * 0.1}>
                <span className="about__icon" aria-hidden="true">
                  <Icon />
                </span>
                <span className="about__rule" aria-hidden="true" />
                <span className="about__stat-body">
                  <strong>
                    {s.value}
                    {s.suffix}
                  </strong>
                  <span>{s.label}</span>
                </span>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
