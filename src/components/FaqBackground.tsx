export default function FaqBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#e5daf6] opacity-60 blur-3xl md:h-96 md:w-96" />
      <div className="absolute -right-16 top-10 h-64 w-64 rounded-full bg-[#c2e7ff] opacity-60 blur-3xl md:h-80 md:w-80" />
      <div className="absolute -bottom-24 left-1/4 h-72 w-72 rounded-full bg-[#ffd2ec] opacity-50 blur-3xl md:h-96 md:w-96" />
      <div className="absolute -bottom-10 -right-10 h-56 w-56 rounded-full bg-[#fedca6] opacity-50 blur-3xl md:h-72 md:w-72" />
    </div>
  );
}
