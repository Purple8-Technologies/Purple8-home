"use client";

import { useState } from "react";
import { CC_BASE_URL } from "@/lib/cc";

type UseType = "personal" | "professional";
type AccessIntent = "beta" | "waitlist";
type Status = "idle" | "loading" | "success" | "error";

interface FormData {
  name: string;
  email: string;
  intent: AccessIntent;
  useType: UseType;
  company: string;
}

const BETA_FORM_URL =
  process.env.NEXT_PUBLIC_BETA_FORM_URL ??
  "https://github.com/Purple8-Technologies/Purple8-home/issues/new?template=beta-interest.yml";
const WAITLIST_FORM_URL =
  process.env.NEXT_PUBLIC_WAITLIST_FORM_URL ??
  "https://github.com/Purple8-Technologies/Purple8-home/issues/new?template=waitlist-interest.yml";

export default function WaitlistCTA() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    intent: "waitlist",
    useType: "professional",
    company: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      intent: form.intent,
      use_type: form.useType,
      company: form.useType === "professional" ? form.company.trim() : null,
      source: "purple8.ai/waitlist",
      submitted_at: new Date().toISOString(),
    };

    // If no endpoint is configured, fall back to GitHub issue forms.
    if (!CC_BASE_URL) {
      window.location.href = form.intent === "beta" ? BETA_FORM_URL : WAITLIST_FORM_URL;
      return;
    }

    try {
      const res = await fetch(`${CC_BASE_URL}/public/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`${res.status}`);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg("Something went wrong — please try again or email hello@purple8.ai");
      console.error("Waitlist submit error:", err);
    }
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
              Get Early Access
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
              <div className="mx-auto mt-10 flex max-w-sm flex-col items-center gap-3 rounded-2xl border border-green-600/30 bg-green-600/10 px-6 py-6">
                <svg className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-base font-semibold text-green-300">You&apos;re on the list!</p>
                <p className="text-sm text-zinc-400">We&apos;ll reach out directly when early access opens.</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mx-auto mt-10 max-w-xl space-y-4 text-left"
              >
                {/* Name */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-zinc-400">
                    Full name <span className="text-purple-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="Jane Smith"
                    className="w-full rounded-xl border border-purple-900/50 bg-[#0a0a0f] px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-zinc-400">
                    Email <span className="text-purple-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="jane@company.com"
                    className="w-full rounded-xl border border-purple-900/50 bg-[#0a0a0f] px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30"
                  />
                </div>

                {/* Personal / Professional toggle */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-zinc-400">
                    Access path
                  </label>
                  <div className="inline-flex rounded-full border border-zinc-800 bg-zinc-900/60 p-1">
                    <button
                      type="button"
                      onClick={() => update("intent", "waitlist")}
                      className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                        form.intent === "waitlist"
                          ? "bg-purple-600 text-white shadow"
                          : "text-zinc-500 hover:text-zinc-300"
                      }`}
                    >
                      General waitlist
                    </button>
                    <button
                      type="button"
                      onClick={() => update("intent", "beta")}
                      className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                        form.intent === "beta"
                          ? "bg-purple-600 text-white shadow"
                          : "text-zinc-500 hover:text-zinc-300"
                      }`}
                    >
                      Apply for beta
                    </button>
                  </div>
                  <p className="mt-2 text-xs text-zinc-500">
                    Beta is a reviewed 30-day full-access evaluation; waitlist is for launch updates.
                  </p>
                </div>

                {/* Personal / Professional toggle */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-zinc-400">
                    How will you use Purple8?
                  </label>
                  <div className="inline-flex rounded-full border border-zinc-800 bg-zinc-900/60 p-1">
                    <button
                      type="button"
                      onClick={() => update("useType", "personal")}
                      className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                        form.useType === "personal"
                          ? "bg-purple-600 text-white shadow"
                          : "text-zinc-500 hover:text-zinc-300"
                      }`}
                    >
                      Personal / Side project
                    </button>
                    <button
                      type="button"
                      onClick={() => update("useType", "professional")}
                      className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                        form.useType === "professional"
                          ? "bg-purple-600 text-white shadow"
                          : "text-zinc-500 hover:text-zinc-300"
                      }`}
                    >
                      Professional / Company
                    </button>
                  </div>
                </div>

                {/* Company name — shown only for professional */}
                {form.useType === "professional" && (
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-zinc-400">
                      Company name
                    </label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => update("company", e.target.value)}
                      placeholder="Acme Corp"
                      className="w-full rounded-xl border border-purple-900/50 bg-[#0a0a0f] px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30"
                    />
                  </div>
                )}

                {/* Error message */}
                {status === "error" && (
                  <p className="rounded-xl border border-red-800/40 bg-red-900/20 px-4 py-3 text-sm text-red-400">
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full rounded-full bg-purple-600 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#11111b] disabled:opacity-60"
                >
                  {status === "loading"
                    ? "Submitting…"
                    : form.intent === "beta"
                      ? "Continue to Beta Application"
                      : "Join General Waitlist"}
                </button>
              </form>
            )}

            <p className="mt-6 text-xs text-zinc-600">
              No spam. No auto-subscribe. We only reach out when it&apos;s relevant.
            </p>

            <p className="mt-2 text-xs text-zinc-500">
              Already approved or invited?{" "}
              <a
                href="/beta"
                className="text-purple-400 underline decoration-purple-700/60 underline-offset-2 hover:text-purple-300"
              >
                Activate beta access & download
              </a>
              .
            </p>

            {!CC_BASE_URL && (
              <p className="mt-2 text-xs text-zinc-500">
                No API endpoint configured — apply directly via{" "}
                <a
                  href={form.intent === "beta" ? BETA_FORM_URL : WAITLIST_FORM_URL}
                  className="text-purple-400 underline decoration-purple-700/60 underline-offset-2 hover:text-purple-300"
                >
                  {form.intent === "beta" ? "GitHub Beta Application Form" : "GitHub Waitlist Form"}
                </a>
                .
              </p>
            )}

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
