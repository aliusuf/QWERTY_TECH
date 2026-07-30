import Link from "next/link";
import type { ReactNode } from "react";
import PillButton from "./PillButton";
import type { BlogArticle, BlogElement } from "@/data/blog";

function parseInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const regex = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let i = 0;
  while ((match = regex.exec(text))) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
    if (match[1] !== undefined) {
      nodes.push(<strong key={`${keyPrefix}-${i}`}>{match[1]}</strong>);
    } else {
      nodes.push(
        <Link
          key={`${keyPrefix}-${i}`}
          href={match[3]}
          className="text-ink underline decoration-1 underline-offset-2 hover:text-body"
        >
          {match[2]}
        </Link>
      );
    }
    lastIndex = regex.lastIndex;
    i++;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

function ElementBlock({ el, blockKey }: { el: BlogElement; blockKey: string }) {
  switch (el.kind) {
    case "paragraph":
      return <p>{parseInline(el.text, blockKey)}</p>;
    case "checklist":
      return (
        <ul className="flex flex-col gap-3">
          {el.items.map((item, i) => (
            <li key={`${blockKey}-${i}`} className="flex gap-3">
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mist text-xs font-bold text-ink">
                &#10003;
              </span>
              <span>{parseInline(item, `${blockKey}-${i}`)}</span>
            </li>
          ))}
        </ul>
      );
    case "table":
      return (
        <div className="overflow-x-auto rounded-2xl border border-line">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-mist">
                {el.headers.map((h) => (
                  <th
                    key={h}
                    className="p-mono border-b border-line px-4 py-3 text-left text-slate"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {el.rows.map((row, i) => (
                <tr key={`${blockKey}-row-${i}`}>
                  {row.map((cell, j) => (
                    <td
                      key={`${blockKey}-cell-${i}-${j}`}
                      className="border-b border-line px-4 py-3 last:border-b-0"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "pullquote":
      return (
        <blockquote className="border-l-2 border-ink py-1 pl-6 text-xl italic text-ink">
          {el.text}
        </blockquote>
      );
    case "cta":
      return (
        <div className="rounded-3xl bg-mist p-8 text-center md:p-10">
          <h3 className="text-2xl font-medium text-ink">{el.heading}</h3>
          <p className="mt-2">{el.body}</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <PillButton href={el.primaryHref}>{el.primaryLabel}</PillButton>
            {el.secondaryHref && el.secondaryLabel && (
              <Link
                href={el.secondaryHref}
                className="text-sm font-medium text-ink underline decoration-1 underline-offset-4"
              >
                {el.secondaryLabel}
              </Link>
            )}
          </div>
        </div>
      );
  }
}

export default function BlogArticleBody({ article }: { article: BlogArticle }) {
  return (
    <div className="mx-auto mt-12 flex max-w-2xl flex-col gap-6 text-lg leading-relaxed text-body">
      <p className="text-xl text-ink">{article.lede}</p>

      <nav aria-label="Table of contents" className="rounded-2xl border border-line bg-mist p-6">
        <p className="p-mono mb-4 text-slate">In this article</p>
        <ol className="flex flex-col gap-2.5">
          {article.toc.map((item, i) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className="flex items-baseline gap-3 text-ink hover:underline">
                <span className="p-mono text-slate">{String(i + 1).padStart(2, "0")}</span>
                {item.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {article.sections.map((section) => (
        <section key={section.id} id={section.id} className="flex scroll-mt-28 flex-col gap-4">
          {section.tag && <p className="p-mono font-medium text-slate">{section.tag}</p>}
          <h2 className="text-2xl font-medium text-ink md:text-3xl">{section.heading}</h2>
          {section.elements.map((el, i) => (
            <ElementBlock key={`${section.id}-${i}`} el={el} blockKey={`${section.id}-${i}`} />
          ))}
        </section>
      ))}

      <section id="faq" className="flex scroll-mt-28 flex-col gap-2">
        <h2 className="text-2xl font-medium text-ink md:text-3xl">Frequently Asked Questions</h2>
        <div className="mt-2 border-t border-line">
          {article.faq.map((item) => (
            <details key={item.q} className="group border-b border-line py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-ink">
                {item.q}
                <span className="text-slate group-open:hidden">+</span>
                <span className="hidden text-slate group-open:inline">&#8211;</span>
              </summary>
              <p className="mt-3">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <div className="flex flex-wrap gap-2 pt-4">
        {article.tags.map((tag) => (
          <span
            key={tag}
            className="p-mono rounded-full border border-line px-3.5 py-1.5 text-slate"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
