"use client";

import { useState } from "react";

type Intent = "access" | "informed";

export default function WaitlistCTA() {
  const [email, setEmail] = useState("");
  const [intent, setIntent] = useState<Intent>("access");
  const [status, setStatus] = useState<"idle" | "success">("idle");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    // TODO: wire to backend / form service — pass `intent` as metadata
    setStatus("success");
    setEmail("");
  }

  return (
    <section id="waitlist" className="bg-[#0d0d17] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-purple-900/40 bg-gradient-to-br from-purple-950/60 via-[#11111b] to-[#11111b] px-8 py-16 text-center sm:px-16">
          {/* Background glows */}
          <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[600px] -translate-x-1/2 rounded-full bg-purple-700/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-1/2 h-48 w-[400px] -translate-x-1/2 rounded-full bg-violet-800/10 blur-3xl" />

          <div className="relative">
            <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">
              Get Involved
            </p>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
              Be part of what AI runs on next
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base text-zinc-400">
              Purple8 is AI-native infrastructure — not a wrapper, not a plugin.
              Whether you&apos;re building agents, RAG pipelines, or AI-powered
              enterprise products, we&apos;d like to hear from you.
            </p>

            {status === "success" ? (
              <div className="mx-auto mt-10 flex max-w-sm items-center justify-center gap-3 rounded-2xl border border-green-600/30 bg-green-600/10 px-6 py-4">
                <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-sm text-green-300">
                  {intent === "access"
                    ? "You're on the list — we'll reach out directly."
                    : "Got it — we'll keep you in the loop as we ship."}
                </p>
              </div>
            ) : (
              <div className="mx-auto mt-10 max-w-lg">
                {/* Intent toggle */}
                <div className="mb-6 inline-flex rounded-full border border-zinc-800 bg-zinc-900/60 p-1">
                  <button
                    type="button"
                    onClick={() => setIntent("access")}
                    className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                      intent === "access"
                        ? "bg-purple-600 text-white shadow"
                        : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    Request Early Access
                  </button>
                  <button
                    type="button"
                    onClick={() => setIntent("informed")}
                    className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                      intent === "informed"
                        ? "bg-purple-600 text-white shadow"
                        : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    Keep Me Informed
                  </button>
                </div>

                {/* Context line */}
                <p className="mb-5 text-xs text-zinc-600">
                  {intent === "access"
                    ? "We work directly with design partners — private beta, dedicated support, and preferential pricing."
                    : "No commitment. We'll send you a note when we ship something worth knowing about."}
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@company.com"
                    className="flex-1 rounded-full border border-purple-900/50 bg-[#0a0a0f] px-5 py-3 text-sm text-white placeholder-zinc-600 outline-none transition focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30"
                  />
                  <button
                    type="submit"
                    className="rounded-full bg-purple-600 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#11111b] shrink-0"
                  >
                    {intent === "access" ? "Request Access" : "Stay Updated"}
                  </button>
                </form>
              </div>
            )}

            <p className="mt-6 text-xs text-zinc-600">
              No spam. No auto-subscribe. We only reach out when it&apos;s relevant.
            </p>

            {/* Trust badges */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
              {[
                "AI-Native — not a plugin",
                "Delaware Incorporated",
                "Enterprise-grade security",
                "Zero external dependencies",
              ].map((item) => (
                <div key={item} className="flex items-center gap-1.5 text-xs text-zinc-600">
                  <svg className="h-3.5 w-3.5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
