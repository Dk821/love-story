import Split from './Split'
import Reveal from './Reveal'
import { ArrowUpRight, Mail, MapPin, Phone } from './Icons'
import { contact, studio } from '../data/site'

export default function Contact() {
  const q = encodeURIComponent(contact.mapQuery)
  const mapSrc = `https://www.google.com/maps?q=${q}&output=embed`
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${q}`
  const wa = `https://wa.me/${studio.whatsapp}?text=${encodeURIComponent(
    'Hello! I would love to know more about your wedding photography.',
  )}`

  return (
    <section id="contact" className="section theme-light contact">
      <div className="contact__left">
        <Reveal className="eyebrow">{contact.eyebrow}</Reveal>
        <Split as="h2" className="display" text={contact.title} />
        <Reveal as="p" className="contact__text" delay={0.1}>
          {contact.text}
        </Reveal>

        <Reveal className="contact__cards" delay={0.15}>
          <div className="contact__card">
            <span className="contact__icon">
              <MapPin />
            </span>
            <div>
              <p className="eyebrow">Visit us</p>
              <p className="contact__value">{studio.address}</p>
              {contact.hours && <p className="contact__sub">{contact.hours}</p>}
            </div>
          </div>
          <div className="contact__card">
            <span className="contact__icon">
              <Mail />
            </span>
            <div>
              <p className="eyebrow">Email us</p>
              <p className="contact__value">
                <a href={`mailto:${studio.email}`}>{studio.email}</a>
              </p>
            </div>
          </div>
          <div className="contact__card">
            <span className="contact__icon">
              <Phone />
            </span>
            <div>
              <p className="eyebrow">Call us</p>
              <p className="contact__value">
                <a href={`tel:${studio.phone.replace(/\s/g, '')}`}>{studio.phone}</a>
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal className="contact__actions" delay={0.2}>
          <a className="btn btn--garnet" href={wa} target="_blank" rel="noreferrer">
            <i className="dot" aria-hidden="true" /> {contact.whatsapp}
          </a>
        </Reveal>
      </div>

      <Reveal className="contact__mapwrap" delay={0.1} duration={1}>
        <div className="contact__map">
          <iframe
            title={`Map: ${studio.name}`}
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <a className="contact__directions" href={directionsUrl} target="_blank" rel="noreferrer">
            {contact.directions} <ArrowUpRight />
          </a>
        </div>
      </Reveal>
    </section>
  )
}
