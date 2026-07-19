"use client";

import { useEffect, useRef, useState } from "react";
import { services } from "@/data/site";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ServiceIcon1,
  ServiceIcon2,
  ServiceIcon3,
  ServiceIcon4,
} from "./icons";

const icons = [ServiceIcon1, ServiceIcon2, ServiceIcon3, ServiceIcon4];
const cardColors = [
  "#e5daf6", // purple
  "#cfffb2", // green
  "#ffc9c9", // pink
  "#fedca6", // orange
  "#c2e7ff", // blue
  "#fff2a8", // yellow
  "#b8f5e0", // teal
  "#ffd2ec", // rose
];

export default function ServicesSlider() {
  const [index, setIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const card = cardRef.current;
    if (!viewport || !track || !card) return;

    const update = () => {
      const gap = parseFloat(getComputedStyle(track).columnGap || "0");
      setStep(card.getBoundingClientRect().width + gap);
      setMaxScroll(Math.max(0, track.scrollWidth - viewport.clientWidth));
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(viewport);
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  const offset = Math.min(index * step, maxScroll);
  const atStart = offset <= 0;
  const atEnd = offset >= maxScroll;

  function go(dir: 1 | -1) {
    setIndex((i) => Math.min(Math.max(i + dir, 0), services.length - 1));
  }

  return (
    <div ref={viewportRef} className="relative overflow-hidden">
      <div
        ref={trackRef}
        className="flex gap-4 transition-[transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:gap-6"
        style={{ transform: `translateX(-${offset}px)` }}
      >
        {services.map((s, i) => {
          const Icon = icons[i % icons.length];
          return (
            <div
              key={s.code}
              ref={i === 0 ? cardRef : undefined}
              className="flex h-[380px] w-[280px] shrink-0 flex-col justify-between rounded-[40px] p-8 sm:w-[320px] md:h-[440px] md:w-[380px] md:p-10"
              style={{ backgroundColor: cardColors[i % cardColors.length] }}
            >
              <span className="p-mono text-ink/60">( {s.code} )</span>
              <Icon className="mx-auto h-16 w-16 text-ink md:h-20 md:w-20" />
              <div>
                <p className="p-mono text-ink/70">{s.title}</p>
                <p className="mt-2 max-w-[85%] text-sm text-ink/80 md:text-base">
                  {s.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {!atStart && (
        <button
          onClick={() => go(-1)}
          aria-label="Previous service"
          className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-ink/20 text-paper backdrop-blur transition-colors hover:bg-ink/35"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
      )}
      {!atEnd && (
        <button
          onClick={() => go(1)}
          aria-label="Next service"
          className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-ink/20 text-paper backdrop-blur transition-colors hover:bg-ink/35"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
