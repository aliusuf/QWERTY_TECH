"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { faqs } from "@/data/site";
import { ChevronDownIcon } from "./icons";

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="w-full max-w-[500px] border-t border-line">
      {faqs.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.q} className="group border-b border-line">
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-start gap-5 py-6 text-left"
              aria-expanded={isOpen}
            >
              <span className="p-mono pt-1 text-slate">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 text-lg font-medium leading-snug transition-colors group-hover:text-body md:text-xl">
                {item.q}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.25 }}
                className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center text-slate"
              >
                <ChevronDownIcon className="h-4 w-4" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="max-w-[38ch] pb-7 pl-[calc(1.5rem+1.25rem)] text-body">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
