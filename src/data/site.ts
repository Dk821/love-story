/**
 * ALL CONTENT LIVES HERE.
 * Edit text, links and photo paths in this one file — the components just render it.
 *
 * Photos: put files in /public/photos and reference them as '/photos/...'.
 * The wedding photographs live in /public/photos/wedding; w('name') below points at one of them.
 * A slot whose file doesn't exist yet shows a soft placeholder showing the expected path.
 *
 * IMPORTANT: every name, number, place, quote and contact detail below is SAMPLE content.
 * Replace it with your real studio details and real client words before publishing.
 */

/** Path of a photograph in /public/photos/wedding */
const w = (name: string) => `/photos/wedding/${name}.jpg`

// Every wedding photograph with its real width / height, used by the story galleries.
const pool: [string, number][] = [
  ['veranda-couple', 1.5],
  ['thaali-closeup', 0.8],
  ['temple-sunset', 1.5],
  ['river-bridge', 1.5],
  ['thaali-garlands', 0.667],
  ['ritual-lamp', 0.75],
  ['embrace-bangles', 0.666],
  ['jasmine-bride', 0.794],
  ['misty-white', 1.778],
  ['sunset-trees', 1.336],
  ['park-couple', 1.5],
  ['candid-laugh', 1.503],
  ['garland-pair', 0.553],
  ['evening-foliage', 1.5],
]

export type Frame = {
  src: string
  tone: number // 0–7: picks the placeholder colour until a real photo exists
  alt: string
  ratio?: number // width / height, used by the story gallery layout
}

export const studio = {
  name: 'Love Story Photography',
  short: 'Love Story',
  descriptor: 'Wedding photography & film',
  regions: 'Tamil Nadu · Destination · Worldwide',
  intro:
    'We are wedding photographers and filmmakers working across Tamil Nadu. We keep the loud, tender, slow and fast parts of your day — the way they were actually lived — so you can hold them for good.',
  email: 'hello@lovestoryphotography.com',
  phone: '+91 98400 00000',
  whatsapp: '919840000000', // digits only, with country code, no +
  address: 'Studio address, City, Tamil Nadu, India',
  timezone: 'Asia/Kolkata',
  timezoneLabel: 'Tamil Nadu, India',
  instagramHandle: '@lovestoryphotography',
  social: [
    { label: 'Instagram', url: 'https://instagram.com/' },
    { label: 'Facebook', url: 'https://facebook.com/' },
    { label: 'YouTube', url: 'https://youtube.com/' },
    { label: 'TikTok', url: 'https://tiktok.com/' },
  ],
  clientGalleryUrl: '#', // link to your private client-gallery login
}

export const navLinks = [
  { label: 'About', id: 'about' },
  { label: 'Services', id: 'services' },
  { label: 'Work', id: 'work' },
  { label: 'Chapters', id: 'chapters' },
  { label: 'Experience', id: 'experience' },
  { label: 'Contact', id: 'contact' },
]

// The hero fills the whole screen. Add more landscape photos here and it becomes a slideshow:
//   { src: '/photos/hero-2.jpg', tone: 3, couple: 'Kavya & Arun', place: 'Coimbatore' },
const h = (name: string) => `/photos/hero/${name}.jpg`

export const heroSlides = [
  { src: h('veil-forehead'), tone: 0, couple: 'Divya & Arvind', place: 'Coimbatore' },
  { src: h('forest-kiss'), tone: 1, couple: 'Lakshmi & Suresh', place: 'Pollachi' },
  { src: h('pillar-couple'), tone: 2, couple: 'Keerthana & Bala', place: 'Tirunelveli' },
  { src: h('tuxedo-saree'), tone: 3, couple: 'Nandini & Rajesh', place: 'Thanjavur' },
  { src: h('leaf-embrace'), tone: 4, couple: 'Swetha & Prakash', place: 'Tiruchirappalli' },
  { src: h('leaf-portrait'), tone: 5, couple: 'Harini & Dinesh', place: 'Salem' },
]

export const statement = {
  eyebrow: 'Our approach',
  text: 'We do not chase perfect poses. We wait for the half-second that feels exactly like *you* — and we are ready when it comes.',
  note: 'Unposed, unhurried, and made to outlive the nadaswaram.',
  points: [
    { title: 'Unposed', body: 'We direct as little as we can. The frames you will keep happen between the rituals, not during the poses.' },
    { title: 'Unhurried', body: 'Two shooters work around your muhurtham timings, so no one is rushed and nothing is missed.' },
    { title: 'Made to last', body: 'Every photograph is graded by hand and delivered in full resolution, ready for the album and the next generation.' },
  ],
  caption: 'Between the rituals',
}

export type Story = {
  id: string
  couple: string
  place: string
  date: string
  kind: string
  blurb: string
  quote: string
  cover: Frame
  frames: Frame[]
}

/**
 * Twelve gallery frames for a story, taken from the shared photographs. Each story starts
 * at a different photograph and leaves out its own cover, so no story repeats a frame.
 * Put real galleries in /public/photos/stories/<id>/01.jpg … and list them here instead.
 */
function frames(cover: string, count: number, startTone: number, offset: number): Frame[] {
  const rest = pool.filter(([name]) => name !== cover)
  return Array.from({ length: count }, (_, i) => {
    const [name, ratio] = rest[(offset + i) % rest.length]
    return { src: w(name), tone: (startTone + i) % 8, alt: `Frame ${i + 1}`, ratio }
  })
}

export const stories: Story[] = [
  {
    id: 'meenakshi-karthik',
    couple: 'Meenakshi & Karthik',
    place: 'Madurai',
    date: 'February 2026',
    kind: 'Wedding',
    blurb:
      'A dawn muhurtham near the temple towers, with the nadaswaram starting before the sun was fully up. Four hundred guests, banana-leaf lunches in long rows, and a grandmother who cried through every ritual.',
    quote: 'We forgot you were there, and that is exactly why the photos feel like us.',
    cover: { src: w('temple-sunset'), tone: 0, alt: 'Meenakshi and Karthik' },
    frames: frames('temple-sunset', 12, 0, 0),
  },
  {
    id: 'kavya-arun',
    couple: 'Kavya & Arun',
    place: 'Coimbatore',
    date: 'November 2025',
    kind: 'Wedding & film',
    blurb:
      'A two-day celebration, with family flying in from Chennai, Singapore and Dubai. We shot the quiet moments with the grandparents just as carefully as the oonjal and the party.',
    quote: 'Our parents cried at the film. So did we. Twice.',
    cover: { src: w('candid-laugh'), tone: 3, alt: 'Kavya and Arun' },
    frames: frames('candid-laugh', 12, 3, 4),
  },
  {
    id: 'priya-vignesh',
    couple: 'Priya & Vignesh',
    place: 'Chennai',
    date: 'August 2025',
    kind: 'Pre-wedding & wedding',
    blurb:
      'Two sessions, one story: a monsoon-evening pre-wedding shoot along the East Coast Road, then a Kanchipuram-bright muhurtham in the city with the whole extended family.',
    quote: 'The pre-wedding shoot made us relaxed. By the wedding day, the camera was just another cousin.',
    cover: { src: w('river-bridge'), tone: 5, alt: 'Priya and Vignesh' },
    frames: frames('river-bridge', 12, 5, 8),
  },
  {
    id: 'anjali-harish',
    couple: 'Anjali & Harish',
    place: 'Kodaikanal',
    date: 'May 2025',
    kind: 'Intimate wedding',
    blurb:
      'Thirty guests, a misty hill-station morning and a muhurtham on the lawn of a family estate, where every breath turned into a little cloud. Small, close, and completely theirs.',
    quote: 'Small wedding, huge photos. We could not stop looking at the faces.',
    cover: { src: w('misty-white'), tone: 6, alt: 'Anjali and Harish' },
    frames: frames('misty-white', 12, 6, 2),
  },
]

export const ticker = [
  'Weddings',
  'Pre-weddings',
  'Engagements',
  'Receptions',
  'Baby showers',
  'Films',
  'Destination',
  'Candid',
]

// SAMPLE numbers — replace with your real ones
export const stats = [
  { value: 300, suffix: '+', label: 'Love stories told' },
  { value: 20, suffix: '', label: 'Towns & destinations' },
  { value: 7, suffix: ' yrs', label: 'Behind the lens' },
  { value: 14, suffix: '', label: 'Weddings a season, no more' },
]

export const chapters = {
  eyebrow: 'A wedding, in order',
  title: 'Five chapters, one *long day*',
  text: 'A wedding is never one moment. We cover it as a story with a beginning, a middle and a slow, happy end.',
  items: [
    {
      title: 'Getting ready',
      text: 'Silk drapes, jasmine strands, the last pin in place. The calm before the nadaswaram.',
      frames: 14,
      photo: { src: w('embrace-bangles'), tone: 1, alt: 'Getting ready' },
    },
    {
      title: 'The muhurtham',
      text: 'The thaali, the held breath, wet eyes and the small voice-cracks that say it all.',
      frames: 22,
      photo: { src: w('ritual-lamp'), tone: 4, alt: 'The muhurtham' },
    },
    {
      title: 'Golden hour',
      text: 'Ten unhurried minutes for just the two of you, in the best light of the day.',
      frames: 18,
      photo: { src: w('evening-foliage'), tone: 2, alt: 'Golden hour' },
    },
    {
      title: 'The reception',
      text: 'Blessings on stage, long lines of well-wishers, music and the sadhya — the loud and joyful middle of it all.',
      frames: 30,
      photo: { src: w('garland-pair'), tone: 7, alt: 'The reception' },
    },
    {
      title: 'The send-off',
      text: 'Tired feet, a last blessing from the elders and the quiet that comes after a perfect day.',
      frames: 12,
      photo: { src: w('misty-white'), tone: 5, alt: 'The send-off' },
    },
  ],
}

export const film = {
  eyebrow: 'The film',
  title: 'Motion keeps what a *photograph* cannot',
  text: 'The laugh, the voice that breaks, the nadaswaram your father insisted on. Our films are short, honest and scored with the sounds of your actual day.',
  poster: { src: w('sunset-trees'), tone: 3, alt: 'Wedding film still' },
  youtubeId: '', // e.g. 'dQw4w9WgXcQ' — leave empty until you have a film
}

export const sectionPhotos = {
  stats: { src: w('river-bridge'), tone: 7, alt: 'Golden light over a wedding field' },
  experience: { src: w('jasmine-bride'), tone: 1, alt: 'A couple sharing a quiet moment' },
  contact: { src: w('veranda-couple'), tone: 5, alt: 'A bride and groom laughing together' },
  stories: { src: w('park-couple'), tone: 6, alt: 'A bride in her veil at golden hour' },
  footer: { src: w('misty-white'), tone: 0, alt: 'A couple at sunset, wrapped in the light' },
}

export const experience = {
  eyebrow: 'The experience',
  title: 'From *hello* to your gallery',
  steps: [
    {
      title: 'Say hello',
      text: 'Tell us your muhurtham date and the feeling you want. We reply within a day with availability and an honest quote.',
    },
    {
      title: 'Plan it together',
      text: 'A relaxed call, in Tamil or English, to walk through your muhurtham timeline, your families and the rituals that matter most to you.',
    },
    {
      title: 'We show up quietly',
      text: 'Two shooters, no fuss. We work around your priest’s timings, guide only when you need it and stay out of the way when you do not.',
    },
    {
      title: 'Your private gallery',
      text: 'A beautiful online gallery for you and your family to view, favourite and download — in full resolution.',
    },
  ],
  cta: 'Open client gallery',
}

// SAMPLE words — replace with real, permissioned client testimonials
export const testimonials = [
  {
    quote:
      'They blended in so well that half our guests forgot there were photographers at all. The pictures feel like our day, not a photoshoot of it.',
    name: 'Meenakshi & Karthik',
    meta: 'Madurai, February 2026',
    photo: { src: w('thaali-garlands'), tone: 0, alt: 'Meenakshi and Karthik' },
  },
  {
    quote:
      'We hired them for the photographs and ended up with the only complete record of the last time our whole family was in one room.',
    name: 'Kavya & Arun',
    meta: 'Coimbatore, November 2025',
    photo: { src: w('embrace-bangles'), tone: 3, alt: 'Kavya and Arun' },
  },
  {
    quote:
      'Nobody told us to stand differently, nobody shouted. We just lived our wedding and somehow the pictures look like a film we are proud of.',
    name: 'Priya & Vignesh',
    meta: 'Chennai, August 2025',
    photo: { src: w('jasmine-bride'), tone: 5, alt: 'Priya and Vignesh' },
  },
]

export const latest = {
  eyebrow: 'Latest frames',
  note: 'Fresh from the last few weddings. New work goes up after every one.',
  items: [
    { src: w('garland-pair'), tone: 1, alt: 'Latest frame 1', caption: 'The mandap, before' },
    { src: w('embrace-bangles'), tone: 4, alt: 'Latest frame 2', caption: 'Hands, mehndi, rain' },
    { src: w('veranda-couple'), tone: 2, alt: 'Latest frame 3', caption: 'Mother and bride' },
    { src: w('thaali-closeup'), tone: 6, alt: 'Latest frame 4', caption: 'The first look' },
    { src: w('sunset-trees'), tone: 0, alt: 'Latest frame 5', caption: 'Last light' },
    { src: w('candid-laugh'), tone: 7, alt: 'Latest frame 6', caption: 'Dancing, finally' },
    { src: w('jasmine-bride'), tone: 3, alt: 'Latest frame 7', caption: 'Jasmine and silk' },
    { src: w('thaali-garlands'), tone: 5, alt: 'Latest frame 8', caption: 'The thaali, tied' },
    { src: w('ritual-lamp'), tone: 2, alt: 'Latest frame 9', caption: 'Blessings, all around' },
    { src: w('park-couple'), tone: 1, alt: 'Latest frame 10', caption: 'Under the oonjal' },
  ],
}

export const contact = {
  eyebrow: 'Say hello',
  title: 'Come and *say hello*',
  text: 'We take on a small number of weddings each season. Visit the studio, call, or message us on WhatsApp — we reply within a day, in Tamil or English.',
  hours: 'Mon – Sat · 10 am – 7 pm', // shown under "Visit us"; edit or leave '' to hide
  // What the map shows. Put your studio's full address here (or "Studio name, City") so the pin lands on it.
  mapQuery: 'Tamil Nadu, India',
  directions: 'Get directions',
  whatsapp: 'Message on WhatsApp',
  eventTypes: ['Wedding', 'Pre-wedding shoot', 'Engagement (Nichayathartham)', 'Reception', 'Wedding & film', 'Baby shower (Seemantham)', 'Something else'],
}

// About-us band that sits right under the hero.
// The photograph is /public/photos/about.jpg — until it exists, a sample photo shows in its place.
export const about = {
  eyebrow: 'About us',
  title: ['Capturing', 'Life’s Beautiful'], // one entry per line
  accent: 'Moments', // last line, set in gold
  text: 'We are a passionate photography team specializing in weddings, pre-weddings, portraits, and special events. Our goal is to turn your moments into timeless memories with creativity and care.',
  cta: 'Know More',
  ctaTarget: 'services', // id of the section the button scrolls to
  photo: { src: '/photos/about.jpg', tone: 1, alt: 'Our photographer framing a shot at golden hour' },
  stats: [
    { value: 21, suffix: '+', label: 'Projects Completed', icon: 'camera' as const },
    { value: 19, suffix: '+', label: 'Happy Clients', icon: 'users' as const },
    { value: 10, suffix: '+', label: 'Years of Experience', icon: 'calendar' as const },
  ],
}

// Our services — one card per entry. Photos reuse the shared wedding pool until you add your own.
// `icon` is one of: rings, camera, heart, calendar, film, smile.
export const services = {
  eyebrow: 'Our services',
  title: ['Capture', 'Life’s Most', 'Beautiful'], // one entry per line
  accent: 'Moments', // last line, set in gold italics
  text: 'From weddings to portraits, we bring your special moments to life with creativity and care.',
  button: 'Explore All Services',
  buttonTarget: 'work', // id of the section the button scrolls to
  cta: 'Enquire', // each card scrolls to the contact form
  items: [
    {
      title: 'Wedding Photography',
      tagline: 'Every ritual, every glance.',
      icon: 'rings' as const,
      photo: { src: w('ritual-lamp'), tone: 4, alt: 'A ritual lamp being lit at a wedding' },
    },
    {
      title: 'Pre-Wedding Shoot',
      tagline: 'Stories before forever.',
      icon: 'camera' as const,
      photo: { src: w('river-bridge'), tone: 5, alt: 'A couple on a bridge by the river' },
    },
    {
      title: 'Engagement Photography',
      tagline: 'The first yes, kept forever.',
      icon: 'heart' as const,
      photo: { src: w('garland-pair'), tone: 7, alt: 'A couple exchanging garlands' },
    },
    {
      title: 'Reception & Events',
      tagline: 'Relive your celebrations.',
      icon: 'calendar' as const,
      photo: { src: w('veranda-couple'), tone: 2, alt: 'A bride and groom laughing together' },
    },
    {
      title: 'Wedding Films',
      tagline: 'Moments that move.',
      icon: 'film' as const,
      photo: { src: w('sunset-trees'), tone: 3, alt: 'A couple under the trees at sunset' },
    },
    {
      title: 'Baby Showers & Portraits',
      tagline: 'Cherish the little moments.',
      icon: 'smile' as const,
      photo: { src: w('jasmine-bride'), tone: 1, alt: 'A woman wearing jasmine and silk' },
    },
  ],
}

// YouTube band, right after the services.
// Paste a YouTube link into `url` (watch, youtu.be, Shorts or embed links all work).
// The thumbnail is fetched from YouTube automatically, and clicking the card plays the video in place.
// While `url` is empty the card shows `photo` and nothing plays.
export const youtube = {
  eyebrow: 'YouTube',
  title: 'Watch the day', // first line
  accent: 'come alive.', // second line, set in italics
  button: 'Watch on YouTube', // opens the YouTube link in studio.social
  channelLabel: 'Open YouTube channel',
  videos: [
    {
      url: '', // e.g. 'https://www.youtube.com/watch?v=XXXXXXXXXXX'
      title: 'Meenakshi & Karthik',
      photo: { src: w('temple-sunset'), tone: 0, alt: 'Meenakshi and Karthik' },
    },
    {
      url: '',
      title: 'Kavya & Arun',
      photo: { src: w('candid-laugh'), tone: 3, alt: 'Kavya and Arun' },
    },
    {
      url: '',
      title: 'Priya & Vignesh',
      photo: { src: w('river-bridge'), tone: 5, alt: 'Priya and Vignesh' },
    },
    {
      url: '',
      title: 'Divya & Suresh',
      photo: { src: w('garland-pair'), tone: 1, alt: 'Divya and Suresh' },
    },
    {
      url: '',
      title: 'Anitha & Rajesh',
      photo: { src: w('veranda-couple'), tone: 2, alt: 'Anitha and Rajesh' },
    },
    {
      url: '',
      title: 'Lakshmi & Prakash',
      photo: { src: w('park-couple'), tone: 4, alt: 'Lakshmi and Prakash' },
    },
  ],
}

// FAQ — sits between the enquiry form and the footer. SAMPLE answers: replace with your real terms.
export const faq = {
  eyebrow: 'FAQs',
  title: ['Frequently Asked', 'Questions'], // one entry per line; the last line is set in garnet
  items: [
    {
      q: 'How far in advance should we book?',
      a: 'As early as you have your muhurtham date. We take on a small number of weddings each season, so popular dates fill up several months ahead. If your date is closer, write to us anyway — we will tell you honestly if we are free.',
    },
    {
      q: 'Do you travel outside Tamil Nadu?',
      a: 'Yes. We work across Tamil Nadu and travel for destination weddings anywhere in India and abroad. Travel and stay for the team are planned together with you and shared in your quote.',
    },
    {
      q: 'How many photographers will cover our wedding?',
      a: 'Two shooters, working around your muhurtham timings, so one is always with the ritual while the other catches the family, the guests and the moments in between.',
    },
    {
      q: 'When will we receive our photographs and film?',
      a: 'Your private online gallery is ready a few weeks after the wedding, with every photograph graded by hand. The wedding film follows after that. We will give you exact dates when you book.',
    },
    {
      q: 'Do we get the photographs in full resolution?',
      a: 'Yes. Every photograph in your gallery can be viewed, favourited and downloaded in full resolution by you and your family — ready for the album and for printing.',
    },
    {
      q: 'How do we confirm our booking?',
      a: 'Send us your date and the feeling you want through the form above. We reply within a day with availability and an honest quote, and your date is held once the agreement is signed and the advance is paid.',
    },
  ],
}

// Our work — a masonry wall of photographs with a category filter, shown before the experience steps.
// Each photo belongs to one `category` (it must match a name in `categories`); `ratio` is its width ÷ height,
// which sets the tile's shape. Click a photo to open it large. Replace the sample files with your own.
// "View all work" opens `allHref`, or the Instagram link in `studio.social` while it is empty.
export const work = {
  eyebrow: 'Our work',
  title: 'Photography Portfolio',
  button: 'View all work',
  allHref: '',
  allLabel: 'All',
  categories: ['Weddings', 'Pre-weddings', 'Engagements', 'Receptions', 'Candid moments', 'Portraits'],
  photos: [
    { category: 'Weddings', src: w('temple-sunset'), tone: 0, ratio: 1.5, alt: 'A wedding at sunset by the temple' },
    { category: 'Pre-weddings', src: w('river-bridge'), tone: 5, ratio: 1.5, alt: 'A couple on a bridge by the river' },
    { category: 'Weddings', src: w('thaali-garlands'), tone: 2, ratio: 0.67, alt: 'Garlands and the thaali' },
    { category: 'Engagements', src: w('garland-pair'), tone: 6, ratio: 0.55, alt: 'A couple exchanging garlands' },
    { category: 'Candid moments', src: w('candid-laugh'), tone: 3, ratio: 1.5, alt: 'A candid laugh between a couple' },
    { category: 'Portraits', src: w('jasmine-bride'), tone: 1, ratio: 0.79, alt: 'A bride wearing jasmine' },
    { category: 'Weddings', src: w('ritual-lamp'), tone: 0, ratio: 0.75, alt: 'A ritual lamp being lit' },
    { category: 'Receptions', src: w('veranda-couple'), tone: 2, ratio: 1.5, alt: 'A bride and groom laughing together' },
    { category: 'Pre-weddings', src: w('sunset-trees'), tone: 4, ratio: 1.34, alt: 'A couple among trees at sunset' },
    { category: 'Candid moments', src: w('embrace-bangles'), tone: 5, ratio: 0.67, alt: 'An embrace, bangles catching the light' },
    { category: 'Engagements', src: w('park-couple'), tone: 6, ratio: 1.5, alt: 'An engagement portrait in a park' },
    { category: 'Weddings', src: w('thaali-closeup'), tone: 7, ratio: 0.8, alt: 'A close-up of the thaali' },
    { category: 'Pre-weddings', src: w('evening-foliage'), tone: 4, ratio: 1.5, alt: 'A couple in evening foliage' },
    { category: 'Portraits', src: w('misty-white'), tone: 6, ratio: 1.78, alt: 'A portrait in soft misty light' },
  ],
}

// Footer call-to-action row (the line above the footer columns).
export const footerCta = {
  title: 'Let’s tell your *love story*',
  text: 'Share your date and the feeling you want. We reply within a day — in Tamil or English.',
  button: 'Start a conversation',
}

// Footer: the three highlights under the logo and the legal links on the bottom line.
// Point each legal `href` at your own page; '#' keeps the link inert until you have one.
export const footerInfo = {
  // Right-hand link columns. `id` is the section the link scrolls to; 'Services' lists the titles in `services.items`.
  support: {
    title: 'Support',
    links: [
      { label: 'Contact us', id: 'contact' },
      { label: 'Client gallery', id: '' }, // opens studio.clientGalleryUrl
    ],
  },
  legal: [
    { label: 'Terms & Conditions', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Disclosures', href: '#' },
  ],
}

// Heading above the testimonials carousel (wrap a word in *asterisks* to set it in gold italics).
export const testimonialsIntro = {
  eyebrow: 'Testimonials',
  title: 'What our couples are *saying*',
}

