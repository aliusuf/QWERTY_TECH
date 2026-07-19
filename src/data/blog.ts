export type Post = {
  slug: string;
  title: string;
  date: string;
  cover: string;
  paragraphs: string[];
};

const CDN = "https://cdn.prod.website-files.com/6904c82b580f53df25dddd39";

const strategyBody = [
  "It's easy to get caught up in the excitement of beautiful colors, sleek typography, and clever layouts when starting a design project. Visuals grab attention and leave an immediate impression, but without a solid strategy behind them, even the most stunning designs can fall flat. Great design isn't just about looking good — it's about working well, telling the right story, and achieving a purpose.",
  "When strategy comes first, design decisions are guided by clear goals. Who is this for? What problem are we solving? How should people feel and act when they land on this page? These questions shape everything from the tone of your messaging to the structure of your layout. A site without strategy might win style points, but it won't convert visitors, build trust, or leave a lasting impact.",
  "Aesthetic trends come and go, but strategy gives your brand consistency and focus. It ensures that every visual choice aligns with your audience's needs and your business objectives. It helps prioritize what matters most on a page and where your user's attention should land first. Without it, designs risk becoming superficial — all show, no substance.",
  "The truth is, the most memorable brands aren't just the ones that look good. They're the ones that feel intentional, clear, and connected to their audience's world. Strategy ensures your visuals serve a deeper purpose, turning passing attention into meaningful interaction. So before you pick a font, palette, or layout, start with a strategy. Because when design is built on strategy, it doesn't just look great — it works.",
  "Some of the most memorable projects we've worked on weren't the ones that followed the original plan to the letter. They were the ones where a conversation took a surprising turn or a challenge forced us to think differently. A technical limitation might lead to a creative workaround that turns into a standout feature. A spontaneous decision to break a rule could reveal a more authentic and bold design direction.",
  "At our studio, we believe in leaving room for these moments. While strategy and consistency are essential, the real magic often reveals itself in the unexpected — in the ideas we almost dismissed, the mistakes that turned into breakthroughs, and the quiet moments of curiosity that spark something bigger.",
  "So whether you're a designer, a client, or a brand seeking to tell your story, trust the process, but also welcome the detours. Because in those unplanned, unpredictable, and sometimes messy moments, that's where the truly unforgettable work is born.",
  "As a studio, we've learned to stay open, curious, and adaptable. Every project carries the potential for surprise, and it's often those surprises that elevate good work to something remarkable. The unexpected moments remind us why we do what we do — because behind every screen, color palette, and interaction is a story waiting to unfold in ways we couldn't have planned.",
];

export const posts: Post[] = [
  {
    slug: "plant-with-intention-start-with-strategy-not-just-aesthetics",
    title: "Plant with intention. Start with strategy, not just aesthetics.",
    date: "May 16, 2025",
    cover: `${CDN}/6904fc52b72b8840e4b41817_blog-img-01.png`,
    paragraphs: [
      "In the world of branding and digital design, it's easy to get distracted by the shiny stuff. Bold colors. Trendy fonts. A killer logo you can slap on a tote bag.",
      "It's tempting, in the world of branding and design, to jump straight to the pretty stuff. Color palettes. Trendy typefaces. A logo that would look great on a tote bag or splashed across Instagram. We get it — aesthetics are exciting, they feel tangible, and they're the part of your brand the world immediately sees.",
      "But here's the truth: without strategy, even the most beautiful brand is just surface-level decoration. It might turn heads for a moment, but it won't last, and it certainly won't build loyalty. We believe great brands are grown from the inside out. They're not designed for aesthetics alone; they're built on intention, rooted in clarity, and guided by a strategy that shapes every decision, big or small.",
      "A brand is more than its visuals. It's the feeling people associate with your name. It's the reason they choose you over a dozen other options. It's the conversation they have about your work when you're not in the room. When brands are built backwards — when design leads and strategy trails behind — you end up with something attractive, but hollow.",
      "This is why strategy isn't just a phase we tack on before diving into design. It's the foundation. It shapes who you're speaking to, what you're saying, and why you exist in the first place. A strong strategy answers the questions that truly matter: What do we stand for? Who are we here for? What problem do we solve in a way no one else can?",
      "Once those answers are clear, the design process transforms. Now, your color palette isn't just trendy — it represents the emotions you want to evoke. Your typography isn't just cool — it's a reflection of your brand's character and voice.",
      "So before you dive into your next logo refresh or website redesign, take a moment to plant with intention. Start with strategy, and let everything else grow from there. Because beautiful brands are everywhere — but brands with purpose? Those are rare, and they're the ones that truly bloom.",
    ],
  },
  {
    slug: "the-unexpected-moments-are-where-the-magic-happens",
    title: "The unexpected moments are where the magic happens.",
    date: "May 17, 2025",
    cover: `${CDN}/6904f89c4b2952de2bd178ab_blog-img-02.png`,
    paragraphs: [
      "In the fast-paced world of digital design, it's easy to get caught up in deadlines, deliverables, and client expectations. We plan meticulously, map out user journeys, and craft pixel-perfect layouts. But no matter how much we prepare, it's often the unplanned moments — those spontaneous sparks of creativity — where the real magic happens.",
      "Every project starts with a brief, a set of guidelines, and a clear direction. Yet, somewhere along the way, a new idea emerges during a late-night brainstorming session, a client shares an offhand comment that reshapes the vision, or a small design experiment turns into the centerpiece of a project.",
      ...strategyBody.slice(4),
    ],
  },
  {
    slug: "why-good-branding-isnt-just-a-logo-and-what-you-actually-need",
    title: "Why Good Branding Isn't Just a Logo (And What You Actually Need)",
    date: "May 18, 2025",
    cover: `${CDN}/6904f9919192486ae12487df_blog-img-07.png`,
    paragraphs: [
      "When people think of branding, the first thing that usually comes to mind is a logo. It's the face of a company, the mark you remember, and often the first thing a customer associates with a business. But strong branding goes far beyond a clever symbol or a clean wordmark.",
      "A logo might catch someone's eye, but it's the brand experience that keeps them coming back. From the tone of your messaging to the colors you use, the way your website feels, and even how your brand interacts on social media — every detail works together to tell your story.",
      "What you actually need is a brand foundation that defines who you are, what you stand for, and how you want to be perceived. This includes your brand voice, positioning, values, and personality.",
      "Good branding also means consistency. Every touchpoint, whether it's your website, social media post, business card, or packaging, should feel like it belongs to the same story. A beautiful logo without a strong brand system behind it is like a book cover without a story inside.",
      "Ultimately, what makes a brand memorable isn't a single element but how all the pieces work together to create an experience. So if you're thinking about investing in branding, look beyond the logo. Focus on building the story, the emotion, and the experience people will remember.",
    ],
  },
  {
    slug: "from-idea-to-iconic-how-to-build-a-brand-people-obsess-over",
    title: "From Idea to Iconic: How to Build a Brand People Obsess Over",
    date: "May 19, 2025",
    cover: `${CDN}/6904f9c7271285c4259fc15a_blog-img-08-min.png`,
    paragraphs: [
      "Every great brand starts with a simple idea — a spark of inspiration, a need to solve a problem, or a desire to create something better. But what separates a good brand from an iconic one isn't just the quality of its product or the cleverness of its logo.",
      "Building a brand people obsess over begins with clarity. You need to know who you are, what you stand for, and why you exist beyond making a profit. This foundation shapes every decision you make, from your name and visual identity to your messaging and customer experience.",
      "Consistency is another key ingredient. The brands we admire most show up in the same voice, style, and tone across every touchpoint. This consistency builds recognition and trust — two things that turn casual customers into loyal fans.",
      "But what really turns a brand into an obsession is how it makes people part of the story. Iconic brands invite their audience in, creating moments of delight, connection, and meaning.",
      "The truth is, iconic brands aren't built overnight. They're shaped by intentional choices, small risks, and the ability to adapt while staying true to their core. When all those elements come together, you don't just create a brand — you create a movement people can't help but talk about.",
    ],
  },
  {
    slug: "how-to-craft-a-brand-voice-that-doesnt-sound-like-everyone-else",
    title: "How to Craft a Brand Voice That Doesn't Sound Like Everyone Else",
    date: "May 20, 2025",
    cover: `${CDN}/6904f9f399c3b939ac1a23e4_blog-img-09.png`,
    paragraphs: [
      "In a world where countless brands are competing for attention, sounding like everyone else is the fastest way to be forgotten. Your brand voice isn't just about what you say — it's about how you say it, and how it makes people feel when they hear from you.",
      "The biggest mistake brands make when defining their voice is playing it safe. The brands people remember are the ones that sound human, confident, and distinct.",
      "To craft a voice that stands out, start by getting crystal clear on your brand's personality. Are you the approachable expert? The rebellious disruptor? The playful creative? Knowing this helps you decide how your brand should speak in different scenarios.",
      "A great brand voice also leaves room for emotion and storytelling. People connect with narratives, humor, vulnerability, and moments of surprise. Don't be afraid to show personality, take a stand, or inject some quirks into your copy.",
      "At the end of the day, your voice is one of the most powerful tools you have to stand out in a noisy market. The brands that win are the ones that aren't afraid to sound different — because different gets remembered.",
    ],
  },
  {
    slug: "the-secret-sauce-behind-scroll-stopping-websites",
    title: "The Secret Sauce Behind Scroll-Stopping Websites",
    date: "May 21, 2025",
    cover: `${CDN}/6904fa1de13c1ff9e3631c79_blog-img-10.png`,
    paragraphs: [
      "In an endless sea of websites vying for attention, only a handful truly manage to stop people in their tracks. The kind that makes you pause mid-scroll, linger a little longer, and maybe even hit the share button.",
      "At the heart of it is storytelling. Great websites don't just display information; they guide visitors through a narrative. From the moment someone lands on the page, every section, animation, and headline works together to move them forward with intention.",
      "Another essential ingredient is emotional connection. The best sites make you feel something, whether it's excitement, calm, curiosity, or inspiration. This comes from thoughtful design choices: colors that set a mood, typography that carries personality, imagery that tells a story.",
      "Interactivity and motion also play a huge role. Smooth transitions, subtle hover effects, and unexpected micro-interactions can transform a simple site into an immersive experience.",
      "What truly separates the unforgettable sites from the forgettable ones is intention. Every design choice, every word, every animation exists for a reason. When done right, they don't just look good — they leave an impression long after the screen is closed.",
    ],
  },
  {
    slug: "why-every-brand-needs-a-signature-visual-language",
    title: "Why Every Brand Needs a Signature Visual Language",
    date: "May 23, 2025",
    cover: `${CDN}/6904f7787fe5cb2f0c37e5a9_blog-img-05.png`,
    paragraphs: strategyBody,
  },
  {
    slug: "the-art-of-constraints-how-limitations-spark-creativity",
    title: "The Art of Constraints: How Limitations Spark Creativity",
    date: "May 23, 2025",
    cover: `${CDN}/6904f83e56a12d8e2faebcbf_blog-img-06.png`,
    paragraphs: strategyBody,
  },
  {
    slug: "from-sketch-to-screen-how-ideas-evolve-into-impactful-designs",
    title: "From Sketch to Screen: How Ideas Evolve Into Impactful Designs",
    date: "May 23, 2025",
    cover: `${CDN}/6904f7f3761c7b4f34077d55_blog-img-04.png`,
    paragraphs: strategyBody,
  },
  {
    slug: "why-strategy-should-always-come-before-aesthetics",
    title: "Why Strategy Should Always Come Before Aesthetics",
    date: "May 23, 2025",
    cover: `${CDN}/6904f9919192486ae12487df_blog-img-07.png`,
    paragraphs: strategyBody,
  },
  {
    slug: "inside-the-studio-our-process-for-crafting-a-standout-identity",
    title: "Inside the Studio: Our Process for Crafting a Standout Identity",
    date: "May 23, 2025",
    cover: `${CDN}/6904f8d450e7dd166b568fd5_blog-img-03.png`,
    paragraphs: strategyBody,
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
