const IMG_CDN = "https://cdn.prod.website-files.com/6904c591abb4bd2b6a67271b";
const VID_CDN = "https://cdn.prod.website-files.com/68f33158cced4a41f89d89a6";

type MarqueeItem = {
  size: "small" | "square" | "portrait" | "wide";
  corner: "a" | "b";
} & (
  | { type: "image"; src: string }
  | { type: "video"; poster: string; mp4: string; webm: string }
);

const items: MarqueeItem[] = [
  {
    type: "video",
    size: "small",
    corner: "a",
    poster: `${VID_CDN}/6903d92be1096c25ee0356a4_hero-marquee-video-01-poster-00001.jpg`,
    mp4: `${VID_CDN}/6903d92be1096c25ee0356a4_hero-marquee-video-01-transcode.mp4`,
    webm: `${VID_CDN}/6903d92be1096c25ee0356a4_hero-marquee-video-01-transcode.webm`,
  },
  {
    type: "image",
    size: "square",
    corner: "b",
    src: `${IMG_CDN}/6904ca7a4abbe56dfff89585_hero-marquee-img-02.avif`,
  },
  {
    type: "video",
    size: "small",
    corner: "a",
    poster: `${VID_CDN}/6903da528f19a5a4baf4d58b_hero-marquee-video-03-poster-00001.jpg`,
    mp4: `${VID_CDN}/6903da528f19a5a4baf4d58b_hero-marquee-video-03-transcode.mp4`,
    webm: `${VID_CDN}/6903da528f19a5a4baf4d58b_hero-marquee-video-03-transcode.webm`,
  },
  {
    type: "image",
    size: "portrait",
    corner: "b",
    src: `${IMG_CDN}/6904ca7a4abbe56dfff89567_hero-marquee-img-04.avif`,
  },
  {
    type: "image",
    size: "small",
    corner: "a",
    src: `${IMG_CDN}/6904ca7a4abbe56dfff8956d_hero-marquee-img-05.avif`,
  },
  {
    type: "image",
    size: "small",
    corner: "b",
    src: `${IMG_CDN}/6904ca7a4abbe56dfff89573_hero-marquee-img-06.avif`,
  },
  {
    type: "image",
    size: "small",
    corner: "a",
    src: `${IMG_CDN}/6904ca7a4abbe56dfff89578_hero-marquee-img-07.avif`,
  },
  {
    type: "image",
    size: "wide",
    corner: "b",
    src: `${IMG_CDN}/6904ca7a4abbe56dfff8957d_hero-marquee-img-08.avif`,
  },
];

const sizeClasses: Record<MarqueeItem["size"], string> = {
  small: "w-[110px] sm:w-[140px] md:w-[160px]",
  square: "w-[220px] sm:w-[300px] md:w-[380px]",
  portrait: "w-[160px] sm:w-[210px] md:w-[260px]",
  wide: "w-[190px] sm:w-[250px] md:w-[320px]",
};

const cornerClasses: Record<MarqueeItem["corner"], string> = {
  a: "rounded-tl-[28px] rounded-br-[28px] md:rounded-tl-[56px] md:rounded-br-[56px]",
  b: "rounded-tr-[28px] rounded-bl-[28px] md:rounded-tr-[56px] md:rounded-bl-[56px]",
};

function MarqueeCard({ item }: { item: MarqueeItem }) {
  return (
    <div
      className={`relative h-full shrink-0 overflow-hidden bg-mist transition-transform duration-300 hover:scale-[1.02] ${sizeClasses[item.size]} ${cornerClasses[item.corner]}`}
    >
      {item.type === "image" ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={item.src} alt="" className="h-full w-full object-cover" loading="lazy" />
      ) : (
        <video
          className="h-full w-full object-cover"
          poster={item.poster}
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={item.mp4} type="video/mp4" />
          <source src={item.webm} type="video/webm" />
        </video>
      )}
    </div>
  );
}

export default function HeroMarquee() {
  const loop = [...items, ...items];
  return (
    <div className="no-scrollbar h-[280px] w-full overflow-hidden sm:h-[380px] md:h-[480px]">
      <div className="animate-marquee flex h-full w-max items-center gap-3 md:gap-4">
        {loop.map((item, i) => (
          <MarqueeCard key={i} item={item} />
        ))}
      </div>
    </div>
  );
}
