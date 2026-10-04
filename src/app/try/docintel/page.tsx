"use client";

import { useState } from "react";
import Link from "next/link";
import { CC_BASE_URL } from "@/lib/cc";

const SANDBOX_URL = "https://purple8-docintel.fly.dev/try";

const dataPoints = [
  "Your processed documents are never saved.",
  "Results are available for your session only — then deleted.",
  "We keep only job metadata (job id, status, file format, category, language, timestamps). Not your filename, not your content.",
  "Only you can see your jobs.",
  "Please don't upload confidential documents. For real data, use self-hosted DocIntel.",
];

/**
 * Hosted DocIntel sandbox — self-serve key request.
 *
 * The key is only ever emailed (never shown here), so receiving it proves the
 * person owns the inbox. The response is the same for new, existing and
 * throttled addresses.
 */
export default function TryDocIntelPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setErr("Enter a valid email address.");
      return;
    }
    if (!accepted) {
      setErr("Please accept the sandbox terms to continue.");
      return;
    }
    setLoading(true);
    setErr("");
    try {
      const res = await fetch(`${CC_BASE_URL}/public/sandbox/docintel`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          company: company.trim(),
          accepted_terms: accepted,
          source: "purple8.ai/try/docintel",
        }),
      });
      if (!res.ok) {
        const text = await res.text();
        let detail = text;
        try { detail = JSON.parse(text).detail || text; } catch { /* keep raw */ }
        throw new Error(detail || `Request failed (${res.status})`);
      }
      setSent(true);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main id="main-content" className="min-h-screen px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <a
          href="/products/docintel/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-slate-300"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to DocIntel
        </a>

        <h1 className="text-3xl font-bold text-white sm:text-4xl">
          Try DocIntel in your browser
        </h1>
        <p className="mt-3 text-gray-400">
          Upload a PDF, Word file, spreadsheet, image or email and see the entities and
          relationships DocIntel extracts. Free, no install, no credit card —
          50 documents a month for 30 days.
        </p>

        <div className="mt-8 rounded-2xl border border-purple-900/40 border-l-4 border-l-purple-500 bg-[#11111b] p-6">
          <h2 className="text-base font-semibold text-white">Your data</h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-gray-400">
            {dataPoints.map((d) => <li key={d}>{d}</li>)}
          </ul>
        </div>

        {sent ? (
          <div className="mt-8 rounded-3xl border border-purple-900/40 bg-[#11111b] p-8">
            <h2 className="text-2xl font-bold text-white">Check your email 📧</h2>
            <p className="mt-4 text-gray-300">
              We sent your sandbox key to{" "}
              <span className="text-purple-300">{email.toLowerCase()}</span>. Open the
              sandbox and paste the key.
            </p>
            <a
              href={SANDBOX_URL}
              className="mt-6 inline-block rounded-lg bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-500"
            >
              Open the sandbox →
            </a>
            <p className="mt-4 text-sm text-gray-500">
              Didn&apos;t get it? Check spam, or{" "}
              <button onClick={() => setSent(false)} className="text-purple-400 underline">
                try again
              </button>{" "}
              in a few minutes.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-8 rounded-3xl border border-purple-900/40 bg-[#11111b] p-6 sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm text-gray-300">Name</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-700 bg-[#0a0a0f] px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
                  placeholder="Ada Lovelace"
                />
              </label>
              <label className="block">
                <span className="text-sm text-gray-300">Company (optional)</span>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-700 bg-[#0a0a0f] px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
                  placeholder="Acme Inc."
                />
              </label>
            </div>

            <label className="mt-5 block">
              <span className="text-sm text-gray-300">Email</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-700 bg-[#0a0a0f] px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
                placeholder="you@company.com"
              />
            </label>

            <label className="mt-6 flex items-start gap-3">
              <input
                type="checkbox"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-gray-600 bg-[#0a0a0f] text-purple-600 focus:ring-purple-500"
              />
              <span className="text-sm text-gray-400">
                I&apos;ve read how my data is handled above, I won&apos;t upload confidential
                documents, and I agree to the{" "}
                <a href="/legal/terms" target="_blank" rel="noopener noreferrer" className="text-purple-400 underline">
                  Terms
                </a>{" "}
                and{" "}
                <a href="/legal/privacy" target="_blank" rel="noopener noreferrer" className="text-purple-400 underline">
                  Privacy Policy
                </a>
                .
              </span>
            </label>

            {err && (
              <p className="mt-4 rounded-lg border border-red-900/50 bg-red-950/40 px-3 py-2 text-sm text-red-300">
                {err}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded-lg bg-purple-600 px-4 py-3 font-semibold text-white transition hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Sending…" : "Email me a sandbox key"}
            </button>

            <p className="mt-4 text-center text-xs text-gray-600">
              Already have a key?{" "}
              <a href={SANDBOX_URL} className="text-purple-400 underline">Open the sandbox</a>
              {" · "}
              Want it on your own machine?{" "}
              <Link href="/quickstart#add-docintel" className="text-purple-400 underline">Self-host</Link>
            </p>
          </form>
        )}
      </div>
    </main>
  );
}
