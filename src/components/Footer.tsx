import Link from "next/link";
import { navLinks, socialLinks, SITE_EMAIL, SITE_NAME } from "@/data/site";
import NewsletterForm from "./NewsletterForm";

export default function Footer() {
  return (
    <footer className="bg-ink px-5 pb-8 pt-20 text-paper md:px-10 md:pt-28">
      <div className="flex gap-4 p-mono text-white/50">
        {socialLinks.map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="hover:text-white">
            {s.label}
            <span className="text-white/25">/</span>
          </a>
        ))}
      </div>

      <div className="mt-10 flex flex-col justify-between gap-10 border-b border-white/10 pb-16 md:flex-row md:items-end">
        <h2 className="max-w-2xl text-3xl md:text-5xl">
          We&rsquo;d love to hear from you — whether you have a project in mind, or
          just want to say hi.
        </h2>
        <a
          href={`mailto:${SITE_EMAIL}`}
          className="whitespace-nowrap text-2xl underline underline-offset-4 md:text-3xl"
        >
          {SITE_EMAIL}
        </a>
      </div>

      <div className="flex flex-col gap-10 py-12 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-medium">Join our newsletter</p>
          <p className="text-sm text-white/50">Daily dose of design trends by the team.</p>
        </div>
        <div className="relative">
          <NewsletterForm />
        </div>
      </div>

      <div className="flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-white/50 md:flex-row md:items-center md:justify-between">
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {navLinks
            .filter((l) => l.href !== "/")
            .map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-white">
                {l.label}
              </Link>
            ))}
        </nav>
        <p>
          © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
