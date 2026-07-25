import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import StatsRow from "@/components/StatsRow";
import PillButton from "@/components/PillButton";
import SectionLabel from "@/components/SectionLabel";

export const metadata: Metadata = {
  title: "About — QWERTY TECK",
};

const values = [
  {
    title: "Strategy before aesthetics.",
    body: "Pretty without a plan is just decoration. Every colour, word, and pixel starts from a clear strategy built to help you grow.",
  },
  {
    title: "One team, end to end.",
    body: "The people who plan your brand are the people who build it. Accountability doesn't get lost between departments.",
  },
  {
    title: "Craft is non-negotiable.",
    body: "We'd rather do less, better. Quality isn't the finish line — it's the starting condition.",
  },
  {
    title: "Bold, not reckless.",
    body: "We take creative risks on purpose, backed by reasoning you can stand behind in a boardroom.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="px-5 pb-16 pt-32 md:px-10 md:pt-40">
        <Reveal>
          <h1 className="max-w-3xl text-4xl md:text-6xl">
            We&rsquo;re QWERTY TECK® — a Dubai creative studio building bold
            brands, refined websites, and ideas that refuse to be ordinary.
          </h1>
        </Reveal>
      </section>

      <section className="px-5 py-16 md:px-10 md:py-24">
        <StatsRow />
      </section>

      <section className="bg-mist px-5 py-20 md:px-10 md:py-32">
        <Reveal>
          <h2 className="max-w-2xl text-3xl md:text-5xl">
            Built on a simple belief: ordinary is expensive.
          </h2>
        </Reveal>
        <div className="mt-10 flex flex-col gap-6 text-lg text-body md:max-w-3xl">
          <Reveal delay={0.05}>
            <p>
              Blending in costs more than standing out ever will — in
              attention, in trust, in growth left on the table. We started
              QWERTY TECK in Dubai to give ambitious brands a partner who
              treats distinction as the strategy, not the decoration.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p>
              We&rsquo;re a full-service studio, which means one team carries
              your project from first sketch to final pixel. No handoffs, no
              telephone game, no watered-down vision. Strategy, design,
              development, and content — under one roof, held to one standard.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p>
              We work with founders who have something worth saying and want
              to say it beautifully. If that&rsquo;s you, we should talk.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-5 py-20 md:px-10 md:py-32">
        <Reveal>
          <SectionLabel>How we work</SectionLabel>
          <h2 className="mt-3 max-w-2xl text-3xl md:text-5xl">
            A few things we believe.
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.05}>
              <p className="text-xl font-medium">{v.title}</p>
              <p className="mt-2 max-w-md text-body">{v.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-mist px-5 py-20 md:px-10 md:py-32">
        <Reveal>
          <SectionLabel>THE TEAM</SectionLabel>
          <h2 className="mt-3 max-w-2xl text-3xl md:text-5xl">
            We collaborate closely to hit your goals — and quietly go past
            them.
          </h2>
          <p className="mt-6 max-w-xl text-lg text-body">
            We keep it small and senior — a tight team of specialists, not a
            rotating cast of juniors. You&rsquo;ll work directly with the
            people doing the work, from strategy through to final delivery.
          </p>
        </Reveal>
      </section>

      <section className="px-5 py-20 text-center md:px-10 md:py-32">
        <Reveal>
          <h2 className="text-3xl md:text-5xl">
            Ready to build something worth remembering?
          </h2>
          <div className="mt-8 flex justify-center">
            <PillButton href="/contact">Start a project</PillButton>
          </div>
        </Reveal>
      </section>
    </>
  );
}
