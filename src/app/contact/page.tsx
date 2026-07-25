import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import FaqAccordion from "@/components/FaqAccordion";
import FaqBackground from "@/components/FaqBackground";
import ContactForm from "@/components/ContactForm";
import { SITE_EMAIL, socialLinks } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact — QWERTY TECK",
};

export default function ContactPage() {
  return (
    <>
      <section className="px-5 pb-16 pt-32 md:px-10 md:pt-40">
        <Reveal>
          <h1 className="text-4xl md:text-6xl">
            Let&rsquo;s make something worth talking about.
          </h1>
          <p className="mt-4 max-w-md text-body">
            Tell us what you&rsquo;re building. We&rsquo;ll tell you how
            we&rsquo;d approach it — no obligation, no jargon.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-12 md:grid-cols-2">
          <Reveal>
            <div className="flex flex-col gap-8">
              <div className="flex gap-4 p-mono text-slate">
                {socialLinks.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="hover:text-ink">
                    {s.label}
                    <span className="text-line">/</span>
                  </a>
                ))}
              </div>
              <a href={`mailto:${SITE_EMAIL}`} className="text-2xl underline underline-offset-4 md:text-3xl">
                {SITE_EMAIL}
              </a>
              <p className="text-body">
                Based in Dubai, UAE.
                <br />
                Working with clients across the region and beyond.
              </p>
              <p className="text-sm text-slate">
                We reply to every serious enquiry within one business day.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

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
    </>
  );
}
