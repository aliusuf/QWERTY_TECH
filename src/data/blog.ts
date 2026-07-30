export type BlogElement =
  | { kind: "paragraph"; text: string }
  | { kind: "checklist"; items: string[] }
  | { kind: "table"; headers: string[]; rows: string[][] }
  | { kind: "pullquote"; text: string }
  | {
      kind: "cta";
      heading: string;
      body: string;
      primaryLabel: string;
      primaryHref: string;
      secondaryLabel?: string;
      secondaryHref?: string;
    };

export type BlogSection = {
  id: string;
  tag?: string;
  heading: string;
  elements: BlogElement[];
};

export type BlogArticle = {
  lede: string;
  toc: { id: string; label: string }[];
  sections: BlogSection[];
  faq: { q: string; a: string }[];
  tags: string[];
};

export type Post = {
  slug: string;
  title: string;
  date: string;
  cover: string;
  description?: string;
  paragraphs?: string[];
  article?: BlogArticle;
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
    title: "4 Things Every Strong Brand Needs Beyond a Logo",
    date: "May 17, 2025",
    cover: `${CDN}/6904f9919192486ae12487df_blog-img-07.png`,
    description:
      "A logo isn't a brand. Here are the 4 things every strong brand foundation actually needs, how to spot the gaps in yours, and why consistency across every touchpoint is what builds recognition.",
    article: {
      lede: "Most founders think branding ends at the logo. It doesn't even start there. A logo is a mark; a brand is everything a customer feels before, during, and after they see it — and mixing the two up is the fastest way to spend money on design that never turns into recognition.",
      toc: [
        { id: "what-is-branding", label: "What branding actually means" },
        { id: "foundation", label: "The four parts of a brand foundation" },
        { id: "logo-vs-brand", label: "Logo vs. brand: a side-by-side" },
        { id: "signs", label: "Signs your brand needs more than a logo" },
        { id: "consistency", label: "Why consistency is the real growth lever" },
        { id: "process", label: "How a brand foundation actually gets built" },
        { id: "faq", label: "FAQ" },
      ],
      sections: [
        {
          id: "what-is-branding",
          heading: "What Branding Actually Means (It's Not the Logo)",
          elements: [
            {
              kind: "paragraph",
              text: "When people say \"I need branding,\" what they usually mean is \"I need a logo.\" It's an easy mistake — a logo is the part you can point to. But a logo is only the signature at the bottom of a much longer letter. The letter itself is your [brand strategy](/): the voice, the values, the visual system, and the experience someone has at every single touchpoint.",
            },
            {
              kind: "paragraph",
              text: "Think of it this way: a logo can get someone to click. Only the brand behind it gets them to stay, trust you with their money, and come back. That distinction is the entire reason branding projects that stop at \"make us a logo\" tend to underperform — there's no foundation holding the mark up.",
            },
          ],
        },
        {
          id: "foundation",
          tag: "(01) The Foundation",
          heading: "The Four Parts of a Real Brand Foundation",
          elements: [
            {
              kind: "paragraph",
              text: "Before any visual work starts, a brand needs to answer four questions. Skip these, and even a beautiful logo will feel hollow.",
            },
            {
              kind: "checklist",
              items: [
                "**Positioning** — What do you do, for whom, and why you and not the ten competitors doing something similar?",
                "**Voice** — How do you sound in a caption, an email subject line, or a customer complaint reply? Consistency here is what makes a [brand voice](/blog) recognizable without a logo in sight.",
                "**Values** — What will you never compromise on, even when it costs you a sale?",
                "**Personality** — If your brand walked into a room, how would it behave? Loud and playful, or quiet and precise?",
              ],
            },
            {
              kind: "paragraph",
              text: "Only once these are locked does the visual system — logo, color, type, imagery — have something real to express. This is also why a [signature visual language](/blog) only works when it's translating a decision that's already been made, not inventing one on the fly.",
            },
          ],
        },
        {
          id: "logo-vs-brand",
          tag: "(02) Comparison",
          heading: "Logo vs. Brand: What Each One Actually Does",
          elements: [
            {
              kind: "table",
              headers: ["Question", "A Logo Answers", "A Brand Answers"],
              rows: [
                ["First impression", "What do you look like?", "What do you stand for?"],
                ["Consistency", "Same mark, every file", "Same feeling, every touchpoint"],
                ["Customer trust", "Recognition", "Loyalty"],
                ["Lifespan", "Redesigned every few years", "Evolves, rarely restarts"],
                ["Built by", "A designer, in weeks", "Strategy + design, over months"],
              ],
            },
          ],
        },
        {
          id: "signs",
          tag: "(03) Diagnosis",
          heading: "5 Signs Your Brand Needs More Than a Logo Refresh",
          elements: [
            {
              kind: "paragraph",
              text: "If any of these sound familiar, the fix usually isn't a new logo — it's a brand foundation you never actually built:",
            },
            {
              kind: "checklist",
              items: [
                "Your team describes the company differently depending on who's asked",
                "Your social media, website, and pitch deck all feel like three different companies",
                "You've redesigned the logo twice in two years, hoping it would \"fix\" something",
                "Customers can't explain why they chose you over a competitor",
                "Your content calendar has no consistent voice or point of view",
              ],
            },
            {
              kind: "pullquote",
              text: "A beautiful logo without a strong brand system behind it is a book cover without a story inside.",
            },
          ],
        },
        {
          id: "consistency",
          tag: "(04) The Multiplier",
          heading: "Why Brand Consistency Is the Real Growth Lever",
          elements: [
            {
              kind: "paragraph",
              text: "Consistency doesn't mean boring. It means your website, your Instagram captions, your packaging, and the way your sales team talks on a call all sound like the same entity. Every one of those is a touchpoint, and every touchpoint is either building recognition or quietly eroding it.",
            },
            {
              kind: "paragraph",
              text: "This is where most DIY branding falls apart — not in the visuals, but in the follow-through. A studio that treats [brand systems](/) as the actual deliverable (not the logo file) is building something that compounds. Check [our recent work](/projects) to see how that plays out across different industries.",
            },
          ],
        },
        {
          id: "process",
          tag: "(05) Our Approach",
          heading: "How QWERTY TECK Builds a Brand Foundation",
          elements: [
            {
              kind: "paragraph",
              text: "Our process starts before a single pixel is placed:",
            },
            {
              kind: "checklist",
              items: [
                "Discovery — positioning, audience, and competitive landscape",
                "Voice & values workshop — turning \"how we feel\" into written guidelines",
                "Visual system — logo, color, type, and imagery built to express what's already decided",
                "Touchpoint rollout — website, social, and content, so everything launches in sync",
              ],
            },
            {
              kind: "cta",
              heading: "Ready to build a brand that holds up past the logo?",
              body: "Let's talk through where your brand stands today — and what it actually needs next.",
              primaryLabel: "Get in Touch",
              primaryHref: "/contact",
              secondaryLabel: "See Our Work",
              secondaryHref: "/projects",
            },
          ],
        },
      ],
      faq: [
        {
          q: "Is a logo the same thing as a brand?",
          a: "No. A logo is one visual asset — a brand is the full system of positioning, voice, values, and visuals that the logo represents. You can have a great logo and a weak brand, or a strong brand with a simple mark.",
        },
        {
          q: "How long does building a brand foundation take?",
          a: "A proper foundation — positioning, voice, and visual system — typically takes several weeks of discovery and workshops before design work begins, longer than a standalone logo project because it involves more stakeholders and decisions.",
        },
        {
          q: "Do I need a full rebrand, or just better consistency?",
          a: "Often it's the latter. Many brands already have the right pieces — they're just applied inconsistently across the website, social, and sales materials. A brand audit usually reveals which one you actually need.",
        },
        {
          q: "What's the first step if I think my branding is inconsistent?",
          a: "Start by auditing every touchpoint — website, social bios, email signatures, pitch decks — against a single question: would a stranger know these all belong to the same company? Gaps there point to where the foundation is missing.",
        },
      ],
      tags: ["Branding", "Brand Strategy", "Visual Identity", "Brand Voice"],
    },
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
