import HeroMarquee from "@/components/HeroMarquee";
import PartnersMarquee from "@/components/PartnersMarquee";
import ServicesSlider from "@/components/ServicesSlider";
import VideoLightbox from "@/components/VideoLightbox";
import Reveal from "@/components/Reveal";
import PillButton from "@/components/PillButton";
import SectionLabel from "@/components/SectionLabel";
import ProjectCard from "@/components/ProjectCard";
import StatsRow from "@/components/StatsRow";
import FaqAccordion from "@/components/FaqAccordion";
import FaqBackground from "@/components/FaqBackground";
import BlogCard from "@/components/BlogCard";
import TestimonialCard from "@/components/TestimonialCard";
import SplitReveal from "@/components/SplitReveal";
import FadeInText from "@/components/FadeInText";
import { projects } from "@/data/projects";
import { posts } from "@/data/blog";
import { testimonials, reviewImages, socialLinks } from "@/data/site";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden px-5 pb-8 pt-32 md:px-10 md:pt-40">
        <span className="p-mono absolute left-5 top-1/2 hidden -translate-y-1/2 -rotate-90 text-slate md:left-8 md:block">
          ( HAIL NY )
        </span>

        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          <h1 className="text-[15vw] leading-[0.95] tracking-tight sm:text-[10vw] md:text-[7rem] lg:text-[8rem]">
            <SplitReveal text="QWERTY TECK" as="span" />
            <span className="align-top text-[0.4em]">®</span>
          </h1>
          <FadeInText delay={0.6} className="mt-6 max-w-md text-body md:text-lg">
            Creative studio based in Dubai.
          </FadeInText>
        </div>

        <span className="p-mono absolute right-5 top-1/2 hidden -translate-y-1/2 text-slate md:right-8 md:block">
          {socialLinks.map((s) => s.label).join(" / ")}
        </span>
      </section>

      <HeroMarquee />

      {/* Home About + Partners */}
      <section className="px-5 py-16 md:px-10 md:py-24">
        <Reveal>
          <h2 className="mx-auto max-w-3xl text-center text-3xl md:text-5xl">
            We&rsquo;re QWERTY TECK® — a Dubai creative studio building bold brands, refined websites, and ideas with the audacity to be unforgettable.
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-14">
          <PartnersMarquee />
        </Reveal>
      </section>

      {/* Latest Projects */}
      <section className="px-5 py-20 md:px-10 md:py-32">
        <Reveal>
          <div className="mb-10 flex items-end justify-between md:mb-14">
            <div>
              <SectionLabel>_©25</SectionLabel>
              <h2 className="mt-3 text-4xl md:text-6xl">Latest Projects.</h2>
            </div>
            <div className="hidden md:block">
              <PillButton href="/projects">See all projects</PillButton>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="grid gap-3 sm:grid-cols-2 md:gap-6">
            {projects.slice(0, 6).map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </Reveal>
        <div className="mt-10 md:hidden">
          <PillButton href="/projects">See all projects</PillButton>
        </div>
      </section>

      {/* Services */}
      <section className="bg-mist px-5 py-20 md:px-10 md:py-32">
        <Reveal>
          <div className="mb-12 flex items-end justify-between md:mb-16">
            <h2 className="text-4xl md:text-6xl">Services.</h2>
            <div className="hidden md:block">
              <PillButton href="/contact">Get in touch</PillButton>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <ServicesSlider />
        </Reveal>
        <div className="mt-10 flex justify-center md:hidden">
          <PillButton href="/contact">Get in touch</PillButton>
        </div>
      </section>

      {/* About + Stats */}
      <section className="px-5 py-20 md:px-10 md:py-32">
        <Reveal>
          <h2 className="max-w-3xl text-3xl md:text-5xl">
            QWERTY TECH is a creative studio shaping bold brands and daring
            ideas.
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-10 md:grid-cols-2 md:items-center md:gap-16">
          <Reveal delay={0.1}>
            <VideoLightbox />
          </Reveal>
          <Reveal delay={0.15}>
            <StatsRow />
          </Reveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-mist px-5 py-8 md:px-10 md:py-16">
        <Reveal>
          <div className="mx-auto max-w-[600px] pb-6 text-center">
            <SectionLabel>TESTIMONIALS</SectionLabel>
            <h2 className="mt-3 text-4xl md:text-6xl">
              Trusted by brands who aren&rsquo;t afraid to stand out.
            </h2>
          </div>
        </Reveal>
        <div className="flex flex-col gap-6">
          {testimonials.map((t, i) => (
            <Reveal
              key={t.name}
              delay={i * 0.08}
              className="sticky top-20"
              style={{ zIndex: i + 1 }}
            >
              <TestimonialCard
                quote={t.quote}
                name={t.name}
                role={t.role}
                image={reviewImages[i]}
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="relative px-5 py-16 md:px-10 md:py-24">
        <FaqBackground />
        <div className="grid gap-8 md:grid-cols-2">
          <Reveal>
            <h2 className="text-4xl md:text-6xl">FAQ.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <FaqAccordion />
          </Reveal>
        </div>
      </section>

      {/* Creative Dispatch */}
      <section className="bg-mist px-5 py-20 md:px-10 md:py-32">
        <Reveal>
          <div className="mb-12 flex items-end justify-between md:mb-16">
            <h2 className="text-4xl md:text-6xl">Creative dispatch</h2>
            <div className="hidden md:block">
              <PillButton href="/contact">Let&rsquo;s Talk</PillButton>
            </div>
          </div>
        </Reveal>
        <div className="grid gap-10 md:grid-cols-3">
          {posts.slice(0, 3).map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.08}>
              <BlogCard post={post} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
