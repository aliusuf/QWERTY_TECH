"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks, socialLinks, SITE_EMAIL } from "@/data/site";
import { QMark } from "./icons";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="flex items-center justify-between px-5 py-4 md:px-10 md:py-6">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-paper/80 backdrop-blur"
          aria-label="QWERTY TECH home"
        >
          <QMark className="h-2.5 w-auto text-ink" />
        </Link>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          className="relative flex h-9 w-9 items-center justify-center rounded-full border border-line bg-paper/80 backdrop-blur"
        >
          <span className="relative block h-3 w-3.5">
            <motion.span
              className="absolute left-0 top-1/2 h-[1.5px] w-full bg-ink"
              animate={{ rotate: open ? 45 : 0, y: open ? 0 : -4 }}
              transition={{ duration: 0.25 }}
            />
            <motion.span
              className="absolute left-0 top-1/2 h-[1.5px] w-full bg-ink"
              animate={{ rotate: open ? -45 : 0, y: open ? 0 : 4 }}
              transition={{ duration: 0.25 }}
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-ink px-5 pb-10 pt-24 text-paper md:px-10"
          >
            <nav className="flex flex-col gap-1 md:gap-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.5 }}
                  className="border-b border-white/10 py-4 md:py-5"
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline gap-4 text-4xl md:text-6xl"
                  >
                    <span className="p-mono text-base text-white/40 md:text-lg">
                      ( _{link.code} )
                    </span>
                    <span className="transition-transform duration-300 group-hover:translate-x-2">
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="flex flex-col gap-6 pt-10 md:flex-row md:items-end md:justify-between">
              <a href={`mailto:${SITE_EMAIL}`} className="p-mono text-white/70">
                {SITE_EMAIL}
              </a>
              <div className="flex gap-4 p-mono">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-white/70 hover:text-white"
                  >
                    {s.label}
                    <span className="text-white/30">/</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
