import type { ReactNode } from 'react'
import Reveal from './Reveal'
import { Facebook, Globe, Instagram, Mail, MapPin, Phone, TikTok, YouTubeIcon } from './Icons'
import { footerInfo, navLinks, services, studio } from '../data/site'
import { scrollToId } from '../lib/scroll'

// The icon for each social link, matched on its label in `studio.social`.
const socialIcon: Record<string, ReactNode> = {
  Instagram: <Instagram />,
  Facebook: <Facebook />,
  YouTube: <YouTubeIcon />,
  TikTok: <TikTok />,
}

// A link that scrolls to a section on this page.
function Jump({ id, children }: { id: string; children: ReactNode }) {
  return (
    <a
      href={`#${id}`}
      onClick={(e) => {
        e.preventDefault()
        scrollToId(id)
      }}
    >
      {children}
    </a>
  )
}

export default function Footer() {
  return (
    <footer className="footer theme-dark has-arcs has-arcs--bottom">
      <Reveal className="footer__grid">
        <div className="footer__brand">
          <p className="footer__name">
            Love <em>Story</em>
          </p>
          <ul className="footer__contact">
            <li>
              <MapPin />
              <span>{studio.address}</span>
            </li>
            <li>
              <Mail />
              <a href={`mailto:${studio.email}`}>{studio.email}</a>
            </li>
            <li>
              <Phone />
              <a href={`tel:${studio.phone.replace(/\s/g, '')}`}>{studio.phone}</a>
            </li>
          </ul>
          <div className="footer__social">
            {studio.social.map((s) => (
              <a key={s.label} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label}>
                {socialIcon[s.label] ?? <Globe />}
              </a>
            ))}
          </div>
        </div>

        <div className="footer__col">
          <h4>Services</h4>
          <ul>
            {services.items.map((s) => (
              <li key={s.title}>
                <Jump id="services">{s.title}</Jump>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h4>Explore</h4>
          <ul>
            {navLinks.map((l) => (
              <li key={l.id}>
                <Jump id={l.id}>{l.label}</Jump>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h4>{footerInfo.support.title}</h4>
          <ul>
            {footerInfo.support.links.map((l) => (
              <li key={l.label}>
                {l.id ? <Jump id={l.id}>{l.label}</Jump> : <a href={studio.clientGalleryUrl}>{l.label}</a>}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <div className="footer__base">
        <p>
          © {new Date().getFullYear()} {studio.name}. All rights reserved.
        </p>
        <div className="footer__legal">
          {footerInfo.legal.map((l) => (
            <a key={l.label} href={l.href}>
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
