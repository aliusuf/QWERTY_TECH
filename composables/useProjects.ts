export interface Project {
  slug: string
  name: string
  client: string
  date: string
  timeline: string
  tags: string[]
  /** one-line teaser, used on the Work reel */
  desc: string
  /** longer paragraph, used on the case page */
  summary: string
  liveUrl: string
  liveLabel: string
  /** Project assets served from public/projects/<slug>. */
  cover: string
  logo: string
  gallery: string[]
  /** tints the scrim over the cover image on the case page */
  accent: string
}

/**
 * Qwerty Teck's five selected-work projects. Shared between WorkSection
 * (the glass-tube reel) and the /work/[slug] case pages, so copy only lives
 * in one place.
 */
const PROJECTS: Project[] = [
  {
    slug: 'crawlnow',
    name: 'CrawlNow',
    client: 'CrawlNow',
    date: '06.21',
    timeline: '3–5 months',
    tags: ['Branding', 'Dashboard Design'],
    desc: 'A buyer-facing dashboard that makes scraped web data feel worth paying for.',
    summary:
      'CrawlNow needed to sell trust, not just data. We designed a dashboard that gives buyers a generous preview of each dataset while keeping the full set worth the purchase — shortening the path from first look to checkout so quality sells itself.',
    liveUrl: 'https://www.crawlnow.com/',
    liveLabel: 'View website',
    accent: '#4fc3ff'
  },
  {
    slug: 'repnations',
    name: 'REPNATIONS',
    client: 'REPNATIONS',
    date: '11.26',
    timeline: '6 weeks',
    tags: ['Branding', 'E-commerce'],
    desc: 'Brand identity and storefront for activewear built for the gym and everything after.',
    summary:
      'The activewear category is crowded with near-identical brands. We built an identity and e-commerce experience sharp enough to stand out in a feed, fast enough to convert browsers into buyers, and premium enough to match the product on the rack.',
    liveUrl: 'https://repnations.com/',
    liveLabel: 'View website',
    accent: '#ff4d5e'
  },
  {
    slug: 'checkmystaff',
    name: 'CheckMyStaff',
    client: 'CheckMyPeople',
    date: '10.26',
    timeline: '7 weeks',
    tags: ['Branding', 'App Design'],
    desc: 'A verification app that helps households vet domestic staff against real employment history.',
    summary:
      'Background checks live or die on trust. We designed an interface that feels secure and credible from the very first screen for a worried household, while staying structured enough for an employer managing dozens of staff records — turning a sensitive process into a reassuring one.',
    liveUrl: 'https://play.google.com/store/apps/details?id=ng.checkmystaff&pcampaignid=web_share',
    liveLabel: 'Get the app',
    accent: '#2dd4bf'
  },
  {
    slug: 'solar-energies',
    name: 'Solar Energies',
    client: 'Solar Energies',
    date: '09.26',
    timeline: '5 weeks',
    tags: ['Branding', 'Web Design'],
    desc: 'A calm, trustworthy identity for a fully connected home energy system.',
    summary:
      'Panels, batteries, inverters, chargers, grid — a lot of moving parts to explain without overwhelming a homeowner. We built a modern visual identity that makes an intricate technical product feel immediately understandable, so clean power reads as effortless, not complicated.',
    liveUrl: 'https://solar-energies.netlify.app',
    liveLabel: 'View website',
    accent: '#ffb020'
  },
  {
    slug: 'emerald',
    name: 'Emerald',
    client: 'Emerald Compounding Pharmacy',
    date: '08.26',
    timeline: '6 weeks',
    tags: ['Branding', 'Web Design'],
    desc: 'A precise, warm brand system for a compounding pharmacy patients can trust.',
    summary:
      'The old identity read like a lab supplier, not a healthcare partner. We built a wordmark and visual language — carried through to packaging and labels — that balances clinical precision with real warmth, giving patients and prescribing physicians confidence at a glance.',
    liveUrl: 'https://emeraldsrx.com',
    liveLabel: 'View website',
    accent: '#12b76a'
  }
].map((project) => ({
  ...project,
  cover: `/projects/${project.slug}/cover.png`,
  logo: `/projects/${project.slug}/logo.png`,
  gallery: [1, 2, 3].map((index) => `/projects/${project.slug}/gallery-${index}.png`)
}))

export const useProjects = () => PROJECTS
export const useProject = (slug: string) => PROJECTS.find((p) => p.slug === slug)
