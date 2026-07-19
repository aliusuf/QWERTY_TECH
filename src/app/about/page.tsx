import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import StatsRow from "@/components/StatsRow";
import SectionLabel from "@/components/SectionLabel";
import { team, awards } from "@/data/site";

export const metadata: Metadata = {
  title: "About — QWERTY TECH",
};

export default function AboutPage() {
  return (
    <>
      <section className="px-5 pb-16 pt-32 md:px-10 md:pt-40">
        <Reveal>
          <h1 className="max-w-3xl text-4xl md:text-6xl">
            We&rsquo;re QWERTY TECH® — a creative studio cultivating bold
            brands, beautiful websites, and ideas that refuse to be ordinary.
          </h1>
        </Reveal>
      </section>

      <section className="px-5 py-16 md:px-10 md:py-24">
        <StatsRow />
      </section>

      <section className="bg-mist px-5 py-20 md:px-10 md:py-32">
        <Reveal>
          <SectionLabel>THE TEAM</SectionLabel>
          <h2 className="mt-3 max-w-2xl text-3xl md:text-5xl">
            We collaborate closely to hit your goals and go beyond
            expectations.
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 md:grid-cols-3">
          {team.map((member, i) => (
            <Reveal key={member.name} delay={i * 0.05}>
              <div className="aspect-square rounded-2xl bg-paper" />
              <p className="mt-4 text-xl font-medium">{member.name}</p>
              <p className="text-body">{member.role}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-5 py-20 md:px-10 md:py-32">
        <Reveal>
          <SectionLabel>AWARDS</SectionLabel>
          <h2 className="mt-3 max-w-2xl text-3xl md:text-5xl">
            We&rsquo;re proud to have won several prestigious awards over the
            years.
          </h2>
        </Reveal>
        <div className="mt-12 divide-y divide-line border-t border-line">
          {awards.map((award, i) => (
            <Reveal key={`${award.org}-${i}`} delay={i * 0.03}>
              <div className="flex flex-col gap-1 py-5 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-xl font-medium">{award.org}</span>
                <span className="text-body">{award.title}</span>
                <span className="p-mono text-slate">{award.date}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
