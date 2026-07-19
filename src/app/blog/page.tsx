import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import BlogCard from "@/components/BlogCard";
import { posts } from "@/data/blog";

export const metadata: Metadata = {
  title: "Blog — QWERTY TECH",
};

export default function BlogPage() {
  return (
    <section className="px-5 pb-20 pt-32 md:px-10 md:pt-40">
      <Reveal>
        <h1 className="text-4xl md:text-6xl">Creative Dispatch</h1>
        <p className="mt-4 max-w-md text-body">
          Every color, word, and pixel comes from a clear strategy built to
          help you grow.
        </p>
      </Reveal>
      <div className="mt-14 grid gap-10 sm:grid-cols-2 md:grid-cols-3">
        {posts.map((post, i) => (
          <Reveal key={post.slug} delay={(i % 3) * 0.08}>
            <BlogCard post={post} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
