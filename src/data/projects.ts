export type Project = {
  slug: string;
  name: string;
  code: string; // e.g. "07.25"
  scope: string;
  timeline: string;
  year: string;
  description: string;
  challenge: string;
  cover: string;
  logo: string;
  gallery: string[];
  url?: string;
};

export const projects: Project[] = [
  {
    slug: "crawlnow",
    name: "CRAWLNOW",
    code: "06.21",
    scope: "Branding, Dashboard Design",
    timeline: "3-5 months",
    year: "06.21",
    description:
      "CrawlNow turns messy web data into something a buyer can actually trust and pay for. We designed the buyer dashboard at the heart of the product — a place to preview scraped datasets before committing, then unlock and purchase the full set the moment it looks right.",
    challenge:
      "Selling data is selling trust — buyers won't pay until they believe the sample reflects the whole set, and every extra click before checkout is a chance for them to walk away. The dashboard had to make previewing feel generous and transparent while still making the full dataset feel worth paying for, and turn 'looks good' into a completed payment in as few steps as possible.",
    cover: "/projects/crawlnow/cover.png",
    logo: "/projects/crawlnow/logo.png",
    gallery: [
      "/projects/crawlnow/gallery-1.png",
      "/projects/crawlnow/gallery-2.png",
      "/projects/crawlnow/gallery-3.png",
    ],
    url: "https://www.crawlnow.com/",
  },
  {
    slug: "repnations",
    name: "REPNATIONS",
    code: "11.26",
    scope: "Branding, E-commerce",
    timeline: "6 weeks",
    year: "11.26",
    description:
      "Repnations makes elevated activewear for everyday motion — technical, comfortable pieces built for gym sessions and everything after. We partnered with the Repnations team to build a brand and storefront that feel as premium and performance-driven as the gear itself.",
    challenge:
      "Activewear is one of the most saturated categories in e-commerce, and most of it looks interchangeable. Repnations needed an identity and shopping experience sharp enough to stand out in a crowded feed, while staying fast and frictionless enough to actually convert browsers into buyers.",
    cover: "/projects/repnations/cover.png",
    logo: "/projects/repnations/logo.png",
    gallery: [
      "/projects/repnations/gallery-1.png",
      "/projects/repnations/gallery-2.png",
      "/projects/repnations/gallery-3.png",
    ],
    url: "https://repnations.com/",
  },
  {
    slug: "checkmystaff",
    name: "CHECKMYSTAFF",
    code: "10.26",
    scope: "Branding, App Design",
    timeline: "7 weeks",
    year: "10.26",
    description:
      "CheckMyStaff helps households and small businesses verify domestic staff before they let them through the door — trusted nannies, cooks, and security guards, backed by real employment history instead of a gut feeling. We partnered with the CheckMyPeople team to turn a sensitive vetting process into an app that feels reassuring instead of invasive.",
    challenge:
      "Background verification is a trust-first category — the product has to feel secure and credible from the very first screen, or people won't hand over the personal details it needs to work. The challenge was designing an identity and interface calm enough for a worried parent, yet structured enough for an employer managing dozens of staff records at once.",
    cover: "/projects/checkmystaff/cover.png",
    logo: "/projects/checkmystaff/logo.png",
    gallery: [
      "/projects/checkmystaff/gallery-1.png",
      "/projects/checkmystaff/gallery-2.png",
      "/projects/checkmystaff/gallery-3.png",
    ],
    url: "https://play.google.com/store/apps/details?id=ng.checkmystaff&pcampaignid=web_share",
  },
  {
    slug: "solar-energies",
    name: "SOLAR ENERGIES",
    code: "09.26",
    scope: "Branding, Web Design",
    timeline: "5 weeks",
    year: "09.26",
    description:
      "Solar Energies is on a mission to make clean power feel effortless — from rooftop panels to home battery storage and EV charging. We partnered with the solar-energies.netlify.app team to build a brand and website that make a fully connected energy system feel simple, modern, and trustworthy.",
    challenge:
      "Home energy systems are inherently complex — panels, inverters, batteries, chargers, and the grid all working together — and Solar Energies' old presence buried that complexity instead of simplifying it. The brand needed to make an intricate, technical product feel calm, clean, and immediately understandable at a glance.",
    cover: "/projects/solar-energies/cover.png",
    logo: "/projects/solar-energies/logo.png",
    gallery: [
      "/projects/solar-energies/gallery-1.png",
      "/projects/solar-energies/gallery-2.png",
      "/projects/solar-energies/gallery-3.png",
    ],
    url: "https://solar-energies.netlify.app/",
  },
  {
    slug: "emerald",
    name: "EMERALD",
    code: "08.26",
    scope: "Branding, Web Design",
    timeline: "6 weeks",
    year: "08.26",
    description:
      "Emerald Compounding Pharmacy needed more than a logo — they needed a brand that felt as precise and trustworthy as the medications they prepare. We partnered with the emeraldsrx.com team to build an identity and website that puts patient care front and center, from the wordmark down to the label on every bottle.",
    challenge:
      "Compounding pharmacy is a highly technical, trust-driven field, and Emerald's old presence read more like a lab supplier than a healthcare partner. Patients and prescribing physicians needed to feel confident at a glance, so the brand had to communicate precision and warmth in equal measure — never clinical and cold, never soft and vague.",
    cover: "/projects/emerald/cover.png",
    logo: "/projects/emerald/logo.png",
    gallery: [
      "/projects/emerald/gallery-1.png",
      "/projects/emerald/gallery-2.png",
      "/projects/emerald/gallery-3.png",
    ],
    url: "https://emeraldsrx.com/",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function moreProjects(slug: string) {
  return projects.filter((p) => p.slug !== slug);
}
