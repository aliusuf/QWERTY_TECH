export default function SectionLabel({ children }: { children: string }) {
  return <span className="p-mono text-slate">( {children} )</span>;
}
