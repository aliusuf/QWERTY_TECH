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
