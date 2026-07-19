"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { faqs } from "@/data/site";
import { ChevronDownIcon } from "./icons";

const badgeColors = [
  "#e5daf6",
  "#cfffb2",
  "#ffc9c9",
  "#fedca6",
  "#c2e7ff",
  "#fff2a8",
  "#b8f5e0",
  "#ffd2ec",
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex w-full max-w-[500px] flex-col gap-2.5">
      {faqs.map((item, i) => {
        const isOpen = openIndex === i;
        const color = badgeColors[i % badgeColors.length];
        return (
          <div
            key={item.q}
            className="overflow-hidden rounded-2xl border transition-colors duration-300"
            style={{
              borderColor: isOpen ? color : "var(--color-line)",
              backgroundColor: isOpen ? `${color}55` : "transparent",
            }}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
              aria-expanded={isOpen}
            >
              <span
                className="p-mono flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] text-ink transition-colors duration-300"
                style={{ backgroundColor: color }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 text-sm font-medium">{item.q}</span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.25 }}
                className="flex h-5 w-5 shrink-0 items-center justify-center text-body"
              >
                <ChevronDownIcon className="h-3.5 w-3.5" />
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
                  <p className="px-4 pb-4 pl-14 text-sm text-body">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
