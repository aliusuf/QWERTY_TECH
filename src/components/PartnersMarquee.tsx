import { partnerLogos } from "@/data/site";

export default function PartnersMarquee() {
  const loop = [...partnerLogos, ...partnerLogos];
  return (
    <div className="no-scrollbar relative w-full overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-paper to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-paper to-transparent" />
      <div className="animate-marquee flex w-max items-center gap-16 py-2">
        {loop.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={src}
            alt=""
            className="h-6 w-auto shrink-0 opacity-50 grayscale md:h-7"
          />
        ))}
      </div>
    </div>
  );
}
