import Link from "next/link";
import Image from "next/image";
import { Post } from "@/data/blog";

export default function BlogCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group flex flex-col gap-4">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-mist">
        <Image
          src={post.cover}
          alt={post.title}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <p className="p-mono text-slate">{post.date}</p>
      <h3 className="text-xl font-medium leading-snug tracking-tight md:text-2xl">
        {post.title}
      </h3>
    </Link>
  );
}
