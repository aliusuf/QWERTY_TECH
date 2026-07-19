import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import PillButton from "@/components/PillButton";
import ProjectCard from "@/components/ProjectCard";
import SectionLabel from "@/components/SectionLabel";
import { getProject, moreProjects, projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return { title: project ? `${project.name} — QWERTY TECH` : "Project — QWERTY TECH" };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const related = moreProjects(project.slug);

  return (
    <>
      <section className="px-5 pb-10 pt-32 md:px-10 md:pt-40">
        <Reveal>
          <h1 className="text-4xl md:text-7xl">{project.name}</h1>
          <p className="mt-6 max-w-2xl text-lg text-body">{project.description}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 grid grid-cols-2 gap-6 border-y border-line py-8 sm:grid-cols-4">
            <div>
              <SectionLabel>Year</SectionLabel>
              <p className="mt-2 text-xl font-medium">{project.year}</p>
            </div>
            <div>
              <SectionLabel>Scope</SectionLabel>
              <p className="mt-2 text-xl font-medium">{project.scope}</p>
            </div>
            <div>
              <SectionLabel>Timeline</SectionLabel>
              <p className="mt-2 text-xl font-medium">{project.timeline}</p>
            </div>
            <div>
              <SectionLabel>Live project</SectionLabel>
              <p className="mt-2 text-xl font-medium">Preview</p>
            </div>
          </div>
        </Reveal>
      </section>

      <Reveal>
        <div className="relative mx-5 aspect-video overflow-hidden rounded-3xl bg-ink md:mx-10">
          <Image
            src={project.cover}
            alt={project.name}
            fill
            sizes="(min-width: 768px) 90vw, 100vw"
            className="object-cover"
            priority
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.logo}
            alt={`${project.name} logo`}
            className="absolute bottom-5 left-5 h-6 w-auto opacity-95 md:h-8"
          />
        </div>
      </Reveal>

      <section className="px-5 py-16 md:px-10 md:py-24">
        <Reveal>
          <p className="max-w-3xl text-lg text-body">{project.challenge}</p>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {project.gallery.map((src, i) => (
            <Reveal key={src} delay={i * 0.08}>
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-mist">
                <Image
                  src={src}
                  alt={`${project.name} detail ${i + 1}`}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-mist px-5 py-20 md:px-10 md:py-32">
        <Reveal>
          <h2 className="mb-8 text-3xl md:text-5xl">More projects.</h2>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 md:gap-6">
          {related.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>

      <section className="px-5 py-20 text-center md:px-10 md:py-32">
        <Reveal>
          <h2 className="text-3xl md:text-5xl">Have a project in mind?</h2>
          <p className="mx-auto mt-4 max-w-md text-body">
            We&rsquo;d love to hear from you — whether you have a project in
            mind, or just want to say hi.
          </p>
          <div className="mt-8 flex justify-center">
            <PillButton href="/contact">Let&rsquo;s Talk</PillButton>
          </div>
        </Reveal>
      </section>
    </>
  );
}
