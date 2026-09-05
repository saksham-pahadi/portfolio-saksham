"use client";
import { useState } from "react";
import { ArrowUpRight, Loader2, CheckCircle2 } from "lucide-react";

export default function ContactForm() {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function submit(form: HTMLFormElement) {
    setState("loading");
    setError("");
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong");
      setState("success");
      form.reset();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      setState("error");
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void submit(e.currentTarget);
      }}
      className="grid gap-4"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <input required name="name" placeholder="Your name" className="field" />
        <input required type="email" name="email" placeholder="you@example.com" className="field" />
      </div>
      <input required name="subject" placeholder="What's the idea?" className="field" />
      <textarea required name="message" placeholder="Tell me a little about the project..." rows={5} className="field resize-none" />
      
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-xs text-white/40">Typical reply: within 1–2 business days.</div>
        <button
          disabled={state === "loading" || state === "success"}
          className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#d6ff3f] px-6 py-3.5 text-sm font-bold text-black transition hover:bg-[#c3f02b] disabled:opacity-60"
        >
          {state === "loading" ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Sending
            </>
          ) : state === "success" ? (
            <>
              <CheckCircle2 size={16} /> Sent
            </>
          ) : (
            <>
              Send message <ArrowUpRight size={16} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </>
          )}
        </button>
      </div>

      {error && <p className="text-sm text-rose-400">{error}</p>}
      {state === "success" && <p className="text-sm text-emerald-400">Thanks — your message is in my inbox.</p>}
    </form>
  );
}