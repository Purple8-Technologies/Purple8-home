"use client";

import { useState } from "react";
import Link from "next/link";
import { CC_BASE_URL } from "@/lib/cc";

const EULA_URL = "/legal/eula";
const DEVELOPER_AGREEMENT_URL = "/legal/developer-agreement";

/**
 * Free Developer edition — self-serve registration (step 1 of 2).
 *
 * The account owner enters their email, accepts the EULA inline, and receives a
 * single-use magic link. Clicking the link (/activate) issues the license
 * instantly. No human approval, no waitlist.
 */
export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [useType, setUseType] = useState("professional");
  const [acceptedEula, setAcceptedEula] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [alreadyLicensed, setAlreadyLicensed] = useState(false);
  const [err, setErr] = useState("");
  const [recovering, setRecovering] = useState(false);
  const [recoverSent, setRecoverSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setErr("Enter a valid email address.");
      return;
    }
    if (!acceptedEula) {
      setErr("Please accept the EULA and Developer Agreement to continue.");
      return;
    }
    setLoading(true);
    setErr("");
    try {
      const res = await fetch(`${CC_BASE_URL}/public/developer/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          company: company.trim(),
          use_type: useType,
          accepted_eula: acceptedEula,
          source: "purple8.ai/register",
        }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Registration failed (${res.status})`);
      }
      const data = await res.json();
      if (data.already_licensed) {
        setAlreadyLicensed(true);
      }
      setSent(true);
    } catch (e) {
      setErr(
        e instanceof Error ? e.message : "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleRecover() {
    if (recovering) return;
    setRecovering(true);
    setErr("");
    try {
      const res = await fetch(`${CC_BASE_URL}/public/developer/recover`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Recovery failed (${res.status})`);
      }
      setRecoverSent(true);
    } catch (e) {
      setErr(
        e instanceof Error ? e.message : "Couldn't send recovery link. Try again.",
      );
    } finally {
      setRecovering(false);
    }
  }

  if (sent) {
    return (
      <main id="main-content" className="min-h-screen bg-[#0a0a0f] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <a
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-slate-300"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to purple8.ai
          </a>
        </div>
        <div className="mx-auto max-w-2xl rounded-3xl border border-purple-900/40 bg-[#11111b] p-8 sm:p-10">
          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            {alreadyLicensed ? "You already have a license" : "Check your email 📧"}
          </h1>
          <p className="mt-4 text-gray-300">
            {alreadyLicensed ? (
              <>
                A Developer license already exists for{" "}
                <span className="text-purple-300">{email.toLowerCase()}</span>. Lost
                your key? We can email you a one-click link to view it again.
              </>
            ) : (
              <>
                We sent a confirmation link to{" "}
                <span className="text-purple-300">{email.toLowerCase()}</span>. Click it
                to activate your free Developer license instantly — it takes one click.
              </>
            )}
          </p>
          {alreadyLicensed && (
            <div className="mt-6">
              {recoverSent ? (
                <p className="rounded-lg border border-purple-900/50 bg-purple-950/30 px-4 py-3 text-sm text-purple-200">
                  If a Developer license exists for that email, we&apos;ve sent a
                  recovery link. Check your inbox (and spam).
                </p>
              ) : (
                <button
                  onClick={handleRecover}
                  disabled={recovering}
                  className="rounded-lg bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {recovering ? "Sending…" : "Email me my key"}
                </button>
              )}
              {err && (
                <p className="mt-3 text-sm text-red-300">{err}</p>
              )}
              <p className="mt-3 text-sm text-gray-500">
                Still stuck?{" "}
                <Link href="/support/" className="text-purple-400 underline">
                  Contact support
                </Link>
                .
              </p>
            </div>
          )}
          {!alreadyLicensed && (
            <p className="mt-4 text-sm text-gray-500">
              The link expires in 24 hours and can be used once. Didn&apos;t get it?
              Check spam, or{" "}
              <button
                onClick={() => {
                  setSent(false);
                }}
                className="text-purple-400 underline"
              >
                register again
              </button>
              .
            </p>
          )}
        </div>
      </main>
    );
  }

  return (
    <main id="main-content" className="min-h-screen bg-[#0a0a0f] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <a
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-slate-300"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to purple8.ai
        </a>
        <h1 className="text-3xl font-bold text-white sm:text-4xl">
          Get Purple8 — free for developers
        </h1>
        <p className="mt-3 text-gray-400">
          The full multi-model engine on your machine. No credit card, no waitlist —
          confirm your email and your license is issued instantly.
        </p>
        <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-purple-800/40 bg-purple-950/30 px-4 py-1.5 text-sm text-purple-200">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-purple-400" />
          </span>
          Launching August 2026 — start building today and upgrade in one click at launch.
        </p>

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

          <label className="mt-5 block">
            <span className="text-sm text-gray-300">What are you building?</span>
            <select
              value={useType}
              onChange={(e) => setUseType(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-700 bg-[#0a0a0f] px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
            >
              <option value="professional">Professional / work project</option>
              <option value="personal">Personal / side project</option>
              <option value="research">Research / academic</option>
              <option value="evaluation">Evaluating for my team</option>
            </select>
          </label>

          <label className="mt-6 flex items-start gap-3">
            <input
              type="checkbox"
              checked={acceptedEula}
              onChange={(e) => setAcceptedEula(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-gray-600 bg-[#0a0a0f] text-purple-600 focus:ring-purple-500"
            />
            <span className="text-sm text-gray-400">
              I agree to the{" "}
              <a
                href={EULA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 underline"
              >
                EULA
              </a>{" "}
              and{" "}
              <a
                href={DEVELOPER_AGREEMENT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 underline"
              >
                Developer Agreement
              </a>
              . Developer edition is free; in exchange we ask for occasional feedback
              to help improve the product.
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
            {loading ? "Sending confirmation…" : "Send me my license"}
          </button>

          <p className="mt-4 text-center text-xs text-gray-600">
            Need more scale?{" "}
            <Link href="/#pricing" className="text-purple-400 underline">
              See paid plans
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
