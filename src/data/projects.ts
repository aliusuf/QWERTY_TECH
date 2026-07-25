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

const CDN = "https://cdn.prod.website-files.com/6904c82b580f53df25dddd39";

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
  {
    slug: "lunar",
    name: "LUNAR+",
    code: "10.25",
    scope: "Branding, UI",
    timeline: "4 weeks",
    year: "10.25",
    description:
      "Lunar is a vintage marketplace with a passion for unique, character-rich pieces. As their audience evolved, they needed a brand and digital presence that felt fresh, expressive, and culturally relevant. We partnered with Flea to reimagine their identity and craft a bold, story-driven website experience.",
    challenge:
      "Lunar needed to reposition its brand for a younger, style-conscious audience while keeping its roots in vintage culture. Their existing digital presence felt outdated and lacked a cohesive identity, making it hard to connect with modern shoppers seeking character-driven, curated finds.",
    cover: `${CDN}/6904ca4ca4adf17196559072_6901774535a5cf76233a6506_work-img-02.png`,
    logo: `${CDN}/6904ca4ba4adf1719655900a_6901774d9cabe38dd2ff62fd_project-logo-02.svg`,
    gallery: [
      `${CDN}/6904ca4ba4adf17196559017_6901776ee95ca441c771677c_project-02-img-01.jpeg`,
      `${CDN}/6904ca4ba4adf17196559014_690177716a7cdeb8453a7dbf_project-02-img-02.jpeg`,
      `${CDN}/6904ca4ba4adf17196559011_690177799eebe45594ff1164_project-02-img-03.jpeg`,
    ],
  },
  {
    slug: "kroma",
    name: "KROMA",
    code: "11.25",
    scope: "Branding",
    timeline: "8 weeks",
    year: "11.25",
    description:
      "Kroma is a lifestyle brand rooted in simplicity, nature, and mindful living. As they prepared to launch a new product line, they needed a brand presence that captured their calm, thoughtful aesthetic while offering a seamless, elevated online shopping experience.",
    challenge:
      "Kroma struggled to translate their serene, nature-inspired philosophy into a digital format. Their visuals lacked cohesion, and their online store felt generic, missing the emotional connection needed to resonate with their audience of design-conscious, wellness-focused customers.",
    cover: `${CDN}/6904ca4b2b1320593dc9e4d1_690177ba10025b70db0d6d30_work-img-03.png`,
    logo: `${CDN}/6904ca4b2b1320593dc9e4a2_690177bf5c476de2c9c9552b_project-logo-03.svg`,
    gallery: [
      `${CDN}/6904ca4b2b1320593dc9e4a8_690177e103b66de5fc340e86_project-03-img-01.jpeg`,
      `${CDN}/6904ca4b2b1320593dc9e4b1_690177e67470a271501f453f_project-03-img-02.jpeg`,
      `${CDN}/6904ca4b2b1320593dc9e4ab_690177e947fad0c633883f46_project-03-img-03.jpeg`,
    ],
  },
  {
    slug: "asterisk",
    name: "ASTERISK",
    code: "09.25",
    scope: "Branding",
    timeline: "8 weeks",
    year: "09.25",
    description:
      "Asterisk is a bold, creative studio known for playful visuals and unconventional design. As their client list grew, they needed a fresh digital identity that reflected their fearless personality while staying functional and easy for potential collaborators to navigate.",
    challenge:
      "Asterisk existing website felt static and didn't capture the studio's energetic, experimental spirit. The experience lacked character and clarity, making it difficult for new clients to get a true sense of the brand's creative range and distinctive voice.",
    cover: `${CDN}/6904ca4a99faa842ab31693e_6901789734dbd19d6b26d056_work-img-04-min.png`,
    logo: `${CDN}/6904ca4a99faa842ab316931_690178a305fe2b9637d0092b_project-logo-04.svg`,
    gallery: [
      `${CDN}/6904ca4a99faa842ab316935_690178c7ab9b5c913e33dff7_project-04-img-01.jpeg`,
      `${CDN}/6904ca4a99faa842ab31693a_690178cc386d94f7c3ed2d48_project-04-img-02.jpeg`,
      `${CDN}/6904ca4a99faa842ab31692b_690178d1ca0cc2d7afa77eaa_project-04-img-03.jpeg`,
    ],
  },
  {
    slug: "zypher",
    name: "ZYPHER®",
    code: "02.25",
    scope: "Branding, Motion",
    timeline: "9 weeks",
    year: "02.25",
    description:
      "Zypher is a social-first creative agency built around bold ideas, fast culture, and playful storytelling. They came to us for a brand and web refresh that better reflected their upbeat energy, creative range, and knack for turning everyday moments into viral campaigns.",
    challenge:
      "Zypher's old identity felt flat and corporate, failing to capture the vibrant, high-energy personality that made their work stand out. Their digital presence lacked the spark and spontaneity their audience expected from a brand rooted in social-first creativity.",
    cover: `${CDN}/6904ca557a8df77a9fe574c2_6901790cde836ea0e03ecd59_work-img-05.jpeg`,
    logo: `${CDN}/6904ca557a8df77a9fe574c7_6901791401e06a473a87a2e3_project-logo-05.svg`,
    gallery: [
      `${CDN}/6904ca557a8df77a9fe574e5_690179338ccbebcd5454a18c_project-05-img-01.jpeg`,
      `${CDN}/6904ca557a8df77a9fe574cf_690179372769a2ee6b954a07_project-05-img-02.jpeg`,
      `${CDN}/6904ca557a8df77a9fe574e9_6901793c123ed96c70e0df32_project-05-img-03.jpeg`,
    ],
  },
  {
    slug: "grotesks",
    name: "GROTESKS",
    code: "08.25",
    scope: "Branding",
    timeline: "12 weeks",
    year: "08.25",
    description:
      "Grotesks is a template studio for Framer creators, offering clean, modern website templates built for speed and style. As their collection grew, they needed a brand and site refresh that showcased their products clearly while reflecting the creativity of their growing community.",
    challenge:
      "Grotesks existing site felt too product-heavy and lacked the personality and simplicity needed to stand out in a crowded template market. Visitors struggled to quickly grasp the value of the templates or browse collections in a way that felt easy, inspiring, and intuitive.",
    cover: `${CDN}/6904ca4b159ccfd461550b0b_6901796b0e65557d99a9ba1d_work-img-06.jpeg`,
    logo: `${CDN}/6904ca4b159ccfd461550b03_690179746a151dfa2ea8e92e_project-logo-06.svg`,
    gallery: [
      `${CDN}/6904ca4b159ccfd461550b21_690179a8f0b50c0a5af56df6_project-06-img-01.jpeg`,
      `${CDN}/6904ca4b159ccfd461550b1e_690179ad1d9fbbbf84b48c6c_project-06-img-02.jpeg`,
      `${CDN}/6904ca4b159ccfd461550b11_690179b31ca987a4d4d19b1c_project-06-img-03.jpeg`,
    ],
  },
  {
    slug: "clonify",
    name: "CLONIFY",
    code: "01.25",
    scope: "Branding",
    timeline: "8 weeks",
    year: "01.25",
    description:
      "Clonify is a boutique creative agency specializing in playful branding and personality-packed campaigns. Known for their cheeky tone and bold visuals, they needed a brand and website refresh that captured their humor and heart while staying sharp and professional.",
    challenge:
      "Clonify's digital presence didn't reflect the bold, mischievous spirit behind their work. Their website felt overly polished and lacked the playful character that set them apart, making it hard for potential clients to grasp their unique, personality-driven approach.",
    cover: `${CDN}/6904ca4a1f2af175b2af8f86_69017a78cdbf28374329a6eb_work-img-07.jpeg`,
    logo: `${CDN}/6904ca4b1f2af175b2af8f8e_69017a83125c2a02e489c5c0_project-logo-07.svg`,
    gallery: [
      `${CDN}/6904ca4a1f2af175b2af8f82_69017aa2e1f9fb195e7e6b01_project-07-img-01.jpeg`,
      `${CDN}/6904ca4a1f2af175b2af8f8a_69017aa665ad9c54b842dca6_project-07-img-02.jpeg`,
      `${CDN}/6904ca4b1f2af175b2af8f9a_69017aab42533be96bc9e2c7_project-07-img-03.jpeg`,
    ],
  },
  {
    slug: "blob",
    name: "BLOB®",
    code: "12.25",
    scope: "Motion, 3D",
    timeline: "2 weeks",
    year: "12.25",
    description:
      "Blob is an interactive polling platform designed to spark conversations and gather opinions in real time. As they prepared to expand their audience, they needed a brand and digital experience that felt approachable, fun, and effortlessly easy to use.",
    challenge:
      "Blob's early brand lacked a clear personality, and its interface felt overly technical, making it difficult to attract casual users and community-driven brands. They needed a way to simplify the experience while injecting warmth, character, and a sense of playful interaction.",
    cover: `${CDN}/6904ca4b05c394c25553b55f_69017add28642bdda38f5714_work-img-08.png`,
    logo: `${CDN}/6904ca4b05c394c25553b57e_69017ae26b4f8ee02740b62b_project-logo-08.svg`,
    gallery: [
      `${CDN}/6904ca4b05c394c25553b56c_69017b122b56228285a98be3_project-08-img-01.jpeg`,
      `${CDN}/6904ca4b05c394c25553b571_69017b1620e17386c911f4f2_project-08-img-02.jpeg`,
      `${CDN}/6904ca4b05c394c25553b566_69017b1b6bf09e071d8e10ab_project-08-img-03.jpeg`,
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function moreProjects(slug: string) {
  const idx = projects.findIndex((p) => p.slug === slug);
  const rest = projects.filter((p) => p.slug !== slug);
  const start = idx % rest.length;
  return [rest[start % rest.length], rest[(start + 1) % rest.length]];
}
