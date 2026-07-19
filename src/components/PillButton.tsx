import Link from "next/link";
import { ReactNode } from "react";
import { PlusIcon } from "./icons";

export default function PillButton({
  href,
  children,
  variant = "dark",
}: {
  href: string;
  children: ReactNode;
  variant?: "dark" | "light";
}) {
  const styles =
    variant === "dark"
      ? "bg-ink text-paper hover:bg-body"
      : "bg-paper text-ink hover:bg-mist";

  return (
    <Link
      href={href}
      className={`group inline-flex w-fit items-center gap-3 rounded-full py-3 pl-6 pr-3 text-[1.1rem] leading-[1.3em] tracking-[-0.02em] transition-colors ${styles}`}
    >
      {children}
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-current transition-transform duration-300 group-hover:rotate-45">
        <PlusIcon className="h-4 w-4" />
      </span>
    </Link>
  );
}
