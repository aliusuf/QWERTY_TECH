import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import PillButton from "@/components/PillButton";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects — QWERTY TECH",
};

export default function ProjectsPage() {
  return (
    <section className="px-5 pb-20 pt-32 md:px-10 md:pt-40">
      <Reveal>
        <div className="flex flex-col gap-8 border-b border-line pb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-4xl md:text-6xl">Projects.</h1>
            <p className="mt-4 max-w-md text-body">
              Every color, word, and pixel comes from a clear strategy built
              to help you grow.
            </p>
          </div>
          <PillButton href="/contact">Let&rsquo;s Talk</PillButton>
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 md:mt-16 md:gap-6">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
