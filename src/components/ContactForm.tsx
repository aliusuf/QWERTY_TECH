"use client";

import { useState, FormEvent } from "react";

const helpOptions = ["Branding", "Website", "Content", "Social", "Not sure yet"];

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get("name");
    const email = data.get("email");
    const project = data.get("project");
    if (name && project && typeof email === "string" && /\S+@\S+\.\S+/.test(email)) {
      setStatus("ok");
      e.currentTarget.reset();
    } else {
      setStatus("error");
    }
  }

  const inputClasses =
    "rounded-xl border border-line bg-transparent px-5 py-4 focus:border-ink focus:outline-none";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          name="name"
          type="text"
          required
          placeholder="Name"
          className={inputClasses}
        />
        <input
          name="email"
          type="email"
          required
          placeholder="Email"
          className={inputClasses}
        />
      </div>
      <input
        name="company"
        type="text"
        placeholder="Company"
        className={inputClasses}
      />
      <select name="help" defaultValue="" className={inputClasses}>
        <option value="" disabled>
          What can we help with?
        </option>
        {helpOptions.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <textarea
        name="project"
        required
        rows={5}
        placeholder="Tell us about your project"
        className={`resize-none ${inputClasses}`}
      />
      <input
        name="budget"
        type="text"
        placeholder="Budget range (optional)"
        className={inputClasses}
      />
      <button
        type="submit"
        className="w-fit rounded-full bg-ink px-7 py-3.5 text-[1.1rem] tracking-[-0.02em] text-paper transition-colors hover:bg-body"
      >
        Send it over
      </button>
      {status === "ok" && (
        <p className="text-sm text-body">
          Thanks — your message is in. We&rsquo;ll be in touch within one
          business day.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-600">
          Please fill in your name, a valid email, and a note about your
          project.
        </p>
      )}
    </form>
  );
}
