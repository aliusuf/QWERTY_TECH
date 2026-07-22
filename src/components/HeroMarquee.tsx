"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const IMG_CDN = "https://cdn.prod.website-files.com/6904c591abb4bd2b6a67271b";
const VID_CDN = "https://cdn.prod.website-files.com/68f33158cced4a41f89d89a6";

const images = [
  `${IMG_CDN}/6904ca7a4abbe56dfff89585_hero-marquee-img-02.avif`,
  `${IMG_CDN}/6904ca7a4abbe56dfff89567_hero-marquee-img-04.avif`,
  `${IMG_CDN}/6904ca7a4abbe56dfff8956d_hero-marquee-img-05.avif`,
  `${IMG_CDN}/6904ca7a4abbe56dfff89573_hero-marquee-img-06.avif`,
  `${IMG_CDN}/6904ca7a4abbe56dfff89578_hero-marquee-img-07.avif`,
  `${IMG_CDN}/6904ca7a4abbe56dfff8957d_hero-marquee-img-08.avif`,
  `${VID_CDN}/6903d92be1096c25ee0356a4_hero-marquee-video-01-poster-00001.jpg`,
  `${VID_CDN}/6903da528f19a5a4baf4d58b_hero-marquee-video-03-poster-00001.jpg`,
];

const slots = [
  { offset: -3, rotate: -24, y: 70, scale: 0.72, z: 1 },
  { offset: -2, rotate: -17, y: 42, scale: 0.82, z: 2 },
  { offset: -1, rotate: -9, y: 16, scale: 0.92, z: 3 },
  { offset: 0, rotate: 0, y: -20, scale: 1.18, z: 6 },
  { offset: 1, rotate: 9, y: 16, scale: 0.92, z: 3 },
  { offset: 2, rotate: 17, y: 42, scale: 0.82, z: 2 },
  { offset: 3, rotate: 24, y: 70, scale: 0.72, z: 1 },
];

const AUTO_ADVANCE_MS = 3200;
const FLIP_MS = 700;
const STAGGER_MS = 90;
// Rightmost card flips first; the wave sweeps toward the left.
const MAX_OFFSET = slots[slots.length - 1].offset;

function FlipImage({ src, delay }: { src: string; delay: number }) {
  const [frontSrc, setFrontSrc] = useState(src);
  const [flipped, setFlipped] = useState(false);
  const [instant, setInstant] = useState(false);
  const pendingSrc = useRef(src);

  useEffect(() => {
    if (src === frontSrc) return;
    pendingSrc.current = src;
    const startTimer = setTimeout(() => setFlipped(true), delay);
    return () => clearTimeout(startTimer);
  }, [src, frontSrc, delay]);

  useEffect(() => {
    if (!flipped) return;
    const timer = setTimeout(() => {
      setInstant(true);
      setFrontSrc(pendingSrc.current);
      setFlipped(false);
      setTimeout(() => setInstant(false), 30);
    }, FLIP_MS);

    return () => clearTimeout(timer);
  }, [flipped]);

  return (
    <div className="h-full w-full" style={{ perspective: "1400px" }}>
      <div
        className="relative h-full w-full"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateY(${flipped ? 180 : 0}deg)`,
          transition: instant ? "none" : `transform ${FLIP_MS}ms cubic-bezier(0.6,0.05,0.4,0.95)`,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={frontSrc}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={{ backfaceVisibility: "hidden" }}
          loading="eager"
          fetchPriority="high"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          loading="eager"
          fetchPriority="high"
        />
      </div>
    </div>
  );
}

export default function HeroMarquee() {
  const [base, setBase] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setBase((b) => (b + 1) % images.length);
    }, AUTO_ADVANCE_MS);
  }, []);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  function handleCardClick() {
    setBase((b) => (b + 1) % images.length);
    startTimer();
  }

  return (
    <div className="flex h-[360px] w-full items-center justify-center overflow-hidden py-4 sm:h-[460px] md:h-[560px]">
      <div className="relative flex w-full max-w-6xl items-center justify-center [--fan-gap:70px] sm:[--fan-gap:100px] md:[--fan-gap:150px] lg:[--fan-gap:180px]">
        {slots.map((slot) => {
          const idx = (base + slot.offset + images.length * 10) % images.length;
          // Rightmost (largest offset) gets 0 delay; each step left adds STAGGER_MS.
          const delay = (MAX_OFFSET - slot.offset) * STAGGER_MS;
          return (
            <button
              key={slot.offset}
              onClick={handleCardClick}
              aria-label="Show next work"
              className="absolute h-[210px] w-[145px] shrink-0 cursor-pointer overflow-hidden rounded-[28px] bg-mist shadow-xl transition-shadow duration-300 hover:shadow-2xl sm:h-[300px] sm:w-[205px] md:h-[420px] md:w-[290px] lg:h-[480px] lg:w-[330px]"
              style={{
                transform: `translateX(calc(var(--fan-gap) * ${slot.offset})) translateY(${slot.y}px) rotate(${slot.rotate}deg) scale(${slot.scale})`,
                zIndex: slot.z,
              }}
            >
              <FlipImage src={images[idx]} delay={delay} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
