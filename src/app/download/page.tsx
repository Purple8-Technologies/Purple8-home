"use client";

import { useState } from "react";
import Link from "next/link";

const CC_BASE =
  process.env.NEXT_PUBLIC_CC_BASE_URL ?? "https://cc.purple8.ai";

type FormState = "idle" | "submitting" | "done" | "error";

const USE_CASES = [
  { value: "professional", label: "Professional / work project" },
  { value: "personal",     label: "Personal / side project" },
  { value: "research",     label: "Research / academia" },
  { value: "evaluation",   label: "Evaluating for my team" },
];

export default function DownloadPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    use_type: "professional",
  });
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.name) return;
    setState("submitting");
    try {
      const res = await fetch(`${CC_BASE}/public/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:     form.name.trim(),
          email:    form.email.trim().toLowerCase(),
          company:  form.company.trim(),
          intent:   "developer",
          use_type: form.use_type,
          source:   "purple8.ai/download",
        }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `HTTP ${res.status}`);
      }
      setState("done");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
      setState("error");
    }
  };

  // ── Thank-you panel ─────────────────────────────────────────────────────
  if (state === "done") {
    return (
      <main className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">
        <div className="w-full max-w-lg text-center">
          <div className="mb-6 text-5xl">🎉</div>
          <h1 className="text-3xl font-bold text-white mb-4">
            You&apos;re on the list!
          </h1>
          <p className="text-zinc-400 mb-3">
            Thanks, <span className="text-white font-medium">{form.name.split(" ")[0]}</span>.
            Our team has been notified and will send your download link to{" "}
            <span className="text-purple-400">{form.email}</span> shortly.
          </p>
          <p className="text-zinc-500 text-sm mb-10">
            In the meantime you can explore the docs and API reference at{" "}
            <a
              href="https://github.com/Purple8-Technologies/purple8-graph"
              className="text-purple-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/Purple8-Technologies/purple8-graph
            </a>
            .
          </p>
          <Link
            href="/"
            className="text-sm text-zinc-500 hover:text-white transition-colors"
          >
            ← Back to home
          </Link>
        </div>
      </main>
    );
  }

  // ── Form ─────────────────────────────────────────────────────────────────
  return (
    <main className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="mb-10 text-center">
          <span className="inline-block mb-4 rounded-full bg-purple-950/60 px-3 py-1 text-xs font-medium text-purple-300 ring-1 ring-purple-800/50">
            Developer — Free tier
          </span>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Get Purple8 Hyper Graph
          </h1>
          <p className="mt-3 text-zinc-400">
            Full engine · 50K nodes · All 22 MCP tools · No credit card · No expiry
          </p>
        </div>

        {/* Form card */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 space-y-5"
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-zinc-400">
                Full name <span className="text-purple-400">*</span>
              </span>
              <input
                type="text"
                required
                placeholder="Jane Doe"
                value={form.name}
                onChange={set("name")}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-zinc-400">
                Work email <span className="text-purple-400">*</span>
              </span>
              <input
                type="email"
                required
                placeholder="jane@company.com"
                value={form.email}
                onChange={set("email")}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </label>
          </div>

          <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-zinc-400">
              Company / organisation
            </span>
            <input
              type="text"
              placeholder="Acme Inc (optional)"
              value={form.company}
              onChange={set("company")}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-zinc-400">
              Primary use case
            </span>
            <select
              value={form.use_type}
              onChange={set("use_type")}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-white focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            >
              {USE_CASES.map((u) => (
                <option key={u.value} value={u.value}>
                  {u.label}
                </option>
              ))}
            </select>
          </label>

          {state === "error" && (
            <p className="rounded-lg bg-red-950/40 border border-red-800/50 px-4 py-3 text-sm text-red-400">
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={state === "submitting"}
            className="w-full rounded-full bg-purple-600 py-3 text-sm font-semibold text-white transition hover:bg-purple-500 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {state === "submitting" ? "Submitting…" : "Request download link →"}
          </button>

          <p className="text-center text-xs text-zinc-600">
            By submitting you agree to our{" "}
            <a
              href="https://github.com/Purple8-Technologies/Purple8-home/blob/main/BETA_AGREEMENT.md"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-zinc-300 underline underline-offset-2"
            >
              Beta Agreement
            </a>
            . No spam, ever.
          </p>
        </form>

        <p className="mt-6 text-center text-xs text-zinc-600">
          Already have an invite token?{" "}
          <Link href="/beta" className="text-purple-400 hover:underline">
            Activate beta access →
          </Link>
        </p>
      </div>
    </main>
  );
}
