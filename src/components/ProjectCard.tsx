import Link from "next/link";
import Image from "next/image";
import { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-ink sm:aspect-[16/11]">
        <Image
          src={project.cover}
          alt={project.name}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-ink/0 opacity-0 transition-all duration-300 group-hover:bg-ink/25 group-hover:opacity-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={project.logo} alt="" className="h-9 w-auto md:h-11" />
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-sm font-medium">{project.name}</span>
        <span className="p-mono flex items-center gap-1.5 text-slate">
          <span>_</span>
          {project.code}
        </span>
      </div>
    </Link>
  );
}
