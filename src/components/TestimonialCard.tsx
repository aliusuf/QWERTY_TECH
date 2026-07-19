import Image from "next/image";

export default function TestimonialCard({
  quote,
  name,
  role,
  image,
}: {
  quote: string;
  name: string;
  role: string;
  image: string;
}) {
  return (
    <div className="grid overflow-hidden rounded-[32px] bg-mist sm:grid-cols-2">
      <div className="relative h-[280px] sm:h-[420px] md:h-[560px] lg:h-[700px]">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col justify-center gap-8 p-8 md:gap-14 md:p-14">
        <p className="text-2xl leading-snug md:text-[2rem]">{quote}</p>
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-body">{role}</p>
        </div>
      </div>
    </div>
  );
}
