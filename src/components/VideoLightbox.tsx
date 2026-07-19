"use client";

import { useState } from "react";
import { PlayIcon } from "./icons";

const VID_CDN = "https://cdn.prod.website-files.com/68f33158cced4a41f89d89a6";
const POSTER = `${VID_CDN}/6903d92be1096c25ee0356a4_hero-marquee-video-01-poster-00001.jpg`;
const MP4 = `${VID_CDN}/6903d92be1096c25ee0356a4_hero-marquee-video-01-transcode.mp4`;

export default function VideoLightbox() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Play studio reel"
        className="group relative aspect-video w-full overflow-hidden rounded-2xl bg-mist"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={POSTER} alt="" className="h-full w-full object-cover" />
        <span className="absolute inset-0 flex items-center justify-center bg-ink/20 transition-colors group-hover:bg-ink/30">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-paper">
            <PlayIcon className="ml-1 h-6 w-6 text-ink" />
          </span>
        </span>
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/90 p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-3xl overflow-hidden rounded-2xl"
          >
            <video src={MP4} poster={POSTER} controls autoPlay className="w-full" />
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close video"
            className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-paper/10 text-paper hover:bg-paper/20"
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
}
