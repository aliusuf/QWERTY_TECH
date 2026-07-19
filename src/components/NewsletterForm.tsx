"use client";

import { useState, FormEvent } from "react";

export default function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email");
    if (typeof email === "string" && /\S+@\S+\.\S+/.test(email)) {
      setStatus("ok");
      e.currentTarget.reset();
    } else {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-sm gap-2">
      <input
        type="email"
        name="email"
        required
        placeholder="Your email address"
        className="w-full rounded-full border border-white/20 bg-transparent px-5 py-3 text-sm text-white placeholder:text-white/40 focus:border-white/50 focus:outline-none"
      />
      <button
        type="submit"
        className="shrink-0 rounded-full bg-white px-5 py-3 text-sm font-medium text-ink transition-opacity hover:opacity-80"
      >
        Join
      </button>
      {status === "ok" && (
        <p className="absolute mt-14 text-xs text-white/60">
          Thank you! Your submission has been received!
        </p>
      )}
      {status === "error" && (
        <p className="absolute mt-14 text-xs text-red-300">
          Oops! Something went wrong while submitting the form.
        </p>
      )}
    </form>
  );
}
