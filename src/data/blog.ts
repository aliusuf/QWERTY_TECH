export type Post = {
  slug: string;
  title: string;
  date: string;
  cover: string;
  paragraphs: string[];
};

const CDN = "https://cdn.prod.website-files.com/6904c82b580f53df25dddd39";

export const posts: Post[] = [
  {
    slug: "strategy-before-aesthetics-why-the-prettiest-brand-still-loses",
    title:
      "Strategy before aesthetics: why the prettiest brand in the room still loses.",
    date: "May 16, 2025",
    cover: `${CDN}/6904fc52b72b8840e4b41817_blog-img-01.png`,
    paragraphs: [
      "It's easy to get caught up in the excitement of beautiful colors, sleek typography, and clever layouts when starting a design project. Visuals grab attention and leave an immediate impression, but without a solid strategy behind them, even the most stunning designs can fall flat.",
      "We've seen it happen: a gorgeous brand identity that photographs beautifully on a portfolio site but does nothing to move the business forward. It wins the room and loses the market — because a brief that starts with 'make it look good' skips the only question that actually matters. Who is this for, and what do we need them to believe by the time they leave?",
      "When strategy comes first, design decisions are guided by clear goals. Who is this for? What problem are we solving? How should people feel and act when they land on this page? These questions shape everything from the tone of your messaging to the structure of your layout.",
      "Aesthetic trends come and go, but strategy gives your brand consistency and focus. It ensures that every visual choice aligns with your audience's needs and your business objectives — and it's the difference between a brand that turns heads for a season and one that compounds in value for years.",
      "So before you pick a font, a palette, or a layout, start with a strategy. Because when design is built on strategy, it doesn't just look great — it works. That's the whole job.",
    ],
  },
  {
    slug: "what-good-branding-actually-is-and-what-it-isnt",
    title: "What good branding actually is (and what it isn't).",
    date: "May 17, 2025",
    cover: `${CDN}/6904f9919192486ae12487df_blog-img-07.png`,
    paragraphs: [
      "When people think of branding, the first thing that usually comes to mind is a logo. It's the face of a company, the mark you remember, and often the first thing a customer associates with a business. But strong branding goes far beyond a clever symbol or a clean wordmark.",
      "A logo might catch someone's eye, but it's the full brand experience that keeps them coming back. From the tone of your messaging to the colors you use, the way your website feels, and how your brand shows up on social media — every detail works together to tell one consistent story.",
      "What a brand actually needs is a foundation: a clear point of view on who you are, what you stand for, and how you want to be perceived. That includes your voice, your positioning, your values, and your personality — the things a competitor can't simply copy by hiring the same designer.",
      "Good branding also means consistency. Every touchpoint — your website, a social post, a proposal document, packaging — should feel like it belongs to the same story. A beautiful logo without a system behind it is a book cover with no story inside.",
      "So if you're thinking about investing in branding, look past the logo. Focus on building the story, the voice, and the experience people will remember — the logo is just where that story happens to start.",
    ],
  },
  {
    slug: "building-a-brand-for-dubai",
    title:
      "Building a brand for Dubai: standing out in the most competitive market in the region.",
    date: "May 18, 2025",
    cover: `${CDN}/6904f89c4b2952de2bd178ab_blog-img-02.png`,
    paragraphs: [
      "Dubai doesn't have a shortage of ambition — it has a surplus of it. Every industry here, from hospitality to healthcare to fintech, is crowded with founders who moved fast, raised well, and built something real. Which means the bar for 'looks credible' is set higher here than almost anywhere else in the region.",
      "That's the real challenge of branding in this market: it's not enough to look polished. Polished is the baseline. What separates the brands that get remembered from the ones that get scrolled past is a point of view — a reason to exist that's more specific than 'premium' or 'world-class,' words that have been drained of meaning by overuse.",
      "The brands that win here tend to do one thing well: they know exactly who they're for, and they say no to everyone else. A clinic, a developer, a hospitality group — the ones with staying power aren't trying to appeal to everyone in a city of nine million people. They're building something a specific person feels was made for them.",
      "Working across a market this international also means designing for range without losing coherence — a brand has to read clearly whether it's on a billboard on Sheikh Zayed Road or a phone screen in London. That tension, between local specificity and global polish, is exactly where we like to work.",
      "If you're building a brand in Dubai, the question isn't whether you can look good — everyone here can. It's whether you can look like nobody else. That's the part strategy has to solve before design ever gets involved.",
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function adjacentPosts(slug: string) {
  const idx = posts.findIndex((p) => p.slug === slug);
  const prev = posts[(idx - 1 + posts.length) % posts.length];
  const next = posts[(idx + 1) % posts.length];
  return { prev, next };
}
