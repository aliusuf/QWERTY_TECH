import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { getPost, adjacentPosts, posts } from "@/data/blog";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  return { title: post ? `${post.title} — QWERTY TECH` : "Blog — QWERTY TECH" };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { prev, next } = adjacentPosts(slug);

  return (
    <>
      <article className="px-5 pb-16 pt-32 md:px-10 md:pt-40">
        <Reveal>
          <p className="p-mono text-slate">{post.date}</p>
          <h1 className="mt-4 max-w-3xl text-4xl md:text-6xl">{post.title}</h1>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative mt-10 aspect-video overflow-hidden rounded-3xl bg-mist">
            <Image
              src={post.cover}
              alt={post.title}
              fill
              sizes="(min-width: 768px) 90vw, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mx-auto mt-12 flex max-w-2xl flex-col gap-6 text-lg leading-relaxed text-body">
            {post.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Reveal>
      </article>

      <nav className="flex items-center justify-between border-t border-line px-5 py-8 md:px-10">
        <Link href={`/blog/${prev.slug}`} className="group flex flex-col">
          <span className="p-mono text-slate">Previous</span>
          <span className="mt-1 max-w-[20ch] truncate font-medium group-hover:underline">
            {prev.title}
          </span>
        </Link>
        <Link href={`/blog/${next.slug}`} className="group flex flex-col text-right">
          <span className="p-mono text-slate">Next</span>
          <span className="mt-1 max-w-[20ch] truncate font-medium group-hover:underline">
            {next.title}
          </span>
        </Link>
      </nav>
    </>
  );
}
