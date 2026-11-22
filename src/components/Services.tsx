import Photo from './Photo'
import Reveal from './Reveal'
import { ArrowRight, Calendar, Camera, FilmIcon, Heart, Rings, Smile } from './Icons'
import { services } from '../data/site'
import { scrollToId } from '../lib/scroll'

const icons = { rings: Rings, camera: Camera, heart: Heart, calendar: Calendar, film: FilmIcon, smile: Smile }

export default function Services() {
  const lines = [...services.title, services.accent]

  return (
    <section id="services" className="section theme-dark services" aria-labelledby="services-title">
      <div className="services__layout">
        <div className="services__intro">
          <Reveal className="eyebrow services__eyebrow">{services.eyebrow}</Reveal>
          <h2 id="services-title" className="services__title" aria-label={lines.join(' ')}>
            {lines.map((line, i) => {
              const last = i === lines.length - 1
              return (
                <span className="services__line" key={line} aria-hidden="true">
                  <Reveal as="span" delay={0.05 + i * 0.08} className={last ? 'services__accent' : undefined}>
                    {line}
                  </Reveal>
                </span>
              )
            })}
          </h2>
          <Reveal as="p" className="services__text" delay={0.3}>
            {services.text}
          </Reveal>
          <Reveal delay={0.4}>
            <a
              className="services__btn"
              href={`#${services.buttonTarget}`}
              onClick={(e) => {
                e.preventDefault()
                scrollToId(services.buttonTarget)
              }}
            >
              {services.button} <ArrowRight />
            </a>
          </Reveal>
        </div>

        <ul className="services__grid">
          {services.items.map((s, i) => {
            const Icon = icons[s.icon]
            return (
              <Reveal as="li" key={s.title} className="service" delay={(i % 3) * 0.08} duration={0.9}>
                <a
                  href="#contact"
                  aria-label={`${services.cta} about ${s.title}`}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToId('contact')
                  }}
                >
                  <span className="service__photo">
                    <Photo src={s.photo.src} tone={s.photo.tone} alt={s.photo.alt} />
                  </span>
                  <span className="service__shade" aria-hidden="true" />
                  <span className="service__meta">
                    <span className="service__icon" aria-hidden="true">
                      <Icon />
                    </span>
                    <span className="service__title">{s.title}</span>
                    <span className="service__tagline">{s.tagline}</span>
                  </span>
                  <span className="service__go" aria-hidden="true">
                    <ArrowRight />
                  </span>
                </a>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
