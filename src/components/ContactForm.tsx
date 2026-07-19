"use client";

import { useState, FormEvent } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get("name");
    const email = data.get("email");
    const message = data.get("message");
    if (name && message && typeof email === "string" && /\S+@\S+\.\S+/.test(email)) {
      setStatus("ok");
      e.currentTarget.reset();
    } else {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        name="name"
        type="text"
        required
        placeholder="Name"
        className="rounded-xl border border-line bg-transparent px-5 py-4 focus:border-ink focus:outline-none"
      />
      <input
        name="email"
        type="email"
        required
        placeholder="Email Address"
        className="rounded-xl border border-line bg-transparent px-5 py-4 focus:border-ink focus:outline-none"
      />
      <textarea
        name="message"
        required
        rows={5}
        placeholder="Message"
        className="resize-none rounded-xl border border-line bg-transparent px-5 py-4 focus:border-ink focus:outline-none"
      />
      <button
        type="submit"
        className="w-fit rounded-full bg-ink px-7 py-3.5 text-[1.1rem] tracking-[-0.02em] text-paper transition-colors hover:bg-body"
      >
        Send a message
      </button>
      {status === "ok" && (
        <p className="text-sm text-body">
          Thank you! Your submission has been received!
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-600">
          Oops! Something went wrong while submitting the form.
        </p>
      )}
    </form>
  );
}
