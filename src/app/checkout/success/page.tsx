/**
 * /checkout/success
 *
 * Landing page after a successful Stripe Checkout.
 * Polls Command Center for the issued license key, then shows it to the customer.
 *
 * URL params (set by Stripe on redirect):
 *   session_id — Stripe Checkout Session ID
 *   plan       — plan name (for display)
 */
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { CC_BASE_URL } from "@/lib/cc";

const CC_URL = CC_BASE_URL;

interface LicenseResult {
  status: "pending" | "ready" | "error";
  jwt_token?: string;
  key_id?: string;
  tier?: string;
  error?: string;
}

function CheckoutSuccessContent() {
  const params = useSearchParams();
  const sessionId = params.get("session_id") ?? "";
  const plan = params.get("plan") ?? "starter";

  const [result, setResult] = useState<LicenseResult>({ status: "pending" });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!sessionId) {
      setResult({ status: "error", error: "Missing session ID" });
      return;
    }

    let attempts = 0;
    const MAX_ATTEMPTS = 20; // 20 × 3s = 60s max

    const poll = async () => {
      try {
        const resp = await fetch(
          `${CC_URL}/license/by-session?session_id=${encodeURIComponent(sessionId)}`
        );
        if (resp.ok) {
          const data = await resp.json();
          if (data.jwt_token) {
            setResult({ status: "ready", ...data });
            return;
          }
        }
      } catch {
        // network error — keep polling
      }

      attempts++;
      if (attempts < MAX_ATTEMPTS) {
        setTimeout(poll, 3000);
      } else {
        setResult({
          status: "error",
          error:
            "License is taking longer than expected. Check your email — we'll send it there too.",
        });
      }
    };

    const timer = setTimeout(poll, 2000); // first attempt after 2s
    return () => clearTimeout(timer);
  }, [sessionId]);

  const copy = () => {
    if (result.jwt_token) {
      navigator.clipboard.writeText(result.jwt_token);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">
      <a
        href="/"
        className="absolute left-4 top-4 inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-slate-300 sm:left-6 sm:top-6"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to purple8.ai
      </a>
      <div className="max-w-xl w-full rounded-2xl border border-zinc-800 bg-[#11111b] p-10 text-center">

        {result.status === "pending" && (
          <>
            <div className="mx-auto mb-6 h-12 w-12 animate-spin rounded-full border-4 border-zinc-700 border-t-purple-500" />
            <h1 className="text-xl font-bold text-white">Activating your license…</h1>
            <p className="mt-3 text-sm text-zinc-500">
              Confirming payment with Stripe and issuing your key. This takes a few seconds.
            </p>
          </>
        )}

        {result.status === "ready" && result.jwt_token && (
          <>
            <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-purple-900/40">
              <svg className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-white">
              You&apos;re on Purple8{" "}
              <span className="capitalize text-purple-400">{result.tier ?? plan}</span>
            </h1>
            <p className="mt-2 text-sm text-zinc-500">
              Your license key is below. We&apos;ve also emailed it to you.
              Set it as <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-purple-300">PURPLE8_LICENSE_JWT</code>{" "}
              in your environment.
            </p>

            <div className="mt-6 rounded-xl border border-zinc-700 bg-zinc-900 p-4">
              <p className="break-all font-mono text-xs leading-relaxed text-zinc-300">
                {result.jwt_token}
              </p>
            </div>

            <button
              onClick={copy}
              className="mt-4 rounded-full bg-purple-600 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-purple-500"
            >
              {copied ? "Copied ✓" : "Copy license key"}
            </button>

            <div className="mt-8 border-t border-zinc-800 pt-6 text-left">
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                Next steps
              </p>
              <ol className="mt-3 space-y-2 text-sm text-zinc-400">
                <li><span className="text-purple-400 font-medium">1.</span> Install Purple8: <a href="/quickstart" className="text-purple-400 hover:text-purple-300">Quickstart →</a></li>
                <li><span className="text-purple-400 font-medium">2.</span> Set <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs">PURPLE8_LICENSE_JWT=&lt;key above&gt;</code></li>
                <li><span className="text-purple-400 font-medium">3.</span> <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs">docker compose up</code></li>
              </ol>
            </div>
          </>
        )}

        {result.status === "error" && (
          <>
            <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-red-900/40">
              <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-white">Something went wrong</h1>
            <p className="mt-3 text-sm text-zinc-500">{result.error}</p>
            <p className="mt-4 text-sm text-zinc-600">
              Email <a href="mailto:support@purple8.ai" className="text-purple-400 hover:text-purple-300">support@purple8.ai</a> with your Stripe receipt and we&apos;ll sort it out.
            </p>
          </>
        )}

      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense>
      <CheckoutSuccessContent />
    </Suspense>
  );
}
